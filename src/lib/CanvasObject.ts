import type { CanvasContext, Context2D } from '../components/Canvas'

export type CanvasObjectState = Record<string, unknown>
export type CanvasObjectProps = Record<string, unknown>

interface CanvasObjectInterface {
  render?(): void
  update?(): void
}

abstract class CanvasObject<
  S extends CanvasObjectState = CanvasObjectState,
  P extends CanvasObjectProps = CanvasObjectProps,
  T extends CanvasContext = Context2D,
> implements CanvasObjectInterface
{
  protected context: T
  protected state: S = {} as S
  protected args: P = {} as P

  constructor(context: T, state?: S) {
    this.context = context
    this.state = state as S
  }

  callRender(_args: P): void {
    this.args = _args as P
    this.render()
  }

  callUpdate(_args: P): void {
    this.args = _args as P
    this.update()
  }

  render(): void {}
  update(): void {}
}

export default CanvasObject
