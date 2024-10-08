/**
 * 加载外部资源
 * @param url {string} 资源地址
 * @param type {'css' | 'js'} 资源类型
 * @returns {Promise<unknown>}
 */
function loadExternalResource(url, type) {
  return new Promise((resolve, reject) => {
    let tag

    if (type === 'css') {
      tag = document.createElement('link')
      tag.rel = 'stylesheet'
      tag.href = url
    } else if (type === 'js') {
      tag = document.createElement('script')
      tag.src = url
    }
    if (tag) {
      tag.onload = () => resolve(url)
      tag.onerror = () => reject(url)
      document.head.appendChild(tag)
    }
  })
}


export { loadExternalResource }
