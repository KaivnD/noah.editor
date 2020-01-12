import { EventEmitter } from 'events'
import { Grid } from './Grid'

export class EditorBase extends EventEmitter {
  public el: HTMLElement
  private pointer: Point2D = { x: 0, y: 0 }

  constructor(public container: HTMLElement) {
    super()
    this.el = document.createElement('div')
    this.el.style.backgroundColor = '#fff'
    this.el.style.transformOrigin = '0 0'
    this.el.style.position = 'absolute'
    this.el.style.top = '0'
    this.el.style.left = '0'
    this.el.style.bottom = '0'
    this.el.style.right = '0'
    this.el.id = 'neon-editor'
    // this.el.style.zIndex = '-1'

    const grid = new Grid()
    this.el.appendChild(grid.el)

    container.addEventListener('mousedown', (e: MouseEvent) =>
      this.onMouseDn(e)
    )
    container.addEventListener('mouseup', (e: MouseEvent) => this.onMouseUp(e))
    container.addEventListener('mousemove', (e: MouseEvent) =>
      this.onMouseMove(e)
    )
    container.addEventListener('contextmenu', (e: MouseEvent) =>
      e.preventDefault()
    )
    container.addEventListener('wheel', (e: WheelEvent) => this.onZoom(e))
    console.log(this.pointer)
  }

  onZoom(e: WheelEvent) {
    e.preventDefault()
  }

  onMouseDn(e: MouseEvent): any {
    e.preventDefault()
    if (e.button !== 2) return
    this.updatePointer(e)
    console.log(e)
  }

  onMouseUp(e: MouseEvent): any {
    this.updatePointer(e)
  }

  onMouseMove(e: MouseEvent): any {
    e.preventDefault()
    this.updatePointer(e)
  }

  updatePointer(e: MouseEvent) {
    this.pointer = { x: e.pageX, y: e.pageY }
  }
}
