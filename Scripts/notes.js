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

  const list = getCurrentNotesList();
  if (!list) return;

  list.innerHTML = "";

  ref.orderByChild("createdAt").on("child_added", snap => {

    const note = snap.val();
    const id = snap.key;

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
          <button class="note-edit">✏️</button>
          <button class="note-delete">🗑️</button>
        </div>
      </div>

      <div class="note-description hidden">
        ${note.description || ""}
      </div>
    `;

    list.appendChild(div);

    const block = list.closest(".sheet-notes");
    block.querySelector(".notes-empty")?.classList.add("hidden");

  });

  ref.on("child_removed", snap => {

    const id = snap.key;
    const el = list.querySelector(`[data-id="${id}"]`);
    if (el) el.remove();

  });

  ref.on("child_changed", snap => {

    const note = snap.val();
    const id = snap.key;

    const el = list.querySelector(`[data-id="${id}"]`);
    if (!el) return;

    el.querySelector("strong").innerText = note.title;
    el.querySelector("span").innerText = note.summary;
    el.querySelector(".note-description").innerText = note.description;

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

  if (currentSheet.type === "enemy" && !requireMaster("salvar notas")) return;

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
    createdAt: Date.now()
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

  if (currentSheet.type === "enemy" && !requireMaster("deletar notas")) return;

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

  if (currentSheet.type === "enemy" && !requireMaster("editar notas")) return;

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
    e.target.classList.contains("note-edit") ||
    e.target.classList.contains("note-delete")
  ) return;

  const desc = item.querySelector(".note-description");
  if (!desc) return;

  desc.classList.toggle("hidden");
});

