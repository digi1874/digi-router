import path from './path'
import to from './to'
import Location from './location'
import { push, replace } from './router'
import { getCurrentLocation } from './pages'

const router = [ path, to ]

Object.defineProperties(router, {
  push            : { value : push },
  replace         : { value : replace },
  Location        : { value : Location },
  /**
   * 当前location
   * @example
   * import router from 'digi-router'
   * console.log(router.currentLocation)
   * // => {
   * //      hash: '',
   * //      host:'localhost:8080',
   * //      hostname:'localhost:8080',
   * //      href:'http://localhost:8080/',
   * //      origin: 'http://localhost:8080',
   * //      pathname: '/',
   * //      protocol: 'http:',
   * //      search: '',
   * //      params: {},
   * //      path: '/'
   * //    }
   */
  currentLocation : { get   : () => getCurrentLocation() }
})

export default router
