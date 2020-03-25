import './index.css'
import {
  createToggleFsm,
  ToggleEvent,
  ToggleState
} from './toggle-fsm'

const toggleFsm = createToggleFsm()

const toggleBtn = document.querySelector('.toggle-btn')
const toggleBtnSlider = document.querySelector('.toggle-btn__slider')

let previousState: ToggleState

export function setupToggleBtn() {
  toggleBtn?.addEventListener('click', () => triggerEvent(ToggleEvent.Click))

  
}

function triggerEvent(event: ToggleEvent) {
  // For now we'll track the previous state, as we need to
  // remove classes from that state before applying the next
  previousState = toggleFsm.state

  // Then transition and apply
  toggleFsm.transition(event)
  applyClassesForState(toggleFsm.state)
}

function applyClassesForState(state: ToggleState) {
  toggleBtnSlider?.classList.remove(
    getSliderClassesForState(previousState)
  )
  toggleBtnSlider?.classList.add(
    getSliderClassesForState(state)
  )
}

function getSliderClassesForState(state: ToggleState): string {
  return {
    [ToggleState.On]: 'toggle-btn__slider--on',
    [ToggleState.Off]: 'toggle-btn__slider--off',
  }[state]
}
