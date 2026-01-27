function enterRoom() {
  window.location.href = "room1.html";
}
const modal = document.getElementById("name-modal");
const input = document.getElementById("player-name-input");
const button = document.getElementById("confirm-name");
let players = JSON.parse(sessionStorage.getItem("players")) || [];


const playersList = document.getElementById("players-list");
players.forEach(player => {
  renderPlayer(player);
});


function renderPlayer(name) {
  const li = document.createElement("li");

  if (name.toLowerCase().includes("moderador")) {
    li.textContent = `👑 ${name}`;
    li.classList.add("player-master");
  } else {
    li.textContent = name;
  }

  playersList.appendChild(li);
}
function addPlayer(name) {
  if (!players.includes(name)) {
    players.push(name);
    sessionStorage.setItem("players", JSON.stringify(players));
  }

  renderPlayer(name);
}



// Verifica se já tem nome
const storedName = localStorage.getItem("playerName");

if (!storedName) {
  modal.classList.remove("hidden");
} else {
  window.playerName = storedName;
}
const isMaster = window.playerName
  ? window.playerName.toLowerCase().includes("moderador")
  : false;


button.addEventListener("click", () => {
  const name = input.value.trim();
  if (!name) return;

  localStorage.setItem("playerName", name);
  window.playerName = name;

  modal.classList.add("hidden");

  addPlayer(name);
  addLog(`🧙 ${name} entrou na mesa.`);
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
  if (!isMaster) {
    addLog("🚫 Apenas o Moderador pode limpar o log.");
    return;
  }

  const log = document.getElementById("log");
  if (!log) return;

  log.innerHTML = "";
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
    name: "Despedida",
    file: "assets/music/Despedida.mp3",
    bg: "assets/General Barok.png"
  },
  {
    name: "Propósito",
    file: "assets/music/Propósito.mp3",
    bg: "assets/Kaelen, A Espada.png"
  },
  {
    name: "Cidade",
    file: "assets/music/city.mp3",
    bg: "assets/bg-city.jpg"
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

  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}

function toggleVolume() {
  if (!requireMaster("controlar o volume")) return;

  const wrapper = document.querySelector(".volume-wrapper");
  wrapper.classList.toggle("active");
}


function setVolume(value) {
  if (!isMaster) return;

  music.volume = parseFloat(value);
}




function playMusic(index) {
  if (!requireMaster("mudar a música")) return;

  currentTrack = index;

  music.src = playlist[index].file;
  music.play();

  document.getElementById("music-title").innerText = playlist[index].name;
  document.body.style.backgroundImage = `url('${playlist[index].bg}')`;

  addLog(`🎵 ${window.playerName} mudou a música para: ${playlist[index].name}`);
}

function requireMaster(actionName = "essa ação") {
  if (!isMaster) {
    addLog(`🚫 Apenas o Moderador pode ${actionName}.`);
    return false;
  }
  return true;
}


