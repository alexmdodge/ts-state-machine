import { createFsm } from '../src'

describe('FSM', () => {
  describe('transition', () => {
    it('transitions to the next state when the event is valid', () => {
      enum UIState {
        On = 'on',
        Off = 'off'
      }
      
      enum UIEvent {
        Click = 'click'
      }
      
      const uiFsm = createFsm<UIState, UIEvent>({
        initial: UIState.Off,
        states: {
          [UIState.Off]: {
            [UIEvent.Click]: UIState.On
          },
          [UIState.On]: {
            [UIEvent.Click]: UIState.Off
          }
        }
      })
  
      uiFsm.transition(UIEvent.Click)
  
      expect(uiFsm.state).toStrictEqual(UIState.On)
    })

    it('transitions to a sequentially correct state after multiple events', () => {
      enum UIState {
        On = 'on',
        Off = 'off'
      }
      
      enum UIEvent {
        Click = 'click'
      }
      
      const uiFsm = createFsm<UIState, UIEvent>({
        initial: UIState.Off,
        states: {
          [UIState.Off]: {
            [UIEvent.Click]: UIState.On
          },
          [UIState.On]: {
            [UIEvent.Click]: UIState.Off
          }
        }
      })
  
      uiFsm.transition(UIEvent.Click)
      expect(uiFsm.state).toStrictEqual(UIState.On)

      uiFsm.transition(UIEvent.Click)
      expect(uiFsm.state).toStrictEqual(UIState.Off)
    })
  })
})