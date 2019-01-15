import { regExpTag, objectTag } from './objectTag'
import { addPage, removePage } from './pages'
import { addWatch, removeWatch } from './watch'

/**
 * 处理路由页面
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
