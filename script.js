function enterRoom() {
  window.location.href = "room1.html";
}

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

  /* LOG COMPLETO */
  addLog(`🎲 ${logDetails.join(" | ")} → Total: ${total}`);

  resetDice();
}
function clearLog() {
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
  const list = document.getElementById("music-list");
  list.style.display = list.style.display === "block" ? "none" : "block";
}
function togglePlay() {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}
function toggleVolume() {
  const wrapper = document.querySelector(".volume-wrapper");
  wrapper.classList.toggle("active");
}

function setVolume(value) {
  music.volume = parseFloat(value);
}



function playMusic(index) {
  currentTrack = index;

  music.src = playlist[index].file;
  music.play();

  document.getElementById("music-title").innerText = playlist[index].name;
  document.body.style.backgroundImage = `url('${playlist[index].bg}')`;

  addLog(`🎵 Música alterada: ${playlist[index].name}`);
}


