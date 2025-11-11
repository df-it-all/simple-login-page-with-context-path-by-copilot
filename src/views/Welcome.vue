<template>
  <div class="welcome-container">
    <div class="welcome-box">
      <h1>歡迎, {{ username }}!</h1>
      <p class="welcome-message">您已成功登入系統</p>
      <div class="info">
        <p><strong>環境:</strong> {{ environment }}</p>
        <p><strong>Context Path:</strong> {{ contextPath }}</p>
      </div>
      <div class="actions">
        <router-link to="/about" class="btn btn-secondary">關於我們</router-link>
        <button @click="handleLogout" class="btn btn-primary">登出</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const environment = ref('')
const contextPath = ref('')

onMounted(() => {
  username.value = sessionStorage.getItem('username') || '訪客'
  environment.value = import.meta.env.MODE
  contextPath.value = import.meta.env.VITE_CONTEXT_PATH || '/'
})

const handleLogout = () => {
  sessionStorage.removeItem('isLoggedIn')
  sessionStorage.removeItem('username')
  router.push('/')
}
</script>

<style scoped lang="scss">
.welcome-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.welcome-box {
  background: white;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  width: 100%;

  h1 {
    color: #333;
    margin-bottom: 1rem;
  }

  .welcome-message {
    color: #666;
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }

  .info {
    background: #f5f5f5;
    padding: 1.5rem;
    border-radius: 4px;
    margin-bottom: 2rem;
    text-align: left;

    p {
      margin: 0.5rem 0;
      color: #555;

      strong {
        color: #333;
      }
    }
  }

  .actions {
    display: flex;
    gap: 1rem;
    justify-content: center;

    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      transition: all 0.3s;

      &.btn-primary {
        background: #f5576c;
        color: white;

        &:hover {
          background: #e04456;
        }
      }

      &.btn-secondary {
        background: #667eea;
        color: white;

        &:hover {
          background: #5568d3;
        }
      }
    }
  }
}
</style>
