const watchs = {}

export const addWatch = (pathname, fn) => {
  watchs[pathname] = watchs[pathname] || []
  watchs[pathname].indexOf(fn) === -1 && watchs[pathname].push(fn)
}

export const removeWatch = (pathname, fn) => {
  const index = watchs[pathname].indexOf(fn)
  index !== -1 && watchs[pathname].splice(index, 1)
}

export const triggerWatch = (pathname, location) => {
  watchs[pathname] && watchs[pathname].forEach(fn => fn(location))
}
