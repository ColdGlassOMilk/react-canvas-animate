import { CanvasObject, WebGL } from 'react-canvas-animate'
import {
  RenderableObject,
  RenderableObjectState,
  RenderableObjectProps,
} from '../base/RenderableObject'

export class RenderableObjectManager<
  Type extends RenderableObject = RenderableObject,
  State extends RenderableObjectState = RenderableObjectState,
  Props extends RenderableObjectProps = RenderableObjectProps,
> extends CanvasObject.Manager<Type, State, Props, WebGL> {}
