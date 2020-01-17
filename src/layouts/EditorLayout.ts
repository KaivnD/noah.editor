import { EventEmitter } from 'events'
import { EditorBase } from './EditorBase'

export class EditorLayout extends EventEmitter {
  public base: EditorBase
  constructor(public container: HTMLElement) {
    super()
    // container.style.boxShadow = '0 0 20px 3px #0000002e'
    container.style.overflow = 'hidden'
    container.style.position = 'relative'
    container.style.backgroundColor = '#fff'
    this.base = new EditorBase(container)
    const el = document.createElement('div')
    el.innerText = 'a'

    container.appendChild(this.base.el)
  }
}
