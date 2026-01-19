document.getElementById("submit-btn").addEventListener("click", () => {
  const input = document.getElementById("password-input").value.trim().toLowerCase();
  const result = document.getElementById("result");

  if(input === "17 december") {
    window.location.href = "nextpage.html"; // correct password page
  } else {
    result.innerHTML = `
      <img src="sad-panda.png" style="width:120px; display:block; margin:auto;">
      <p style="color:#c63b6f; font-weight:bold;">How can you forget the date? Try again 😢</p>
    `;
  }
});
