# react-canvas-animate

react-canvas-animate is a minimal HTML Canvas element wrapped in a React component with some additional helpers specifically for animation. Includes support for both Typescript and CommonJS.

## Getting Started

The most basic component to start with. By default the canvas will init with a `Context2D`

```typescript
import Canvas, { Context2D } from 'react-canvas-animate'

export default function App() {
  const render = (ctx: Context2D, deltaTime: number) => {
    // Clear the background
    ctx.fillStyle = '#111'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  return <Canvas render={render} />
}
```

## Available Props

`CanvasContext` - Specify any of the available HTMLCanvasElement contextTypes - [HTMLCanvasElement Docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext)

Type aliases are available for each of the available context types:

```ts
type Context2D = CanvasRenderingContext2D
type WebGL = WebGLRenderingContext
type WebGL2 = WebGL2RenderingContext
type Bitmap = ImageBitmapRenderingContext

type CanvasContext = Context2D | WebGL | WebGL2 | Bitmap
```

By default, a `Context2D` is created, but you can override this with the `init` callback. For example, to replicate the default behavior:

```tsx
import Canvas, { Context2D } from 'react-canvas-animate'

export default function App() {
  // Return the context as the expected type
  const init = (canvas: HTMLCanvasElement) => {
    const context = canvas.getContext('2d', {
      alpha: true,
      desyncronized: true,
    }) as Context2D

    // Perform other init functions here

    return context
  }

  // Callbacks will receive the specified context type
  const render = (context: Context2D, deltaTime: number) => {}

  return (
    <Canvas<Context2D> // Define the context type that will be used
      init={init}
      render={render}
    />
  )
}
```

#### Callbacks

- `init` (canvas: HTMLCanvasElement) => CanvasContext

  Init is used to setup a custom rendering context, return the context to be used for rendering

- `render` (context: CanvasContext, deltaTime: number) => void

  Render is automatically synced to the display refresh rate

- `update` (context: CanvasContext, deltaTime: number) => void

  Update is called by default at 60 times per second, update loop is de-coupled from rendering. Adjust using the `frameRate` prop

- `events` { handleEvent: (event: Event) => void, eventTypes: string[] }

  Event listener callback (see "Handle Events" section below)

#### Props

All available `HTMLCanvasElement` props are passed to the underlying canvas element. So things like `height`, `width`, `style`, and `children` can all be passed.

Additional props are defined as:

- `fullscreen` boolean

  Defaults to false. Setting true will adjust canvas dimensions to window inner dimensions. Position will also become fixed. Override with `style={{ position: 'absolute' }}` or `position: undefined`

- `nogrid` boolean

  Setting to true will disable the tiled grid background. _Note: The grid is generated interally through styles, and will not in any way affect image rendering_

- `gridSize` number

  Default is 20. Size in pixels for the tiled grid background.

- `frameRate` number

  Default is 60. Does not affect actual render framerate as that is locked to screen refresh rate. Only affects timeout of update callback.

## Example

A more comprehensive example initializing an OpenGL context

```typescript
import Canvas, { WebGL } from 'react-canvas-animate'

export default function App() {
  const init = (canvas: HTMLCanvasElement) => {
    const gl = canvas.getContext('webgl', {
      antialias: true,
      desyncronized: true
    }) as WebGL

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.clearColor(0.1, 0.1, 0.1, 1.0)
    gl.enable(gl.DEPTH_TEST)

    return gl
  }

  const render = (gl: WebGL, deltaTime: number) => {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  }

  const update = (gl: WebGL, deltaTime: number) => {
    // Perform calculations
  }

  return (
    <Canvas<WebGL>
      init={init}
      render={render}
      update={update}
      fullscreen
    />
  )
}
```

## Handle Events

Some functionality is included to attach event listeners to the canvas.

The `events` prop accepts an object structured as

```ts
{
  handleEvent: (event: Event) => void,
  eventTypes: string[]
}
```

#### Example

```ts
import { useState, useRef } from 'react'
import Canvas, { Context2D } from 'react-canvas-animate'

export default function App() {
  const [fullscreen, setFullscreen] = useState(false)
  const cursorRef = useRef({ x: 0, y: 0 })

  const render = (ctx: Context2D, time: number) => {
    // Clear the screen
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Draw a square at the cursor position
    ctx.fillStyle = 'red'
    ctx.fillRect(
      cursorRef.current.x - 10,
      cursorRef.current.y - 10,
      20,
      20,
    )
  }

  const handleMouseMove = (event: MouseEvent) => {
    cursorRef.current = {
      x: event.offsetX,
      y: event.offsetY
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key.toLowerCase()) {
      case 'escape':
        setFullscreen(false)
        break
      case 'f':
        setFullscreen(!fullscreen)
        break
    }
  }

  const handleEvent = (event: Event) => {
    switch (event.type) {
      case 'keydown':
        handleKeyDown(event as KeyboardEvent)
        break
      case 'mousemove':
        handleMouseMove(event as MouseEvent)
        break
    }
  }

  return (
    <Canvas
      events={{ handleEvent, eventTypes: ['keydown', 'mousemove'] }}
      fullscreen={fullscreen}
      render={render}
    />
  )
}
```

## Loading Images

A helper class is included to ease in loading image data programmatically. See example usage below.

`ImageLoader` class

- `constructor` (string[] | null)

- `loadImages` (string[]) => Promise\<HTMLImageElement[]\>

- `loadImage` (string) => Promise\<HTMLImageElement\>

- `getImageList` () => string[]

- `getImages` () => HTMLImageElement[]

- `getImage` (string) => HTMLImageElement

  Returns the specified image. If image is not loaded, returns an empty Image() instance.

## CanvasObject & CanvasObjectManager

Some rudimentary classes are provided to better encapsulate objects. Like the Canvas component, they take a generic `CanvasContext` type (default is `Context2D`)

You can extend these classes to suit your needs (e.g. Scenes, Layers, Components, etc.) or instantiate them directly.

#### Example

Let's create an object to represent Nyan cat using a `CanvasObject`

```ts
import { Context2D, CanvasObject, ImageLoader } from 'react-canvas-animate'

import NyanImage from './nyan.png'

export class NyanCat extends CanvasObject<Context2D> {
  private images: ImageLoader

  constructor(context: Context2D) {
    super(context)
    this.images = new ImageLoader([NyanImage])
  }

  render(deltaTime: number): void {
    const img = this.images.getImage(NyanImage)
    this.context.drawImage(img, 0, 0)
  }
}
```

And then render it in our component using the `CanvasObjectManager`:

```ts
import { useRef } from 'react'
import Canvas, { Context2D, CanvasObjectManager } from 'react-canvas-animate'

import { NyanCat } from '@/objects/NyanCat'

export default function Nyan() {
  const objectRef = useRef<CanvasObjectManager<Context2D>>()

  const init = (canvas: HTMLCanvasElement) => {
    const context = canvas.getContext('2d', { alpha: true }) as Context2D

    objectRef.current = new CanvasObjectManager(context)

    // Use factory method to instantiate our NyanCat object
    objectRef.current.create(NyanCat)

    return context
  }

  const render = (context: Context2D, deltaTime: number) => {
    context.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    objectRef.current?.render(deltaTime)
  }

  return <Canvas init={init} render={render} width={1024} height={768} fullscreen />
}
```

## Development

Contributions are welcomed and encouraged. Please submit a pull request or open an issue if you encounter issues or have feature requests.

To get started, install react and react-dom globally, then link them to the package

```bash
npm install -g react react-dom
npm link react
npm link react-dom
```

Next, link our local package, then link it inside the demo app

```bash
npm install
npm link
cd demo
npm link react-canvas-animate
cd ..
```

At this point, Typescript should watch for code changes, and launch the demo create-react-app

```bash
npm start
```
