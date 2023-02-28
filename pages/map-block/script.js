//! поработать с адаптивом скорее всего сделать сброс райдж в 0

const darkness = function () {
  let myLocalStorage = window.localStorage
  let darknessSwitcher = document.querySelector('#switch1')
  let body = document.querySelector('body')

  let setDarkTheme = (darkTheme) => {
    if (darkTheme == 'true') {
      body.classList.add('dark-theme')
      darknessSwitcher.checked = true
    } else if (darkTheme == 'false' || !darkTheme) {
      body.classList.remove('dark-theme')
    }
  }

  setDarkTheme(myLocalStorage.getItem('darkTheme'))

  darknessSwitcher.addEventListener('click', () => {
    if (myLocalStorage.getItem('darkTheme') == 'false' || !myLocalStorage.getItem('darkTheme')) {
      myLocalStorage.setItem('darkTheme', true)
      setDarkTheme(myLocalStorage.getItem('darkTheme'))
    } else if (myLocalStorage.getItem('darkTheme') == 'true') {
      myLocalStorage.setItem('darkTheme', false)
      setDarkTheme(myLocalStorage.getItem('darkTheme'))
    }
  })

}

const footerCheckBoxValidator = () => {
  // let footerCheckboxLabel 
  let footerCheckbox = document.querySelector('.footer__checkbox_label')
  let submitBtn = document.querySelector('.footer__send-btn_label')
  let footerCheckboxChecked = false

  footerCheckbox.addEventListener('click', () => {
    footerCheckboxChecked ? footerCheckboxChecked = false : footerCheckboxChecked = true
  })

  submitBtn.addEventListener('click', (e) => {
    if (!footerCheckboxChecked) {
      e.preventDefault()
      footerCheckbox.parentNode.classList.add('footer__checkbox_unchecked')
      setTimeout(() => {
        footerCheckbox.parentNode.classList.remove('footer__checkbox_unchecked')
      }, 1000)
      return
    }

  })

}

const carousel = () => {
  let watchOnlineBtn = document.querySelector('.watch-online-btn')
  let animalLine = document.querySelector('.carousel__items-line')
  let lineItems = document.querySelectorAll('.carousel__item')
  let leftBtn = document.querySelector('.carousel__leftControl')
  let rightBtn = document.querySelector('.carousel__rightControl')
  let rage = document.querySelector('.carousel__rage-input')
  let mapPointers = document.querySelectorAll('.map__pointer')
  let currentLabelNum = document.querySelector('.carousel__rageNumber_current')
  let InAllLabelNum = document.querySelector('.carousel__rageNumber_inAll')
  let activeItem = document.querySelector('.carousel__item_active')
  let pointerIsDown = false
  let currentRageValue = 2
  let viewMin = 1
  let viewMax = 5
  let viewOffsetPos = 2
  let offsetSize
  let lineOffset = 0
  let prevRageValue = 2


  const setViewMax = () => {
    if (window.screen.width < 640) {
      viewMax = 3
    } else if (window.screen.width < 1199) {
      viewMax = 4
    } else if (window.screen.width > 1199) {
      viewMax = 5
    }
  }

  const setOffsetSize = () => {
    lineItems.forEach(item => {
      if (!Array.from(item.classList).includes('nav-carousel__item_active')) {
        let leftRightMargin = +(getComputedStyle(item).marginLeft.replace('px', '')) + +(getComputedStyle(item).marginRight.replace('px', ''))
        offsetSize = (leftRightMargin + activeItem.clientWidth)
      }
    })
  }

  // line offset 
  let makeOffset = () => {
    if (window.screen.width > 1600) { return }

    if (prevRageValue < +rage.value) {
      viewOffsetPos += rage.value - prevRageValue
    }
    if (prevRageValue > +rage.value) {
      viewOffsetPos -= prevRageValue - rage.value
    }
    if (viewOffsetPos > viewMax) {
      lineOffset -= Math.abs(viewOffsetPos - viewMax) * offsetSize
      animalLine.style.left = `${lineOffset}px`
      let i = viewOffsetPos - viewMax
      viewMin += i
      viewMax += i

    }

    if (viewOffsetPos < viewMin) {
      lineOffset += -(viewOffsetPos - viewMin) * offsetSize
      let i = viewOffsetPos - viewMin
      viewMin += i
      viewMax += i

      animalLine.style.left = `${lineOffset}px`
    }
    if (prevRageValue !== +rage.value) {
      prevRageValue = +rage.value
    }

  }


  let activateThePointer = (line_element) => {
    for (let i = 0; i < line_element.classList.length; i++) {
      mapPointers.forEach(pointer => {
        for (let j = 0; j < pointer.classList.length; j++) {
          if (line_element.classList[i] == pointer.classList[j]) {
            pointer.classList.add('map__pointer_active')
          }
        }
      })
    }
  }

  let activateTheLineItem = (map_element) => {
    for (let i = 0; i < map_element.classList.length; i++) {
      lineItems.forEach(item => {
        for (let j = 0; j < item.classList.length; j++) {
          if (map_element.classList[i] == item.classList[j]) {
            item.classList.add('carousel__item_active')
          }
        }
      })
    }
  }

  let removeActiveClasses = () => {
    mapPointers.forEach(pointer => {
      pointer.classList.remove('map__pointer_active')
    })

    lineItems.forEach(item => {
      item.classList.remove('carousel__item_active')
    })
  }

  let setUpRageByItemId = () => {
    lineItems.forEach(item => {
      if (item.classList.contains('carousel__item_active')) {
        rage.value = item.id
        currentRageValue = item.id
      }
    })
  }

  let toggleBtnsAbility = () => {
    if (!lineItems[0].classList.contains('carousel__item_active')) {
      leftBtn.classList.remove('carousel__arrow_disabled')
    }
    if (!lineItems[lineItems.length - 1].classList.contains('carousel__item_active')) {
      rightBtn.classList.remove('carousel__arrow_disabled')
    }
    if (lineItems[0].classList.contains('carousel__item_active')) {
      leftBtn.classList.add('carousel__arrow_disabled')
    }
    if (lineItems[lineItems.length - 1].classList.contains('carousel__item_active')) {
      rightBtn.classList.add('carousel__arrow_disabled')
    }
  }


  let changeHref = (rageValue) => {
    switch (+rageValue) {
      case 1:
        watchOnlineBtn.parentNode.action = '../video-block/gorillas/index.html'
        break;
      case 2:
        watchOnlineBtn.parentNode.action = '../video-block/pandas/index.html'
        break;
      case 3:
        watchOnlineBtn.parentNode.action = '../video-block/crocodiles/index.html'
        break;
      case 4:
        watchOnlineBtn.parentNode.action = '../video-block/eagles/index.html'
        break;
      default:
        watchOnlineBtn.parentNode.action = '#'
        break;
    }
  }

  document.addEventListener('pointerdown', (e) => {
    pointerIsDown = true

    //  if lineItems clicked 
    if (e.target.parentElement.classList.contains('carousel__item')) {
      removeActiveClasses()
      e.target.parentElement.classList.add('carousel__item_active')
      activateThePointer(lineItems[e.target.parentElement.id - 1])
      setUpRageByItemId()
      toggleBtnsAbility()
      makeOffset()
    }

    // if  mapPointers clicked 
    if (e.target.classList.contains('map__pointer') || e.target.classList.contains('map__pointer_animal')) {
      removeActiveClasses()
      if (e.target.tagName == 'IMG') {
        activateTheLineItem(e.target.parentElement)
        e.target.parentElement.classList.add('map__pointer_active')
      } else {
        activateTheLineItem(e.target)
        e.target.classList.add('map__pointer_active')
      }
      setUpRageByItemId()
      toggleBtnsAbility()
      makeOffset()
      currentLabelNum.innerHTML = '0' + currentRageValue

    }
    // buttons
    if (e.target == leftBtn) {
      if (currentRageValue == 1) {
        currentRageValue = lineItems.length
      } else {
        currentRageValue--
      }

      removeActiveClasses()

      lineItems[currentRageValue - 1].classList.add('carousel__item_active')
      activateThePointer(lineItems[currentRageValue - 1])
      setUpRageByItemId()
      currentLabelNum.innerHTML = '0' + currentRageValue

      // work with offset 
      makeOffset()

    } else if (e.target == rightBtn) {
      if (currentRageValue == lineItems.length) {
        currentRageValue = 1
      } else {
        currentRageValue++
      }

      removeActiveClasses()
      
      lineItems[currentRageValue - 1].classList.add('carousel__item_active')
      activateThePointer(lineItems[currentRageValue - 1])
      setUpRageByItemId()
      currentLabelNum.innerHTML = '0' + currentRageValue

      // work with offset 
      makeOffset()

    }


  })

  rage.addEventListener('pointermove', (e) => {
    if (pointerIsDown) {
      currentRageValue = e.target.value
      removeActiveClasses()
      activateThePointer(lineItems[currentRageValue - 1])
      lineItems[currentRageValue - 1].classList.add('carousel__item_active')
      toggleBtnsAbility()
      currentLabelNum.innerHTML = '0' + currentRageValue
      makeOffset()
    }
  })
  rage.addEventListener('change', (e) => {
    currentRageValue = e.target.value
    removeActiveClasses()
    activateThePointer(lineItems[currentRageValue - 1])
    lineItems[currentRageValue - 1].classList.add('carousel__item_active')
    toggleBtnsAbility()
    currentLabelNum.innerHTML = '0' + currentRageValue
    makeOffset()
    changeHref(currentRageValue)

  })

  document.addEventListener('pointerup', (e) => {
    pointerIsDown = false
    if (e.target === rage) {
      currentRageValue = e.target.value
      removeActiveClasses()
      activateThePointer(lineItems[currentRageValue - 1])
      lineItems[currentRageValue - 1].classList.add('carousel__item_active')
      currentLabelNum.innerHTML = '0' + currentRageValue
      makeOffset()
    }
    changeHref(currentRageValue)
  })

  currentLabelNum.innerHTML = '0' + currentRageValue
  InAllLabelNum.innerHTML = '0' + lineItems.length
  setOffsetSize()
  setViewMax()
  window.addEventListener('resize', setOffsetSize)
  window.addEventListener('resize', setViewMax)
}

const menuBurger = () => {
  const navMenu = document.querySelector('.header__nav ')
  const menuBurgerBtn = document.querySelector('.header__burger')
  let menuHiden = true
  const showMenu = () => {
    navMenu.style.display = 'block'
    menuBurgerBtn.classList.add('header__burger_active')
    menuHiden = false
  }
  const hideMenu = () => {
    navMenu.style.display = 'none'
    menuBurgerBtn.classList.remove('header__burger_active')
    menuHiden = true
  }
  handler = () => {
    menuHiden ? showMenu() : hideMenu()
  }
  window.addEventListener('resize', (e) => {
    if (e.currentTarget.screen.width < 1200) {
      hideMenu()
    } else { showMenu() }
  })
  menuBurgerBtn.addEventListener('click', handler)
}



let init = () => {
  carousel()
  darkness()
  footerCheckBoxValidator()
  menuBurger()
}

window.onload = () => {
  init()
}
// document.addEventListener('DOMContentLoaded', init)