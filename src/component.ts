import { EventEmitter } from "events"
import { Child } from "./child"

export type FunctionComponent<C = unknown> = (
  context: C,
  events?: EventEmitter
) => Child

export interface ClassComponent<C = unknown> {
  render(): Child
  init?(context: C, events?: EventEmitter): void | (() => void)
}

export type Component = FunctionComponent | ClassComponent
