import './index.css'

const toggleBtn = document.querySelector('.toggle-btn')
const toggleBtnSlider = document.querySelector('.toggle-btn__slider')

let isToggledOn = false

enum ToggleButtonClasses {
  Hovered = 'toggle-btn--hovered',
  Active = 'toggle-btn--active'
}

enum ToggleSliderClasses {
  On = 'toggle-btn__slider--on',
  Off = 'toggle-btn__slider--off'
}

export function setupToggleBtn() {
  toggleBtn?.addEventListener('click', () => {
    if (isToggledOn) {
      toggleBtnSlider?.classList.remove(ToggleSliderClasses.On)
      toggleBtnSlider?.classList.add(ToggleSliderClasses.Off)

      isToggledOn = false
    } else {
      toggleBtnSlider?.classList.remove(ToggleSliderClasses.Off)
      toggleBtnSlider?.classList.add(ToggleSliderClasses.On)

      isToggledOn = true
    }

    // We could do this as well, but perhaps safer to be explicit
    // isToggledOn = !isToggledOn
  })

  toggleBtn?.addEventListener('mouseover', () => {
    toggleBtn?.classList.add(ToggleButtonClasses.Hovered)
  })

  toggleBtn?.addEventListener('mouseout', () => {
    toggleBtn?.classList.remove(ToggleButtonClasses.Hovered)
  })

  toggleBtn?.addEventListener('mousedown', () => {
    toggleBtn?.classList.add(ToggleButtonClasses.Active)
  })

  toggleBtn?.addEventListener('mouseup', () => {
    toggleBtn?.classList.remove(ToggleButtonClasses.Active)
  })

  // Setup initial classes based on our initial states
  if (isToggledOn) {
    toggleBtnSlider?.classList.add(ToggleSliderClasses.On)
  } else {
    toggleBtnSlider?.classList.add(ToggleSliderClasses.Off)
  }
}
