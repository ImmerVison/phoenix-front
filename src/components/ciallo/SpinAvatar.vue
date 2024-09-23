<template>
  <div class="flex justify-center items-center mt-4">
    <!-- 旋转头像 -->
    <div class="w-32 h-32 rounded-full overflow-hidden border-4
      hover:border-[#FBAB8B] hover:border-1
     border-gray-200 animate-spin-slow">
      <img :src="src" alt="avatar" class="w-full h-full object-cover" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 头像的图片 URL
const src = ref('https://pic.ciallo.link/file/AgACAgUAAxkDAAMmZt70_Rl56cR9FFff9-YrZ9EPPEYAAsHBMRugMfhWNeYUUmPsywgBAAMCAAN5AAM2BA');
</script>

<style scoped>
/* 旋转动画 */
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Tailwind 自定义动画时长 */
.animate-spin-slow {
  animation: spin-slow 5s linear infinite;
}
</style>
