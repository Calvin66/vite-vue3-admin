const tokenKey = 'token'
const storageKey = 'vite-vue3-admin'

export const localstorageSet = (name, content) => {
  name = `${storageKey}-${name}`
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}
/**
 * 本地缓存
 * @param {*} name 缓存名称
 * @param {String || Object} content 缓存内容
 * 注意：缓存内容为string可以正常使用，object或者引用数据类型类型的时候需要JSON.parse
 * @returns
 */
export const localstorageGet = (name) => {
  name = `${storageKey}-${name}`
  if (!name) return
  return window.localStorage.getItem(name)
}

export const localstorageRemove = (name) => {
  name = `${storageKey}-${name}`
  if (!name) return
  return window.localStorage.removeItem(name)
}

export function getToken() {
  return localstorageGet(tokenKey)
}

export function setToken(token) {
  return localstorageSet(tokenKey, token)
}

export function removeToken() {
  return localstorageRemove(tokenKey)
}
