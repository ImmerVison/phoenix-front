import {
  defineConfig,
  presetUno,
  presetIcons,
  presetWebFonts,
  presetTypography,
  presetAttributify,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss';

export default defineConfig({
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        'src/**/*.{js,ts}'
      ]
    }
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
   //   cdn: 'https://esm.sh/',
      scale: 1.1,
      extraProperties: {
        height: '1em',
        'flex-shrink': '0',
        display: 'inline-block'
      },
      collections: {
        // custom: async (name) => {
        //   if (name === 'zeabur') {
        //     return await fetch(`https://zeabur.com/favicon.svg`).then((res) => res.text());
        //   }
        // }
        custom: {
          circle: '<svg t="1715307004524" class="icon" viewBox="0 0 1179 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1804" width="32" height="32"><path d="M915.432989 1018.782202c144.763685 0 262.138247-136.203506 262.138247-304.185528 0-159.19173-105.414472-289.75173-239.662023-302.988944C929.124674 184.158921 767.488 2.876404 569.297978 2.876404 394.435596 2.876404 248.09564 144.050337 210.012045 333.49609 89.099506 379.604854 1.754607 511.603056 1.754607 667.343101c0 194.08827 135.599461 351.439101 302.862382 351.439101h610.816z" fill="#7FBFE1" p-id="1805"></path></svg>',

        },


      }
    }),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        sans: ['IBM Plex Sans', 'Noto Sans Simplified Chinese'],
        mono: 'Input Mono',
        quicksand: {
          provider: 'fontshare',
          name: 'Quicksand',
          weights: ['1', '300', '400', '500', '600', '700']
        }
      }
    }),
    presetTypography(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  shortcuts: {

    'card': 'border-rd-30 bg-#FFFFFF shadow-[0px_6px_20px_0px_rgba(204,204,204,0.3)] w-100% mb-4vw p-2rem',
    'border-base': 'border-gray/40 dark:border-gray/40',
    'text-base-50': 'text-neutral-50 dark:text-light-50',
    'text-base-100': 'text-neutral-100 dark:text-light-100',
    'text-base-200': 'text-neutral-200 dark:text-light-200',
    'text-base-300': 'text-neutral-300 dark:text-light-300',
    'text-base-400': 'text-neutral-400 dark:text-light-400',
    'text-base-500': 'text-neutral-500 dark:text-light-500',
    'text-base-600': 'text-neutral-600 dark:text-light-600',
    'text-base-700': 'text-neutral-700 dark:text-light-700',
    'text-base-800': 'text-neutral-800 dark:text-light-800',
    'text-base-900': 'text-neutral-900 dark:text-light-900'
  },
  theme: {
    colors: {
      'main-50': '#fafafa',
      'main-100': '#f5f5f5',
      'main-200': '#e5e5e5',
      'main-300': '#d4d4d4',
      'main-400': '#a3a3a3',
      'main-500': '#737373',
      'main-600': '#525252',
      'main-700': '#404040',
      'main-800': '#262626',
      'main-900': '#171717'
    },
    boxShadow: {
      box: '0 2px 3px rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 10%)'
    }
  }
});
