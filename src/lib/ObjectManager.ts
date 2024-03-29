import type { CanvasContext, Context2D } from '../components/Canvas'
import { CanvasObject, ObjectProps, ObjectState } from './CanvasObject'

export class ObjectManager<
  State extends ObjectState = any,
  Props extends ObjectProps = any,
  Context extends CanvasContext = Context2D,
  Type extends CanvasObject<ObjectState, ObjectProps, Context> = CanvasObject<
    ObjectState,
    ObjectProps,
    Context
  >,
> {
  protected objects: Type[] = []

  constructor(
    protected context: Context,
    objects: [new (context: Context, state: State) => Type, State][] = [],
  ) {
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
