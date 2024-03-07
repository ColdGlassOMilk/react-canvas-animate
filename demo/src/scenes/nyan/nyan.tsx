import { useRef } from 'react'
import Canvas, { Context2D, CanvasObjectManager } from 'react-canvas-animate'

import { NyanCat } from '../../objects/NyanCat'

function Nyan() {
  const objectRef = useRef<CanvasObjectManager<Context2D>>()

  const init = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d', { alpha: true }) as Context2D

    objectRef.current = new CanvasObjectManager(ctx)
    objectRef.current.create(NyanCat)

    return ctx
  }

  const render = (ctx: Context2D, time: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    ctx.save()

    objectRef.current?.render(time)

    ctx.restore()
  }

  return <Canvas init={init} render={render} width={1024} height={768} fullscreen />
}

export default Nyan
