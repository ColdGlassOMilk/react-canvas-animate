import { useRef, useState } from 'react'
import Canvas, { Context2D, CanvasObjectManager } from 'react-canvas-animate'

import { NyanCat } from '../../objects/NyanCat'

function Nyan() {
  const [fullscreen, setFullscreen] = useState(true)
  const objectRef = useRef<CanvasObjectManager>()

  const init = (ctx: Context2D) => {
    const objects = (objectRef.current = new CanvasObjectManager(ctx))

    objects.create(NyanCat)
  }

  const render = (ctx: Context2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    objectRef.current?.render()
  }

  const update = (ctx: Context2D, time: number) => {
    objectRef.current?.update({ deltaTime: time, isFabulous: true })
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key.toUpperCase()) {
      case 'F':
        setFullscreen(!fullscreen)
        break
    }
  }

  const handleEvent = (event: Event) => {
    switch (event.type) {
      case 'keydown':
        handleKeyDown(event as KeyboardEvent)
        break
    }
  }

  return (
    <Canvas
      events={{ handleEvent, eventTypes: ['keydown'] }}
      init={init}
      render={render}
      update={update}
      frameRate={1}
      fullscreen={fullscreen}
    />
  )
}

export default Nyan
