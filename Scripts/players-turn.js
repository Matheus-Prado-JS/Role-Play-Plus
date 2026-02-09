const enemyBox = document.getElementById("turn-enemy");
const playersBox = document.getElementById("turn-player");
const enemyMenu = document.getElementById("enemy-menu");

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
if (playersBox) {
playersBox.innerHTML = "";
playersBox.appendChild(playerImageMain);
playersBox.appendChild(playerImageFade);
}
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
  if (!playersBox) return;
  if (playerImageInterval) return;

  playerImageInterval = setInterval(() => {
    switchPlayerImage();
  }, 5000);
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

  if (enemyMenu) enemyMenu.classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
  if (
    enemyMenu &&
    !enemyMenu.contains(e.target) &&
    !enemyBox.contains(e.target)
  ) {
    if (enemyMenu) enemyMenu.classList.add("hidden");
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