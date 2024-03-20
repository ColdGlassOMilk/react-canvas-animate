<h1 align="center">🎞️ Welcome to react-canvas-animate 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/react-canvas-animate" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/react-canvas-animate.svg">
  </a>
  <a href="https://github.com/ColdGlassOMilk/react-canvas-animate/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/ColdGlassOMilk/react-canvas-animate/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/ColdGlassOMilk/react-canvas-animate" />
  </a>
</p>

> React canvas wrapper with functionality for animation and event handling.

## Requirements

- `react >= 16`
- `react-dom >= 16`

## Install

Add to an existing react project.

```sh
npm add react-canvas-animate
```

## Getting Started

The most basic component to start with. By default the canvas will init with a `Context2D`

```typescript
import Canvas, { Context2D } from 'react-canvas-animate'

export default function App() {
  const render = (ctx: Context2D) => {
    const { width, height } = ctx.canvas
    ctx.fillStyle = '#111'
    ctx.fillRect(0, 0, width, height)
  }

  return <Canvas render={render} />
}
```

## Props

`CanvasContext` - Specify any of the available HTMLCanvasElement contextTypes - [HTMLCanvasElement Docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext)

Type aliases are available for each of the available context types:

```ts
type CanvasContext = Context2D | WebGL | WebGL2 | Bitmap
```

By default, a `Context2D` is created, but you can specify any type along with it's respective attributes using the `type` and `attributes` props, here is an example:

```tsx
import Canvas, { Context2D } from 'react-canvas-animate'

export default function App() {
  return (
    <Canvas<Context2D> // Define the CanvasContext that will be used
      type='2d' // '2d' | 'webgl' | 'webgl2' | 'bitmaprenderer'
      attributes={{ alpha: true }}
    />
  )
}
```

A more comprehensive example initializing an OpenGL context

```ts
import Canvas, { WebGL } from 'react-canvas-animate'

export default function App() {
  const init = (gl: WebGL) => {
    const { width, height } = gl.canvas
    gl.viewport(0, 0, width, height)
    gl.clearColor(0.1, 0.1, 0.1, 1.0)
    gl.enable(gl.DEPTH_TEST)
  }

  const render = (gl: WebGL) => {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  }

  const update = (gl: WebGL, deltaTime: number) => {
    // Perform calculations
  }

  return (
    <Canvas<WebGL>
      type='webgl'
      attributes={{ antialias: true }}
      init={init}
      render={render}
      update={update}
      fullscreen
    />
  )
}
```

#### Callbacks

- `init` (context: CanvasContext) => void

  Init is called once after the component has mounted and context has been initialized

- `render` (context: CanvasContext, deltaTime: number) => void

  Render is automatically synced to the display refresh rate

- `update` (context: CanvasContext, deltaTime: number) => void

  Update is called by default at 60 times per second, update loop is de-coupled from rendering. Adjust using the `frameRate` prop

- `events` { handleEvent: (event: Event) => void, eventTypes: string[] }

  Event listener callback (see "Handle Events" section below).

- `documentEvents` { handleEvent: (event: Event) => void, eventTypes: string[] }

- `windowEvents` { handleEvent: (event: Event) => void, eventTypes: string[] }

  Functions the same as `events`, but attaches to the document/window instead of the canvas element.

#### Props

All available `HTMLCanvasElement` props are passed to the underlying canvas element. So things like `height`, `width`, `style`, and `children` can all be passed.

Additional props are defined as:

- `type` ContextType: `'2d' | 'webgl' | 'webgl2' | 'bitmaprenderer'`

  Specifies what type of context should be created.

- `attributes` Object - Collection of any permitted context attributes to be passed on init

- `hideCursor` boolean

- `fullscreen` boolean

  Defaults to false. Setting true will adjust canvas dimensions to window inner dimensions, and handle resize events automatically. Position will also become fixed.

- `nogrid` boolean

  Setting to true will disable the tiled grid background. _Note: The grid is generated interally through styles, and will not in any way affect image rendering_

- `gridOffset` _{ x: number, y: number }_

  Control the background grid positioning. Useful for zoom & scroll operations.

- `gridSize` number

  Default is 20. Size in pixels for the tiled grid background.

- `frameRate` number

  Default is 60. Does not affect actual render framerate as that is locked to screen refresh rate. Only affects timeout of update callback.

## Handle Events

Standard event hooks work as usual:

```ts
<Canvas onClick={() => alert('Click')} />
```

Some functionality is also included to attach a primary event listener to the canvas.

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
  const [fullscreen, setFullscreen] = useState(true)
  const cursorRef = useRef({ x: 0, y: 0 })

  const render = (ctx: Context2D) => {
    // Clear the screen
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Draw a square at the cursor position
    ctx.fillStyle = 'red'
    ctx.fillRect(
      cursorRef.current.x - 10,
      cursorRef.current.y - 10,
      20,
      20
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
      documentEvents={{ handleEvents, eventTypes: [] }}
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

## CanvasObject

`CanvasObject` is provided to better encapsulate things. It's highly flexible and can be extended to suit your needs (e.g. Scenes, Layers, Components, etc.)

- `CanvasObject` _namespace_

  - `Base` _class_ CanvasObject `<State, Props, Context>`

    - `constructor(context: CanvasContext, state: CanvasObject.State)`
    - `this.context` Provides access to the CanvasContext passed during init
    - `this.state` Initial state values
    - `this.props` Access values passed during update as props
    - `render(): void` _(optional)_ abstract callback method
    - `update(): void`_(optional)_ abtract callback method. `this.props` is updated by `Manager` prior to callback

  - `Manager` CanvasObjectManager `State, Props, CanvasContext, CanvasObject>`

    - `constructor(context: CanvasContext, objects?: type T[])`
    - `this.objects` _CanvasObject[]_ Access collection of managed objects
    - `render` _void_ Internally calls render() method on all objects
    - `update(props: Props)` _void_ Internally calls update() method on all objects

  - `Component` _abstract class_

  - `Entity` _abstract class_

    - `attachComponents() => Record<string, Component>` Providing a collection of Component types will instantiate the underlying CanvasObjects passing through (context, state). You can then access the components under `this.components`

  - `State` _Type_ Record<string, unknown> _{}_
  - `Props` _Type_ Record<string, unknown> _{}_

#### Example

Let's create an object to represent Nyan cat using a `CanvasObject`

```ts
import { CanvasObject, Context2D, ImageLoader } from 'react-canvas-animate'

import NyanImage from './nyan.png'

// First, let's define the initial state
interface CatState extends CanvasObject.State {
  isAwesome: boolean
}

// Then we'll define the types required in props
interface CatProps extends CanvasObject.Props {
  deltaTime: number
}

// Then we'll build our custom object
// We're loading the image directly instead of passing it for sake of brevity
export class Cat extends CanvasObject.Base<CatState, CatProps> {
  private images: ImageLoader

  constructor(context: Context2D, state: CatState) {
    super(context, state)
    this.images = new ImageLoader([NyanImage])
  }

  render(): void {
    // const ctx = this.context
    // const { width, height } = ctx.canvas
    const img = this.images.getImage(NyanImage)
    this.context.drawImage(img, 0, 0)
  }

  update(): void {
    console.log('Cat State', this.state) // { isAwesome: true }
    console.log('Cat Props', this.props) // { deltaTime: 1000 }
  }
}

// Lastly, we'll build a custom Manager for our object type
export class CatManager extends CanvasObject.Manager<
  CatState,
  CatProps,
  Context2D,
  Cat
> {}
```

And then render it in our component using the `CatManager` that we created:

```ts
import { useRef } from 'react'
import Canvas, { Context2D } from 'react-canvas-animate'

import { Cat, CatManager } from '../objects/Cat'

export default function Nyan() {
  const catMan = useRef<CatManager>()

  const init = (ctx: Context2D) => {
    const cats = (catMan.current = new CatManager(ctx))

    // Use factory method to instantiate our Cat object
    cats.create(Cat, { isAwesome: true })
  }

  const render = (ctx: Context2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    catMan.current?.render()
  }

  const update = (ctx: Context2D, deltaTime: number) => {
    catMan.current?.update({ deltaTime })
  }

  return (
    <Canvas init={init} render={render} update={update} frameRate={1} />
  )
}
```

Get Creative! These classes lend themselves to being quite flexible.

## Component/Entity

The `CanvasObject` module also includes some base component/entity classes, here is a basic example:

```typescript
import { CanvasObject } from 'react-canvas-animate'

// First, we'll define a component state to represent Style
interface StyleState extends CanvasObject.State {
  style?: {
    fill?: string
  }
}

// Then we'll pass that state type to a component class
class StyleComponent extends CanvasObject.Component<StyleState> {
  render() {
    const ctx = this.context
    ctx.fillStyle = this.state.style?.fill || ctx.fillStyle
  }
}

// Next, we'll define an Entity state to represent a rectangle
// We'll extend StyleState to include the component options
interface RectState extends CanvasObject.State, StyleState {
  x: number
  y: number
  width: number
  height: number
}

// Then, we'll define our Rect Entity class
class Rect extends CanvasObject.Entity<RectState> {
  useComponents() {
    return {
      style: StyleComponent,
    }
  }

  render() {
    const { x, y, width, height } = this.state
    const ctx = this.context
    this.components.style.render()
    ctx.fillRect(x, y, width, height)
  }
}

// Lastly, we'll make a custom manager for our Entity class
class RectManager extends CanvasObject.Manager<RectState> {}

// Then we can use the factory method to render a red rectangle
const rectManager = new RectManager()
rectManager.create(Rect, {
  x: 50,
  y: 50,
  width: 100,
  height: 100,
  style: {
    fill: 'red',
  },
})

// ...
rectManager.render()
```

## Helpers

- `rgbAngle(angle: number) => string` 🌈 Takes any number and provides an rgb color (scale 0-360)

  ```
  ctx.shadowColor = rgbAngle(angle)
  ```

## Contributing

Contributions are welcomed and encouraged.

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

## Author

👤 **Nicholaus Brabant**

- Github: [@ColdGlassOMilk](https://github.com/ColdGlassOMilk)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2024 [Nicholaus Brabant](https://github.com/ColdGlassOMilk).<br />
This project is [MIT](https://github.com/ColdGlassOMilk/react-canvas-animate/blob/master/LICENSE) licensed.

---
