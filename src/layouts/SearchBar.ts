import { Point2D, Transform } from '../core/Vector'
import jss from 'jss'
import preset from 'jss-preset-default'

jss.setup(preset())

const sheet = jss.createStyleSheet({
  searchBar: {
    position: 'absolute',
    transformOrigin: '0 0',
    opacity: '0',
    transition: 'opacity 300ms ease-in-out',
    '&.open': {
      opacity: '1'
    }
  },
  searchInput: {
    color: 'black',
    fontSize: '-webkit-xxx-large',
    textAlign: 'center',
    '&:focus': {
      outline: 'none'
    }
  }
})

// TODO SearBarList
export class SearchBar {
  el: HTMLDivElement
  input: HTMLInputElement
  constructor() {
    this.el = document.createElement('div')
    this.el.classList.add(sheet.classes.searchBar)
    this.input = document.createElement('input')
    this.input.placeholder = 'Search...'
    this.input.spellcheck = false
    this.input.classList.add(sheet.classes.searchInput)

    this.el.appendChild(this.input)
    sheet.attach()
  }

  show(loc: Point2D, trans: Transform) {
    const { x, y } = loc
    this.input.value = ''

    // FIXME 缩放之后坐标不对
    const offsetX = x - this.el.offsetWidth / 2 + trans.x * trans.z
    const offsetY = y - this.el.offsetHeight / 2 + trans.y * trans.z

    this.el.style.transform = `translate(${offsetX}px, ${offsetY}px)`

    this.el.classList.add('open')

    this.input.focus()
  }

  close() {
    this.input.blur()
    this.input.value = ''

    this.el.classList.remove('open')
  }
}
