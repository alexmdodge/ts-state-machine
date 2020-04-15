import './index.css'
import {
  createToggleFsm,
  ToggleEvent,
  ToggleState
} from './toggle-fsm'
import { EmitterFsmEvents } from '../../../lib/services/EmitterFsmTypes'

const toggleFsm = createToggleFsm()

const toggleBtn = document.querySelector('.toggle-btn')
const toggleBtnSlider = document.querySelector('.toggle-btn__slider')

export function setupToggleBtn() {
  toggleBtn?.addEventListener('click', () => {
    // Maybe we check if disabled here first, then we could transition
    // toggleFsm.transition(ToggleEvent.Disabled)
    toggleFsm.transition(ToggleEvent.Click)
  })
  toggleBtn?.addEventListener('mouseover', () => toggleFsm.transition(ToggleEvent.Mouse_Over))
  toggleBtn?.addEventListener('mouseout', () => toggleFsm.transition(ToggleEvent.Mouse_Off))

  // Apply classes for the current state
  onStateChanged(toggleFsm.previousState, toggleFsm.state)

  toggleFsm.on(EmitterFsmEvents.State_Changed, onStateChanged)
}

function onStateChanged(previousState: ToggleState, currentState: ToggleState) {
  const applyNextClassesForEl = (el: Element | null, prevClass: string | null, nextClass: string | null) => {
    if (prevClass) {
      el?.classList.remove(prevClass)
    }
    if (nextClass) {
      el?.classList.add(nextClass)
    }
  }

  // Add any additional elements here
  applyNextClassesForEl(
    toggleBtnSlider,
    getSliderClassesForState(previousState),
    getSliderClassesForState(currentState)
  )

  applyNextClassesForEl(
    toggleBtn,
    getButtonClassesForState(previousState),
    getButtonClassesForState(currentState)
  )

  // Need to do any specific handling on a state?
  switch(currentState) {
    case ToggleState.Off: break
    case ToggleState.On: break
    case ToggleState.Hovered: break
    default:
  }
}

enum ToggleSliderClasses {
  On = 'toggle-btn__slider--on',
  Off = 'toggle-btn__slider--off'
}

function getSliderClassesForState(state: ToggleState): string | null {
  return {
    [ToggleState.On]: ToggleSliderClasses.On,
    [ToggleState.Off]: ToggleSliderClasses.Off,
    [ToggleState.Hovered]: ToggleSliderClasses.Off
  }[state]
}

enum ToggleButtonClasses {
  Hovered = 'toggle-btn--hovered',
  On = 'toggle-btn--on'
}

function getButtonClassesForState(state: ToggleState): string | null {
  return {
    [ToggleState.On]: ToggleButtonClasses.On,
    [ToggleState.Off]: null,
    [ToggleState.Hovered]: ToggleButtonClasses.Hovered
  }[state]
}
