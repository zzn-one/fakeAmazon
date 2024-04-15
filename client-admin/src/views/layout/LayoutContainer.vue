<script setup lang="ts">
import { ref, reactive } from 'vue'
import locale from 'element-plus/es/locale/lang/zh-cn'
import { useUserStore } from '@/stores/index'
import router from '@/router'
const title = '亚马逊管理后台'
const userStore = useUserStore()

//用户相关 -----------------------------------

const user = ref({
  name: 'admin',
  account: 'admin@163.com',
  role: '管理员'
})
//退出登录 todo
const logout = () => {
  //关闭按钮弹窗
  userEditVisible.value = false
  // 清除token
  userStore.removeToken()
  // 清除用户信息
  userStore.removeUser()
  // 跳转到登录页面
  router.push('/login')
}

const userEditVisible = ref(false)
//修改用户密码
const updateUserPwd = () => {
  //关闭按钮弹窗
  userEditVisible.value = false
  // 弹出修改密码弹窗
  pwdFormVisible.value = true
}
// 修改用户信息
const updateUserMsg = () => {
  userEditVisible.value = false
  //关闭按钮弹窗
  userEditVisible.value = false
  // 弹出修改信息弹窗
  msgFormVisible.value = true
}
// 修改密码的dialog
const pwdFormVisible = ref(false)

import { type FormInstance, type FormRules } from 'element-plus'

interface PwdForm {
  name: string
  account: string
  pwd1: string
  pwd2: string
  oldPwd: string
}

const pwdFormRef = ref<FormInstance>()
const pwdForm = reactive<PwdForm>({
  name: user.value.name,
  account: user.value.account,
  pwd1: '',
  pwd2: '',
  oldPwd: ''
})

const validatePwd1 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入新密码'))
  } else {
    if (pwdForm.pwd2 !== '') {
      if (!pwdFormRef.value) return
      pwdFormRef.value.validateField('pwd2', () => null)
    }
    callback()
  }
}
const validatePwd2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入新密码'))
  } else if (value !== pwdForm.pwd1) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}

const pwdRules = reactive<FormRules<PwdForm>>({
  pwd1: [{ validator: validatePwd1, trigger: 'blur' }],
  pwd2: [{ validator: validatePwd2, trigger: 'blur' }],
  oldPwd: [
    { required: true, message: '请输入旧密码', trigger: 'blur' },
    { min: 1, message: '旧密码不能为空', trigger: 'blur' }
  ]
})
//密码表单提交 todo
const submitPwdForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      //提交表单
      //发送请求 todo
      const res = {
        code: 202,
        msg: '修改密码成功！'
      }
      if (res.code === 200) {
        //关闭dialog
        pwdFormVisible.value = false

        ElMessage({
          message: '修改密码成功！',
          type: 'success',
          grouping: true
        })
      } else {
        ElMessage({
          message: '修改密码失败！',
          type: 'error',
          grouping: true
        })
      }
    } else {
      return false
    }
  })
}
//重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// 修改用户信息的dialog
const msgFormVisible = ref(false)

interface MsgForm {
  name: string
  account: string
  phone: string
  email: string
}

const msgFormRef = ref<FormInstance>()
const msgForm = reactive<MsgForm>({
  name: user.value.name,
  account: user.value.account,
  phone: '',
  email: ''
})
const msgRules = reactive<FormRules<MsgForm>>({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 1, message: '用户名不能为空', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { min: 11, max: 11, message: '手机号格式错误', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { min: 1, message: '邮箱不能为空', trigger: 'blur' }
  ]
})
//用户信息表单提交 todo
const submitMsgForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      //提交表单
      //发送请求 todo
      const res = {
        code: 200,
        msg: '修改信息成功！'
      }
      if (res.code === 200) {
        //关闭dialog
        msgFormVisible.value = false

        ElMessage({
          message: '修改信息成功！',
          type: 'success',
          grouping: true
        })
      } else {
        ElMessage({
          message: '修改信息失败！',
          type: 'error',
          grouping: true
        })
      }
    } else {
      return false
    }
  })
}
//用户相关 -----------------------------------
</script>

<template>
  <el-container class="container">
    <el-aside width="200px">
      <div class="title">{{ title }}</div>
      <!-- 导航菜单 -->
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="menu"
        default-active="/userList"
        text-color="#fff"
        router
      >
        <el-menu-item index="/userList">
          <span>用户管理</span>
        </el-menu-item>

        <el-menu-item index="/orderList">
          <span>订单管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container class="container">
      <el-header class="header">
        <!-- 用户信息展示 -->
        <div class="user">
          <el-popover
            trigger="click"
            :visible="userEditVisible"
            placement="bottom"
            :width="200"
          >
            <div>
              <div class="user-edit-btn">
                <el-button text @click="updateUserPwd"> 修改密码 </el-button>
              </div>
              <div class="user-edit-btn">
                <el-button text @click="updateUserMsg"> 修改信息 </el-button>
              </div>
              <div class="user-edit-btn">
                <el-button text @click="logout"> 退出系统 </el-button>
              </div>
            </div>
            <template #reference>
              <el-button @click="userEditVisible = true"
                >{{ user.role }}[ {{ user.name }} ]</el-button
              >
            </template>
          </el-popover>
        </div>
      </el-header>
      <el-main class="main">
        <el-config-provider :locale="locale">
          <router-view></router-view>
        </el-config-provider>
      </el-main>
    </el-container>
  </el-container>

  <!-- 修改密码的dialog -->
  <el-dialog v-model="pwdFormVisible" title="修改密码" width="700">
    <el-form
      ref="pwdFormRef"
      style="max-width: 600px"
      :model="pwdForm"
      :rules="pwdRules"
      label-width="auto"
      status-icon
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="pwdForm.account" disabled />
      </el-form-item>

      <el-form-item label="用户名" prop="name">
        <el-input v-model="pwdForm.name" disabled />
      </el-form-item>

      <el-form-item label="旧密码" prop="oldPwd">
        <el-input v-model="pwdForm.oldPwd" type="password" show-password />
      </el-form-item>
      <el-form-item label="新密码" prop="pwd1">
        <el-input v-model="pwdForm.pwd1" type="password" show-password />
      </el-form-item>
      <el-form-item label="确认新密码" prop="pwd2">
        <el-input v-model="pwdForm.pwd2" type="password" show-password />
      </el-form-item>

      <el-form-item>
        <div class="pwd-btns">
          <div></div>
          <div>
            <el-button type="primary" @click="submitPwdForm(pwdFormRef)">
              确认修改
            </el-button>
          </div>
          <div>
            <el-button type="danger" @click="resetForm(pwdFormRef)">
              重置表单
            </el-button>
          </div>
          <div></div>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- 修改用户信息的dialog -->
  <el-dialog v-model="msgFormVisible" title="修改信息" width="700">
    <el-form
      ref="msgFormRef"
      style="max-width: 600px"
      :model="msgForm"
      :rules="msgRules"
      label-width="auto"
      status-icon
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="msgForm.account" disabled />
      </el-form-item>

      <el-form-item label="用户名" prop="name">
        <el-input v-model="msgForm.name" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="msgForm.phone" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="msgForm.email" />
      </el-form-item>

      <el-form-item>
        <div class="pwd-btns">
          <div></div>
          <div>
            <el-button type="primary" @click="submitMsgForm(msgFormRef)">
              确认修改
            </el-button>
          </div>
          <div>
            <el-button type="danger" @click="resetForm(msgFormRef)">
              重置表单
            </el-button>
          </div>
          <div></div>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped lang="less">
.title {
  margin: 0;
  padding: 0;
  border: none;
  height: 60px;
  line-height: 60px;
  background-color: #545c64;
  color: #fff;
  text-align: center;
  font-size: 23px;
}
.user {
  float: right;
  line-height: 60px;
  margin-right: 20px;
}
.user-edit-btn {
  text-align: center;
  margin-bottom: 10px;
}
.pwd-btns {
  margin-top: 40px;
  display: flex;
  div {
    width: 200px;
  }
}

.menu {
  height: 94.4vh;
}
.header {
  background-color: rgba(67, 74, 80, 0.9);
}
/deep/.el-container,
/deep/.el-aside,
/deep/.el-main,
/deep/.el-header {
  margin: 0;
  padding: 0;
}
</style>
