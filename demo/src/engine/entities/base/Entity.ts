import { CanvasObject, Context2D } from 'react-canvas-animate'
import { Component, ComponentState } from '@/engine/components'

// Interface for entity state, without components
export interface EntityState extends CanvasObject.State {}

// Interface for entity props
export interface EntityProps extends CanvasObject.Props {}

// Abstract class for Entity
export abstract class Entity<
  State extends EntityState,
  Props extends EntityProps,
> extends CanvasObject.Base<Context2D, State, Props> {
  protected components: Record<string, Component> = {}

  constructor(context: Context2D, state: State) {
    super(context, state)
    this.instantiateComponents()
  }

  abstract attachComponents(): Record<
    string,
    new (context: Context2D, state: ComponentState) => Component
  >

  private instantiateComponents() {
    const state = this.state as State
    const components = this.attachComponents()
    Object.entries(components).forEach(([key, ComponentClass]) => {
      this.components[key] = new ComponentClass(this.context, state)
    })
  }
}
