import {
  CanvasObject,
  CanvasObjectState,
  Context2D,
  ImageLoader,
} from 'react-canvas-animate'

export interface SimpleState extends CanvasObjectState {
  images: ImageLoader
}

export class Simple extends CanvasObject<SimpleState> {
  update() {
    console.log('Simple update', this.state)
  }
}