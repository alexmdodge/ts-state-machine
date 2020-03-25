export type FsmStateMap<S extends string, E extends string> = {
  [state in S]: {
    [event in E]?: S;
  }
}

export interface FsmConfig<S extends string, E extends string> {
  initial: S;
  states: FsmStateMap<S, E>;
}

export interface Fsm<S extends string, E extends string> {
  state: S;
  previousState: S;
  transition(event: E): void;
  canTransition(event: E): boolean;
}