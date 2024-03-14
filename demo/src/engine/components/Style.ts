import { Context2D } from 'react-canvas-animate'
import { Component, ComponentState } from './base/Component'

export interface StyleState extends ComponentState {
  fillStyle?: string
  strokeStyle?: string
  lineWidth?: number
  shadowBlur?: number
  shadowColor?: string
  shadowOffsetX?: number
  shadowOffsetY?: number
}

export class Style extends Component<StyleState> {
  constructor(context: Context2D, state: StyleState) {
    super(context, state)
    this.state = {
      fillStyle: '#000',
      ...state,
    }
  }

  /* eslint react/require-render-return: 0 */
  render(): void {
    const ctx = this.context
    ctx.fillStyle = this.state.fillStyle || ctx.fillStyle
    ctx.strokeStyle = this.state.strokeStyle || ctx.strokeStyle
    ctx.lineWidth = this.state.lineWidth || ctx.lineWidth
  }
}
