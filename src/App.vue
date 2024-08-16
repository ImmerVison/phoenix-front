<script setup>
import LoadingView from "~/pages/LoadingView.vue";
import {useEventListener, useTimeoutFn} from "@vueuse/core";


const onLoading = ref(true);
const showLoading = ref(true);

// onMounted(() => {
//   const waitLoading = () => {
//     useEventListener(window, 'load', () => {
//       onLoading.value = false;
//       useTimeoutFn(() => {
//         showLoading.value = false;
//       }, 2000);
//     });
//   };
//
//   waitLoading();
// });



</script>

<template>


    <RouterView class="min-w-md"/>

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
  --at-apply: text-sky-700 hover:text-sky-500;
}

.text-link-active {
  /* prettier-ignore */
  @apply hover:text-sky-600;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 1s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-out-fwd-center-enter-active,
.slide-out-fwd-center-leave-active {
  transition: cubic-bezier(0.550, 0.085, 0.680, 0.530) 1s opacity,
  cubic-bezier(0.550, 0.055, 0.675, 0.190) 1s transform;
}

.slide-out-fwd-center-enter-from {
  transform: translateZ(1);
  opacity: 1;
}
.slide-out-fwd-center-leave-to {
  transform: translateZ(600px);
  opacity: 0;
}



</style>
