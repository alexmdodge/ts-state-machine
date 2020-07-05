import './index.css'
import {
  createToggleFsm,
  ToggleEvent,
  ToggleState
} from './toggle-fsm'
import { EmitterFsmEvents } from '../../../lib/services/EmitterFsmTypes'

// Create our FSM and retrieve our page elements

const toggleFsm = createToggleFsm()

const toggleBtn = document.querySelector('.toggle-btn')
const toggleBtnSlider = document.querySelector('.toggle-btn__slider')

// This function gets run when our application starts up

export function setupToggleBtn() {
    // Apply classes for the current state, not that we could bring this
  // internally to the FSM, and have something like init()
  onStateChanged(toggleFsm.previousState, toggleFsm.state)

  // Listen for all future state changes
  toggleFsm.on(EmitterFsmEvents.State_Changed, onStateChanged)

  addButtonEventListeners()
}

// Specific listeners which will transition us from state to state

function addButtonEventListeners() {
  toggleBtn?.addEventListener('click', () => {
    // Maybe we check if disabled here first, then we could transition
    // toggleFsm.transition(ToggleEvent.Disabled)
    toggleFsm.transition(ToggleEvent.Click)
  })
  toggleBtn?.addEventListener('mouseover', () => toggleFsm.transition(ToggleEvent.Mouse_Over))
  toggleBtn?.addEventListener('mouseout', () => toggleFsm.transition(ToggleEvent.Mouse_Off))
}

// General handler which will be invoked whenever our state changes

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

// Setup up enums and selectors which will map classes to specific states

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

// Do the same for the outer button

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
