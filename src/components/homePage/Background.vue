<script setup>
const props = defineProps({
  config: Object
})

const styleObject = {
  backgroundImage: `url(${props.config.pageBackground})`
}
</script>

<template>
  <div class="
  fixed top-0 left-0
  w-full h-full bg-[center_center]
  bg-cover bg-center bg-no-repeat
  filter-brightness-60
  bg-scaled" :style="styleObject"/>
</template>

<style scoped>
.bg-scaled {
  animation: background-scale 30s cubic-bezier(0.14, 0.26, 0.51, 0.96);
  -webkit-animation: background-scale 30s cubic-bezier(0.14, 0.26, 0.51, 0.96);
  transform: scale(1.2);
}

@keyframes background-scale {
  from {
    transform: scale(1.0);
  }

  to {
    transform: scale(1.2);
  }
}


@-webkit-keyframes background-scale {
  from {
    -webkit-transform: scale(1.0);
  }

  to {
    -webkit-transform: scale(1.2);
  }
}
</style>
