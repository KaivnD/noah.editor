interface ComponentSlotItem {
  name: string
  el: HTMLElement
}

export class ComponentSlot {
  el: HTMLDivElement
  items: ComponentSlotItem[] = []
  constructor() {
    this.el = document.createElement('div')
    this.el.id = 'editor-slot'
    this.el.style.position = 'absolute'
    this.el.style.width = '100%'
    this.el.style.height = '100px'
    this.el.style.bottom = '0'
    this.el.style.backgroundColor = '#00000024'
    this.el.style.zIndex = '1'
  }

  load(): void {
    this.items.forEach((item) => this.el.appendChild(item.el))
  }
}
