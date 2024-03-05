import { useRef, useState } from 'react'
import { Canvas } from 'react-canvas-animate'

type Context2D = CanvasRenderingContext2D
type Vec2D = {
  x: number
  y: number
}

const DemoScene = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(true)
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
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 40)

    let pos: Vec2D = {
      x: blockPosition.current.x + Math.cos(angleRef.current) * radius,
      y: blockPosition.current.y + Math.sin(angleRef.current) * radius,
    }

    ctx.save()
    ctx.fillStyle = 'aqua'
    ctx.shadowBlur = blockSize / 3
    ctx.shadowColor = ctx.fillStyle
    ctx.fillRect(pos.x, pos.y, blockSize, blockSize)
    ctx.restore()
  }

  function update(ctx: Context2D, time: number) {
    const deltaTime = time / 1000

    // Calculate the difference between current position and mouse position
    const rect = ctx.canvas.getBoundingClientRect()
    const dx = mouseRef.current.x - rect.left - blockPosition.current.x
    const dy = mouseRef.current.y - rect.top - blockPosition.current.y

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

  function handleMouseMove(event: MouseEvent) {
    mouseRef.current = {
      x: event.clientX,
      y: event.clientY,
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    switch (event.key.toLowerCase()) {
      case 'escape':
        setFullscreen(false)
        break
      case 'f':
        setFullscreen(!fullscreen)
        break
    }
  }

  function handleEvent(event: Event) {
    switch (event.type) {
      case 'mousemove':
        handleMouseMove(event as MouseEvent)
        break
      case 'keydown':
        handleKeyDown(event as KeyboardEvent)
        break
    }
  }

  return (
    <Canvas
      events={{ handleEvent, eventTypes: ['mousemove', 'keydown'] }}
      render={render}
      update={update}
      fullscreen={fullscreen}
      width={640}
      height={480}
    />
  )
}

export default DemoScene
