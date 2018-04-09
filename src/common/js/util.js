function getRandomInt(min, max) {
// 返回一个最大值和最小值之间的随机数
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
// 洗牌函数 打乱一个数组
// 多地方调用 避免对原有数组的修改
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function debounce(func, delay) {
  let timer

  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}