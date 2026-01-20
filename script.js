// Countdown
const targetDate = new Date("January 20, 2026 09:05:00").getTime();
const countdownEl = document.getElementById("countdown");
const countdownContainer = document.getElementById("countdown-container");
const birthdayMsg = document.getElementById("birthday-message");

const timer = setInterval(() => {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff <= 0) {
    clearInterval(timer);
    countdownContainer.style.display = "none"; // hide countdown
    birthdayMsg.style.display = "block"; // show birthday message
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

// Surprise Button Click
document.getElementById("surprise-btn").addEventListener("click", () => {
  window.location.href = "password.html"; // go to password page
});
