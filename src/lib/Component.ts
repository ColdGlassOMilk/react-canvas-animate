import { CanvasContext, Context2D } from '../components/Canvas'
import { CanvasObject, ObjectState, ObjectProps } from './CanvasObject'

export interface ComponentState extends ObjectState {}
export interface ComponentProps extends ObjectProps {}

export abstract class Component<
  State extends ComponentState = ComponentState,
  Props extends ComponentProps = ComponentProps,
  Context extends CanvasContext = Context2D,
> extends CanvasObject<State, Props, Context> {}
