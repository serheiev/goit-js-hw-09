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
    for (let key in setDate) {
      document.querySelector(`[data-${key}]`).textContent = String(
        setDate[key]
      ).padStart(2, '0');
    }

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
