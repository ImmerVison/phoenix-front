<script setup>
// import cookies from 'vue-cookies'

import {uploader} from '~/api/app/uploader.js'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const fileList = ref([])

const uploadFile = (file) => {

  const formData = new FormData()
  formData.append('file', file)
  uploader(formData)
      .then(res => {
        handleSuccess(res, file)
      }).catch(err => {
    if (err.response && err.response.status === 401) {
      this.$message.error('认证状态错误！')
      this.$router.push('/login')
    } else {
      handleSuccess(err, file)
    }
  }).finally(() => {

  })
}


const handleSuccess = (response, file) => {
  try {
    const rootUrl = `${window.location.protocol}//${window.location.host}`
    // this.fileList.find(item => item.uid === file.uid).url = rootUrl + response.data[0].src
    // this.fileList.find(item => item.uid === file.uid).progreess = 100
    // this.fileList.find(item => item.uid === file.uid).status = 'success'
    this.$message({
      type: 'success',
      message: `${file.name}上传成功! 路径为${response.data[0].src}`
    })
    setTimeout(() => {

      //
    }, 3000)
  } catch (error) {
    this.$message.error(file.name + '上传失败')
  } finally {

  }
}
const handleError = (err, file) => {
  this.$message.error(file.name + '上传失败')

}

const beforeUpload = (file) => {
  const isLt5M = file.size / 1024 / 1024 < 5
  if (!isLt5M) {
    this.$message.error('上传文件大小不能超过 5MB!')
    return false
  } else {
    fileList.value.push(file)
    return true
  }
}
const handleProgress = (event) => {
  this.fileList.find(item => item.uid === event.file.uid).progreess = event.percent
}


</script>

<template>
  <div class="px-4 py-6"
       :class="{}">

    <div @paste.native="">
      <el-upload
          class=""
          :http-request="uploadFile"
          :show-file-list="false"
          accept="image/*, video/*"
          v-model:file-list="fileList"
          multiple
          list-type="picture-card"
      >

        <el-icon>
          <div class="i-ph-upload-light"/>
        </el-icon>

        <template #file="{ file }">

          <el-image class="flex justify-center items-center w-full" :src="file.url">
            <template #error>
              <div class="error-container">
                <el-icon>
                  <div class="i-carbon:no-image"></div>
                </el-icon>
              </div>
            </template>
          </el-image>

          <span class="el-upload-list__item-actions">
              <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
              >
            <el-icon><div class="i-carbon:view"/></el-icon>
          </span>
              <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
              >
                <el-icon><div class="i-material-symbols-delete-sweep-outline-rounded"/></el-icon>
               </span>
            </span>

        </template>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <template #header="{ close, titleId, titleClass }">
          <h4 :id="titleId" :class="titleClass" class="text-ellipsis">{{ titleId }}</h4>
        </template>
        <img w-full :src="dialogImageUrl" alt="Preview Image"/>
      </el-dialog>
    </div>


  </div>


</template>


<style scoped>
.i-ph-upload-light {
  --un-icon: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 256 256' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M238 136v64a14 14 0 0 1-14 14H32a14 14 0 0 1-14-14v-64a14 14 0 0 1 14-14h48a6 6 0 0 1 0 12H32a2 2 0 0 0-2 2v64a2 2 0 0 0 2 2h192a2 2 0 0 0 2-2v-64a2 2 0 0 0-2-2h-48a6 6 0 0 1 0-12h48a14 14 0 0 1 14 14M84.24 76.24L122 38.49V128a6 6 0 0 0 12 0V38.49l37.76 37.75a6 6 0 0 0 8.48-8.48l-48-48a6 6 0 0 0-8.48 0l-48 48a6 6 0 0 0 8.48 8.48M198 168a10 10 0 1 0-10 10a10 10 0 0 0 10-10'/%3E%3C/svg%3E");
  -webkit-mask: var(--un-icon) no-repeat;
  mask: var(--un-icon) no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  background-color: currentColor;
  color: inherit;
  width: 1.6em;
  height: 1.6em;
  border: none;


}

.i-material-symbols-delete-sweep-outline-rounded {
  --un-icon: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M5 19q-.825 0-1.412-.587T3 17V8q-.425 0-.712-.288T2 7t.288-.712T3 6h3v-.5q0-.425.288-.712T7 4.5h2q.425 0 .713.288T10 5.5V6h3q.425 0 .713.288T14 7t-.288.713T13 8v9q0 .825-.587 1.413T11 19zm11-1q-.425 0-.712-.288T15 17t.288-.712T16 16h2q.425 0 .713.288T19 17t-.288.713T18 18zm0-4q-.425 0-.712-.288T15 13t.288-.712T16 12h4q.425 0 .713.288T21 13t-.288.713T20 14zm0-4q-.425 0-.712-.288T15 9t.288-.712T16 8h5q.425 0 .713.288T22 9t-.288.713T21 10zM5 8v9h6V8z'/%3E%3C/svg%3E");
  -webkit-mask: var(--un-icon) no-repeat;
  mask: var(--un-icon) no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  background-color: currentColor;
  color: inherit;
  width: 1.2em;
  height: 1.2em;
  --at-apply: 'font-bold opacity-100 focus-within:opacity-100';
}


@keyframes breathe {
  0%, 100% {
  }
  50% {
    box-shadow: 0 0 10px 5px #409EFF;
    opacity: 0.8;
  }
}


.paste-mode :deep(.el-upload) {
  pointer-events: none;
}


.is-uploading :deep(.el-upload-dragger) {
  animation: breathe 3s infinite;
}

.upload-card-busy :deep(.el-upload-dragger) {
  height: 25vh;
}

.paste-mode :deep(.el-upload) {
  pointer-events: none;
}

:deep(.el-upload-dragger) {
  --at-apply: h-60;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 2px dashed #409EFF;
  opacity: 0.7;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

:deep(.el-upload-dragger:hover) {
  opacity: 0.8;
  box-shadow: 0 0 10px 5px #409EFF;
}

:deep(.el-upload-dragger.is-dragover) {
  opacity: 0.8;
  box-shadow: 0 0 10px 5px #409EFF;
}

.is-uploading :deep(.el-upload-dragger) {
  animation: breathe 3s infinite;
}

.el-upload__text {
  font-weight: bold;
  font-size: medium;
  user-select: none;
}


.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.i-carbon\:no-image {
  font-size: 48px; /* Adjust the size of the icon */
  color: #ccc; /* Adjust the color of the icon */
}


</style>
