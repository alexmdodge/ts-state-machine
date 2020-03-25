import { createFsm, FSM } from 'ts-state-machine'

export enum ToggleState {
  On = 'on',
  Off = 'off'
}

export enum ToggleEvent {
  Click = 'click'
}

export function createToggleFsm(): FSM<ToggleState, ToggleEvent> {
  return createFsm<ToggleState, ToggleEvent>({
    initial: ToggleState.Off,
    states: {
      [ToggleState.Off]: {
        [ToggleEvent.Click]: ToggleState.On
      },
      [ToggleState.On]: {
        [ToggleEvent.Click]: ToggleState.Off
      }
    }
  })
}