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
    title: '首页',
    to: '/',
    icon: 'i-carbon:home',
  },
  {
    title: '发布',
    to: '/upload',
    icon: 'i-carbon:upload',
  },
  {
    title: '通知',
    to: '/list',
    icon: 'i-carbon:message-queue',
  },
  {
    title: '系统',
    to: '/system',
    icon: 'i-carbon-cloud-alerting',
  },
])

watch(() => route.path, () => {
  isOpen.value = false
})

onBeforeMount(() => {

  routeList.value.push()
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
                v-for="item in systemRouterList"
                :key="item.to"
                :to="item.to"
                flex flex-row items-center rounded-md
                block px-5 py-2 w-full
                transition-colors duration-200 transform
                hover="bg-gray-200 dark:(bg-gray-700 text-white)"
                :class="route.path === item.to ? 'text-[#000000ff]' : 'text-gray-700 dark:text-gray-200'"
                :aria-label="item.title"
            >
              <span :class="item.icon" text-xl me-4 />{{ item.title }}
            </RouterLink>


        </div>

      </div>

      <el-popover
          placement="top"
      >

        <template #reference>
          <div flex items-center rounded-md
               block px-5 py-2 w-full mb-2
               transition-colors duration-200 transform
               hover="bg-gray-200 dark:(bg-gray-700 text-white)"
          >
        <span
            text-gray-700 dark:text-gray-200
            class="i-carbon:menu:border-none" text-xl me-4 />
            <p
                hover="bg-gray-200 dark:(bg-gray-700 text-white)"
                text-gray-700 dark:text-gray-200>更多</p>
          </div>

        </template>
        <template #default>

        </template>

      </el-popover>
    </div>
</template>

<style scoped>

</style>
