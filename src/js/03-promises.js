const delay = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');
const form = document.querySelector('.form');

delay.addEventListener('input', delayValue);
step.addEventListener('input', stepValue);
amount.addEventListener('input', amountValue);

let intervalId = amountValue;

let amountTextValue = 0;
let stepTextValue = 0;
let delayTextValue = 0;

function delayValue(e) {
  delayTextValue = Math.floor(e.target.value);
}

function stepValue(e) {
  stepTextValue = Math.floor(e.target.value);
}

function amountValue(e) {
  amountTextValue = Math.floor(e.target.value);
}

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  for (let i = 0; i < amountTextValue; i += 1) {
    let position = i + 1;
    let delay = delayTextValue + stepTextValue * i;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
