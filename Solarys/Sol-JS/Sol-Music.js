import { db, ref, set, onValue, ROOM } from "./Sol-Fire.js";
import { currentUser } from "./Sol-System.js";

// ==========================
// 🎵 PLAYLIST (CONTROLADA VIA JS)
// ==========================

const playlist = [
  {
    chapter: "Capítulo 1: Prólogo",
    tracks: [
      {
        name: "Fazenda Serenna",
        src: "Sol-Assets/Sol-Music/Fazenda de Serenna.mp3",
        cover: "Sol-Assets/Sol-Music/Fazenda de Serenna.png"
      },
      {
        name: "Avelorn",
        src: "Sol-Assets/Sol-Music/Avelorn.mp3",
        cover: "Sol-Assets/Sol-Music/Avelorn.png"
      },
      {
        name: "Império",
        src: "Sol-Assets/Sol-Music/Império.mp3",
        cover: "Sol-Assets/Sol-Music/Império.png"
      },
    ]
  },
    {
    chapter: "Capítulo 2: Jornada",
    tracks: [
      {
        name: "Caminho de Loren",
        src: "Sol-Assets/Sol-Music/Caminho de Loren.mp3",
        cover: "Sol-Assets/Sol-Music/Caminho de Loren.png"
      },
      {
        name: "Filhos do Musgo",
        src: "Sol-Assets/Sol-Music/Filhos do Musgo.mp3",
        cover: "Sol-Assets/Sol-Music/Filhos do Musgo.png"
      },
      {
        name: "Cervo de Loren",
        src: "Sol-Assets/Sol-Music/Cervo de Loren.mp3",
        cover: "Sol-Assets/Sol-Music/Cervo de Loren.png"
      },
      {
        name: "Zhalem",
        src: "Sol-Assets/Sol-Music/Zhalem.mp3",
        cover: "Sol-Assets/Sol-Music/Zhalem.png"
      },
      {
        name: "Distrito Baixo",
        src: "Sol-Assets/Sol-Music/Distrito Baixo.mp3",
        cover: "Sol-Assets/Sol-Music/Distrito Baixo.png"
      },
      {
        name: "Lua Negra",
        src: "Sol-Assets/Sol-Music/Lua Negra.mp3",
        cover: "Sol-Assets/Sol-Music/Lua Negra.png"
      },
      {
        name: "Korv",
        src: "Sol-Assets/Sol-Music/Korv.mp3",
        cover: "Sol-Assets/Sol-Music/Korv.png"
      },
      {
        name: "Esconderijo",
        src: "Sol-Assets/Sol-Music/Esconderijo.mp3",
        cover: "Sol-Assets/Sol-Music/Esconderijo.png"
      },
      {
        name: "O Mimico",
        src: "Sol-Assets/Sol-Music/O Mimico.mp3",
        cover: "Sol-Assets/Sol-Music/O Mimico.png"
      },
      {
        name: "Grande Madeira Apodrecida",
        src: "Sol-Assets/Sol-Music/Grande Madeira Apodrecida.mp3",
        cover: "Sol-Assets/Sol-Music/Grande Madeira Apodrecida.png"
      },
      {
        name: "Pedrafria",
        src: "Sol-Assets/Sol-Music/Pedrafria.mp3",
        cover: "Sol-Assets/Sol-Music/Pedrafria.png"
      },
      {
        name: "Passagem",
        src: "Sol-Assets/Sol-Music/Passagem.mp3",
        cover: "Sol-Assets/Sol-Music/Passagem.png"
      },
      {
        name: "Tundra de Orphelia",
        src: "Sol-Assets/Sol-Music/Tundra de Orphelia.mp3",
        cover: "Sol-Assets/Sol-Music/Tundra de Orphelia.png"
      },
      {
        name: "Ruínas de Orphelia",
        src: "Sol-Assets/Sol-Music/Ruínas de Orphelia.mp3",
        cover: "Sol-Assets/Sol-Music/Ruínas de Orphelia.png"
      },
      {
        name: "Lyrenne",
        src: "Sol-Assets/Sol-Music/Lyrenne.mp3",
        cover: "Sol-Assets/Sol-Music/Lyrenne.png"
      },
      {
        name: "Cavaleiro Kael",
        src: "Sol-Assets/Sol-Music/Cavaleiro Kael.mp3",
        cover: "Sol-Assets/Sol-Music/Cavaleiro Kael.png"
      },
      {
        name: "Praga",
        src: "Sol-Assets/Sol-Music/Praga.mp3",
        cover: "Sol-Assets/Sol-Music/Praga.png"
      },
    ]
  },
    {
    chapter: "Capítulo 3: Cordilheira",
    tracks: [
      {
        name: "Naath, Caçadora do Inverno",
        src: "Sol-Assets/Sol-Music/Naath.mp3",
        cover: "Sol-Assets/Sol-Music/Naath.png"
      },
    ]
  },
  {
    chapter: "Capítulo 8: Destino",
    tracks: [
      {
        name: "A Última Batalha",
        src: "Sol-Assets/Sol-Music/A Última Batalha.mp3",
        cover: "Sol-Assets/Sol-Music/A Última Batalha.png"
      },
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

audio.addEventListener("ended", () => {
  audio.currentTime = 0;
  audio.play();
});

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

  // 🔒 só moderador controla música global
  if (currentUser !== "Moderador") return;

  const track = playlist[sectionIndex].tracks[trackIndex];
  if (!track) return;

  const startTime = Date.now();

  // 🔥 envia pro Firebase (UMA VEZ SÓ)
  set(ref(db, `rooms/${ROOM}/music`), {
    sectionIndex,
    trackIndex,
    startTime
  });

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

  // 🔒 só moderador controla
  if (currentUser !== "Moderador") return;

  const isPaused = !audio.paused;

  // 🔥 salva estado global
  set(ref(db, `rooms/${ROOM}/musicState`), {
    paused: isPaused,
    time: audio.currentTime,
    timestamp: Date.now()
  });

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

onValue(ref(db, `rooms/${ROOM}/music`), (snapshot) => {

  const data = snapshot.val();
  if (!data) return;

  const { sectionIndex, trackIndex, startTime } = data;

  const track = playlist[sectionIndex]?.tracks[trackIndex];
  if (!track) return;

  // ⏱️ calcula tempo atual SEM FIREBASE
  const now = Date.now();
  const elapsed = (now - startTime) / 1000;

  currentTrack = { sectionIndex, trackIndex };

  audio.src = track.src;

  // 🔥 evita glitch
  audio.addEventListener("loadedmetadata", () => {
  const safeTime = elapsed % audio.duration;
  audio.currentTime = safeTime;
  });

  audio.play();

  updateUI(track);
});

onValue(ref(db, `rooms/${ROOM}/musicState`), (snapshot) => {

  const data = snapshot.val();
  if (!data) return;

  const { paused, time, timestamp } = data;

  // calcula delay real
  const now = Date.now();
  const delay = (now - timestamp) / 1000;

  if (paused) {
    audio.pause();
    audio.currentTime = time;
  } else {
    audio.currentTime = time + delay;
    audio.play();
  }

});

// 🔒 esconder menu para não-moderador
function updateMusicPermissions() {

  if (currentUser === "Moderador") {
    musicToggle.style.display = "block";
  } else {
    musicToggle.style.display = "none";
    musicMenu.style.display = "none";
  }

}

// roda sempre
setInterval(updateMusicPermissions, 1000);