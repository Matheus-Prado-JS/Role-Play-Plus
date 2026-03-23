import { db, ref, set, onValue, ROOM } from "./Sol-Fire.js";

// BOTÃO DO LOGO → VOLTAR PRO INDEX
function goHome() {
  window.location.href = "../index.html";
}

// ==========================
// ELEMENTOS
// ==========================
const enemyBox = document.getElementById("turn-enemy");
const playerBox = document.getElementById("turn-player");

const enemyMenu = document.getElementById("enemy-menu");
const enemyImg = document.getElementById("enemy-img");

// ==========================
// 🔵 PLAYER - TROCA AUTOMÁTICA
// ==========================

const playerImages = [
  "Sol-Assets/Turnos/players/Show de Eddie.png",
  "Sol-Assets/Turnos/players/Stilgard.png",
  "Sol-Assets/Turnos/players/Ashen.png",
  "Sol-Assets/Turnos/players/Alverian.png",
  "Sol-Assets/Turnos/players/Aurelion.png",
  "Sol-Assets/Turnos/players/Orion.png"
];

let currentIndex = 0;

const mainImg = document.getElementById("player-img-main");
const fadeImg = document.getElementById("player-img-fade");

// inicial
mainImg.src = playerImages[0];

function switchPlayerImage() {
  const nextIndex = (currentIndex + 1) % playerImages.length;
  const nextSrc = playerImages[nextIndex];

  fadeImg.src = nextSrc;
  fadeImg.classList.add("active");

  setTimeout(() => {
    mainImg.src = nextSrc;
    fadeImg.classList.remove("active");
    currentIndex = nextIndex;
  }, 600);
}

setInterval(switchPlayerImage, 5000);


// ==========================
// 🔴 MENU INIMIGO (CORRIGIDO)
// ==========================

let isRightClick = false;

enemyBox.addEventListener("contextmenu", (e) => {
  e.preventDefault();

  isRightClick = true;

  enemyMenu.classList.toggle("hidden");

  // evita que o clique global feche imediatamente
  setTimeout(() => {
    isRightClick = false;
  }, 50);
});

// impede clique dentro do menu de fechar
enemyMenu.addEventListener("click", (e) => {
  e.stopPropagation();
});

// clicar fora fecha (AGORA INTELIGENTE)
document.addEventListener("click", (e) => {

  if (isRightClick) return; // 🔥 ESSENCIAL

  if (!enemyBox.contains(e.target)) {
    enemyMenu.classList.add("hidden");
  }

});

enemyMenu.addEventListener("click", (e) => {

  const option = e.target.closest(".enemy-option");
  if (!option) return;

  const img = option.dataset.img;

  // 🔥 atualiza local primeiro
  enemyImg.src = img;

  // 🔥 salva no Firebase
  set(ref(db, `rooms/${ROOM}/enemy`), {
    img: img
  });

  enemyMenu.classList.add("hidden");

});

onValue(ref(db, `rooms/${ROOM}/enemy`), (snapshot) => {
  const data = snapshot.val();
  if (!data) return;

  enemyImg.src = data.img;
});

// ==========================
// 🔁 SISTEMA DE TURNOS
// ==========================

function setTurnVisual(active) {

  if (active === "enemy") {
    enemyBox.classList.add("active");
    enemyBox.classList.remove("inactive");

    playerBox.classList.remove("active");
    playerBox.classList.add("inactive");

  } else {
    playerBox.classList.add("active");
    playerBox.classList.remove("inactive");

    enemyBox.classList.remove("active");
    enemyBox.classList.add("inactive");
  }
}

function setTurn(active) {

  // local primeiro (não quebra UI)
  setTurnVisual(active);

  // depois Firebase
  set(ref(db, `rooms/${ROOM}/turn`), {
    current: active
  });
}

// clique esquerdo troca turno
enemyBox.addEventListener("click", () => {
  setTurn("enemy");
});

playerBox.addEventListener("click", () => {
  setTurn("player");
});

// estado inicial
setTurn("enemy");

onValue(ref(db, `rooms/${ROOM}/turn`), (snapshot) => {
  const data = snapshot.val();

  if (!data || !data.current) return;

  setTurnVisual(data.current);
});
// ==========================
// 🔴 STATUS PLAYER
// ==========================

document.querySelectorAll(".player-status").forEach(status => {
  status.addEventListener("click", (e) => {
    e.stopPropagation(); // evita conflito com li
    status.classList.toggle("active");
  });
});