import Location from './location'
import { switchPage } from './pages'

window.addEventListener('popstate', () => switchPage(new Location(window.location.href)))

export const push = location => {
  location = new Location(location)
  switchPage(location)
  window.history.pushState(location, '', location.href)
}

export const replace = location => {
  location = new Location(location)
  switchPage(location)
  window.history.pushState(location, '', location.href)
}

