import { CanvasObject } from 'react-canvas-animate'

export interface StyleState extends CanvasObject.State {
  fillStyle?: string
  strokeStyle?: string
  lineWidth?: number
  shadowBlur?: number
  shadowColor?: string
  shadowOffsetX?: number
  shadowOffsetY?: number
}

export class Style extends CanvasObject.Component<StyleState> {
  // constructor(context: Context2D, state: StyleState) {
  //   super(context, state)
  //   this.state = {
  //     fillStyle: 'magenta',
  //     ...state,
  //   }
  // }

  /* eslint react/require-render-return: 0 */
  render(): void {
    const ctx = this.context
    ctx.fillStyle = this.state.fillStyle || ctx.fillStyle
    ctx.strokeStyle = this.state.strokeStyle || ctx.strokeStyle
    ctx.lineWidth = this.state.lineWidth || ctx.lineWidth
    ctx.shadowBlur = this.state.shadowBlur || ctx.shadowBlur
    ctx.shadowColor = this.state.shadowColor || ctx.shadowColor
    ctx.shadowOffsetX = this.state.shadowOffsetX || ctx.shadowOffsetX
    ctx.shadowOffsetY = this.state.shadowOffsetY || ctx.shadowOffsetY
  }
}
