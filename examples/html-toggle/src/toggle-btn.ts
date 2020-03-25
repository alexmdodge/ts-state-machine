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

let previousState: ToggleState

export function setupToggleBtn() {
  toggleBtn?.addEventListener('click', () => triggerEvent(ToggleEvent.Click))
  toggleBtn?.addEventListener('mouseover', () => triggerEvent(ToggleEvent.Mouse_Over))
  toggleBtn?.addEventListener('mouseoff', () => triggerEvent(ToggleEvent.Mouse_Off))

  // Apply classes for the current state
  applyClassesForState(toggleFsm.previousState, toggleFsm.state)

  toggleFsm.on(EmitterFsmEvents.State_Changed, (previousState, currentState) => {
    applyClassesForState(previousState, state)
  })
}

function triggerEvent(event: ToggleEvent) {
  previousState = toggleFsm.state

  toggleFsm.transition(event)
  
}

function applyClassesForState(previousState: ToggleState, currentState: ToggleState) {
  const previousSliderClass = getSliderClassesForState(previousState)
  if (previousSliderClass.length > 0) {
    toggleBtnSlider?.classList.remove(previousSliderClass)
  }
  const nextSliderClass = getSliderClassesForState(currentState)
  if (nextSliderClass.length > 0) {
    toggleBtnSlider?.classList.add(nextSliderClass)
  }

  const previousToggleClass = getToggleClassesForState(previousState)
  if (previousToggleClass.length > 0) {
    toggleBtn?.classList.remove(previousToggleClass)
  }
  const nextToggleClass = getToggleClassesForState(currentState)
  if (nextToggleClass.length > 0) {
    toggleBtn?.classList.add(nextToggleClass)
  }
}

function getSliderClassesForState(state: ToggleState): string {
  return {
    [ToggleState.On]: 'toggle-btn__slider--on',
    [ToggleState.Off]: 'toggle-btn__slider--off',
    [ToggleState.Hovered]: ''
  }[state]
}

function getToggleClassesForState(state: ToggleState): string {
  return {
    [ToggleState.On]: '',
    [ToggleState.Off]: '',
    [ToggleState.Hovered]: '.toggle-btn--hovered'
  }[state]
}
