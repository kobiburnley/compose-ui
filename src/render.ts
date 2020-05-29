import { Child } from "./child"
import { EventEmitter } from "events"

export function render<C>(
  child: Child,
  container: Element,
  prevContext?: C,
  events?: EventEmitter
) {
  container.append(createNode(child, prevContext, events))
}

export function createNode<C>(
  child: Child,
  prevContext?: C,
  events?: EventEmitter
) {
  let node!: Node
  let context = prevContext
  while (child != null) {
    if (child instanceof Node) {
      node = child
      break
    }

    if (typeof child === "string") {
      node = document.createTextNode(child)
      break
    }

    let nextChild

    if (typeof child === "function") {
      nextChild = child(context, events)
    } else {
      nextChild = child.render()
      const disposer = child.init?.(context, events)
      if (disposer !== undefined) {
        events?.once("dispose", disposer)
      }
    }

    if (nextChild === child) {
      throw new Error("A component cannot return itself as a child")
    }

    child = nextChild
  }

  return node
}
