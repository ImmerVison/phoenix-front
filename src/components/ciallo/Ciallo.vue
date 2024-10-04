<template>
  <p
      class="ciallo"
      :style="{ animationDuration: `${dur}s`, color: color, fontSize: size }"
  >
    Ciallo～(∠・ω&lt; )⌒★
  </p>
</template>

<script setup>
const props = defineProps({
  dur: {
    type: Number,
    default: 20
  },
  color: {
    type: String,
    default: 'red'
  },
  size: {
    type: String,
    default: '15px'
  }
});
</script>

<style scoped>
.ciallo {
  /*display: inline-block;*/
  margin: 0;
  padding-left: 50%;
  white-space: nowrap;
  animation: ciallo-animate 15s linear infinite;
}

@keyframes ciallo-animate {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-115%, 0);
  }
}
</style>
