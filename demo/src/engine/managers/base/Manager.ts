import { CanvasObject, Context2D } from 'react-canvas-animate'

import { Entity, EntityState, EntityProps } from '../../entities'

export class Manager<
  State extends EntityState = EntityState,
  Props extends EntityProps = EntityProps,
  Type extends Entity<State, Props> = Entity<State, Props>
> extends CanvasObject.Manager<
  Context2D,
  State,
  Props,
  Type
> {}
