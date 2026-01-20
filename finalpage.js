alert("FINAL PAGE JS LOADED");
// Balloon pop-up function
function createBalloons(count) {
  const container = document.getElementById("balloons-container");

  for (let i = 0; i < count; i++) {
    const balloon = document.createElement("div");
    balloon.className = "balloon";

    balloon.style.left = Math.random() * 90 + "vw";
    balloon.style.width = "50px";
    balloon.style.height = "70px";
    balloon.style.backgroundImage = <balloon.png>;
    balloon.style.backgroundSize = "contain";
    balloon.style.backgroundRepeat = "no-repeat";
    balloon.style.animationDuration = 4 + Math.random() * 3 + "s";

    container.appendChild(balloon);

    balloon.addEventListener("animationend", () => balloon.remove());
  }
}

window.onload = () => {
  createBalloons(20);
  setInterval(() => createBalloons(5), 3000);
};

window.onload = function () {

  const heart = document.createElement("div");
  heart.innerHTML = "❤️";
  heart.style.position = "absolute";
  heart.style.bottom = "-40px";
  heart.style.left = "50%";
  heart.style.fontSize = "40px";
  heart.style.zIndex = "999999";

  // attach DIRECTLY to <html>, not body
  document.documentElement.appendChild(heart);

  let pos = -40;

  function move() {
    pos += 2;
    heart.style.bottom = pos + "px";

    if (pos < window.innerHeight + 50) {
      requestAnimationFrame(move);
    } else {
      heart.remove();
    }
  }

  move();
};


