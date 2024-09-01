<script setup>



const props = defineProps({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    default: ''
  },
  url: {
    type: String,
    default: ''
  }
})

async function share() {
  if (!window.navigator.share) {
    console.debug('Share is not supported on this browser')
    return
  }

  const url = props.url ?? window.location.href

  let text =
      //
      props.title +
      '\n' +
      //
      url +
      '\n\n' +
      //
      props.text +
      '\n\n'

  // Should look like this:
  /**
   *  <title>
   *  <url>
   *
   *  <text>
   *
   *  <url>
   */

  try {
    await window.navigator.share({
      title: props.title,
      text: text,
      url: url
    })
  } catch (error) {
    console.error('Error sharing:', error)
  }
}
</script>

<template>
  <button
      class="line-clamp-0
       bg-gray-100 hover:bg-gray-200
       rounded-md p-3"
      @click="share"
      type="button"
  >
    <span class="sr-only"> Share page</span>

    <span class="i-carbon-share h-5 w-5" />
  </button>
</template>
