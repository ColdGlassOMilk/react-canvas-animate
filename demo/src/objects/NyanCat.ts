import { Context2D, ImageLoader, CanvasObject } from 'react-canvas-animate'

import NyanImage from './images/nyan.png'

interface NyanState extends CanvasObject.State {
  frameCount?: number
  isAwesome?: boolean
  x: number
  y: number
}

interface NyanProps extends CanvasObject.Props {
  deltaTime: number
}

export class NyanCat extends CanvasObject.Base<NyanState, NyanProps> {
  private images: ImageLoader

  constructor(context: Context2D, state: NyanState) {
    super(context, state)
    this.images = new ImageLoader([NyanImage])
  }

  render(): void {
    const img = this.images.getImage(NyanImage)
    this.context.drawImage(img, this.state.x, this.state.y)

    // if (this.state.frameCount % 60 === 0) {
    //   console.log('Render Args', this.args)
    // }
  }

  update(): void {
    // console.log('Update Args', this.args)
    // console.log('Nyan State', this.state)

    this.state.frameCount = (this.state.frameCount || 0) + 1
  }
}

export class CatManager extends CanvasObject.Manager<
  NyanCat,
  NyanState,
  NyanProps
> {}
