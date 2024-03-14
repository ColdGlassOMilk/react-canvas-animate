import { Context2D } from 'react-canvas-animate'
import { Entity } from '../base/Entity'
import { Style, StyleState } from '../../components'

export interface RectState extends StyleState {
  x: number
  y: number
  width: number
  height: number
}

export class Rect extends Entity<RectState, RectState> {
  protected style: Style

  constructor(context: Context2D, state: RectState) {
    super(context, state)
    this.style = new Style(context, state)
  }

  render() {
    const ctx = this.context
    this.style.render()
    if (this.state.fillStyle) {
      ctx.fillRect(
        this.state.x,
        this.state.y,
        this.state.width,
        this.state.height,
      )
    }

    if (this.state.strokeStyle) {
      ctx.strokeRect(
        this.state.x,
        this.state.y,
        this.state.width,
        this.state.height,
      )
    }
  }
}
