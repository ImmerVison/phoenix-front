<script setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import {useUserStore} from '~/store/index.js'
import {useRouter, useRoute} from 'vue-router'
import photosList from '~/constants/photos.json'
import DarkToggle from "~/components/DarkToggle.vue";
const breakpoints = useBreakpoints(breakpointsTailwind)
const mdAndLarger = breakpoints.greaterOrEqual('md')
const router = useRouter()
const route = useRoute()
const user = useUserStore()
const isOpen = ref(false)

const routeList = ref([])
const systemRouterList = ref([
  {
    title: '控制台',
    to: '/admin',
    icon: 'i-carbon-earth-southeast-asia-filled',
  },
  {
    title: '上传',
    to: '/admin/upload',
    icon: 'i-carbon-send-alt',
  },
  {
    title: '维护',
    to: '/admin/list',
    icon: 'i-carbon-cics-sit-overrides',
  },
  {
    title: '系统',
    to: '/admin/system',
    icon: 'i-carbon-cloud-alerting',
  },
])

watch(() => route.path, () => {
  isOpen.value = false
})

onBeforeMount(() => {
  routeList.value.push({
    title: '首页',
    to: '/',
    icon: 'i-carbon-aperture',
  })
  if (photosList && photosList?.length > 0) {
    photosList.forEach((item) => {
      routeList.value.push({
        title: item.title,
        to: item.url,
        icon: item.icon && item.icon !== '' ? item.icon : 'i-carbon-debug',
      })
    })
  }
  routeList.value.push({
    title: '关于',
    to: '/about',
    icon: 'i-carbon-warning',
  })
})

const logout = () => {
  user.setToken('')
  user.setTokenName('')
  router.push('/')
}

onBeforeUnmount(() => {
  routeList.value = []
})
</script>

<template>
  <header sticky top-0 z-20 bg-white dark:bg-custom-black>
    <nav relative bg-white dark:bg-black>
      <div flex container px-6 py-4 mx-auto md:flex md:justify-between md:items-center>
        <div flex items-center justify-between w-full md:w-36>
          <img class="h-8 w-auto" src="/vite.svg" cursor-pointer @click="router.push('/')" alt="logo">
        </div>

        <div v-if="mdAndLarger" flex items-center justify-center space-x-3>
          <DarkToggle />


          <el-button type="primary" v-if="!user.token"  @click="router.push('/login')" >登录</el-button>
          <el-button type="primary" v-if="user.token && route.path.startsWith('/admin')"  @click="logout" > 退出</el-button>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>

</style>
