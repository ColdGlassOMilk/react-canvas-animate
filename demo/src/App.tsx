import { Canvas } from 'react-canvas-animate'

function App() {
  let angle = 0 // Initial angle
  const angularSpeed = Math.PI / 2

  const draw = (canvas: HTMLCanvasElement, time: number) => {
    // Draw stuff
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear the background
    ctx.fillStyle = '#111'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Calculate the position of the circle
    const centerX = ctx.canvas.width / 2
    const centerY = ctx.canvas.height / 2
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
    <div className='App'>
      <Canvas render={draw} update={update} fullscreen />
    </div>
  )
}

export default App
