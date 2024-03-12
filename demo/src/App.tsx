// import { useRef } from 'react'
// import GLRenderer from './components/GLRenderer'
// import { WebGL } from 'react-canvas-animate'
// import { RenderableObjectManager as ObjectManager } from './objects/managers/RenderableObjectManager'
// import { ClearScreen } from './objects/sandbox/ClearScreen'

// function App() {
//   const objects = useRef<ObjectManager>()

//   const init = (gl: WebGL) => {
//     objects.current = new ObjectManager(gl)
//     objects.current.create(ClearScreen, {})
//   }

//   const render = (gl: WebGL) => {
//     objects.current?.render()
//   }

//   return <GLRenderer postInit={init} render={render} fullscreen />
// }

import Renderer from './components/Renderer'

function App() {
  return <Renderer width={1024} height={768} />
}

export default App
