<template>
  <div class="box">
    <span
        v-for="(item, index) in characters"
        :key="index"
        :style="{ animationDelay: `${(dur * index) / n}s` }"
        class="animate-jump"
    >
      {{ item }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: 'Ciallo～(∠・ω< )⌒★',
  },
  dur: {
    type: Number,
    default: 1.0,
  },
});

const n = computed(() => props.text.length);
const characters = computed(() => [...props.text]);
</script>

<style scoped>
.box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box span {
  z-index: 1;
  position: relative;
  top: 20px;
  font-size: 5rem;
  display: inline-block;
  animation: bounce 0.3s ease infinite alternate;
}

@keyframes bounce {
  0% {
    transform: translate3d(0, 0, 0);
    text-shadow: rgba(255, 255, 255, 0.4) 0 0 0.05em;
  }
  100% {
    transform: translate3d(0, -0.5em, 0);
    text-shadow: rgba(255, 255, 255, 0.4) 0 1em 0.35em;
  }
}
</style>
