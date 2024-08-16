import request from "~/api/requests.js";

export function uploader(formData, file, cookies) {
  return request({
    url: `/api/upload`,
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded / progressEvent.total) * 100);
      file.onProgress({ percent: percentCompleted, file: file.file });
    }
  });
}

export function addAPKInfo(data) {
  return request({
    url: `apkManage`,
    method: "post",
    data
  });
}

export function uploadApk(file,projectId) {
  let formData = new FormData()
  formData.append('apkFile', file)
  return request({
    url: `apkManage/upload/${projectId}`,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: "post",
    data: formData
  });
}
