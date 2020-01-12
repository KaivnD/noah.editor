import { EventEmitter } from 'events'
import { EditorBase } from './EditorBase'
import { ComponentSlot } from './ComponentSlot'

export class EditorLayout extends EventEmitter {
  public base: EditorBase
  slot: ComponentSlot
  constructor(public container: HTMLElement) {
    super()
    // container.style.boxShadow = '0 0 20px 3px #0000002e'
    container.style.overflow = 'hidden'
    container.style.position = 'relative'
    this.base = new EditorBase(container)
    this.slot = new ComponentSlot()
    const el = document.createElement('div')
    el.innerText = 'a'
    this.slot.items.push({
      name: 'a',
      el: el
    })
    this.slot.load()
    container.appendChild(this.slot.el)
    container.appendChild(this.base.el)
  }
}
