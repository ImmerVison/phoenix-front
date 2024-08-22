<script setup>

import NavButton from "~/components/NavButton.vue";
import photosList from '~/constants/photos.json'
import {useUserStore} from "~/store/index.js";
import {getSetu, getWaifu} from "~/api/app/getSetu.js";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import Upload from "~/components/Upload.vue";
//
// const toast = useToast()
const user = useUserStore()
const route = useRoute()


const router = useRouter()
const isValidRoute = ref(false)

const dataList = ref([])
const loading = ref(false)
const handleButton = ref(true)
const pageInfo = reactive({
  total: 0,
  totalPage: 0,
  pageNum: 1,
  pageSize: 10,
})

const hasMore = ref(true);
const dataHandle = async () => {
  loading.value = true
  // region 分页查询
  // const res = await getSetu(
  //     {
  //       "size": [
  //         "original"
  //       ],
  //       "num": pageInfo.pageSize
  //     })
  //     .then(
  //         res => {
  //           //如果当前页数小于等于总页数,则继续加载
  //           if (pageInfo.pageNum <= res?.data.totalPage) {
  //             //如果当前页数等于总页数,则禁用加载按钮
  //             if (pageInfo.pageNum === res?.data.totalPage) {
  //               handleButton.value = false
  //             }
  //             pageInfo.pageNum++
  //             //如果当前数据为空,则直接赋值
  //             if (dataList.value.length === 0) {
  //               dataList.value = res?.data.data
  //             } else {
  //               dataList.value = dataList.value.concat(res?.data.data)
  //             }
  //             pageInfo.total = res?.data.total
  //             pageInfo.totalPage = res?.data.totalPage
  //           }
  //         }
  //     )
  //     .catch(e => {
  //       //   toast.add({ title: '加载失败！', timeout: 2000, color: 'red' })
  //     })
  //     .finally(() => {
  //       loading.value = false
  //     })
  // endregion


  // const res = await getSetu(
  //     {
  //       "size": [
  //         "original"
  //       ],
  //       "num": pageInfo.pageSize
  //     })
  const res = await getWaifu({
        // "size": [
        //   "original"
        // ],
        // "num": pageInfo.pageSize
      })
      .then(res => {

             if(res?.data.images){
               // 为数组中的每个元素添加一个唯一的id
                res?.data.images.forEach((item, index) => {
                  item.id = item['image_id']
                })
             }

            if (dataList.value.length === 0) {
              // dataList.value = res?.data.data
              dataList.value = res?.data.images
            } else {
              //dataList.value = dataList.value.concat(res?.data.data)
              dataList.value = dataList.value.concat(res?.data.images)
            }
            // pageInfo.total = res?.data.data.size()
            pageInfo.total = res?.data.images.length
            pageInfo.totalPage += 1

      })
      .catch(e => {
        console.log(`error: ${e}`)
        //   toast.add({ title: '加载失败！', timeout: 2000, color: 'red' })
      })
      .finally(() => {
        loading.value = false
      })


}


const validateRoute = async (routePath) => {
  try {
    return !!photosList.some(i => i.url === routePath)
  } catch (e) {
    console.log(e)
    return false
  }
}


// // 初次挂载时进行验证
// onMounted(async () => {
//   isValidRoute.value = await validateRoute(route.path)
//   if (!isValidRoute.value) {
//     // 如果路由无效，执行相应操作，比如重定向
//     await router.replace('/not-found')
//   }
// })
//
//
// // 路由变化时进行验证
// onBeforeRouteUpdate(async (to, from, next) => {
//   isValidRoute.value = await validateRoute(to.path)
//   if (isValidRoute.value) {
//     next()
//   } else {
//     // 路由无效，阻止导航或重定向
//     next('/not-found')
//   }
// })

onUnmounted(() => {
  dataList.value = []
  pageInfo.total = 0
  pageInfo.totalPage = 0
  pageInfo.pageNum = 1
})


const obj = ref({
  exif: {
    make: 'Canon',
    model: 'Canon EOS 5D Mark IV',
    bits: 14,
    data_time: '2021-09-01 12:00:00',
    exposure_time: '1/1000',
    f_number: 'f/2.8',
    exposure_program: 'Manual',
    iso_speed_rating: 100,
    focal_length: '50mm',
    lens_specification: 'EF50mm f/1.8 STM',
    lens_model: 'EF50mm f/1.8 STM',
    exposure_mode: 'Manual',
    cfa_pattern: 'RGGB',
    color_space: 'sRGB',
    white_balance: 'Auto',
  }
})
</script>

<template>
  <div h-screen bg-white>
    <Header/>
    <nav
        class="flex z-40 w-full h-auto items-center justify-center
         sticky top-0 inset-x-0
         backdrop-blur-lg  backdrop-saturate-150 bg-op-70"
        style="--navbar-height:4rem">
      <header
          class="z-40 flex px-6 gap-4 w-full flex-row relative
          flex-nowrap items-center justify-between h-[var(--navbar-height)] max-w-[1024px]">
        <div
            class="flex basis-0 flex-row flex-grow flex-nowrap justify-start
             bg-transparent items-center no-underline text-medium whitespace-nowrap box-border">
          <el-button
              class="
              flex items-center justify-center w-6 h-full rounded-sm
              outline-none data-[focus-visible=true]:z-10
              data-[focus-visible=true]:outline-2
              data-[focus-visible=true]:outline-auto
              data-[focus-visible=true]:outline-offset-2
              sm:hidden
              dark:text-white select-none">
            <div class="i-carbon:menu:border-none w-24px h-24px color-black-200"></div>
          </el-button>
        </div>
        <ul class="h-full flex-row flex-nowrap items-center data-[justify=start]:justify-start data-[justify=start]:flex-grow data-[justify=start]:basis-0 data-[justify=center]:justify-center data-[justify=end]:justify-end data-[justify=end]:flex-grow data-[justify=end]:basis-0 hidden sm:flex gap-4 select-none"
            data-justify="center">
          <li class="font-medium whitespace-nowrap box-border list-none data-[active=true]:font-semibold"><a
              class="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-foreground no-underline hover:opacity-80 active:opacity-disabled transition-opacity"
              href="/">首页</a></li>
          <li class="text-medium whitespace-nowrap box-border list-none data-[active=true]:font-semibold"><a
              class="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-foreground no-underline hover:opacity-80 active:opacity-disabled transition-opacity"
              tabindex="0" role="link" href="https://pic.besscroft.com" rel="noopener noreferrer"
              target="_blank">足迹</a></li>
          <li class="text-medium whitespace-nowrap box-border list-none data-[active=true]:font-semibold"><a
              class="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-foreground no-underline hover:opacity-80 active:opacity-disabled transition-opacity"
              tabindex="0" role="link" href="/about">关于</a></li>
        </ul>
        <ul class="flex gap-4 h-full flex-row flex-nowrap items-center data-[justify=start]:justify-start data-[justify=start]:flex-grow data-[justify=start]:basis-0 data-[justify=center]:justify-center data-[justify=end]:justify-end data-[justify=end]:flex-grow data-[justify=end]:basis-0"
            data-justify="end">
          <li class="text-medium whitespace-nowrap box-border list-none data-[active=true]:font-semibold flex h-full items-center">
            <a class="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-primary no-underline hover:opacity-80 active:opacity-disabled transition-opacity p-1"
               aria-label="Github" tabindex="0" role="link" href="https://github.com/besscroft"
               rel="noopener noreferrer" target="_blank">
              <svg height="24" viewBox="0 0 24 24" width="24"
                   class="text-default-600 dark:text-default-500 dark:text-white">
                <path clip-rule="evenodd"
                      d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                      fill="currentColor" fill-rule="evenodd"></path>
              </svg>
            </a></li>
          <li class="font-medium whitespace-nowrap box-border list-none data-[active=true]:font-semibold flex h-full items-center">
            <button>
              <div class="i-carbon:search w-24px h-24px color-black-200"></div>
            </button>
          </li>
        </ul>
      </header>
    </nav>

    <main class="flex flex-col items-center justify-between p-2 pt-8 space-y-2">
      <div
          class="flex flex-col relative overflow-hidden height-auto text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none border-none select-none"
          tabindex="-1">
        <div class="relative shadow-black/5 shadow-none rounded-large" style="max-width:200px"><img
            src="https://besscroft.com/uploads/avatar.jpg"
            class="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large object-cover"
            alt="Woman listing to music" height="200" width="200" data-loaded="true">

        </div>

        <div
            class="p-3 h-auto flex items-center color-inherit subpixel-antialiased
            bg-op-10 backdrop-blur backdrop-saturate-150 justify-between
             before:bg-white/10 border-white/20
              border-1 overflow-hidden py-1 absolute before:rounded-xl
               rounded-lg bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p class="text-tiny text-white/80">想联系我？</p>

          <button
              class="z-0 group relative inline-flex items-center justify-center
              box-border appearance-none select-none whitespace-nowrap
              font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent
              outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2
               data-[focus-visible=true]:outline-offset-2
               data-[focus-visible=true]:outline-auto
                p-2 min-w-4 h-6 gap-2rem rounded-lg
                data-[pressed=true]:scale-95

                motion-reduce:transition-none
                data-[hover=true]:opacity-100
                text-xs text-white bg-black/20"
          >发邮件
          </button>
        </div>
      </div>


      <div
          class="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased">

        <p>我们的批评者是我们的朋友，因为他们指出我们的缺点。—— 本杰明·富兰克林</p></div>


    </main>

    <Waterfall :dataList="dataList" :loading="loading" :handleButton="handleButton" @dataHandle="dataHandle"/>

    <NavButton/>
<!--    <Ex :exif="obj.exif"/>-->


  </div>
</template>

<style scoped>

</style>
