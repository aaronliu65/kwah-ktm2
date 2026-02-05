import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import crypto from "node:crypto";
import { joinURL, parseURL, cleanDoubleSlashes } from "ufo";

// ===== 檔案雜湊緩存管理 =====
const hashCache = {};
const MAX_CACHE_ITEMS = 1000;
const CACHE_KEYS = [];
let cacheModified = false;
let saveTimeout = null;
const hashCachePath = path.resolve("./node_modules/.cache/hash-cache.json");

// 使用部分內容雜湊計算（僅讀取檔案的前8KB）
async function getPartialFileHash(filePath, readSize = 8192) {
    return new Promise((resolve) => {
        try {
            const hashSum = crypto.createHash("md5");
            const stream = fs.createReadStream(filePath, {
                start: 0,
                end: readSize - 1,
                highWaterMark: readSize,
            });

            stream.on("data", (data) => hashSum.update(data));
            stream.on("end", () => resolve(hashSum.digest("hex")));
            stream.on("error", (error) => {
                console.error(`計算部分雜湊錯誤: ${filePath}`, error);
                resolve(null);
            });
        } catch (error) {
            console.error(`雜湊計算初始化錯誤: ${filePath}`, error);
            resolve(null);
        }
    });
}

// 緩存相關函數
async function loadHashCache() {
    try {
        if (fs.existsSync(hashCachePath)) {
            const cacheData = await fs.promises.readFile(hashCachePath, "utf8");
            Object.assign(hashCache, JSON.parse(cacheData));
        }
    } catch (error) {
        console.error("加載雜湊緩存失敗", error);
    }
}

function addToCache(key, value) {
    // 移除舊條目（如果已存在）
    const existingIndex = CACHE_KEYS.indexOf(key);
    if (existingIndex > -1) {
        CACHE_KEYS.splice(existingIndex, 1);
    } else if (CACHE_KEYS.length >= MAX_CACHE_ITEMS) {
        // 如果達到上限，移除最舊的條目
        const oldestKey = CACHE_KEYS.shift();
        delete hashCache[oldestKey];
    }

    CACHE_KEYS.push(key);
    hashCache[key] = value;
    cacheModified = true;

    // 設置延遲保存
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        if (cacheModified) {
            saveHashCache();
            cacheModified = false;
        }
    }, 1000);
}

async function saveHashCache() {
    try {
        const cacheDir = path.resolve("./node_modules/.cache");
        ensureDirExists(cacheDir);

        await fs.promises.writeFile(
            hashCachePath,
            JSON.stringify(hashCache),
            "utf8",
        );
    } catch (error) {
        console.error("保存雜湊緩存失敗", error);
    }
}

// ===== 工具函數 =====
function ensureDirExists(dirPath) {
    try {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            return true;
        }
        return false;
    } catch (error) {
        console.error(`創建目錄失敗: ${dirPath}`, error);
        return false;
    }
}

function getParentDir(filePath) {
    return filePath.split("/").slice(0, -1).join("/");
}

// ===== 圖像處理 =====
// 處理中的圖片集合，防止重複處理
const processingImages = new Set();

// 圖片處理函數
async function processImage(sourceImagePath, outputImagePath, imgInfo, file) {
    const startTime = performance.now();

    try {
        // 確保輸出目錄存在
        ensureDirExists(getParentDir(outputImagePath));

        // 獲取圖片元數據
        const metadata = await sharp(sourceImagePath, {
            limitInputPixels: 1000000000,
        }).metadata();

        // 判斷是否需要調整大小
        const needResize =
            (imgInfo.w && metadata.width > imgInfo.w) ||
            (imgInfo.h && metadata.height > imgInfo.h);

        // 處理圖片
        const image = sharp(sourceImagePath, {
            failOnError: false,
            limitInputPixels: 1000000000,
        });

        // 按需調整大小
        if (needResize) {
            image.resize(imgInfo.w, imgInfo.h, {
                fit: imgInfo.fit || undefined,
                position: imgInfo.position
                    ? imgInfo.position.replace("_", " ")
                    : undefined,
            });
        }

        // 應用模糊效果（如果有）
        if (imgInfo.blur) {
            image.blur(imgInfo.blur);
        }

        // 輸出為指定格式
        await image
            .toFormat(imgInfo.f, {
                quality: imgInfo.q,
                effort: 0,
            })
            .toFile(outputImagePath);

        console.log(
            `圖片處理完成: ${file}, 耗時: ${(performance.now() - startTime).toFixed(2)}ms`,
        );
        return true;
    } catch (error) {
        console.error(
            `處理圖片失敗: ${file}, 耗時: ${(performance.now() - startTime).toFixed(2)}ms`,
            error,
        );
        return false;
    }
}

// 添加處理隊列控制
const MAX_CONCURRENT_PROCESSING = 10; // 根據伺服器能力調整
let currentProcessing = 0;
const processingQueue = []; // 作為優先級隊列使用

// 判斷圖片是否為小尺寸（縮略圖）
function isSmallImage(imgInfo) {
    const SMALL_IMAGE_THRESHOLD = 200; // 小於200px視為小尺寸圖片
    return (
        (imgInfo.w && imgInfo.w < SMALL_IMAGE_THRESHOLD) ||
        (imgInfo.h && imgInfo.h < SMALL_IMAGE_THRESHOLD)
    );
}

async function queueImageProcessing(
    sourceImagePath,
    outputImagePath,
    imgInfo,
    file,
) {
    return new Promise((resolve, reject) => {
        const task = async () => {
            try {
                currentProcessing++;
                const result = await processImage(
                    sourceImagePath,
                    outputImagePath,
                    imgInfo,
                    file,
                );
                resolve(result);
            } catch (error) {
                reject(error);
            } finally {
                currentProcessing--;
                // 處理下一個任務
                if (processingQueue.length > 0) {
                    // 優先選擇小尺寸圖片進行處理
                    processingQueue.sort((a, b) => b.priority - a.priority);
                    const nextTask = processingQueue.shift().task;
                    nextTask();
                }
            }
        };

        // 判斷優先級 - 小尺寸圖片優先
        const priority = isSmallImage(imgInfo) ? 2 : 1;

        if (currentProcessing < MAX_CONCURRENT_PROCESSING) {
            task();
        } else {
            // 將任務加入佇列，包含優先級信息
            processingQueue.push({
                task,
                priority,
                timestamp: Date.now(),
            });

            // 根據優先級排序佇列
            processingQueue.sort((a, b) => {
                // 先按優先級排序，優先級相同時按加入時間排序
                if (b.priority === a.priority) {
                    return a.timestamp - b.timestamp; // 先進先出
                }
                return b.priority - a.priority;
            });
        }
    });
}

// ===== 初始化 =====
// 立即加載雜湊緩存
loadHashCache().then(() => console.log("檔案雜湊緩存加載完成"));

// ===== 主處理邏輯 =====
export default defineEventHandler(async (event) => {
    // 解析請求路徑及參數
    const file = decodeURI(parseURL(event.context.params.src).pathname);
    const params = file.split("/");

    // 解析圖像處理參數
    const imgInfo = {
        f:
            params
                .find((item) => item.match(/^f_[a-z]+$/))
                ?.replace("f_", "") || "webp",
        q:
            parseInt(
                params
                    .find((item) => item.match(/^q_[0-9]+$/))
                    ?.replace("q_", ""),
            ) || 50,
        w:
            parseInt(
                params
                    .find((item) => item.match(/^w_[0-9]+$/))
                    ?.replace("w_", ""),
            ) || null,
        h:
            parseInt(
                params
                    .find((item) => item.match(/^h_[0-9]+$/))
                    ?.replace("h_", ""),
            ) || null,
        fit:
            params
                .find((item) => item.match(/^fit_[a-z]+$/))
                ?.replace("fit_", "") || "",
        position:
            params
                .find((item) => item.match(/^position_([a-z_]+)$/))
                ?.replace("position_", "") || "",
        blur:
            parseInt(
                params
                    .find((item) => item.match(/^blur_[0-9]+$/))
                    ?.replace("blur_", ""),
            ) || false,
    };

    // 處理圖片路徑
    let imgPath = file;
    for (const [key, value] of Object.entries(imgInfo)) {
        imgPath = imgPath.replace(`${key}_${value}`, "");
    }
    imgPath = cleanDoubleSlashes(imgPath);
    imgPath = imgPath.replace(/\.[^/.]+$/, "").replace(/_([^/_]+)$/, ".$1");

    // 設置源和目標路徑
    const targetFolder =
        process.env.NODE_ENV === "prerender"
            ? "./.output/public/sharp"
            : "./node_modules/.cache/sharp";

    const sourceImagePath = path.resolve(
        joinURL("./app/assets/images", imgPath),
    );
    const outputImagePath = path.resolve(joinURL(targetFolder, file));

    // 檢查源圖片是否存在
    if (!fs.existsSync(sourceImagePath)) {
        throw createError({
            statusCode: 404,
            statusMessage: "找不到源圖片",
        });
    }

    // 雜湊緩存檢查
    const cacheKey = `${sourceImagePath}|${file}`;
    const currentHash = await getPartialFileHash(sourceImagePath);
    const cachedHash = hashCache[cacheKey];

    // 判斷是否需要更新圖片
    const needUpdate =
        !fs.existsSync(outputImagePath) || cachedHash !== currentHash;

    if (needUpdate) {
        // 避免重複處理同一圖片
        if (!processingImages.has(outputImagePath)) {
            processingImages.add(outputImagePath);

            try {
                // 更新雜湊緩存
                addToCache(cacheKey, currentHash);

                // 使用隊列處理圖片
                await queueImageProcessing(
                    sourceImagePath,
                    outputImagePath,
                    imgInfo,
                    file,
                );
            } catch (error) {
                throw createError({
                    statusCode: 500,
                    statusMessage: "圖片處理失敗",
                });
            } finally {
                processingImages.delete(outputImagePath);
            }
        } else {
            // 等待圖片處理完成
            let retries = 0;
            while (retries < 100 && !fs.existsSync(outputImagePath)) {
                await new Promise((resolve) => setTimeout(resolve, 100));
                retries++;
            }

            if (!fs.existsSync(outputImagePath)) {
                throw createError({
                    statusCode: 500,
                    statusMessage: "圖片處理超時",
                });
            }
        }
    }

    // 預渲染模式不返回文件
    if (process.env.NODE_ENV === "prerender") return;

    // 檢查並返回處理後的圖片
    const fullPath = path.resolve(`${targetFolder}/${file}`);
    if (!fs.existsSync(fullPath)) {
        throw createError({
            statusCode: 404,
            statusMessage: "找不到處理後的圖片",
        });
    }

    return sendStream(event, fs.createReadStream(fullPath));
});
