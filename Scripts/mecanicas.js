document.addEventListener("DOMContentLoaded", () => {

// =========================
// ABRIR CONFIG AMULETOS
// =========================

const amuletConfigBtn = document.querySelector(".missions-master-config-btn");
const amuletMasterPanel = document.getElementById("amulets-master-panel");

if (amuletConfigBtn && amuletMasterPanel) {

  amuletConfigBtn.addEventListener("click", () => {

    if (!requireMaster("controlar amuletos")) return;

    amuletMasterPanel.classList.toggle("hidden");

  });

}
  
  // =========================
  // TOGGLE MESTRE
  // =========================

if (amuletMasterPanel) {

  amuletMasterPanel.addEventListener("click", (e) => {

    const toggle = e.target.closest(".amulet-toggle");
    if (!toggle) return;

    if (!requireMaster("controlar amuletos")) return;

    const item = toggle.closest(".amulet-master-item");
    const amuletId = item.dataset.amulet;

    const isLocked = item.classList.contains("locked");

    amuletsRef.child(amuletId).update({
      unlocked: isLocked
    });

  });

}

amuletsRef.on("value", snapshot => {

  const data = snapshot.val();
  if (!data) return;

  Object.entries(data).forEach(([amuletId, amuletData]) => {

    const unlocked = amuletData.unlocked === true;

    /* ===== MESTRE ===== */

    const masterItem = document.querySelector(
      `.amulet-master-item[data-amulet="${amuletId}"]`
    );

    if (masterItem) {

      masterItem.classList.toggle("locked", !unlocked);
      masterItem.classList.toggle("unlocked", unlocked);

      const btn = masterItem.querySelector(".amulet-toggle");

      if (btn) {
        btn.className = `amulet-toggle ${unlocked ? "unlock" : "lock"}`;
        btn.innerText = unlocked ? "Desbloqueado" : "Bloqueado";
      }

    }

/* ===== PLAYER ===== */

const playerItems = document.querySelectorAll(
  `.amulet-item[data-amulet="${amuletId}"]`
);

playerItems.forEach(item => {

  if (!unlocked) {
    item.style.display = "none";
  } else {
    item.style.display = "flex";
  }

});

  });

});


  // =====================================================
  // 🌟 PROGRESSÃO
  // =====================================================

  const mechanicInputs = document.querySelectorAll(".mechanic-input");

    function loadMechanics(sheetId) {
    if (!sheetId) return;

        const ref = playersRef.child(sheetId).child("mechanics");

        ref.off("value");

        ref.on("value", snapshot => {

        const data = snapshot.val() || {};

        mechanicInputs.forEach(input => {
            const key = input.dataset.mechanic;
            input.value = data[key] ?? 0;
        });

        });
    }

    mechanicInputs.forEach(input => {
    input.addEventListener("change", () => {

        if (!currentSheet.id) return;

        const key = input.dataset.mechanic;
        const value = parseInt(input.value) || 0;

        playersRef.child(currentSheet.id)
        .child("mechanics")
        .update({
            [key]: value
        });

    });
    });


  // =====================================================
  // 🧿 DADOS DOS AMULETOS
  // =====================================================

  const AMULETS = {
    loren: {
      id: "loren",
      name: "Amuleto de Loren",
      desc: "Aumenta ataques de propriedade mágica em (+2).",
      image: "assets/amulets/loren.png"
    },
    balanca: {
      id: "balanca",
      name: "Amuleto da Balança",
      desc: "Reduz penalidade de peso para qualquer equipamento (-1).",
      image: "assets/amulets/balanca.png"
    },
    familia: {
      id: "familia",
      name: "Amuleto da Família Antiga",
      desc: "Aumenta resistência contra efeitos congelantes (+2).",
      image: "assets/amulets/familia.png"
    },
    siegbrau: {
      id: "siegbrau",
      name: "Amuleto de Siegbrau",
      desc: "Aumenta o dano de ataques físicos (+4).",
      image: "assets/amulets/siegbrau.png"
    },
  };


  // =====================================================
  // 🎯 ELEMENTOS
  // =====================================================

  const amuletSlots = document.querySelectorAll(".amulet-slot");
  const modal = document.getElementById("amulet-modal");
  const amuletItems = document.querySelectorAll(".amulet-item");

  const detailBox = document.getElementById("amulet-detail");
  const detailImage = document.getElementById("amulet-detail-image");
  const detailName = document.getElementById("amulet-detail-name");
  const detailDesc = document.getElementById("amulet-detail-desc");

  const equipBtn = document.getElementById("amulet-equip-btn");
  const unequipBtn = document.getElementById("amulet-unequip-btn");
  const closeBtn = document.querySelector(".amulet-close-btn");

  let currentSlot = null;
  let selectedAmuletId = null;
  let equippedData = {};


  // =====================================================
  // 🧿 ABRIR MODAL
  // =====================================================

  amuletSlots.forEach(slot => {
    slot.addEventListener("click", () => {
      currentSlot = slot.dataset.slot;
      abrirModal();
    });
  });

function abrirModal() {

  selectedAmuletId = null;
  detailBox.classList.add("hidden");

  // filtra amuletos desbloqueados
  amuletsRef.once("value").then(snapshot => {

    const data = snapshot.val() || {};

    amuletItems.forEach(item => {

      const id = item.dataset.amulet;
      const unlocked = data[id]?.unlocked === true;

      if (unlocked) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }

    });

    modal.classList.remove("hidden");

  });

}


  // =====================================================
  // 🧿 SELECIONAR AMULETO
  // =====================================================

  amuletItems.forEach(item => {
    item.addEventListener("click", () => {

      const amuletId = item.dataset.amulet;
      const amulet = AMULETS[amuletId];
      if (!amulet) return;

      selectedAmuletId = amuletId;

      detailImage.src = amulet.image;
      detailImage.alt = amulet.name;
      detailName.textContent = amulet.name;
      detailDesc.textContent = amulet.desc;

      verificarEstadoEquipado();

      detailBox.classList.remove("hidden");
    });
  });


  // =====================================================
  // 🧿 VERIFICAR ESTADO (equipado ou não)
  // =====================================================

  function verificarEstadoEquipado() {
    if (!currentSlot || !selectedAmuletId) return;

    const slotKey = "slot" + currentSlot;
    const equipado = equippedData[slotKey];

    if (equipado === selectedAmuletId) {
      equipBtn.classList.add("hidden");
      unequipBtn.classList.remove("hidden");
    } else {
      equipBtn.classList.remove("hidden");
      unequipBtn.classList.add("hidden");
    }
  }


  // =====================================================
  // 🧿 EQUIPAR
  // =====================================================

  equipBtn.addEventListener("click", () => {

    if (!currentSlot || !selectedAmuletId) return;

    playersRef.child(currentSheet.id).child("amulets").update({
      ["slot" + currentSlot]: selectedAmuletId
    });

    fecharModal();
  });


  // =====================================================
  // 🧿 DESEQUIPAR
  // =====================================================

  unequipBtn.addEventListener("click", () => {

    if (!currentSlot) return;

    playersRef.child(currentSheet.id).child("amulets").update({
      ["slot" + currentSlot]: null
    });

    fecharModal();
  });


  // =====================================================
  // 🧿 CARREGAR AMULETOS DO FIREBASE
  // =====================================================

        function loadAmulets(sheetId) {
        if (!sheetId) return;

        const ref = playersRef.child(sheetId).child("amulets");

        ref.off("value");

        ref.on("value", snapshot => {

      equippedData = snapshot.val() || {};

        amuletSlots.forEach(slot => {

        const slotNumber = slot.dataset.slot;
        const slotKey = "slot" + slotNumber;
        const amuletId = equippedData[slotKey];

        // limpa conteúdo interno sem destruir comportamento
        while (slot.firstChild) {
            slot.removeChild(slot.firstChild);
        }

        if (!amuletId) {
            const placeholder = document.createElement("span");
            placeholder.classList.add("amulet-placeholder");
            placeholder.textContent = "Selecionar Amuleto";
            slot.appendChild(placeholder);
            return;
        }

        const amulet = AMULETS[amuletId];
        if (!amulet) return;

        const img = document.createElement("img");
        img.src = amulet.image;
        img.alt = amulet.name;

        slot.appendChild(img);

        });

      });
  }


  // =====================================================
  // 🧿 FECHAR MODAL
  // =====================================================

  function fecharModal() {
    modal.classList.add("hidden");
    detailBox.classList.add("hidden");
    selectedAmuletId = null;
    currentSlot = null;
  }

  closeBtn.addEventListener("click", fecharModal);


  // =====================================================
  // 🚀 INICIAR
  // =====================================================

    window.loadMechanics = loadMechanics;
    window.loadAmulets = loadAmulets;
});