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
import { useState, useRef } from "react";
import { Canvas } from "react-canvas-animate";

type Context2d = CanvasRenderingContext2D;
type Vec2D = {
  x: number;
  y: number;
};

function App() {
  const [fullscreen, setFullscreen] = useState<boolean>(true);
  const cursorPosition = useRef<Vec2D>({ x: 0, y: 0 });

  const render = (ctx: Context2d, time: number) => {
    // Clear the background
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw a square at the cursor position
    const clientRect = ctx.canvas.getBoundingClientRect();
    ctx.fillStyle = "aqua";
    ctx.fillRect(
      cursorPosition.current.x - 5 - clientRect.left,
      cursorPosition.current.y - 5 - clientRect.top,
      10,
      10,
    );
  };

  const handleMouseMove = (event: MouseEvent) => {
    cursorPosition.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "f":
        setFullscreen(!fullscreen);
        break;
    }
  };

  const handleEvent = (event: Event) => {
    switch (event.type) {
      case "keydown":
        handleKeyDown(event as KeyboardEvent);
        break;
      case "mousemove":
        handleMouseMove(event as MouseEvent);
        break;
    }
  };

  return (
    <Canvas
      events={{ handleEvent, eventTypes: ["keydown", "mousemove"] }}
      fullscreen={fullscreen}
      render={render}
    />
  );
}

export default App;
```
