import { CanvasObject, Context2D } from 'react-canvas-animate'

export abstract class Entity<
  State extends CanvasObject.State = CanvasObject.State,
  Props extends CanvasObject.Props = CanvasObject.Props
> extends CanvasObject.Base<
  Context2D,
  State,
  Props
> {}
