<!--<template>-->
<!--  <div @click="cialloAppend">-->
<!--    <Jumper />-->

<!--    <div>-->
<!--      <Ciallo-->
<!--          v-for="(item, index) in colorMap"-->
<!--          :key="index"-->
<!--          :dur="item.dur"-->
<!--          :color="item.color"-->
<!--          :size="item.size"-->
<!--      />-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import meguru from '~/assets/meguru.aac';-->
<!--import Jumper from "~/components/ciallo/Jumper.vue";-->
<!--import Ciallo from "~/components/ciallo/Ciallo.vue";-->

<!--const colorMap = [-->
<!--  { dur: 12, color: 'red', size: '35px' },-->
<!--  { dur: 15, color: 'aqua', size: '40px' },-->
<!--  { dur: 11, color: 'coral', size: '25px' },-->
<!--  { dur: 7, color: 'black', size: '19px' },-->
<!--  { dur: 10, color: 'greenyellow', size: '29px' },-->
<!--  { dur: 12, color: 'gold', size: '18px' },-->
<!--  { dur: 15, color: 'orange', size: '50px' },-->
<!--  { dur: 11, color: 'pink', size: '80px' },-->
<!--  { dur: 12, color: 'silver', size: '45px' },-->
<!--  { dur: 18, color: 'cyan', size: '29px' },-->
<!--  { dur: 11, color: 'greenyellow', size: '23px' },-->
<!--  { dur: 14, color: 'grey', size: '19px' },-->
<!--  { dur: 6, color: 'violet', size: '45px' },-->
<!--  { dur: 15, color: 'blue', size: '26px' },-->
<!--  { dur: 14, color: 'green', size: '50px' },-->
<!--  { dur: 12, color: 'aqua', size: '75px' },-->
<!--  { dur: 11, color: 'black', size: '25px' }-->
<!--];-->

<!--const audioList = [meguru];-->

<!--let audioIndex = ref(0);-->

<!--const randomColor = () => {-->
<!--  const r = Math.floor(Math.random() * 256);-->
<!--  const g = Math.floor(Math.random() * 256);-->
<!--  const b = Math.floor(Math.random() * 256);-->
<!--  return `rgb(${r},${g},${b})`;-->
<!--};-->

<!--const cialloAppend = (event) => {-->
<!--  const x = event.pageX;-->
<!--  const y = event.pageY;-->
<!--  const span = document.createElement('span');-->
<!--  span.innerHTML = 'Ciallo～(∠・ω< )⌒★';-->
<!--  span.style.cssText = `position: absolute; left: ${x}px; top: ${y - 20}px; color: ${randomColor()}; font-weight: bold;`;-->
<!--  document.body.appendChild(span);-->

<!--  const animation = span.animate(-->
<!--      {-->
<!--        top: `${y - 180}px`,-->
<!--        opacity: 0-->
<!--      },-->
<!--      {-->
<!--        duration: 1500-->
<!--      }-->
<!--  );-->

<!--  new Audio(audioList[audioIndex.value]).play();-->
<!--  audioIndex.value = (audioIndex.value + 1) % audioList.length;-->

<!--  animation.onfinish = () => {-->
<!--    span.remove();-->
<!--  };-->
<!--};-->

<!--onMounted(() => {-->
<!--  document.body.addEventListener('click', cialloAppend);-->
<!--});-->

<!--onUnmounted(() => {-->
<!--  document.body.removeEventListener('click', cialloAppend);-->
<!--});-->
<!--</script>-->

<!--<style scoped>-->
<!--/* 可以用 tailwind 或直接写样式 */-->
<!--</style>-->


<template>
  <div @click="addCiallo" max-h-screen overflow-hidden>
    <SpinAvatar/>
<!--    <Jumper />-->
    <img :src="CialloGif" alt="Ciallo" class="absolute" style="left: 50%; top: 50%;  transform: translate(-50%, -50%); " />
    <div>
      <Ciallo
          v-for="(item, index) in colorMap"
          :key="index"
          :dur="item.dur"
          :color="item.color"
          :size="item.size"
      />
    </div>

    <!-- transition-group 用于管理动态生成的 Ciallo 文本 -->
    <transition-group name="ciallo" tag="div">
      <span
          v-for="(item, index) in cialloItems"
          :key="item.id"
          :style="{ left: `${item.x}px`, top: `${item.y}px`, color: item.color }"
          class="absolute"
      >
        {{ item.text }}
      </span>
    </transition-group>
  </div>
</template>

<script setup>
import meguru from '~/assets/meguru.aac';
import CialloGif from "~/assets/ciallo.gif";
import Jumper from "~/components/ciallo/Jumper.vue";
import Ciallo from "~/components/ciallo/Ciallo.vue";
import SpinAvatar from "~/components/ciallo/SpinAvatar.vue";

// 定义颜色和大小
const colorMap = [
  { dur: 12, color: 'red', size: '35px' },
  { dur: 15, color: 'aqua', size: '40px' },
  { dur: 11, color: 'coral', size: '25px' },
  { dur: 7, color: 'black', size: '19px' },
  { dur: 10, color: 'greenyellow', size: '29px' },
  { dur: 12, color: 'gold', size: '18px' },
  { dur: 15, color: 'orange', size: '50px' },
  { dur: 11, color: 'pink', size: '80px' },

  { dur: 12, color: 'red', size: '35px' },
  { dur: 15, color: 'aqua', size: '40px' },
  { dur: 11, color: 'coral', size: '25px' },
  { dur: 7, color: 'black', size: '19px' },
  { dur: 10, color: 'greenyellow', size: '29px' },
  { dur: 12, color: 'gold', size: '18px' },
  { dur: 15, color: 'orange', size: '50px' },
  { dur: 11, color: 'pink', size: '80px' },


  { dur: 12, color: 'silver', size: '45px' },
  { dur: 18, color: 'cyan', size: '29px' },
  { dur: 11, color: 'greenyellow', size: '23px' },
  { dur: 14, color: 'grey', size: '19px' },
  { dur: 6, color: 'violet', size: '45px' },
  { dur: 15, color: 'blue', size: '26px' },
  { dur: 14, color: 'green', size: '50px' },
  { dur: 12, color: 'aqua', size: '75px' },
  { dur: 11, color: 'black', size: '25px' }
];

const audioList = [meguru];
let audioIndex = ref(0);

// 管理 Ciallo 文本元素
const cialloItems = ref([]);

// 生成随机颜色
const randomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
};

// 添加新的 Ciallo 项
const addCiallo = (event) => {
  const x = event.pageX;
  const y = event.pageY - 20;
  const newItem = {
    id: Date.now(), // 使用时间戳作为唯一标识符
    x,
    y,
    color: randomColor(),
    text: 'Ciallo～(∠・ω< )⌒★',
  };

  // 添加新元素
  cialloItems.value.push(newItem);

  // 播放音频
  new Audio(audioList[audioIndex.value]).play();
  audioIndex.value = (audioIndex.value + 1) % audioList.length;

  // 1.5秒后移除该元素
  setTimeout(() => {
    cialloItems.value = cialloItems.value.filter(item => item.id !== newItem.id);
  },  /*1000*/
      500);
};
</script>

<style scoped>
/* 可以使用 Tailwind CSS 或者编写自定义动画 */
.ciallo-enter-active,
.ciallo-leave-active {
  transition: all
  1.5s
  ease;
}


/*
.ciallo-enter-from,
.ciallo-leave-to {
  transform: translateY(0);
  opacity: 1;
}

.ciallo-leave-active {
  transform: translateY(-180px);
  opacity: 0;
}

*/


.ciallo-enter-from {
  transform: translateY(30px);
  opacity: 0;
}

.ciallo-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.ciallo-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.ciallo-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}


</style>
