import { EventEmitter } from 'events'
import SVG from 'svg.js'

interface GridSettings {
  large?: GridProp
  small?: GridProp
}

interface GridProp {
  color: string
  width: number
}

export class Grid extends EventEmitter {
  public el: HTMLElement
  public settings?: GridSettings

  constructor() {
    super()

    this.el = document.createElement('div')
    this.el.style.width = '100%'
    this.el.style.height = '100%'

    const paper = SVG(this.el).size('100%', '100%')

    const small = paper.pattern(10, 10, (add) => {
      add
        .path('M 10 0 L 0 0 0 10')
        .fill('none')
        .stroke({ width: 0.1, color: 'grey' })
    })

    const large = paper.pattern(100, 100, (add) => {
      add.rect(100, 100).fill(small)
      add
        .path('M 100 0 L 0 0 0 100')
        .fill('none')
        .stroke({ width: 0.5, color: 'grey' })
    })

    // TODO 无限栅格

    // const rect: svgjs.Rect = paper
    //   .rect(paper.width(), paper.height())
    //   .fill(large)
    paper.rect(paper.width(), paper.height()).fill(large)

    // this.on('transform', (transform: Transform) => {
    //   console.log(transform)
    //   this.el.style.transform = `translate(${-x}px, ${-y}px) scale(${z})`
    //   rect.translate(transform.x, transform.y)
    // })
  }
}
