import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startButton = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const daysLabel = document.querySelector('[data-days]');
const hoursLabel = document.querySelector('[data-hours]');
const minutesLabel = document.querySelector('[data-minutes]');
const secondsLabel = document.querySelector('[data-seconds]');
const time = document.querySelector('.timer');

let selectedDate = null;
startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.dir(selectedDates[0]);

    if (selectedDates[0] - Date.now() > 1000) {
      startButton.disabled = false;
      selectedDate = selectedDates[0];
    } else {
      window.alert('Please choose a date in the future');
    }
  },
};

flatpickr('#datetime-picker', options);

const timer = {
  intervalId: null,

  start() {
    startButton.disabled = true;
    const startTime = selectedDate;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;

      const time = convertMs(deltaTime);
      updateClockface(time);
      if (deltaTime <= 1000) {
        clearInterval(this.intervalId);
      }
    }, 1000);
  },
};

startButton.addEventListener('click', () => {
  timer.start();
});
function updateClockface({ days, hours, minutes, seconds }) {
  daysLabel.textContent = addLeadingZero(days);
  hoursLabel.textContent = addLeadingZero(hours);
  minutesLabel.textContent = addLeadingZero(minutes);
  secondsLabel.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

time.style.position = 'absolute';
time.style.top = '50%';
time.style.left = '50%';
time.style.transform = 'translateX(-50%) translateY(-50%)';
time.style.color = 'red';
time.style.fontSize = '34px';
time.style.fontFamily = 'Orbitron';
time.style.letterSpacing = '7px';
time.style.display = 'flex';
