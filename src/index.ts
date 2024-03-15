// Utils
import ImageLoader from './util/ImageLoader'
export { ImageLoader }
import { rgbAngle } from './util/helpers'
export { rgbAngle }

// Lib
import {
  CanvasObject as CanvasObjectBase,
  ObjectState as CanvasObjectState,
  ObjectProps as CanvasObjectProps,
} from './lib/CanvasObject'
import { ObjectManager as CanvasObjectManager } from './lib/ObjectManager'
import { Component as ComponentBase } from './lib/Component'
import { Entity as EntityBase } from './lib/Entity'

export namespace CanvasObject {
  export const Base = CanvasObjectBase
  export type State = CanvasObjectState
  export type Props = CanvasObjectProps
  export const Manager = CanvasObjectManager
  export const Component = ComponentBase
  export const Entity = EntityBase
}

// Components
import Canvas from './components/Canvas'
export type {
  CanvasContext,
  CanvasEventCallback,
  CanvasProps,
  Context2D,
  WebGL,
  WebGL2,
  Bitmap,
} from './components/Canvas'
export default Canvas
