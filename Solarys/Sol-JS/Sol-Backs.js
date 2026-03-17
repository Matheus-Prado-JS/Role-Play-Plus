// ==========================
// 🖼️ BACKGROUND SYSTEM
// ==========================

const backgroundPanel = document.querySelector(".background-placeholder");

// ==========================
// 🗺️ MAP MENU SYSTEM
// ==========================

const mapMasterBtn = document.getElementById("map-master");
const mapMenu = document.getElementById("map-menu");
const mapOptions = document.querySelectorAll(".map-option");

// ABRIR / FECHAR MENU
mapMasterBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  mapMenu.classList.toggle("hidden");
});

// FECHAR clicando fora
document.addEventListener("click", () => {
  mapMenu.classList.add("hidden");
});

// EVITA fechar ao clicar dentro
mapMenu.addEventListener("click", (e) => {
  e.stopPropagation();
});

// ==========================
// 🎬 TROCAR BACKGROUND
// ==========================

const bgImage = document.querySelector(".bg-image");

mapOptions.forEach(option => {
  option.addEventListener("click", () => {

    const bgName = option.getAttribute("data-bg");
    const bgPath = `Sol-Assets/Backgrounds/${bgName}`;

    bgImage.style.backgroundImage = `url('${bgPath}')`;

    // remove texto
    const text = document.querySelector(".background-placeholder span");
    if (text) text.remove();

  });
});