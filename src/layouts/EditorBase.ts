import { EventEmitter } from "events";
import { Grid } from "./Grid";

export class EditorBase extends EventEmitter {
  public el: HTMLElement;

  constructor(public container: HTMLElement) {
    super();
    this.el = document.createElement("div");
    this.el.style.backgroundColor = "#fff";
    this.el.style.transformOrigin = "0 0";
    this.el.style.position = "absolute";
    this.el.style.top = "0";
    this.el.style.left = "0";
    this.el.style.bottom = "0";
    this.el.style.right = "0";
    this.el.id = "neon-editor";
    this.el.style.zIndex = "-1";

    const grid = new Grid();
    this.el.appendChild(grid.el);

    window.onresize = () => {
      grid.emit("update");
    };

    container.addEventListener("wheel", (e: WheelEvent) => this.OnZoom(e));
  }

  OnZoom(e: WheelEvent) {
    e.preventDefault();
    console.log(e);
  }
}
