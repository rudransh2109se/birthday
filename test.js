window.onload = function () {

  const box = document.getElementById("testBox");

  let pos = 0;

  setInterval(() => {
    pos += 2;
    box.style.transform = "translateY(" + (-pos) + "px)";
  }, 16);

};
