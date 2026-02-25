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

const modal = document.getElementById("name-modal");
const input = document.getElementById("player-name-input");
const button = document.getElementById("confirm-name");

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
window.playerId = playerId;

if (!storedName) {
  modal.classList.remove("hidden");
} else {
  window.playerName = storedName;
  registerPlayer(storedName);
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