export function getId() {
  let params = window.location.search
  let reg = /[&?][^?&]+=[^?&]+/g
  let arr = params.match(reg)
  let obj = {}
  arr.forEach((item) => {
    let newArr = item.substr(1).split('=')
    let key = decodeURIComponent(newArr[0])
    let val = decodeURIComponent(newArr[1])
    obj[key] = val
  })
  return obj
}
