export default function smoothHorizontalScroll(list, row, rowWidth, config = {}) {

  let touchStart = 0
  let scrollX = 0
  let lastScrollX = 0
  let activeInterval = true

  let touchInit = 0
  let touchEnd = 0

  let velocity = 0
  let touch = false

  let chosenVelocity
  if(config?.velocity && config?.velocity !== '') {
    chosenVelocity = Math.abs(Number(config.velocity))
    if(chosenVelocity > 200) {
      chosenVelocity = 200
    }
  }else {
    chosenVelocity = 50
  }
  
  let chosenRollingTime
  if(config?.rollingTime && config?.rollingTime !== '') {
    chosenRollingTime = (Math.abs(Number(config.rollingTime)))/2
    if(chosenRollingTime > 200) {
      chosenRollingTime = 200
    }
  }else {
    chosenRollingTime = 12
  }

  const handleTouchStart = e => {
    touchStart = e.touches[0].clientX
    velocity = 0
    touch = true
  }

  const handleTouchMove = e => {
    let touchMove = e.changedTouches[0].clientX
    scrollX = (touchMove - touchStart) + lastScrollX
    if(scrollX > 0 ) scrollX = 0;
    if(scrollX < -(rowWidth - window.innerWidth)) {
      scrollX = -rowWidth + window.innerWidth
    }
    row.style.transform = `translateX(${scrollX}px)`

      if(activeInterval) {
        activeInterval = false
        touchInit = scrollX

        setTimeout( () => {
          touchEnd = scrollX
          velocity = touchEnd - touchInit
          touchInit = 0
          touchEnd = 0   
          activeInterval = true
        }, 40)
      }
  }

  const handleTouchEnd = () => {
    lastScrollX = scrollX
    touch = false

    if(velocity > 2 || velocity < -2) {
      let instantVel = velocity*(chosenVelocity/100)
      let rollingTime = Math.abs(velocity*chosenRollingTime)
      let brake =  instantVel/(rollingTime/20)
      let timer = setInterval(() => {
        if(touch) clearInterval(timer);
        instantVel = instantVel - brake
        lastScrollX = lastScrollX + instantVel
        if(lastScrollX > 0 ) lastScrollX = 0;
        if(lastScrollX < -(rowWidth - window.innerWidth)) {
          lastScrollX = -rowWidth + window.innerWidth
        }
        scrollX = lastScrollX
        row.style.transform = `translateX(${lastScrollX}px)`
      }, 20);

      setTimeout( () => {
        clearInterval(timer)
      }, rollingTime)
    }
  }

  list.addEventListener('touchstart', handleTouchStart)
  list.addEventListener('touchmove', handleTouchMove)
  list.addEventListener('touchend', handleTouchEnd)

}