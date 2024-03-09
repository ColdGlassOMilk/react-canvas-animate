import type { CanvasContext, Context2D } from '../components/Canvas.d'
import CanvasObject, {
  CanvasObjectState,
  CanvasObjectProps,
} from './CanvasObject'

class CanvasObjectManager<
  T extends CanvasObject = CanvasObject,
  S extends CanvasObjectState = CanvasObjectState,
  P extends CanvasObjectProps = CanvasObjectProps,
  C extends CanvasContext = Context2D,
> {
  private objects: T[] = []
  private context: C

  constructor(
    context: C,
    objects: [new (context: C, state: S) => T, S][] = [],
  ) {
    this.context = context
    this.objects = this.createList(objects)
  }

  // Stack methods
  // ---------------

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

  // Factory method
  // ---------------

  createList(objects: [new (context: C, state: S) => T, S][]): T[] {
    const newObjects = objects.map(([ObjectClass, state]) => {
      const newObject = new ObjectClass(this.context, state)
      this.add(newObject)
      return newObject
    })
    return newObjects
  }

  create(ObjectClass: new (context: C, state: S) => T, state: S): T {
    const newObject = new ObjectClass(this.context, state)
    this.add(newObject)
    return newObject
  }

  // Callbacks
  // ---------------

  update(_args: P): void {
    for (const object of this.objects) {
      object.callUpdate(_args)
    }
  }

  render(_args: P): void {
    for (const object of this.objects) {
      object.callRender(_args)
    }
  }
}

export default CanvasObjectManager
