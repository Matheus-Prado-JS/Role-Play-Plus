import { db, ref, set, onValue, ROOM } from "./Sol-Fire.js";
import { onDisconnect } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// ==========================
// 🔐 CONNECT SYSTEM
// ==========================

export let currentUser = null;
let listeners = [];

export function setCurrentUser(user) {
  currentUser = user;
  listeners.forEach(cb => cb(user));
}

export function onUserLoaded(callback) {
  if (currentUser) callback(currentUser);
  listeners.push(callback);
}

let connectOverlay;

window.addEventListener("DOMContentLoaded", () => {
  connectOverlay = document.getElementById("connect-overlay");
});

// abrir
function toggleConnectMenu(e) {
  e.stopPropagation();
  connectOverlay.classList.remove("hidden");
}

// fechar
function closeConnect() {
  connectOverlay.classList.add("hidden");
}

// selecionar usuário
function selectUser(nome) {

  // senha pro moderador
if (nome === "Moderador") {
  openPassword(nome);
  return;
  } else {
    ativarStatus(nome);
  }

  closeConnect();
}

let pendingUser = null;

function openPassword(nome) {
  pendingUser = nome;
  document.getElementById("password-overlay").classList.remove("hidden");
}

function closePassword() {
  document.getElementById("password-overlay").classList.add("hidden");
}

function confirmPassword() {
  const input = document.getElementById("password-input").value;

  if (input === "123321") {
    ativarStatus(pendingUser); // 🔥 usa o nome correto
    closePassword();
    closeConnect();
  } else {
    alert("Senha incorreta.");
  }
}

// ==========================
// 🟢 ATIVAR STATUS
// ==========================

function ativarStatus(nome) {

  setCurrentUser({
    nome: nome,
    role: nome === "Moderador" ? "moderador" : "player"
  });

  const playerRef = ref(db, `rooms/${ROOM}/players/${nome}`);

  set(playerRef, {
    online: true
  });

  onDisconnect(playerRef).remove();
}

// ==========================
// 🎲 ROLL LOG SYSTEM
// ==========================

export function logRoll(nome, dados, resultados) {

  const resultadoFinal = resultados.join(", ");

  // 🔥 envia pro Firebase
  set(ref(db, `rooms/${ROOM}/roll`), {
    nome: nome,
    dados: dados,
    resultado: resultadoFinal
  });

}

// ==========================
// 🎲 LISTENER GLOBAL
// ==========================

onValue(ref(db, `rooms/${ROOM}/players`), (snapshot) => {

  const data = snapshot.val();

  // limpa tudo
  document.querySelectorAll(".player-status").forEach(s => {
    s.classList.remove("active");
  });

  if (!data) return;

  // ativa quem estiver online
  Object.keys(data).forEach(nome => {

    document.querySelectorAll(".players-box li").forEach(li => {

      const texto = li.textContent.trim();

      if (texto.includes(nome)) {
        const status = li.querySelector(".player-status");
        if (status) status.classList.add("active");
      }

    });

  });

});

onValue(ref(db, `rooms/${ROOM}/roll`), (snapshot) => {

  const data = snapshot.val();
  if (!data) return;

  const logText = document.getElementById("roll-log-text");

  logText.textContent = `${data.nome} rolou ${data.dados} = ${data.resultado}`;

});

window.toggleConnectMenu = toggleConnectMenu;
window.closeConnect = closeConnect;
window.selectUser = selectUser;
window.confirmPassword = confirmPassword;
window.closePassword = closePassword;