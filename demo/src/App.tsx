import { useRef } from 'react'
import GLRenderer from './components/GLRenderer'
import { WebGL } from 'react-canvas-animate'
import { RenderableObjectManager as ObjectManager } from './objects/managers/RenderableObjectManager'
import { ClearScreen } from './objects/sandbox/ClearScreen'

function App() {
  const objects = useRef<ObjectManager>()

  const init = (gl: WebGL) => {
    objects.current = new ObjectManager(gl)
    objects.current.create(ClearScreen, {})
  }

  const render = (gl: WebGL) => {
    objects.current?.render()
  }

  return <GLRenderer postInit={init} render={render} fullscreen />
}

export default App
