<script setup>

import {useGalleryScrollYStore} from "~/store/index.js";
import {useScroll, useWindowScroll} from "@vueuse/core";
const curEl = ref(null);
const { tolerance } = defineProps({
  tolerance: {
    type: Number,
    default: 200,
  },
  // scrollContainer: {
  //   type: HTMLElement,
  //   required: true,  // 确保 scrollContainer 被正确传递
  // },
});

const emit = defineEmits(["homePage"]);

// region 这个方法不起作用
// const onScroll = () => {
//   if (!scrollContainer.value) {
//     console.error('scrollContainer is null in onScroll');
//     return;
//   }
//
//   const { scrollHeight, scrollTop, clientHeight } = scrollContainer.value;
//   if (scrollTop + clientHeight >= scrollHeight - tolerance) {
//     emit("homePage");
//   }
// };
//
// onMounted(() => {
//   nextTick(() => {
//     if (scrollContainer.value) {
//       console.log("scrollContainer in InfiniteLoad is mounted:", scrollContainer.value);
//       scrollContainer.value.addEventListener("scroll", onScroll);
//     } else {
//       console.error("scrollContainer is null in InfiniteLoad.vue");
//     }
//   });
// });
//
// onUnmounted(() => {
//   if (scrollContainer.value) {
//     scrollContainer.value.removeEventListener("scroll", onScroll);
//   }
// });
// endregion


const galleryScrollYStore = useGalleryScrollYStore();

//实时监听galleryScrollYStore的isBottom属性
watchEffect(() => {
  if (galleryScrollYStore.isBottom) {
    emit("load");
    //触发后需要一段时间图片才能加载完成，所以延迟一段时间再设置isBottom为false
    setTimeout(() => {
      galleryScrollYStore.setBottom(false);
    }, 1000);
  }
});



</script>

<template>
  <div ref="curEl">
    <slot />
  </div>
</template>
