import { CanvasObject, Context2D } from 'react-canvas-animate'

import { Entity } from '../../entities/base/Entity'

export class Manager<
  State extends CanvasObject.State = CanvasObject.State,
  Props extends CanvasObject.Props = CanvasObject.Props,
  Type extends Entity<State, Props> = Entity<State, Props>
> extends CanvasObject.Manager<
  Context2D,
  State,
  Props,
  Type
> {}
