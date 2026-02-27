const db = firebase.database();
const playersRef = db.ref("players");
const musicRef = db.ref("music");
const logRef = db.ref("log");
const backgroundRef = db.ref("background");
const npcsRef = db.ref("npcs");
const turnRef = db.ref("turn");
const documentsRef = db.ref("documents");
const missionsRef = db.ref("missions");

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

function enterRoom() {
  window.location.href = "room1.html";
}
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

function isMaster() {
  return window.playerName &&
    window.playerName.toLowerCase().includes("moderador");
}

function requireMaster(actionName = "essa ação") {
  if (!isMaster()) {
    addLog(`🚫 Apenas o Moderador pode ${actionName}.`);
    return false;
  }
  return true;
}

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

window.enterRoom = enterRoom;
window.goHome = goHome;
window.addLog = addLog;
window.requireMaster = requireMaster;
window.isMaster = isMaster;
