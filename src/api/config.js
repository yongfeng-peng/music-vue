// url中传递的参数，公共参数属性
export const commonParams = {
  g_tk: 5381,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}

// 前端和都断约定的回调的callback的名称
export const options = {
  param: 'jsonpCallback'
}

// 返回参数code为0的语义化
export const ERR_OK = 0