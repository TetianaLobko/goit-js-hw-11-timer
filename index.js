const daysRef = document.querySelector('span[data-value="days"]');
const hoursRef = document.querySelector('span[data-value="hours"]');
const minsRef = document.querySelector('span[data-value="mins"]');
const secsRef = document.querySelector('span[data-value="secs"]');
const timerRef = document.querySelector('#timer-1');

timerRef.insertAdjacentHTML('beforebegin', '<h1 class="header">До окончания распродажи</h1>');

class CountdownTimer {
  constructor({ selector, targetDate, onTick }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.intervalId = null;
    this.onTick = onTick;
  }

  startTimer() {
    const currentTime = Date.now();
    const deltaTime = this.targetDate - currentTime;
    const time = this.getTimeComponents(deltaTime);
    if (deltaTime < 0) {
      this.stopTimer();
      return;
    }
    this.onTick(time);
    this.intervalId = setInterval(() => {
      this.startTimer();
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.intervalId);
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }

  getTimeComponents(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }
}

function updateTimeValue({ days, hours, mins, secs }) {
  daysRef.textContent = `${days}`;
  hoursRef.textContent = `${hours}`;
  minsRef.textContent = `${mins}`;
  secsRef.textContent = `${secs}`;
}
const countdownTimer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("June 03, 2021, 09:00:00"),
  onTick: updateTimeValue,
});

countdownTimer.startTimer();