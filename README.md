# 研究如何在一開始建置專案就設置 context path

![](https://img.shields.io/badge/Creator-Github%20Copilot-gray?logo=githubcopilot&logoColor=black&labelColor=white)

## 初始 prompt

```
用 vite + vue + scss 建立一個簡單的網站

有登入頁、登入後的歡迎頁、關於我們 這三個頁面

使用 .env.production 和 .env.development 來區分正測試環境設定

環境設定先設置一個環境變數：`CONTEXT_PATH` 作為網址前綴
```

參見 pr #1

## 功能特色

### 三個頁面
- **登入頁** - 使用者可以輸入帳號密碼登入系統
- **歡迎頁** - 登入後顯示歡迎訊息、使用者名稱和環境資訊
- **關於我們** - 展示專案簡介、技術棧和功能特色

### 路由保護
- 未登入時無法訪問歡迎頁，會自動導向登入頁
- 使用 sessionStorage 儲存登入狀態
- 登出後清除登入狀態並返回登入頁

### 環境配置
- **開發環境** (`.env.development`)：使用 `/dev` 作為 context path
- **正式環境** (`.env.production`)：使用 `/app` 作為 context path
- 通過 Vite 的環境變數系統自動切換配置

### SCSS 樣式
- 使用漸層背景美化介面
- 每個頁面有不同的視覺風格（紫色、粉色、藍色）
- 響應式設計，支援各種螢幕尺寸
- 組件化的 SCSS 樣式管理

## 技術棧

- **Vite** 7.2.2 - 快速的前端建構工具
- **Vue** 3.5.24 - 漸進式 JavaScript 框架
- **Vue Router** 4.6.3 - Vue.js 官方路由管理器
- **SASS** 1.94.0 - CSS 預處理器

## 專案結構

```
.
├── .env.development          # 開發環境配置
├── .env.production           # 正式環境配置
├── index.html                # HTML 入口文件
├── package.json              # 專案依賴配置
├── vite.config.js            # Vite 配置文件
├── src/
│   ├── main.js              # 應用程式入口
│   ├── App.vue              # 根組件
│   ├── style.css            # 全域樣式
│   ├── router/
│   │   └── index.js         # 路由配置
│   └── views/
│       ├── Login.vue        # 登入頁
│       ├── Welcome.vue      # 歡迎頁
│       └── About.vue        # 關於我們頁
└── public/
    └── vite.svg             # 靜態資源
```

## 安裝與使用

### 安裝依賴

```bash
npm install
```

### 開發環境

啟動開發伺服器：

```bash
npm run dev
```

訪問網址：http://localhost:5173/dev/

開發環境使用 `/dev` 作為 context path。

### 正式環境建置

建置正式版本：

```bash
npm run build
```

預覽正式版本：

```bash
npm run preview
```

訪問網址：http://localhost:4173/app/

正式環境使用 `/app` 作為 context path。

## 環境變數說明

專案使用 Vite 的環境變數系統：

### .env.development
```
VITE_CONTEXT_PATH=/dev
```

### .env.production
```
VITE_CONTEXT_PATH=/app
```

環境變數必須以 `VITE_` 開頭才能在客戶端代碼中訪問。

## 使用說明

1. **登入**
   - 打開應用程式會自動導向登入頁
   - 輸入任意使用者名稱和密碼即可登入（這是演示用途）
   - 點擊「登入」按鈕後會導向歡迎頁

2. **歡迎頁**
   - 顯示登入的使用者名稱
   - 顯示當前環境（development 或 production）
   - 顯示 Context Path 設定
   - 可以導向「關於我們」頁面或登出

3. **關於我們**
   - 展示專案資訊和技術棧
   - 顯示當前環境資訊
   - 未登入也可以訪問

4. **登出**
   - 在歡迎頁點擊「登出」按鈕
   - 清除登入狀態並返回登入頁

## 開發重點

### Context Path 配置

在 `vite.config.js` 中配置：

```javascript
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [vue()],
    base: env.VITE_CONTEXT_PATH || '/',
  }
})
```

在 Vue Router 中使用：

```javascript
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_CONTEXT_PATH || '/'),
  routes
})
```

### 路由保護

使用 Vue Router 的導航守衛：

```javascript
router.beforeEach((to, from, next) => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn')
  
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Login' })
  } else {
    next()
  }
})
```

## License

MIT
