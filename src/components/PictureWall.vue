<script setup>
import {breakpointsTailwind, useBreakpoints, useDark, useWindowSize} from '@vueuse/core'
import {onMounted, onUnmounted} from "vue";

const props = defineProps({
  loading: Boolean,
  handleButton: Boolean,
  dataList: {
    type: Array,
  },
})
const emit = defineEmits(['dataHandle'])
const breakpoints = useBreakpoints(breakpointsTailwind)
const mdAndLarger = breakpoints.greaterOrEqual('md')


const isDark = useDark()
const imgId = ref(0)
const showModal = ref(false)
const mounted = ref(false)
const modalUpdate = () => {
  showModal.value = false
}

const clickImg = (id) => {
  console.log(`点击id=${id}`)
  imgId.value = id
  showModal.value = true
}


const appConfig = {
  mobileRow: 2,
}

const Waterfall = defineAsyncComponent(() =>
    import('vue-waterfall-plugin-next').then((module) => module.Waterfall)
)
const LazyImg = defineAsyncComponent(() =>
    import('vue-waterfall-plugin-next').then((module) => module.LazyImg)
)

const breakPointsConfig = computed(() => {
  return {
    9999: {rowPerView: 4},
    1280: {rowPerView: 3},
    1024: {rowPerView: Number(appConfig.mobileRow) === 2 ? 2 : 1},
  }
})
// const loadNextImages = async () => {
//   if (props.loading) return
//   // loading.value = true
//   emit('changeLoading', true)
//   // currentIndex.value = Math.min(currentIndex.value + imagesPerLoad.value, imageUrls.value.length)
//   //await emit('dataHandle')
//   // loading.value = false
//   emit('changeLoading', false)
// }

// const {height: windowHeight} = useWindowSize()
// const handleScroll = () => {
//   const scrollY = window.scrollY
//   const documentHeight = document.documentElement.scrollHeight
//   if (windowHeight.value + scrollY >= documentHeight - 100 && !props.loading) {
//     loadNextImages()
//   }
// }


onMounted(async () => {

  try {
    mounted.value = true
    emit('dataHandle')
    // await loadNextImages()
  } catch (e) {
    console.error('Error initializing gallery:', e)
  }

})

// onMounted(() => {
//   window.addEventListener('scroll', handleScroll)
// })
onUnmounted(() => {
  imgId.value = 0
  // window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div px-2>
    <Waterfall
        v-if="dataList && dataList?.length > 0"
        :list="dataList"
        :gutter="mdAndLarger ? 12 : 4"
        :hasAroundGutter="true"
        :crossOrigin="false"
        :backgroundColor="isDark ? '#121212' : '#FFFFFF'"
        :breakpoints="breakPointsConfig"
    >
      <template #item="{ item }">
        <div class="relative shadow-black/5 shadow-sm rounded-none">

          <LazyImg
              shadow-xl border-4 hover:-translate-y-1 hover:scale-105 hover:transition duration-300 cursor-pointer
              :url="item.linkUrl"
              @click="clickImg(item.id)"
              :alt="item.name"
          />
        </div>
      </template>
    </Waterfall>
    <el-skeleton v-else-if="loading" animated grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4>
      <template #template>
        <el-skeleton-item variant="image" v-for="index in 4" :key="index" style="height: 16rem"/>
      </template>
    </el-skeleton>
    <el-empty v-else-if="!mounted" p2 description=" "/>
    <el-empty v-else p2 description="暂时还没有内容哦！"/>

    <Canvas :showModal="showModal" :dataList="dataList" :imgId="imgId" @modalUpdate="modalUpdate" />
    <div v-if="handleButton && dataList?.length !== 0" flex justify-center items-center w-full h-24>
      <el-button :loading="loading" round
                 @click="emit('dataHandle')">加载更多</el-button>
    </div>

<!--    <div class="flex my-18 justify-center select-none text-xs">-->
<!--      <div class="flex items-center dark:c-gray-200"-->
<!--           v-if="handleButton && dataList?.length !== 0">-->
<!--        Loading-->
<!--        <i class="i-mdi-loading animate-iteration-infinite animate-spin block-->
<!--        c-gray-600 dark:c-gray-200"/>-->
<!--      </div>-->
<!--      <div class="-->
<!--        rd-2 py-1 px-2-->
<!--        c-gray-600 dark:c-gray-200 cursor-pointer-->
<!--        hover:bg-#4c1d9525 active:bg-#4c1d9545-->
<!--        dark:c-gray-200 dark:hover:bg-violet-900 dark:active:bg-violet-800"-->
<!--          >More-->
<!--      </div>-->
<!--    </div>-->


  </div>
</template>

<style scoped>
 :deep(.el-button:hover) {
    background-color:  rgb(15 23 42);

    color: #fff;
  }

 :deep(.el-button:active) {
    background-color: #4c1d95;
    border-color: #4c1d95;
    color: #fff;
  }


</style>
