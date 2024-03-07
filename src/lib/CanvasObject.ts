import { CanvasContext, Context2D } from '../components/Canvas'

interface CanvasObjectInterface {
  render?(deltaTime?: number): void
  update?(deltaTime?: number): void
}

abstract class CanvasObject<T extends CanvasContext = Context2D> implements CanvasObjectInterface {
  protected context: T

  constructor(context: T) {
    this.context = context
  }

  render(_deltaTime?: number): void {}
  update(_deltaTime?: number): void {}
}

export default CanvasObject
