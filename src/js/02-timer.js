import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
const inpDate = document.querySelector('#datetime-picker');
const inpBtn = document.querySelector('[data-start]');
const fp = flatpickr('#datetime-picker', options);
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

let userDate = null;
inpBtn.setAttribute('disabled', true);

inpDate.addEventListener('input', e => {
  userDate = new Date(e.target.value);
  console.log(userDate);
  if (userDate >= options.defaultDate) {
    inpBtn.removeAttribute('disabled');
  } else {
    inpBtn.setAttribute('disabled', true);
    Notiflix.Notify.failure('Please choose a date in the future');
  }
});

inpBtn.addEventListener('click', startTimer);
let interval = null;
function startTimer() {
  let convDate = userDate - options.defaultDate;
  interval = setInterval(() => {
    let setDate = convertMs(convDate);
    timerDays.textContent = ('0' + setDate.days).slice(-2);
    timerHours.textContent = ('0' + setDate.hours).slice(-2);
    timerMinutes.textContent = ('0' + setDate.minutes).slice(-2);
    timerSeconds.textContent = ('0' + setDate.seconds).slice(-2);
    convDate -= 1000;
    if (convDate <= 0) {
      clearInterval(interval);
    }
  }, 1000);
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
