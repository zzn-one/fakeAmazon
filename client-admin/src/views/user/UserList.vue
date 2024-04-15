<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import _ from 'lodash'

const title = '用户管理'

//批量按钮操作----------------------------
//添加按钮todo
const addItem = () => {
  const newUser = ref<User>({
    uid: 0,
    name: '',
    account: '',
    phone: '',
    email: '',
    role: '',
    date: ''
  })
  toggleDrawer(newUser.value, 2, '添加用户')
}
//批量删除按钮todo
const batchDel = () => {
  const length = multipleSelection.value.length
  if (length === 0) {
    ElMessage({
      type: 'warning',
      message: '请选择要删除的用户！',
      grouping: true
    })
    return
  }
  //弹出确认框
  ElMessageBox.confirm(
    '即将删除选中的' + length + '条用户数据，是否继续？',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      //发送请求 删除选中用户 todo
      //删除成功后 重新获取table数据todo
      ElMessage({
        type: 'success',
        message: '选中的用户信息已删除！',
        grouping: true
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '批量删除操作取消',
        grouping: true
      })
    })
}

//table表格----------------------------------------------
interface User {
  uid: number
  name: string
  account: string
  phone: string
  email: string
  role: string
  date: string
}
const tableData = ref<User[]>([
  //生成假数据
  {
    uid: 1,
    name: '张三',
    account: 'zhangsan',
    phone: '13812345678',
    email: 'zhangsan@qq.com',
    role: '管理员',
    date: '2023-04-12'
  },
  {
    uid: 2,
    name: '李四',
    account: 'lisi',
    phone: '13812345678',
    email: 'lisi@qq.com',
    role: '普通用户',
    date: '2023-04-12'
  },
  {
    uid: 3,
    name: '王五',
    account: 'wangwu',
    phone: '13812345678',
    email: 'wangwu@qq.com',
    role: '普通用户',
    date: '2023-04-12'
  },
  {
    uid: 4,
    name: '赵六',
    account: 'zhaoliu',
    phone: '13812345678',
    email: 'zhaoliu@qq.com',
    role: '普通用户',
    date: '2023-04-12'
  }
])
//查看按钮操作
const viewItem = (row: User) => {
  toggleDrawer(row, 0, '查看用户信息')
}
//编辑按钮操作
const editItem = (row: User) => {
  toggleDrawer(row, 1, '更改用户信息')
}
//删除按钮操作todo
const delItem = (row: User) => {
  const username = row.name
  //弹出确认框
  ElMessageBox.confirm(
    '即将删除用户[' + username + ']，是否继续？',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      //发送请求 删除用户 todo
      //删除成功后 重新获取table数据todo
      ElMessage({
        type: 'success',
        message: '用户[' + username + ']已删除！',
        grouping: true
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除操作取消',
        grouping: true
      })
    })
}
//序号
const indexMethod = (index: number) => {
  return (currentPage.value - 1) * pageSize.value + index + 1
}
//多选
const multipleSelection = ref<User[]>([])
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}
// 分页-----------------------------------------
const currentPage = ref(1)
const pageSize = ref(10)
const total = 1000
const pageSizes = [10, 20, 50, 100]

//监听currentPage和pageSize的变化
watch([currentPage, pageSize], () => {
  //发送请求 重新获取table数据 todo
})
//抽屉-----------------------------------------
const drawerVisible = ref(false)
const drawerTitle = ref('')
const formObj = ref<User>({
  uid: 0,
  name: '',
  account: '',
  phone: '',
  email: '',
  role: '',
  date: ''
})
//抽屉内容标记 0->查看  1 ->编辑   2 ->新增
const drawFlag = ref(0)
//抽屉内容切换
const toggleDrawer = (row: User, flag: number = 0, title: string) => {
  if (flag === drawFlag.value && _.isEqual(row, formObj.value)) {
    drawerVisible.value = true
    return
  }
  drawFlag.value = flag
  drawerTitle.value = title
  formObj.value = _.cloneDeep(row)
  drawerVisible.value = true
}
//表单---------------------------------
import { type FormInstance, type FormRules } from 'element-plus'

const formRef = ref<FormInstance>()

const rules = reactive<FormRules<User>>({
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
//表单  新增用户 todo
const addForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      //提交表单
      //发送请求 todo
      const res = {
        code: 200,
        msg: '新增用户成功！'
      }
      if (res.code === 200) {
        ElMessage({
          message: '新增用户成功！',
          type: 'success',
          grouping: true
        })

        //关闭dialog
        drawerVisible.value = false
      } else {
        ElMessage({
          message: '新增用户失败！',
          type: 'error',
          grouping: true
        })
      }
    } else {
      return false
    }
  })
}
//表单  编辑用户 todo
const editForm = (formEl: FormInstance | undefined) => {
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
        drawerVisible.value = false

        ElMessage({
          message: '修改信息成功！',
          type: 'success',
          grouping: true
        })
        //关闭dialog
        drawerVisible.value = false
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
//重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
  <div class="main">
    <!-- 标题  搜索框  批量按钮操作 -->
    <div class="search">
      <div class="title">{{ title }}</div>
      <div class="btns">
        <el-button type="success" @click="addItem">添加用户</el-button>
        <el-button type="danger" @click="batchDel">批量删除</el-button>
      </div>
    </div>
    <!-- table数据区 -->
    <div class="data-list">
      <el-table
        height="810"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        stripe
        table-layout="fixed"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          label="序号"
          type="index"
          :index="indexMethod"
          width="80"
        />
        <el-table-column label="Date">
          <template #default="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column property="name" label="Name" />
        <el-table-column
          property="address"
          label="Address"
          show-overflow-tooltip
        />
        <el-table-column label="操作" width="240" min-width="240"
          ><template #default="scope">
            <el-button type="success" @click="viewItem(scope.row)"
              >查看</el-button
            >

            <el-button type="primary" @click="editItem(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" @click="delItem(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="page">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
  <!-- 右侧抽屉  -->
  <el-drawer
    v-model="drawerVisible"
    direction="rtl"
    :title="drawerTitle"
    destroy-on-close="true"
  >
    <template v-if="drawFlag === 0">
      <el-descriptions :title="formObj.name" border :column="1" size="large">
        <el-descriptions-item label="p1">{{
          formObj.account
        }}</el-descriptions-item>
        <el-descriptions-item label="p2">{{
          formObj.phone
        }}</el-descriptions-item>
        <el-descriptions-item label="p3">{{
          formObj.email
        }}</el-descriptions-item>
        <el-descriptions-item label="p4">{{
          formObj.role
        }}</el-descriptions-item>
        <el-descriptions-item label="p5">{{
          formObj.date
        }}</el-descriptions-item>
      </el-descriptions>
    </template>
    <!-- 表单  添加或编辑 -->
    <template v-else-if="drawFlag === 1 || drawFlag === 2"
      ><el-form
        ref="formRef"
        style="max-width: 600px"
        :model="formObj"
        :rules="rules"
        label-width="auto"
        status-icon
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="formObj.account" />
        </el-form-item>

        <el-form-item label="用户名" prop="name">
          <el-input v-model="formObj.name" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formObj.phone" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formObj.email" />
        </el-form-item>

        <el-form-item>
          <div class="pwd-btns">
            <div></div>
            <div>
              <el-button
                v-if="drawFlag === 1"
                type="primary"
                @click="editForm(formRef)"
              >
                修改
              </el-button>
              <el-button v-else type="success" @click="addForm(formRef)">
                新增
              </el-button>
            </div>
            <div>
              <el-button type="danger" @click="resetForm(formRef)">
                重置
              </el-button>
            </div>
            <div></div>
          </div>
        </el-form-item>
      </el-form>
    </template>
  </el-drawer>
</template>

<style scoped lang="less">
.search {
  height: 120px;
  .title {
    height: 50%;
    text-align: left;
    padding: 0 0 0 10px;
    line-height: 60px;
    font-size: 20px;
  }
  .btns {
    height: 50%;
    padding: 0 0 0 10px;
  }
}
.page {
  padding: 20px;
}
.pwd-btns {
  margin-top: 40px;
  display: flex;
  div {
    width: 200px;
  }
}
</style>
