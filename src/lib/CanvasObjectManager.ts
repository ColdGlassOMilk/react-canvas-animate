import { CanvasContext, Context2D } from '../components/Canvas'
import CanvasObject from './CanvasObject'

class CanvasObjectManager<
  T extends CanvasObject = CanvasObject,
  C extends CanvasContext = Context2D,
> {
  private objects: T[] = []
  private context: C

  constructor(context: C, initialObjects: T[] = []) {
    this.context = context
    this.objects = initialObjects
  }

  add(object: T): void {
    this.objects.push(object)
  }

  remove(object: T): void {
    const index = this.objects.indexOf(object)
    if (index !== -1) {
      this.objects.splice(index, 1)
    }
  }

  push(...newObjects: T[]): void {
    this.objects.push(...newObjects)
  }

  pop(count: number = 1): T[] {
    return this.objects.splice(-count, count)
  }

  shift(count: number = 1): T[] {
    return this.objects.splice(0, count)
  }

  clear(): void {
    this.objects = []
  }

  create(ObjectClass: new (context: C) => T): T {
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
