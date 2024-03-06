import { CanvasContext } from '../components/Canvas'

interface CanvasObjectInterface {
  render(deltaTime: number): void
  update(deltaTime: number): void
}

abstract class CanvasObject<T extends CanvasContext = CanvasRenderingContext2D>
  implements CanvasObjectInterface
{
  protected context: T

  constructor(context: T) {
    this.context = context
  }

  abstract render(deltaTime: number): void
  abstract update(deltaTime: number): void
}

export default CanvasObject
