import type { CanvasContext } from '../components/Canvas'
import { CanvasObject, ObjectState, ObjectProps } from './CanvasObject'

export class ObjectManager<
  Type extends CanvasObject = CanvasObject,
  State extends ObjectState = ObjectState,
  Props extends ObjectProps = ObjectProps,
  Context extends CanvasContext = CanvasContext,
> {
  protected objects: Type[] = []
  protected context: Context

  constructor(
    context: Context,
    objects: [new (context: Context, state: State) => Type, State][] = [],
  ) {
    this.context = context
    this.objects = this.createList(objects)
  }

  // Stack methods
  // ---------------

  add(object: Type): void {
    this.objects.push(object)
  }

  remove(object: Type): void {
    const index = this.objects.indexOf(object)
    if (index !== -1) {
      this.objects.splice(index, 1)
    }
  }

  push(...objects: Type[]): void {
    this.objects.push(...objects)
  }

  pop(count: number = 1): Type[] {
    return this.objects.splice(-count, count)
  }

  shift(count: number = 1): Type[] {
    return this.objects.splice(0, count)
  }

  clear(): void {
    this.objects = []
  }

  // Factory methods
  // ---------------

  createList(
    objects: [new (context: Context, state: State) => Type, State][],
  ): Type[] {
    const newObjects = objects.map(([ObjectClass, state]) => {
      const newObject = new ObjectClass(this.context, state)
      this.add(newObject)
      return newObject
    })
    return newObjects
  }

  create(
    ObjectClass: new (context: Context, state: State) => Type,
    state: State,
  ): Type {
    const newObject = new ObjectClass(this.context, state)
    this.add(newObject)
    return newObject
  }

  // Callbacks
  // ---------------

  // render(_props: Props): void {
  //   for (const object of this.objects) {
  //     object.callRender(_props)
  //   }
  // }

  render(): void {
    for (const object of this.objects) {
      object.callRender()
    }
  }

  update(_props: Props): void {
    for (const object of this.objects) {
      object.callUpdate(_props)
    }
  }
}
