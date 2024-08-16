<script setup>
// import cookies from 'vue-cookies'

import {uploader} from '~/api/app/uploader.js'
import {FileListLike} from "~/types/FileLike.js";

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


const fileList = ref([]);

const uploading = ref(false);

const maxUploading = ref(10);

const waitingList = ref([]);


const uploadingCount = computed(() => {
  return fileList.value.filter(item => item.status === 'uploading').length;
});

const waitingCount = computed(() => {
  return waitingList.value.length;
});


const uploadSuccessCount = computed(() => {
  return fileList.value.filter(item => item.status === 'done' || item.status === 'success').length;
});

const uploadErrorCount = computed(() => {
  return fileList.value.filter(item => item.status === 'exception').length;
});
// endregion


// region 上传方法
const uploadFile = (file) => {
  if (uploadingCount.value > maxUploading.value) {
    waitingList.value.push(file);
    fileList.value.find(item => item.uid === file.file.uid).status = 'waiting';
    return;
  } else {
    fileList.value.find(item => item.uid === file.file.uid).status = 'uploading';
  }

  const formData = new FormData();
  formData.append('file', file.file);

  uploader(formData, file, null)
      .then(res => {
        file.onSuccess(res, file.file);
      }).catch(err => {
    if (err.response && err.response.status === 401) {
      waitingList.value = [];
      fileList.value = [];
      alert('认证状态错误！'); // 使用 alert 代替 this.$message
      window.location.href = '/login'; // 使用 window.location.href 代替 this.$router.push
    } else {
      file.onError(err, file.file);
    }
  }).finally(() => {
    if (uploadingCount.value + waitingCount.value === 0) {
      uploading.value = false;
    }
  });
};

const beforeUpload = (file) => {
  const isLt10M = Math.ceil(file.size / 1024 / 1024) < 10;
  if (!isLt10M) {
    alert('上传文件大小不能超过 10MB!');
    return false;
  } else {
    uploading.value = true;
    const fileUrl = URL.createObjectURL(file);
    fileList.value.push({
      uid: file.uid,
      name: file.name,
      url: fileUrl,
      status: 'uploading',
      progress: 0
    });
    return true;
  }
};
// endregion



// region 上传结果Hook

const handleProgress = (event) => {
  const target = fileList.value.find(item => item.uid === event.file.uid);
  if (target) {
    target.progreess = event.percent;
  }
};
const handleSuccess = (response, file) => {
  try {
    const rootUrl = `${window.location.protocol}//${window.location.host}`;
    const target = fileList.value.find(item => item.uid === file.uid);
    target.url = rootUrl + response.data[0].src;
    target.progreess = 100;
    target.status = 'success';
    alert(file.name + '上传成功');

    setTimeout(() => {
      target.status = 'done';
    }, 3000);
  } catch (error) {
    alert(file.name + '上传失败');
    fileList.value.find(item => item.uid === file.uid).status = 'exception';
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

const handleError = (err, file) => {
  alert(file.name + '上传失败');
  fileList.value.find(item => item.uid === file.uid).status = 'exception';

  if (waitingList.value.length) {
    const nextFile = waitingList.value.shift();
    uploadFile(nextFile);
  }

  if (uploadingCount.value + waitingCount.value === 0) {
    uploading.value = false;
  }
};

const handleRemove = (file) => {
  fileList.value = fileList.value.filter(item => item.uid !== file.uid);
  alert(file.name + '已删除');
};
// endregion


// region 功能性方法: 粘贴上传 & 复制链接 & 整体复制  & 清空列表
const handlePaste = (event) => {
  if (props.uploadMethod !== 'paste') {
    return;
  }

  const items = event.clipboardData.items;
  for (let i = 0; i < items.length; i++) {
    if (items[i].kind === 'file') {
      const file = items[i].getAsFile();
      if (file.type.includes('image') || file.type.includes('video')) {
        file.uid = Date.now() + i;
        file.file = file;
        if (beforeUpload(file)) {
          uploadFile({
            file: file,
            onProgress: handleProgress,
            onSuccess: handleSuccess,
            onError: handleError
          });
        }
      } else {
        alert('粘贴板中的文件不是图片或视频');
      }
    }
  }
};

const handleCopy = (file) => {
  const status = fileList.value.find(item => item.uid === file.uid).status;
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

const copyAll = () => {
  let urls;
  if (props.selectedUrlForm === 'url') {
    urls = fileList.value.filter(item => item.status === 'done' || item.status === 'success')
        .map(item => item.url).join('\n');
  } else if (props.selectedUrlForm === 'md') {
    urls = fileList.value.filter(item => item.status === 'done' || item.status === 'success')
        .map(item => `![${item.name}](${item.url})`).join('\n');
  } else if (props.selectedUrlForm === 'html') {
    urls = fileList.value.filter(item => item.status === 'done' || item.status === 'success')
        .map(item => `<img src="${item.url}" alt="${item.name}">`).join('\n');
  } else {
    urls = fileList.value.filter(item => item.status === 'done' || item.status === 'success')
        .map(item => item.url).join('\n');
  }
  navigator.clipboard.writeText(urls);
  alert('整体复制成功');
};

const clearFileList = () => {
  fileList.value = [];
  alert('列表已清空');
};
// endregion



// region 图片预览
const imgPreviewList = ref([])
let changeTimer = null; // 用于控制事件合并的计时器
let pendingFiles = []; // 用于存储待处理的文件列表

const handleFileChange = (file, rawFileList) => {
  // 将文件暂存到 pendingFiles 中
  pendingFiles.push(file);

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

const processFiles = (files) => {
  // 可以调用之前的 uploadImg 方法进行处理
  const filesArray = files.map(f => f.raw || f);
  const filesLikeList = new FileListLike(filesArray);
  fileReader(filesLikeList, 0);
};


const fileReader = (files, index) => {
  let reader = new FileReader()
  reader.readAsDataURL(files[index])
  reader.onload = (e) => {

    imgPreviewList.value.push(Object.assign(e, {
      raw: files[index]
    }))
    if (++index < files.length) fileReader(files, index)
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

const handleDownload = (file) => {
  //todo
}

// endregion

// region 提交上传 todo
// const submitUpload = () => {
//   alert('提交上传');
//   imgPreviewList.value.forEach(imgPreview => {
//     const file = imgPreview.raw
//     if (beforeUpload(file)) {
//       console.log(`准备上传文件: ${file.name}`);
//       uploadFile(fileList.value.find(item => item.uid === file.uid));
//     }
//   })
// };
// endregion
</script>

<template>

<div class="min-w-md bg-white rd-md">
  <div class="px-4 py-6 "
       :class="combinedBgColor">


    <div class="max-w-7xl max-md:max-w-lg mx-auto">
      <div class="flex">

        <!--        <template v-for="(imgPreview, index) in imgPreviewList" :key="index">-->
        <!--          <div class="bg-white rounded-md overflow-hidden group">-->
        <!--            <div class="relative overflow-hidden group">-->
        <!--              <img :src="imgPreview.target.result" alt=""-->
        <!--                    @click="PicPreviewByClick(imgPreview.target.result, imgPreview.raw.name)"-->
        <!--                   class="w-full h-60 object-cover group-hover:scale-125 transition-all duration-300"/>-->
        <!--              <div class="px-1 py-1 rounded-md text-white text-sm tracking-wider-->
        <!--                      absolute top-0 right-0-->
        <!--                      cursor-pointer bg-[#645B5B]-->
        <!--                      hover:text-md hover:bg-opacity-60-->
        <!--                      opacity-0 group-hover:opacity-100-->
        <!--                      transition-opacity duration-300-->
        <!--                      focus-within:opacity-100"-->
        <!--                   @click="deleteImg(index)">-->
        <!--                <div class="i-material-symbols-delete-sweep-outline-rounded "/>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </div>-->

        <!--        </template>-->


        <div class="w-full"  @paste.native="handlePaste">
          <el-upload
              :class="{'is-uploading': uploading, 'upload-card-busy': fileList.length, 'paste-mode': uploadMethod === 'paste'}"
              drag
              multiple
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
  <div class="m-2 p-2 rd-md">
    <el-card class="" :class="{'upload-list-busy': fileList.length}">
      <div class="h-[200px]" :class="{'upload-list-busy': fileList.length}">
        <el-scrollbar>
          <div class="p-2 bg-slate- flex justify-between items-center">
            <div class=" flex space-x-sm">
              <div class="">
                <span>上传中: {{ uploadingCount }}/{{ maxUploading }}</span>
              </div>
              <div class="">
                <span>上传成功: {{ uploadSuccessCount }}</span>
              </div>
              <div class="">
                <span>上传失败: {{ uploadErrorCount }}</span>
              </div>
            </div>
            <div>
              <el-button-group>

                <el-tooltip content="整体复制" placement="top">
                  <el-button type="primary" round @click="copyAll" alt="整体复制">
                    <el-icon><div class="i-carbon:copy w-16px h-16px" style="color: white;"></div></el-icon>
                  </el-button>
                </el-tooltip>
                <el-tooltip content="清空列表" placement="top">
                  <el-button type="primary" round @click="clearFileList">

                    <el-icon><div class="i-carbon:row-delete w-16px h-16px" style="color: white;"></div></el-icon>
                  </el-button>
                </el-tooltip>
              </el-button-group>
            </div>
          </div>



          <div class="flex justify-between items-center p-[5px] b-1 "
               v-for="file in imgPreviewList" :key="file.name" :span="8">
            <img

                class="object-cover shadow-lg"
                style="width: 10vw; height: 160px;  border-radius: 12px;"
                :src="file.target.result"
                @error="file.url = 'https://imgbed.sanyue.site/file/b6a4a65b4edba4377492e.png'"
            />
            <div class="">
              <el-text class="truncated text-white">{{ file.raw.uid }}</el-text>
              <div class="upload-list-item-url" v-if="file.status==='done'">
                <el-link :underline="false" :href="file.url" target="_blank">
                  <el-text class="upload-list-item-url-text" truncated>{{ file.raw.uid }}</el-text>
                </el-link>
              </div>
              <div class="upload-list-item-progress" v-else>
                <el-progress type="circle" :percentage="50" :status="file.status" :show-text="false"/>
              </div>
            </div>
            <div class="">
              <el-button type="primary" circle class="" @click="handleCopy(file)">
                <el-icon><div class="i-carbon:link w-16px h-16px" style="color: white;"></div></el-icon>
              </el-button>
              <el-button type="danger" circle class="" @click="handleRemove(file)">
                <el-icon ><div class="i-carbon:row-delete w-16px h-16px" style="color: white;"></div></el-icon>
              </el-button>
            </div>
          </div>


        </el-scrollbar>
      </div>
    </el-card>

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


.center{
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

.el-upload__text {
  font-weight: bold;
  font-size: medium;
  user-select: none;
}



</style>
