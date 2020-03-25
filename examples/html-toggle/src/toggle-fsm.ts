import { createEmitterFsm, EmitterFsm } from 'ts-state-machine'

export enum ToggleState {
  On = 'on',
  Off = 'off',
  Hovered = 'hovered'
}

export enum ToggleEvent {
  Click = 'click',
  Mouse_Over = 'mouseOver',
  Mouse_Off = 'mouseOff'
}

export function createToggleFsm(): EmitterFsm<ToggleState, ToggleEvent> {
  return createEmitterFsm<ToggleState, ToggleEvent>({
    initial: ToggleState.Off,
    states: {
      [ToggleState.Off]: {
        [ToggleEvent.Click]: ToggleState.On,
        [ToggleEvent.Mouse_Over]: ToggleState.Hovered
      },
      [ToggleState.Hovered]: {
        [ToggleEvent.Mouse_Off]: ToggleState.Off,
        [ToggleEvent.Click]: ToggleState.On
      },
      [ToggleState.On]: {
        [ToggleEvent.Click]: ToggleState.Off
      }
    }
  })
}