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

  <div class="min-h-screen flex flex-col dark:bg-#131130">


    <div class="h-100vh w-100vw relative flex" :class="{ 'dark': isDark }">


      <div class="flex w-full min-h-full">
        <div class="
        absolute md:relative bottom-0 top-0 left-0 z-[900] transition-all
         bg-white overflow-hidden text-black
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
          bg- shadow-sm
          backdrop-filter backdrop-blur-lg
          is-transparent
          bg-[rgba(255, 255, 255, .5)] dark:bg-[(rgba(0, 0, 0, .5))]
">
            <div class="flex gap-2 items-center">
              <div @click="togglePanel" class="i-carbon:open-panel-left w-32px h-32px"></div>
              <div></div>
            </div>
            <div class="flex is-justify-space-around items-center text-xl">
              <div class="i-carbon:search w-32px h-32px"></div>
              <div class="i-carbon:settings w-32px h-32px"></div>
              <div class="i-carbon:settings w-32px h-32px"></div>
              <div class="i-carbon:settings w-32px h-32px"></div>
            </div>

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

.i-material-symbols-sunny-rounded {
  --un-icon: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M12 5q-.425 0-.712-.288T11 4V2q0-.425.288-.712T12 1t.713.288T13 2v2q0 .425-.288.713T12 5m4.95 2.05q-.275-.275-.275-.687t.275-.713l1.4-1.425q.3-.3.712-.3t.713.3q.275.275.275.7t-.275.7L18.35 7.05q-.275.275-.7.275t-.7-.275M20 13q-.425 0-.713-.288T19 12t.288-.712T20 11h2q.425 0 .713.288T23 12t-.288.713T22 13zm-8 10q-.425 0-.712-.288T11 22v-2q0-.425.288-.712T12 19t.713.288T13 20v2q0 .425-.288.713T12 23M5.65 7.05l-1.425-1.4q-.3-.3-.3-.725t.3-.7q.275-.275.7-.275t.7.275L7.05 5.65q.275.275.275.7t-.275.7q-.3.275-.7.275t-.7-.275m12.7 12.725l-1.4-1.425q-.275-.3-.275-.712t.275-.688t.688-.275t.712.275l1.425 1.4q.3.275.288.7t-.288.725q-.3.3-.725.3t-.7-.3M2 13q-.425 0-.712-.288T1 12t.288-.712T2 11h2q.425 0 .713.288T5 12t-.288.713T4 13zm2.225 6.775q-.275-.275-.275-.7t.275-.7L5.65 16.95q.275-.275.687-.275t.713.275q.3.3.3.713t-.3.712l-1.4 1.4q-.3.3-.725.3t-.7-.3M12 18q-2.5 0-4.25-1.75T6 12t1.75-4.25T12 6t4.25 1.75T18 12t-1.75 4.25T12 18'/%3E%3C/svg%3E");
  -webkit-mask: var(--un-icon) no-repeat;
  mask: var(--un-icon) no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  background-color: currentColor;
  color: inherit;
  width: 1.2em;
  height: 1.2em;
}

.i-mdi-github {
  --un-icon: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2'/%3E%3C/svg%3E");
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
