<template>
  <router-link :to="`/video/${video.id}`" class="w-1/2 px-2vw py-1vh">
    <div class="relative bg-[url('https://ciallo.link/file/fee61a19024a60facc869.jpg')]
     bg-[#f3f3f3] bg-center bg-no-repeat bg-[length:36%]  rounded-md overflow-hidden">
      <div>
        <img :src="video.imgSrc" :alt="video.desc"
             class="h-[240px] w-full object-cover" />
      </div>
      <div class="absolute bottom-0 left-0 right-0 bg-[linear-gradient(0deg,_#000000d9,_#0000)] text-white text-sm  flex items-center justify-between px-4 py-2">
        <span class="flex items-center gap-1">
          <i class="i-carbon:playlist"></i>
          {{ video.playCount }}
        </span>
        <span class="flex items-center gap-1">
          <i class="i-carbon:chat"></i>
          {{ video.commentCount }}
        </span>
      </div>
    </div>
    <p class="text-sm text-gray-800 line-clamp-2">{{ video.desc }}</p>
  </router-link>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'

interface IVideoItem {
  id: number
  imgSrc: string
  desc: string
  playCount: string
  commentCount: string
  videoSrc: string
}

defineProps({
  video: {
    type: Object as PropType<IVideoItem>,
    default: () => ({
      id: '0',
      link: '',
      // imgSrc: 'https://ciallo.link/file/1ba17f533cd44d4f51cab.jpg',
      imgSrc: 'https://i.pximg.net/img-original/img/2018/11/30/09/10/25/71892926_p0.png',
      desc: '世界上广告最多的网站判定！真的有10000条广告！【暗物质#2】',
      playCount: '24.9万',
      commentCount: '1345',
      videoSrc: 'https://www.bilibili.com/video/BV1uw4m1r7tU'
    }),
    required: true
  }
})
</script>

