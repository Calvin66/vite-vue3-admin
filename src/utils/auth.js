/*
 * @Author: Calvin
 * @Date: 2021-12-09 09:15:38
 * @FilePath: \src\utils\auth.js
 * @Description:
 */
const tokenKey = 'token'
const storageKey = 'vite-vue3-admin'

export const localstorageSet = (name, content) => {
  name = `${storageKey}-${name}`
  if (!name) return
  const isObject = Object.prototype.toString.call(content) === '[object Object]'
  const isArry = Object.prototype.toString.call(content) === '[object Array]'
  if (isObject || isArry) {
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
/**
 * @description 转换localStorage取值类型
 * @param {*} name
 * @param {*} type
 * @returns
 */
export function localstorageTypeGet(name, type) {
  name = `${storageKey}-${name}`
  if (!name) return
  let data = window.localStorage.getItem(name)
  if (type === 'number') {
    return Number(data)
  }
  if (type === 'boolen') {
    if (data === 'false') {
      data = false
    } else {
      data = true
    }
    return data
  }
  if (type === 'object') {
    data = JSON.parse(data)
    return data
  }
  return data
}
