import path from './path'
import to from './to'
import Location from './location'
import { push, replace } from './router'
import { getCurrentLocation } from './pages'

const router = [ path, to ]

Object.defineProperties(router, {
  push            : { value : push },
  replace         : { value : replace },
  go              : { value : number => window.history.go(number) },
  back            : { value : () => window.history.back() },
  forward         : { value : () => window.history.forward() },
  Location        : { value : Location },
  currentLocation : { get   : () => getCurrentLocation() }
})

export default router
