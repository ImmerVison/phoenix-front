<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import {useData} from "element-plus/es/components/table-v2/src/composables";
import {useDark} from "@vueuse/core";
import {loadExternalResource} from "~/tools/index.js";


// interface RaindropFXOptions extends SimulatorOptions, RenderOptions {}

/**
 * @type{RaindropFXOptions}
 *
 */


// declare class RaindropFX {
//   public options: Options
//   public renderer: RaindropRenderer
//   public simulator: RaindropSimulator
//
//   constructor(options: Partial<RaindropFXOptions> & { canvas: HTMLCanvasElement })
//
//   resize(w: number, h: number): void
//
//   start(): void
//
//   async setBackground(background: string): Promise<void>
// }


/**
 * @type {RaindropFX}
 * @property {RaindropFXOptions} options
 * @property {RaindropRenderer} renderer
 * @property {RaindropSimulator} simulator
 * @property {function} resize(w: number, h: number): void
 * @property {function} start(): void
 * @property {function} setBackground(background: string): Promise<void>
 */


defineOptions({
  name: 'Rain',
})

// type BG = {
//   desktopDark: string
//   desktopLight: string
//   mobileDark: string
//   mobileLight: string
// }

/**
 * @type {BG}
 * @property {string} desktopDark
 * @property {string} desktopLight
 * @property {string} mobileDark
 * @property {string} mobileLight
 */


// type Props = {
//   bg: BG
// }

/**
 * @type {Props}
 * @property {BG} bg
 */


/**
 *
 * @returns {Props}
 */
const props = defineProps()

/**
 *
 * @param bg BG
 * @returns {{canvasRef: boolean}}
 */
const useRain = (bg) => {
  const { isDark } = useData()
  /**
   * @type {Ref<HTMLCanvasElement>}
   */
  const canvasRef = ref()
  /**
   * @type {InstanceType<typeof window.RaindropFX>}
   */
  let raindropFx
  const url = 'https://yaozhixiang.top/assets/js/RaindropFX.js'

  const resizeRain = () => {
    if (!canvasRef.value) return
    if (!raindropFx) return


    // assert canvasRef.value is not null
    const rect = canvasRef.value.getBoundingClientRect()

    raindropFx.resize(rect.width, rect.height)
  }

  const switchRain = () => {
    if (!raindropFx) return
    const body = document.body.getBoundingClientRect()

    if (isDark.value) {
      if (body.height > body.width) {
        raindropFx.setBackground(bg.mobileDark)
      } else {
        raindropFx.setBackground(bg.desktopDark)
      }
    } else {
      if (body.height > body.width) {
        raindropFx.setBackground(bg.mobileLight)
      } else {
        raindropFx.setBackground(bg.desktopLight)
      }
    }
  }

  /**
   *
   * @param url {string}
   */
  const removeRainScript = (url) => {
    Object.defineProperty(window, 'RaindropFX', { value: null, writable: true, configurable: true })
    const scriptElement = document.querySelector(`[src="${url}"]`)
    scriptElement?.remove()
  }

  const initRain = async () => {
    try {
      const body = document.body.getBoundingClientRect()
      // assert canvasRef.value is not null
      const rect = canvasRef.value.getBoundingClientRect()

      // assert canvasRef.value is not null
      canvasRef.value.width = rect.width
      // assert canvasRef.value is not null
      canvasRef.value.height = rect.height

      /**
       * @type {string}
       */
      let background

      if (isDark.value) {
        if (body.height > body.width) {
          background = bg.mobileDark
        } else {
          background = bg.desktopDark
        }
      } else {
        if (body.height > body.width) {
          background = bg.mobileLight
        } else {
          background = bg.desktopLight
        }
      }

      const option = {
        // assert canvasRef.value is not null
        canvas: canvasRef.value,
        background,
      }

      raindropFx = new window.RaindropFX(option)

      raindropFx.start()
    } catch (error) {
      console.error(error)
    }
  }

  const watched = watch(isDark, () => {
    switchRain()
  })

  onMounted(() => {
    removeRainScript(url)

    loadExternalResource(url, 'js').then(() => {
      initRain()
    })

    window.addEventListener('resize', resizeRain)
    document.body.classList.add('fixed')
  })

  onBeforeUnmount(() => {
    watched()

    window.removeEventListener('resize', resizeRain)
    document.body.classList.remove('fixed')
  })

  return { canvasRef }
}

const { canvasRef } = useRain(props.bg)
</script>

<template>
  <Teleport to="body">
    <canvas class="fixed inset-0 w-full h-full translate-x-0" ref="canvasRef" id="rain" />
  </Teleport>
</template>
