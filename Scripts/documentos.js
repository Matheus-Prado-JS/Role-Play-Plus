/* ==========================================
   📜 SISTEMA DE DOCUMENTOS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  const documentsSelector = document.getElementById("documents-selector");
  const documentsMasterPanel = document.getElementById("documents-master-panel");
  const documentViewer = document.getElementById("document-viewer");

  const createBtn = document.querySelector(".doc-create-btn");
  const form = document.querySelector(".doc-form");
  const saveBtn = document.querySelector(".doc-save-btn");

  const masterList = document.querySelector(".documents-master-list");

  const viewerTitle = document.querySelector(".document-title");
  const viewerBody = document.querySelector(".document-body");
  const viewerImportance = document.querySelector(".document-importance");
  const viewerContent = document.querySelector(".document-content");

  /* ==========================================
     📌 ABRIR MENU PLAYER
  ========================================== */

  document.querySelector('[data-action="documents"]')
    ?.addEventListener("click", () => {

      documentsSelector.classList.toggle("hidden");
      documentViewer.classList.add("hidden");

    });

  /* ==========================================
     📌 ABRIR MENU MESTRE
  ========================================== */

  document.querySelector('[data-action="documents-master"]')
    ?.addEventListener("click", () => {

      documentsMasterPanel.classList.toggle("hidden");

    });

  /* ==========================================
     📌 MOSTRAR FORMULÁRIO
  ========================================== */

  createBtn?.addEventListener("click", () => {
    form.classList.toggle("hidden");
  });

  /* ==========================================
     💾 SALVAR DOCUMENTO
  ========================================== */

  saveBtn?.addEventListener("click", () => {

    const name = form.querySelector('[data-field="name"]').value.trim();
    const content = form.querySelector('[data-field="content"]').value.trim();

    const tone = document.querySelector('input[name="doc-tone"]:checked').value;
    const importance = document.querySelector('input[name="doc-importance"]:checked').value;

    if (!name || !content) return alert("Preencha todos os campos.");

    const newDocRef = documentsRef.push();

    newDocRef.set({
      name,
      content,
      tone,
      importance,
      unlocked: false,
      createdAt: Date.now()
    });

    form.reset();
    form.classList.add("hidden");

  });

  /* ==========================================
     📡 OUVIR DOCUMENTOS (MESTRE)
  ========================================== */

  documentsRef.on("value", snapshot => {

    const docs = snapshot.val();
    masterList.innerHTML = "";

    if (!docs) return;

    Object.entries(docs).forEach(([id, doc]) => {

      const li = document.createElement("li");
      li.classList.add("doc-master-item");

      li.innerHTML = `
        <span>${doc.name}</span>
        <div>
          <button class="doc-unlock-btn">
            ${doc.unlocked ? "Bloqueado" : "Desbloquear"}
          </button>
          <button class="doc-delete-btn">Excluir</button>
        </div>
      `;

      /* 🔓 DESBLOQUEAR */
      li.querySelector(".doc-unlock-btn")
        .addEventListener("click", () => {

          documentsRef.child(id).update({
            unlocked: !doc.unlocked
          });

        });

      /* ❌ EXCLUIR */
      li.querySelector(".doc-delete-btn")
        .addEventListener("click", () => {

          if (confirm("Excluir documento?")) {
            documentsRef.child(id).remove();
          }

        });

      masterList.appendChild(li);

    });

  });

  /* ==========================================
     📡 OUVIR DOCUMENTOS (PLAYER)
  ========================================== */

  documentsRef.on("value", snapshot => {

    const docs = snapshot.val();

    const categories = {
      principal: documentsSelector.querySelector('[data-category="principal"]'),
      secundario: documentsSelector.querySelector('[data-category="secundario"]'),
      opcional: documentsSelector.querySelector('[data-category="opcional"]')
    };

    Object.values(categories).forEach(cat => cat.innerHTML = "");

    if (!docs) return;

    Object.entries(docs).forEach(([id, doc]) => {

      if (!doc.unlocked) return;

      const li = document.createElement("li");
      li.classList.add("doc-item");
      li.textContent = doc.name;

      li.addEventListener("click", () => openDocument(doc));

      categories[doc.importance]?.appendChild(li);

    });

  });

  /* ==========================================
     📖 ABRIR DOCUMENTO
  ========================================== */

  function openDocument(doc) {

    viewerTitle.textContent = doc.name;
    viewerBody.textContent = doc.content;

    viewerImportance.textContent = 
      doc.importance.charAt(0).toUpperCase() + doc.importance.slice(1);

    documentViewer.classList.remove("hidden");

    /* RESET TEMA */
    viewerContent.classList.remove("tone-serio", "tone-envelhecido");

    if (doc.tone === "serio") {
      viewerContent.classList.add("tone-serio");
    }

    if (doc.tone === "envelhecido") {
      viewerContent.classList.add("tone-envelhecido");
    }

  }

});