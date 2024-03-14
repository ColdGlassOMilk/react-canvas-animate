import { Context2D } from 'react-canvas-animate'
import { Component, ComponentState } from '.'

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
      fillStyle: 'black',
      ...state
    }
  }

  // wtf eslint?
  // render() {
  //   // const something = this.state.fillStyle?
  // }
}
