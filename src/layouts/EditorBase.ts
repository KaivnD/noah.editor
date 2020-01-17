import { EventEmitter } from 'events'
import { Grid } from './Grid'
import Vector, { Point2D, Transform } from '../core/Vector'
import { SearchBar } from './SearchBar'

export enum EditorInteraction {
  None,
  Pan,
  Search
}

export class EditorBase extends EventEmitter {
  public el: HTMLElement
  public pointer: Point2D = { x: 0, y: 0 }

  public interaction: EditorInteraction = EditorInteraction.None
  public transform: Transform = { x: 0, y: 0, z: 1 }

  private startTransform: Transform | null = null

  private startPointer: Point2D = { x: 0, y: 0 }

  grid: Grid
  searchBar: SearchBar

  constructor(public container: HTMLElement) {
    super()
    this.el = document.createElement('div')
    this.el.style.transformOrigin = '0 0'
    this.el.style.position = 'absolute'
    this.el.style.top = '0'
    this.el.style.left = '0'
    this.el.style.bottom = '0'
    this.el.style.right = '0'
    this.el.id = 'neon-editor'
    // this.el.style.zIndex = '-1'

    this.grid = new Grid()
    this.searchBar = new SearchBar()
    this.el.appendChild(this.grid.el)
    container.appendChild(this.searchBar.el)

    container.addEventListener('mousedown', (e: MouseEvent) =>
      this.onMouseDn(e)
    )
    container.addEventListener('mouseup', (e: MouseEvent) => this.onMouseUp(e))
    container.addEventListener('mousemove', (e: MouseEvent) =>
      this.onMouseMove(e)
    )
    container.addEventListener('contextmenu', (e: MouseEvent) => {
      e.preventDefault()
    })
    container.addEventListener('wheel', (e: WheelEvent) => this.onZoom(e))

    container.addEventListener('dblclick', (e: MouseEvent) => this.onDBClidk(e))
  }

  onDBClidk(e: MouseEvent): any {
    this.interaction = EditorInteraction.Search
    this.searchBar.show({ x: e.offsetX, y: e.offsetY }, this.transform)
  }

  onZoom(e: WheelEvent) {
    e.preventDefault()
    const rect = this.el.getBoundingClientRect()
    const wheelDelta = -e.deltaY
    const delta = (wheelDelta ? wheelDelta / 120 : -e.deltaY / 3) * 0.2
    const ox = (rect.left - e.pageX) * delta
    const oy = (rect.top - e.pageY) * delta
    let zoom = this.transform.z * (1 + delta)
    zoom = zoom < 0.2 ? 0.2 : zoom > 10 ? 10 : zoom
    const z = this.transform.z

    const d = (z - zoom) / (z - zoom || 1)

    this.transform.z = zoom || 1
    this.transform.x += ox * d
    this.transform.y += oy * d

    this.update()
  }

  onMouseDn(e: MouseEvent): any {
    e.preventDefault()
    if (e.button !== 2) return
    this.updatePointer(e)
    this.interaction = EditorInteraction.Pan
    this.startPointer = this.pointer
    this.startTransform = { ...this.transform }
  }

  onMouseUp(e: MouseEvent): any {
    this.updatePointer(e)
    if (this.interaction == EditorInteraction.Search) this.searchBar.close()
    this.interaction = EditorInteraction.None
    this.update()
  }

  onMouseMove(e: MouseEvent): any {
    if (this.interaction !== EditorInteraction.Pan) return
    e.preventDefault()
    this.updatePointer(e)
    // FIXME zoom时，Pan画布的步调与光标不一致
    let zoom = this.transform.z
    let delta = Vector.sub(this.pointer, this.startPointer)
    zoom = Math.sqrt(zoom)
    delta = Vector.mult(delta, zoom)
    const pos = Vector.add(
      {
        x: this.startTransform?.x || 0,
        y: this.startTransform?.y || 0
      },
      delta
    )

    this.transform.x = pos.x
    this.transform.y = pos.y

    this.update()

    // this.grid.emit('transform', {
    //   x: delta.x,
    //   y: delta.y
    // })
  }

  update() {
    const { x, y, z } = this.transform

    if (this.interaction === EditorInteraction.Pan)
      this.el.style.cursor = 'pointer'
    else this.el.style.cursor = ''

    this.grid.emit('transform', this.transform)

    this.el.style.transform = `translate(${x}px, ${y}px) scale(${z})`
  }

  updatePointer(e: MouseEvent) {
    const { pageX, pageY } = e
    // const rect = this.el.getBoundingClientRect()
    // const x = clientX - rect.left
    // const y = clientY - rect.top
    // const z = this.transform.z
    this.pointer = { x: pageX, y: pageY }
  }
}
