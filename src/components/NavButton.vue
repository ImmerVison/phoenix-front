<script setup>
const isOpen = ref(false)
</script>

<template>
  <div fixed inset-x-0 bottom-0 z-100 h-14 bg-white dark:bg-black flex flex-row border-t-1>
    <RouterLink to="/" flex flex-row items-center place-content-center h-full flex-1 aria-label="首页">
      <div i-carbon-aperture />
    </RouterLink>
    <RouterLink to="/admin" flex flex-row items-center place-content-center h-full flex-1 aria-label="控制台">
      <div i-carbon-earth-southeast-asia-filled />
    </RouterLink>
<!--    <ElMenu v-slot="{ toggleVisible, show }" v-model="isOpen" flex flex-row items-center place-content-center h-full flex-1 cursor-pointer>-->
<!--      <button-->
<!--          flex items-center place-content-center h-full flex-1 class="select-none"-->
<!--          :class="show ? '!text-primary' : ''"-->
<!--          aria-label="更多菜单"-->
<!--          @click="toggleVisible"-->
<!--      >-->
<!--        <span :class="show ? 'i-carbon-close' : 'i-carbon-app'" />-->
<!--      </button>-->
<!--    </ElMenu>-->
  </div>
</template>

<style scoped>

</style>
