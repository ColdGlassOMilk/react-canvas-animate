import { useRef } from 'react'
import Canvas, { Context2D, CanvasObjectManager } from 'react-canvas-animate'

import { NyanCat } from '../../objects/NyanCat'

function Nyan() {
  const objectRef = useRef<CanvasObjectManager>()

  const init = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d', { alpha: true }) as Context2D

    const objects = (objectRef.current = new CanvasObjectManager(ctx))

    objects.create(NyanCat)

    return ctx
  }

  const render = (ctx: Context2D, time: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    objectRef.current?.render(time)
  }

  return <Canvas init={init} render={render} fullscreen />
}

export default Nyan
