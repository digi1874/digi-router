import { objectTag } from './objectTag'
import { push, replace } from './router'
import Location from './location'

const aElTagName = document.createElement('a').tagName

/**
 * 创建链接元素时的属性
 * @name to
 * @type {String|Object}
 * @example
 * import digi from 'digi'
 * import router from 'digi-router'
 *
 * digi.plugins([ ...router ])
 *
 * digi([
 *   { to: '/' },  // 跳转
 *   { to: { pathname: '/', replace: true } }  // 替换
 * ])
 */

/**
 * 处理链接
 * @private
 * @param {Object}        element - 元素
 * @param {String|Object} value   - 字符串为href；对象为{hash, host, hostname, href, origin, pathname, protocol, search, replace}，参考window.location
 */
const handler = (element, value) => {
  if (element.tagName === aElTagName) {
    element.href = (new Location(value)).href
  }

  const tag = toString.call(value)

  element.addEventListener('click', e => {
    e.preventDefault()

    if (tag === objectTag && value.replace) {
      replace(value)
    } else {
      push(value)
    }
  })
}

const to = {}
Object.defineProperties(to, {
  property : { value : 'to' },
  handler  : { value : handler }
})

export default to
