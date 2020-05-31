import { Renderer } from "./renderer"
import { Context } from "./context"

export function useReplaceOrCreateNode<T extends Node>({
  context,
  createNode,
  nodeTypeMatches,
  maybeNode,
}: {
  context: Context
  createNode: () => T
  nodeTypeMatches: (node: Node) => boolean
  maybeNode?: Node
}): T {
  if (maybeNode == null) {
    return createNode()
  }

  if ((nodeTypeMatches as (node: Node) => node is T)(maybeNode)) {
    return maybeNode
  }

  const newNode = createNode()
  context.parentNode.replaceChild(newNode, maybeNode)
  return newNode
}
