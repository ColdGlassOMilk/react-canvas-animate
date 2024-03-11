import type { CanvasContext } from '../components/Canvas'

export type ObjectState = Record<string, unknown>
export type ObjectProps = Record<string, unknown>

interface CanvasObjectInterface {
  render?(): void
  update?(): void
}

export abstract class CanvasObject<
  State extends ObjectState = ObjectState,
  Props extends ObjectProps = ObjectProps,
  Context extends CanvasContext = CanvasContext,
> implements CanvasObjectInterface
{
  protected context: Context
  protected state: State = {} as State
  protected props: Props = {} as Props

  constructor(context: Context, state?: State) {
    this.context = context
    this.state = state as State
  }

  callRender(): void {
    this.render()
  }

  callUpdate(_props: Props): void {
    this.props = _props as Props
    this.update()
  }

  render(): void {}
  update(): void {}
}
