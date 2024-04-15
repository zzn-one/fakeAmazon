<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import _ from 'lodash'
import { useUserStore, useOrderStore } from '@/stores/index'
const title = '订单管理'
const userStore = useUserStore()
const orderStore = useOrderStore()

//批量按钮操作----------------------------
//添加按钮todo
const addItem = () => {
  //获取用户的历史输入
  const order = ref(orderStore.getOrder(userStore.user.uid))
  if (order.value) {
    addFormObj.value = order.value
  }

  //打开dialog
  dialogVisible.value = true
}
//批量删除按钮todo
const batchDel = () => {
  const length = multipleSelection.value.length
  if (length === 0) {
    ElMessage({
      type: 'warning',
      message: '请选择要删除的订单！',
      grouping: true
    })
    return
  }
  //弹出确认框
  ElMessageBox.confirm(
    '即将删除选中的' + length + '条订单数据，是否继续？',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      //发送请求 删除选中订单 todo
      //删除成功后 重新获取table数据todo
      ElMessage({
        type: 'success',
        message: '选中的订单信息已删除！',
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
//添加订单-----------------------------------------------------
const dialogVisible = ref(false)
//todo添加订单页面关闭前的统一操作
const handleClose = (done: () => void) => {
  //保存用户输入
  orderStore.setOrder(userStore.user.uid, _.cloneDeep(addFormObj.value))

  done()
}
const addFormObj = ref<Order>({
  id: 0,
  name: '',
  status: false,
  account: '',
  phone: '',
  email: '',
  role: '',
  date: ''
})
const addFormRef = ref<FormInstance>()

//表单  添加订单 todo
const addForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      //提交表单
      //发送请求 todo
      const res = {
        code: 200,
        msg: '订单添加成功！'
      }
      if (res.code === 200) {
        //关闭dialog
        ElMessage({
          message: '订单添加成功！',
          type: 'success',
          grouping: true
        })
      } else {
        ElMessage({
          message: '订单添加失败！',
          type: 'error',
          grouping: true
        })
      }
    } else {
      return false
    }
  })
}

//table表格----------------------------------------------
interface Order {
  id: number
  name: string
  status: boolean
  account: string
  phone: string
  email: string
  role: string
  date: string
}
const tableData = ref<Order[]>([
  {
    id: 1,
    name: '张三',
    status: true,
    account: '123456789',
    phone: '13812345678',
    email: '12345678@qq.com',
    role: '管理员',
    date: '2023-03-21'
  },
  {
    id: 2,
    name: '李四',
    status: false,
    account: '987654321',
    phone: '13898765432',
    email: '987654321@qq.com',
    role: '普通用户',
    date: '2023-03-22'
  },
  {
    id: 3,
    name: '王五',
    status: true,
    account: '123456789',
    phone: '13812345678',
    email: '12345678@qq.com',
    role: '管理员',
    date: '2023-03-23'
  },
  {
    id: 4,
    name: '赵六',
    status: false,
    account: '987654321',
    phone: '13898765432',
    email: '987654321@qq.com',
    role: '普通用户',
    date: '2023-03-24'
  }
])
//查看按钮操作
const viewItem = (row: Order) => {
  toggleDrawer(row, 0, '查看订单信息')
}
//编辑按钮操作
const editItem = (row: Order) => {
  toggleDrawer(row, 1, '更改订单信息')
}
//删除按钮操作todo
const delItem = (row: Order) => {
  const Ordername = row.name
  //弹出确认框
  ElMessageBox.confirm(
    '即将删除订单[' + Ordername + ']，是否继续？',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      //发送请求 删除订单 todo
      //删除成功后 重新获取table数据todo
      ElMessage({
        type: 'success',
        message: '订单已删除！',
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
const multipleSelection = ref<Order[]>([])
const handleSelectionChange = (val: Order[]) => {
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
const formObj = ref<Order>({
  id: 0,
  name: '',
  status: false,
  account: '',
  phone: '',
  email: '',
  role: '',
  date: ''
})
//抽屉内容标记 0->查看  1 ->编辑   2 ->新增
const drawFlag = ref(0)
//抽屉内容切换
const toggleDrawer = (row: Order, flag: number = 0, title: string) => {
  if (flag === drawFlag.value && row.id === formObj.value.id) {
    drawerVisible.value = true
    return
  }
  drawFlag.value = flag
  drawerTitle.value = title
  formObj.value = _.cloneDeep(row)
  drawerVisible.value = true
}
//编辑表单---------------------------------
import { type FormInstance, type FormRules } from 'element-plus'

const formRef = ref<FormInstance>()

const rules = reactive<FormRules<Order>>({
  name: [
    { required: true, message: '请输入订单名', trigger: 'blur' },
    { min: 1, message: '订单名不能为空', trigger: 'blur' }
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

//表单  编辑订单 todo
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
//搜索------------------------------------------------------------
const searchCondition = ref({
  c1: '',
  c2: '',
  c3: '',
  flag: 0
})
const options1 = [
  {
    value: '选项1',
    label: '黄金糕'
  },
  {
    value: '选项2',
    label: '双皮奶'
  },
  {
    value: '选项3',
    label: '蚵仔煎'
  }
]
const options2 = [
  {
    value: '选项1',
    label: '黄金糕22222'
  },
  {
    value: '选项2',
    label: '双皮奶222'
  },
  {
    value: '选项3',
    label: '蚵仔煎222222'
  }
]
const options3 = [
  {
    value: 0,
    label: '买家姓名'
  },
  {
    value: 1,
    label: '品类'
  }
]
const search = () => {
  //发送请求 获取指定条件的table数据 todo
}

//订单状态切换 todo
const statusChange = (status: boolean = false, id: number = 0) => {
  console.log(status, id)
}
</script>

<template>
  <div class="main">
    <!-- 标题  搜索框  批量按钮操作 -->
    <div class="search">
      <div class="title">{{ title }}</div>
      <div class="btns">
        <div>
          <el-button type="success" @click="addItem">添加订单</el-button>
          <el-button type="danger" @click="batchDel">批量删除</el-button>
        </div>
        <div>
          <!-- 下拉列表1 -->
          <el-select
            class="btns-item"
            v-model="searchCondition.c1"
            clearable
            placeholder="选择筛选条件"
            style="width: 200px"
          >
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <!-- 下拉列表2 -->
          <el-select
            class="btns-item"
            v-model="searchCondition.c2"
            clearable
            placeholder="选择筛选条件"
            style="width: 200px"
          >
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <!-- 下拉列表3 -->
          <el-select
            class="btns-item"
            v-model="searchCondition.flag"
            clearable
            placeholder="选择搜索条件"
            style="width: 200px"
          >
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <!-- 输入框 -->
          <el-input
            class="btns-item"
            v-model="searchCondition.c3"
            placeholder="请输入搜索内容"
            style="width: 300px"
            clearable
          />

          <el-button type="primary" @click="search">搜索订单</el-button>
        </div>
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
        <el-table-column label="status">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              @change="statusChange(scope.row.status, scope.row.id)"
            />
          </template>
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
    <template v-else-if="drawFlag === 1"
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

        <el-form-item label="订单名" prop="name">
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
              <el-button type="primary" @click="editForm(formRef)">
                修改
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
  <!-- 添加订单dialog -->
  <el-dialog
    v-model="dialogVisible"
    title="添加订单"
    fullscreen
    center
    :before-close="handleClose"
    ><el-form
      ref="addFormRef"
      style="max-width: 600px"
      :model="addFormObj"
      :rules="rules"
      label-width="auto"
      status-icon
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="addFormObj.account" />
      </el-form-item>

      <el-form-item label="订单名" prop="name">
        <el-input v-model="addFormObj.name" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="addFormObj.phone" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addFormObj.email" />
      </el-form-item>

      <el-form-item>
        <div class="pwd-btns">
          <div></div>
          <div>
            <el-button type="success" @click="addForm(addFormRef)">
              添加
            </el-button>
          </div>
          <div>
            <el-button type="danger" @click="resetForm(addFormRef)">
              重置
            </el-button>
          </div>
          <div></div>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
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
    display: flex;
    div:first-child {
      flex: 1;
      min-width: 200px;
    }
    div:last-child {
      flex: 3;
    }
  }
}
// .data-list {
//   height: 870px;
// }
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
.btns-item {
  padding: 0 5px;
}
</style>
