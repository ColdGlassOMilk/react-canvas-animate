import { useState, useRef } from 'react'
import Canvas, { CanvasProps, Context2D } from 'react-canvas-animate'

interface RendererProps extends CanvasProps {}

function Renderer({ ...props }: RendererProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [grabStart, setGrabStart] = useState({ x: 0, y: 0 })

  const offsetRef = useRef({ x: 0, y: 0 })
  const colorRef = useRef('#00d5ff')

  const render = (ctx: Context2D) => {
    const { width, height } = ctx.canvas
    ctx.fillStyle = colorRef.current
    ctx.clearRect(0, 0, width, height)
    ctx.fillRect(
      width / 2 - 25 + offsetRef.current.x,
      height / 2 - 25 + offsetRef.current.y,
      50,
      50,
    )
  }

  const handleMouseDown = (event: MouseEvent) => {
    setIsMouseDown(true)
    setGrabStart({ x: event.clientX, y: event.clientY })
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (isMouseDown) {
      const dx = event.clientX - grabStart.x
      const dy = event.clientY - grabStart.y
      setOffset({ x: offset.x + dx, y: offset.y + dy })
      offsetRef.current = offset
      setGrabStart({ x: event.clientX, y: event.clientY })
    }
  }

  const handleEvent = (event: Event) => {
    switch (event.type) {
      case 'mousedown':
        handleMouseDown(event as MouseEvent)
        break
      case 'mouseup':
        setIsMouseDown(false)
        break
      case 'mousemove':
        handleMouseMove(event as MouseEvent)
        break
      default:
        break
    }
  }

  return (
    <>
      <Canvas
        render={render}
        gridOffset={offset}
        gridSize={40}
        events={{
          handleEvent,
          eventTypes: ['mousedown', 'mouseup', 'mousemove'],
        }}
        style={{ cursor: isMouseDown ? 'grabbing' : 'grab' }}
        {...props}
      />
      <button onClick={() => (colorRef.current = '#00d5ff')}>Blue</button>
      <button onClick={() => (colorRef.current = '#ffd500')}>Yellow</button>
    </>
  )
}

export default Renderer
