import { useRef } from 'react'
import { Canvas } from 'react-canvas-animate'

type canvas2d = CanvasRenderingContext2D

function App() {
  let angle = useRef(0)
  const angularSpeed = Math.PI / 2

  const draw = (ctx: canvas2d, time: number) => {
    // Clear the background
    ctx.fillStyle = '#111'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Calculate the position of the circle
    const centerX = ctx.canvas.width / 2
    const centerY = ctx.canvas.height / 2
    const radius = Math.floor(centerX / 10)
    const positionX = centerX + radius * Math.cos(angle.current)
    const positionY = centerY + radius * Math.sin(angle.current)

    // Draw a circle at the calculated position
    ctx.fillStyle = 'aqua'
    ctx.shadowBlur = radius
    ctx.shadowColor = 'aqua'
    ctx.beginPath()
    ctx.ellipse(
      positionX - radius / 2,
      positionY - radius / 2,
      radius / 2,
      radius / 2,
      angle.current,
      0,
      360,
    )
    ctx.fill()
    ctx.closePath()
  }

  const update = (ctx: canvas2d, time: number) => {
    angle.current += angularSpeed * (time / 1000)
  }

  const handleMouseMove = (ctx: canvas2d, event: MouseEvent) => {
    const rect = ctx.canvas.getBoundingClientRect()
    console.log({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    console.log(`Key Event: '${event.key}'`)
  }

  const handleEvent = (ctx: canvas2d, event: any) => {
    switch (event.type) {
      case 'mousemove':
        handleMouseMove(ctx, event)
        break
      case 'keydown':
        handleKeyDown(event)
        break
      default:
        console.log('Unprocessed Event: ' + event.type)
    }
  }

  return (
    <Canvas<canvas2d>
      init={(canvas: HTMLCanvasElement) => canvas.getContext('2d') as canvas2d}
      events={{
        handleEvent,
        eventTypes: ['click', 'mousemove', 'keydown'],
      }}
      render={draw}
      update={update}
      frameRate={60}
      fullscreen
    />
  )
}

export default App
