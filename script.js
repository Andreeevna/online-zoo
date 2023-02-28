//! убрать сет таймауты
//! посмотреть в css майн слайдер транзишн

let welcomSlider = () => {

  let items = document.querySelectorAll('.welcom-carousel .welcom-carousel__item')
  let line = document.querySelector('.welcom-carousel__items-line')
  let activeItem = document.querySelector('.welcom-carousel__item_active')
  let offset = 0
  let offsetSize
  let currentRageValue = 2
  let rage = document.querySelector('.welcom__rage-input')
  let leftBtnPressed = false
  let welcomCurrent = document.querySelector('.welcom__rageNumber_current')
  let welcominAll = document.querySelector('.welcom__rageNumber_inAll')
  let activeStyle = 'welcom-carousel__item_active'
  const dot1 = document.querySelector('.welcome-carousel__dot1')
  const dot2 = document.querySelector('.welcome-carousel__dot2')
  const dot3 = document.querySelector('.welcome-carousel__dot3')
  const dot4 = document.querySelector('.welcome-carousel__dot4')



  const setDotVisability = (rageValue) => {
    switch (rageValue) {
      case 1:
        dot1.style.opacity = '1'
        break;
      case 6:
        dot2.style.opacity = '0'
        dot3.style.opacity = '0'
        dot4.style.opacity = '1'
        break;
      case 7:
        dot2.style.opacity = '0'
        dot3.style.opacity = '1'
        dot4.style.opacity = '1'
        break;
      case 8:
        dot2.style.opacity = '1'
        dot3.style.opacity = '1'
        dot4.style.opacity = '1'
        break;
      default:
        dot1.style.opacity = '0'
        dot2.style.opacity = '0'
        dot3.style.opacity = '0'
        dot4.style.opacity = '0'
        break;
    }

  }

  let offsetSetter = (windowWidth) => {
    // да, я знаю какой ужасный это костыль, но из за корявой вёрстки со scale и разным 
    // стилем задания margin иначе не выходит. ОБЯЗАТЕЛЬНО переделать в будующем. вместе с вёрсткой. 
    if (windowWidth >= 1920) {
      offsetSize = 145.14 + 46
    } else if (windowWidth >= 1200 && windowWidth <= 1919) {
      offsetSize = 181.15 + 23 + 10
    } else if (windowWidth >= 640 && windowWidth <= 1119) {
      offsetSize = 181.15 + 15 + 15
    } else if (windowWidth <= 639) {
      offsetSize = 114.262 + 15 - 5
    }
  }

  const makeSlide = (rageValue) => {
    let addOffset = (value) => {
      if (value > currentRageValue) {
        for (i = currentRageValue; i < value; i++) {
          offset = offset - offsetSize
        }
        currentRageValue = rageValue
      } else if (value < currentRageValue) {
        for (i = currentRageValue; i > value; i--) {
          offset = offset + offsetSize
        }
        currentRageValue = rageValue
      } else {
        return
      }

      items.forEach(item => {
        item.classList.remove(activeStyle)
      })
      items[currentRageValue - 1].classList.add(activeStyle)
      welcomCurrent.innerHTML = '0' + currentRageValue
    }

    setDotVisability(+rage.value)
    addOffset(rageValue)
    line.style.left = `${offset}px`
  }

  items.forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') {
        rage.value = (Array.from(items).indexOf(e.currentTarget) + 1)
        makeSlide(rage.value)
      }
    })
  })

  rage.addEventListener('pointerdown', (e) => {
    currentRageValue = e.target.value
    leftBtnPressed = true
  })

  rage.addEventListener('pointermove', (e) => {
    if (!leftBtnPressed) { return } else {
      let addOffset = (value) => {
        let rightItem = items[currentRageValue - 1 + 1]
        let letfItem = items[currentRageValue - 1 - 1]
        if (value > currentRageValue) {
          for (i = currentRageValue; i < value; i++) {
            items.forEach(item => {
              item.classList.remove(activeStyle)
            })
            rightItem.classList.add(activeStyle)
            offset = offset - offsetSize
          }
          currentRageValue = e.target.value
        } else if (value < currentRageValue) {
          for (i = currentRageValue; i > value; i--) {
            items.forEach(item => {
              item.classList.remove(activeStyle)
            })
            letfItem.classList.add(activeStyle)
            offset = offset + offsetSize
          }
          currentRageValue = e.target.value
        } else {
          return
        }
      }

      setDotVisability(+rage.value)
      addOffset(e.target.value)
      welcomCurrent.innerHTML = '0' + currentRageValue
      line.style.left = `${offset}px`
      items.forEach(item => {
        item.classList.remove(activeStyle)
      })
      items[currentRageValue - 1].classList.add(activeStyle)
    }
  })

  rage.addEventListener('change', (e) => {
    makeSlide(e.target.value)
  })

  rage.addEventListener('pointerup', () => {
    leftBtnPressed = false
  })


  offsetSetter(window.outerWidth)
  welcomCurrent.innerHTML = '0' + currentRageValue
  welcominAll.innerHTML = '0' + (items.length)
  window.addEventListener('resize', () => { offsetSetter(window.outerWidth) })
}

let infoBlockSlider = () => {
  let items = document.querySelectorAll('.info-block-carousel .info-block-carousel__item')
  let line = document.querySelector('.info-block-carousel__items-line')
  let leftBtn = document.querySelector('.info-block-carousel__leftControl')
  let rightBtn = document.querySelector('.info-block-carousel__rightControl')
  let offset = 0
  let offsetSize = 810
  let currentRageValue = 1
  let rage = document.querySelector('.info-block__rage-input')
  let leftBtnPressed = false
  let infoBlockCurrent = document.querySelector('.info-block__rageNumber_current')
  let infoBlockinAll = document.querySelector('.info-block__rageNumber_inAll')
  let maxRageValue = rage.max

  leftBtn.addEventListener('click', function (e) {
    if (offset === 0) {
      return
    } else {
      rightBtn.classList.remove('carousel__arrow_disabled')
      offset += offsetSize
      line.style.left = `${offset}px`
      rage.value--
      infoBlockCurrent.innerHTML = '0' + rage.value
      if (offset === 0) {
        leftBtn.classList.add('carousel__arrow_disabled')
      }
    }
  })

  rightBtn.addEventListener('click', function (e) {
    if (offset === -offsetSize * (maxRageValue - 1)) {
      return
    } else {
      leftBtn.classList.remove('carousel__arrow_disabled')
      offset -= offsetSize
      line.style.left = offset + 'px'
      rage.value++
      infoBlockCurrent.innerHTML = '0' + rage.value
      if (offset === -offsetSize * (maxRageValue - 1)) {
        rightBtn.classList.add('carousel__arrow_disabled')
      }
    }
  })

  rage.addEventListener('pointerdown', (e) => {
    currentRageValue = e.target.value
    leftBtnPressed = true
  })

  rage.addEventListener('pointermove', (e) => {
    if (!leftBtnPressed) { return } else {
      let addOffset = (value) => {
        if (value > currentRageValue) {
          for (i = currentRageValue; i < value; i++) {
            offset = offset - offsetSize
          }
          currentRageValue = e.target.value
        } else if (value < currentRageValue) {
          for (i = currentRageValue; i > value; i--) {
            offset = offset + offsetSize
          }
          currentRageValue = e.target.value
        } else {
          return
        }
      }

      if (rage.value == 1) {
        leftBtn.classList.add('carousel__arrow_disabled')
      } else {
        leftBtn.classList.remove('carousel__arrow_disabled')
      }
      if (rage.value == (items.length / 2 + 1)) {
        rightBtn.classList.add('carousel__arrow_disabled')
      } else {
        rightBtn.classList.remove('carousel__arrow_disabled')
      }

      addOffset(e.target.value)
      infoBlockCurrent.innerHTML = '0' + currentRageValue
      line.style.left = `${offset}px`
    }
  })

  rage.addEventListener('change', (e) => {

    let addOffset = (value) => {
      if (value > currentRageValue) {
        for (i = currentRageValue; i < value; i++) {
          offset = offset - offsetSize
        }
        currentRageValue = e.target.value
      } else if (value < currentRageValue) {
        for (i = currentRageValue; i > value; i--) {
          offset = offset + offsetSize
        }
        currentRageValue = e.target.value
      } else {
        return
      }
    }

    if (rage.value == 1) {
      leftBtn.classList.add('carousel__arrow_disabled')
    } else {
      leftBtn.classList.remove('carousel__arrow_disabled')
    }
    if (rage.value == (items.length / 2 + 1)) {
      rightBtn.classList.add('carousel__arrow_disabled')
    } else {
      rightBtn.classList.remove('carousel__arrow_disabled')
    }
    addOffset(e.target.value)
    line.style.left = `${offset}px`
    infoBlockCurrent.innerHTML = '0' + currentRageValue
  })

  rage.addEventListener('pointerup', (e) => {
    leftBtnPressed = false
  })

  infoBlockCurrent.innerHTML = '0' + currentRageValue
  infoBlockinAll.innerHTML = '0' + (items.length)
}

let petsSlider = () => {
  let items = document.querySelectorAll('.pets-carousel .pets-carousel__item')
  let line = document.querySelector('.pets-carousel__items-line')
  let btns = document.querySelectorAll('.pets-carousel__control')
  let leftBtn = document.querySelector('.pets-carousel__leftControl')
  let rightBtn = document.querySelector('.pets-carousel__rightControl')
  let rage = document.querySelector('.pets__rage-input')
  let petsCurrent = document.querySelector('.pets__rageNumber_current')
  let petsinAll = document.querySelector('.pets__rageNumber_inAll')
  let leftBtnPressed = false
  let viewMin = 1
  let viewMax = 4
  let offsetSize = 0
  let offset = 0
  let prevRageValue = 1
  let viewOffsetPos = 1
  //? придумать как при ресайзе держать слайдер рабочим

  const setOffsetSize = () => {
    items.forEach(item => {
      let transform = getComputedStyle(item.offsetParent).transform.replace('matrix', '').replace('(', '').replace(')', '')
      let scaleX = +transform.split(', ')[0]
      let leftRightMargin = +(getComputedStyle(item).marginLeft.replace('px', '')) + +(getComputedStyle(item).marginRight.replace('px', ''))
      offsetSize = (leftRightMargin + item.clientWidth)
      if (scaleX) {
        offsetSize *= scaleX
      }
    })
  }

  const setMinMaxValue = (windowWidth) => {
    if (windowWidth >= 1200) {
      viewMin = 1
      viewMax = 4
    } else if (windowWidth >= 640 && windowWidth <= 1199) {
      viewMin = 1
      viewMax = 2
    } else if (windowWidth <= 639) {
      console.log('asasd')
      viewMin = 1
      viewMax = 1
    }
  }

  const makeVisable = (rageValue) => {
    items.forEach(item => {
      item.classList.remove('carousel__item_hover_active')
      items[+rageValue - 1].classList.add('carousel__item_hover_active')
    })
  }

  const makeOffset = (rageValue) => {
    if (prevRageValue < +rageValue) {
      viewOffsetPos += rageValue - prevRageValue
    }
    if (prevRageValue > +rageValue) {
      viewOffsetPos -= prevRageValue - rageValue
    }
    if (viewOffsetPos > viewMax) {
      offset -= offsetSize * Math.abs(viewOffsetPos - viewMax)
      let i = viewOffsetPos - viewMax
      viewMin += i
      viewMax += i
      line.style.left = `${offset}px`
    }
    if (viewOffsetPos < viewMin) {
      offset += offsetSize * Math.abs(viewOffsetPos - viewMin)
      let i = viewOffsetPos - viewMin
      viewMin += i
      viewMax += i
      line.style.left = `${offset}px`
    }
    if (prevRageValue !== +rageValue) {
      prevRageValue = +rageValue
    }
  }

  const setPetsCurrent = (rageValue) => {
    petsCurrent.innerHTML = '0' + rageValue
  }

  window.addEventListener('resize', () => {
    setOffsetSize()
    setMinMaxValue(window.outerWidth)
  })

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn == leftBtn) {
        if (rage.value == 1) {
          rage.value = items.length
        } else {
          rage.value--
        }
      }
      if (btn == rightBtn) {
        if (rage.value == items.length) {
          rage.value = 1
        } else {
          rage.value++
        }
      }
      makeOffset(rage.value)
      makeVisable(rage.value)
      setPetsCurrent(rage.value)
    })
  })

  rage.addEventListener('pointerdown', (e) => {
    currentRageValue = e.target.value
    leftBtnPressed = true
  })

  rage.addEventListener('pointermove', (e) => {
    if (!leftBtnPressed) { return } else {
      makeVisable(e.target.value)
      makeOffset(e.target.value)
      setPetsCurrent(e.target.value)
    }
  })

  rage.addEventListener('change', (e) => {
    makeVisable(e.target.value)
    makeOffset(e.target.value)
    setPetsCurrent(e.target.value)
  })

  rage.addEventListener('pointerup', (e) => {
    leftBtnPressed = false
  })

  items.forEach(item => {
    item.addEventListener('click', (e) => {
      let i = Array.from(items).indexOf(e.currentTarget) + 1
      makeOffset(i)
      makeVisable(i)
      setPetsCurrent(i)
      rage.value = i
    })
  })

  setPetsCurrent(rage.value)
  petsinAll.innerHTML = '0' + items.length
  setOffsetSize()
  setMinMaxValue(window.outerWidth)
}

let reviewSlider = () => {

  let items = document.querySelectorAll('.review-carousel .review-carousel__item')
  let line = document.querySelector('.review-carousel__items-line')
  let leftBtn = document.querySelector('.review-carousel__leftControl')
  let rightBtn = document.querySelector('.review-carousel__rightControl')
  let offset = 0
  let offsetSize = 1210
  let currentRageValue = 1
  let rage = document.querySelector('.review__rage-input')
  let leftBtnPressed = false
  let reviewCurrent = document.querySelector('.review__rageNumber_current')
  let reviewinAll = document.querySelector('.review__rageNumber_inAll')
  let maxRageValue = rage.max

  let offsetSetter = (windowWidth) => {
    if (windowWidth <= 1199 && windowWidth >= 640) {
      offsetSize = offsetSize / 2
    } else if (windowWidth <= 639) {
      offsetSize = 320
    }
  }

  leftBtn.addEventListener('click', function (e) {
    if (offset === 0) {
      return
    } else {
      rightBtn.classList.remove('carousel__arrow_disabled')
      offset += offsetSize
      line.style.left = `${offset}px`
      rage.value--
      reviewCurrent.innerHTML = '0' + rage.value
      if (offset === 0) {
        leftBtn.classList.add('carousel__arrow_disabled')
      }
    }

  })

  rightBtn.addEventListener('click', function (e) {
    if (offset === -offsetSize * (maxRageValue - 1)) {
      return
    } else {
      leftBtn.classList.remove('carousel__arrow_disabled')
      offset -= offsetSize
      line.style.left = offset + 'px'
      rage.value++
      reviewCurrent.innerHTML = '0' + rage.value
      if (offset === -offsetSize * (maxRageValue - 1)) {
        rightBtn.classList.add('carousel__arrow_disabled')
      }
    }

  })



  rage.addEventListener('pointerdown', (e) => {
    currentRageValue = e.target.value
    leftBtnPressed = true

  })

  rage.addEventListener('pointermove', (e) => {
    if (!leftBtnPressed) { return } else {
      let addOffset = (value) => {
        if (value > currentRageValue) {
          for (i = currentRageValue; i < value; i++) {
            offset = offset - offsetSize
          }
          currentRageValue = e.target.value
        } else if (value < currentRageValue) {
          for (i = currentRageValue; i > value; i--) {
            offset = offset + offsetSize
          }
          currentRageValue = e.target.value
        } else {
          return
        }
      }

      if (rage.value == 1) {
        leftBtn.classList.add('carousel__arrow_disabled')
      } else {
        leftBtn.classList.remove('carousel__arrow_disabled')
      }
      if (rage.value == (items.length)) {
        rightBtn.classList.add('carousel__arrow_disabled')
      } else {
        rightBtn.classList.remove('carousel__arrow_disabled')
      }

      addOffset(e.target.value)
      reviewCurrent.innerHTML = '0' + currentRageValue
      line.style.left = `${offset}px`
    }
  })

  rage.addEventListener('change', (e) => {
    let addOffset = (value) => {
      if (value > currentRageValue) {
        for (i = currentRageValue; i < value; i++) {
          offset = offset - offsetSize
        }
        currentRageValue = e.target.value
      } else if (value < currentRageValue) {
        for (i = currentRageValue; i > value; i--) {
          offset = offset + offsetSize
        }
        currentRageValue = e.target.value
      } else {
        return
      }
    }

    if (rage.value == 1) {
      leftBtn.classList.add('carousel__arrow_disabled')
    } else {
      leftBtn.classList.remove('carousel__arrow_disabled')
    }
    if (rage.value == (items.length / 2 + 1)) {
      rightBtn.classList.add('carousel__arrow_disabled')
    } else {
      rightBtn.classList.remove('carousel__arrow_disabled')
    }

    addOffset(e.target.value)
    line.style.left = `${offset}px`

  })

  rage.addEventListener('pointerup', (e) => {
    leftBtnPressed = false
  })


  reviewCurrent.innerHTML = '0' + currentRageValue
  // reviewinAll.innerHTML = '0' + (items.length / 2 + 1)
  reviewinAll.innerHTML = '0' + 8 // incorect value. static. for task

  offsetSetter(window.outerWidth)

}

let footerCheckBoxValidator = () => {
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

let darkness = function () {
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
  petsSlider()
  reviewSlider()
  infoBlockSlider()
  welcomSlider()
  footerCheckBoxValidator()
  menuBurger()
}


window.onload = () => {
  init()
}
document.addEventListener('DOMContentLoaded', darkness)
