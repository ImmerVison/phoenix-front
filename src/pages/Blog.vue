<template>
  <div class="">
    <!-- 头部开始 -->
    <header id="top" class="relative h-screen b-1 b-red">
      <!-- 头部背景 -->
            <div class="

            z-[-100]
            top-0 left-0 w-full h-full
            bg-[url('https://pic.ciallo.link/file/17983fb846e0284cc4adb.png')]
            bg-no-repeat bg-cover bg-center filter blur-[0px]
            cover-box
            "
            />


      <!-- 背景遮罩 -->
      <div class="absolute top-[0] left-[0] w-full h-screen bg-[#000]
      [background-size:32px_32px]
      bg-[radial-gradient(farthest-side,_#ffffff26_10%,_transparent_10%)]
      bg-[center_center] opacity-[.6]
      "></div>

      <!-- 头像和信息 -->
      <div class="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 text-center
       text-[#fff] leading-[50px]

        animate-[uno-fade-in_1s_cubic-bezier(0,0,0.2,1)]"
           style="animation: uno-fade-in 1s cubic-bezier(0,0,0.2,1);"
      >
        <img :src="Nanami" alt="Avatar" class="object-cover w-[200px] h-[200px] rd-50% bg-[rgba(0,_0,_0,_0.3)]"/>
        <h1 class="font-extrabold text-[20px] mt-4">09 baka</h1>
        <p class="mt--4">Introduction text</p>
        <div class="go-top mt-4">
          <a href="#main"
             class="block w-[100px] h-[50px] mt-[10px] mx-[auto] mb-[0] border-[2px]
              border-solid border-[#bdbdbd] rounded-[20px]
               leading-[50px] text-[#bdbdbd]
               [transition:border_.3s,_border-radius_.6s,_color_.3s]
               hover:border-[2px] hover:border-solid hover:border-[#fff] hover:rounded-[25px] hover:text-[#fff]
        ">↓</a>
        </div>
      </div>
    </header>
    <!-- 头部结束 -->

    <!-- 内容开始 -->
    <div class="relative main dWidth" id="main">
      <div class="location boxShadow">
        <div class="content boxShadow">
          <!-- 雪碧图 -->
          <div class="spring"></div>
          <!-- 文本内容 -->
          <div class="text">
            <h2>博客</h2>
            <p>我的博客</p>
            <a class="buttonA" href="#" target="_blank" rel="noopener">前往</a>
          </div>
        </div>
        <div class="content boxShadow">
          <!-- 雪碧图 -->
          <div class="spring"></div>
          <!-- 文本内容 -->
          <div class="text">
            <h2>项目</h2>
            <p>我的项目</p>
            <a class="buttonA" href="#" target="_blank" rel="noopener">前往</a>
          </div>
        </div>
        <div class="content boxShadow">
          <!-- 雪碧图 -->
          <div class="spring"></div>
          <!-- 文本内容 -->
          <div class="text">
            <h2>其他相关</h2>
            <p>一些可以找到我的地方？</p>
          </div>
          <div class="links">
            <ul>
              <li><a href="#" target="_blank" rel="noopener">Github</a></li>
              <li><a href="#" target="_blank" rel="noopener">Pixiv</a></li>
              <li><a href="#" target="_blank" rel="noopener">Twitter</a></li>
              <li><a href="#" target="_blank" rel="noopener">Instagram</a></li>
              <li><a href="#" target="_blank" rel="noopener">YouTube</a></li>
              <li><a href="#" target="_blank" rel="noopener">FilesSite</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 内容结束 -->

    <!-- 打招呼开始 -->
    <div class="hello text-center text-gray-500 text-xl mt-12">
      (･∀･)ﾉﾞHi~<br/>
      <span class="text-sm">愉快划水ing</span>
    </div>
    <!-- 打招呼结束 -->

    <!-- 回到顶部开始 -->
    <div class="backtop flex justify-end mt-[-99px]">
      <a href="#"
         class="w-24 h-24 bg-[url('../image/sprites.png')] bg-no-repeat bg-[position:-4px_-132px] transform translate-y-4"></a>
    </div>
    <!-- 回到顶部结束 -->

    <!-- 底部开始 -->
    <footer class="bg-gray-800 text-gray-500 text-center py-12 mt-12">
      <p>
        Copyright © {{ year }} <a href="#" class="hover:text-white">09baka</a><br/>
        Design by <a href="https://github.com/09baka" class="hover:text-white">09Baka</a>
      </p>
    </footer>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import Nanami from '~/assets/bg.jpg'

const year = ref(new Date().getFullYear())


</script>

<style scoped>
.cover-box {
  --at-apply: shadow- [rgba(50,50,93,0.25)_0px_6px_12px_-2px, rgba(0,0,0,0.3)_0px_3px_7px_-3px];
}

.boxShadow {
  box-shadow: 7px 4px 22px -12px rgba(0, 0, 0, 0.1);
}

@keyframe uno-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.dWidth {
  --at-apply: w-[1000px] mx-[auto] my-[0];
}
/* ----main 内容部分---- */
/* 此部分外框样式 */
.main {
  --at-apply: [border-top:1px_solid_transparent] mt-[-80px];
  /* 设置透明的边框定位跳转 */
  /* border-top: 1px solid transparent; */
  /* 设计-50px与location的margin-top相加后 */
  /* margin-top: -80px; */
}

.location {
  /* 此处overflow只是为了隐藏多余 */
  --at-apply: mt-[30px] rounded-[20px] bg-[#fff] overflow-hidden;

}

/* 内容 */
.main .content {
  /* 此处overflow只是为了隐藏多余 */
  --at-apply: relative p-[50px] leading-[3em] rounded-tl-[0] rounded-br-[20px] rounded-tr-[0] rounded-bl-[20px] overflow-hidden;
}

/* 标题 */
.main .content h2 {
--at-apply: [border-left:0px_solid_#2196f3] pl-0 rounded-none text-[#000] [transition:border-left_.3s,padding-left_1s,border-radius_.5s,color_.2s];
}

.main .content:hover h2 {
  --at-apply: [border-left:20px_solid_#2196f3] pl-[10px] rounded-tl-[10px] rounded-br-[0] rounded-tr-[0] rounded-bl-[10px] text-[#2196f3];
}

/* 雪碧图 */
.main .content .spring{
  --at-apply:  absolute right-[0] bottom-[0] w-[100px] h-[100px] bg-[url(~/assets/sprites.gif)] [background-size:310px_auto];
}

/* 雪碧图根据n的倍数循环 */
.main .content:nth-child(2n) .spring{
  background-position: -105px 0;
}
.main .content:nth-child(3n) .spring{
  background-position: -210px 0;
}


.links li {
  display: inline-block;
  margin-right: .5em;
}

.links li:last-child {
  margin-right: 0;
}

.links li a {
  display: block;
  padding: 0 1em;
  height: 3em;
  line-height: 3em;
  font-size: 15px;
  transition: all .3s;
}

.links li a:hover {
  background: #2196f3;
  color: #fff;
  border-radius: 1.5em;
}

/* buttonA */
.buttonA {
  display: inline-block;
  height: 3em;
  line-height: 3em;
  padding: 0 1em;
  border: 2px solid #2196f3;
  border-radius: 20px;
  transition: all .3s;
}

.buttonA:hover {
  background-color: #2196f3;
  color: #fff;
  border-radius: 1.5em;
}


.main .content .buttonA {
  margin-top: 10px;
}

/* 媒体查询自适应 */
@media screen and (max-width: 1100px) {
  .dWidth {
    width: auto;
    margin-left: 20px;
    margin-right: 20px;
  }
}
@media screen and (max-width: 640px) {
  .links li {
    display: block;
    margin: 10px 0;
  }
  .links li:last-child {
    margin-bottom: 0;
  }
  .main .content:hover h2 {
    border-left: 0 solid #2196f3;
    padding-left: 0;
    border-radius: 0;
    color: #000;
  }
}

/* 暗色模式 */
@media (prefers-color-scheme: dark) {
  body {
    background: #383838;
  }
  a {
    color: #f0f0f0;
  }
  .boxShadow {
    box-shadow: 0px 1em 1em -20px rgb(255 255 255 / 25%);
  }
  header .mask {
    opacity: 0.7;
  }
  footer {
    background-color: #2c2a2a;
  }
  .location {
    background-color: #2c2a2a;
    color: #f0f0f0;
  }
  .hello {
    color: #f0f0f0;
  }
  .links li a {
    border-bottom: 1px dotted #f0f0f0;
  }
  .links li a:hover {
    color: #383838;
    background: #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
  }
  .buttonA, .main .content .posts li a {
    border-color: #f0f0f0;
  }
  .buttonA:hover, .main .content .posts li:hover a {
    color: #383838;
    background-color: #f0f0f0;
  }
  .main .content h2 {
    border-color: #f0f0f0;
    color: #f0f0f0;
  }
  .main .content:hover h2 {
    color: #f0f0f0;
    border-color: #f0f0f0;
  }
  body::-webkit-scrollbar-track {
    background: #2c2a2a;
  }
}
</style>
