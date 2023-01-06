const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);

const timer = 1000;
let intervalId = null;
isDisabled = false;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function start() {
  isDisabled = !isDisabled;
  startButton.disabled = isDisabled;
  stopButton.disabled = false;

  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, timer);
}

function stop() {
  isDisabled = !isDisabled;
  startButton.disabled = isDisabled;
  stopButton.disabled = true;

  clearInterval(intervalId);
  intervalId = null;
}
