<script setup>
import { ref, onMounted } from 'vue'
import Nanami from '~/assets/vue.svg'

const isLoading = ref(true)
const loadAnimation = ref(false)

onMounted(() => {
  setTimeout(() => {
    loadAnimation.value = true
    setTimeout(() => {
      isLoading.value = false
      window.location.href = '#'
    }, 300)
  }, 500)
})
</script>

<template>
  <div v-if="isLoading" :class="[{ 'opacity-0': loadAnimation },
  'fixed top-0 left-0 z-[114514] ' +
  'flex justify-center items-center w-full h-screen bg-gray-800']"
   style="transition: opacity 0.3s;">
    <div class="relative w-48 h-48">
      <div class="absolute top-0 left-0
      w-full h-full rounded-full overflow-hidden animate-spin">
        <div class="w-full h-1/2 bg-blue-500 mt-1/2"></div>
      </div>
      <div class="absolute top-0 left-0 w-[190px] h-[190px] m-[5px] rounded-full bg-white"
           :style="{ backgroundImage: `url(${Nanami})`, backgroundSize: '110px', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }"></div>
    </div>
  </div>
</template>
