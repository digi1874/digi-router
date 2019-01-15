const watchs = {}

/**
 * 添加监听路由
 * @private
 * @param {String} pathname - location.pathname
 * @param {Function} fn - 回调函数
 */
export const addWatch = (pathname, fn) => {
  watchs[pathname] = watchs[pathname] || []
  watchs[pathname].indexOf(fn) === -1 && watchs[pathname].push(fn)
}

/**
 * 删除监听路由
 * @private
 * @param {String} pathname - location.pathname
 * @param {Function} fn - 回调函数
 */
export const removeWatch = (pathname, fn) => {
  const index = watchs[pathname].indexOf(fn)
  index !== -1 && watchs[pathname].splice(index, 1)
}

/**
 * 触发监听
 * @private
 * @param {String} pathname - location.pathname
 * @param {Object} location - location
 */
export const triggerWatch = (pathname, location) => {
  watchs[pathname] && watchs[pathname].forEach(fn => fn(location))
}
