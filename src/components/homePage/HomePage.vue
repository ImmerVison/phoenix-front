<script setup>

import Background from "~/components/homePage/Background.vue";
import Avatar from "~/components/homePage/Avatar.vue";
import OneWord from "~/components/homePage/OneWord.vue";
import Columns from "~/components/homePage/Columns.vue";
import Contacts from "~/components/homePage/Contacts.vue";
import globalConfig from "~/assets/cfg.json";
import useFloatAnimation from "~/components/homePage/animate.ts";
onMounted(() => {
  useFloatAnimation();
});

</script>

<template>
  <Background :config="globalConfig"/>
  <div class="absolute w-full h-full flex justify-center items-center" :class="{ blur : globalConfig.theme.backgroundBlur }">
    <div id="main" class="main">
      <Avatar class="avatar" :config="globalConfig"></Avatar>
      <p class="text-[32px] font-bold text-center my-5 mx-0">{{ globalConfig.name }}</p>
      <OneWord :config="globalConfig"/>
      <Columns :config="globalConfig"/>
      <Contacts :config="globalConfig"></Contacts>
    </div>
    <div class="bottom up-float">
      <p class="moe-icp">
        <a href="https://icp.gov.moe" target="_blank">萌ICP备 </a>
        <a :href='`https://icp.gov.moe/?keyword=${globalConfig.moeICP.ICPNum}`' target="_blank"> {{ globalConfig.moeICP.ICPNum }} 号</a></p>
    </div>
  </div>

</template>

<style scoped>

.blur {
  backdrop-filter: blur(12px);
}

.main {
  max-width: 80%;
  transform: translate3d(0, 0, 0);
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main *{
  transition: all 2s cubic-bezier(0.19, 1, 0.22, 1);
  /* width: fit-content; */
}

.up-float {
  opacity: 0;
}

.up-floated{
  animation: up-float 0.9s cubic-bezier(0.07, 0.49, 0.4, 0.97);
  opacity: 1!important;
}

@keyframes up-float {
  from {
    transform: translateY(120px);
    opacity: 0;
  }
  to {
    transform: none;
    opacity: 1;
  }
}


/*
.content-floated {
  animation: content-float 1.2s ease-in-out;
}

@keyframes content-float {
  from {
    transform:scale(1.2);
    padding-top: 150px;
    filter: blur(12px);
    opacity: 0;
  }

  to {
    transform:scale(1.0);
    filter: none;
    opacity: 1;
  }
}
*/


.bottom {
  position: fixed;
  bottom: 4px;
  right: 4px;
}

.moe-icp a {
  text-decoration: none;
  color: rgba(255,255,255,.6);
  font-family: MoeFonts,serif;
  font-size: 0.7rem;
}



</style>
