<script setup >
import {breakpointsTailwind, useBreakpoints, useDark} from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const mdAndLarger = breakpoints.greaterOrEqual('md')
const isDark = useDark()

// @ts-expect-error: Transition API
const isAppearanceTransition = document.startViewTransition
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
/**
 * Credit to [@hooray](https://github.com/hooray)
 * @see https://github.com/vuejs/vitepress/pull/2347
 */
function toggleDark(event) {
  if (!isAppearanceTransition || !event) {
    isDark.value = !isDark.value
    return
  }
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
  )
  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  })
  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
        {
          clipPath: isDark.value
              ? [...clipPath].reverse()
              : clipPath,
        },
        {
          duration: 400,
          easing: 'ease-in',
          pseudoElement: isDark.value
              ? '::view-transition-old(root)'
              : '::view-transition-new(root)',
        },
    )
  })
}
</script>

<template>
<!--  <el-button-->
<!--      v-if="!mdAndLarger"-->
<!--      flex flex-row items-center block px-5 py-2  w-full-->
<!--      class="!outline-none"-->
<!--      @click="toggleDark"-->
<!--  >-->
<!--    <span class="dark:i-carbon-moon i-carbon-sun block text-xl me-4"/>{{ isDark ? '切换至⌈白夜⌋' : '切换至⌈常夜⌋' }}-->
<!--  </el-button>-->


    <button
        class="font-medium whitespace-nowrap box-border list-none data-[active=true]:font-semibold flex h-full items-center"
        @click="toggleDark" >
      <div class="dark:i-carbon-moon i-carbon-sun"></div>
    </button>

<!--  <li class="font-medium whitespace-nowrap box-border list-none data-[active=true]:font-semibold flex h-full items-center">-->
<!--    <button>-->
<!--      <div class="i-carbon:search w-24px h-24px color-black-200"></div>-->
<!--    </button>-->
<!--  </li>-->

<!--  <el-button v-else  @click="toggleDark" >-->
<!--    <div class="dark:i-carbon-moon i-carbon-sun"></div>-->
<!--  </el-button>-->
</template>
