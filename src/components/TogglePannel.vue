<script setup>
import {usePanelStore} from "~/store/index.js";
import {onMounted, ref} from "vue";

const panelStore = usePanelStore()

onMounted(() => {
  const menuOpen = localStorage.getItem('menuOpen')
  if (menuOpen === '1') {
    panelStore.setLeftWidth(panelStore.panelMinWidth)
  }
})


const togglePanel = () => {
  panelStore.togglePanel()
  localStorage.setItem('menuOpen', panelStore.leftWidth > 0 ? '1' : '0')
}



</script>

<template>

  <div class="
        backdrop-blur-2 saturate-120%
        pa-1 rd-50% mr-2 cursor-pointer icon-btn"
       @click="togglePanel"
      >
    <div class="i-carbon:menu:border-none w-[1.1rem]"></div>
  </div>

</template>

<style scoped>
.icon-btn {
  --at-apply: hover:bg-#4c1d9545 active:bg-#4c1d9562 bg-#4c1d9525;
  --at-apply: dark:bg-violet-900 dark:c-gray-200 dark:hover:bg-violet-800 dark:active:bg-violet-700;
}
</style>
