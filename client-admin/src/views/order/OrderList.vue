<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import _ from 'lodash'
import moment from 'moment'
import { useUserStore, useOrderStore } from '@/stores/index'
const title = '订单管理'
const userStore = useUserStore()
const orderStore = useOrderStore()
interface Order {
  id: number
  main_type: number
  price: string
  num: number
  buyer_name: string
  product_type: string
  order_code: string
  picture_id: number
  real_product_url: string
  status: string
  product_name: string
  asin: string
  sku: string
  buyer_selection: string
  is_business: number
  publish_time: Date
  role: number
  publisher: string
  mark_str: string
  template_file: string
  show: number
  click_count: number
  seo_title: string
  seo_keyword: string
  seo_description: string
  static_page_model: number
}
interface Dict {
  id: number
  label: string
  value: number
  type?: number
  description?: string
}
//字典显示格式转换
const dictFormat = (value: number, dictList: Dict[]) => {
  let label = ''
  dictList.forEach((item) => {
    if (item.value === value) {
      label = item.label
    }
  })
  return label
}

//批量按钮操作----------------------------
//添加按钮todo
const addItem = () => {
  //获取用户的历史输入
  const order = ref(orderStore.getOrder(userStore.user.id))
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
  orderStore.setOrder(userStore.user.id, _.cloneDeep(addFormObj.value))

  done()
}
const addFormObj = ref<Order>({
  id: 0,
  main_type: 0,
  price: '',
  num: 0,
  buyer_name: '',
  product_type: '',
  order_code: '',
  picture_id: 0,
  real_product_url: '',
  status: '',
  product_name: '',
  asin: '',
  sku: '',
  buyer_selection: '',
  is_business: 0,
  publish_time: new Date(),
  role: 0,
  publisher: '',
  mark_str: '',
  template_file: '',
  show: 0,
  click_count: 0,
  seo_title: '',
  seo_keyword: '',
  seo_description: '',
  static_page_model: 0
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

const tableData = ref<Order[]>([
  {
    id: 1,
    main_type: 1,
    price: '100',
    num: 10,
    buyer_name: '张三',
    product_type: '电子产品',
    order_code: '123456789',
    picture_id: 1,
    real_product_url: 'https://www.baidu.com',
    status: '待发货',
    product_name: '手机',
    asin: '123456789',
    sku: '123456789',
    buyer_selection: '黑色',
    is_business: 1,
    publish_time: new Date(),
    role: 1,
    publisher: '张三',
    mark_str: '备注信息',
    template_file: '模板文件',
    show: 1,
    click_count: 100,
    seo_title: 'SEO标题',
    seo_keyword: 'SEO关键词',
    seo_description: 'SEO描述',
    static_page_model: 1
  },
  {
    id: 2,
    main_type: 1,
    price: '100',
    num: 10,
    buyer_name: '张三',
    product_type: '电子产品',
    order_code: '123456789',
    picture_id: 1,
    real_product_url: 'https://www.baidu.com',
    status: '待发货',
    product_name: '手机',
    asin: '123456789',
    sku: '123456789',
    buyer_selection: '黑色',
    is_business: 1,
    publish_time: new Date(),
    role: 1,
    publisher: '张三',
    mark_str: '备注信息',
    template_file: '模板文件',
    show: 1,
    click_count: 100,
    seo_title: 'SEO标题',
    seo_keyword: 'SEO关键词',
    seo_description: 'SEO描述',
    static_page_model: 1
  },
  {
    id: 3,
    main_type: 1,
    price: '100',
    num: 10,
    buyer_name: '张三',
    product_type: '电子产品',
    order_code: '123456789',
    picture_id: 1,
    real_product_url: 'https://www.baidu.com',
    status: '待发货',
    product_name: '手机',
    asin: '123456789',
    sku: '123456789',
    buyer_selection: '黑色',
    is_business: 1,
    publish_time: new Date(),
    role: 1,
    publisher: '张三',
    mark_str: '备注信息',
    template_file: '模板文件',
    show: 1,
    click_count: 100,
    seo_title: 'SEO标题',
    seo_keyword: 'SEO关键词',
    seo_description: 'SEO描述',
    static_page_model: 1
  },
  {
    id: 4,
    main_type: 1,
    price: '100',
    num: 10,
    buyer_name: '张三',
    product_type: '电子产品',
    order_code: '123456789',
    picture_id: 1,
    real_product_url: 'https://www.baidu.com',
    status: '待发货',
    product_name: '手机',
    asin: '123456789',
    sku: '123456789',
    buyer_selection: '黑色',
    is_business: 1,
    publish_time: new Date(),
    role: 1,
    publisher: '张三',
    mark_str: '备注信息',
    template_file: '模板文件',
    show: 1,
    click_count: 100,
    seo_title: 'SEO标题',
    seo_keyword: 'SEO关键词',
    seo_description: 'SEO描述',
    static_page_model: 1
  },
  {
    id: 5,
    main_type: 1,
    price: '100',
    num: 10,
    buyer_name: '张三',
    product_type: '电子产品',
    order_code: '123456789',
    picture_id: 1,
    real_product_url: 'https://www.baidu.com',
    status: '待发货',
    product_name: '手机',
    asin: '123456789',
    sku: '123456789',
    buyer_selection: '黑色',
    is_business: 1,
    publish_time: new Date(),
    role: 1,
    publisher: '张三',
    mark_str: '备注信息',
    template_file: '模板文件',
    show: 1,
    click_count: 100,
    seo_title: 'SEO标题',
    seo_keyword: 'SEO关键词',
    seo_description: 'SEO描述',
    static_page_model: 1
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
  const Ordername = row.product_name
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
  main_type: 0,
  price: '',
  num: 0,
  buyer_name: '',
  product_type: '',
  order_code: '',
  picture_id: 0,
  real_product_url: '',
  status: '',
  product_name: '',
  asin: '',
  sku: '',
  buyer_selection: '',
  is_business: 0,
  publish_time: new Date(),
  role: 0,
  publisher: '',
  mark_str: '',
  template_file: '',
  show: 0,
  click_count: 0,
  seo_title: '',
  seo_keyword: '',
  seo_description: '',
  static_page_model: 0
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
//todo  rule规则
const rules = reactive<FormRules<Order>>({
  product_name: [
    { required: true, message: '请输入订单名', trigger: 'blur' },
    { min: 1, message: '订单名不能为空', trigger: 'blur' }
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
const options1: Dict[] = [
  {
    id: 0,
    label: '全部',
    value: 0
  },
  {
    id: 1,
    label: '待审核',
    value: 1
  },
  {
    id: 2,
    label: '已审核',
    value: 2
  }
]
const options2: Dict[] = [
  {
    id: 0,
    label: '全部',
    value: 0
  },
  {
    id: 1,
    label: '待发货',
    value: 1
  },
  {
    id: 2,
    label: '已发货',
    value: 2
  }
]
const options3: Dict[] = [
  {
    id: 0,
    label: '买家姓名',
    value: 0
  },
  {
    id: 1,
    label: '品类',
    value: 1
  }
]
const search = () => {
  //发送请求 重新获取table数据 todo
}

//订单状态切换 todo
const statusChange = (status: boolean = false, id: number = 0) => {
  console.log(status, id)
}
//查看图片dialog  预览/查看 -----------------------------------------------------------------------------------------
//预览/查看图片
const imgDialogVisibel = ref(false)
let productImgUrl =
  'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
const viewImg = (imgUrl: string) => {
  productImgUrl = imgUrl
  //打开dialog
  imgDialogVisibel.value = true
}
//上传图片dialog ------------------------------------------------------------------------------
//上传图片按钮点击事件
const uploadDialogVisibel = ref(false)
const openUploadDialog = () => {
  //  打开 上传图片dialog
  uploadDialogVisibel.value = true
}

//todo 发送请求获取多个dict
//主分类
const main_type_dict: Dict[] = [
  {
    id: 0,
    label: '分类1',
    value: 1
  },
  {
    id: 1,
    label: '分类2',
    value: 2
  }
]
//是否企业买家
const is_business_dict: Dict[] = [
  {
    id: 0,
    label: '个人买家',
    value: 0
  },
  {
    id: 1,
    label: '企业买家',
    value: 1
  }
]
//角色
const role_dict: Dict[] = [
  {
    id: 0,
    label: '普通用户',
    value: 0
  },
  {
    id: 1,
    label: '管理员',
    value: 1
  }
]
//是否显示
const show_dict: Dict[] = [
  {
    id: 0,
    label: '不显示',
    value: 0
  },
  {
    id: 1,
    label: '显示',
    value: 1
  }
]
//是否静态化
const static_page_model_dict: Dict[] = [
  {
    id: 0,
    label: '动态',
    value: 0
  },
  {
    id: 1,
    label: '静态',
    value: 1
  }
]
//日期选择器
const shortcuts = [
  {
    text: '今天',
    value: new Date()
  },
  {
    text: '昨天',
    value: () => {
      const date = new Date()
      date.setDate(date.getDate() - 1)
      return date
    }
  },
  {
    text: '一周前',
    value: () => {
      const date = new Date()
      date.setDate(date.getDate() - 7)
      return date
    }
  }
]
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

        <el-table-column label="状态">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              @change="statusChange(scope.row.status, scope.row.id)"
            />
          </template>
        </el-table-column>
        <el-table-column property="main_type" label="主分类" />

        <el-table-column label="买家姓名">
          <template #default="scope"
            >{{ scope.row.buyer_name }}
            <el-button type="text" @click="viewImg('imgUrltodo')"
              >查看图片</el-button
            ></template
          >
        </el-table-column>
        <el-table-column property="price" label="售价" />
        <el-table-column property="product_type" label="品类" />

        <el-table-column label="发布时间" show-overflow-tooltip>
          <template #default="scope">{{
            moment(scope.row.publish_time).format('YYYY-MM-DD HH:mm:ss')
          }}</template>
        </el-table-column>

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
    <!--查看订单信息  -->
    <template v-if="drawFlag === 0">
      <el-descriptions
        :title="formObj.product_name"
        border
        :column="1"
        size="large"
      >
        <el-descriptions-item label="商品名称">{{
          formObj.product_name
        }}</el-descriptions-item>
        <el-descriptions-item label="图片"
          ><el-button type="text" @click="viewImg('imgUrltodo')"
            >查看图片</el-button
          >
        </el-descriptions-item>
        <el-descriptions-item label="主分类"
          >{{ formObj.main_type }}
          <!--  todo 格式转换 dictFormat(value,dictList) -->
        </el-descriptions-item>
        <el-descriptions-item label="价格">{{
          formObj.price
        }}</el-descriptions-item>
        <el-descriptions-item label="数量">{{
          formObj.num
        }}</el-descriptions-item>
        <el-descriptions-item label="买家名称">{{
          formObj.buyer_name
        }}</el-descriptions-item>
        <el-descriptions-item label="品类">{{
          formObj.product_type
        }}</el-descriptions-item>
        <el-descriptions-item label="订单编号">{{
          formObj.order_code
        }}</el-descriptions-item>
        <el-descriptions-item label="真实商品链接">{{
          formObj.real_product_url
        }}</el-descriptions-item>
        <el-descriptions-item label="订单状态">{{
          formObj.status
        }}</el-descriptions-item>
        <el-descriptions-item label="ASIN">{{
          formObj.asin
        }}</el-descriptions-item>
        <el-descriptions-item label="SKU">{{
          formObj.sku
        }}</el-descriptions-item>
        <el-descriptions-item label="买家选项">{{
          formObj.buyer_selection
        }}</el-descriptions-item>
        <el-descriptions-item label="是否企业买家"
          >{{ formObj.is_business }}
          <!--  todo 格式转换 dictFormat(value,dictList) -->
        </el-descriptions-item>
        <el-descriptions-item label="发布时间">{{
          moment(formObj.publish_time).format('YYYY-MM-DD HH:mm:ss')
        }}</el-descriptions-item>
        <el-descriptions-item label="角色"
          >{{ formObj.role }}
          <!--  todo 格式转换 dictFormat(value,dictList) -->
        </el-descriptions-item>
        <el-descriptions-item label="发布人">{{
          formObj.publisher
        }}</el-descriptions-item>
        <el-descriptions-item label="表示串">{{
          formObj.mark_str
        }}</el-descriptions-item>
        <el-descriptions-item label="模板文件">{{
          formObj.template_file
        }}</el-descriptions-item>
        <el-descriptions-item label="显示"
          >{{ formObj.show }}
          <!--  todo 格式转换 dictFormat(value,dictList) -->
        </el-descriptions-item>
        <el-descriptions-item label="点击次数">{{
          formObj.click_count
        }}</el-descriptions-item>
        <el-descriptions-item label="SEO标题">{{
          formObj.seo_title
        }}</el-descriptions-item>
        <el-descriptions-item label="SEO关键字">{{
          formObj.seo_keyword
        }}</el-descriptions-item>
        <el-descriptions-item label="SEO描述">{{
          formObj.seo_description
        }}</el-descriptions-item>
        <el-descriptions-item label="静态页面模式"
          >{{ formObj.static_page_model }}
          <!--  todo 格式转换 dictFormat(value,dictList) -->
        </el-descriptions-item>
      </el-descriptions>
    </template>
    <!-- 表单  编辑 -->
    <template v-else-if="drawFlag === 1">
      <!-- todo 图片上传 -->
      <div class="img-upload">
        <div class="img-title">图片</div>
        <div class="img-btns">
          <el-button @click="viewImg('imgUrltodo')" type="primary"
            >查看图片</el-button
          >
          <el-button @click="openUploadDialog" type="success"
            >上传图片 todo 更改formObj.picture_id</el-button
          >
        </div>
      </div>

      <el-form
        ref="formRef"
        style="max-width: 800px"
        :model="formObj"
        :rules="rules"
        label-width="auto"
        status-icon
      >
        <el-form-item label="商品名称" prop="product_name">
          <el-input v-model="formObj.product_name" />
        </el-form-item>
        <el-form-item label="图片id" prop="picture_id">
          <el-input v-model="formObj.picture_id" disabled />
        </el-form-item>

        <el-form-item label="主分类" prop="main_type">
          <el-select
            v-model="formObj.main_type"
            clearable
            placeholder="选择主分类"
          >
            <el-option
              v-for="item in main_type_dict"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="formObj.price" />
        </el-form-item>
        <el-form-item label="数量" prop="num">
          <el-input v-model="formObj.num" />
        </el-form-item>
        <el-form-item label="买家名称" prop="buyer_name">
          <el-input v-model="formObj.buyer_name" />
        </el-form-item>
        <el-form-item label="品类" prop="product_type">
          <el-input v-model="formObj.product_type" />
        </el-form-item>
        <el-form-item label="订单编号" prop="order_code">
          <el-input v-model="formObj.order_code" />
        </el-form-item>

        <el-form-item label="真实商品链接" prop="real_product_url">
          <el-input v-model="formObj.real_product_url" />
        </el-form-item>
        <el-form-item label="订单状态" prop="status">
          <!-- todo -->
          <el-input v-model="formObj.status" />
        </el-form-item>
        <el-form-item label="ASIN" prop="asin">
          <el-input v-model="formObj.asin" />
        </el-form-item>
        <el-form-item label="SKU" prop="sku">
          <el-input v-model="formObj.sku" />
        </el-form-item>
        <el-form-item label="买家选项" prop="buyer_selection">
          <el-input v-model="formObj.buyer_selection" />
        </el-form-item>
        <el-form-item label="是否企业买家" prop="is_business">
          <el-select
            v-model="formObj.is_business"
            clearable
            placeholder="是否企业买家"
          >
            <el-option
              v-for="item in is_business_dict"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间" prop="publish_time">
          <el-date-picker
            v-model="formObj.publish_time"
            type="datetime"
            placeholder="选择发布时间"
            :shortcuts="shortcuts"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="formObj.role" clearable placeholder="选择角色">
            <el-option
              v-for="item in role_dict"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="发布人" prop="publisher">
          <el-input v-model="formObj.publisher" />
        </el-form-item>
        <el-form-item label="表示串" prop="mark_str">
          <el-input v-model="formObj.mark_str" />
        </el-form-item>
        <el-form-item label="模板文件" prop="template_file">
          <el-input v-model="formObj.template_file" />
        </el-form-item>
        <el-form-item label="显示" prop="show">
          <el-select v-model="formObj.show" clearable placeholder="是否显示">
            <el-option
              v-for="item in show_dict"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="点击次数" prop="click_count">
          <el-input v-model="formObj.click_count" />
        </el-form-item>
        <el-form-item label="SEO标题" prop="seo_title">
          <el-input v-model="formObj.seo_title" />
        </el-form-item>
        <el-form-item label="SEO关键字" prop="seo_keyword">
          <el-input v-model="formObj.seo_keyword" />
        </el-form-item>
        <el-form-item label="SEO描述" prop="seo_description">
          <el-input v-model="formObj.seo_description" />
        </el-form-item>
        <el-form-item label="静态页面模式" prop="static_page_model">
          <el-select
            v-model="formObj.static_page_model"
            clearable
            placeholder="选择静态页面模式"
          >
            <el-option
              v-for="item in static_page_model_dict"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <div class="pwd-btns">
            <div></div>
            <div>
              <el-button type="primary" @click="editForm(formRef)">
                修改订单
              </el-button>
            </div>
            <div>
              <el-button type="danger" @click="resetForm(formRef)">
                重置输入
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
      style="max-width: 800px"
      :model="addFormObj"
      :rules="rules"
      label-width="auto"
      status-icon
      class="form"
    >
      <el-form-item label="商品名称" prop="product_name" class="form_item">
        <el-input v-model="formObj.product_name" />
      </el-form-item>
      <el-form-item label="主分类" prop="main_type" class="form_item">
        <el-input v-model="formObj.main_type" />
      </el-form-item>
      <el-form-item label="价格" prop="price" class="form_item">
        <el-input v-model="formObj.price" />
      </el-form-item>
      <el-form-item label="数量" prop="num" class="form_item">
        <el-input v-model="formObj.num" />
      </el-form-item>
      <el-form-item label="买家名称" prop="buyer_name" class="form_item">
        <el-input v-model="formObj.buyer_name" />
      </el-form-item>
      <el-form-item label="品类" prop="product_type" class="form_item">
        <el-input v-model="formObj.product_type" />
      </el-form-item>
      <el-form-item label="订单编号" prop="order_code" class="form_item">
        <el-input v-model="formObj.order_code" />
      </el-form-item>

      <el-form-item
        label="真实商品链接"
        prop="real_product_url"
        class="form_item"
      >
        <el-input v-model="formObj.real_product_url" />
      </el-form-item>
      <el-form-item label="订单状态" prop="status" class="form_item">
        <el-input v-model="formObj.status" />
      </el-form-item>
      <el-form-item label="ASIN" prop="asin" class="form_item">
        <el-input v-model="formObj.asin" />
      </el-form-item>
      <el-form-item label="SKU" prop="sku" class="form_item">
        <el-input v-model="formObj.sku" />
      </el-form-item>
      <el-form-item label="买家选项" prop="buyer_selection" class="form_item">
        <el-input v-model="formObj.buyer_selection" />
      </el-form-item>
      <el-form-item label="是否企业买家" prop="is_business" class="form_item">
        <el-input v-model="formObj.is_business" />
      </el-form-item>
      <el-form-item label="发布时间" prop="publish_time" class="form_item">
        <el-input v-model="formObj.publish_time" />
      </el-form-item>
      <el-form-item label="角色" prop="role" class="form_item">
        <el-input v-model="formObj.role" />
      </el-form-item>
      <el-form-item label="发布人" prop="publisher" class="form_item">
        <el-input v-model="formObj.publisher" />
      </el-form-item>
      <el-form-item label="表示串" prop="mark_str" class="form_item">
        <el-input v-model="formObj.mark_str" />
      </el-form-item>
      <el-form-item label="模板文件" prop="template_file" class="form_item">
        <el-input v-model="formObj.template_file" />
      </el-form-item>
      <el-form-item label="显示" prop="show" class="form_item">
        <el-input v-model="formObj.show" />
      </el-form-item>
      <el-form-item label="点击次数" prop="click_count" class="form_item">
        <el-input v-model="formObj.click_count" />
      </el-form-item>
      <el-form-item label="SEO标题" prop="seo_title" class="form_item">
        <el-input v-model="formObj.seo_title" />
      </el-form-item>
      <el-form-item label="SEO关键字" prop="seo_keyword" class="form_item">
        <el-input v-model="formObj.seo_keyword" />
      </el-form-item>
      <el-form-item label="SEO描述" prop="seo_description" class="form_item">
        <el-input v-model="formObj.seo_description" />
      </el-form-item>
      <el-form-item
        label="静态页面模式"
        prop="static_page_model"
        class="form_item"
      >
        <el-input v-model="formObj.static_page_model" />
      </el-form-item>

      <el-form-item label="图片ID" prop="picture_id" class="form_item">
        <el-input v-model="formObj.picture_id" />
        <!-- 上传 按钮 todo-->
        <!-- 预览 按钮 todo-->
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

  <!-- 图片查看/预览dialog -->
  <el-dialog w-full v-model="imgDialogVisibel"
    ><img :src="productImgUrl"
  /></el-dialog>
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
.form {
  margin: 50px auto 0;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  .form_item {
    width: 50%;
    padding: 0 20px;
  }
}
.img-upload {
  display: flex;

  .img-btns {
    padding: 0 0 10px;
  }
  .img-title {
    padding: 0 30px 10px 40px;
    text-align: right;
    line-height: 42px;
  }
}
</style>
