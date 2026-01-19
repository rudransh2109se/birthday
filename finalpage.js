// Balloon pop-up function
function createBalloons(count) {
  const container = document.getElementById('balloons-container');
  for(let i = 0; i < count; i++) {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloon.style.left = Math.random() * 90 + 'vw';
    balloon.style.backgroundImage = "balloon.png"; // free balloon image
    balloon.style.backgroundSize = 'contain';
    balloon.style.backgroundRepeat = 'no-repeat';
    balloon.style.width = '50px';
    balloon.style.height = '70px';
    balloon.style.animationDuration = 4 + Math.random() * 3 + 's';
    container.appendChild(balloon);

    // Remove balloon after animation
    balloon.addEventListener('animationend', () => balloon.remove());
  }
}

// Trigger balloons on page load
window.onload = () => {
  createBalloons(20); // create 20 balloons

  // Optional: keep spawning every few seconds for continuous effect
  setInterval(() => createBalloons(5), 3000);
};
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "❤";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (5 + Math.random() * 4) + "s";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 9000);
}

// create hearts continuously
setInterval(createHeart, 600);
