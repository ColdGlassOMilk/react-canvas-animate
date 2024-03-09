export type Context2D = CanvasRenderingContext2D
export type WebGL = WebGLRenderingContext
export type WebGL2 = WebGL2RenderingContext
export type Bitmap = ImageBitmapRenderingContext
export type CanvasContext = Context2D | WebGL | WebGL2 | Bitmap
export type ContextType = '2d' | 'webgl' | 'webgl2' | 'bitmaprenderer'

export interface CanvasEventCallback {
  handleEvent(event: Event): void
  eventTypes: string[]
}

export interface CanvasProps<T extends CanvasContext = Context2D>
  extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  init?: (context: T) => void
  render?: (context: T, deltaTime: number) => void
  update?: (context: T, deltaTime: number) => void
  type?: ContextType
  attributes?: Record<string, unknown>
  events?: CanvasEventCallback
  fullscreen?: boolean
  hideCursor?: boolean
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
