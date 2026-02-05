<script setup>
const layoutBoard = shallowRef();
const innerBoard = shallowRef();
const scale = shallowRef(1);
const contentHeight = shallowRef(0);
const resizeObserver = shallowRef();
const alignOrientation = shallowRef("");
const resizeTimeout = shallowRef(null);
const resizeRequested = shallowRef(false);

// 元件屬性定義
const props = defineProps({
    width: { type: Number, default: 1920 },
    height: { type: Number, default: 1080 },
    size: { type: String, default: "contain" },
    align: { type: String, default: "center" },
    valign: { type: String, default: "center" },
    scalable: { type: Boolean, default: true },
    maxScale: { type: Number, default: 0 },
    overflowHidden: { type: Boolean, default: true },
    autoHeight: { type: Boolean, default: false },
    textRenderingMode: { type: String, default: "auto" },
    enhanceRendering: { type: Boolean, default: false },
});

const emit = defineEmits(["resize"]);

/**
 * 解析並處理百分比值
 */
const parsePercentage = (value) => {
    if (typeof value !== "string") return { isPercentage: false, value };

    const percentageMatch = value.match(/^(\d+(?:\.\d+)?)%$/);
    return percentageMatch
        ? { isPercentage: true, value: parseFloat(percentageMatch[1]) / 100 }
        : { isPercentage: false, value };
};

/**
 * 優化的handleResize函數 - 主要邏輯經過整理以避免重複計算
 */
const handleResize = () => {
    if (!props.scalable || !layoutBoard.value?.parentNode) {
        scale.value = 1;
        return;
    }

    const parentNode = layoutBoard.value.parentNode;
    const parentWidth = parentNode.clientWidth;
    const parentHeight = parentNode.clientHeight;

    let newScale = 1;

    if (props.autoHeight) {
        alignOrientation.value = "width";
        newScale = parentWidth / props.width;
    } else {
        const boardScale = parentWidth / parentHeight;
        const contentScale = props.width / props.height;

        let result = { orientation: "width", value: 1 };

        // 使用對象映射代替 switch/if-else 結構
        const sizeHandler = {
            contain: () =>
                boardScale < contentScale
                    ? { orientation: "width", value: parentWidth / props.width }
                    : {
                          orientation: "height",
                          value: parentHeight / props.height,
                      },
            cover: () =>
                boardScale > contentScale
                    ? { orientation: "width", value: parentWidth / props.width }
                    : {
                          orientation: "height",
                          value: parentHeight / props.height,
                      },
            fitWidth: () => ({
                orientation: "width",
                value: parentWidth / props.width,
            }),
            fitHeight: () => ({
                orientation: "height",
                value: parentHeight / props.height,
            }),
        };

        // 使用策略模式獲取計算結果
        const handler = sizeHandler[props.size] || sizeHandler.contain;
        result = handler();

        alignOrientation.value = result.orientation;
        newScale = result.value;
    }

    // 應用最大縮放限制
    if (props.maxScale > 0 && newScale > props.maxScale) {
        newScale = props.maxScale;
    }

    // 只在值變化時更新 scale
    if (newScale !== scale.value) {
        scale.value = newScale;
    }

    // 更新自動高度
    if (props.autoHeight && innerBoard.value) {
        const newHeight = innerBoard.value.clientHeight * scale.value;
        if (newHeight !== contentHeight.value) {
            contentHeight.value = newHeight;
        }
    }
};

/**
 * 高效的節流處理函數
 */
const throttledResize = () => {
    if (resizeRequested.value) return;

    resizeRequested.value = true;
    resizeTimeout.value = window.requestAnimationFrame(() => {
        if (resizeRequested.value) {
            handleResize();
            resizeRequested.value = false;
            resizeTimeout.value = null;
        }
    });
};

/**
 * 水平對齊計算 - 更簡潔的實現
 */
const getAlignItems = computed(() => {
    const alignment = parsePercentage(props.align);

    if (alignment.isPercentage) return "center";
    if (props.align === "center" || props.autoHeight) return "center";
    if (props.align === "left" && !props.autoHeight) return "flex-start";
    if (props.align === "right" && !props.autoHeight) return "flex-end";

    return "center";
});

/**
 * 垂直對齊計算 - 更簡潔的實現
 */
const getJustifyContent = computed(() => {
    const alignment = parsePercentage(props.valign);

    if (alignment.isPercentage) return "center";
    if (props.valign === "center" && !props.autoHeight) return "center";
    if (props.valign === "top" || props.autoHeight) return "flex-start";
    if (props.valign === "bottom" && !props.autoHeight) return "flex-end";

    return "center";
});

/**
 * 文本渲染樣式計算 - 使用記憶模式
 */
const textRenderingStyle = computed(() => {
    const textRenderingModes = {
        crisp: {
            "-webkit-font-smoothing": "antialiased",
            "-moz-osx-font-smoothing": "grayscale",
            "text-rendering": "optimizeLegibility",
        },
        pixel: {
            "-webkit-font-smoothing": "none",
            "-moz-osx-font-smoothing": "none",
            "text-rendering": "optimizeSpeed",
        },
        auto: {},
    };

    return (
        textRenderingModes[props.textRenderingMode] || textRenderingModes.auto
    );
});

/**
 * 變換原點計算 - 簡化邏輯
 */
const getTransformOrigin = computed(() => {
    if (props.autoHeight) return "center top";

    let originX = props.align;
    let originY = props.valign;

    const alignPercent = parsePercentage(props.align);
    if (alignPercent.isPercentage) {
        originX = `${alignPercent.value * 100}%`;
    }

    const valignPercent = parsePercentage(props.valign);
    if (valignPercent.isPercentage) {
        originY = `${valignPercent.value * 100}%`;
    }

    return `${originX} ${originY}`;
});

/**
 * 外層畫板樣式計算 - 減少重複計算
 */
const layoutBoardStyle = computed(() => {
    if (!props.scalable) {
        return { "--layout-scale": "1" };
    }

    const style = {
        position: "relative",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: getAlignItems.value,
        justifyContent: getJustifyContent.value,
        "--layout-scale": scale.value,
    };

    if (!props.autoHeight) {
        Object.assign(style, {
            height: "100%",
            minHeight: "100%",
        });
    }

    if (props.overflowHidden) {
        style.overflow = "hidden";
    }

    if (props.autoHeight) {
        const height = `${contentHeight.value}px`;
        Object.assign(style, {
            minHeight: height,
            height,
            "--layout-height": height,
        });
    } else if (props.size !== "cover" && props.size !== "fitWidth") {
        const height = `${props.height * scale.value}px`;
        Object.assign(style, {
            minHeight: height,
            "--layout-height": height,
        });
    }

    return style;
});

/**
 * 內部畫板樣式計算 - 使用條件合併
 */
const innerBoardStyle = computed(() => {
    const style = { willChange: "transform" };

    // 增強渲染設置
    if (props.enhanceRendering) {
        Object.assign(style, {
            "transform-style": "preserve-3d",
            "backface-visibility": "hidden",
            perspective: "1000px",
            "-webkit-transform-style": "preserve-3d",
            "-webkit-backface-visibility": "hidden",
            "-webkit-perspective": "1000px",
        });
    }

    // 縮放相關設置
    if (props.scalable) {
        style.position = "relative";
        style.transform = `scale(${scale.value})`;

        const baseStyle = {
            width: `${props.width}px`,
            minWidth: `${props.width}px`,
        };

        if (props.autoHeight) {
            Object.assign(style, baseStyle, {
                transformOrigin: "center top",
            });
        } else {
            Object.assign(style, baseStyle, {
                height: `${props.height}px`,
                minHeight: `${props.height}px`,
                transformOrigin: getTransformOrigin.value,
            });
        }
    }

    // 文本渲染設置
    Object.assign(style, textRenderingStyle.value);

    return style;
});

/**
 * 優化的 ResizeObserver 設置
 */
const setupResizeObservers = () => {
    cleanupResizeObservers(); // 確保先清理舊觀察器

    resizeObserver.value = new ResizeObserver(throttledResize);

    if (layoutBoard.value?.parentNode) {
        resizeObserver.value.observe(layoutBoard.value.parentNode, {
            box: "border-box",
        });
    }

    if (props.autoHeight && innerBoard.value) {
        resizeObserver.value.observe(innerBoard.value, { box: "border-box" });
    }
};

/**
 * 清理 ResizeObserver
 */
const cleanupResizeObservers = () => {
    if (resizeObserver.value) {
        resizeObserver.value.disconnect();
        resizeObserver.value = null;
    }
};

/**
 * 圖片加載處理函數
 */
const handleImgLoad = () => {
    // 使用下一個渲染週期延遲處理，避免連續多次觸發
    if (!resizeTimeout.value) {
        resizeTimeout.value = setTimeout(() => {
            handleResize();
            resizeTimeout.value = null;
        }, 50); // 短延遲合併多個圖片加載事件
    }
};

/**
 * 優化的屬性監視 - 合併多個監視為一個
 */
watch(
    () => [
        props.width,
        props.height,
        props.size,
        props.align,
        props.valign,
        props.scalable,
        props.maxScale,
        props.overflowHidden,
        props.autoHeight,
    ],
    () => nextTick(handleResize),
    { deep: false },
);

/**
 * 縮放比例變更事件發送
 */
watch([() => scale.value, () => contentHeight.value], ([newScale, height]) =>
    emit("resize", newScale, height),
);

/**
 * 生命週期掛載處理
 */
onMounted(() => {
    nextTick(() => {
        handleResize();

        // 事件監聽
        window.addEventListener("resize", throttledResize, { passive: true });

        // 監聽所有圖片載入
        if (layoutBoard.value) {
            const imgElements = layoutBoard.value.querySelectorAll("img");
            if (imgElements.length > 0) {
                imgElements.forEach((img) => {
                    if (!img.complete) {
                        img.addEventListener("load", handleImgLoad, {
                            once: true,
                        });
                    }
                });
            }
        }

        // 設置大小觀察器
        setupResizeObservers();
    });
});

/**
 * 生命週期卸載處理 - 確保資源釋放
 */
onBeforeUnmount(() => {
    window.removeEventListener("resize", throttledResize);

    if (resizeTimeout.value) {
        clearTimeout(resizeTimeout.value);
        window.cancelAnimationFrame(resizeTimeout.value);
        resizeTimeout.value = null;
    }

    cleanupResizeObservers();
});

// 對外暴露方法
defineExpose({ handleResize });
</script>

<template>
    <div class="layout-board" :style="layoutBoardStyle" ref="layoutBoard">
        <div class="inner-board" :style="innerBoardStyle" ref="innerBoard">
            <slot v-bind="{ alignOrientation, scale, contentHeight }"></slot>
        </div>
    </div>
</template>

<style scoped>
.layout-board {
    contain: layout style;

    .inner-board {
        contain: layout style;
    }

    &:has([style*="hidden"]) {
        contain: layout style paint;

        .inner-board {
            contain: layout style paint;
        }
    }
}
</style>
