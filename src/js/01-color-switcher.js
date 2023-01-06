const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);

const timer = 1000;
let intervalId = null;

stopButton.disabled = true;
startButton.disabled = false;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function start() {
  startButton.disabled = true;
  stopButton.disabled = false;
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, timer);
}

function stop() {
  stopButton.disabled = true;
  startButton.disabled = false;
  clearInterval(intervalId);
  intervalId = null;
}
