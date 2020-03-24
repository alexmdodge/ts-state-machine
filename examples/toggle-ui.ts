import { FSM, FSMConfig } from '../src'

enum UIState {
  On = 'on',
  Off = 'off'
}

enum UIEvent {
  Click = 'click'
}

const uiFsmConfig: FSMConfig<UIState, UIEvent> = {
  initial: UIState.Off,
  states: {
    [UIState.Off]: {
      [UIEvent.Click]: UIState.On
    },
    [UIState.On]: {
      [UIEvent.Click]: UIState.Off
    }
  }
}

const uiFsm = new FSM<UIState, UIEvent>(uiFsmConfig)

uiFsm.transition(UIEvent.Click)
uiFsm.state // UIState.On

uiFsm.transition(UIEvent.Click)
uiFsm.state // UIState.Off