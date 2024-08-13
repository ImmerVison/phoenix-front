
<script setup>
/**
 * 背景颜色属性
 * @typedef {Object} Props
 * @property {string} bgColor - 背景颜色
 * @property {string} selectedUrlForm - 选择的URL格式
 * @property {string} uploadMethod - 上传方法
 */

import { uploader } from '~/api/app/uploader.js';



// region 图片预览

/**
 * @typedef {Object} RawData
 * @property {number} uid - A unique identifier for the data.
 */

/**
 * @typedef {Object} DataItem
 * @property {RawData} raw - Contains the raw data.
 * @property {string} status - The status of the data.
 */
/** @type {import('vue').Reactive<DataItem[]>} */
const imgPreviewList = reactive([]);

/** @type {number | null} */
let changeTimer = null;

/** @type {Object[]} */
let pendingFiles = [];

/**
 * 处理文件变更事件
 * @param {File} file - 变更的文件对象,类型为elementui 的 UploadFile
 * @param {File[]} rawFileList - 原始文件列表 UploadFile[]
 */
const handleFileChange = (file, rawFileList) => {
  pendingFiles.push(file);
  if (changeTimer) {
    clearTimeout(changeTimer);
  }

  changeTimer = setTimeout(() => {
    processFiles(pendingFiles);
    pendingFiles = [];
  }, 100);
};

/**
 * 处理文件列表
 * @param {File[]} files - 文件数组
 */
const processFiles = (files) => {
  const filesArray = files.map(f => f.raw || f);
  fileReader(filesArray, 0);
};

/**
 * 读取文件内容
 * @param {File[]} files - 文件数组
 * @param {number} index - 当前文件索引
 */
const fileReader = (files, index) => {
  let reader = new FileReader();
  reader.readAsDataURL(files[index]);
  reader.onload = (e) => {
    imgPreviewList.push(Object.assign(e, {
      raw: files[index],
      status: 'loading',
    }));
    if (++index < files.length) fileReader(files, index);
  };
};

/**
 * 删除预览图片
 * @param {number} index - 要删除的图片索引
 */
const deleteImg = (index) => {
  imgPreviewList.splice(index, 1);
};

/** @type {import('vue').Ref<string>} */
const dialogImageUrl = ref('');

/** @type {import('vue').Ref<string>} */
const dialogImageName = ref('');

/** @type {import('vue').Ref<boolean>} */
const dialogVisible = ref(false);


/**
 * 点击图片预览
 * @param {string} fileSrc - 图片源路径
 * @param {string} fileName - 图片名称
 */
const PicPreviewByClick = (fileSrc, fileName) => {
  dialogImageUrl.value = fileSrc;
  dialogImageName.value = fileName;
  dialogVisible.value = true;
};

/**
 * 下载文件的方法
 * @param {File} file - 要下载的文件对象
 */
//todo
const handleDownload = (file) => {
  // 实现下载逻辑
};

// endregion

// region 变量

/**
 * 组件的props
 * @type {Props}
 */
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

/**
 * 动态计算背景颜色
 * @returns {string}
 */
const combinedBgColor = computed(() => {
  const defaultClass = 'bg-slate-200';
  return props.bgColor === '' ? defaultClass : props.bgColor;
});

const errorMessage = ref('');

/**
 * 文件对象类型定义
 * uid实际上和file.uid是一样的
 * @typedef {Object} UploadingFile
 * @property {string} uid - 文件唯一标识
 * @property {string} name - 文件名
 * @property {string} url - 文件URL
 * @property {string} status - 文件状态
 * @property {number} progress - 上传进度
 * @property {File} file - 原始文件对象
 */

/**
 * @typedef {UploadingFile & CustomFileProperties} CombinedFile
 * Combines UploadingFile with CustomFileProperties
 */

/**
 * Custom properties added to the file object.
 * @typedef {Object} CustomFileProperties
 * @property {Function} onSuccess - Callback function to be called when the upload succeeds.
 * @property {Function} onProgress - Callback function to be called to track the upload progress.
 * @property {Function} onError - Callback function to be called when the upload fails.
 */

/** @type {ComputedRef<[]|{uid: ComputedRef<number>, onProgress: function(Object): void, file: ComputedRef<UnwrapRef<{uid: number}>>, onError: function(Error, UploadingFile): void, name: ComputedRef<*>, progress: number, url: ComputedRef<*>, status: string, onSuccess: function(Object, UploadingFile): void}[]>}
 *  */
// 事实上我只会上传imgPreviewList中的图片, 因此这里的fileList应该又imgPreviewList computed,
// 但是fileList的类型是CombinedFile[], 而imgPreviewList的类型是DataItem[], 因此这里的fileList应该是一个computed
// 创建响应式对象数组 fieList
const fileList = computed(() => {

  if (imgPreviewList.length === 0) {
    return [];
  }
  // 否则，对 a 中的每个对象进行加工处理并生成 b 的对应对象
  return imgPreviewList.map(imgPreview => ({
        uid: computed(() => imgPreview.raw.uid), // imgPreview.raw.uid的变化会导致uid的变化
        name: computed(() => imgPreview.raw.name),
        url: computed(() => imgPreview.target.result),
        status: 'uploading', //自定义属性, 独立于imgPreviewList的status
        progress: 0,
        file: computed(() => imgPreview.raw),
        //需要手动挂载回调函数
        onSuccess: handleSuccess,
        onProgress: handleProgress,
        onError: handleError
  }));
});

/** @type {import('vue').Ref<boolean>} */
const uploading = ref(false);


/** @type {import('vue').Ref<number>} */
const maxUploading = ref(10);

/** @type {import('vue').Ref<CombinedFile[]>} */
const waitingList = ref([]);

/**
 * 计算上传中的文件数量
 * @returns {number}
 */
const uploadingCount = computed(() => {
  return fileList.filter(item => item.status === 'uploading').length;
});

/**
 * 计算等待上传的文件数量
 * @returns {number}
 */
const waitingCount = computed(() => {
  return waitingList.value.length;
});

/**
 * 计算上传成功的文件数量
 * @returns {number}
 */
const uploadSuccessCount = computed(() => {
  return fileList.filter(item => item.status === 'done' || item.status === 'success').length;
});

/**
 * 计算上传失败的文件数量
 * @returns {number}
 */
const uploadErrorCount = computed(() => {
  return fileList.filter(item => item.status === 'exception').length;
});
// endregion

// region 上传方法

/**
 * 上传文件方法
 * (options: UploadRequestOptions) => XMLHttpRequest | Promise<unknown>
 * @param {CombinedFile} file - 上传的文件对象
 */
const uploadFile = (file) => {
  const originalFile = file.file


  if (uploadingCount.value > maxUploading.value) {
    waitingList.value.push(file);
    fileList.find(item => item.uid === originalFile.uid).status = 'waiting';
    return;
  } else {
    fileList.find(item => item.uid === originalFile.uid).status = 'uploading';
  }

  const formData = new FormData();
  formData.append('file', originalFile);

  uploader(formData, file, null)
      .then(res => {
        file.onSuccess(res, originalFile);
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          waitingList.value = [];
          imgPreviewList.slice(0, imgPreviewList.length)

          //todo 待优化, 重新认证后仍保留之前的图片预览列表
          //fileList.value = [];
          alert('认证状态错误！');
          window.location.href = '/login';
        } else {
          file.onError(err, originalFile);
        }
      })
      .finally(() => {
        if (uploadingCount.value + waitingCount.value === 0) {
          uploading.value = false;
        }
      });
};


/**
 * 上传前检查方法
 * @param {File} file - 检查的文件
 * @returns {boolean} 是否允许上传
 */
const beforeUpload = (file) => {
  const isLt10M = Math.ceil(file.size / 1024 / 1024) < 10;
  if (!isLt10M) {
    alert('上传文件大小不能超过 10MB!');
    //文件太大，不允许上传, 但是这里的fileList是一个computed, 无法直接修改, 所以只是设置了status, 但是并没有真正的删除
    fileList.find(item => item.uid === file.uid).status = 'exception';
    return false;
  }
};

/**
 * 提交上传的方法
 */
const submitUpload = () => {
  fileList.forEach(/**@type{CombinedFile}  **/file => {
    if (file.status === 'done' || file.status === 'success') {
      handleCopy(file);
    }
  });
};
// endregion

// region 上传结果Hook

// const checkProgress = (imgPreviewItem) => {
//   //根据imgPreviewItem的uid找到对应的fileList中的文件
//     const /**@type{CombinedFile} **/combinedFile =  fileList.find(item => item.uid === imgPreviewItem.raw.uid)
//     if (combinedFile.status === 'success') {
//       imgPreviewItem.status = 'success'
//     } else if (combinedFile.status === 'exception') {
//       imgPreviewItem.status = 'exception'
//     }
// }


/**
 * 处理上传进度
 * @param {Object} event - 上传事件对象
 */
const handleProgress = (event) => {
  /**
   * @type {UploadingFile | undefined}
   */
  const target = fileList.find(item => item.uid === event.file.uid);
  if (target) {
    target.progress = event.percent;
  }
};

/**
 * 处理上传成功
 * @param {Object} response - 响应对象
 * @param {UploadingFile} file - 上传的文件对象
 */
const handleSuccess = (response, file) => {
  try {
    const rootUrl = `${window.location.protocol}//${window.location.host}`;
    const/**@type{CombinedFile} **/ target = fileList.find(item => item.uid === file.uid);
    console.log(`response: ${JSON.stringify(response, null, 2)}`);
    target.url = rootUrl + response.data[0].src;
    target.progress = 100;
    target.status = 'success';
    setTimeout(() => {
      target.status = 'done';
    }, 3000);
  } catch (error) {
    alert(file.name + '上传失败');
    fileList.find(item => item.uid === file.uid).status = 'exception';
  } finally {
    if (uploadingCount.value + waitingCount.value === 0) {
      uploading.value = false;
    }
    if (waitingList.value.length) {
      const nextFile = waitingList.value.shift();
      uploadFile(nextFile);
    }
  }
};

/**
 * 处理上传错误
 * @param {Error} err - 错误对象
 * @param {UploadingFile} file - 上传的文件对象
 */
const handleError = (err, file) => {
  alert(file.name + '上传失败');
  fileList.find(item => item.uid === file.uid).status = 'exception';

  if (waitingList.value.length) {
    const nextFile = waitingList.value.shift();
    uploadFile(nextFile);
  }

  if (uploadingCount.value + waitingCount.value === 0) {
    uploading.value = false;
  }
};

/**
 * 处理文件移除
 * @param {File} file - 被移除的文件对象
 */
const handleRemove = (file) => {
  fileList = fileList.filter(item => item.uid !== file.uid);
  alert(file.name + '已删除');
};
// endregion

// region 功能性方法: 粘贴上传 & 复制链接 & 整体复制 & 清空列表




// region 暂时废弃的粘贴上传功能
// /**
//  * 处理粘贴事件，上传文件
//  * @param {ClipboardEvent} event - 粘贴事件对象
//  */
// const handlePaste = (event) => {
//   if (props.uploadMethod !== 'paste') {
//     return;
//   }
//
//   const items = event.clipboardData.items;
//   for (let i = 0; i < items.length; i++) {
//     if (items[i].kind === 'file') {
//       const file = (items[i].getAsFile());
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
// endregion

/**
 * 复制单个文件链接
 * @param {File} file - 文件对象
 */
const handleCopy = (file) => {
  const status = fileList.find(item => item.uid === file.uid).status;
  if (status !== 'done' && status !== 'success') {
    alert('文件未上传成功，无法复制链接');
    return;
  }

  let textToCopy;
  if (props.selectedUrlForm === 'url') {
    textToCopy = file.url;
  } else if (props.selectedUrlForm === 'md') {
    textToCopy = `![${file.name}](${file.url})`;
  } else if (props.selectedUrlForm === 'html') {
    textToCopy = `<img src="${file.url}" alt="${file.name}">`;
  } else {
    textToCopy = file.url;
  }

  navigator.clipboard.writeText(textToCopy);
  alert('复制成功');
};

/**
 * 复制所有文件链接
 */
const copyAll = () => {
  let urls;
  if (props.selectedUrlForm === 'url') {
    urls = fileList.filter(item => item.status === 'done' || item.status === 'success')
        .map(item => item.url).join('\n');
  } else if (props.selectedUrlForm === 'md') {
    urls = fileList.filter(item => item.status ===

        'done' || item.status === 'success')
        .map(item => `![${item.name}](${item.url})`).join('\n');
  } else if (props.selectedUrlForm === 'html') {
    urls = fileList.filter(item => item.status === 'done' || item.status === 'success')
        .map(item => `<img src="${item.url}" alt="${item.name}">`).join('\n');
  } else {
    urls = fileList.filter(item => item.status === 'done' || item.status === 'success')
        .map(item => item.url).join('\n');
  }
  navigator.clipboard.writeText(urls);
  alert('整体复制成功');
};

/**
 * 清空文件列表
 */
const clearFileList = () => {
  fileList = [];
  alert('列表已清空');
};
// endregion



</script>


<template>
  <div class="px-4 py-6"
       :class="combinedBgColor">


    <div class="max-w-7xl max-md:max-w-lg mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-1">
        <template v-for="(imgPreview, index) in imgPreviewList" :key="index">
          <div class="bg-white rounded-md overflow-hidden group">

            <div class="relative overflow-hidden group">

              <img :src="imgPreview.target.result" alt=""
                    @click="PicPreviewByClick(imgPreview.target.result, imgPreview.raw.name)"
                   class="w-full h-60 object-cover group-hover:scale-125 transition-all duration-300"/>

              <div v-if="true" class="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                <el-progress
                    :type="'circle'"
                    :percentage="imgPreview.loaded / imgPreview.total * 100"
                    :status="imgPreview.status"
                    :text-inside="true"
                    :stroke-width="4"
                    :color="imgPreview.status === 'success' ? '#67C23A' : '#F56C6C'"
                />
              </div>
              <div class="px-1 py-1 rounded-md text-white text-sm tracking-wider
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
          </div>

        </template>


        <div>
<!--          暂时废弃的粘贴上传功能-->
<!--        <div  @paste.native="handlePaste">-->
          <el-upload
              :class="{'is-uploading': uploading, 'upload-card-busy': fileList.length, 'paste-mode': uploadMethod === 'paste'}"
              drag
              multiple
              :http-request="uploadFile"
              :onSuccess="handleSuccess"
              :on-error="handleError"
              :before-upload="beforeUpload"
              :on-progress="handleProgress"
              :file-list="fileList"
              :show-file-list="false"
              accept="image/*, video/*"
              @change="handleFileChange"
              :auto-upload="false"
          >
            <el-icon class="el-icon--upload">
              <div class="i-ph-upload-light"></div>
            </el-icon>
            <div class="el-upload__text">
              <p class="text-xs text-gray-400 mt-2">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
            </div>


          </el-upload>

          <el-dialog v-model="dialogVisible">
            <template #header="{ close, titleId, titleClass }">
              <h4 :id="titleId" :class="titleClass" class="text-ellipsis">{{dialogImageName}}</h4>
            </template>
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </div>


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



.is-uploading :deep(.el-upload-dragger){
  animation: breathe 3s infinite;
}

.upload-card-busy :deep(.el-upload-dragger) {
  height: 25vh;
}
.paste-mode :deep(.el-upload) {
  pointer-events: none;
}

:deep(.el-upload-dragger)  {
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
.is-uploading :deep(.el-upload-dragger){
  animation: breathe 3s infinite;
}
.el-upload__text {
  font-weight: bold;
  font-size: medium;
  user-select: none;
}




</style>
