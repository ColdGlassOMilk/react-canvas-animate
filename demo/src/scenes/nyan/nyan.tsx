import { useRef, useState } from 'react'
import Canvas, {
  Context2D,
  CanvasObjectManager,
  ImageLoader,
} from 'react-canvas-animate'

import { NyanCat, CatManager } from '../../objects/NyanCat'
import { Simple, SimpleState } from '../../objects/Simple'

function Nyan() {
  const [fullscreen, setFullscreen] = useState(true)
  const catRef = useRef<CatManager>()
  const objectRef = useRef<CanvasObjectManager<Simple, SimpleState>>()

  const init = (ctx: Context2D) => {
    // Method 1
    const catMan = (catRef.current = new CatManager(ctx))
    objectRef.current = new CanvasObjectManager<Simple, SimpleState>(ctx, [
      [Simple, { images: new ImageLoader() }],
    ])

    // objectRef.current.createList([
    //   [Simple, {}],
    //   [Simple, {}],
    // ])

    catMan.create(NyanCat, { isAwesome: true, x: 50, y: 50 })

    // Method 2
    // objectRef.current = new CatManager(ctx, [[NyanCat, { x: 50, y: 50 }]])
  }

  const render = (ctx: Context2D, time: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    catRef.current?.render({ deltaTime: time })
  }

  const update = (ctx: Context2D, time: number) => {
    catRef.current?.update({ deltaTime: time })
    objectRef.current?.update({})
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
      // hideCursor={fullscreen}
    />
  )
}

export default Nyan
