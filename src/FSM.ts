type FSMStateMap<S extends string, E extends string> = {
  [state in S]: {
    [event in E]: S;
  }
}

interface FSMConfig<S extends string, E extends string> {
  initial: S;
  states: FSMStateMap<S, E>;
}

class FSM<S extends string, E extends string> {
  private _stateMap: FSMStateMap<S, E>;
  private _initialState: S;
  private _currentState: S;

  public constructor(config: FSMConfig<S, E>) {
    this._stateMap = config.states
    this._initialState = config.initial
    this._currentState = this._initialState
  }

  public get state(): S {
    return this._currentState
  }

  public transition(event: E) {
    this._currentState = this._stateMap[this._currentState][event]
  }
}

function createFsm<S extends string, E extends string>(config: FSMConfig<S, E>): FSM<S, E> {
  return new FSM(config)
}

export {
  createFsm,
  FSM,
  FSMConfig
}