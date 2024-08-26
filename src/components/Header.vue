<script setup>
import {breakpointsTailwind, useBreakpoints} from '@vueuse/core'
import {useUserStore, usePanelStore} from '~/store/index.js'
import {useRouter, useRoute} from 'vue-router'
import photosList from '~/constants/photos.json'
import DarkToggle from "~/components/DarkToggle.vue";


const breakpoints = useBreakpoints(breakpointsTailwind)
const mdAndLarger = breakpoints.greaterOrEqual('md')
const router = useRouter()
const route = useRoute()
const user = useUserStore()
const isOpen = ref(false)

const panelStore = usePanelStore()

const togglePanel = () => {
  panelStore.togglePanel()
  localStorage.setItem('menuOpen', panelStore.leftWidth > 0 ? '1' : '0')
}

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
  router.push('/')
}

onBeforeUnmount(() => {
  routeList.value = []
})
</script>

<template>

  <header sticky top-0 z-20
          inset-x-0 bg-transparent
          backdrop-blur-lg backdrop-saturate-150 bg-op-70>
    <nav relative>
      <div flex container px-6 py-4 mx-auto md:flex md:justify-between md:items-center>
        <TogglePannel/>
        <Search/>


        <div v-if="mdAndLarger" flex items-center justify-center space-x-3>

          <DarkToggle/>

          <el-popover>
            <template #reference>
              <el-button color="white">
                <div class="i-carbon-app"></div>
              </el-button>
            </template>

            <template #default>
              <div p-2 >
                <RouterLink
                    v-for="item in routeList"
                    :key="item.to"
                    :to="item.to"
                    flex flex-row items-center rounded-md
                    block px-5 py-2 focus-blue w-full
                    transition-colors duration-200 transform
                    hover="bg-gray-100 dark:(bg-gray-700 text-white)"
                    :class="route.path === item.to ? 'text-green' : 'text-gray-700 dark:text-black-200'"
                    :aria-label="item.title"
                >
                  <span :class="item.icon" text-xl me-4/>{{ item.title }}
                </RouterLink>
                <div border="neutral-300 dark:neutral-700 t-1" mx-3 my-2/>
                <RouterLink
                    v-for="item in systemRouterList"
                    :key="item.to"
                    :to="item.to"
                    flex flex-row items-center rounded-md
                    block px-5 py-2 focus-blue w-full
                    transition-colors duration-200 transform
                    hover="bg-gray-100 dark:(bg-gray-700 text-white)"
                    :class="route.path === item.to ? 'text-green' : 'text-gray-700 dark:text-black-200'"
                    :aria-label="item.title"
                >
                  <span :class="item.icon" text-xl me-4/>{{ item.title }}
                </RouterLink>
              </div>
            </template>
          </el-popover>


          <el-button v-if="!user.token" color="white" @click="router.push('/login')">登录</el-button>
          <el-button v-if="user.token && route.path.startsWith('/admin')" color="white" @click="logout">注销</el-button>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>

</style>
