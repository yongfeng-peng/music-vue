import originJsonp from 'jsonp'

export default function jsonp(url, data, option) {
  // jsonp第三方插件 使用
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export function param(data) {
  // data拼接到url
  let url = ''
  for (var key in data) {
    let value = data[key] !== undefined ? data[key] : ''
    // url += '&' + k + '=' + encodeURIComponent(value)
    // ES6的拼接
    // encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
    url += `&${key}=${encodeURIComponent(value)}`
  }
  // 讲&符号截取下来
  return url ? url.substring(1) : ''
}
