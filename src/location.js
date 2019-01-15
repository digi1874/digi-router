import { arrayTag, stringTag, objectTag } from './objectTag'

const aElement = document.createElement('a')
const paramRE  = /([^&=?]+)=([^&=]+)/g
const props    = ['hash', 'host', 'hostname', 'href', 'origin', 'pathname', 'protocol', 'search']

/**
 * 创建location对象，类似window.location
 * @class
 * @name Location
 * @param   {String|Object} location - 字符串为href；对象为{hash, host, hostname, href, origin, pathname, protocol, search}，参考window.location
 * @returns {Object}                 - 返回对象{hash, host, hostname, href, origin, pathname, protocol, search, params, path}
 * @example
 * import router from 'digi-router'
 * let loc = new router.Location('http://localhost:8080/pathname?t=1&array=1&array=2#hash')
 * console.log(loc)
 * // => {
 * //      hash: '#hash',
 * //      host:'localhost:8080',
 * //      hostname:'localhost:8080',
 * //      href:'http://localhost:8080/pathname?t=1&array=1&array=2#hash',
 * //      origin: 'http://localhost:8080',
 * //      pathname: '/pathname',
 * //      protocol: 'http:',
 * //      search: '?t=1&array=1&array=2',
 * //      params: { t:'1', array: ['1', '2'] },
 * //      path: '/pathname?t=1&array=1&array=2#hash'
 * //    }
 *
 * loc = new router.Location({ pathname: '/a', search: '?t=1' })
 * console.log(loc)
 * // => {
 * //      hash: '',
 * //      host:'localhost:8080',
 * //      hostname:'localhost:8080',
 * //      href:'http://localhost:8080/a?t=1',
 * //      origin: 'http://localhost:8080',
 * //      pathname: '/a',
 * //      protocol: 'http:',
 * //      search: '?t=1',
 * //      params: { t:'1' },
 * //      path: '/a?t=1'
 * //    }
 */
export default class Location {
  constructor (location) {
    const tag = toString.call(location)

    if (tag === stringTag) {
      aElement.href = location
    } else if (tag === objectTag) {
      location = { ...location }
      aElement.href = location.href || document.location.href
      delete location.href

      // 参数
      if (location.params) {
        if (location.search) {
          location.search += '&'
        } else {
          location.search = '?'
        }
        Object.keys(location.params).forEach(key => {
          location.search += `${key}=${location.params[key]}&`
        })
        location.search.replace(/[&]$/, '')
      }

      // 设置值
      Object.keys(location).forEach(key => {
        aElement[key] = location[key]
      })
    } else {
      throw new TypeError(location)
    }

    // 去掉最后'/'
    aElement.pathname = aElement.pathname.replace(/\/$/, '')

    // 赋值
    props.forEach(key => {
      this[key] = aElement[key]
    })

    // 提取参数
    const params = {}
    let param = paramRE.exec(aElement.search)
    while (param !== null) {
      const key   = param[1]
      const value = param[2]
      let item    = params[key]

      if (item) {
        if (toString.call(item) !== arrayTag) {
          item = [item]
        }
        item.push(value)
      } else {
        item = value
      }

      params[key] = item
      param       = paramRE.exec(aElement.search)
    }

    this.params = params
    this.path   = aElement.pathname + aElement.search + aElement.hash
  }
}
