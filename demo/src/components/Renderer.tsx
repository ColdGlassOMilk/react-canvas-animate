import { useState } from 'react'
import Canvas, { CanvasProps } from 'react-canvas-animate'

interface RendererProps extends CanvasProps {}

function Renderer({ ...props }: RendererProps) {
  const [scroll, setScroll] = useState({ x: 0, y: 0 })

  return (
    <Canvas
      onWheel={(e) =>
        setScroll({
          x: scroll.x - e.deltaX / 2,
          y: scroll.y - e.deltaY / 2,
        })
      }
      gridOffset={scroll}
      gridSize={40}
      {...props}
    />
  )
}

export default Renderer
