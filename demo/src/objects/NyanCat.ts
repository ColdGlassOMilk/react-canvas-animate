import { CanvasObject, ImageLoader } from 'react-canvas-animate'

import NyanImage from './nyan.png'

type Context2D = CanvasRenderingContext2D

export class NyanCat extends CanvasObject<Context2D> {
  private images: ImageLoader

  constructor(context: Context2D) {
    super(context)
    this.images = new ImageLoader([NyanImage])
  }

  render(deltaTime: number): void {
    const img = this.images.getImage(NyanImage)
    this.context.drawImage(img, 0, 0)
  }

  // update(deltaTime: number): void {}
}
