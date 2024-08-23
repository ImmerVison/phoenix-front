<script setup>
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
</script>
<template>
  <div class="h-screen flex flex-col justify-center">
    <div class="flex flex-row justify-center items-center font-[sans-serif]">
      <h1 class="text-2xl font-bold">404</h1>
      <div class="bg-gray-400 h-12 w-[0.5px] mx-4"></div>
      <p class="font-sm">This page could not be found.</p>
      <button class="mt-1 ml-2" @click="router.push('/')">
        <i class="i-carbon:ibm-engineering-requirements-doors-next"/>
      </button>
    </div>
  </div>
</template>
<style scoped>
.i-material-symbols-door-front-sharp {
  --un-icon: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M3 21h18v-2h-2V3H5v16H3zm11-8q-.425 0-.712-.288T13 12t.288-.712T14 11t.713.288T15 12t-.288.713T14 13'/%3E%3C/svg%3E");
  -webkit-mask: var(--un-icon) no-repeat;
  mask: var(--un-icon) no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  background-color: currentColor;
  color: inherit;
  width: 1.2em;
  height: 1.2em;
}

</style>
