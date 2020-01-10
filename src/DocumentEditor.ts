import { EditorLayout } from "./layouts/EditorLayout";

export class DocumentEditor {
  public layout: EditorLayout;
  public pluginHost: string = "http://localhost/plugin/";
  constructor(el: string) {
    const container = document.getElementById(el);
    if (!container)
      throw new Error("Get DocumentEditor container element faild!");
    this.layout = new EditorLayout(container);
  }

  use(plugin: string) {
    this.loadScript(`${this.pluginHost}${plugin}.js`, () => {
      console.log(plugin + "loaded");
    });
  }

  loadScript(url: string, callback: () => void) {
    const script: HTMLScriptElement = document.createElement("script");
    script.type = "text/javascript";

    script.onload = function() {
      callback();
    };

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }
}
