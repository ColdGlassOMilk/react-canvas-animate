# react-canvas-animate

react-canvas-animate is a minimal HTML Canvas element wrapped in a React component with some additional helpers specifically for animation. Includes support for both Typescript and CommonJS.

## Minimal Usage

The most basic component to start with

```typescript
import { Canvas } from 'react-canvas-animate'

function App() {
  const render = (canvas: HTMLCanvasElement, deltaTime: number) => {
    // Get a 2D Context
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear the background
    ctx.fillStyle = '#111'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  return <Canvas render={render} />
}

export default App
```

## Example Usage

A more comprehensive example, showing a glowing circle that spins around the screen

```typescript
import { Canvas } from 'react-canvas-animate'

function App() {
  let angle = 0 // Initial angle
  const angularSpeed = Math.PI / 2

  const draw = (canvas: HTMLCanvasElement, time: number) => {
    // Get a 2D context
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear the background
    ctx.fillStyle = '#111'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Calculate the position of the circle
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.floor(centerX / 10)
    const positionX = centerX + radius * Math.cos(angle)
    const positionY = centerY + radius * Math.sin(angle)

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
      angle,
      0,
      360,
    )
    ctx.fill()
    ctx.closePath()
  }

  const update = (canvas: HTMLCanvasElement, time: number) => {
    angle += angularSpeed * (time / 1000)
  }

  return (
    <Canvas render={draw} update={update} frameRate={30} fullscreen>
      Canvas is not supported by your browser
    </Canvas>
  )
}

export default App
```
