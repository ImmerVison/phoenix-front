<script setup>

</script>

<template>
  <div h-screen bg-white>
    <nav
        class="flex z-40 w-full h-auto items-center justify-center
         sticky top-0 inset-x-0
         backdrop-blur-lg  backdrop-saturate-150 bg-op-70"
        style="--navbar-height:4rem">
      <header
          class="z-40 flex px-6 gap-4 w-full flex-row relative
          flex-nowrap items-center justify-between h-[var(--navbar-height)] max-w-[1024px]">
        <div
            class="flex basis-0 flex-row flex-grow flex-nowrap justify-start
             bg-transparent items-center no-underline text-medium whitespace-nowrap box-border">
          <el-button
              class="
              flex items-center justify-center w-6 h-full rounded-sm
              outline-none data-[focus-visible=true]:z-10
              data-[focus-visible=true]:outline-2
              data-[focus-visible=true]:outline-auto
              data-[focus-visible=true]:outline-offset-2
              sm:hidden
              dark:text-white select-none">
              <div class="i-carbon:menu:border-none w-24px h-24px color-black-200"></div>
          </el-button>
        </div>
        <ul class="h-full flex-row flex-nowrap items-center data-[justify=start]:justify-start data-[justify=start]:flex-grow data-[justify=start]:basis-0 data-[justify=center]:justify-center data-[justify=end]:justify-end data-[justify=end]:flex-grow data-[justify=end]:basis-0 hidden sm:flex gap-4 select-none"
            data-justify="center">
          <li class="font-medium whitespace-nowrap box-border list-none data-[active=true]:font-semibold"><a
              class="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-foreground no-underline hover:opacity-80 active:opacity-disabled transition-opacity"
              href="/">首页</a></li>
          <li class="text-medium whitespace-nowrap box-border list-none data-[active=true]:font-semibold"><a
              class="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-foreground no-underline hover:opacity-80 active:opacity-disabled transition-opacity"
              tabindex="0" role="link" href="https://pic.besscroft.com" rel="noopener noreferrer"
              target="_blank">足迹</a></li>
          <li class="text-medium whitespace-nowrap box-border list-none data-[active=true]:font-semibold"><a
              class="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-foreground no-underline hover:opacity-80 active:opacity-disabled transition-opacity"
              tabindex="0" role="link" href="/about">关于</a></li>
        </ul>
        <ul class="flex gap-4 h-full flex-row flex-nowrap items-center data-[justify=start]:justify-start data-[justify=start]:flex-grow data-[justify=start]:basis-0 data-[justify=center]:justify-center data-[justify=end]:justify-end data-[justify=end]:flex-grow data-[justify=end]:basis-0"
            data-justify="end">
          <li class="text-medium whitespace-nowrap box-border list-none data-[active=true]:font-semibold flex h-full items-center">
            <a class="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-primary no-underline hover:opacity-80 active:opacity-disabled transition-opacity p-1"
               aria-label="Github" tabindex="0" role="link" href="https://github.com/besscroft"
               rel="noopener noreferrer" target="_blank">
              <svg height="24" viewBox="0 0 24 24" width="24"
                   class="text-default-600 dark:text-default-500 dark:text-white">
                <path clip-rule="evenodd"
                      d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                      fill="currentColor" fill-rule="evenodd"></path>
              </svg>
            </a></li>
          <li class="font-medium whitespace-nowrap box-border list-none data-[active=true]:font-semibold flex h-full items-center">
            <button>
              <svg aria-hidden="true" focusable="false" height="22" role="presentation" viewBox="0 0 24 24" width="22">
                <g fill="currentColor">
                  <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z"></path>
                  <path
                      d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z"></path>
                </g>
              </svg>
            </button>
          </li>
        </ul>
      </header>
    </nav>

    <main class="flex flex-col items-center justify-between p-2 pt-8 space-y-2">
      <div
          class="flex flex-col relative overflow-hidden height-auto text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none border-none select-none"
          tabindex="-1">
        <div class="relative shadow-black/5 shadow-none rounded-large" style="max-width:200px"><img
            src="https://besscroft.com/uploads/avatar.jpg"
            class="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large object-cover"
            alt="Woman listing to music" height="200" width="200" data-loaded="true"></div>
        <div
            class="p-3 h-auto flex items-center color-inherit subpixel-antialiased
            bg-op-10 backdrop-blur backdrop-saturate-150 justify-between
             before:bg-white/10 border-white/20
              border-1 overflow-hidden py-1 absolute before:rounded-xl
               rounded-lg bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p class="text-tiny text-white/80">想联系我？</p>
          <button
              class="z-0 group relative inline-flex items-center justify-center
              box-border appearance-none select-none whitespace-nowrap
              font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent
              outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2
               data-[focus-visible=true]:outline-offset-2
               data-[focus-visible=true]:outline-auto
                p-2 min-w-4 h-6 gap-2rem rounded-lg
                data-[pressed=true]:scale-95

                motion-reduce:transition-none
                data-[hover=true]:opacity-100
                text-xs text-white bg-black/20"
              >发邮件
          </button>
        </div>
      </div>

      <div
          class="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased">

        <p>我们的批评者是我们的朋友，因为他们指出我们的缺点。—— 本杰明·富兰克林</p></div>
    </main>
  </div>
</template>

<style scoped>

</style>