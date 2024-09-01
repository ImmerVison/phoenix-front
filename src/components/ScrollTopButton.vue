<script setup>


const emit = defineEmits(["scrollToTop"])

const showScrollTopButton = ref(false)
const setShowScrollTopButton = (value) => {
  showScrollTopButton.value = value
}

defineExpose({
  setShowScrollTopButton
})

</script>

<template>
  <Teleport to="#teleports">
    <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
    >
      <button
          v-show="showScrollTopButton"
          class="hover:bg-neutral-200/60 hover:text-white/90
          fixed bottom-4 right-4 z-10 flex h-12 w-12 items-center
          justify-center rounded-full bg-base-1000/60
          ring-2 ring-slate/20 ring-offset-1 ring-offset-black/10
          backdrop-blur-lg backdrop-saturate-200"
          type="button"
          @click="emit('scrollToTop')"
      >
        <span class="sr-only"> Scroll to top </span>
        <span class="i-carbon:up-to-top h-6 w-6 text-black/60 dark:text-white"/>

      </button>
    </transition>
  </Teleport>
</template>
