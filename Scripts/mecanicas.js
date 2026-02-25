document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // 🔐 VALIDAR PLAYER
  // =========================

  


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
      desc: "Aumenta ataques de propriedade mágica em +2.",
      image: "assets/amulets/loren.jpg"
    },
    balanca: {
      id: "balanca",
      name: "Amuleto da Balança",
      desc: "Reduz penalidade de peso para qualquer equipamento (-1).",
      image: "assets/amulets/balanca.jpg"
    },
    familia: {
      id: "familia",
      name: "Amuleto da Família Antiga",
      desc: "Aumenta resistência contra efeitos congelantes.",
      image: "assets/amulets/familia.webp"
    }
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
    modal.classList.remove("hidden");
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