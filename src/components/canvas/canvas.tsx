import React, { useRef, useCallback, useEffect } from 'react'

export type CanvasContext =
  | CanvasRenderingContext2D
  | WebGLRenderingContext
  | WebGL2RenderingContext
  | ImageBitmapRenderingContext

interface CanvasProps<T extends CanvasContext = CanvasRenderingContext2D>
  extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  init?: (canvas: HTMLCanvasElement) => T
  render?: (context: T, deltaTime: number) => void
  update?: (context: T, deltaTime: number) => void
  fullscreen?: boolean
  frameRate?: number
}

const Canvas = <T extends CanvasContext = CanvasRenderingContext2D>({
  init,
  render,
  update,
  fullscreen,
  frameRate,
  children,
  ...rest
}: CanvasProps<T>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<T>()
  const renderTimeRef = useRef<number>(performance.now())
  const updateTimeRef = useRef<number>(performance.now())

  //
  // Init Callback - Sets up context
  //
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    if (init) {
      contextRef.current = init(canvas)
    } else {
      contextRef.current = canvas.getContext('2d') as T
    }
  }, [init])

  //
  // Render Callback
  //
  const renderCallback = useCallback(() => {
    const context = contextRef.current
    if (!context) return

    const currentTime = performance.now()
    const deltaTime = currentTime - renderTimeRef.current
    renderTimeRef.current = currentTime

    if (render) render(context, deltaTime)
  }, [render])

  //
  // Render Loop
  //
  useEffect(() => {
    let animationFrame: number

    const renderLoop = () => {
      animationFrame = requestAnimationFrame(renderLoop)
      renderCallback()
    }

    renderLoop()

    return () => cancelAnimationFrame(animationFrame)
  }, [renderCallback])

  //
  // Update Loop
  //
  useEffect(() => {
    if (!update) return

    const updateLoop = () => {
      const context = contextRef.current
      if (!context || !update) return

      const currentTime = performance.now()
      const deltaTime = currentTime - updateTimeRef.current
      updateTimeRef.current = currentTime

      update(context, deltaTime)

      setTimeout(updateLoop, 1000 / (frameRate || 60))
    }

    updateLoop()

    return () => {} // No cleanup needed for setTimeout
  }, [update])

  //
  // Handle Fullscreen Mode & Resize Events
  //
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      if (fullscreen) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      } else {
        // reset dimensions somehow, use props? undefined?
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    return () => window.removeEventListener('resize', resizeCanvas)
  }, [fullscreen])

  return (
    <canvas
      ref={canvasRef}
      style={{
        backgroundColor: 'magenta',
        position: fullscreen ? 'fixed' : undefined,
      }}
      {...rest}
    >
      {children}
    </canvas>
  )
}

export default Canvas
