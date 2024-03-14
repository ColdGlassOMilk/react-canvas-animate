import { CanvasObject, Context2D } from 'react-canvas-animate'

export interface ComponentState extends CanvasObject.State {}
export interface ComponentProps extends CanvasObject.Props {}

export abstract class Component<
  State extends ComponentState = ComponentState,
  Props extends ComponentProps = ComponentProps
> extends CanvasObject.Base<
  Context2D,
  State,
  Props
> {}
