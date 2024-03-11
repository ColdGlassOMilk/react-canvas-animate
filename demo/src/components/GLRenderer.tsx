import Canvas, { WebGL, CanvasProps } from 'react-canvas-animate'

interface GLRendererProps extends CanvasProps<WebGL> {
  postInit?: (gl: WebGL) => void
}

function GLRenderer({ postInit, ...props }: GLRendererProps) {
  const init = (gl: WebGL) => {
    const { width, height } = gl.canvas
    gl.viewport(0, 0, width, height)
    gl.clearColor(0.1, 0.1, 0.1, 1)
    gl.enable(gl.DEPTH_TEST)
    if (postInit) postInit(gl)
  }

  return (
    <Canvas<WebGL>
      type='webgl'
      attributes={{ antialias: true }}
      init={init}
      {...props}
    />
  )
}

export default GLRenderer
