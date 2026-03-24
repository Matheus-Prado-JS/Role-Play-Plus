import { db, ref, set, onValue, ROOM } from "./Sol-Fire.js";
import { currentUser } from "./Sol-System.js";

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

  // 🔒 só moderador pode abrir
  if (currentUser !== "Moderador") {
    return;
  }

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

    // 🔒 só moderador pode mudar
    if (currentUser !== "Moderador") return;

    const bgName = option.getAttribute("data-bg");
    const bgPath = `Sol-Assets/Backgrounds/${bgName}`;

    // 🔥 salva no Firebase
    set(ref(db, `rooms/${ROOM}/background`), {
      bg: bgPath
    });

  });
});

document.querySelectorAll(".map-section h4").forEach(header => {
  header.addEventListener("click", () => {
    header.parentElement.classList.toggle("collapsed");
  });
});

onValue(ref(db, `rooms/${ROOM}/background`), (snapshot) => {

  const data = snapshot.val();
  if (!data || !data.bg) return;

  const bgPath = data.bg;

  bgImage.classList.add("fade-out");

  setTimeout(() => {
    bgImage.style.backgroundImage = `url('${bgPath}')`;
    bgImage.classList.remove("fade-out");
  }, 200);

  // remove texto (caso ainda exista)
  const text = document.querySelector(".background-placeholder span");
  if (text) text.remove();

});