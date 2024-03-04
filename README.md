# react-canvas-animate

react-canvas-animate is a minimal HTML Canvas element wrapped in a React component with some additional helpers specifically for animation. Includes support for both Typescript and CommonJS.

## Minimal Usage

The most basic component to start with. By default the canvas will init with a `CanvasRenderingContext2D`

```typescript
import { Canvas } from 'react-canvas-animate'

function App() {
  const render = (ctx: CanvasRenderingContext2D, deltaTime: number) => {
    // Clear the background
    ctx.fillStyle = '#111'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  return <Canvas render={render} />
}

export default App
```

## Advanced Usage

A more comprehensive example initializing an OpenGL context

```typescript
import { Canvas } from 'react-canvas-animate'

type WebGL = WebGLRenderingContext

function App() {
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
      frameRate={60}
      fullscreen
    />
  )
}

export default App
```

## Handle Events

Some functionality is included to attach event listeners to the canvas.

The `events` prop accepts an object structured as

```ts
{
  function (context, event) => void,
  eventTypes: string[]
}
```

#### Example

```ts
import { Canvas } from 'react-canvas-animate'

type canvas2d = CanvasRenderingContext2D

const App = () => {
  const handleMouseMove = (ctx: canvas2d, event: MouseEvent) => {
    const rect = ctx.canvas.getBoundingClientRect()
    console.log({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    console.log(`Key Event: '${event.key}'`)
  }

  const handleEvent = (ctx: canvas2d, event: any) => {
    switch (event.type) {
      case 'mousemove':
        handleMouseMove(ctx, event)
        break
      case 'keydown':
        handleKeyDown(event)
        break
      default:
        console.log('Unprocessed Event: ' + event.type)
    }
  }

  return (
    <Canvas
      events={{
        handleEvent,
        eventTypes: ['click', 'mousemove', 'keydown'],
      }}
    />
  )
}

export default App
```
