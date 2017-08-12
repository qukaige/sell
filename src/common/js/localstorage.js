export function setLocalStorage(id, key, val) {
  let seller = localStorage.__seller_;
  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = val
  window.localStorage.__seller_ = JSON.stringify(seller)
}

export function getLocalStorage(id, key, def) {
  let seller = localStorage.__seller_;
  if (!seller) {
    return def
  }
  seller = JSON.parse(seller)
  if (!seller[id]) {
    return def
  }
  let ret = seller[id][key]
  return ret | def
}
