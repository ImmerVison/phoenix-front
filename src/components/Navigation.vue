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
  router.push('/')
}

onBeforeUnmount(() => {
  routeList.value = []
})
</script>

<template>
    <div class="flex flex-col justify-between w-full h-full bg-white dark:bg-#09090B border-r" >

      <div>
        <div  class="box-border h-[64px] flex items-center justify-center w-full">
          <img class="h-8 w-auto" src="/vite.svg" cursor-pointer @click="router.push('/')" alt="logo">
        </div>

        <div class="flex flex-col is-justify-center items-center">

            <RouterLink
                v-for="item in routeList"
                :key="item.to"
                :to="item.to"
                flex flex-row items-center rounded-md
                block px-5 py-2 focus-blue w-full
                transition-colors duration-200 transform
                hover="bg-gray-200 dark:(bg-gray-700 text-white)"
                :class="route.path === item.to ? 'text-green' : 'text-gray-700 dark:text-gray-200'"
                :aria-label="item.title"
            >
              <span :class="item.icon" text-xl me-4 />{{ item.title }}
            </RouterLink>
            <div border="neutral-300 dark:neutral-700 t-1" mx-3 my-2 />
            <RouterLink
                v-for="item in systemRouterList"
                :key="item.to"
                :to="item.to"
                flex flex-row items-center rounded-md
                block px-5 py-2 w-full
                transition-colors duration-200 transform
                hover="bg-gray-200 dark:(bg-gray-700 text-white)"
                :class="route.path === item.to ? 'text-custom-green' : 'text-gray-700 dark:text-gray-200'"
                :aria-label="item.title"
            >
              <span :class="item.icon" text-xl me-4 />{{ item.title }}
            </RouterLink>


        </div>

      </div>



      <div flex items-center rounded-md
           block px-5 py-2 w-full mb-2
           transition-colors duration-200 transform
           hover="bg-gray-200 dark:(bg-gray-700 text-white)"
      >
        <span
            hover="bg-gray-200 dark:(bg-gray-700 text-white)"
            text-gray-700 dark:text-gray-200
            class="i-carbon:menu:border-none" text-xl me-4 />
        <p
            hover="bg-gray-200 dark:(bg-gray-700 text-white)"
             text-gray-700 dark:text-gray-200>更多</p>
      </div>

    </div>
</template>

<style scoped>

</style>
