import { useRef } from 'react'
import { Canvas } from 'react-canvas-animate'

type Context2D = CanvasRenderingContext2D
type Vec2D = {
  x: number
  y: number
}

const DemoScene = () => {
  const angleRef = useRef(0)
  const mouseRef = useRef<Vec2D>({ x: 0, y: 0 })
  const blockPosition = useRef<Vec2D>({ x: 0, y: 0 })

  const radius = 25
  const angularSpeed = Math.PI * 3
  const blockSize = 10
  const smoothingFactor = 4

  function render(ctx: Context2D, time: number) {
    const canvas = ctx.canvas
    ctx.fillStyle = '#111'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let pos: Vec2D = {
      x: blockPosition.current.x + Math.cos(angleRef.current) * radius,
      y: blockPosition.current.y + Math.sin(angleRef.current) * radius,
    }

    ctx.fillStyle = 'aqua'
    ctx.shadowBlur = blockSize / 3
    ctx.shadowColor = ctx.fillStyle
    ctx.fillRect(pos.x, pos.y, blockSize, blockSize)
  }

  function update(ctx: Context2D, time: number) {
    const deltaTime = time / 1000

    // Calculate the difference between current position and mouse position
    const dx = mouseRef.current.x - blockPosition.current.x
    const dy = mouseRef.current.y - blockPosition.current.y

    // Calculate the movement based on deltaTime and smoothing factor
    const moveX = dx * deltaTime * smoothingFactor
    const moveY = dy * deltaTime * smoothingFactor

    // Update the blockPosition
    blockPosition.current.x += moveX
    blockPosition.current.y += moveY

    // Update the rotation angle
    if (dx <= radius && dy <= radius) {
      angleRef.current += angularSpeed * deltaTime
    } else {
      // Calculate the angle opposite to the approach angle relative to the mouse
      // angleRef.current = Math.atan2(-dy, -dx)
    }
  }

  function handleMouseMove(ctx: Context2D, event: MouseEvent) {
    const rect = ctx.canvas.getBoundingClientRect()
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }

  function handleEvent(ctx: Context2D, event: any) {
    switch (event.type) {
      case 'mousemove':
        handleMouseMove(ctx, event)
        break
    }
  }

  return (
    <Canvas
      events={{ handleEvent, eventTypes: ['mousemove'] }}
      render={render}
      update={update}
      fullscreen
    />
  )
}

export default DemoScene
