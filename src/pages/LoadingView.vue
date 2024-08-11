<script setup>
import mark from '~/assets/vue.svg'

const props = defineProps({
  pageLoaded: Boolean
})

</script>

<template>
  <div class="min-h-screen w-full bg-blue-400 flex flex-row justify-center items-center">
    <div class="flex flex-col justify-center items-center">
      <div class="text-center">
        <img :src="mark" class="inline w-[40vw] m-3 md:w-[10vw] md:m-5 rotate-animation" />
      </div>
      <div class="h-10">
        <Transition name="slide" mode="in-out">
          <div v-if="!pageLoaded">
            <h1 class="font-serif text-xl text-white text-center">>迷惘之时不再迷惘</h1>
            <p class="text-sm text-white text-center">BanG Dream Anime It's MyGO!!!!!</p>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>



<style scoped>
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(30deg);
  }

  50% {
    transform: rotate(0deg);
  }

  75% {
    transform: rotate(90deg);
  }

  100% {
    transform: rotate(0deg);
  }
}

.rotate-animation {
  animation-name: rotate;
  animation-duration: 6s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
  animation-delay: 0s;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 1s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
