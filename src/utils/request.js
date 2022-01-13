import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'

import store from '@/store'
import { getToken } from '@/utils/auth'

const pendingMap = new Map()

const LoadingInstance = {
  _target: null,
  _count: 0
}

/**
 * axios配置参数
 * @param {object} axiosConfig axios请求参数
 * @param {object} customOptions 自定义参数
 * @param {object} loadingOptions loading自定义参数
 * @returns object
 * @example
 *request({
    url: '/mock/permission.json',
    method: 'get',
    data: {}
    },{
      loading:true
    },{
      text: '获取列表数据....',
      background: 'rgba(255,255,255,0.1)'
    }
  )
 *
 *
 */
function request(axiosConfig, customOptions, loadingOptions) {
  const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_API, // 设置统一的请求前缀
    timeout: 10000 // 设置统一的超时时长
  })
  // 自定义配置
  let custom_options = Object.assign(
    {
      repeat_request_cancel: true, // 是否开启取消重复请求, 默认为 true
      loading: false, // 是否开启loading层效果, 默认为false
      reduct_data_format: true, // 是否开启简洁的数据结构响应, 默认为true
      error_message_show: true, // 是否开启接口错误信息展示,默认为true
      code_message_show: true // 是否开启code不为0时的信息提示, 默认为false
    },
    customOptions
  )
  // 自定义loading配置
  const loadingOpts = Object.assign({
    background: 'rgba(255,255,255,0.1)',
    loadingOptions
  })

  // 请求拦截
  service.interceptors.request.use(
    (config) => {
      removePending(config)
      custom_options.repeat_request_cancel && addPending(config)
      // 创建loading实例
      if (custom_options.loading) {
        LoadingInstance._count++
        if (LoadingInstance._count === 1) {
          LoadingInstance._target = ElLoading.service(loadingOpts)
        }
      }
      // 自动携带token
      if (getToken()) {
        config.headers.Authorization = getToken()
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // 响应拦截(根据项目需求自行配置)
  service.interceptors.response.use(
    (response) => {
      const data = response.data
      removePending(response.config)
      custom_options.loading && closeLoading(custom_options) // 关闭loading

      //处理错误信息
      if (custom_options.code_message_show && data && !data.isSuccess) {
        ElMessage({
          type: 'error',
          message: data.msg
        })
        return Promise.reject(response.data)
      }
      return response.data
    },
    (error) => {
      error.config && removePending(error.config)
      custom_options.loading && closeLoading(custom_options) // 关闭loading
      custom_options.error_message_show && httpErrorStatusHandle(error) // 处理错误状态码
      return Promise.reject(error) // 错误继续返回给到具体页面
    }
  )

  return service(axiosConfig)
}

export default request

/**
 * 处理异常
 * @param {*} error
 */
function httpErrorStatusHandle(error) {
  // 处理被取消的请求
  if (axios.isCancel(error))
    return console.error('请求的重复请求：' + error.message)
  let message = ''
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        message = '接口重定向了！'
        break
      case 400:
        message = '参数不正确！'
        break
      case 401:
        message = '您未登录，或者登录已经超时，请先登录！'
        store.dispatch('user/userRemove').then(() => {
          location.reload()
        })

        break
      case 403:
        message = '您没有权限操作！'
        break
      case 404:
        message = `请求地址出错: ${error.response.config.url}`
        break // 在正确域名下
      case 408:
        message = '请求超时！'
        break
      case 409:
        message = '系统已存在相同数据！'
        break
      case 500:
        message = '服务器内部错误！'
        break
      case 501:
        message = '服务未实现！'
        break
      case 502:
        message = '网关错误！'
        break
      case 503:
        message = '服务不可用！'
        break
      case 504:
        message = '服务暂时无法访问，请稍后再试！'
        break
      case 505:
        message = 'HTTP版本不受支持！'
        break
      default:
        message = '异常问题，请联系管理员！'
        break
    }
  }
  if (error.message.includes('timeout')) message = '网络请求超时！'
  if (error.message.includes('Network'))
    message = window.navigator.onLine ? '服务端异常！' : '您断网了！'

  ElMessage({
    type: 'error',
    message
  })
}

/**
 * 关闭Loading层实例
 * @param {*} _options
 */
function closeLoading(_options) {
  if (_options.loading && LoadingInstance._count > 0) LoadingInstance._count--
  if (LoadingInstance._count === 0) {
    LoadingInstance._target.close()
    LoadingInstance._target = null
  }
}

/**
 * 储存每个请求的唯一cancel回调, 以此为标识
 * @param {*} config
 */
function addPending(config) {
  const pendingKey = getPendingKey(config)
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel)
      }
    })
}

/**
 * 删除重复的请求
 * @param {*} config
 */
function removePending(config) {
  const pendingKey = getPendingKey(config)
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey)
    // cancelToken()这里传递的pendingKey可以给到上面异常处理传递一个提示信息，查看控制台能打印取消的接口情况。
    // if(axios.isCancel(error)) return console.error('请求的重复请求：' + error.message);
    cancelToken(pendingKey)
    pendingMap.delete(pendingKey)
  }
}

/**
 * 生成唯一的每个请求的唯一key
 * @param {*} config
 * @returns
 */
function getPendingKey(config) {
  let { url, method, params, data } = config
  if (typeof data === 'string') data = JSON.parse(data) // response里面返回的config.data是个字符串对象
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}
