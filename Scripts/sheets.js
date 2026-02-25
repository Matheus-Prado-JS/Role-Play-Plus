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
      listenNotesRealtime();

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

if (playerSelector) {
  playerSelector.addEventListener("click", (e) => e.stopPropagation());
}

if (enemySelector) enemySelector.addEventListener("click", (e) => {
  e.stopPropagation();
});
if (playerBtn) playerBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  closeAllSelectors();
  playerSelector.classList.toggle("hidden");
});

if (masterBtn) masterBtn.addEventListener("click", (e) => {
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
  ref.child(editingAttackId).update({ name, damage });
  editingAttackId = null;
} else {
ref.once("value", snap => {
  const count = snap.exists()
    ? Object.keys(snap.val()).length
    : 0;

  ref.push({
    name,
    damage,
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
// NOTAS — PLAYER & ENEMY
// =========================

let editingNoteId = null;

function getNotesRef() {
  if (!currentSheet.type || !currentSheet.id) return null;

  return currentSheet.type === "player"
    ? playersRef.child(currentSheet.id).child("notes")
    : npcsRef.child(currentSheet.id).child("notes");
}

function listenNotesRealtime() {
  const ref = getNotesRef();
  if (!ref) return;

  ref.off();

  // garante que o nó exista
  ref.once("value", snap => {
    if (!snap.exists()) {
      ref.set({});
    }
  });

  ref.on("value", snapshot => {
    renderNotes(snapshot.val());
  });
}

function getCurrentNotesList() {
  if (currentSheet.type === "player") {
    return document
      .getElementById("sheet-player-content")
      ?.querySelector(".notes-list");
  }

  if (currentSheet.type === "enemy") {
    return document
      .getElementById("sheet-enemy-content")
      ?.querySelector(".notes-list");
  }

  return null;
}

function renderNotes(data) {
  const list = getCurrentNotesList();
  if (!list) return;

  list.innerHTML = "";

  const block = list.closest(".sheet-notes");
  const empty = block.querySelector(".notes-empty");

  if (!data || Object.keys(data).length === 0) {
    empty.classList.remove("hidden");
    return;
  }

  Object.entries(data)
    .sort((a, b) => {
      const orderA = a[1].order ?? 0;
      const orderB = b[1].order ?? 0;
      return orderA - orderB;
    })
    .forEach(([id, note]) => {
      const div = document.createElement("div");
      div.className = "note-item";
      div.dataset.id = id;

      div.innerHTML = `
        <div class="note-header">
          <div>
            <strong>${note.title || "Sem título"}</strong>
            <span>${note.summary || ""}</span>
          </div>

          <div class="note-actions">
            <button class="note-up">⬆️</button>
            <button class="note-down">⬇️</button>
            <button class="note-edit">✏️</button>
            <button class="note-delete">🗑️</button>
          </div>
        </div>

        <div class="note-description hidden">
          ${note.description || ""}
        </div>
      `;

      list.appendChild(div);
    });

  empty.classList.add("hidden");
}


// =========================
// NOTAS — EVENTOS
// =========================

// abrir formulário
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("notes-add-btn")) return;

  const block = e.target.closest(".sheet-notes");
  if (!block) return;

  block.querySelector(".notes-form").classList.remove("hidden");
});

// salvar nota
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("notes-save-btn")) return;

  if (!requireMaster("salvar notas")) return;

  const block = e.target.closest(".sheet-notes");
  if (!block) return;

  const title = block.querySelector('[data-field="title"]').value.trim();
  const summary = block.querySelector('[data-field="summary"]').value.trim();
  const description = block.querySelector('[data-field="description"]').value.trim();

  if (!title || !summary || !description) return;

  const ref = getNotesRef();
  if (!ref) return;

  if (editingNoteId) {
    ref.child(editingNoteId).set({
      title,
      summary,
      description
    });

    editingNoteId = null;
  } else {
    ref.once("value", snap => {
      const count = snap.exists()
        ? Object.keys(snap.val()).length
        : 0;

      ref.push({
        title,
        summary,
        description,
        order: count
      });
    });
  }

  // reset visual
  block.querySelectorAll(".notes-input, .notes-textarea")
    .forEach(i => i.value = "");

  block.querySelector(".notes-form").classList.add("hidden");
});

// deletar nota
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("note-delete")) return;

  if (!requireMaster("deletar notas")) return;

  const item = e.target.closest(".note-item");
  if (!item) return;

  const noteId = item.dataset.id;
  const ref = getNotesRef();
  if (!ref) return;

  ref.child(noteId).remove();
});

// editar nota
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("note-edit")) return;

  if (!requireMaster("editar notas")) return;

  const item = e.target.closest(".note-item");
  if (!item) return;

  const block = item.closest(".sheet-notes");
  if (!block) return;

  editingNoteId = item.dataset.id;

  const title = item.querySelector("strong").innerText;
  const summary = item.querySelector("span").innerText;
  const description = item.querySelector(".note-description").innerText;

  block.querySelector('[data-field="title"]').value = title;
  block.querySelector('[data-field="summary"]').value = summary;
  block.querySelector('[data-field="description"]').value = description;

  block.querySelector(".notes-form").classList.remove("hidden");
});

// expandir / recolher descrição
document.addEventListener("click", (e) => {
  const item = e.target.closest(".note-item");
  if (!item) return;

  // evita expandir quando clicar nos botões
  if (
    e.target.classList.contains("note-up") ||
    e.target.classList.contains("note-down") ||
    e.target.classList.contains("note-edit") ||
    e.target.classList.contains("note-delete")
  ) return;

  const desc = item.querySelector(".note-description");
  if (!desc) return;

  desc.classList.toggle("hidden");
});

// ordenar nota
document.addEventListener("click", (e) => {
  if (
    !e.target.classList.contains("note-up") &&
    !e.target.classList.contains("note-down")
  ) return;

  if (!requireMaster("ordenar notas")) return;

  const item = e.target.closest(".note-item");
  if (!item) return;

  const noteId = item.dataset.id;
  const ref = getNotesRef();
  if (!ref) return;

  const delta = e.target.classList.contains("note-up") ? -1 : 1;

  ref.once("value", snap => {
    const data = snap.val();
    if (!data || !data[noteId]) return;

    const currentOrder = data[noteId].order ?? 0;

    ref.child(noteId).child("order")
      .set(currentOrder + delta);
  });
});
