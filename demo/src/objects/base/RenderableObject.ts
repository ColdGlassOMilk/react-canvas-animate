import { CanvasObject, WebGL } from 'react-canvas-animate'

// Todo: declare common types in the RCA package?
type vec3 = { x: number; y: number; z: number }

export interface RenderableObjectState extends CanvasObject.State {
  position?: vec3
  rotation?: vec3
  scale?: vec3
}

export interface RenderableObjectProps extends RenderableObjectState {}

export class RenderableObject<
  State extends RenderableObjectState = RenderableObjectState,
  Props extends RenderableObjectProps = RenderableObjectProps,
> extends CanvasObject.Base<WebGL, State, Props> {
  constructor(gl: WebGL, state: State) {
    super(gl, state)
    this.state = {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      ...state,
    }
  }
}
