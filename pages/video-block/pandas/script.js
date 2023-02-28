let carousels = () => {

  let screenshotsCarousel = function () {
    let screenshotsLines = document.querySelectorAll('.media__carousel__items-line')
    let dots = document.querySelectorAll('.carousel__dot')
    let offsetSize = 790
    let offset = 0
    let mainItem = document.querySelector('.video-item__video iframe')
    let items = document.querySelectorAll('.media__carousel__item_wrapper')


    items.forEach(item => {
      item.addEventListener('click', (e) => {
        let newMainSrc = e.toElement.children[0].attributes[2].nodeValue
        let newSliderItemSrc = mainItem.attributes[2].nodeValue

        mainItem.attributes[2].nodeValue = newMainSrc
        e.toElement.children[0].attributes[2].nodeValue = newSliderItemSrc
      })
    })


    dots.forEach((dot) => {
      let prevDotId
      dot.addEventListener('click', (e) => {
        dots.forEach(dot => {
          if (dot.classList.contains('carousel__dot_active')) {
            prevDotId = dot.id
          }
          dot.classList.remove('carousel__dot_active')
        })
        e.target.classList.add('carousel__dot_active')
        let difference = (+prevDotId - +dot.id)

        let moveLine = (offsetSize) => {
          offset += offsetSize
          screenshotsLines.forEach(line => {
            line.style.left = `${offset}px`
          })
        }

        switch (difference) {
          case (-2):
            moveLine((offsetSize * 2) * -1)
            break
          case (-1):
            moveLine(offsetSize * -1)
            break
          case (1):
            moveLine(offsetSize)
            break
          case (2):
            moveLine(offsetSize * 2)
            break
          default:
            break
        }
      })
    })
  }

  let navCarousel = function () {
    let items = document.querySelectorAll('.nav-carousel__item')
    let upBtn = document.querySelector('.nav-carousel__control_up')
    let downBtn = document.querySelector('.nav-carousel__control_down')
    let navLine = document.querySelector('.nav-carousel__line')
    let offset = 0
    let offsetSize = 0
    let activeItem = 0
    let viewMin = 0
    let viewMax = 3

    const setActiveItem = () => {
      items.forEach(item => {
        if (Array.from(item.classList).includes('nav-carousel__item_active')) {
          activeItem = Array.from(items).indexOf(item)
        }
      })
    }

    const setOffsetSize = () => {
      items.forEach(item => {
        if (!Array.from(item.classList).includes('nav-carousel__item_active')) {
          let transform = getComputedStyle(item.offsetParent).transform.replace('matrix', '').replace('(', '').replace(')', '')
          let scaleX = +transform.split(', ')[0]
          let topBotMargin = +(getComputedStyle(item).marginTop.replace('px', '')) + +(getComputedStyle(item).marginBottom.replace('px', ''))
          offsetSize = (topBotMargin + item.offsetWidth)
          if (scaleX) {
            offsetSize *= scaleX
          }
        }
      })
    }

    upBtn.addEventListener('click', () => {
      if (activeItem == 0) { return }
      downBtn.classList.remove('nav-carousel__control_disabled')

      activeItem--
      items.forEach(item => {
        item.classList.remove('nav-carousel__item_active')
      })
      items[activeItem].classList.add('nav-carousel__item_active')
      if (activeItem < viewMin) {
        offset -= offsetSize
        navLine.style.bottom = `${offset}px`
        viewMin--
        viewMax--
      }

      if (activeItem == 0) {
        upBtn.classList.add('nav-carousel__control_disabled')
      }
    })

    downBtn.addEventListener('click', () => {
      if (activeItem == 7) { return }
      upBtn.classList.remove('nav-carousel__control_disabled')

      activeItem++
      items.forEach(item => {
        item.classList.remove('nav-carousel__item_active')
      })
      items[activeItem].classList.add('nav-carousel__item_active')
      if (activeItem > viewMax) {
        offset += offsetSize
        navLine.style.bottom = `${offset}px`
        viewMin++
        viewMax++
      }

      if (activeItem == 7) {
        downBtn.classList.add('nav-carousel__control_disabled')
      }
    })


    navLine.addEventListener('click', (e) => {
      items.forEach(item => {
        if (e.target == item) { return }
        item.classList.remove('nav-carousel__item_active')
      })
      if (e.target.localName == 'img') {
        e.target.parentNode.parentNode.classList.add('nav-carousel__item_active')
      }
    })
    setActiveItem()
    setOffsetSize()
    window.addEventListener('resize', setOffsetSize)
  }


  screenshotsCarousel()
  navCarousel()
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
    console.log(e.currentTarget.screen.width)
    if (e.currentTarget.screen.width < 1200) {
      hideMenu()
    } else { showMenu() }
  })
  menuBurgerBtn.addEventListener('click', handler)
}

let init = () => {
  carousels()
  footerCheckBoxValidator()
  menuBurger()
}

window.onload = () => {
  init()
}

document.addEventListener('DOMContentLoaded', darkness)