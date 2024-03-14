import { CanvasObject, Context2D } from 'react-canvas-animate'

import { Entity, EntityState, EntityProps } from '../../entities'

export class Manager<
  State extends EntityState = any,
  Props extends EntityProps = any,
  Type extends Entity<EntityState, EntityProps> = Entity<
    EntityState,
    EntityProps
  >,
> extends CanvasObject.Manager<Context2D, State, Props, Type> {}
