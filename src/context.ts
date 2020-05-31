import { Renderer } from "./renderer"
import { EventEmitter } from "events"

export interface Context {
  renderer: Renderer
  events: EventEmitter
  maybeNode?: Node
  parentNode: Element
}
