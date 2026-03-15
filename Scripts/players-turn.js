const enemyBox = document.getElementById("turn-enemy");
const playersBox = document.getElementById("turn-player");
const enemyMenu = document.getElementById("enemy-menu");
const enemyAddOption = document.querySelector(".enemy-add-option");
const enemyAddForm = document.getElementById("enemy-add-form");

enemyTurnsRef.on("child_added", snapshot => {

  const id = snapshot.key;
  const data = snapshot.val();
  if (!data || !data.name || !data.category || !data.image) return;

  const categoryList = document.querySelector(
    `.enemy-category[data-category="${data.category}"] .enemy-category-list`
  );

  if (!categoryList) return;

  const div = document.createElement("div");
  div.className = "enemy-option";
  div.dataset.image = data.image;
  div.innerText = data.name;

  categoryList.appendChild(div);

});
enemyAddOption.addEventListener("click", () => {
  enemyAddForm.classList.remove("hidden");
  enemyMenu.classList.add("hidden");
});
document.getElementById("cancel-new-enemy")
  .addEventListener("click", () => {

    enemyAddForm.classList.add("hidden");

  });
  document.getElementById("save-new-enemy")
  .addEventListener("click", () => {

    const name = document.getElementById("new-enemy-name").value.trim();
    const category = document.getElementById("new-enemy-category").value;
    const fileInput = document.getElementById("new-enemy-image");

    if (!name || !fileInput.files.length) {
      alert("Preencha nome e imagem");
      return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {

      const imageBase64 = e.target.result;

      enemyTurnsRef.push({
        name: name,
        category: category,
        image: imageBase64
      });

      enemyAddForm.classList.add("hidden");

      document.getElementById("new-enemy-name").value = "";
      fileInput.value = "";

    };

    reader.readAsDataURL(file);

  });
// =========================
// TURNO PLAYER — IMAGENS
// =========================

const playerImages = [
  "assets/turns/players/Show de Eddie.png",
  "assets/turns/players/Stilgard.png",
  "assets/turns/players/Orion.png",
  "assets/turns/players/Aurelion.png",
  "assets/turns/players/Ashen.png",
  "assets/turns/players/Alverian.png"
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
    img.src = data.enemyImage;
  }
});
}