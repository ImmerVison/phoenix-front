<script setup>
// import cookies from 'vue-cookies'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import {uploader} from '~/api/app/uploader.js'

const props = defineProps({
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

const fileList = ref([]);

const uploading = ref(false);

const maxUploading = ref(10);
const waitingList = ref([]);


const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)


const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}


const uploadSuccessCount = computed(() => {
  return fileList.value.filter(item => item.status === 'done' || item.status === 'success').length;
});

const uploadErrorCount = computed(() => {
  return fileList.value.filter(item => item.status === 'exception').length;
});

const uploadingCount = computed(() => {
  return fileList.value.filter(item => item.status === 'uploading').length;
});

const waitingCount = computed(() => {
  return waitingList.value.length;
});

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

const handleRemove = (file) => {
  fileList.value = fileList.value.filter(item => item.uid !== file.uid);
  alert(file.name + '已删除');
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

const handleProgress = (event) => {
  const target = fileList.value.find(item => item.uid === event.file.uid);
  if (target) {
    target.progreess = event.percent;
  }
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


</script>

<template>
  <div class="upload-form" @paste.native="handlePaste">
    <el-upload
        class="upload-card"
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
    >
      <el-icon class="el-icon--upload">
        <CameraFilled v-if="uploadMethod === 'drag'" color="blanchedalmond"/>
        <CopyDocument v-else color="blanchedalmond"/>
      </el-icon>
      <div class="el-upload__text" v-if="uploadMethod === 'drag'">拖拽 或 <em>点击上传</em></div>
      <div class="el-upload__text" v-else>复制 <em>粘贴</em> 上传</div>
      <template #tip>
        <div class="el-upload__tip">支持多文件上传，支持图片和视频，文件大小不超过5MB</div>
      </template>
    </el-upload>
    <el-card class="upload-list-card" :class="{'upload-list-busy': fileList.length}">
      <div class="upload-list-container" :class="{'upload-list-busy': fileList.length}">
        <el-scrollbar>
          <div class="upload-list-dashboard">
            <el-text class="upload-list-dashboard-title">
              <el-icon><List /></el-icon>{{ uploadingCount + waitingCount }}
              <el-icon><Checked /></el-icon>{{ uploadSuccessCount }}
              <el-icon><Failed /></el-icon>{{ uploadErrorCount }}
            </el-text>
            <div class="upload-list-dashboard-action">
              <el-button-group>
                <el-tooltip content="整体复制" placement="top">
                  <el-button type="primary" round @click="copyAll" alt="整体复制"><el-icon><Grid /></el-icon></el-button>
                </el-tooltip>
                <el-tooltip content="清空列表" placement="top">
                  <el-button type="primary" round @click="clearFileList"><el-icon><CircleClose /></el-icon></el-button>
                </el-tooltip>
              </el-button-group>
            </div>
          </div>
          <div class="upload-list-item" v-for="file in fileList" :key="file.name" :span="8">
            <img
                style="width: 10vw; border-radius: 12px;"
                :src="file.url"
                @error="file.url = 'https://imgbed.sanyue.site/file/b6a4a65b4edba4377492e.png'"
            >
            </img>
            <div class="upload-list-item-content">
              <el-text class="upload-list-item-name" truncated>{{ file.name }}</el-text>
              <div class="upload-list-item-url" v-if="file.status==='done'">
                <el-link :underline="false" :href="file.url" target="_blank">
                  <el-text class="upload-list-item-url-text" truncated>{{ file.url }}</el-text>
                </el-link>
              </div>
              <div class="upload-list-item-progress" v-else>
                <el-progress :percentage="file.progreess" :status="file.status" :show-text="false"/>
              </div>
            </div>
            <div class="upload-list-item-action">
              <el-button type="primary" circle class="upload-list-item-action-button" @click="handleCopy(file)">
                <el-icon><Link /></el-icon>
              </el-button>
              <el-button type="danger" circle class="upload-list-item-action-button" @click="handleRemove(file)">
                <el-icon><Delete /></el-icon>
              </el-button>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </el-card>

  </div>
</template>


<style scoped>


</style>
