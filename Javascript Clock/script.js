setInterval(setClock, 1000);

const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')

function setClock() {
  const currentDate = new Date();
  const secondsRatio = currentDate.getSeconds() / 60; //how we rotate our second hand
  //seconds represent fractions of minutes here for gradual progression
  const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
  const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;

  setRotation(secondHand, secondsRatio); //gets the rotation of a second after the second from its ratio
  setRotation(minuteHand, minutesRatio);
  setRotation(hourHand, hoursRatio);
}

//working with our rotate in our css
const setRotation = (element, rotationRatio) => {
    element.style.setProperty('--rotation', rotationRatio * 360)
}

//when this page executes immediately sets the clock
setClock();