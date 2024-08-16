<script setup>
import { watch } from 'vue';
import { ref , reactive, computed} from 'vue'

const a = ref([
  { name: 'homo1', v: 42, timer: '00:00', date: '2024-08-13', otherProp: 'va1' },
  { name: 'homo2', v: 100, timer: '00:01', date: '2024-08-14', otherProp: 'va2' },
]);


const b = computed(() => {
  // 当 a 被清空时，b 也应为空数组
  if (a.value.length === 0) {
    return [];
  }

  // 否则，对 a 中的每个对象进行加工处理并生成 b 的对应对象
  return a.value.map(item => ({
    name: `$ ${item.name}`,
    v: item.v * 2,           // value 值翻倍
    otherProp: item.otherProp.toUpperCase(),
    status: 'initial',   // 自定义属性，独立于 a, b.status变化不会影响a,同时保持响应式
    result: null,        // 自定义属性，独立于 a
  }));
});

const btn = () => {
  a.value.forEach(eleA =>{
    eleA.name = eleA.name + 1;
    eleA.v = eleA.v + 1;
  })
  b.value.forEach(ele => {
    ele.result = new Date();
  })
}


b.value.forEach(eleB => {
  watch(
      () => eleB.name,
      (newValue, oldValue) => {
        console.log(`${eleB.name} 的状态变化了: ${oldValue} -> ${newValue}`);
      },

  )
})
const msg = ref('Hello World!')
</script>

<template>
  <div>
    <button class="mybtn" @click="btn">点击</button>

    <div class="card" v-for="item in a" :key="item.name">
      <h2>对象A</h2>
      <p>name: {{ item.name }}</p>
      <p>v: {{ item.v }}</p>
      <p>timer: {{ item.timer }}</p>
      <p>date: {{ item.date }}</p>
      <p>otherProp: {{ item.otherProp }}</p>
    </div>

    <div>
      <hr/>
    </div>
    <div class="card" v-for="item in b" :key="item.name">
      <h2>对象B</h2>
      <p>name: {{ item.name }}</p>
      <p>v: {{ item.v }}</p>
      <p>otherProp: {{ item.otherProp }}</p>
      <p>status: {{ item.status }}</p>
      <p>result: {{ item.result }}</p>
    </div>
  </div>
</template>


<style scoped>
.mybtn
{
  background-color: lightskyblue;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  margin: 0.5rem auto;
  font-size: 16px;
  cursor: pointer;
  display: block;

}

.card {
  --un-bg-opacity: 1;
  background-color: rgb(248 250 252 / var(--un-bg-opacity));
  margin: 0.5rem auto;
  max-width: 32rem;
  min-width: 28rem;
  padding: 0.5rem;
  border-radius: 0.375rem;

  box-shadow: 0 0 0 1px rgb(16 22 26 / 10%), 0 1px 1px rgb(16 22 26 / 20%);
  border-width: 1px;

}
</style>
