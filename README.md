# Nuxt 4 Starter Template

一個功能豐富的 Nuxt 4 starter template，整合了現代化的開發工具和最佳實踐。

## ✨ 特色功能

- 🚀 **Nuxt 4** - 最新版本的 Nuxt 框架
- 🎨 **Tailwind CSS 4** - 原子化 CSS 框架
- 🌈 **DaisyUI** - 美觀的 UI 組件庫
- 🖼️ **Sharp 圖片優化** - 自動圖片壓縮和格式轉換
- 🚀 **UnLazy** - 智能圖片懶加載
- 🌍 **i18n 國際化** - 支援繁體中文、簡體中文、英文
- 🎭 **SVG 優化** - 自動 SVG 優化和導入
- 🎯 **SEO 優化** - Sitemap 和 Robots.txt 自動生成
- ⚡ **TypeScript** - 完整的類型支援
- 💅 **Prettier** - 代碼格式化工具
- 🎬 **頁面轉場動畫** - 使用 Animate.css

## 🛠️ 技術棧

### 核心框架
- **Nuxt 4** - Vue.js 元框架
- **Vue 3** - 漸進式 JavaScript 框架
- **TypeScript** - 類型安全的 JavaScript 超集

### 樣式和 UI
- **Tailwind CSS 4** - 實用優先的 CSS 框架
- **DaisyUI** - 基於 Tailwind CSS 的組件庫
- **Animate.css** - CSS 動畫庫

### 圖片處理
- **Sharp** - 高效能圖片處理庫
- **UnLazy** - 高級圖片懶加載解決方案

### 國際化和 SEO
- **Nuxt i18n** - 國際化模組
- **Nuxt Sitemap** - 自動生成 sitemap
- **Nuxt Robots** - Robots.txt 管理

### 開發工具
- **Nuxt SVG** - SVG 優化和導入
- **Prettier** - 代碼格式化
- **Vite** - 快速的建構工具

## 📦 安裝

確保安裝依賴套件：

```bash
# npm
npm install

# pnpm (推薦)
pnpm install

# yarn
yarn install

# bun
bun install
```

## 🚀 開發

啟動開發伺服器 `http://localhost:3000`：

```bash
# npm
npm run dev

# pnpm (推薦)
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## 🏗️ 建構

建構生產環境應用程式：

```bash
# npm
npm run build

# pnpm (推薦)
pnpm build

# yarn
yarn build

# bun
bun run build
```

本地預覽生產版本：

```bash
# npm
npm run preview

# pnpm (推薦)
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## 📁 專案結構

```
nuxt-v4-starter/
├── app/                          # Nuxt 4 應用目錄
│   ├── assets/                   # 資源文件
│   │   ├── css/                  # CSS 文件
│   │   ├── images/              # 圖片文件
│   │   └── svg/                 # SVG 圖標
│   ├── components/              # Vue 組件
│   │   ├── LayoutBoard.vue      # 佈局組件
│   │   ├── SharpImg.vue         # 圖片優化組件
│   │   └── Translate.js         # 翻譯工具
│   ├── composables/             # 組合式函數
│   │   ├── sharp.js            # 圖片處理
│   │   └── t2s.js              # 繁簡轉換
│   ├── layouts/                 # 佈局模板
│   │   └── default.vue         # 預設佈局
│   ├── pages/                   # 頁面文件
│   │   └── index.vue           # 首頁
│   └── app.vue                  # 根組件
├── public/                      # 公共文件
├── server/                      # 服務端文件
│   └── routes/                  # API 路由
│       └── sharp/              # 圖片處理 API
├── nuxt.config.ts              # Nuxt 配置
├── package.json                # 套件配置
├── tailwind.config.js          # Tailwind 配置
└── tsconfig.json               # TypeScript 配置
```

## 🌍 國際化

本專案支援三種語言：

- **繁體中文** (tc) - 預設語言
- **簡體中文** (sc)
- **English** (en)

語言配置位於 `nuxt.config.ts` 中的 `i18n` 選項。

## 🖼️ 圖片優化

使用 `SharpImg` 組件來優化圖片：

```vue
<SharpImg
    class="h-auto w-full"
    src="your-image.jpg"
    :width="1920"
    :quality="75"
    format="webp"
/>
```

### 支援的選項

- `src` - 圖片路徑
- `width` / `height` - 尺寸
- `quality` - 品質 (1-100)
- `format` - 輸出格式 (webp, jpeg, png)
- `fit` - 裁剪模式 (cover, contain, fill, inside, outside)
- `lazyload` - 是否啟用懶加載

## 🎨 UI 組件

### LayoutBoard 響應式佈局組件

`LayoutBoard` 是一個強大的響應式佈局組件，可以自動縮放內容以適應不同的容器尺寸，非常適合創建響應式設計。

#### 基本用法

```vue
<template>
    <LayoutBoard 
        :width="1920" 
        :height="1080"
        size="contain"
        @resize="onResize"
    >
        <div class="content">
            <!-- 您的內容 -->
            <h1>響應式內容</h1>
            <p>這個內容會根據容器大小自動縮放</p>
        </div>
    </LayoutBoard>
</template>

<script setup>
const onResize = (scale, height) => {
    console.log('縮放比例:', scale, '高度:', height)
}
</script>
```

#### 支援的屬性

| 屬性名 | 類型 | 預設值 | 描述 |
|--------|------|--------|------|
| `width` | Number | 1920 | 內容的設計寬度 |
| `height` | Number | 1080 | 內容的設計高度 |
| `size` | String | "contain" | 縮放模式："contain", "cover", "fitWidth", "fitHeight" |
| `align` | String | "center" | 水平對齊："left", "center", "right" 或百分比 |
| `valign` | String | "center" | 垂直對齊："top", "center", "bottom" 或百分比 |
| `scalable` | Boolean | true | 是否啟用自動縮放 |
| `maxScale` | Number | 0 | 最大縮放比例（0 = 無限制） |
| `overflowHidden` | Boolean | true | 是否隱藏溢出內容 |
| `autoHeight` | Boolean | false | 是否啟用自動高度 |
| `enhanceRendering` | Boolean | false | 是否啟用增強渲染 |

#### 使用場景範例

**1. 響應式圖片展示**
```vue
<LayoutBoard :width="1200" :height="800" size="contain">
    <img src="hero-image.jpg" class="w-full h-full object-cover" />
</LayoutBoard>
```

**2. 自適應卡片佈局**
```vue
<LayoutBoard :width="800" :height="600" size="fitWidth" auto-height>
    <div class="grid grid-cols-2 gap-4 p-4">
        <div class="daisy-card bg-base-100 shadow-xl">
            <div class="daisy-card-body">
                <h2 class="daisy-card-title">卡片 1</h2>
                <p>內容會自動縮放</p>
            </div>
        </div>
        <div class="daisy-card bg-base-100 shadow-xl">
            <div class="daisy-card-body">
                <h2 class="daisy-card-title">卡片 2</h2>
                <p>保持比例完美</p>
            </div>
        </div>
    </div>
</LayoutBoard>
```

**3. 使用插槽數據**
```vue
<LayoutBoard v-slot="{ scale, alignOrientation }" :width="1000" :height="600">
    <div class="text-center">
        <p>當前縮放比例: {{ scale.toFixed(2) }}</p>
        <p>對齊方向: {{ alignOrientation }}</p>
        <div class="mt-4">
            <button class="daisy-btn daisy-btn-primary">
                響應式按鈕
            </button>
        </div>
    </div>
</LayoutBoard>
```

#### 事件監聽

```vue
<LayoutBoard @resize="handleResize">
    <!-- 內容 -->
</LayoutBoard>

<script setup>
const handleResize = (scale, contentHeight) => {
    console.log('縮放變化:', {
        scale,
        contentHeight,
        percentage: Math.round(scale * 100) + '%'
    })
}
</script>
```

### DaisyUI 組件

本專案使用 DaisyUI 提供的組件，例如：

```vue
<div class="daisy-card bg-base-100 shadow-xl">
    <div class="daisy-card-body">
        <h2 class="daisy-card-title">Card Title</h2>
        <p>Card description</p>
        <div class="daisy-card-actions justify-end">
            <button class="daisy-btn daisy-btn-primary">Action</button>
        </div>
    </div>
</div>
```

## ⚙️ 配置

### 環境變數

複製 `.env.example` 並重命名為 `.env`，然後設定您的環境變數：

```bash
cp .env.example .env
```

編輯 `.env` 文件：

```env
# 基本配置
BASE_URL=/
SITE_URL=https://your-domain.com

# 部署配置 (用於 deploy.sh)
SSH_USER=your-username
SSH_HOST=your-server.com
REMOTE_DIR=/path/to/your/website/directory
```

### Tailwind CSS 配置

在 `tailwind.config.js` 中自定義 Tailwind CSS：

```javascript
export default {
  content: [],
  theme: {
    extend: {
      // 自定義主題
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
```

## 🚀 部署

本專案包含自動化部署腳本 `deploy.sh`，可以輕鬆將編譯後的專案部署到遠端伺服器。

### 部署前準備

1. **設定環境變數**

   確保 `.env` 文件中包含部署相關的配置：
   ```env
   SSH_USER=your-username        # SSH 使用者名稱
   SSH_HOST=your-server.com      # 伺服器主機名或 IP
   REMOTE_DIR=/var/www/html      # 遠端目錄路徑
   ```

2. **設定 SSH 連接**

   建議設定 SSH 密鑰認證以避免每次輸入密碼：
   ```bash
   # 生成 SSH 密鑰（如果還沒有）
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   
   # 複製公鑰到遠端伺服器
   ssh-copy-id your-username@your-server.com
   ```

3. **確保伺服器權限**

   確保您的使用者對目標目錄有讀寫權限：
   ```bash
   # 在遠端伺服器上執行
   sudo chown -R your-username:your-username /var/www/html
   sudo chmod -R 755 /var/www/html
   ```

### 使用部署腳本

#### 方法 1: 使用 .env 配置（推薦）

```bash
# 確保腳本有執行權限
chmod +x deploy.sh

# 執行部署
./deploy.sh
```

#### 方法 2: 使用命令行參數

```bash
./deploy.sh your-username your-server.com /var/www/html
```

### 部署流程

部署腳本會執行以下步驟：

1. **讀取配置** - 從 `.env` 文件或命令行參數獲取部署配置
2. **測試連接** - 驗證是否能成功連接到目標伺服器
3. **確認部署** - 顯示部署資訊並等待確認
4. **編譯專案** - 執行 `npm run generate` 編譯靜態網站
5. **備份原檔案** - 將遠端目錄備份為帶時間戳的目錄
6. **上傳新檔案** - 使用 `rsync` 同步編譯後的檔案到遠端

### 部署範例輸出

```bash
$ ./deploy.sh
正在從 .env 讀取設定...
====================== 部署資訊 ======================
SSH 使用者: myuser
SSH 主機: example.com
遠端目錄: /var/www/html
=======================================================

正在測試與目標主機的連接...
成功連接到目標主機

是否繼續部署? (y/n): y
正在編譯專案...
編譯完成
正在備份遠端目錄...
備份已建立: /var/www/html_backup_20250821_143022
正在上傳檔案到伺服器...
部署完成!
備份目錄: /var/www/html_backup_20250821_143022
```

### 注意事項

- **自動備份**: 每次部署前會自動備份遠端目錄
- **Node.js 版本**: 腳本預設使用 Node.js 22，可根據需要修改
- **網路要求**: 需要穩定的網路連接和 SSH 存取權限
- **權限設定**: 確保對遠端目錄有適當的讀寫權限

### 回滾部署

如果部署出現問題，可以手動回滾到備份版本：

```bash
# 登入遠端伺服器
ssh your-username@your-server.com

# 查看可用備份
ls -la /var/www/html_backup_*

# 回滾到指定備份（將舊的移除，備份重新命名）
rm -rf /var/www/html
mv /var/www/html_backup_20250821_143022 /var/www/html
```

## 📚 文檔和資源

- [Nuxt 4 文檔](https://nuxt.com/docs)
- [Tailwind CSS 文檔](https://tailwindcss.com/docs)
- [DaisyUI 組件](https://daisyui.com/components/)
- [Sharp 圖片處理](https://sharp.pixelplumbing.com/)
- [UnLazy 懶加載](https://unlazy.byjohann.dev/)

## 📄 授權

MIT License
