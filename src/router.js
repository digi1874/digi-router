import Location from './location'
import { switchPage } from './pages'

/**
 * @name history
 * @example
 * window.history.go(-1)
 * window.history.back()
 * window.history.forward()
 */

window.addEventListener('popstate', () => switchPage(new Location(window.location.href)))


/**
 * 跳转页面
 * @function
 * @param {String|Object} location - 字符串为href；对象为{hash, host, hostname, href, origin, pathname, protocol, search}，参考window.location
 * @example
 * import router from 'digi-router'
 * router.push('/')
 * router.push({ pathname: '/' })
 */
export const push = location => {
  location = new Location(location)
  switchPage(location)
  window.history.pushState(location, '', location.href)
}

/**
 * 替换当前页面
 * @function
 * @param {String|Object} location - 字符串为href；对象为{hash, host, hostname, href, origin, pathname, protocol, search}，参考window.location
 * @example
 * import router from 'digi-router'
 * router.replace('/')
 * router.replace({ pathname: '/' })
 */
export const replace = location => {
  location = new Location(location)
  switchPage(location)
  window.history.pushState(location, '', location.href)
}

