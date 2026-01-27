const db = firebase.database();
const playersRef = db.ref("players");
const musicRef = db.ref("music");
const logRef = db.ref("log");
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

  renderPlayer(data.name);
});

playersRef.on("child_removed", (snapshot) => {
  const data = snapshot.val();
  if (!data || !data.name) return;

  removePlayer(data.name);
});
function removePlayer(name) {
  const items = document.querySelectorAll("#players-list li");

  items.forEach(li => {
    if (li.textContent.includes(name)) {
      li.remove();
      renderedPlayers.delete(name);
    }
  });
}



function enterRoom() {
  window.location.href = "room1.html";
}
const modal = document.getElementById("name-modal");
const input = document.getElementById("player-name-input");
const button = document.getElementById("confirm-name");


const playersList = document.getElementById("players-list");


const renderedPlayers = new Set();

function renderPlayer(name) {
  if (renderedPlayers.has(name)) return;
  renderedPlayers.add(name);

  const li = document.createElement("li");

  if (name.toLowerCase().includes("moderador")) {
    li.textContent = `👑 ${name}`;
    li.classList.add("player-master");
  } else {
    li.textContent = name;
  }

  playersList.appendChild(li);
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

  const playerRef = db.ref("players/" + playerId);

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

// 🔥 PRESENÇA REAL
playerRef.onDisconnect().remove();

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
    name: "Lythael",
    file: "assets/music/Lythael.mp3",
    bg: "assets/Cidadela de Lythael.png"
  },
  {
    name: "Elaris",
    file: "assets/music/Elaris.mp3",
    bg: "assets/Vilarejo de Elaris.png"
  },
  {
    name: "Despedida",
    file: "assets/music/Despedida.mp3",
    bg: "assets/General Barok.png"
  },
  {
    name: "Propósito",
    file: "assets/music/Propósito.mp3",
    bg: "assets/Kaelen, A Espada.png"
  }
];

let currentTrack = 0;

const music = document.getElementById("music");
music.volume = 0.2;
setInterval(() => {
  if (!isMaster()) return;
  if (music.paused) return;

  musicRef.update({
    time: music.currentTime
  });
}, 3000);


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

    musicRef.update({
      playing: !data.playing,
      time: music.currentTime
    });
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

  if (Math.abs(music.currentTime - data.time) > 1) {
    music.currentTime = data.time;
  }

  if (data.playing) {
    music.play();
  } else {
    music.pause();
  }

  document.getElementById("music-title").innerText = track.name;
  document.body.style.backgroundImage = `url('${track.bg}')`;
});


function toggleVolume() {
  if (!requireMaster("controlar o volume")) return;

  const wrapper = document.querySelector(".volume-wrapper");
  wrapper.classList.toggle("active");
}


function setVolume(value) {
  if (!isMaster()) return;

  music.volume = parseFloat(value);
}




function playMusic(index) {
  if (!requireMaster("mudar a música")) return;

  musicRef.set({
    track: index,
    playing: true,
    time: 0
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


