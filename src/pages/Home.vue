<script setup>
import {useDark, useEventListener} from "@vueuse/core";
import {onMounted, reactive, ref, watchEffect} from "vue";
import Title from "~/components/Title.vue";
import {usePanelStore} from "~/store/index.js";


const panelStore = usePanelStore()
//将 panelMinWidth 保存到 store 中
panelStore.setPanelMinWidth( document.body.clientWidth / 2 > 256 ? 256 : document.body.clientWidth / 2)


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

  <div class="min-h-screen flex flex-col bg-white dark:bg-#09090B">


    <div class="h-100vh w-100vw relative flex" >
      <div class="flex w-full min-h-full">
        <div class="
          absolute md:relative bottom-0 top-0 left-0 z-[900] transition-all
         overflow-hidden
         min-h-screen"
             :style="{
        width: panelStore.leftWidth + 'px'
      }">

          <Navigation/>

        </div>

        <div v-if="panelStore.leftWidth" class="md:hidden absolute left-0 right-0 top-0 bottom-0 z-[100]
         bg-neutral-600 bg-opacity-0
          " @click="togglePanel"></div>



        <div class="flex-1 relative max-h-screen overflow-hidden">
          <Header/>
          <div class="flex sticky top-0 left-0 right-0 z-10 place-content-between p-4 gap-2
          shadow-sm
          backdrop-filter backdrop-blur-lg
          is-transparent
          bg-[rgba(255, 255, 255, .5)] dark:bg-[(rgba(0, 0, 0, .5))]
">

<!--            <el-image-->

<!--                src="https://ciallo.link/file/17983fb846e0284cc4adb.png"-->
<!--                fit="contain"-->
<!--            />-->


          </div>

          <div class="
          flex justify-center pt-8 overflow-y-auto max-h-full">


            <!--            <div class="w-full max-w-[800px]">-->
            <!--              <div>-->

            <!--              </div>-->
            <!--              <main class="flex-1 p-3">-->
            <!--                <div class="search-box">-->

            <!--                </div>-->
            <!--                <div ref="listRef">-->

            <!--                </div>-->
            <!--                <div class="h-[64px]"></div>-->
            <!--              </main>-->
            <!--            </div>-->

          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<style scoped>
.main {
  /* prettier-ignore */
  --at-apply: 'mx-auto mx-w-[68vw] lg:w-4xl md:w-[46rem] lt-md:mx-w-[90vw] lt-md:w-[90vw]';
}




.text-gradient {
  background-image: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 400%;
  background-position: 0%;
}

.text-link {
  /* prettier-ignore */
  --at-apply: text-sky-700
  hover: text-sky-500;
}

.text-link-active {
  /* prettier-ignore */
  @apply hover:text-sky-600;
}


</style>
