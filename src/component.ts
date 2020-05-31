import { EventEmitter } from "events"
import { Child } from "./child"
import { Context } from './context'

export type FunctionComponent<C extends Context = Context> = (
  context: C,
) => Child

export interface ClassComponent<C extends Context = Context> {
  render(): Child
  init?(context: C): void | (() => void)
}

export type Component = FunctionComponent | ClassComponent
