import request from "~/api/requests.js";

export function uploader(formData, uploadFile, cookies, onProgress) {
  return request({
    url: `/api/upload?authCode=unset`,
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded / progressEvent.total) * 100);
      onProgress({ percent: percentCompleted, uid: uploadFile.uid });
    }
  })
      .catch(error => {
        // 处理错误，手动触发 onProgress
        if (error.response && error.response.status === 500) {
          onProgress({ percent: 100, uid: uploadFile.uid, error: true });
        }
        // 如果有需要，还可以在这里处理其他错误
        throw error; // 重新抛出错误以便在调用方处理
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
