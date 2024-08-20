<script setup>
const PAGE_SIZE = 10;
const images = ref([]);
const imagesInfoMap = ref(null);
const loadingImages = ref(false);
const folded = ref(false);
const hasMore = ref(true);
const currentPage = ref(0);


// Define the minimum width and height
const minWidth = 200; // Minimum width
const minHeight = 200; // Minimum height

const reSizeImage = (originWidth, originHeight) => {
  if (originWidth / originHeight > minWidth / minHeight)
    return {width: minWidth + 'px', height: Math.round((minWidth / originWidth) * originHeight) + 'px'}
  else
    return {width: Math.round((minHeight / originHeight) * originWidth) + 'px', height: minHeight + 'px'}

};


async function init() {
  // info map
  // imagesInfoMap.value = await
  // (await fetch(`${import.meta.env.VITE_IMG_FETCH_PREFIX + import.meta.env.VITE_IMG_NAME_PREFIX}images.json`, {
  // 只是做一些初始化
  // imagesInfoMap.value = await (await fetch(`https://api.waifu.im/search?included_tags=maid&height=%3E=2000`, {
  //   method: 'GET',
  //   mode: 'cors',
  // })).json();

}


async function loadImages(page = 0) {
  loadingImages.value = true;
  const cnt = 2;
  for (let i = 0; i < cnt; i++) {
    const resp = await (await fetch(`https://api.waifu.im/search?included_tags=maid`, {
      method: 'GET',
      mode: 'cors',
    })).json();

    images.value.push({
      image_id: resp.images[0].image_id,
      src: resp.images[0].url,
      width: resp.images[0].width,
      height: resp.images[0].height,
      tags: resp.images[0].tags,
      uploaded_at: resp.images[0].uploaded_at,
      artist: resp.images[0].artist,
      description: resp.images[0].tags[1].description,
    })
  }
  
  loadingImages.value = false;
  //永真条件 可以一直请求新图片
  // return urls.length <= PAGE_SIZE;
  return images.value.length <= PAGE_SIZE;
}

onMounted(async () => {
  await init();

});

watchEffect(async () => {
  if (imagesInfoMap.value && hasMore.value) {
    hasMore.value = await loadImages(currentPage.value);
  }
});


</script>

<template>

  <div class="columns-1 sm: columns-2 md:columns-3 xl:columns-4 2xl:columns-5 gap-x-4">
    <!--          backdrop-blur-2 saturate-120%似乎就好像添加了一个特定层级的毛玻璃一样
相应的fold按钮也必须添加此样式, 本处删除了就无法显示fold按钮了, 而删除fold处的相同样式却不会出现按钮消失的情况?-->
    <!--      break-inside: avoid 解决瀑布流图片队列文字换列问题 不加可能会出现第一列的有一部分到第二列去了-->
    <div class="
      backdrop-blur-2 saturate-120%
      break-inside-avoid
      bg-#4c1d9525
      dark:bg-violet-950
      rd-2 pa-4 box-border mb-4
      break-inside-avoid
      dark:c-gray-200
      c-slate-800 text-justify lh-6 tracking-.5 text-0px"
         :class="{ 'flex items-center justify-between': folded}">
      <template v-if="!folded">
        <div class="text-sm">
          <span>由于有若干个能拍照的设备，再加上时间会公平地杀死一切，我每年都会拍出几张回看时感慨万千的照片。</span>
          <span>但由于时间与地域的关系，这些照片往往要么丢失，要么被随意塞在网盘的某处。</span>
          <span>于是，<span class="
            relative before:w-100% before:h-.2rem before:bg-violet-300
            before:content-[''] before:absolute before:bottom--.1rem
            dark:before:bg-violet-500" title="2023-11-28">现在</span>我决心花一些精力把它们维护起来。</span>
          <span>然而，正如前面所言，原图已不易寻觅，目前所得的一些图片大多来自微信朋友圈或微博，很遗憾图片质量已损失太多。</span>
          <span>而这些图片拍时多是好天气，所以干脆统称这些照片为<strong>「一些晴朗的日子」</strong>。</span>
        </div>
      </template>
      <strong class="text-1rem" v-else>「一些晴朗的日子」</strong>
      <div class="
          backdrop-blur-2 saturate-120%
          bg-#4c1d9525
          hover:bg-#4c1d9545 active:bg-#4c1d9562
          dark:bg-violet-900 dark:hover:bg-violet-800 dark:active:bg-violet-700
          cursor-pointer pa-1 rd-50% mr-2
          dark:c-gray-200
        " :class="{
            'absolute bottom-.5rem right-.5rem' : !folded
        }" @click="folded =! folded">
        <div class="text-xl" :class="folded ? 'i-mdi-chevron-down' : 'i-mdi-chevron-up ' "></div>
      </div>
    </div>


    <template class="mb-4" v-for="(img, index) in images" :key="index" v-bind="img">
      <el-image
          :style="reSizeImage(img.blurHash.size[0], img.blurHash.size[1])"
          :src="img.src"
          :preview-src-list="images.map(img => img.src)"
          :initial-index="index"
          fit="cover"
          lazy
      />
    </template>

  </div>

</template>

<style scoped>

</style>