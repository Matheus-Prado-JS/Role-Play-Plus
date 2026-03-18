// ==========================
// 🎵 PLAYLIST (CONTROLADA VIA JS)
// ==========================

const playlist = [
  {
    chapter: "Capítulo 1: Prólogo",
    tracks: [
      {
        name: "A Última Batalha",
        src: "Sol-Assets/Sol-Music/A Última Batalha.mp3",
        cover: "Sol-Assets/Sol-Music/A Última Batalha.png"
      }
    ]
  },
  {
    chapter: "Capítulo 2: Jornada",
    tracks: [
      {
        name: "A Última Batalha II",
        src: "Sol-Assets/Sol-Music/A Última Batalha Parte II.mp3",
        cover: "Sol-Assets/Sol-Music/A Última Batalha Parte II.png"
      },
      {
        name: "A Última Batalha III",
        src: "Sol-Assets/Sol-Music/A Última Batalha Parte III.mp3",
        cover: "Sol-Assets/Sol-Music/A Última Batalha Parte III.png"
      }
    ]
  }
];

let currentTrack = null;

// ==========================
// 🎧 ELEMENTOS
// ==========================

const musicMenu = document.getElementById("music-menu");
const musicToggle = document.getElementById("music-toggle");

const musicCover = document.getElementById("music-cover");
const musicName = document.getElementById("music-name");

const playPauseBtn = document.getElementById("play-pause");
const volumeSlider = document.getElementById("volume");

const progressBar = document.getElementById("music-progress-bar");

// player
const audio = new Audio();
audio.volume = 0.5;

// ==========================
// 🎵 GERAR PLAYLIST (AUTO)
// ==========================

function loadPlaylist() {
  musicMenu.innerHTML = "";

  playlist.forEach((section, sectionIndex) => {

    // 🔹 TÍTULO DO CAPÍTULO
    const title = document.createElement("div");
    title.classList.add("music-chapter");
    title.textContent = "▶ " + section.chapter;

    // 🔹 LISTA DE MÚSICAS
    const list = document.createElement("div");
    list.classList.add("music-tracks", "hidden");

    // toggle abrir/fechar
    title.addEventListener("click", () => {
      const isOpen = !list.classList.contains("hidden");

      // fecha todos
      document.querySelectorAll(".music-tracks").forEach(el => el.classList.add("hidden"));
      document.querySelectorAll(".music-chapter").forEach(el => {
        el.textContent = el.textContent.replace("▼", "▶");
      });

      if (!isOpen) {
        list.classList.remove("hidden");
        title.textContent = title.textContent.replace("▶", "▼");
      }
    });

    // 🔹 MÚSICAS
    section.tracks.forEach((track, trackIndex) => {
      const div = document.createElement("div");

      div.classList.add("music-option");
      div.textContent = track.name;

      div.addEventListener("click", () => {
        playMusic(sectionIndex, trackIndex);
      });

      list.appendChild(div);
    });

    musicMenu.appendChild(title);
    musicMenu.appendChild(list);
  });
}

loadPlaylist();

// ==========================
// ▶️ TOCAR MÚSICA
// ==========================

function playMusic(sectionIndex, trackIndex) {
  const track = playlist[sectionIndex].tracks[trackIndex];
  if (!track) return;

  currentTrack = { sectionIndex, trackIndex };

  audio.src = track.src;
  audio.currentTime = 0;
  audio.play();

  updateUI(track);

  progressBar.style.width = "0%";
}

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = progress + "%";
});

// ==========================
// 🎨 UI
// ==========================

function updateUI(track) {
  musicCover.src = track.cover;
  musicName.textContent = track.name;
}

// ==========================
// ⏯️ PLAY / PAUSE
// ==========================

playPauseBtn.addEventListener("click", () => {
  if (!audio.src) return;

  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

// ícone dinâmico
audio.addEventListener("play", () => {
  playPauseBtn.textContent = "⏸";
});

audio.addEventListener("pause", () => {
  playPauseBtn.textContent = "▶";
});

// ==========================
// 🔊 VOLUME
// ==========================

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
  localStorage.setItem("musicVolume", volumeSlider.value);
});

// carregar volume salvo
const savedVolume = localStorage.getItem("musicVolume");
if (savedVolume !== null) {
  audio.volume = savedVolume;
  volumeSlider.value = savedVolume;
}

// ==========================
// 📂 MENU
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