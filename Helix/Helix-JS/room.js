const playersBtn = document.getElementById("playersBtn");
const playersPanel = document.getElementById("playersPanel");

playersBtn.addEventListener("click", () => {
  playersPanel.classList.toggle("active");
});

function goBack() {
  window.location.href = "../index.html";
}