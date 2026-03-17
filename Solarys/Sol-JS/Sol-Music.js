const musicToggle = document.getElementById("music-toggle");
const musicMenu = document.getElementById("music-menu");
const musicOptions = document.querySelectorAll(".music-option");

const musicCover = document.getElementById("music-cover");
const musicName = document.getElementById("music-name");

const playPauseBtn = document.getElementById("play-pause");
const volumeSlider = document.getElementById("volume");

// player
const audio = new Audio();
audio.volume = 0.5;

// ==========================
// MENU
// ==========================

musicToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  musicMenu.classList.toggle("hidden");
});

document.addEventListener("click", () => {
  musicMenu.classList.add("hidden");
});

musicMenu.addEventListener("click", (e) => {
  e.stopPropagation();
});

// ==========================
// TOCAR MÚSICA
// ==========================

musicOptions.forEach(option => {
  option.addEventListener("click", () => {

    const src = option.dataset.src;
    const cover = option.dataset.cover;
    const name = option.dataset.name;

    audio.src = src;
    audio.play();

    musicCover.src = cover;
    musicName.textContent = name;

  });
});

// ==========================
// PLAY / PAUSE
// ==========================

playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

// ==========================
// VOLUME
// ==========================

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});