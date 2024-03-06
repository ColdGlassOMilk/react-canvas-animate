import { useRef } from 'react'
import Canvas, { ImageLoader } from 'react-canvas-animate'
import logo from './nyan.png'

type Context2D = CanvasRenderingContext2D

function Nyan() {
  const imageRef = useRef<ImageLoader>(new ImageLoader())
  const angleRef = useRef(0)
  const scaleRef = useRef(1)

  const angularSpeed = Math.PI / 12
  const colorSpeed = Math.PI * 20
  const scaleSpeed = 1 / 500
  const blurSize = 25

  const init = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d', {
      alpha: true,
      desyncronized: true,
    }) as Context2D

    ctx.shadowBlur = blurSize
    ctx.globalAlpha = 0.5

    imageRef.current.loadImages([logo])

    return ctx
  }

  function rainbowColor(angle: number) {
    // Convert angle to a value between 0 and 1
    angle = ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
    let hue = angle / (2 * Math.PI) // Normalize angle to [0, 1]

    // Calculate the color components
    let red = Math.round(Math.sin((hue - 1 / 3) * colorSpeed) * 127) + 128
    let green = Math.round(Math.sin(hue * colorSpeed) * 127) + 128
    let blue = Math.round(Math.sin((hue + 1 / 3) * colorSpeed) * 127) + 128

    return `rgb(${red},${green},${blue})`
  }

  const render = (ctx: Context2D, time: number) => {
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Save the current state of the context
    ctx.save()

    // Translate the context to the center of the canvas
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2)

    // Rotate the context
    ctx.rotate(angleRef.current)
    ctx.translate(0, (-ctx.canvas.height / 4) * scaleRef.current)
    ctx.scale(scaleRef.current, scaleRef.current)

    ctx.shadowColor = rainbowColor(angleRef.current)

    // Draw the image at the center of the rotated canvas
    const img = imageRef.current.getImage(logo)
    ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height)

    // Restore the context to its original state
    ctx.restore()
  }

  const update = (ctx: Context2D, time: number) => {
    angleRef.current += angularSpeed * (time / 1000)
    if (scaleRef.current > 0) {
      scaleRef.current -= scaleSpeed * (time / 1000)
      ctx.shadowBlur = blurSize / (1 / scaleRef.current)
    }
  }

  return (
    <Canvas
      init={init}
      render={render}
      update={update}
      width={1024}
      height={768}
      // gridSize={40}
      fullscreen
      // nogrid
    />
  )
}

export default Nyan
