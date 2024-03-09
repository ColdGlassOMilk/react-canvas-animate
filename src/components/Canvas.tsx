import React, { useRef, useCallback, useEffect } from 'react'

import type {
  CanvasContext,
  CanvasProps,
  CanvasState,
  Context2D,
} from './Canvas.d'

const Canvas = <T extends CanvasContext = Context2D>({
  init,
  render,
  update,
  type,
  attributes,
  events,
  fullscreen,
  hideCursor,
  frameRate,
  gridSize,
  nogrid,
  children,
  ...rest
}: CanvasProps<T>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<T>()
  const renderTimeRef = useRef<number>(performance.now())
  const updateTimeRef = useRef<number>(performance.now())
  const stateRef = useRef<CanvasState | null>(null)

  // Callbacks
  // --------------

  // Callback for rendering canvas content
  const renderCallback = useCallback(() => {
    const context = contextRef.current
    if (!context) return

    const currentTime = performance.now()
    const deltaTime = currentTime - renderTimeRef.current
    renderTimeRef.current = currentTime

    if (render) render(context, deltaTime)
  }, [render])

  // Callback for rendering loop
  const renderLoop = useCallback(() => {
    let animationFrame: number

    const loop = () => {
      animationFrame = requestAnimationFrame(loop)
      renderCallback()
    }

    loop()

    return () => cancelAnimationFrame(animationFrame)
  }, [renderCallback])

  // Callback for updating canvas content
  const updateLoop = useCallback(() => {
    if (!update) return

    let intervalID: number

    const loop = () => {
      const context = contextRef.current
      if (!context) return

      const currentTime = performance.now()
      const deltaTime = currentTime - updateTimeRef.current
      updateTimeRef.current = currentTime

      update(context, deltaTime)
    }

    loop()
    intervalID = setInterval(loop, 1000 / (frameRate || 60))

    return () => clearInterval(intervalID)
  }, [update, frameRate])

  // Callback for handling canvas resize
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    if (fullscreen) {
      if (!stateRef.current) {
        stateRef.current = {
          width: canvas.width,
          height: canvas.height,
          position: canvas.style.position,
          top: canvas.style.top,
          left: canvas.style.left,
        }
      }

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      canvas.style.position = 'fixed'
      canvas.style.top = '0'
      canvas.style.left = '0'
      canvas.focus()
    } else {
      if (stateRef.current) {
        const { width, height, position, top, left } = stateRef.current
        canvas.width = width
        canvas.height = height
        canvas.style.position = position
        canvas.style.top = top
        canvas.style.left = left

        stateRef.current = null
      }
    }
  }, [fullscreen])

  // Callback for handling events
  const eventHandler = useCallback(
    (event: Event) => {
      if (events) events.handleEvent(event)
    },
    [events],
  )

  // Effect Hooks
  // --------------

  // Initialize canvas context
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || contextRef.current) return

    contextRef.current = canvas.getContext(type || '2d', attributes) as T

    if (init) init(contextRef.current)
  }, [init])

  // Start rendering loop
  useEffect(renderLoop, [])

  // Start update loop
  useEffect(updateLoop, [])

  // Handle fullscreen mode & resize events
  useEffect(() => {
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    return () => window.removeEventListener('resize', resizeCanvas)
  }, [fullscreen, resizeCanvas])

  // Handle canvas events
  useEffect(() => {
    const context = contextRef.current
    if (!events || !context) return

    const addEventListeners = () => {
      events.eventTypes.forEach((eventType) => {
        context.canvas.addEventListener(eventType, eventHandler)
      })
    }

    const removeEventListeners = () => {
      events.eventTypes.forEach((eventType) => {
        context.canvas.removeEventListener(eventType, eventHandler)
      })
    }

    addEventListeners()

    return () => removeEventListeners()
  }, [events, eventHandler])

  const canvasStyle: React.CSSProperties = {
    cursor: hideCursor ? 'none' : 'auto',
    outline: 'none', // Hide tab-index border
  }

  gridSize = gridSize ? gridSize : 20
  const gridHalf = gridSize / 2
  const gridStyle: React.CSSProperties = {
    background:
      'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
    backgroundSize: `${gridSize}px ${gridSize}px`,
    backgroundPosition: `0 0, 0 ${gridHalf}px, ${gridHalf}px ${-gridHalf}px, ${-gridHalf}px 0px`,
  }

  return (
    <canvas
      ref={canvasRef}
      tabIndex={0}
      style={nogrid ? canvasStyle : { ...canvasStyle, ...gridStyle }}
      {...rest}
    >
      {children}
    </canvas>
  )
}

export default Canvas
