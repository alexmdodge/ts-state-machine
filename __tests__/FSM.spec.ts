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
  
      expect(uiFsm.previousState).toStrictEqual(UIState.Off)
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

    it('should not transition when a state is invalid', () => {
      enum UIState {
        On = 'on',
        Off = 'off',
        Hovered = 'hovered'
      }
      
      enum UIEvent {
        Click = 'click',
        Mouse_Over = 'mouseOver',
        Mouse_Off = 'mouseOff'
      }
      
      const uiFsm = createFsm<UIState, UIEvent>({
        initial: UIState.Off,
        states: {
          [UIState.Off]: {
            [UIEvent.Click]: UIState.On,
            [UIEvent.Mouse_Over]: UIState.Hovered
          },
          [UIState.Hovered]: {
            [UIEvent.Mouse_Off]: UIState.Off,
            [UIEvent.Click]: UIState.On
          },
          [UIState.On]: {
            [UIEvent.Click]: UIState.Off
          }
        }
      })

      uiFsm.transition(UIEvent.Mouse_Off)

      expect(uiFsm.previousState).toStrictEqual(UIState.Off)
      expect(uiFsm.state).toStrictEqual(UIState.Off)
    })
  })

  describe('canTransition', () => {
    it('should indicate when a transition can be performed', () => {
      enum UIState {
        On = 'on',
        Off = 'off',
        Hovered = 'hovered'
      }
      
      enum UIEvent {
        Click = 'click',
        Mouse_Over = 'mouseOver',
        Mouse_Off = 'mouseOff'
      }
      
      const uiFsm = createFsm<UIState, UIEvent>({
        initial: UIState.Off,
        states: {
          [UIState.Off]: {
            [UIEvent.Click]: UIState.On,
            [UIEvent.Mouse_Over]: UIState.Hovered
          },
          [UIState.Hovered]: {
            [UIEvent.Mouse_Off]: UIState.Off,
            [UIEvent.Click]: UIState.On
          },
          [UIState.On]: {
            [UIEvent.Click]: UIState.Off
          }
        }
      })

      expect(uiFsm.canTransition(UIEvent.Mouse_Over)).toStrictEqual(true)
      expect(uiFsm.canTransition(UIEvent.Click)).toStrictEqual(true)
    })

    it('should indicate when a transition cannot be performed', () => {
      enum UIState {
        On = 'on',
        Off = 'off',
        Hovered = 'hovered'
      }
      
      enum UIEvent {
        Click = 'click',
        Mouse_Over = 'mouseOver',
        Mouse_Off = 'mouseOff'
      }
      
      const uiFsm = createFsm<UIState, UIEvent>({
        initial: UIState.Off,
        states: {
          [UIState.Off]: {
            [UIEvent.Click]: UIState.On,
            [UIEvent.Mouse_Over]: UIState.Hovered
          },
          [UIState.Hovered]: {
            [UIEvent.Mouse_Off]: UIState.Off,
            [UIEvent.Click]: UIState.On
          },
          [UIState.On]: {
            [UIEvent.Click]: UIState.Off
          }
        }
      })

      expect(uiFsm.canTransition(UIEvent.Mouse_Off)).toStrictEqual(false)
    })
  })
})