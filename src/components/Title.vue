<template>
  <h2>
    <a v-if="backbtn" @click="back">
      <div class="i-carbon:error"></div>
    </a>
    <div class="block">
      <div v-if="tips" class="title tipstitle">{{ title }}</div>
      <div v-if="!tips" class="title">{{ title }}</div>
      <div v-if="tips" class="tips">{{ tips }}</div>
    </div>
  </h2>
</template>

<script setup>

import { getCurrentInstance } from 'vue'

defineProps(['title', 'backbtn', 'tips'])
const { proxy } = getCurrentInstance()

function back() {
  if (window.history.length > 1) {
    proxy.$router.go(-1)
    return
  }
  proxy.$router.replace({ path: '/home' })
}
</script>

<style scoped>
h2 {
  padding: 0 1rem;
  display: flex;
  align-items: center;
  width: 100%;
  height: 3.2rem;
  background-color: var(rgba(255, 255, 255, .5));
  position: sticky;
  top: 0;
  color: black;
  backdrop-filter: blur(10px);
  z-index: 20;
}

h2 .block {
  display: block;
}

h2 .title {
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  color: black;
}

h2 .tipstitle {
  font-size: 20px;
  line-height: 18px;
  margin-top: 9px;
}

h2 .tips {
  width: 100%;
  font-size: 13px;
  color: #666;
}

h2 a {
  display: flex;
  width: 36px;
  height: 36px;
  justify-content: center;
  align-items: center;
  margin: 0 22px 0 -9px;
  cursor: pointer;
  border-radius: 50%;
}

h2 a:hover {
  background-color: rgba(15, 20, 25, 0.1);
}

h2 a svg {
  fill: #666;
}

@media (max-width: 60rem) {
  h2 {
    border-bottom: .5px solid #eaeaea;
  }

  h2 a svg {
    width: 20px;
    height: 20px;
  }

  h2 .title,
  h2 .tipstitle {
    font-size: 16px;
  }
}


. glassBg {
  padding: 0 1rem;
  display: flex;
  align-items: center;
  width: 100%;
  height: 3.2rem;
  background-color: var(rgba(255, 255, 255, .5));
  position: sticky;
  top: 0;
  color: black;
  backdrop-filter: blur(10px);
  z-index: 20;
}
</style>
