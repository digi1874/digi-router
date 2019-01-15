export const pick = (object, paths) => {
  const newObj = {}

  for (const path of paths) {
    newObj[path] = object[path]
  }

  return newObj
}
