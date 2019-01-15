import { objectTag } from './objectTag'
import { push, replace } from './router'

const handler = (element, value) => {
  const tag = toString.call(value)

  element.addEventListener('click', e => {
    e.preventDefault()

    if (tag === objectTag && value.replace) {
      replace(value)
    } else {
      push(value)
    }
  })
}

const to = {}
Object.defineProperties(to, {
  property : { value : 'to' },
  handler  : { value : handler }
})

export default to
