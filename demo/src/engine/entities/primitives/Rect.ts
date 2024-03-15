import { Entity, EntityState } from '../base/Entity'
import { Style, StyleState } from '../../components'

export interface RectState extends EntityState, StyleState {
  x: number
  y: number
  width: number
  height: number
}

export class Rect extends Entity<RectState, RectState> {
  attachComponents() {
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
