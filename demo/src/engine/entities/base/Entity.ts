import { CanvasObject, Context2D } from 'react-canvas-animate'

export interface EntityState extends CanvasObject.State {}
export interface EntityProps extends CanvasObject.Props {}

export abstract class Entity<
  State extends EntityState,
  Props extends EntityProps,
> extends CanvasObject.Base<Context2D, State, Props> {}
