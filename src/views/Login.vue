<template>
  <div class="login-container">
    <div class="login-box">
      <h1>登入</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">使用者名稱</label>
          <input 
            type="text" 
            id="username" 
            v-model="username" 
            placeholder="請輸入使用者名稱"
            required 
          />
        </div>
        <div class="form-group">
          <label for="password">密碼</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            placeholder="請輸入密碼"
            required 
          />
        </div>
        <button type="submit" class="login-btn">登入</button>
      </form>
      <div class="links">
        <router-link to="/about">關於我們</router-link>
      </div>
      <div v-if="error" class="error-message">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')

const handleLogin = () => {
  // Simple validation - accept any username/password for demo purposes
  if (username.value && password.value) {
    sessionStorage.setItem('isLoggedIn', 'true')
    sessionStorage.setItem('username', username.value)
    router.push('/welcome')
  } else {
    error.value = '請輸入使用者名稱和密碼'
  }
}
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-box {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  h1 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #333;
  }

  .form-group {
    margin-bottom: 1rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #555;
      font-weight: 500;
    }

    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      box-sizing: border-box;

      &:focus {
        outline: none;
        border-color: #667eea;
      }
    }
  }

  .login-btn {
    width: 100%;
    padding: 0.75rem;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: #5568d3;
    }
  }

  .links {
    margin-top: 1rem;
    text-align: center;

    a {
      color: #667eea;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .error-message {
    margin-top: 1rem;
    padding: 0.75rem;
    background: #fee;
    color: #c33;
    border-radius: 4px;
    text-align: center;
  }
}
</style>
