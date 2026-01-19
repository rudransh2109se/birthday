// Countdown
const targetDate = new Date("February 11, 2026 00:00:00").getTime();
const countdownEl = document.getElementById("countdown");
setInterval(() => {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff <= 0) {
    countdownEl.innerHTML = "Happy Birthday ❤️";
    return;
  }

  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff / (1000*60*60)) % 24);
  const minutes = Math.floor((diff / (1000*60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);

// Flirty texts
const texts = [
  "Counting every second until your smile ❤️",
  "You + Me = ❤️",
  "Almost 11 Feb… Can’t wait 😘",
  "Just thinking about you 💕"
];
let i = 0;
const flirtyEl = document.getElementById("flirty-text");
setInterval(() => {
  i = (i + 1) % texts.length;
  flirtyEl.innerText = texts[i];
}, 4000);

