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
  console.log(`togglePanel`)
  panelStore.togglePanel()
  panelStore.toggleDrawer()
  localStorage.setItem('menuOpen', panelStore.leftWidth > 0 ? '1' : '0')
}



</script>

<template>




  <el-button
      @click="togglePanel"
      size="small"

      class="


              flex items-center justify-center w-6 h-full rounded-sm
              outline-none data-[focus-visible=true]:z-10
              data-[focus-visible=true]:outline-2
              data-[focus-visible=true]:outline-auto
              data-[focus-visible=true]:outline-offset-2
              sm:hidden
               select-none">
    <div class="i-carbon:menu:border-none w-16px h-16px color-black-200"></div>
  </el-button>
</template>

<style scoped>
.icon-btn {
  --at-apply: hover:bg-#4c1d9545 active:bg-#4c1d9562 bg-#4c1d9525;
  --at-apply: dark:bg-violet-900 dark:c-gray-200 dark:hover:bg-violet-800 dark:active:bg-violet-700;
}
</style>
