import { useState, useRef } from 'react'
import Canvas, {
  CanvasProps,
  Context2D,
  ImageLoader,
  rgbAngle,
} from 'react-canvas-animate'

import logo from '../logo.svg'

interface RendererProps extends CanvasProps {}

function Renderer({ ...props }: RendererProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [grabStart, setGrabStart] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(4)
  const zoomRef = useRef(4)
  const angleRef = useRef(0)

  const angularSpeed = Math.PI / 10

  const offsetRef = useRef({ x: 0, y: 0 })
  const colorRef = useRef('#00d5ff')
  const imageRef = useRef<ImageLoader>()

  const init = (ctx: Context2D) => {
    imageRef.current = new ImageLoader([logo])
  }

  const render = (ctx: Context2D) => {
    const { width, height } = ctx.canvas
    ctx.save()
    ctx.fillStyle = colorRef.current
    ctx.shadowBlur = 5 * zoomRef.current
    ctx.shadowColor = rgbAngle(angleRef.current * 360)
    // ctx.shadowOffsetX = 5 * zoomRef.current
    // ctx.shadowOffsetY = 5 * zoomRef.current
    ctx.clearRect(0, 0, width, height)
    const img = imageRef.current?.getImage(logo) || new Image()
    const sizeX = img.width * zoomRef.current
    const sizeY = img.height * zoomRef.current
    ctx.translate(
      width / 2 + offsetRef.current.x,
      height / 2 + offsetRef.current.y,
    )
    ctx.rotate(angleRef.current)
    ctx.drawImage(img, -sizeX / 2, -sizeY / 2, sizeX, sizeY)
    // ctx.fillRect(-size / 2, -size / 2, size, size)
    ctx.restore()
  }

  const update = (ctx: Context2D, deltaTime: number) => {
    angleRef.current += angularSpeed * (deltaTime / 1000)
  }

  const handleMouseDown = (event: MouseEvent) => {
    setIsMouseDown(true)
    setGrabStart({ x: event.offsetX, y: event.offsetY })
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (isMouseDown) {
      const dx = event.offsetX - grabStart.x
      const dy = event.offsetY - grabStart.y
      setOffset({ x: offset.x + dx, y: offset.y + dy })
      offsetRef.current = offset
      setGrabStart({ x: event.offsetX, y: event.offsetY })
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
      case 'wheel':
        const e = event as WheelEvent
        let newZoom = zoom + e.deltaY * -0.01
        newZoom = Math.max(0.5, Math.min(10, newZoom))
        zoomRef.current = newZoom
        setZoom(newZoom)
        break
      default:
        break
    }
  }

  return (
    <>
      <Canvas
        init={init}
        render={render}
        update={update}
        gridOffset={offset}
        gridSize={20 * zoom}
        documentEvents={{
          handleEvent,
          eventTypes: ['mousedown', 'mouseup', 'mousemove', 'wheel'],
        }}
        style={{ cursor: isMouseDown ? 'grabbing' : 'grab' }}
        fullscreen
        {...props}
      />
      {/* <button onClick={() => (colorRef.current = '#00d5ff')}>Blue</button>
      <button onClick={() => (colorRef.current = '#ffd500')}>Yellow</button> */}
    </>
  )
}

export default Renderer
