<script setup>
import {useDark, useEventListener, useScroll} from "@vueuse/core";
import {onMounted, reactive, ref, watchEffect} from "vue";
import Title from "~/components/Title.vue";
import {usePanelStore} from "~/store/index.js";
import RecommandView from "~/pages/RecommandView.vue";
import Navigation from "~/components/Navigation.vue";
import PageBanner from "~/components/PageBanner.vue";
import ScrollTopButton from "~/components/ScrollTopButton.vue";
import ShareButton from "~/components/ShareButton.vue";
import SourceSwitch from "~/components/SourceSwitch.vue";
import {Source} from "~/types/images.js";
import {useRoute} from "vue-router";


const panelStore = usePanelStore()
//将 panelMinWidth 保存到 store 中
panelStore.setPanelMinWidth(document.body.clientWidth / 2 > 256 ? 256 : document.body.clientWidth / 2)


onMounted(() => {
  const menuOpen = localStorage.getItem('menuOpen')
  if (menuOpen === '1') {
    panelStore.setLeftWidth(panelStore.panelMinWidth)
  }
})


const togglePanel = () => {


  panelStore.togglePanel()
  localStorage.setItem('menuOpen', panelStore.leftWidth > 0 ? '1' : '0')
}


const scrollContainer = ref(null)
const scrollButtonRef = ref(null)
const {y, directions} = useScroll(scrollContainer, {
  onScroll: () => {
    if (
        //
        directions.top === true &&
        y.value >= 0
    ) {
      scrollButtonRef.value.setShowScrollTopButton(true)
      //
    } else {

      scrollButtonRef.value.setShowScrollTopButton(false)
    }
  }
})

const scrollToTop = () => {
  console.log("scrollToTop")
  scrollContainer.value.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}




const selectSource = ref(
    useRoute().query.source ?? Source.Wallhaven,
)

// const { data, pending, error, refresh } = useAsyncData(
//     `latest-${selectSource.value}`,
//     async () => {
//       const url = `/api/${selectSource.value}/latest?page=${page.value}`;
//       const data = await fetchJson(url);
//       return data;
//     },
//     {
//       watch: [page],
//       server: false,
//     },
// );

// const handelLoad = () => {
//   if (pending.value) {
//     return;
//   }
//   page.value++;
// };
//
// watch(data, (value) => {
//   if (!value) {
//     return;
//   }
//   list.value = [...list.value, ...value];
// });
//
// watch(selectSource, (value) => {
//   list.value = [];
//   page.value = 1;
//   useRouter().replace({
//     query: {
//       source: value,
//     },
//   });
//   refresh();
// });

</script>

<template>

  <div class="min-h-screen flex flex-col bg-white dark:bg-#09090B">
    <div class="h-100vh w-100vw relative flex">
      <div class="flex w-full min-h-full">
        <div class="absolute md:relative bottom-0 top-0 left-0 z-[900] transition-all overflow-hidden min-h-screen"
             :style="{width: panelStore.leftWidth + 'px'}">
          <Navigation/>
        </div>
        <div v-if="panelStore.leftWidth"
             class="md:hidden absolute left-0 right-0 top-0 bottom-0 z-[100]
         bg-neutral-600 bg-opacity-50" @click="togglePanel"/>
        <div class="flex-1 relative max-h-screen overflow-hidden" >
          <Header/>
<!--          <PageBanner/>-->
          <div
              ref="scrollContainer"
              class="flex justify-center pt-8 overflow-y-auto max-h-full"
          >
            <div class="w-full max-w-[1600px]">
              <div class="mb-8">
                <SourceSwitch v-model:select-source="selectSource" />
              </div>
              <RecommandView/>
<!--              <main class="flex-1 p-3">-->
<!--            -->
<!--                <div class="h-[64px]"/>-->
<!--              </main>-->
            </div>
          </div>

          <ScrollTopButton ref="scrollButtonRef" @scrollToTop="scrollToTop"/>
        </div>
      </div>
    </div>


  </div>
</template>

<style scoped>
.main {
  /* prettier-ignore */
  --at-apply: 'mx-auto mx-w-[68vw] lg:w-4xl md:w-[46rem] lt-md:mx-w-[90vw] lt-md:w-[90vw]';
}


.text-gradient {
  background-image: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 400%;
  background-position: 0%;
}

.text-link {
  /* prettier-ignore */
  --at-apply: text-sky-700;
  hover: text-sky-500;
}

.text-link-active {
  /* prettier-ignore */
  @apply hover:text-sky-600;
}


</style>
