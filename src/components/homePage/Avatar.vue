<script setup>

const props = defineProps({
  config: Object
})


const overturnAnimated = ref(false)

const rotate = (isOverturn) => {
  overturnAnimated.value = isOverturn
}

</script>

<template>
  <div class="avatar-container" @mouseover="rotate(true)" @mouseout="rotate(false)">
    <a href="/">
      <img :src="props.config.avatarImage" :class="{ overturnAnimated : overturnAnimated }" class="avatar-img" alt="">
      <div class="info-text" :class="{ overturnAnimated: true, infoTextTurned : overturnAnimated }">
        {{ props.config.avatarText }}
      </div>
    </a>
  </div>
</template>

<style scoped>
.avatar-container {
  transform-style: preserve-3d;
  perspective: 900px;
}

.avatar-img {
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 0 2px rgb(255 255 255 / 50%), 0 2px 20px 3px rgb(0 0 0 / 25%);
}

.avatar-container * {
  width: 120px;
  height: 120px;
  transition: all 0.8s;
  /*transform-origin: 0% 50%;*/
}


.overturnAnimated {
  transform: rotateY(-180deg);
}
.infoTextTurned {
  transform: rotateY(-360deg);
}

.info-text {
  background: rgba(0,0,0,.5);
  position: absolute;
  border-radius: 50%;
  backface-visibility: hidden;
  text-align: center;
  line-height: 120px;
  font-size: 21px;
  top: 0;
  font-family: MoeFonts,sans-serif;
}

a {
  color: white;
}
</style>
