<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

import { useUserStore } from '@/stores/index'
const userStore = useUserStore()
const loginForm = ref({ id: 0, u1: '', u2: '' })
const userLogin = async () => {
  if (loginForm.value.u1 === '' || loginForm.value.u2 === '') {
    ElMessage({
      message: '用户名或密码不能为空',
      type: 'error',
      grouping: true
    })
    return
  }
  //todo 登录接口
  // 假设登录成功
  const resp = {
    data: {
      code: 200,
      msg: '登录成功',
      data: {
        id: 1,
        username: 'admin',
        password: '123456'
      }
    }
  }
  if (resp.data.code === 200) {
    //todo 存储token
    userStore.setToken('假token')
    //todo 存储用户信息
    userStore.setUser(resp.data.data)
    ElMessage({
      message: '登录成功',
      type: 'success',
      grouping: true
    })
    // 跳转
    router.push('/')
  }
  //登录失败 密码错误
}
</script>

<template>
  <div class="main">
    <div class="login-box">
      <div class="text-box">
        <div class="title">Login</div>
        <div class="input-box">
          <input type="text" v-model="loginForm.u1" placeholder="账号" />
          <input type="password" v-model="loginForm.u2" placeholder="密码" />
        </div>
        <a href="javascript:;" @click="userLogin"
          ><div class="login-btn">Login</div></a
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-btn {
  text-align: center;
  line-height: 40px;
  background-image: linear-gradient(to left, #fbc2eb, #a6c1ee);
}

.text-box a {
  display: block;
  margin: 0 50px;
  font-size: 18px;
  text-decoration: none;
  color: #ffffff;
}

.title {
  padding: 50px 0;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
}

.input-box {
  display: flex;
  flex-direction: column;
  padding: 50px;
}

.input-box input {
  margin-top: 10px;
  padding: 10px;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
}

.login-box {
  width: 400px;
  height: 500px;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 0 0 10px #f4c4f3;
  padding: 20px;
}

.main {
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
}
</style>
