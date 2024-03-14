import Canvas, { CanvasProps } from 'react-canvas-animate'

interface RendererProps extends CanvasProps {}

export const Renderer = ({...props}: RendererProps) => {
  return <Canvas {...props} />
}
