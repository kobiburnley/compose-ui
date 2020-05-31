import { Child } from "./child"
import { Context } from "./context"
import { useReplaceOrCreateNode } from "./useReplaceOrCreateNode"

export function createNode<C extends Context = Context>({
  child,
  context,
}: {
  child: Child
  context: C
}) {
  const { renderer, events, maybeNode } = context
  const { document } = renderer

  let currentChild = child

  let currentNode: Node | undefined

  while (currentChild != null) {
    if (renderer.isNode(currentChild)) {
      currentNode = currentChild
      return currentNode
    }

    if (typeof currentChild === "string") {
      const data = currentChild
      currentNode = useReplaceOrCreateNode({
        context,
        createNode: () => document.createTextNode(data),
        nodeTypeMatches: (node): node is Text => node instanceof Text,
        maybeNode,
      })
      return currentNode
    }

    let nextChild

    if (typeof currentChild === "function") {
      nextChild = currentChild(context)
    } else {
      nextChild = currentChild.render()
      const disposer = currentChild.init?.(context)
      if (disposer !== undefined) {
        events.once("dispose", disposer)
      }
    }

    if (nextChild === currentChild) {
      throw new TypeError("A component cannot return itself as a child")
    }

    currentChild = nextChild
  }

  throw new TypeError(`Invalid component type: ${typeof child}`)
}
