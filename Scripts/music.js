// =========================
// PLAYLIST
// =========================
const playlist = [
  {
    name: "Cidadela de Ouro",
    file: "assets/music/Cidadela de Ouro.mp3",
    bg: "assets/music/Cidadela de Ouro.png"
  },
  {
    name: "Salvation",
    file: "assets/music/Salvation.mp3",
    bg: "assets/music/Salvation.png"
  },
  {
    name: "Julgamento",
    file: "assets/music/Julgamento.mp3",
    bg: "assets/music/Julgamento.png"
  },
  {
    name: "Rebeldes de Aço",
    file: "assets/music/Rebeldes de Aço.mp3",
    bg: "assets/music/Rebeldes de Aço.png"
  },
  {
    name: "Escudo dos Justos",
    file: "assets/music/Escudo dos Justos.mp3",
    bg: "assets/music/Escudo dos Justos.png"
  },
  {
    name: "Velário Caído",
    file: "assets/music/Velário Caído.mp3",
    bg: "assets/music/Velário Caído.png"
  },
  {
    name: "Show de Desgraça",
    file: "assets/music/Show de Desgraça.mp3",
    bg: "assets/music/Show de Desgraça.png"
  },
  {
    name: "Descontrole",
    file: "assets/music/Descontrole.mp3",
    bg: "assets/music/Descontrole.png"
  },
  {
    name: "Um novo 'Eco'",
    file: "assets/music/Um novo 'Eco'.mp3",
    bg: "assets/music/Novo Eco.png"
  },
  {
    name: "Aqui é o fim?",
    file: "assets/music/Aqui é o fim.mp3",
    bg: "assets/music/Aqui é o fim.png"
  },
  {
    name: "O teste de Eccho",
    file: "assets/music/Um teste de Eccho.mp3",
    bg: "assets/music/O teste de Eccho.png"
  },
  {
    name: "Away",
    file: "assets/music/Away.mp3",
    bg: "assets/music/Away.png"
  },
  {
    name: "Império",
    file: "assets/music/Império.mp3",
    bg: "assets/music/Império.png"
  },
];

let currentTrack = 0;

const music = document.getElementById("music");
music.volume = 0.2;

function togglePlaylist() {
  if (!requireMaster("abrir a playlist")) return;

  const list = document.getElementById("music-list");
  list.style.display = list.style.display === "block" ? "none" : "block";
}
// =========================
// PLAYLIST — SESSÕES
// =========================

document.querySelectorAll(".session-title").forEach(title => {
  title.addEventListener("click", () => {

    const currentTracks = title.nextElementSibling;
    const isOpen = !currentTracks.classList.contains("hidden");

    // Fecha todas as sessões
    document.querySelectorAll(".session-tracks").forEach(list => {
      list.classList.add("hidden");
    });

    document.querySelectorAll(".session-title").forEach(t => {
      t.innerText = t.innerText.replace("▼", "▶");
    });

    // Se estava fechada, abre
    if (!isOpen) {
      currentTracks.classList.remove("hidden");
      title.innerText = title.innerText.replace("▶", "▼");
    }
  });
});

function togglePlay() {
  if (!requireMaster("controlar a música")) return;

  musicRef.once("value", snap => {
    const data = snap.val();
    if (!data) return;

    if (data.playing) {
      // ⏸️ Pausar — salva onde parou
      musicRef.update({
        playing: false,
        pausedAt: music.currentTime
      });
    } else {
      // ▶️ Retomar — continua de onde parou
      musicRef.update({
        playing: true,
        startedAt: Date.now() - ((data.pausedAt || 0) * 1000)
      });
    }
  });
}

musicRef.on("value", (snapshot) => {
  const data = snapshot.val();
  if (!data) return;

  const track = playlist[data.track];
  if (!track) return;

  if (music.src !== track.file) {
    music.src = track.file;
  }

if (data.playing) {
  const elapsed = (Date.now() - data.startedAt) / 1000;

  if (Math.abs(music.currentTime - elapsed) > 0.5) {
    music.currentTime = elapsed;
  }

  music.play();
} else {
  music.pause();

  if (data.pausedAt !== undefined) {
    music.currentTime = data.pausedAt;
  }
}
  document.getElementById("music-title").innerText = track.name;
  document.body.style.backgroundImage = `url('${track.bg}')`;
});

function toggleVolume() {
  const wrapper = document.querySelector(".volume-wrapper");
  wrapper.classList.toggle("active");
}

function setVolume(value) {
  music.volume = parseFloat(value);

  // salva localmente
  localStorage.setItem("musicVolume", value);
}
const savedVolume = localStorage.getItem("musicVolume");
if (savedVolume !== null) {
  music.volume = parseFloat(savedVolume);
}

function playMusic(index) {
  if (!requireMaster("mudar a música")) return;

musicRef.set({
  track: index,
  playing: true,
  startedAt: Date.now(),
  pausedAt: 0
});
  addLog(`🎵 ${window.playerName} mudou a música`);
}

window.togglePlaylist = togglePlaylist;
window.togglePlay = togglePlay;
window.toggleVolume = toggleVolume;
window.setVolume = setVolume;
window.playMusic = playMusic;
