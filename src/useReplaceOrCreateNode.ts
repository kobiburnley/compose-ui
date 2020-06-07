import { Renderer } from "./renderer"
import { Context } from "./context"

export function useReplaceOrCreateNode<T extends Node>({
  context,
  createNode,
  nodeTypeMatches,
}: {
  context: Context
  createNode: () => T
  nodeTypeMatches: (node: Node) => boolean
}): T {
  const {parentNode, maybeNode} = context

  if (maybeNode == null) {
    return createNode()
  }

  if ((nodeTypeMatches as (node: Node) => node is T)(maybeNode)) {
    return maybeNode
  }

  const newNode = createNode()
  parentNode.replaceChild(newNode, maybeNode)
  return newNode
}
