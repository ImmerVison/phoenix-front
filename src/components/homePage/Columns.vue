<script setup>
const props = defineProps({
  config: Object
})
</script>

<template>
  <div class="columns">
    <ul class="m-0 p-0 flex">
      <li class="float-left transition-all transition-duration-800 hover:bg-[rgba(255,255,255,.2)] hover:text-white"  v-for="item in props.config.columns">
        <a class="no-underline text-white/80" :href="item.link" target="_blank">
          <p class="m-0 text p-[2vh]">{{ item.name }}</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.columns {
  border-top: white solid 1px;
  border-bottom: white solid 1px;
  /*border-radius: 8px;*/
  flex-direction: row;
  align-items: center;
  margin-top: 40px;
}

.columns:before {
  content: '';
  height: 41px;
  display: block;
  position: absolute;
  left: 50%;
  transform: translateY(-100%);
  width: 1px;
  background: white;
}
</style>
