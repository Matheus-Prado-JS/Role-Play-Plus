const db = firebase.database();
const playersRef = db.ref("players");
const musicRef = db.ref("music");
const logRef = db.ref("log");
const backgroundRef = db.ref("background");
logRef.limitToLast(50).on("child_added", (snapshot) => {
  const data = snapshot.val();
  if (!data || !data.text) return;

  renderLog(data.text);
});
logRef.on("value", (snapshot) => {
  if (!snapshot.exists()) {
    const log = document.getElementById("log");
    if (log) log.innerHTML = "";
  }
});

playersRef.on("child_added", (snapshot) => {
  const data = snapshot.val();
  if (!data || !data.name) return;

  renderPlayer(snapshot.key, data.name);
});


playersRef.on("child_removed", (snapshot) => {
  const data = snapshot.val();
  if (!data || !data.name) return;

  removePlayer(snapshot.key);
});
function removePlayer(playerId) {
  const li = document.querySelector(
    `#players-list li[data-player-id="${playerId}"]`
  );

  if (li) li.remove();
  renderedPlayers.delete(playerId);
}




function enterRoom() {
  window.location.href = "room1.html";
}
const modal = document.getElementById("name-modal");
const input = document.getElementById("player-name-input");
const button = document.getElementById("confirm-name");


const playersList = document.getElementById("players-list");


const renderedPlayers = new Set();

function renderPlayer(playerId, name) {
  if (renderedPlayers.has(playerId)) return;

  renderedPlayers.add(playerId);

  const li = document.createElement("li");
  li.dataset.playerId = playerId;

  if (name.toLowerCase().includes("moderador")) {
    li.innerHTML = `<span class="player-icon master">✹</span> ${name}`;
    li.classList.add("player-master");
  } else {
    li.innerHTML = `<span class="player-icon">✦</span> ${name}`;
  }

  playersList.appendChild(li);
}
function registerPlayer(name) {
  const playerRef = db.ref("players/" + playerId);

  playerRef.once("value", snap => {
    if (snap.exists()) return; // 👈 já registrado, sai fora

    const connectedRef = db.ref(".info/connected");
    connectedRef.on("value", (snap) => {
      if (snap.val() === true) {
        playerRef.onDisconnect().remove();
      }
    });

    playerRef.set({
      name: name,
      joinedAt: Date.now()
    });
  });
}




// Verifica se já tem nome
const storedName = localStorage.getItem("playerName");
let playerId = localStorage.getItem("playerId");

if (!playerId) {
  playerId = crypto.randomUUID();
  localStorage.setItem("playerId", playerId);
}


if (!storedName) {
  modal.classList.remove("hidden");
} else {
  window.playerName = storedName;
  registerPlayer(storedName);
}

function isMaster() {
  return window.playerName &&
    window.playerName.toLowerCase().includes("moderador");
}

button.addEventListener("click", () => {
  const name = input.value.trim();
  if (!name) return;

  localStorage.setItem("playerName", name);
  window.playerName = name;

  modal.classList.add("hidden");

  addLog(`🧙 ${name} entrou na mesa.`);
  registerPlayer(name);
});


input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    button.click();
  }
});




function goHome() {
  window.location.href = "index.html";
}

function addLog(text) {
  logRef.push({
    text: text,
    at: Date.now()
  });
}

function renderLog(text) {
  const log = document.getElementById("log");
  if (!log) return;

  const li = document.createElement("li");
  li.innerText = text;
  log.prepend(li);
}


// =========================
// SISTEMA DE DADOS (NOVO)
// =========================

let diceSelection = {};

function selectDice(type) {
  if (!diceSelection[type]) {
    diceSelection[type] = 0;
  }

  diceSelection[type]++;

  const counter = document.getElementById(`count-d${type}`);
  counter.innerText = diceSelection[type];
  counter.style.display = "block";
}

function rollAllDice() {
  let allResults = [];
  let logDetails = [];

  for (let dice in diceSelection) {
    const times = diceSelection[dice];

    for (let i = 0; i < times; i++) {
      const roll = Math.floor(Math.random() * dice) + 1;
      allResults.push(roll);
      logDetails.push(`D${dice}: ${roll}`);
    }
  }

  if (allResults.length === 0) {
    document.getElementById("dice-result").innerText = "Nenhum dado selecionado";
    return;
  }

  const total = allResults.reduce((a, b) => a + b, 0);
  const highest = Math.max(...allResults);

  /* RESULTADO LIMPO */
  document.getElementById("dice-result").innerHTML = `
    <div>Total: <strong>${total}</strong></div>
    <div>Maior Dado: <strong>${highest}</strong></div>
  `;

const roller = window.playerName || "Alguém";
addLog(`🎲 ${roller} rolou: ${logDetails.join(" | ")} → Total: ${total}`);


  resetDice();
}
function clearLog() {
  if (!isMaster()) {
    addLog("🚫 Apenas o Moderador pode limpar o log.");
    return;
  }

  logRef.remove();
}



function resetDice() {
  diceSelection = {};

  document.querySelectorAll(".dice-count").forEach(counter => {
    counter.innerText = "";
    counter.style.display = "none";
  });
}
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
  }
];

let currentTrack = 0;

const music = document.getElementById("music");
music.volume = 0.2;



function togglePlaylist() {
  if (!requireMaster("abrir a playlist")) return;

  const list = document.getElementById("music-list");
  list.style.display = list.style.display === "block" ? "none" : "block";
}

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



function requireMaster(actionName = "essa ação") {
  if (!isMaster()) {
    addLog(`🚫 Apenas o Moderador pode ${actionName}.`);
    return false;
  }
  return true;
}
const bgButton = document.querySelector('[data-action="background"]');
const bgPanel = document.getElementById("background-selector");

if (bgButton) {
  bgButton.addEventListener("click", () => {
    if (!requireMaster("alterar o plano de fundo")) return;

    bgPanel.classList.toggle("hidden");
  });
}
document.addEventListener("click", (e) => {
  if (!bgPanel || bgPanel.classList.contains("hidden")) return;

  if (
    !bgPanel.contains(e.target) &&
    !bgButton.contains(e.target)
  ) {
    bgPanel.classList.add("hidden");
  }
});
const bgOptions = document.querySelectorAll(".background-options li");

bgOptions.forEach(option => {
  option.addEventListener("click", () => {
    if (!requireMaster("mudar o plano de fundo")) return;

    const bgFile = option.dataset.bg;

    backgroundRef.set({
      current: bgFile,
      changedBy: window.playerName || "Moderador",
      at: Date.now()
    });

    bgPanel.classList.add("hidden");
  });
});
backgroundRef.on("value", (snapshot) => {
  const data = snapshot.val();
  if (!data || !data.current) return;

  const bgFile = data.current;

  const bgMain = document.getElementById("bg-main");
  const bgFade = document.getElementById("bg-fade");

  if (!bgMain || !bgFade) return;

  // evita trocar pra mesma imagem
  if (bgMain.src.includes(bgFile)) return;

  // prepara a imagem de transição
  bgFade.src = `assets/backgrounds/${bgFile}`;
  bgFade.classList.add("active");

  // após o fade, troca os papéis
  setTimeout(() => {
    bgMain.src = bgFade.src;
    bgFade.classList.remove("active");
  }, 600);

  // UI do painel
  document.querySelectorAll(".background-options li").forEach(li => {
    li.classList.toggle("active", li.dataset.bg === bgFile);
  });
});


backgroundRef.once("value", snap => {
  if (!snap.exists()) {
    backgroundRef.set({
      current: "Capa.png",
      at: Date.now()
    });
  }
});


