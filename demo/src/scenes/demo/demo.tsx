import { useState, useRef } from 'react'
import Canvas from 'react-canvas-animate'

export default function DemoScene() {
  const [fullscreen, setFullscreen] = useState(true)
  const [hideGrid, setHideGrid] = useState(false)
  const [zoom, setZoom] = useState(20)
  const [clear, setClear] = useState(false)
  const cursorRef = useRef({ x: 0, y: 0 })
  const clickRef = useRef(false)
  return (
    <Canvas
      render={(ctx: CanvasRenderingContext2D, time: number) => {
        ctx.globalAlpha = 0.2
        ctx.shadowBlur = zoom / 2
        ctx.shadowColor = 'aqua'
        ctx.fillStyle = 'teal'
        if (clickRef.current) {
          ctx.save()
          ctx.scale(zoom / 20, zoom / 20)
          const scaledCursorX = cursorRef.current.x / (zoom / 20)
          const scaledCursorY = cursorRef.current.y / (zoom / 20)
          ctx.beginPath()
          ctx.arc(scaledCursorX, scaledCursorY, 10, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }
        if (clear) {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
          setClear(false)
        }
      }}
      events={{
        handleEvent: (event: Event) => {
          switch (event.type) {
            case 'mousemove':
              const e = event as MouseEvent
              cursorRef.current = {
                x: e.clientX,
                y: e.clientY,
              }
              break
            case 'mousedown':
              clickRef.current = true
              break
            case 'mouseup':
              clickRef.current = false
              break
            case 'dblclick':
              setClear(true)
              break
            case 'keydown':
              switch ((event as KeyboardEvent).key) {
                case 'f':
                  setFullscreen(!fullscreen)
                  break
                case 'g':
                  setHideGrid(!hideGrid)
                  break
              }
              break
            case 'wheel':
              const newZoom =
                zoom - ((event as WheelEvent).deltaY / 1000) * zoom
              setZoom(Math.min(1000, Math.max(4, newZoom)))
              break
          }
        },
        eventTypes: [
          'mousemove',
          'mousedown',
          'mouseup',
          'dblclick',
          'keydown',
          'wheel',
        ],
      }}
      fullscreen={fullscreen}
      width={1024}
      height={768}
      gridSize={zoom}
      nogrid={hideGrid}
    />
  )
}
