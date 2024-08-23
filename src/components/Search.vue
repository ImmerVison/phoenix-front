<template>
  <div class="flex items-center justify-center">
    <input id="search-btn" type="checkbox" class="absolute left-[-100vw]" v-model="isChecked">
    <label for="search-btn"
           class="order-1 overflow-hidden relative z-10 w-6 h-6 rounded-full cursor-pointer transition-all duration-650 ease-out"
           :class="[
             isChecked ? 'translate-x-0 rotate-0 i-carbon:search' : '-translate-x-[5em] rotate-0 i-carbon:search'
           ]">
      <span class="sr-only">Show search bar</span>


    </label>
    <input type="text" placeholder="Search..."
           class="search-bar"
           :class="{ 'active': isChecked }">
  </div>
</template>
<script setup>
import { ref } from 'vue'
const isChecked = ref(false)
</script>
<style scoped>
.search-bar {
  @apply border-none px-4 w-[10em] h-6
  rounded-[1.625em] bg-[#3f324d] text-white text-base
  transition-all duration-650 ease-out;
  transform: translate(v-bind('isChecked ? "0" : "5em"'));
  clip-path: inset(-1em v-bind('isChecked ? "0" : "100%"') -1em -1em);
}

.search-bar::placeholder {
  @apply opacity-50 text-inherit text-sm tracking-wider;
  text-shadow: 0 0 1px, 0 0 2px;
}

.search-bar:focus {
  @apply outline-none;
  box-shadow: 0 0 1.5em snow, 0 1.25em 1.5em rgba(0, 0, 0, 0.2);
  @apply bg-#FFFAFAFF text-black;
}
</style>