import path from './path'
import to from './to'
import Location from './location'
import { push, replace } from './router'

const router = [ path, to ]

Object.defineProperties(router, {
  push    : { value : push },
  replace : { value : replace },
  go      : { value : window.history.go },
  back    : { value : window.history.back },
  forward : { value : window.history.forward },
  Location: { value : Location }
})

export default router
