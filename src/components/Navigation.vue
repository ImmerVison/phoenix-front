<script setup>

const channels = ref(
    [
        { title: '首页', path: '/home' },
        { title: '动态', path: '/dynamic' },
        { title: '关注', path: '/follow' },
        { title: '消息', path: '/message' },
        { title: '我的', path: '/mine' },
    ]
)
</script>

<template>
    <div class="flex flex-col justify-between w-full h-full" >
<!--      <Logo/>-->

      <div>
        <div  class="box-border h-[64px]">
          <!--        <span class="bg-[#39c5bb] rd-md font-mono text-[0.8rem] p-[0.125rem]" >-->
          <!--          Phoenix-->
          <!--        </span>-->
        </div>

        <div class="flex flex-col is-justify-center items-center">
          <template v-for="channel in channels">
            <div  class=""/>
            {{channel.title}}
          </template>

        </div>

      </div>




      <div>
        <el-image
          src="https://cdn.jsdelivr.net/gh/Phoenix-Server/Phoenix-Server.github.io/src/assets/logo.png"
          fit="cover"
          class="h-[64px] w-[64px]"
        ></el-image>
      </div>


    </div>
</template>

<style scoped>

</style>
