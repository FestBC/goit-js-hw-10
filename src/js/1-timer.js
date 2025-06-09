import flatpickr from "flatpickr";
import iziToast from "izitoast";
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";


const datetimePicker = document.querySelector("#datetime-picker");
const btn = document.querySelector("button");
const daysValue = document.querySelector(".value[data-days]");
const hoursValue = document.querySelector(".value[data-hours]");
const minutesValue = document.querySelector(".value[data-minutes]");
const secondsValue = document.querySelector(".value[data-seconds]");

let userSelectedDate;

btn.disabled = true;

btn.addEventListener("click", (event) => {
  event.preventDefault();
  btn.disabled = true;
  datetimePicker.disabled = true;

  const timer = setInterval(() => {
    const timeDifference = userSelectedDate - Date.now();

    if (timeDifference > 0) {

      const { days, hours, minutes, seconds } = convertMs(timeDifference);
      const { fDays, fHours, fMinutes, fSeconds } = addLeadingZero({ days, hours, minutes, seconds });

      daysValue.textContent = fDays;
      hoursValue.textContent = fHours;
      minutesValue.textContent = fMinutes;
      secondsValue.textContent = fSeconds;

      console.log(`Interval timer is working: ${days}d, ${hours}h, ${minutes}m, ${seconds}s.`);
    } else {
      clearInterval(timer);
      datetimePicker.disabled = false;

      console.log("Interval timer has been stopped!");
    }
  }, 1000);
});

flatpickr(datetimePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      
      if (Date.now() <= selectedDates[0].getTime()) {
        userSelectedDate = selectedDates[0].getTime();
        btn.disabled = false;
      } else {
          iziToast.error({
            title: "Warning!",
            message: "Please choose a date in the future",
            position: "topCenter"
          });
          btn.disabled = true;
      }
    }
});

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
  
function addLeadingZero({ days, hours, minutes, seconds }) {
    const fDays = String(days).padStart(2, "0");
    const fHours = String(hours).padStart(2, "0");
    const fMinutes = String(minutes).padStart(2, "0");
    const fSeconds = String(seconds).padStart(2, "0");

    return { fDays, fHours, fMinutes, fSeconds };
}


console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

console.log(addLeadingZero(convertMs(2000))); // {fDays: "00", fHours: "00", fMinutes: "00", fSeconds: "02"}
console.log(addLeadingZero(convertMs(140000))); // {fDays: "00", fHours: "00", fMinutes: "02", fSeconds: "20"}
console.log(addLeadingZero(convertMs(24140000))); // {fDays: "00", fHours: "06" fMinutes: "42", fSeconds: "20"}