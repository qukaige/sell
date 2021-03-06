export function formatDate(date, fmt) { // fmt = yyyy-MM-dd hh:mm
  if (/(y+)/.test(fmt)) {
    // $1 会取出 匹配到的 字符串,y+ 会匹配到 yyyy  $1=yyyy
    fmt = fmt.replace(RegExp.$1, date.getFullYear());
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : addZero(str))
    }
  }
  return fmt
}
// 不足两位补0
function addZero(str) {
  return ("00" + str).substr(str.length)
}
