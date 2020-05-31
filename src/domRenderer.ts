import { Child } from "./child"
import { Renderer } from "./renderer"

export interface DOMRendererParams {
  window: typeof window
  isBrowser: boolean
}

export interface DOMRenderer extends Renderer {}

export class DOMRenderer implements Renderer {
  document: Document
  window: typeof window
  isBrowser: boolean

  constructor(params: DOMRendererParams) {
    this.window = params.window
    this.document = this.window.document
    this.isBrowser = params.isBrowser
  }

  isNode(child: Child): child is Node {
    return child instanceof this.window.Node
  }
}
