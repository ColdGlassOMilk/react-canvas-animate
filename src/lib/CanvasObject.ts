import { CanvasContext, Context2D } from '../components/Canvas'

interface CanvasObjectInterface {
  render?(): void
  update?(): void
}

abstract class CanvasObject<T extends CanvasContext = Context2D> implements CanvasObjectInterface {
  protected context: T
  protected args: any = {}

  constructor(context: T) {
    this.context = context
  }

  callRender(..._args: any[]): void {
    ;[this.args] = _args[0]
    this.render()
  }

  callUpdate(..._args: any[]): void {
    ;[this.args] = _args[0]
    this.update()
  }

  render(): void {}
  update(): void {}
}

export default CanvasObject
