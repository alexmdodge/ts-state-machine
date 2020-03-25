import { Fsm, FsmStateMap, FsmConfig } from './FsmTypes'

export class CoreFsm<S extends string, E extends string> implements Fsm<S, E>{
  private _stateMap: FsmStateMap<S, E>;
  private _initialState: S;
  private _previousState: S;
  private _currentState: S;

  public constructor(config: FsmConfig<S, E>) {
    this._stateMap = config.states

    this._initialState = config.initial
    this._currentState = this._initialState
    this._previousState = this._initialState
  }

  public get state(): S {
    return this._currentState
  }

  public get previousState(): S {
    return this._previousState
  }

  public transition(event: E) {
    const nextState: S | undefined = this._stateMap[this._currentState][event]

    if (nextState) {
      this._previousState = this._currentState
      this._currentState = nextState
    }
  }

  public canTransition(event: E): boolean {
    const nextState = this._stateMap[this._currentState][event]
    return nextState !== undefined
  }
}

export function createFsm<S extends string, E extends string>(config: FsmConfig<S, E>): Fsm<S, E> {
  return new CoreFsm<S, E>(config)
}
