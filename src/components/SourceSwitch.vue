<script setup>
import {Source} from "~/types/images.js"
const { selectSource } = defineProps({
  selectSource: {
    type: String,
    default: Source.Wallhaven,
  },
});

const emit = defineEmits(["update:selectSource"]);
</script>

<template>
  <div class="flex overflow-auto space-x-4 pb-3">
    <button
        v-for="item in Object.values(Source)"
        :key="item"
        :class="[
        'flex-shrink-0',
        {
          'bg-gray-100': selectSource !== item,
          'bg-gray-200 shadow-sm': selectSource === item,
        },
      ]"
        class="px-3 py-1 rounded-md"
        @click="() => emit('update:selectSource', item)"
    >
      {{ item }}
    </button>
  </div>
</template>
