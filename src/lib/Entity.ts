import { CanvasContext, Context2D } from '../components/Canvas'
import { CanvasObject, ObjectState, ObjectProps } from './CanvasObject'
import { Component, ComponentState } from './Component'

export interface EntityState extends ObjectState {}
export interface EntityProps extends ObjectProps {}

export abstract class Entity<
  State extends EntityState = EntityState,
  Props extends EntityProps = EntityProps,
  Context extends CanvasContext = Context2D,
> extends CanvasObject<State, Props, Context> {
  protected components: Record<string, Component> = {}

  constructor(context: Context, state: State) {
    super(context, state)
    this.instantiateComponents()
  }

  abstract useComponents(): Record<
    string,
    new (context: Context, state: ComponentState) => Component
  >

  private instantiateComponents() {
    const state = this.state as State
    const components = this.useComponents()
    Object.entries(components).forEach(([key, ComponentClass]) => {
      this.components[key] = new ComponentClass(this.context, state)
    })
  }
}
