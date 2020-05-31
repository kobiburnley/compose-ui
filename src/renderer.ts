import { Child } from "./child"

export interface Renderer {
  readonly isBrowser: boolean
  isNode: (child: Child) => child is Node
  document: Document
  window: typeof window
}
