<script setup>
import {useDark, useEventListener} from "@vueuse/core";
import {onMounted, reactive, ref, watchEffect} from "vue";
import Title from "~/components/Title.vue";

const leftWidth = ref(0)
const listRef = ref(null)
const panelMinWidth = document.body.clientWidth / 2 > 256 ? 256 : document.body.clientWidth / 2

const isDark = useDark();
onMounted(() => {
  const menuOpen = localStorage.getItem('menuOpen')
  if (menuOpen === '1') {
    leftWidth.value = panelMinWidth
  }
})


const togglePanel = () => {
  console.log(leftWidth.value)
  leftWidth.value = Math.abs(leftWidth.value - panelMinWidth)
  localStorage.setItem('menuOpen', leftWidth.value > 0 ? '1' : '0')
}


</script>

<template>

  <div class="min-h-screen flex flex-col  dark:bg-#131130">


    <div class="h-100vh w-100vw relative flex" >
      <div class="flex w-full min-h-full">
        <div class="
          absolute md:relative bottom-0 top-0 left-0 z-[900] transition-all
         overflow-hidden
         min-h-screen"
             :style="{
        width: leftWidth + 'px'
      }">

          <Navigation/>

        </div>
        <div v-if="leftWidth" class="md:hidden absolute left-0 right-0 top-0 bottom-0 z-[100]
         bg-neutral-600 bg-opacity-70
          " @click="togglePanel"></div>


        <div class="flex-1 relative max-h-screen overflow-hidden">
          <div class="flex sticky top-0 left-0 right-0 z-10 place-content-between p-4 gap-2
          shadow-sm
          backdrop-filter backdrop-blur-lg
          is-transparent
          bg-[rgba(255, 255, 255, .5)] dark:bg-[(rgba(0, 0, 0, .5))]
">
            <div class="flex gap-2 items-center">
              <div @click="togglePanel" class="i-carbon:open-panel-left w-32px h-32px"></div>
              <div></div>
            </div>

            <Header/>

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

.simple-btn {
  --at-apply: 'bg-slate-400 bg-op-20 hover:bg-op-50 active:op-100 ';
  --at-apply: 'dark:c-white dark:hover:bg-white-800 dark:active:bg-white-700';
}


.dots {
  background: url("data:image/svg+xml;utf8, <svg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'><rect fill='rgba(25, 33, 38, 0.2)' x='7' y='7' width='2' height='2'></rect></svg>") fixed;
}

.dots.dark {
  background: url("data:image/svg+xml;utf8, <svg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'><rect fill='rgba(255, 255, 255, 0.17)' x='7' y='7' width='2' height='2'></rect></svg>") fixed;
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
