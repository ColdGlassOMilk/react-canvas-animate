export type CanvasContext =
  | CanvasRenderingContext2D
  | WebGLRenderingContext
  | WebGL2RenderingContext
  | ImageBitmapRenderingContext

export interface CanvasEventCallback {
  handleEvent: (event: Event) => void
  eventTypes: string[]
}

export interface CanvasProps<T extends CanvasContext = CanvasRenderingContext2D>
  extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  init?: (canvas: HTMLCanvasElement) => T
  render?: (context: T, deltaTime: number) => void
  update?: (context: T, deltaTime: number) => void
  events?: CanvasEventCallback
  fullscreen?: boolean
  frameRate?: number
  gridSize?: number
  nogrid?: boolean
}

export interface CanvasState {
  width: number
  height: number
  position: string
  top: string
  left: string
}
