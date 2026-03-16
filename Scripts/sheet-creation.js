// =========================
// CRIAÇÃO DE NOVA FICHA (MESTRE)
// =========================

function createNewEnemySheet(name, category) {

  if (!requireMaster("criar ficha")) return;

  const id = generateSheetId(name);

  npcsRef.child(id).set({
    name: name,
    categoria: category,
    recursos: {
      pv: 0,
      pm: 0,
      energia: 0
    },
    defesas: {
      defesa_fisica: 0,
      defesa_magica: 0,
      resistencia: 0,
      imunidades: ""
    },
    atributos: {
      forca: 0,
      agilidade: 0,
      vitalidade: 0,
      inteligencia: 0
    },
    attacks: {},
    skills: {},
    notes: {}
  });

  insertNewSheetInUI(id, name, category);
}
function insertNewSheetInUI(id, name, category) {

  const selector = document.getElementById("enemy-sheet-selector");
  if (!selector) return;

  const categoryBlock = selector.querySelector(
    `.sheet-category[data-category="${category}"] .sheet-list`
  );

  if (!categoryBlock) return;

  const li = document.createElement("li");
  li.className = "sheet-item";
  li.dataset.sheet = id;

  li.innerHTML = `
    <span class="sheet-name">${name}</span>
  `;

  categoryBlock.prepend(li); // 👈 entra antes das outras

  // reaproveita mesma lógica já usada nas fichas existentes
  li.addEventListener("click", (e) => {
        e.stopPropagation();
    if (!requireMaster("selecionar criaturas")) return;

    currentSheet.type = "enemy";
    currentSheet.id = id;

    document.querySelectorAll(".sheet-value").forEach(i => i.value = "");

    loadSheetData("enemy", id);
    listenSheetRealtime("enemy", id);
    listenAttacksRealtime();
    listenSkillsRealtime();
    listenNotesRealtime();

    const enemySheet = document.getElementById("sheet-enemy-content");
    const enemyName = enemySheet.querySelector(".enemy-name");

    setActiveItem(selector, li);
    closeAllSelectors();
    closeAllSheets();

    enemyName.innerText = name;
    enemySheet.classList.remove("hidden");
  });
}
document.addEventListener("click", (e) => {

  // ========================
  // ABRIR FORMULÁRIO
  // ========================

  const addBtn = e.target.closest(".sheet-add-btn");
  if (addBtn) {

    if (!requireMaster("abrir criação de ficha")) return;

    const form = document.querySelector(".sheet-add-form");
    if (!form) return;

    form.classList.toggle("hidden");
    sheetCreationFormOpen = !form.classList.contains("hidden");

    return; // 👈 impede continuar
  }

  // ========================
  // CANCELAR
  // ========================

  const cancelBtn = e.target.closest(".sheet-add-cancel-btn");
  if (cancelBtn) {

    const form = document.querySelector(".sheet-add-form");
    if (!form) return;

    form.classList.add("hidden");
    sheetCreationFormOpen = false;

    return;
  }

  // ========================
  // SALVAR
  // ========================

  const saveBtn = e.target.closest(".sheet-add-save-btn");
  if (saveBtn) {

    const form = document.querySelector(".sheet-add-form");
    if (!form) return;

    const nameInput = form.querySelector('[data-field="sheet-name"]');
    const typeInput = form.querySelector('input[name="sheet-type"]:checked');

    if (!nameInput || !typeInput) return;

    const name = nameInput.value.trim();
    const category = typeInput.value;

    if (!name) return;

    createNewEnemySheet(name, category);

    nameInput.value = "";
    form.classList.add("hidden");
    sheetCreationFormOpen = false;

    return;
  }

});