<template>
  <div class="min-h-screen flex flex-col dark:bg-#131130">


    <div class="h-100vh w-100vw dots fixed pointer-events-none" :class="{ 'dark': isDark }"></div>

    <main class="main pt-4vh lt-lg:pt-4vh pb-8vh flex-grow-1">
      <h1 class="text-gradient inline-block font-quicksand text-3xl font-700 hover:underline underline-dotted">
       图片上传
      </h1>
      <div class="card rd-md mt-4 flex-col justify-center">


          <Uploader
              :selected-url-form="selectedUrlForm"
              :upload-method="uploadMethod"
          />

        <div class="text-center ">
          <h2 class="text-2xl font-700">Start From UnoCss</h2>
          <p class="text-base mt-2">这是我的启动模板</p>

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

const isDark = useDark();

const selectedUrlForm= ref('url');
const uploadMethod =  ref('drag');
const showUrlDialog = ref(false);


// import UploadForm from '@/components/UploadForm.vue'
// import Footer from '@/components/Footer.vue'
// import {ref} from 'vue'
// import Uploader from "~/components/Uploader.vue";
//
// export default {
//   name: 'UploadHome',
//   data() {
//     return {
//       selectedUrlForm: ref('url'),
//       uploadMethod: ref('drag'),
//       showUrlDialog: false
//     }
//   },
//   components: {
//     Uploader,
//     UploadForm,
//     Footer
//   },
//   methods: {
//     handleManage() {
//       window.location.href = '/admin'
//     },
//     openUrlDialog() {
//       this.showUrlDialog = true
//     },
//     changeUploadMethod() {
//       this.uploadMethod = this.uploadMethod === 'drag' ? 'paste' : 'drag'
//     }
//   }
// }
</script>

<style scoped>
.main {
  /* prettier-ignore */
  --at-apply: 'mx-auto mx-w-[68vw] lg:w-4xl md:w-[46rem] lt-md:mx-w-[90vw] lt-md:w-[90vw]';
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
</style>
