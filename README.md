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
  function (event: Event) => void,
  eventTypes: string[]
}
```

#### Example

```ts
import { Canvas } from "react-canvas-animate";

type Context2D = CanvasRenderingContext2D;

function App() {
  const cursorPos = { x: 0, y: 0 };

  const render = (ctx: Context2D, time: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "red";

    const rect = ctx.canvas.getBoundingClientRect();
    ctx.fillRect(
      cursorPos.x - 10 - rect.left,
      cursorPos.y - 10 - rect.top,
      20,
      20,
    );
  };

  const handleMouseMove = (event: MouseEvent) => {
    cursorPos.x = event.clientX;
    cursorPos.y = event.clientY;
  };

  const handleEvent = (event: Event) => {
    switch (event.type) {
      case "mousemove":
        handleMouseMove(event as MouseEvent);
        break;
    }
  };

  return (
    <Canvas
      events={{ handleEvent, eventTypes: ["mousemove"] }}
      render={render}
      fullscreen
    />
  );
}

export default App;
```
