<script setup>
const props = defineProps({
  config: Object
})

const oneWord = computed(() => {
  if (props.config.oneWord.type === "array"){
    let length = props.config.oneWord.array.length;
    let index = Math.floor(Math.random() * length)
    return props.config.oneWord.array[index]
  }
})
</script>

<template>
  <div class="p-4 b-t-[1px]  b-b-[1px] b-solid b-white">
    {{ oneWord }}
  </div>
</template>

<style scoped>

</style>
