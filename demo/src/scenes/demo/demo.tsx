import { useState, useRef } from 'react'
import Canvas, { Context2D, rgbAngle } from 'react-canvas-animate'

export default function DemoScene() {
  const [fullscreen, setFullscreen] = useState(true)
  const [hideGrid, setHideGrid] = useState(false)
  const [gridZoom, setGridZoom] = useState(40)
  const zoom = useRef(40)
  const clearRef = useRef(false)
  const cursorRef = useRef({ x: 0, y: 0 })
  const clickRef = useRef(false)
  const colorRef = useRef(0)

  return (
    <Canvas
      render={(ctx: Context2D, time: number) => {
        ctx.globalAlpha = 0.5
        ctx.shadowBlur = zoom.current / 2
        ctx.shadowColor = rgbAngle(colorRef.current)
        ctx.fillStyle = rgbAngle(colorRef.current)
        if (clickRef.current) {
          ctx.save()
          ctx.scale(zoom.current / 20, zoom.current / 20)
          const scaledCursorX = cursorRef.current.x / (zoom.current / 20)
          const scaledCursorY = cursorRef.current.y / (zoom.current / 20)
          ctx.beginPath()
          ctx.arc(
            scaledCursorX,
            scaledCursorY,
            zoom.current / 50 + 2,
            0,
            Math.PI * 2,
          )
          ctx.fill()
          ctx.restore()

          colorRef.current += 1
        }
        if (clearRef.current) {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
          clearRef.current = false
        }
      }}
      documentEvents={{
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
              clearRef.current = true
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
                zoom.current -
                ((event as WheelEvent).deltaY / 1000) * zoom.current
              zoom.current = Math.min(1000, Math.max(4, newZoom))
              setGridZoom(zoom.current)
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
      gridSize={gridZoom}
      nogrid={hideGrid}
      frameRate={0}
      // nogrid
    />
  )
}
