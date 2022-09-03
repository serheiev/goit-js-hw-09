const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerChangeColor = null;
btnStop.setAttribute('disabled', true);
let rndColor = function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

btnStart.addEventListener('click', startChangeColor);

function startChangeColor() {
  timerChangeColor = setInterval(() => {
    body.style.backgroundColor = rndColor();
  }, 1000);

  btnStart.setAttribute('disabled', true);
  btnStop.removeAttribute('disabled');
}

btnStop.addEventListener('click', stopChangeColor);

function stopChangeColor() {
  clearInterval(timerChangeColor);
  btnStart.removeAttribute('disabled');
  btnStop.setAttribute('disabled', true);
}
