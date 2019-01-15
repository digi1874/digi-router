import { regExpTag, objectTag } from './objectTag'
import { addPage, removePage } from './pages'
import { addWatch, removeWatch } from './watch'

/**
 * 创建链接元素时的属性
 * @name path
 * @type {String|Object}
 * @example
 * import digi from 'digi'
 * import router from 'digi-router'
 *
 * digi.plugins([ ...router ])
 *
 * digi([
 *   { to: '/',     text: '首页' },
 *   { to: '/list', text: '列表页' },
 *   {
 *     path: '/',
 *     child: { text: '首页内容' }
 *   },
 *   {
 *     path: '/list'
 *     child: [
 *       { to: '/list/1', text: '详情页1' },
 *       { to: '/list/2', text: '详情页2' }
 *     ]
 *   },
 *   {
 *     path: { pathname: '/list/:id', watch: ({ params }) => console.log(params) // => { id: 1 } },
 *     text: '详情页内容'
 *   },
 *   {
 *     path: /.+/,
 *     text: '404页面放在最后'
 *   }
 * ])
 */

/**
 * 处理路由页面
 * @private
 * @param {Object}        element - 元素
 * @param {String|Object} value   - URL中路径部分:String|Object.pathname; Object.watch = location => {}
 */
const handler = (element, value) => {
  let watch
  let pathname = value
  if (objectTag === toString.call(value)) {
    pathname = value.pathname
    watch = value.watch
  }
  if (toString.call(pathname) === regExpTag) {
    pathname = pathname.source.replace(/(^\^)|(\$$)/g, '').replace(/\\([^\\])/g, '$1')
  }
  watch && addWatch(pathname, watch)
  addPage(pathname, element)

  const oldRemove = element.remove
  element.remove = () => {
    watch && removeWatch(pathname, watch)
    removePage(pathname, element)
    oldRemove.call(element)
  }
}

const path = {}
Object.defineProperties(path, {
  property : { value : 'path' },
  handler  : { value : handler }
})

export default path
