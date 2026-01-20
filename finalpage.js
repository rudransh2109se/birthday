window.onload = function () {

  /* ===== BALLOONS ===== */

  function createBalloons(count) {
    const container = document.getElementById("balloons-container");

    for (let i = 0; i < count; i++) {
      const balloon = document.createElement("div");
      balloon.className = "balloon";

      balloon.style.left = Math.random() * 90 + "vw";
      balloon.style.width = "50px";
      balloon.style.height = "70px";
      balloon.style.backgroundImage = 'url("balloon.png")';
      balloon.style.backgroundSize = "contain";
      balloon.style.backgroundRepeat = "no-repeat";
      balloon.style.animationDuration = (4 + Math.random() * 3) + "s";

      container.appendChild(balloon);

      balloon.addEventListener("animationend", () => balloon.remove());
    }
  }

  // start balloons
  createBalloons(20);
  setInterval(() => createBalloons(5), 3000);


  /* ===== HEARTS ===== */

  function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤️";

    const x = Math.random() * window.innerWidth;
    heart.style.left = x + "px";
    heart.style.animationDuration = (6 + Math.random() * 4) + "s";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 12000);
  }

  // start hearts
  setInterval(createHeart, 500);

};
