<template>
  <div class="about-container">
    <div class="about-box">
      <h1>關於我們</h1>
      <div class="content">
        <section>
          <h2>專案簡介</h2>
          <p>這是一個使用 Vite + Vue 3 + SCSS 建立的簡單登入系統範例。</p>
        </section>
        
        <section>
          <h2>技術棧</h2>
          <ul>
            <li>Vite - 快速的前端建構工具</li>
            <li>Vue 3 - 漸進式 JavaScript 框架</li>
            <li>Vue Router - Vue.js 官方路由管理器</li>
            <li>SCSS - CSS 預處理器</li>
          </ul>
        </section>

        <section>
          <h2>功能特色</h2>
          <ul>
            <li>支援開發和正式環境的 Context Path 配置</li>
            <li>簡單的登入驗證機制</li>
            <li>路由保護功能</li>
            <li>響應式設計</li>
          </ul>
        </section>

        <section>
          <h2>環境資訊</h2>
          <div class="env-info">
            <p><strong>當前環境:</strong> {{ environment }}</p>
            <p><strong>Context Path:</strong> {{ contextPath }}</p>
          </div>
        </section>
      </div>
      
      <div class="actions">
        <router-link to="/" class="btn">返回登入</router-link>
        <router-link 
          v-if="isLoggedIn" 
          to="/welcome" 
          class="btn btn-primary"
        >
          返回歡迎頁
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const environment = ref('')
const contextPath = ref('')
const isLoggedIn = ref(false)

onMounted(() => {
  environment.value = import.meta.env.MODE
  contextPath.value = import.meta.env.VITE_CONTEXT_PATH || '/'
  isLoggedIn.value = !!sessionStorage.getItem('isLoggedIn')
})
</script>

<style scoped lang="scss">
.about-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  padding: 2rem;
}

.about-box {
  background: white;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  width: 100%;

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 2rem;
  }

  .content {
    section {
      margin-bottom: 2rem;

      h2 {
        color: #4facfe;
        font-size: 1.3rem;
        margin-bottom: 1rem;
      }

      p {
        color: #666;
        line-height: 1.6;
      }

      ul {
        color: #666;
        line-height: 1.8;
        padding-left: 1.5rem;

        li {
          margin-bottom: 0.5rem;
        }
      }

      .env-info {
        background: #f5f5f5;
        padding: 1rem;
        border-radius: 4px;
        margin-top: 1rem;

        p {
          margin: 0.5rem 0;

          strong {
            color: #333;
          }
        }
      }
    }
  }

  .actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;

    .btn {
      padding: 0.75rem 1.5rem;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.3s;

      &:hover {
        background: #5568d3;
      }

      &.btn-primary {
        background: #4facfe;

        &:hover {
          background: #3b9be5;
        }
      }
    }
  }
}
</style>
