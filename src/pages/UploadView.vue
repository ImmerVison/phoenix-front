<template>
  <div class="min-h-screen flex flex-col dark:bg-#131130">


    <div class="h-100vh w-100vw dots fixed pointer-events-none" :class="{ 'dark': isDark }"></div>

    <main class="main pt-4vh lt-lg:pt-4vh pb-8vh flex-grow-1">

      <h1 class="text-gradient inline-block font-quicksand text-3xl font-700 hover:underline underline-dotted">
        图片上传
      </h1>





      <div class="card rd-md mt-4 flex-col justify-center gap-8 space-y-lg">

       <div>
         <h1 class="text-2xl">
           发布图集
         </h1>
         <p class="text-sm text-orange">
           提示 <span class="inline-block  i-ph-dot-outline-fill"/>标记为必填项，否则无法发布哦
         </p>
       </div>


      <div class="option-component">
        <div class="option-title">
          <span class="inline-block  i-ph-dot-outline-fill"/>上传图片
        </div>
        <div class="border-2 rd-md wrapper">
          <Uploader :bg-color="'#F8F9FA'"/>
        </div>
      </div>




        <div class="flex justify-center items-center">
          <el-button class="ml-3" type="success" @click="">
            upload to server
          </el-button>



        </div>

      </div>


    </main>


    <footer class="pb-4vh select-none flex flex-col items-center">
      <div class="text-xl c-slate-900 flex items-center">
        <div class="
        backdrop-blur-2 saturate-120%
        pa-1 rd-50% mr-2 cursor-pointer simple-btn"
             @click="isDark = !isDark">
          <div class="i-material-symbols-sunny-rounded"></div>
        </div>
        <div class="
        backdrop-blur-2 saturate-120%
        pa-1 rd-50% mr-2 cursor-pointer simple-btn"
             @click="jumpTo('https://github.com')">
          <div class="i-mdi-github"></div>
        </div>
      </div>

      <div class="text-xs c-gray-600 dark:c-gray-200 mt-3">
        <div class="text-center">
          <span>&copy; {{ new Date().getFullYear() }}</span>
          <span class="
            ml-2 inline-flex c-gray-600 items-center cursor-pointer b-1 b-solid b-transparent
            hover:b-b-gray-600
            dark:c-gray-200 dark:hover:b-b-gray-200
          " @click="jumpTo('https://www.pixiv.net')">
            <span>996</span>
            <i class="i-mdi-open-in-new ml-1"></i>
          </span>
        </div>
        <div class="text-gray-400 mt-1">Last updated at {{ new Date().toDateString() }}
        </div>
      </div>
    </footer>

  </div>

</template>

<script setup>


import {ref} from "vue";
import {useDark} from "@vueuse/core";
import NoImage from "~/components/icnos/NoImage.vue";
const isDark = useDark();

const selectedUrlForm = ref('url');
const uploadMethod = ref('drag');
const showUrlDialog = ref(false);


</script>

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


.i-ph-dot-outline-fill {
  --un-icon: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 256 256' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M156 128a28 28 0 1 1-28-28a28 28 0 0 1 28 28'/%3E%3C/svg%3E");
  -webkit-mask: var(--un-icon) no-repeat;
  mask: var(--un-icon) no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  background-color: currentColor;
  color: red;
  width: 1.2em;
  height: 1.2em;
  position: relative;
  top: 0.25em;
  left: -0.25em;
}

.option-title {
   --at-apply: text-bold text-lg text-gray-800;
}

.option-component {
  --at-apply: 'space-y-2 ';

  .wrapper {
    --at-apply: 'bg-slate-2 bg-op-20 hover:bg-op-50 active:op-100';
  }


}
</style>
