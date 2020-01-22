import jss from 'jss'
import preset from 'jss-preset-default'

jss.setup(preset())

const style = jss.createStyleSheet({
  selector: {
    position: 'absolute',
    opacity: 0,

    '&.open': {
      opacity: 1
    }
  }
})

export class Selector {
  el: HTMLDivElement
  constructor() {
    this.el = document.createElement('div')
    this.el.classList.add(style.classes.selector)
  }

  show() {
    this.el.classList.add('open')
  }

  hide() {
    this.el.classList.remove('open')
  }
}
