import EventEmitter from 'eventemitter3'
import { Fsm, FsmConfig } from '../FsmTypes'
import { createFsm } from '../Fsm'
import { EmitterFsmEvents } from './EmitterFsmTypes'

export class EmitterFsm<S extends string, E extends string>
  extends EventEmitter<EmitterFsmEvents>
  implements Fsm<S, E>
{
  private _fsm: Fsm<S, E>;

  public constructor(config: FsmConfig<S, E>) {
    super()
    this._fsm = createFsm<S, E>(config)
  }

  public get state(): S {
    return this._fsm.state
  }

  public get previousState(): S {
    return this._fsm.previousState
  }

  public on(event: EmitterFsmEvents, fn: (previousState: S, currentState: S) => void): this {
    super.on(event, fn)
    return this
  }

  public transition(event: E) {
    if (this._fsm.canTransition(event)) {
      this._fsm.transition(event)

      this.emit(
        EmitterFsmEvents.State_Changed,
        this._fsm.previousState,
        this._fsm.state
      )
    }
  }

  public canTransition(event: E): boolean {
    return this._fsm.canTransition(event)
  }
}

export function createEmitterFsm<S extends string, E extends string>(config: FsmConfig<S, E>): EmitterFsm<S, E> {
  return new EmitterFsm<S, E>(config)
}