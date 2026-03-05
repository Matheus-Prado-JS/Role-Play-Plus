const audio = new Audio();
audio.volume = 0.5;

const playPauseBtn = document.getElementById("playPause");
const volumeControl = document.getElementById("volumeControl");
const playlistToggle = document.getElementById("togglePlaylist");
const playlist = document.getElementById("playlist");
const musicTitle = document.getElementById("musicTitle");

const tracks = document.querySelectorAll(".helix-playlist li");

let currentTrack = 0;

/* INICIALIZA PRIMEIRA */
if (tracks.length > 0) {
  audio.src = tracks[0].dataset.src;
}

/* PLAY / PAUSE */
playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "❚❚";
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶";
  }
});

/* VOLUME */
volumeControl.addEventListener("input", (e) => {
  audio.volume = e.target.value;
});

/* EXPANDIR PLAYLIST */
playlistToggle.addEventListener("click", () => {
  playlist.classList.toggle("active");
});

/* TROCAR MÚSICA */
tracks.forEach((track, index) => {
  track.addEventListener("click", () => {
    currentTrack = index;
    audio.src = track.dataset.src;
    musicTitle.textContent = track.textContent;
    audio.play();
    playPauseBtn.textContent = "❚❚";
  });
});