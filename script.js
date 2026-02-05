const db = firebase.database();
const playersRef = db.ref("players");
const musicRef = db.ref("music");
const logRef = db.ref("log");
const backgroundRef = db.ref("background");
const npcsRef = db.ref("npcs");
const turnRef = db.ref("turn");
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



function requireMaster(actionName = "essa ação") {
  if (!isMaster()) {
    addLog(`🚫 Apenas o Moderador pode ${actionName}.`);
    return false;
  }
  return true;
}
const enemyBox = document.getElementById("turn-enemy");
const playersBox = document.getElementById("turn-player");
const enemyMenu = document.getElementById("enemy-menu");

let currentSheet = {
  type: null,   // "player" | "enemy"
  id: null      // aurelion | varok | etc
};
let editingAttackId = null; // para controlar edição de ataques

// =========================
// FICHAS — PLAYER & MESTRE
// =========================
function closeAllSheets() {
  document.querySelectorAll(".sheet-content").forEach(el =>
    el.classList.add("hidden")
  );
}

function closeAllSelectors() {
  document.querySelectorAll(".sheet-selector").forEach(el =>
    el.classList.add("hidden")
  );
}

function setActiveItem(list, item) {
  list.querySelectorAll(".sheet-item").forEach(li =>
    li.classList.remove("active")
  );
  item.classList.add("active");
}
const playerBtn = document.querySelector('[data-action="fichas-player"]');
const playerSelector = document.getElementById("player-sheet-selector");
const playerSheet = document.getElementById("sheet-player-content");

if (playerBtn && playerSelector && playerSheet) {
  const playerName = playerSheet.querySelector(".sheet-name");

  playerBtn.addEventListener("click", () => {
    closeAllSelectors();
    playerSelector.classList.toggle("hidden");
  });

  playerSelector.querySelectorAll(".sheet-item").forEach(item => {
    item.addEventListener("click", () => {
      const sheetId = item.dataset.sheet;

      currentSheet.type = "player";
      currentSheet.id = sheetId;
      document.querySelectorAll(".sheet-value").forEach(i => i.value = "");
      const attackList = document.querySelector(".attack-list");
      if (attackList) attackList.innerHTML = "";
      const skillList = document.querySelector(".skill-list");
      if (skillList) skillList.innerHTML = "";
      loadSheetData("player", sheetId);
      listenSheetRealtime("player", sheetId);
      listenAttacksRealtime();
      listenSkillsRealtime();

      const name = item.querySelector(".sheet-name").innerText;

      setActiveItem(playerSelector, item);
      closeAllSelectors();
      closeAllSheets();

      playerName.innerText = name;
      playerSheet.classList.remove("hidden");
    });
  });
}
const masterBtn = document.querySelector('[data-action="fichas-master"]');
const enemySelector = document.getElementById("enemy-sheet-selector");
const enemySheet = document.getElementById("sheet-enemy-content");

if (masterBtn && enemySelector && enemySheet) {
  const enemyName = enemySheet.querySelector(".enemy-name");

  masterBtn.addEventListener("click", () => {
    if (!requireMaster("abrir fichas do mestre")) return;

    closeAllSelectors();
    enemySelector.classList.toggle("hidden");
  });

  enemySelector.querySelectorAll(".sheet-item").forEach(item => {
    item.addEventListener("click", () => {
      if (!requireMaster("selecionar criaturas")) return;
      const sheetId = item.dataset.sheet;

      currentSheet.type = "enemy";
      currentSheet.id = sheetId;
      document.querySelectorAll(".sheet-value").forEach(i => i.value = "");
      const attackList = document.querySelector(".attack-list");
      if (attackList) attackList.innerHTML = "";
      const skillList = document.querySelector(".skill-list");
      if (skillList) skillList.innerHTML = "";
      loadSheetData("enemy", sheetId);
      listenSheetRealtime("enemy", sheetId);
      listenAttacksRealtime();
      listenSkillsRealtime();

      const name = item.querySelector(".sheet-name").innerText;

      setActiveItem(enemySelector, item);
      closeAllSelectors();
      closeAllSheets();

      enemyName.innerText = name;
      enemySheet.classList.remove("hidden");
    });
  });
}
document.addEventListener("click", (e) => {
  // Fecha SELECTORS se clicar fora
  if (
    playerSelector &&
    !playerSelector.contains(e.target) &&
    !playerBtn.contains(e.target)
  ) {
    playerSelector.classList.add("hidden");
  }

  if (
    enemySelector &&
    !enemySelector.contains(e.target) &&
    !masterBtn.contains(e.target)
  ) {
    enemySelector.classList.add("hidden");
  }

  // Fecha FICHAS se clicar fora
  if (
    playerSheet &&
    !playerSheet.contains(e.target) &&
    !playerBtn.contains(e.target)
  ) {
    playerSheet.classList.add("hidden");
  }

  if (
    enemySheet &&
    !enemySheet.contains(e.target) &&
    !masterBtn.contains(e.target)
  ) {
    enemySheet.classList.add("hidden");
  }
});

playerSelector.addEventListener("click", (e) => {
  e.stopPropagation();
});

enemySelector.addEventListener("click", (e) => {
  e.stopPropagation();
});
playerBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  closeAllSelectors();
  playerSelector.classList.toggle("hidden");
});

masterBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (!requireMaster("abrir fichas do mestre")) return;

  closeAllSelectors();
  enemySelector.classList.toggle("hidden");
});
document.addEventListener("input", (e) => {
  const input = e.target;

  if (!input.classList.contains("sheet-value")) return;
  if (!currentSheet.type || !currentSheet.id) return;

  const section = input.dataset.section;
  const field = input.dataset.field;
  const value = input.type === "number"
    ? Number(input.value)
    : input.value;

  let ref;

  if (currentSheet.type === "player") {
    ref = playersRef
      .child(currentSheet.id)
      .child(section)
      .child(field);
  } else if (currentSheet.type === "enemy") {
    ref = npcsRef
      .child(currentSheet.id)
      .child(section)
      .child(field);
  }

  ref.set(value);
});
function loadSheetData(type, id) {
  const ref = type === "player"
    ? playersRef.child(id)
    : npcsRef.child(id);

ref.once("value", snapshot => {
  const data = snapshot.val();
  if (!data) return;

  // 1️⃣ Preenche os inputs normais
  document.querySelectorAll(".sheet-value").forEach(input => {
    const section = input.dataset.section;
    const field = input.dataset.field;

    if (data[section] && data[section][field] !== undefined) {
      input.value = data[section][field];
    } else {
      input.value = "";
    }
  });

  // 2️⃣ Renderiza ataques UMA ÚNICA VEZ
  if (data.attacks) {
    renderAttacks(data.attacks);
  } else {
    const list = document.querySelector(".attack-list");
    if (list) list.innerHTML = "";
  }
    // 3️⃣ Renderiza habilidades UMA ÚNICA VEZ
  if (data.skills) {
    renderSkills(data.skills);
  } else {
    const list = document.querySelector(".skill-list");
    if (list) list.innerHTML = "";
  }

});

}

function listenSheetRealtime(type, id) {
  const ref = type === "player"
    ? playersRef.child(id)
    : npcsRef.child(id);

  ref.off("value"); // 👈 remove só o value da ficha

  ref.on("value", snapshot => {
    const data = snapshot.val();
    if (!data) return;

    document.querySelectorAll(".sheet-value").forEach(input => {
      const section = input.dataset.section;
      const field = input.dataset.field;

      if (data[section] && data[section][field] !== undefined) {
        if (document.activeElement !== input) {
          input.value = data[section][field];
        }
      }
    });
  });
}
// =========================
// HABILIDADES — PLAYER & ENEMY
// =========================

function getSkillsRef() {
  if (!currentSheet.type || !currentSheet.id) return null;

  return currentSheet.type === "player"
    ? playersRef.child(currentSheet.id).child("skills")
    : npcsRef.child(currentSheet.id).child("skills");
}
function listenSkillsRealtime() {
  const ref = getSkillsRef();
  if (!ref) return;

  ref.off();

  // garante que o nó exista
  ref.once("value", snap => {
    if (!snap.exists()) {
      ref.set({});
    }
  });

  ref.on("value", snapshot => {
    renderSkills(snapshot.val());
  });
}
function getCurrentSkillList() {
  if (currentSheet.type === "player") {
    return document
      .getElementById("sheet-player-content")
      ?.querySelector(".skill-list");
  }

  if (currentSheet.type === "enemy") {
    return document
      .getElementById("sheet-enemy-content")
      ?.querySelector(".skill-list");
  }

  return null;
}
function renderSkills(data) {
  const list = getCurrentSkillList();
  if (!list) return;

  list.innerHTML = "";

  const block = list.closest(".sheet-skills");
  const empty = block.querySelector(".skill-empty");

  if (!data) {
    empty.classList.remove("hidden");
    return;
  }

  Object.entries(data).forEach(([id, skill]) => {
    const div = document.createElement("div");
    div.className = "skill-item";
    div.dataset.id = id;
    div.setAttribute("draggable", "true");

    div.innerHTML = `
      <div class="skill-header">
        <div>
          <strong>${skill.name}</strong>
          <span>${skill.effect}</span>
        </div>

        <div class="skill-actions">
          <button class="skill-up">⬆️</button>
          <button class="skill-down">⬇️</button>
          <button class="skill-edit">✏️</button>
          <button class="skill-delete">🗑️</button>
        </div>
      </div>

      <div class="skill-description hidden">
        ${skill.description}
      </div>
    `;

    list.appendChild(div);
  });

  empty.classList.add("hidden");
}
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("skill-delete")) return;

  if (!requireMaster("deletar habilidades")) return;

  const item = e.target.closest(".skill-item");
  if (!item) return;

  const skillId = item.dataset.id;
  const ref = getSkillsRef();
  if (!ref) return;

  ref.child(skillId).remove();
});
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("skill-edit")) return;

  if (!requireMaster("editar habilidades")) return;

  const item = e.target.closest(".skill-item");
  const block = item.closest(".sheet-skills");

  editingSkillId = item.dataset.id;

  const name = item.querySelector("strong").innerText;
  const effect = item.querySelector("span").innerText;
  const description = item.querySelector(".skill-description").innerText;

  block.querySelector('[data-field="name"]').value = name;
  block.querySelector('[data-field="effect"]').value = effect;
  block.querySelector('[data-field="description"]').value = description;

  block.querySelector(".skill-form").classList.remove("hidden");
});

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("skill-add-btn")) return;

  const block = e.target.closest(".sheet-skills");
  if (!block) return;

  block.querySelector(".skill-form").classList.remove("hidden");
});
let editingSkillId = null;
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("skill-save-btn")) return;

  const block = e.target.closest(".sheet-skills");
  if (!block) return;

  const name = block.querySelector('[data-field="name"]').value.trim();
  const effect = block.querySelector('[data-field="effect"]').value.trim();
  const description = block.querySelector('[data-field="description"]').value.trim();

  if (!name || !effect || !description) return;

  const ref = getSkillsRef();
  if (!ref) return;

  if (editingSkillId) {
    ref.child(editingSkillId).set({ name, effect, description });
    editingSkillId = null;
  } else {
    ref.push({ name, effect, description });
  }

  // reset visual
  block.querySelectorAll(".skill-input, .skill-textarea")
    .forEach(i => i.value = "");

  block.querySelector(".skill-form").classList.add("hidden");
});
document.addEventListener("click", (e) => {
  const item = e.target.closest(".skill-item");
  if (!item) return;

  const desc = item.querySelector(".skill-description");
  if (!desc) return;

  desc.classList.toggle("hidden");
});
document.addEventListener("click", (e) => {
  if (
    !e.target.classList.contains("skill-up") &&
    !e.target.classList.contains("skill-down")
  ) return;

  if (!requireMaster("ordenar habilidades")) return;

  const item = e.target.closest(".skill-item");
  if (!item) return;

  const skillId = item.dataset.id;
  const ref = getSkillsRef();
  if (!ref) return;

  const delta = e.target.classList.contains("skill-up") ? -1 : 1;

  ref.once("value", snap => {
    const data = snap.val();
    if (!data || !data[skillId]) return;

    const currentOrder = data[skillId].order ?? 0;
    ref.child(skillId).child("order").set(currentOrder + delta);
  });
});


// =========================
// ATAQUES — PLAYER & ENEMY
// =========================

function getAttacksRef() {
  if (!currentSheet.type || !currentSheet.id) return null;

  return currentSheet.type === "player"
    ? playersRef.child(currentSheet.id).child("attacks")
    : npcsRef.child(currentSheet.id).child("attacks");
}
function listenAttacksRealtime() {
  const ref = getAttacksRef();
  if (!ref) return;

  ref.off();

  // 👇 GARANTE QUE O NÓ EXISTA
  ref.once("value", snap => {
    if (!snap.exists()) {
      ref.set({});
    }
  });

  ref.on("value", snapshot => {
    const data = snapshot.val();
    renderAttacks(data);
  });
}


document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("attack-add-btn")) return;

  const block = e.target.closest(".sheet-attacks");
  if (!block) return;

  block.querySelector(".attack-form").classList.remove("hidden");
});
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("attack-save-btn")) return;

  const block = e.target.closest(".sheet-attacks");
  if (!block) return;

  const nameInput = block.querySelector('[data-field="name"]');
  const damageInput = block.querySelector('[data-field="damage"]');

  const name = nameInput.value.trim();
  const damage = damageInput.value.trim();

  if (!name || !damage) return;

  const ref = getAttacksRef();
if (editingAttackId) {
  ref.child(editingAttackId).set({ name, damage });
  editingAttackId = null;
} else {
ref.once("value", snap => {
  const count = snap.exists()
    ? Object.keys(snap.val()).length
    : 0;

  ref.push({
    name,
    effect,
    description,
    order: count
  });
});

}


  // reset visual
  nameInput.value = "";
  damageInput.value = "";
  block.querySelector(".attack-form").classList.add("hidden");
  block.querySelector(".attack-empty").classList.remove("hidden");
});
function getCurrentAttackList() {
  if (currentSheet.type === "player") {
    return document
      .getElementById("sheet-player-content")
      ?.querySelector(".attack-list");
  }

  if (currentSheet.type === "enemy") {
    return document
      .getElementById("sheet-enemy-content")
      ?.querySelector(".attack-list");
  }

  return null;
}

function renderAttacks(data) {
  const list = getCurrentAttackList();
  if (!list) return;

  list.innerHTML = "";

  if (!data) {
    list.closest(".sheet-attacks")
      ?.querySelector(".attack-empty")
      ?.classList.remove("hidden");
    return;
  }

  Object.entries(data)
    .sort((a, b) => {
      const orderA = a[1].order ?? 0;
      const orderB = b[1].order ?? 0;
      return orderA - orderB;
    })
    .forEach(([id, attack]) => {
      const div = document.createElement("div");
      div.className = "attack-item";
      div.dataset.id = id;

      div.innerHTML = `
        <div class="attack-header">
          <strong>${attack.name}</strong>

          <div class="attack-actions">
            <button class="attack-up">⬆️</button>
            <button class="attack-down">⬇️</button>
            <button class="attack-edit">✏️</button>
            <button class="attack-delete">🗑️</button>
          </div>
        </div>

        <span>${attack.damage}</span>
      `;

      list.appendChild(div);
    });

  list.closest(".sheet-attacks")
    ?.querySelector(".attack-empty")
    ?.classList.add("hidden");
}

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("attack-delete")) return;

  if (!requireMaster("deletar ataques")) return;

  const item = e.target.closest(".attack-item");
  if (!item) return;

  const attackId = item.dataset.id;
  const ref = getAttacksRef();
  if (!ref) return;

  ref.child(attackId).remove();
});
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("attack-edit")) return;

  if (!requireMaster("editar ataques")) return;

  const item = e.target.closest(".attack-item");
  const block = item.closest(".sheet-attacks");

  editingAttackId = item.dataset.id;

  const name = item.querySelector("strong").innerText;
  const damage = item.querySelector("span").innerText;

  block.querySelector('[data-field="name"]').value = name;
  block.querySelector('[data-field="damage"]').value = damage;

  block.querySelector(".attack-empty").classList.add("hidden");
  block.querySelector(".attack-form").classList.remove("hidden");
});

document.addEventListener("click", (e) => {
  if (
    !e.target.classList.contains("attack-up") &&
    !e.target.classList.contains("attack-down")
  ) return;

  if (!requireMaster("ordenar ataques")) return;

  const item = e.target.closest(".attack-item");
  if (!item) return;

  const attackId = item.dataset.id;
  const ref = getAttacksRef();
  if (!ref) return;

  const delta = e.target.classList.contains("attack-up") ? -1 : 1;

  ref.once("value", snap => {
    const data = snap.val();
    if (!data || !data[attackId]) return;

    const currentOrder = data[attackId].order ?? 0;

    ref.child(attackId).child("order")
      .set(currentOrder + delta);
  });
});

// =========================
// TURNO PLAYER — IMAGENS
// =========================

const playerImages = [
  "assets/turns/players/Show de Eddie.png",
  "assets/turns/players/Stilgard.png",
  "assets/turns/players/Orion.png",
  "assets/turns/players/Aurelion.png"
];

let currentPlayerImageIndex = 0;
let playerImageInterval = null;
const playerImageMain = document.createElement("img");
const playerImageFade = document.createElement("img");

playerImageMain.className = "player-img main active";
playerImageFade.className = "player-img fade";

playerImageMain.src = playerImages[0];

playersBox.innerHTML = "";
playersBox.appendChild(playerImageMain);
playersBox.appendChild(playerImageFade);
function switchPlayerImage() {
  const nextIndex =
    (currentPlayerImageIndex + 1) % playerImages.length;

  const nextSrc = playerImages[nextIndex];

  playerImageFade.src = nextSrc;
  playerImageFade.classList.add("active");

  setTimeout(() => {
    playerImageMain.src = nextSrc;

    playerImageFade.classList.remove("active");

    currentPlayerImageIndex = nextIndex;
  }, 700); // mesmo tempo do CSS
}
function startPlayerImageCycle() {
  if (playerImageInterval) return;

  playerImageInterval = setInterval(() => {
    switchPlayerImage();
  }, 5000); // troca a cada 5 segundos
}

startPlayerImageCycle();


if (enemyBox && playersBox) {

enemyBox.addEventListener("click", () => {
  if (!requireMaster("mudar o turno")) return;

  turnRef.update({
    current: "enemy",
    at: Date.now()
  });
});
enemyBox.addEventListener("contextmenu", (e) => {
  e.preventDefault();

  if (!requireMaster("abrir o menu do inimigo")) return;

  enemyMenu.classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
  if (
    enemyMenu &&
    !enemyMenu.contains(e.target) &&
    !enemyBox.contains(e.target)
  ) {
    enemyMenu.classList.add("hidden");
  }
});
enemyMenu.addEventListener("click", (e) => {
  e.stopPropagation();

  const option = e.target.closest(".enemy-option");
  if (!option) return;

  if (!requireMaster("mudar o inimigo")) return;

  turnRef.update({
    enemyImage: option.dataset.image,
    at: Date.now()
  });

  enemyMenu.classList.add("hidden");
});



playersBox.addEventListener("click", () => {
  if (!requireMaster("mudar o turno")) return;

  turnRef.update({
    current: "player",
    at: Date.now()
  });
});
enemyMenu.addEventListener("click", (e) => {
  e.stopPropagation();

  const option = e.target.closest(".enemy-option");
  if (!option) return;

  if (!requireMaster("mudar o inimigo")) return;

  turnRef.update({
    enemyImage: option.dataset.image,
    at: Date.now()
  });

  enemyMenu.classList.add("hidden");
});

turnRef.on("value", snap => {
  const data = snap.val();
  if (!data) return;

  // ===== ESTADO =====
  enemyBox.classList.toggle("active", data.current === "enemy");
  enemyBox.classList.toggle("inactive", data.current !== "enemy");

  playersBox.classList.toggle("active", data.current === "player");
  playersBox.classList.toggle("inactive", data.current !== "player");

  // ===== IMAGEM INIMIGO =====
  if (data.enemyImage) {
    const img = enemyBox.querySelector("img");
    img.src = `assets/turns/enemies/${data.enemyImage}`;
  }
});
}



const npcMasterPanel = document.getElementById("npc-master-panel");

if (npcMasterPanel) {
  npcMasterPanel.addEventListener("click", (e) => {
    const toggle = e.target.closest(".npc-toggle");
    if (!toggle) return;

    if (!requireMaster("controlar NPCs")) return;

    const item = toggle.closest(".npc-item");
    const npcId = item.dataset.npc;

    const isLocked = item.classList.contains("locked");

    npcsRef.child(npcId).update({
      unlocked: isLocked
    });
  });
}

const bgButton = document.querySelector('[data-action="background"]');
const bgPanel = document.getElementById("background-selector");
const npcPlayerBtn = document.querySelector('[data-action="npcs"]');
const npcMasterBtn = document.querySelector('[data-action="npcs-master"]');

const npcPlayerPanel = document.getElementById("npc-player-panel");
const npcSheet = document.getElementById("npc-sheet");

if (npcPlayerBtn) {
  npcPlayerBtn.addEventListener("click", () => {
    npcPlayerPanel.classList.toggle("hidden");
    npcSheet.classList.add("hidden");
  });
}

if (npcMasterBtn) {
  npcMasterBtn.addEventListener("click", () => {
    if (!requireMaster("controlar NPCs")) return;
    npcMasterPanel.classList.toggle("hidden");
  });
}

document.addEventListener("click", (e) => {
  if (
    npcPlayerPanel &&
    !npcPlayerPanel.contains(e.target) &&
    !npcPlayerBtn.contains(e.target)
  ) {
    npcPlayerPanel.classList.add("hidden");
    npcSheet.classList.add("hidden");
  }
});
const npcDataMap = {
  elsyra: {
    name: "Capitã Elsyra",
    age: 42,
    image: "assets/persons/Elsyra.png",
    backstory: "Capitã da guarda imperial, lidera pelo o que considera correto.",
    personality: "Firme, estratégica e desconfiada."
  },
  barok: {
    name: "General Barok",
    age: 55,
    image: "assets/persons/Barok.png",
    backstory: "Um general veterano com uma reputação de ser implacável.",
    personality: "Disciplinado, leal e determinado."
  },
  varok: {
    name: "General Varok",
    age: 58,
    image: "assets/persons/Varok.png",
    backstory: "General firme e respeitado, conhecido por sua estratégia militar.",
    personality: "Rigoroso, cruel e estratégico."
  },
  ysvelle: {
    name: "Magistrada Ysvelle",
    age: 38,
    image: "assets/persons/Ysvelle.png",
    backstory: "Uma magistrada de renome, conhecida por sua justiça e sabedoria.",
    personality: "Inteligente, calma e determinada."
  },
  valeric: {
    name: "Rei Valeric Kaer",
    age: 64,
    image: "assets/persons/Valeric.png",
    backstory: "Rei de Solarys, governa com justiça e sabedoria.",
    personality: "Sábio, justo e protetor."
  },
  stilgard2: {
    name: "Inquisidor Stilgard II",
    age: 61,
    image: "assets/persons/Stilgard II.png",
    backstory: "Inquisidor e pai, conhecido por sua disciplina rígida e lealdade.",
    personality: "Leal, disciplinado e protetor."
  },
  malrek: {
    name: "Inquisidor Malrek",
    age: 59,
    image: "assets/persons/Malrek.png",
    backstory: "Inquisidor brutal, conhecido por quebrar regras.",
    personality: "Implacável, cruel e obstinado."
  },
  luthiel: {
    name: "Oráculo Luthiel",
    age: 32,
    image: "assets/persons/Luthiel.png",
    backstory: "Uma oráculo misterioso com conhecimento de profundos segredos.",
    personality: "Sagaz, introspectiva e enigmática."
  },
  lyss: {
    name: "Lyss",
    age: 27,
    image: "assets/persons/Lyss.png",
    backstory: "Cresceu em clubes, aprendeu a sobreviver lendo pessoas e explorando fraquezas. Conheceu Eddie em uma noite turbulenta em um dos Clubes.",
    personality: "Ácida, observadora e inteligente."
  },
  jax: {
    name: "Jax",
    age: 28,
    image: "assets/persons/Jax.png",
    backstory: "Viciado em jogos e golpes, conheceu Eddie após uma trapaça dar errado e a música dele salvar sua pele. Desde então, vive entre dívidas, apostas e favores mal pagos.",
    personality: "Arrogante, trapaceiro, carismático e impulsivo."
  }
};


npcPlayerPanel.addEventListener("click", (e) => {
  const item = e.target.closest(".npc-item");
  if (!item) return;

  const npcId = item.dataset.npc;
  const npc = npcDataMap[npcId];
  if (!npc) return;

  document.querySelector(".npc-sheet-name").innerText = npc.name;

document.querySelector(".npc-sheet-content").innerHTML = `
  <div class="npc-sheet-layout">

    <div class="npc-portrait">
      <img src="${npc.image}" alt="${npc.name}">
    </div>

    <div class="npc-text">
      <p class="npc-meta"><strong>Idade:</strong> ${npc.age}</p>
      <p><strong>Backstory:</strong> ${npc.backstory}</p>
      <p><strong>Personalidade:</strong> ${npc.personality}</p>
    </div>

  </div>
`;


  npcSheet.classList.remove("hidden");
});


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
npcsRef.on("value", (snapshot) => {
  const data = snapshot.val();
  if (!data) return;

  Object.entries(data).forEach(([npcId, npcData]) => {
    const unlocked = npcData.unlocked === true;

    /* ===== MESTRE ===== */
    const masterItem = document.querySelector(
      `#npc-master-panel .npc-item[data-npc="${npcId}"]`
    );

    if (masterItem) {
      masterItem.classList.toggle("locked", !unlocked);
      masterItem.classList.toggle("unlocked", unlocked);

      const btn = masterItem.querySelector(".npc-toggle");
      if (btn) {
        btn.className = `npc-toggle ${unlocked ? "unlock" : "lock"}`;
        btn.innerText = unlocked ? "Desbloqueado" : "Bloqueado";
      }
    }

    /* ===== PLAYER ===== */
    const playerItem = document.querySelector(
      `#npc-player-panel .npc-item[data-npc="${npcId}"]`
    );

    if (playerItem) {
      playerItem.style.display = unlocked ? "flex" : "none";
    }
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
npcsRef.once("value", snap => {
  if (snap.exists()) return;

  npcsRef.set({
    elsyra: {
      unlocked: true
    },
    lyss: {
      unlocked: false
    }
  });
});