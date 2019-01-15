import Location from './location'
import { triggerWatch } from './watch'

const pages = {}
const paramRE = /\u003a[^\u002f]+/g
let currentLocation = new Location(window.location.href)

// 隐藏页面
const hidePage = page => {
  const elements = page.el
  elements.forEach((element, index) => {
    if (element.style.display !== 'none') {
      page.showElDisplay[index] = element.style.display
      element.style.display = 'none'
    }
  })
}

// 显示页面
const showPage = page => {
  const elements = page.el
  elements.forEach((element, index) => {
    if (element.style.display === 'none') {
      element.style.display = page.showElDisplay[index]
    }
  })
}

/**
 * 添加页面
 * @private
 * @param {String} pathname - location.pathnam
 * @param {Object} element  - 元素
 */
export const addPage = (pathname, element) => {
  let item = pages[pathname]

  if (!item) {
    item = { el: [], showElDisplay: [] }
    item.RE = new RegExp('^' + pathname.replace(paramRE, '([^\u002f]+)') + '$')
    item.execArray = item.RE.exec(pathname)
    if (item.execArray && item.execArray.length > 1) {
      item.paramKeys = []
      item.execArray.forEach(val => item.paramKeys.push(val.replace(/^:/, '')))
    }
    pages[pathname] = item
  }

  if (item.el.indexOf(element) === -1) {
    item.el.push(element)
    item.showElDisplay.push(element.style.display)
  }

  switchPage(currentLocation)
}

/**
 * 删除页面
 * @private
 * @param {String} pathname - location.pathnam
 * @param {Object} element  - 元素
 */
export const removePage = (pathname, element) => {
  const elements = pages[pathname].el
  const index = elements.indexOf(element)
  if (index !== -1) {
    elements.splice(index, 1)
    pages[pathname].showElDisplay.splice(index, 1)
  }
}

/**
 * 切换页面
 * @private
 * @param {Object} location - location对象
 */
export const switchPage = location => {
  currentLocation = location
  let matched = false
  Object.keys(pages).forEach(pathname => {
    const page = pages[pathname];
    const paramValues = page.RE.exec(location.pathname)
    if (paramValues && !matched) {
      for (let i = 1; i < paramValues.length; i ++) {
        location.params[page.paramKeys[i]] = paramValues[i]
      }
      triggerWatch(pathname, location)
      showPage(page)
      matched = true
    } else {
      hidePage(page)
    }
  })
}

/**
 * 获取当前location
 * @private
 * @returns {Object} - 返回当前location
 */
export const getCurrentLocation = () => currentLocation
