import { Context2D, CanvasObject, ImageLoader } from 'react-canvas-animate'

import NyanImage from './images/nyan.png'

export class NyanCat extends CanvasObject<Context2D> {
  private images: ImageLoader
  private frameCount = 0

  constructor(context: Context2D) {
    super(context)
    this.images = new ImageLoader([NyanImage])
  }

  render(): void {
    const img = this.images.getImage(NyanImage)
    this.context.drawImage(img, 0, 0)

    if (this.frameCount++ % 60 === 0) {
      console.log('Render Args', this.args)
    }
  }

  update(): void {
    console.log('Update Args', this.args)
  }
}
