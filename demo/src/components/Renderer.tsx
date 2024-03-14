import { useRef } from 'react'
import Canvas, { CanvasProps, Context2D, rgbAngle } from 'react-canvas-animate'

import { Manager } from '../engine/managers'
import { Rect, RectState } from '../engine/entities/primitives/Rect'

interface RendererProps extends CanvasProps {}

export const Renderer = ({ ...props }: RendererProps) => {
  const managerRef = useRef<Manager<RectState>>()
  const blockCount = useRef(0)

  const blockSize = 20

  const init = (ctx: Context2D) => {
    // const { width, height } = ctx.canvas
    const width = 1500
    const height = 1500
    managerRef.current = new Manager<RectState>(ctx)

    for (let y = 0; y < height / blockSize; y++) {
      for (let x = 0; x < width / blockSize; x++) {
        blockCount.current++
        managerRef.current.create(Rect, {
          x: x * blockSize,
          y: y * blockSize,
          width: blockSize,
          height: blockSize,
          fillStyle: rgbAngle(blockCount.current * (blockSize / 4)),
          strokeStyle: rgbAngle(
            blockCount.current * (blockSize / 4) + blockSize / 2,
          ),
          lineWidth: 0.5,
        })
      }
    }
  }

  const render = (ctx: Context2D) => {
    ctx.save()
    ctx.globalAlpha = 0.8
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    managerRef.current?.render()
    ctx.restore()
  }

  return (
    <Canvas init={init} render={render} gridSize={blockSize * 2} {...props} />
  )
}
