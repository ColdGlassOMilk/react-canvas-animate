import { CanvasObject, Context2D } from 'react-canvas-animate'
import { Style, StyleState } from '../../components'

export interface RectState extends CanvasObject.State, StyleState {
  x: number
  y: number
  width: number
  height: number
}

export class Rect extends CanvasObject.Entity<RectState> {
  useComponents() {
    return {
      style: Style,
    }
  }

  render() {
    const ctx = this.context
    this.components.style.render()
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

export class RectManager extends CanvasObject.Manager<
  RectState,
  any,
  Context2D,
  Rect
> {}
