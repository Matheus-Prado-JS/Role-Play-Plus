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

  const list = getCurrentAttackList();
  if (!list) return;

  list.innerHTML = "";

  ref.orderByChild("createdAt").on("child_added", snap => {

    const attack = snap.val();
    const id = snap.key;

    const div = document.createElement("div");
    div.className = "attack-item";
    div.dataset.id = id;

    div.innerHTML = `
      <div class="attack-header">
        <strong>${attack.name}</strong>

        <div class="attack-actions">
          <button class="attack-edit">✏️</button>
          <button class="attack-delete">🗑️</button>
        </div>
      </div>

      <span>${attack.damage}</span>
    `;

    list.appendChild(div);
    const block = list.closest(".sheet-attacks");
    block.querySelector(".attack-empty")?.classList.add("hidden");

  });

  ref.on("child_removed", snap => {

    const id = snap.key;
    const el = list.querySelector(`[data-id="${id}"]`);
    if (el) el.remove();

  });

  ref.on("child_changed", snap => {

    const attack = snap.val();
    const id = snap.key;

    const el = list.querySelector(`[data-id="${id}"]`);
    if (!el) return;

    el.querySelector("strong").innerText = attack.name;
    el.querySelector("span").innerText = attack.damage;

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
ref.push({
  name,
  damage,
  createdAt: Date.now()
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

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("attack-delete")) return;

  if (currentSheet.type === "enemy" && !requireMaster("deletar ataques")) return;

  const item = e.target.closest(".attack-item");
  if (!item) return;

  const attackId = item.dataset.id;
  const ref = getAttacksRef();
  if (!ref) return;

  ref.child(attackId).remove();
});
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("attack-edit")) return;

  if (currentSheet.type === "enemy" && !requireMaster("editar ataques")) return;

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

