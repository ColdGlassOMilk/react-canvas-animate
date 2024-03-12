import { CanvasObject, WebGL } from 'react-canvas-animate'
import {
  RenderableObject,
  RenderableObjectState,
  RenderableObjectProps,
} from '../base/RenderableObject'

export class RenderableObjectManager<
  State extends RenderableObjectState = RenderableObjectState,
  Props extends RenderableObjectProps = RenderableObjectProps,
  Type extends RenderableObject = RenderableObject,
> extends CanvasObject.Manager<WebGL, State, Props, Type> {}
