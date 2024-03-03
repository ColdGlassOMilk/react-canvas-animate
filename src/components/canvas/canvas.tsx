import React, { useRef, useCallback, useEffect } from 'react'

interface CanvasProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  render?: (canvas: HTMLCanvasElement, deltaTime: number) => void
  update?: (canvas: HTMLCanvasElement, deltaTime: number) => void
  fullscreen?: boolean
  frameRate?: number
}

const Canvas: React.FC<CanvasProps> = ({
  render,
  update,
  fullscreen,
  frameRate,
  children,
  ...rest
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const renderTimeRef = useRef<number>(performance.now())
  const updateTimeRef = useRef<number>(performance.now())

  //
  // Render Callback
  //
  const renderCallback = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const currentTime = performance.now()
    const deltaTime = currentTime - renderTimeRef.current
    renderTimeRef.current = currentTime

    if (render) render(canvas, deltaTime)
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
      const canvas = canvasRef.current
      if (!canvas || !update) return

      const currentTime = performance.now()
      const deltaTime = currentTime - updateTimeRef.current
      updateTimeRef.current = currentTime

      update(canvas, deltaTime)

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
