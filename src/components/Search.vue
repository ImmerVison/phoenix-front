<template>
  <div class="flex items-center justify-center">
    <input id="search-btn" type="checkbox" class="absolute left-[-100vw]" v-model="isChecked">
    <label for="search-btn"
           class="order-1 overflow-hidden relative z-10 m-1 cursor-pointer transition-all duration-650 ease-out  dark:text-white"
           :class="[
             labelCheckedClass
           ]">
      <span v-if="!isChecked" class="i-carbon:search"/>
    </label>
    <span v-if="isChecked" class="i-carbon:search order-2 dark:text-white" @click="searchByKeyWord(inputValue)"></span>
    <Input
        @pEnter="searchByKeyWord(inputValue)"
        v-model="inputValue"
        clearable
        size="s"
        allow-clear
        ref="searchInputRef"
        v-click-outside="onClickOutside"
        type="text"
        placeholder="Search..."
        class="search-bar"
        :class="{ 'active': isChecked }"
        :style="inputStyle">
    </Input>
    <el-popover
        v-model:visible="popoverVisible"
        popper-style="width: 200px"
        ref="popoverRef"
        :virtual-ref="searchInputRef"
        trigger="click"
        virtual-triggering
    >
      <template #default>
        <div p-1>
          <div flex flex-row justify-between>
            <span font-bold>历史记录</span>
            <el-button  size="small" @click="clearHistory">清空</el-button>
          </div>

          <div  class= "flex gap-2 flex-wrap">
            <el-tag
                @click="searchByHistoryTag(kw.value)"
                v-for="kw in searchHistory"
                :key="kw.id"
                type="info"
                size="small"
                closable
                :disable-transitions="false"
                @close="handleClose(kw)"
            >
              {{showTag(kw)}}
            </el-tag>
          </div>

        </div>

      </template>
    </el-popover>

  </div>
</template>

<script setup>
import {ref, computed, unref} from 'vue';
import {ClickOutside as vClickOutside} from 'element-plus';
import Input from "~/components/input/input.vue";
import {rand} from "@vueuse/core";
import {nanoid} from "nanoid";
import router from "~/router/index.js";

// Use the 'width' prop passed from parent component, with default value as 10 (em)
const props = defineProps({
  width: {
    type: Number,
    default: 10,
  },

  labelOffset: {
    type: Number,
    default: 0, // 标签的偏移量默认值
  }
});


const isChecked = ref(false);


// Dynamic translation based on isChecked and width prop
const translateX = computed(() => (isChecked.value ? 0 : props.width / 2));

// Computed style for the input
const inputStyle = computed(() => ({
  marginLeft: `1em`,
  width: `${props.width}em`,
  transform: `translateX(${translateX.value}em)`,
  transition: 'all 0.65s ease-out',
  clipPath: `inset(-1em ${isChecked.value ? '0' : '100%'} -1em -1em)`,
}));

// 动态计算label的class
const labelCheckedClass = computed(() => (isChecked.value ? 'translate-x-0 rotate-0' : `translate-x-[-${props.labelOffset}em] rotate-360`));

const inputValue = ref('');
const searchInputRef = ref();
const popoverRef = ref();


const popoverVisible = ref(false);

const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.();
}


const searchHistory = ref([]);






// // 防止tag的文本过长，使用省略号, 最长10个字符
const showTag = (tag) => {
  return tag.value.length > 10 ? tag.value.slice(0, 10) + '...' : tag.value;
}

onMounted(() => {

  // 从localStorage中获取搜索历史
  searchHistory.value = JSON.parse(localStorage.getItem('searchHistory')) || [
    {value: 'Vue', time: new Date().toLocaleTimeString(), id: 1},
    {value: 'React', time: new Date().toLocaleTimeString, id: 2},
    {value: 'Angular', time: new Date().toLocaleTimeString, id: 3},
  ]
});



const handleClose = (kw => {
  searchHistory.value = searchHistory.value.filter(item => item.id !== kw.id);
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value));
})

const clearHistory = () => {
  localStorage.removeItem('searchHistory');
  searchHistory.value = [];
}


const searchByKeyWord = (kw) => {
  // 先查找是否已经存在
  const index = searchHistory.value.findIndex(item => item.value === kw);
  // 如果存在，就删除
  if (index > -1) {
    searchHistory.value.splice(index, 1);
  }

  // 添加到第一个
  searchHistory.value.unshift({value: kw, time: new Date().toLocaleTimeString(), id: nanoid(10)});
  //同时关闭popover
  popoverVisible.value = false;
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value));
  // 跳转到搜索结果页面
  // router.push({name: 'search', query: {kw}});
}


// 点击历史记录标签时，根据标签内容进行搜索
const searchByHistoryTag = (tagValue) => {

  searchByKeyWord(tagValue);
  inputValue.value = tagValue;


}


</script>

<style scoped>
.search-bar {
  border: none;
}

.textEllipsis {
  display: -webkit-box; /* 将元素作为弹性伸缩盒子展示 */
  -webkit-line-clamp: 2; /* 限制文本行数为 2 行 */
  -webkit-box-orient: vertical; /* 设置伸缩盒子为垂直方向 */
  overflow: hidden; /* 隐藏溢出文本 */
  text-overflow: ellipsis; /* 使用省略号截断溢出文本 */
}

</style>
