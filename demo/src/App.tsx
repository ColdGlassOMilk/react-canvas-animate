import { DemoScene } from './scenes/demo'
import Nyan from './scenes/nyan/nyan'

import Canvas from 'react-canvas-animate'

function App() {
  return (
    <>
      <DemoScene />
      <Nyan />
      {/* <Canvas style={{ border: '10px red solid' }} /> */}
    </>
  )
}

export default App
