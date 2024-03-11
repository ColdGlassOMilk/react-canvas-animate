import { RenderableObject } from '../base/RenderableObject'

export class ClearScreen extends RenderableObject {
  render() {
    const gl = this.context
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  }
}
