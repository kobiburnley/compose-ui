import { EventEmitter } from "events"
import { Child } from "./child"
import { Context } from './context'
import { createNode } from './createNode'

export function render<C extends Context = Context>({
  child,
  context,
}: {
  child: Child
  context: C
}) {
  context.parentNode.append(createNode({ child, context }))
}
