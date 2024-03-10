import { CanvasObject, ImageLoader } from 'react-canvas-animate'

export interface SimpleState extends CanvasObject.State {
  images: ImageLoader
}

export class Simple extends CanvasObject.Base<SimpleState> {
  update() {
    // console.log('Simple update', this.state)
  }
}
