<script setup>
//登陆表格状态


import {ElMessage, ElMessageBox, ElNotification} from "element-plus";
import router from "~/router/index.js";
import {useLoginFormOpen} from "~/store/index.js";

const loginForm = useLoginFormOpen()


const isLogin = ref(true)//表格是否是登陆界面

const loginTitle = ref("登录")//表格标题
const logged_in = ref(true)//登录状态
const userInfo = ref(null)//用户信息
const nickname = ref("")//用户名
const avatarUrl = ref("") //用户头像Url，用于前端图片显示

//用户登陆表格
const form = reactive({
  username: '',
  password: '',
  email: '',
  passwordTwice: ''
})
const avatar = ref()//用户头像


const windowWidth = ref(document.body.clientWidth)
onMounted(() => {
  // window.addEventListener("resize", () => {
  //   windowWidth.value = document.body.clientWidth
  // })
})

onBeforeMount(() => {
  avatar.value = "https://cdn.jsdelivr.net/gh/linyuxuanlin/Wallpaper/images/avatar.jpg"
  // userInfo.value = JSON.parse(localStorage.getItem("userInfo"))
  // if (userInfo.value !== null) {
  //   nickname.value = userInfo.value.username
  //   //获取头像
  //   avatar.value = userInfo.value.avatarPath
  //   //登陆状态置为真
  //   logged_in.value = true;
  // }
})

const logout = () => {
  ElMessageBox.confirm(
      '确定要注销吗',
      '注意！',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll: false
      })
      .then(() => {
        localStorage.removeItem("userInfo");
        logged_in.value = false;
        ElMessage({
          type: 'success',
          message: '注销成功',
          lockScroll: false
        })
        //回到主页面
        router.push({
          name: "home"
        })
      }).catch(() => {
    ElMessage({
      type: 'info',
      message: userInfo.value.username + '取消注销',
      lockScroll: false
    })
  })
}

//管理稿件
function videoManage() {
  router.push({
    name: "videoManage",
  })
}


function History() {
  router.push({
    name: "history"
  })
}


const formLabelWidth = ref('120px')//表单标签宽度

const changeForm = () => {
  isLogin.value = !isLogin.value
  loginTitle.value = isLogin.value ? "登录" : "注册"
}

const handleClose = () => {
  loginForm.asideFormVisible = false
}


const submit = () => {
  if (isLogin.value) {
    //登录
    if (form.username === "" || form.password === "") {
      ElNotification({
        title: '错误',
        message: '用户名或密码不能为空',
        type: 'error',
        position: 'top-left'
      })
    } else {
    }
  } else {
    //注册
    if (form.username === "" || form.password === "" || form.email === "" || form.passwordTwice === "") {
      ElNotification({
        title: '错误',
        message: '请填写完整信息',
        type: 'error',
        position: 'top-left'
      })
    } else if (form.password !== form.passwordTwice) {
       ElNotification({
        title: '错误',
        message: '两次密码不一致',
        type: 'error',
        position: 'top-left'
      })
    } else {
      ElNotification({
        title: '错误',
        message: '注册功能暂未开放',
        type: 'error',
        position: 'top-left'
      })
    }
    }
}

</script>

<template>

  <el-popover placement="bottom" :width="100" trigger="hover">
    <template #reference>
      <el-avatar shape="circle" :size="40"
                 v-if="logged_in"
                 :src="avatar"/>
    </template>
    <el-row>
      <el-col :span="24" :offset="4">
        <p class="userMenu" id="nickname" style="font-weight: 800">
          用户名：{{ nickname }}
        </p>
        <p class="userMenu"
           @click="logout">
          🧑‍💻注销</p>
        <p class="userMenu"
           @click="History">
          🔄历史记录
        </p>
        <p class="userMenu"
           @click="videoManage">
          📄管理稿件
        </p>
      </el-col>
    </el-row>
  </el-popover>

  <el-button v-if="!userInfo?.token" color="white"
             @click="router.push('/login')">登录
  </el-button>

</template>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 100%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 25px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  text-align: center;
}
</style>
