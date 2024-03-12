import React, { useRef, useCallback, useEffect } from 'react'

export type Context2D = CanvasRenderingContext2D
export type WebGL = WebGLRenderingContext
export type WebGL2 = WebGL2RenderingContext
export type Bitmap = ImageBitmapRenderingContext
export type CanvasContext = Context2D | WebGL | WebGL2 | Bitmap
export type ContextType = '2d' | 'webgl' | 'webgl2' | 'bitmaprenderer'

export interface CanvasEventCallback {
  handleEvent(event: Event): void
  eventTypes: string[]
}

export interface CanvasProps<Context extends CanvasContext = Context2D>
  extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  init?: (context: Context) => void
  render?: (context: Context, deltaTime: number) => void
  update?: (context: Context, deltaTime: number) => void
  type?: ContextType
  attributes?: Record<string, unknown>
  events?: CanvasEventCallback
  documentEvents?: CanvasEventCallback
  fullscreen?: boolean
  hideCursor?: boolean
  frameRate?: number
  gridSize?: number
  nogrid?: boolean
}

export interface CanvasState {
  width: number
  height: number
  position: string
  top: string
  left: string
}

const Canvas = <Context extends CanvasContext = Context2D>({
  init,
  render,
  update,
  type,
  attributes,
  events,
  documentEvents,
  fullscreen,
  hideCursor,
  frameRate,
  gridSize,
  nogrid,
  children,
  ...rest
}: CanvasProps<Context>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<Context>()
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

    if (frameRate !== 0) {
      let interval = Math.max(0.01, Math.min(1000, 1000 / (frameRate || 60)))
      intervalID = setInterval(loop, interval)
    }

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

  // Callback for handling document events
  const documentEventHandler = useCallback(
    (event: Event) => {
      if (documentEvents) documentEvents.handleEvent(event)
    },
    [documentEvents],
  )

  // Effect Hooks
  // --------------

  // Initialize canvas context
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || contextRef.current) return

    try {
      contextRef.current = canvas.getContext(
        type || '2d',
        attributes,
      ) as Context
    } catch (error) {
      if (type === 'webgl') {
        console.warn(
          "WebGL context initialization failed, falling back to 'experimental-webgl'",
        )
        try {
          contextRef.current = canvas.getContext(
            'experimental-webgl',
            attributes,
          ) as Context
        } catch (error) {
          console.error('Experimental WebGL initialization failed:', error)
          return
        }
      } else {
        console.error('Context initialization failed:', error)
        return
      }
    }

    if (init && contextRef.current) init(contextRef.current)
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
  }, [fullscreen])

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

  // Handle document events
  useEffect(() => {
    const context = contextRef.current
    if (!documentEvents || !context) return

    const addEventListeners = () => {
      documentEvents.eventTypes.forEach((eventType) => {
        document.addEventListener(eventType, documentEventHandler)
      })
    }

    const removeEventListeners = () => {
      documentEvents.eventTypes.forEach((eventType) => {
        document.removeEventListener(eventType, documentEventHandler)
      })
    }

    addEventListeners()

    return () => removeEventListeners()
  }, [documentEvents, documentEventHandler])

  // Build canvas styles
  // --------------

  const getCanvasStyles = (): React.CSSProperties => {
    // Base styles
    const baseStyle: React.CSSProperties = {
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

    const currentStyle = { ...rest.style } // User defined styles

    const mergedStyle = nogrid
      ? { ...baseStyle, ...currentStyle } // No grid
      : { ...baseStyle, ...gridStyle, ...currentStyle } // With grid

    return mergedStyle
  }

  // Component
  // --------------

  return (
    <canvas
      ref={canvasRef}
      tabIndex={0}
      onContextMenu={(e) => e.preventDefault()}
      {...rest}
      style={getCanvasStyles()}
    >
      {children}
    </canvas>
  )
}

export default Canvas
