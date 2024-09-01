<script lang="ts" setup>
// TODO: Load this component in <suspense>

const props = defineProps({
  post: {
    type: Object as PropType<Post>,
    required: true
  }
})

// const { $pocketBase } = useNuxtApp()
//
// const { savedPostList } = usePocketbase()
// const { isPremium } = useUserData()

const postInSavedList = computed(() => {
  return savedPostList.value.find(
      (savedPost) => savedPost.original_id === props.post.id && savedPost.original_domain === props.post.domain
  )
})

const isPostSaved = computed(() => {
  return !!postInSavedList.value
})

async function onClick() {
  if (!isPremium.value) {
    const { open: promptPremium, currentIndex } = usePremiumDialog()

    currentIndex.value = 2
    promptPremium.value = true
    return
  }

  if (isPostSaved.value) {
    await deletePost()
  }
  //
  else {
    await savePost()
  }
}

async function savePost() {
  await $pocketBase
      .collection('posts')
      .create(PocketbasePost.fromPost(props.post, $pocketBase.authStore.baseModel.id))
}

async function deletePost() {
  await $pocketBase.collection('posts').delete(postInSavedList.value.id)
}
</script>

<template>
  <button
      class="hover:hover-bg-util focus-visible:focus-outline-util group rounded-md px-1.5 py-1"
      type="button"
      @click="onClick"
  >
    <span class="sr-only"> Save post </span>

    <span
        v-if="isPostSaved"
        class="group-hover:text-base-50 h-5 w-5 text-base-200 i-carbon:bookmark-filled"
    />
    <span
        v-else
        class="group-hover:text-base-50 h-5 w-5 text-base-200 i-carbon:bookmark-add"
    />
  </button>
</template>
