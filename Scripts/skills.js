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

  const list = getCurrentSkillList();
  if (!list) return;

  list.innerHTML = "";

  ref.orderByChild("createdAt").on("child_added", snap => {

    const skill = snap.val();
    const id = snap.key;

    const div = document.createElement("div");
    div.className = "skill-item";
    div.dataset.id = id;

    div.innerHTML = `
      <div class="skill-header">
        <div>
          <strong>${skill.name}</strong>
          <span>${skill.effect}</span>
        </div>

        <div class="skill-actions">
          <button class="skill-edit">✏️</button>
          <button class="skill-delete">🗑️</button>
        </div>
      </div>

      <div class="skill-description hidden">
        ${skill.description}
      </div>
    `;

    list.appendChild(div);
    const block = list.closest(".sheet-skills");
    block.querySelector(".skill-empty")?.classList.add("hidden");

  });

  ref.on("child_removed", snap => {

    const id = snap.key;
    const el = list.querySelector(`[data-id="${id}"]`);
    if (el) el.remove();

  });

  ref.on("child_changed", snap => {

    const skill = snap.val();
    const id = snap.key;

    const el = list.querySelector(`[data-id="${id}"]`);
    if (!el) return;

    el.querySelector("strong").innerText = skill.name;
    el.querySelector("span").innerText = skill.effect;
    el.querySelector(".skill-description").innerText = skill.description;

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

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("skill-delete")) return;

  if (currentSheet.type === "enemy" && !requireMaster("deletar habilidades")) return;

  const item = e.target.closest(".skill-item");
  if (!item) return;

  const skillId = item.dataset.id;
  const ref = getSkillsRef();
  if (!ref) return;

  ref.child(skillId).remove();
});
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("skill-edit")) return;

  if (currentSheet.type === "enemy" && !requireMaster("editar habilidades")) return;

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
    ref.push({
    name,
    effect,
    description,
    createdAt: Date.now()
    });
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

