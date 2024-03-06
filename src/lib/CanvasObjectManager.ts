import { CanvasContext } from '../components/Canvas'
import CanvasObject from './CanvasObject'

class CanvasObjectManager<T extends CanvasContext = CanvasRenderingContext2D> {
  private objects: CanvasObject[] = []
  private context: T

  constructor(context: T, initialObjects: CanvasObject[] = []) {
    this.context = context
    this.objects = initialObjects
  }

  add(object: CanvasObject): void {
    this.objects.push(object)
  }

  remove(object: CanvasObject): void {
    const index = this.objects.indexOf(object)
    if (index !== -1) {
      this.objects.splice(index, 1)
    }
  }

  push(...newObjects: CanvasObject[]): void {
    this.objects.push(...newObjects)
  }

  pop(count: number = 1): CanvasObject[] {
    return this.objects.splice(-count, count)
  }

  shift(count: number = 1): CanvasObject[] {
    return this.objects.splice(0, count)
  }

  clear(): void {
    this.objects = []
  }

  create(ObjectClass: new (context: T) => CanvasObject): CanvasObject {
    const newObject = new ObjectClass(this.context)
    this.add(newObject)
    return newObject
  }

  // Callbacks

  update(deltaTime: number): void {
    for (const object of this.objects) {
      if (object.update) {
        object.update(deltaTime)
      }
    }
  }

  render(deltaTime: number): void {
    for (const object of this.objects) {
      if (object.render) {
        object.render(deltaTime)
      }
    }
  }
}

export default CanvasObjectManager
