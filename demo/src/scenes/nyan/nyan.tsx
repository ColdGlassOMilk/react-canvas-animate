import { useRef } from 'react'
import Canvas, { CanvasObject } from 'react-canvas-animate'

import { NyanCat } from '../../objects/NyanCat'

type Context2D = CanvasRenderingContext2D

function Nyan() {
  const catRef = useRef<CanvasObject>()

  const init = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d', { alpha: true }) as Context2D

    catRef.current = new NyanCat(ctx)

    return ctx
  }

  const render = (ctx: Context2D, time: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    ctx.save()

    catRef.current?.render(time)

    ctx.restore()
  }

  return <Canvas init={init} render={render} width={1024} height={768} fullscreen />
}

export default Nyan
