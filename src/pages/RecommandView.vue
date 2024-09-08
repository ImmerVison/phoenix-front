<script setup>

import {getByArtist, getWaifu} from "~/api/app/getSetu.js";
import NavButton from "~/components/NavButton.vue";
import PictureWall from "~/components/PictureWall.vue";
import InfiniteLoad from "~/components/InfiniteLoad.vue";

const dataList = ref([])
const loading = ref(false)
const handleButton = ref(true)
const pageInfo = reactive({
  total: 0,
  totalPage: 0,
  pageNum: 1,
  pageSize: 10,
})




const changeLoading = (state) => {
  loading.value = state
}

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


 await getByArtist()
      .then(res => {
        res?.data.data.list?.forEach((item, index) => {
          item.id = item["pid"]
        })
        if (dataList.value.length === 0) {
          // dataList.value = res?.data.data
          dataList.value = res?.data.data.list
        } else {
          //dataList.value = dataList.value.concat(res?.data.data)
          dataList.value = dataList.value.concat(res?.data.data.list)
        }
        // pageInfo.total = res?.data.data.size()
        pageInfo.total = res?.data.data.total
        pageInfo.totalPage += 1

      })
      .catch(e => {
        console.log(`error: ${e}`)
        //   toast.add({ title: '加载失败！', timeout: 2000, color: 'red' })
      })
      .finally(() => {
        loading.value = false
      })
  // const res = await getWaifu({
  //   // "size": [
  //   //   "original"
  //   // ],
  //   // "num": pageInfo.pageSize
  // })
  //     .then(res => {
  //
  //       if(res?.data.images){
  //         // 为数组中的每个元素添加一个唯一的id
  //         res?.data.images.forEach((item, index) => {
  //           item.id = item['image_id']
  //         })
  //       }
  //
  //       if (dataList.value.length === 0) {
  //         // dataList.value = res?.data.data
  //         dataList.value = res?.data.images
  //       } else {
  //         //dataList.value = dataList.value.concat(res?.data.data)
  //         dataList.value = dataList.value.concat(res?.data.images)
  //       }
  //       // pageInfo.total = res?.data.data.size()
  //       pageInfo.total = res?.data.images.length
  //       pageInfo.totalPage += 1
  //
  //     })
  //     .catch(e => {
  //       console.log(`error: ${e}`)
  //       //   toast.add({ title: '加载失败！', timeout: 2000, color: 'red' })
  //     })
  //     .finally(() => {
  //       loading.value = false
  //     })


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


</script>

<template>
  <InfiniteLoad @load="dataHandle"

  >
    <PictureWall :dataList="dataList" :loading="loading"
                 :handleButton="handleButton"
                 @changeLoading="changeLoading"
                 @dataHandle="dataHandle"/>
  </InfiniteLoad>

</template>

<style scoped>

</style>
