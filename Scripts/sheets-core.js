let currentSheet = {
  type: null,   // "player" | "enemy"
  id: null      // aurelion | varok | etc
};
let editingAttackId = null; // para controlar edição de ataques
let sheetCreationFormOpen = false;

let attackListenersAttached = false;
let skillListenersAttached = false;
let notesListenersAttached = false;
// =========================
// CRIAR ID SEGURO PARA FICHA
// =========================
function generateSheetId(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
}
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
// =========================
// CATEGORIAS — FICHAS DO MESTRE
// =========================

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

// =====================================================
// 🔥 DOM — TUDO QUE PRECISA ESTAR DENTRO
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // ELEMENTOS PRINCIPAIS
  // =========================

  const playerBtn = document.querySelector('[data-action="fichas-player"]');
  const playerSelector = document.getElementById("player-sheet-selector");
  const playerSheet = document.getElementById("sheet-player-content");

  const masterBtn = document.querySelector('[data-action="fichas-master"]');
  const enemySelector = document.getElementById("enemy-sheet-selector");
  const enemySheet = document.getElementById("sheet-enemy-content");

  // =========================
  // PLAYER
  // =========================

  if (playerBtn && playerSelector && playerSheet) {

    const playerName = playerSheet.querySelector(".sheet-name");

    playerBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeAllSelectors();
      playerSelector.classList.toggle("hidden");
    });

    playerSelector.querySelectorAll(".sheet-item").forEach(item => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();

        const sheetId = item.dataset.sheet;

        currentSheet.type = "player";
        currentSheet.id = sheetId;

        document.querySelectorAll(".sheet-value").forEach(i => i.value = "");

        loadSheetData("player", sheetId);
        listenSheetRealtime("player", sheetId);
        listenAttacksRealtime();
        listenSkillsRealtime();
        listenNotesRealtime();
        loadMechanics(sheetId);
        loadAmulets(sheetId);

        const name = item.querySelector(".sheet-name").innerText;

        setActiveItem(playerSelector, item);
        closeAllSelectors();
        closeAllSheets();

        playerName.innerText = name;
        playerSheet.classList.remove("hidden");
      });
    });
  }

  // =========================
  // MESTRE
  // =========================

  if (masterBtn && enemySelector && enemySheet) {

    const enemyName = enemySheet.querySelector(".enemy-name");

    masterBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!requireMaster("abrir fichas do mestre")) return;

      closeAllSelectors();
      enemySelector.classList.toggle("hidden");
    });

    enemySelector.querySelectorAll(".sheet-item").forEach(item => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!requireMaster("selecionar criaturas")) return;

        const sheetId = item.dataset.sheet;

        currentSheet.type = "enemy";
        currentSheet.id = sheetId;

        document.querySelectorAll(".sheet-value").forEach(i => i.value = "");

        loadSheetData("enemy", sheetId);
        listenSheetRealtime("enemy", sheetId);
        listenAttacksRealtime();
        listenSkillsRealtime();
        listenNotesRealtime();

        const name = item.querySelector(".sheet-name").innerText;

        setActiveItem(enemySelector, item);
        closeAllSelectors();
        closeAllSheets();

        enemyName.innerText = name;
        enemySheet.classList.remove("hidden");
      });
    });

    // categorias
    const categoryToggles = enemySelector.querySelectorAll(".category-toggle");

    categoryToggles.forEach(toggle => {
      toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        const category = toggle.closest(".sheet-category");
        if (!category) return;
        category.classList.toggle("collapsed");
      });
    });
  }
  // =========================
// 🔥 OUVIR FICHAS DO MESTRE (Firebase)
// =========================

npcsRef.on("child_added", snapshot => {

  const id = snapshot.key;
  const npc = snapshot.val();

  // 🔥 IGNORA lixo estrutural
  if (!npc || !npc.name || !npc.categoria) return;

  insertNewSheetInUI(id, npc.name, npc.categoria);

});

  // =========================
  // FECHAR AO CLICAR FORA
  // =========================

  document.addEventListener("click", (e) => {

    if (playerSelector && !playerSelector.contains(e.target) && !playerBtn?.contains(e.target)) {
      playerSelector.classList.add("hidden");
    }

    if (enemySelector &&
        !enemySelector.contains(e.target) &&
        !masterBtn?.contains(e.target) &&
        !e.target.closest(".sheet-add-btn") &&
        !e.target.closest(".sheet-add-form")) {
      enemySelector.classList.add("hidden");
    }

    if (playerSheet && !playerSheet.contains(e.target) && !playerBtn?.contains(e.target)) {
      playerSheet.classList.add("hidden");
    }

    if (enemySheet && !enemySheet.contains(e.target) && !masterBtn?.contains(e.target)) {
      enemySheet.classList.add("hidden");
    }

  });

});