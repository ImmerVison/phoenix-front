<script setup>
// import cookies from 'vue-cookies'

import {uploader} from '~/api/app/uploader.js'
import {ElMessage} from "element-plus";
/**
 * interface UploadFile {
 *   name: string
 *   percentage?: number
 *   status: UploadStatus
 *   size?: number
 *   response?: unknown
 *   uid: number
 *   url?: string
 *   raw?: UploadRawFile
 *   base64?: string
 * }
 * @type {Ref<UnwrapRef<*[]>>}
 */
// region 图片预览
const imgPreviewList = ref([])
let changeTimer = null; // 用于控制事件合并的计时器
let pendingFiles = []; // 用于存储待处理的文件列表

// todo 外部化配置
const copyLinkFormat = () => '.md'



//绑定on-change, 添加文件、上传成功和上传失败时都会被调用,
const handleFileChange = (uploadFile, uploadFiles) => {

  // imgPreviewList的最大长度为maxUploading

  if (imgPreviewList.value.length + pendingFiles.length >= maxUploading) {
    ElMessage({
      message: `最多上传${maxUploading}张图片, 超出的部分将被忽略`,
      type: 'warning',
    });
    return;
  }


  // FileReader是异步的, 直接read会出现file多次添加的情况,  将文件暂存到 pendingFiles 中
  pendingFiles.push(uploadFile);

  // 如果有计时器在运行，清除它
  if (changeTimer) {
    clearTimeout(changeTimer);
  }

  // 设置一个新的计时器，200ms 后处理所有文件
  changeTimer = setTimeout(() => {
    processFiles(pendingFiles);
    pendingFiles = []; // 清空待处理的文件列表
  }, 100);
};


const processFiles = (uploadFileArray) => {
  fileReader(uploadFileArray, 0);
};

const fileReader = (uploadFileArray, index) => {
  let reader = new FileReader()
  reader.readAsDataURL(uploadFileArray[index].raw)
  reader.onload = (e) => {
    imgPreviewList.value.push({
      ...uploadFileArray[index],
      base64: e.target.result
    })
    if (++index < uploadFileArray.length) fileReader(uploadFileArray, index)
  }

}


const deleteImg = (index) => {
  imgPreviewList.value.splice(index, 1)
}


const dialogImageUrl = ref('')
const dialogImageName = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const PicPreviewByClick = (fileSrc, fileName) => {

  dialogImageUrl.value = fileSrc
  dialogImageName.value = fileName
  dialogVisible.value = true

}
// endregion


// region 提交上传,

const canSubmit = () => {
  return imgPreviewList.value.length > 0
}

const submitUpload = () => {
  imgPreviewList.value.forEach((imgPreview) => {
    if (beforeUpload(imgPreview)) {
      imgPreview.status = 'uploading';
      //发送请求
      const formData = new FormData();
      formData.append('file', imgPreview.raw);

      uploader(formData, imgPreview, null, handleProgress)
          .then(res => {
            handleSuccess(res, imgPreview.uid);
          })
          .catch(err => {
            if (err.response && err.response.status === 401) {
              ElMessage({
                message: '请先登录',
                type: 'error',
              });
              window.location.href = '/login'; // 使用 window.location.href 代替 this.$router.push
            } else {
              handleError(err, imgPreview.uid);
            }
          })
          .finally(() => {

          });
    }
  })
}
// endregion


// region 变量
const props = defineProps({
  bgColor: {
    type: String,
    default: '',
    required: false
  },
  selectedUrlForm: {
    type: String,
    default: 'url',
    required: false
  },
  uploadMethod: {
    type: String,
    default: 'drag',
    required: false
  }

});

// 动态计算背景颜色
const combinedBgColor = computed(() => {
  const defaultClass = 'bg-slate-200'
  return props.bgColor === '' ? defaultClass : props.bgColor;
});
const errorMessage = ref('');


const uploading = ref(false);

const maxUploading = 10;

const waitingList = ref([]);

const uploadingCount = computed(() => {
  return imgPreviewList.value.filter(item => item.status === 'uploading').length;
});

const waitingCount = computed(() => {
  return waitingList.value.length;
});


const uploadSuccessCount = computed(() => {
  return imgPreviewList.value.filter(item => item.status === 'done' || item.status === 'success').length;
});

const uploadErrorCount = computed(() => {
  return imgPreviewList.value.filter(item => item.status === 'exception').length;
});
// endregion


// region 上传结果Hook
const beforeUpload = (uploadFile) => {

  if (uploadFile.status === 'uploading' || uploadFile.status === 'done' || uploadFile.status === 'success') {
    ElMessage({
      message: `${uploadFile.name}正在上传中或已上传成功`,
      type: 'warning',
    });
    return false;
  }
  const isLt10M = Math.ceil(uploadFile.size / 1024 / 1024) < 10;
  if (!isLt10M) {
    ElMessage({
      message: `${uploadFile.name}尺寸过大, 上传文件大小不能超过 10MB!`,
      type: 'warning',
    });
    return false;
  }
  return true;
};


const handleSuccess = (response, uid) => {
  try {
    // const rootUrl = `${window.location.protocol}//${window.location.host}`;
    const rootUrl = 'https://ciallo.link';
    const target = imgPreviewList.value.find(item => item.uid === uid);
    target.url = rootUrl + response.data[0].src;
    target.percentage = 100;
    target.status = 'success';


    // 上传成功后，预览列表中原图片的url替换为上传成功后的url
    const index = imgPreviewList.value.findIndex(item => item.uid === uid);
    if (index !== -1) {
      imgPreviewList.value[index].url = target.url;
    } else {
      //todo
      target.status = 'exception';
      console.error('未找到对应的图片');
    }
    ElMessage({
      message: '上传成功',
      type: 'success',
    })


    setTimeout(() => {
      target.status = 'done';
    }, 800);
  } catch (error) {

    ElMessage({
      message: `上传失败[${JSON.stringify(response.data)}]`,
      type: 'error',
    })
    const target = imgPreviewList.value.find(item => item.uid === uid);
    imgPreviewList.value.find(item => item.uid === uid).status = 'exception';
  } finally {

  }
};

const handleError = (err, uid) => {
  console.log('handleError error:', err);
  ElMessage({
    message: '上传失败',
    type: 'error',
  })
  imgPreviewList.value.find(item => item.uid === uid).status = 'exception';
};


// endregion


// region 功能性方法: 粘贴上传 & 复制链接 & 整体复制  & 清空列表
// const handlePaste = (event) => {
//   if (props.uploadMethod !== 'paste') {
//     return;
//   }
//
//   const items = event.clipboardData.items;
//   for (let i = 0; i < items.length; i++) {
//     if (items[i].kind === 'file') {
//       const file = items[i].getAsFile();
//       if (file.type.includes('image') || file.type.includes('video')) {
//         file.uid = Date.now() + i;
//         file.file = file;
//         if (beforeUpload(file)) {
//           uploadFile({
//             file: file,
//             onProgress: handleProgress,
//             onSuccess: handleSuccess,
//             onError: handleError
//           });
//         }
//       } else {
//         alert('粘贴板中的文件不是图片或视频');
//       }
//     }
//   }
// };





const handleCopy = (imgPreview) => {
  const status = imgPreview.status;
  if (status !== 'done' && status !== 'success') {
    ElMessage({
      message: '图片未上传成功',
      type: 'warning',
    });
    return;
  }

  let textToCopy;
  switch (copyLinkFormat()) {
    case 'url':
      textToCopy = imgPreview.url;
      break;
    case 'md':
      textToCopy = `![${imgPreview.name}](${imgPreview.url})`;
      break;
    case 'html':
      textToCopy = `<img src="${imgPreview.url}" alt="${imgPreview.name}">`;
      break;
    default:
      textToCopy = imgPreview.url;
  }

  navigator.clipboard.writeText(textToCopy);

  ElMessage({
    message: '复制成功',
    type: 'success',
  });
};

const copyAll = () => {
  let urls;

  switch (copyLinkFormat()) {
    case 'url':
      urls = imgPreviewList.value.filter(item => item.status === 'done' || item.status === 'success')
          .map(item => item.url).join('\n');
      break;
    case 'md':
      urls = imgPreviewList.value.filter(item => item.status === 'done' || item.status === 'success')
          .map(item => `![${item.name}](${item.url})`).join('\n');
      break;
    case 'html':
      urls = imgPreviewList.value.filter(item => item.status === 'done' || item.status === 'success')
          .map(item => `<img src="${item.url}" alt="${item.name}">`).join('\n');
      break;
    default:
      urls = imgPreviewList.value.filter(item => item.status === 'done' || item.status === 'success')
          .map(item => item.url).join('\n');
  }

  navigator.clipboard.writeText(urls);
  ElMessage({
    message: '整体复制成功',
    type: 'success',
  });
};



const resetOrClearList = () => {
  // 如果存在上传中的文件，不允许清空列表
  if (uploadingCount.value > 0) {
    ElMessage({
      message: '存在正在上传的文件，请稍后再试',
      type: 'warning',
    });
    return;
  }

  // 如果存在上传失败的文件, 则清除上传成功的文件,并把上传失败的文件的status设置为ready
  if (uploadErrorCount.value > 0) {
    imgPreviewList.value = imgPreviewList.value.filter(item => item.status === 'exception');
    imgPreviewList.value.forEach(item => {
      item.status = 'ready';
    });
  } else {
    imgPreviewList.value = [];
  }

};




// endregion



// region deprecated
const handleProgress = (event) => {
  const target = imgPreviewList.value.find(item => item.uid === event.uid);
  if (target) {
    target.progreess = event.percent;
  }
};

// endregion



defineExpose({
  submitUpload,
  canSubmit,
  copyAll,
  resetOrClearList
})
</script>

<template>


  <div class="px-4 py-6"
       :class="combinedBgColor">


    <div class="max-w-7xl max-md:max-w-lg mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-1">
        <template v-for="(imgPreview, index) in imgPreviewList" :key="index">
          <div class="bg-white rounded-md overflow-hidden group">
            <el-skeleton
                :loading="imgPreview.status === 'uploading'"
                animated
                class="w-full h-60 "
            >
              <template #template>
                <el-skeleton-item variant="image" style="width: 100%; height: 100%;"/>
              </template>

              <template #default>

                <div class="relative overflow-hidden group">
                  <img :src="imgPreview.base64" alt=""
                       loading="lazy"
                       @click="PicPreviewByClick(imgPreview.base64, imgPreview.name)"
                       class="w-full h-60 object-cover group-hover:scale-125 transition-all duration-300"/>

                  <div v-if="imgPreview.status === 'exception'" class="
                    absolute top-0 left-0 w-100% h-100% box-border
                    flex justify-center items-center opacity-60 errorMask">
                    <div class="ep--warning-filled w-32px h-32px" style="color: #da3e3e;"></div>
                  </div>
                  <div v-if="imgPreview.status === 'done'"  class="px-1 py-1 rounded-md text-white text-sm tracking-wider
                      absolute top-0 right-0
                      cursor-pointer bg-[#645B5B]
                      hover:text-md hover:bg-opacity-60
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-300
                      focus-within:opacity-100"
                       @click="handleCopy(imgPreview)">
                    <div class="i-material-symbols-content-copy-outline-rounded" style="color: white; width: 1.6em; height: 1.6em;"/>

                  </div>

                  <div v-if="imgPreview.status === 'ready'"  class="px-1 py-1 rounded-md text-white text-sm tracking-wider
                      absolute top-0 right-0
                      cursor-pointer bg-[#645B5B]
                      hover:text-md hover:bg-opacity-60
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-300
                      focus-within:opacity-100"
                       @click="deleteImg(index)">
                    <div class="i-material-symbols-delete-sweep-outline-rounded "/>
                  </div>
                </div>
              </template>
            </el-skeleton>


          </div>

        </template>


        <div @paste.native="handlePaste">
          <el-upload
              drag
              multiple
              :file-list="imgPreviewList"
              :auto-upload="false"
              :show-file-list="false"
              accept="image/*, video/*"
              @change="handleFileChange"
              :before-upload="beforeUpload"

          >
            <el-icon class="el-icon--upload">
              <div class="i-ph-upload-light"></div>
            </el-icon>
            <div class="el-upload__text">
              <p class="text-xs text-gray-400 mt-2">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
            </div>


          </el-upload>


        </div>
        <el-dialog v-model="dialogVisible">
          <img :src="dialogImageUrl" alt="Preview Image"/>
        </el-dialog>

      </div>

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
  width: 16px;
  height: 16px;
  --at-apply: 'font-bold opacity-100 focus-within:opacity-100 w-[2em] h-[2em]';
}


.ep--warning-filled {
  display: inline-block;
  width: 32px;
  height: 32px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath fill='%23df2626' d='M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m0 192a58.43 58.43 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.43 58.43 0 0 0 512 256m0 512a51.2 51.2 0 1 0 0-102.4a51.2 51.2 0 0 0 0 102.4'/%3E%3C/svg%3E");
}



.i-material-symbols-content-copy-outline-rounded {
  --un-icon: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M9 18q-.825 0-1.412-.587T7 16V4q0-.825.588-1.412T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.587 1.413T18 18zm0-2h9V4H9zm-4 6q-.825 0-1.412-.587T3 20V7q0-.425.288-.712T4 6t.713.288T5 7v13h10q.425 0 .713.288T16 21t-.288.713T15 22zm4-6V4z'/%3E%3C/svg%3E");
  -webkit-mask: var(--un-icon) no-repeat;
  mask: var(--un-icon) no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  background-color: currentColor;
  color: inherit;
  width: 0.8em;
  height: 0.8em;

  --at-apply: 'font-bold opacity-100 focus-within:opacity-100';
}

.errorMask {
  background: radial-gradient(rgba(0, 0, 0, 0) 0%, rgba(196, 51, 51, 0.5) 100%), radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%);
}
.mask {
  background: radial-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%),
  radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%);
}

.center {
  margin: 0.5rem auto;
  display: block;
}

@keyframes breathe {
  0%, 100% {
  }
  50% {
    box-shadow: 0 0 10px 5px #409EFF;
    opacity: 0.8;
  }
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

.el-upload__text {
  font-weight: bold;
  font-size: medium;
  user-select: none;
}



. glassBg {
  padding: 0 1rem;
  display: flex;
  align-items: center;
  width: 100%;
  height: 3.2rem;
  background-color: var(rgba(255, 255, 255, .5));
  position: sticky;
  top: 0;
  color: black;
  backdrop-filter: blur(10px);
  z-index: 20;
}

</style>
