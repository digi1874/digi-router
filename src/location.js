import { arrayTag, stringTag, objectTag } from './objectTag'

const aElement = document.createElement('a')
const paramRE  = /([^&=?]+)=([^&=]+)/g
const props    = ['hash', 'host', 'hostname', 'href', 'origin', 'pathname', 'protocol', 'search']

export default class Location {
  constructor (location) {
    const tag = toString.call(location)
    if (tag === stringTag) {
      aElement.href = location
    } else if (tag === objectTag) {
      aElement.href = location.href || document.location.href
      Object.keys(location).forEach(key => {
        aElement[key] = location[key]
      })
    } else {
      throw new TypeError(location)
    }

    aElement.pathname = aElement.pathname.replace(/\/$/, '')

    props.forEach(key => {
      this[key] = aElement[key]
    })

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
