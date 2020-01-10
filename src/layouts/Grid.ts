import Snap from "snapsvg";
import { EventEmitter } from "events";

interface GridSettings {
  large?: GridProp;
  small?: GridProp;
}

interface GridProp {
  color: string;
  width: number;
}

export class Grid extends EventEmitter {
  paper: Snap.Paper;
  update(): void {
    this.el.innerHTML = "";
    this.paper
      .rect(0, 0, this.el.clientWidth, this.el.clientHeight)
      .attr({ fill: "url(#grid)" });
  }
  public el: SVGElement;
  public settings?: GridSettings;

  constructor() {
    super();

    this.on("update", () => this.update());

    this.el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.el.style.width = "100%";
    this.el.style.height = "100%";

    this.paper = Snap(this.el);

    const small = this.paper.pattern(0, 0, 10, 10).add(
      this.paper.path("M 10 0 L 0 0 0 10").attr({
        fill: "none",
        stroke: this.settings?.small?.color || "grey",
        strokeWidth: this.settings?.small?.width || 0.1
      })
    );

    this.paper
      .pattern(0, 0, 100, 100)
      .attr({
        id: "grid"
      })
      .add(
        this.paper.rect(0, 0, 100, 100).attr({
          fill: small
        })
      )
      .add(
        this.paper.path("M 100 0 L 0 0 0 100").attr({
          fill: "none",
          stroke: this.settings?.large?.color || "grey",
          strokeWidth: this.settings?.large?.width || 0.5
        })
      );

    this.el.onload = () => {
      this.paper
        .rect(0, 0, this.el.clientWidth, this.el.clientHeight)
        .attr({ fill: "url(#grid)" });
    };
  }
}
