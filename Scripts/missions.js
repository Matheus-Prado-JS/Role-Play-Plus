// =========================
// MISSIONS SYSTEM (MASTER)
// =========================

// missionsRef já vem do core.js
// const missionsRef = db.ref("missions");

// =========================
// DOM ELEMENTS
// =========================

const missionsMasterBtn = document.querySelector('[data-action="missions-master"]');
const missionsMasterPanel = document.getElementById("missions-master-panel");

const missionsMasterCloseBtn = missionsMasterPanel?.querySelector('[data-close="missions-master-panel"]');

const missionsMasterList = document.getElementById("missions-master-list");
const missionsMasterEmpty = document.getElementById("missions-master-empty");

const missionsMasterAddBtn = document.getElementById("missions-master-add-btn");
const missionsMasterForm = document.getElementById("missions-master-form");

const missionsMasterSaveBtn = document.getElementById("missions-master-save-btn");
const missionsMasterCancelBtn = document.getElementById("missions-master-cancel-btn");

// Inputs do form
const missionTitleInput = missionsMasterForm?.querySelector('[data-field="title"]');
const missionObjectiveInput = missionsMasterForm?.querySelector('[data-field="objective"]');
const missionLocationInput = missionsMasterForm?.querySelector('[data-field="location"]');
const missionRewardInput = missionsMasterForm?.querySelector('[data-field="reward"]');
const missionStoryInput = missionsMasterForm?.querySelector('[data-field="story"]');

// =========================
// DOM ELEMENTS (PLAYER)
// =========================

const missionsPlayerBtn = document.querySelector('[data-action="missions-player"]');
const missionsPlayerPanel = document.getElementById("missions-player-panel");

const missionsPlayerCloseBtn = missionsPlayerPanel?.querySelector('[data-close="missions-player-panel"]');

const missionsPlayerList = document.getElementById("missions-player-list");
const missionsPlayerEmpty = document.getElementById("missions-player-empty");

// =========================
// STATE
// =========================

let editingMissionId = null; // se estiver editando, guarda o ID


// =========================
// PANEL OPEN / CLOSE
// =========================

function openMissionsMasterPanel() {
  if (!missionsMasterPanel) return;
  missionsMasterPanel.classList.remove("hidden");
}

function closeMissionsMasterPanel() {
  if (!missionsMasterPanel) return;
  missionsMasterPanel.classList.add("hidden");
}

function toggleMissionsMasterPanel() {
  if (!missionsMasterPanel) return;
  missionsMasterPanel.classList.toggle("hidden");
}
// =========================
// PLAYER PANEL OPEN / CLOSE
// =========================

function openMissionsPlayerPanel() {
  if (!missionsPlayerPanel) return;
  missionsPlayerPanel.classList.remove("hidden");
}

function closeMissionsPlayerPanel() {
  if (!missionsPlayerPanel) return;
  missionsPlayerPanel.classList.add("hidden");
}

function toggleMissionsPlayerPanel() {
  if (!missionsPlayerPanel) return;
  missionsPlayerPanel.classList.toggle("hidden");
}


// Botão ícone do mestre
if (missionsMasterBtn && missionsMasterPanel) {
  missionsMasterBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    if (typeof requireMaster === "function") {
      if (!requireMaster("abrir painel de missões do mestre")) return;
    }

    toggleMissionsMasterPanel();
  });
}


// Botão X fechar
if (missionsMasterCloseBtn) {
  missionsMasterCloseBtn.addEventListener("click", () => {
    closeMissionsMasterPanel();
  });
}


// Fecha clicando fora
document.addEventListener("click", (e) => {
  if (!missionsMasterPanel || missionsMasterPanel.classList.contains("hidden")) return;
  if (!missionsMasterPanel.contains(e.target) && missionsMasterBtn && !missionsMasterBtn.contains(e.target)) {
    closeMissionsMasterPanel();
  }
});

// Impede clique dentro de fechar
missionsMasterPanel?.addEventListener("click", (e) => e.stopPropagation());
// =========================
// PLAYER BUTTON EVENTS
// =========================

if (missionsPlayerBtn && missionsPlayerPanel) {
  missionsPlayerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMissionsPlayerPanel();
  });
}

// Botão X fechar
if (missionsPlayerCloseBtn) {
  missionsPlayerCloseBtn.addEventListener("click", () => {
    closeMissionsPlayerPanel();
  });
}

// Fecha clicando fora
document.addEventListener("click", (e) => {
  if (!missionsPlayerPanel || missionsPlayerPanel.classList.contains("hidden")) return;

  if (!missionsPlayerPanel.contains(e.target) && missionsPlayerBtn && !missionsPlayerBtn.contains(e.target)) {
    closeMissionsPlayerPanel();
  }
});

// Impede clique dentro de fechar
missionsPlayerPanel?.addEventListener("click", (e) => e.stopPropagation());


// =========================
// FORM CONTROL
// =========================

function clearMissionForm() {
  if (missionTitleInput) missionTitleInput.value = "";
  if (missionObjectiveInput) missionObjectiveInput.value = "";
  if (missionLocationInput) missionLocationInput.value = "";
  if (missionRewardInput) missionRewardInput.value = "";
  if (missionStoryInput) missionStoryInput.value = "";

  editingMissionId = null;
}

function openMissionForm() {
  if (!missionsMasterForm) return;
  missionsMasterForm.classList.remove("hidden");
}

function closeMissionForm() {
  if (!missionsMasterForm) return;
  missionsMasterForm.classList.add("hidden");
  clearMissionForm();
}


// Botão criar missão
if (missionsMasterAddBtn) {
  missionsMasterAddBtn.addEventListener("click", () => {
    if (typeof requireMaster === "function") {
      if (!requireMaster("criar missões")) return;
    }

    editingMissionId = null;
    openMissionForm();
  });
}


// Botão cancelar
if (missionsMasterCancelBtn) {
  missionsMasterCancelBtn.addEventListener("click", () => {
    closeMissionForm();
  });
}


// =========================
// RENDER HELPERS
// =========================

function getStatusLabel(mission) {
  if (mission.completed === true) return "CONCLUÍDA";
  if (mission.active === true) return "ATIVA";
  return "INATIVA";
}

function getStatusClass(mission) {
  if (mission.completed === true) return "completed";
  if (mission.active === true) return "active";
  return "inactive";
}

function createMissionMasterHTML(id, mission) {
  const title = mission.title || "Missão sem título";

  const statusLabel = getStatusLabel(mission);
  const statusClass = getStatusClass(mission);

  return `
    <div class="missions-master-item" data-id="${id}">
      
      <div class="missions-master-item-top">
        <div class="missions-master-title">${title}</div>
        <div class="missions-master-status ${statusClass}">
          ${statusLabel}
        </div>
      </div>

      <div class="missions-master-actions">
        <button class="missions-master-action-btn activate" data-action="activate">
          Ativar
        </button>

        <button class="missions-master-action-btn deactivate" data-action="deactivate">
          Desativar
        </button>

        <button class="missions-master-action-btn edit" data-action="edit">
          Editar
        </button>

        <button class="missions-master-action-btn complete" data-action="complete">
          Concluir
        </button>
      </div>

    </div>
  `;
}
// =========================
// PLAYER RENDER HELPERS
// =========================

function getPlayerStatusLabel(mission) {
  if (mission.completed === true) return "Concluída";
  return "Progresso";
}

function getPlayerStatusClass(mission) {
  if (mission.completed === true) return "completed";
  return "progress";
}

function createMissionPlayerHTML(id, mission) {
  const title = mission.title || "Missão sem título";

  const statusLabel = getPlayerStatusLabel(mission);
  const statusClass = getPlayerStatusClass(mission);

  const location = mission.location || "Não informado";
  const objective = mission.objective || "Não informado";
  const reward = mission.reward || "Não informado";
  const story = mission.story || "Sem descrição.";

  return `
    <div class="missions-player-item" data-id="${id}">
      
      <div class="missions-player-item-top">
        <div class="missions-player-title">${title}</div>
        <div class="missions-player-status ${statusClass}">
          ${statusLabel}
        </div>
      </div>

      <div class="missions-player-details hidden">
        <div><b>📍 Local:</b> ${location}</div>
        <div><b>🎯 Objetivo:</b> ${objective}</div>
        <div><b>💰 Recompensa:</b> ${reward}</div>
        <div><b>📖 História:</b> ${story}</div>
      </div>

    </div>
  `;
}


// =========================
// RENDER MASTER LIST
// =========================

function renderMasterMissions(data) {
  if (!missionsMasterList) return;

  missionsMasterList.innerHTML = "";

  if (!data) {
    missionsMasterEmpty?.classList.remove("hidden");
    return;
  }

  const entries = Object.entries(data);

  if (entries.length === 0) {
    missionsMasterEmpty?.classList.remove("hidden");
    return;
  }

  missionsMasterEmpty?.classList.add("hidden");

  // Ordena: mais recente primeiro
  entries.sort((a, b) => {
    const aTime = a[1].createdAt || 0;
    const bTime = b[1].createdAt || 0;
    return bTime - aTime;
  });

  entries.forEach(([id, mission]) => {
    missionsMasterList.innerHTML += createMissionMasterHTML(id, mission);
  });
}


// =========================
// REALTIME LISTENER
// =========================

function listenMasterMissionsRealtime() {
  missionsRef.off();

  missionsRef.on("value", (snapshot) => {
    const data = snapshot.val();

    renderMasterMissions(data);
    renderPlayerMissions(data);
  });
}

listenMasterMissionsRealtime();

// =========================
// RENDER PLAYER LIST
// =========================

function renderPlayerMissions(data) {
  if (!missionsPlayerList) return;

  missionsPlayerList.innerHTML = "";

  if (!data) {
    missionsPlayerEmpty?.classList.remove("hidden");
    return;
  }

  const entries = Object.entries(data);

  // Filtra: só missões ativas OU concluídas
  const filtered = entries.filter(([id, mission]) => {
    if (!mission) return false;
    return mission.active === true || mission.completed === true;
  });

  if (filtered.length === 0) {
    missionsPlayerEmpty?.classList.remove("hidden");
    return;
  }

  missionsPlayerEmpty?.classList.add("hidden");

  // Ordena: concluídas embaixo e progresso em cima
  filtered.sort((a, b) => {
    const aCompleted = a[1].completed === true;
    const bCompleted = b[1].completed === true;

    if (aCompleted !== bCompleted) {
      return aCompleted - bCompleted;
    }

    const aTime = a[1].createdAt || 0;
    const bTime = b[1].createdAt || 0;
    return bTime - aTime;
  });

  filtered.forEach(([id, mission]) => {
    missionsPlayerList.innerHTML += createMissionPlayerHTML(id, mission);
  });
}


// =========================
// CREATE / UPDATE MISSION
// =========================

function saveMission() {
  if (typeof requireMaster === "function") {
    if (!requireMaster("salvar missões")) return;
  }

  const title = missionTitleInput?.value.trim();
  const objective = missionObjectiveInput?.value.trim();
  const location = missionLocationInput?.value.trim();
  const reward = missionRewardInput?.value.trim();
  const story = missionStoryInput?.value.trim();

  if (!title) {
    alert("Digite o nome da missão.");
    return;
  }

  const missionData = {
    title,
    objective: objective || "",
    location: location || "",
    reward: reward || "",
    story: story || "",
    updatedAt: Date.now()
  };

  // Se estiver criando nova missão
  if (!editingMissionId) {
    missionsRef.push({
      ...missionData,
      active: false,
      completed: false,
      createdAt: Date.now()
    });

    closeMissionForm();
    return;
  }

  // Se estiver editando missão existente
  missionsRef.child(editingMissionId).update(missionData);

  closeMissionForm();
}


// Botão salvar missão
if (missionsMasterSaveBtn) {
  missionsMasterSaveBtn.addEventListener("click", saveMission);
}


// =========================
// MASTER ACTIONS (EVENT DELEGATION)
// =========================

missionsMasterPanel?.addEventListener("click", (e) => {
  const btn = e.target.closest(".missions-master-action-btn");
  if (!btn) return;

  const missionItem = btn.closest(".missions-master-item");
  if (!missionItem) return;

  const missionId = missionItem.dataset.id;
  if (!missionId) return;

  const action = btn.dataset.action;

  if (typeof requireMaster === "function") {
    if (!requireMaster("alterar missões")) return;
  }

  // =========================
  // ACTIVATE
  // =========================
  if (action === "activate") {
    missionsRef.child(missionId).update({
      active: true,
      completed: false,
      updatedAt: Date.now()
    });
    return;
  }

  // =========================
  // DEACTIVATE
  // =========================
  if (action === "deactivate") {
    missionsRef.child(missionId).update({
      active: false,
      updatedAt: Date.now()
    });
    return;
  }

  // =========================
  // COMPLETE
  // =========================
  if (action === "complete") {
    missionsRef.child(missionId).update({
      completed: true,
      active: false,
      updatedAt: Date.now()
    });
    return;
  }

  // =========================
  // EDIT
  // =========================
  if (action === "edit") {
    missionsRef.child(missionId).once("value", (snap) => {
      const mission = snap.val();
      if (!mission) return;

      editingMissionId = missionId;

      if (missionTitleInput) missionTitleInput.value = mission.title || "";
      if (missionObjectiveInput) missionObjectiveInput.value = mission.objective || "";
      if (missionLocationInput) missionLocationInput.value = mission.location || "";
      if (missionRewardInput) missionRewardInput.value = mission.reward || "";
      if (missionStoryInput) missionStoryInput.value = mission.story || "";

      openMissionForm();
    });

    return;
  }
});
// =========================
// PLAYER CLICK EXPAND DETAILS
// =========================

missionsPlayerPanel?.addEventListener("click", (e) => {
  const item = e.target.closest(".missions-player-item");
  if (!item) return;

  const details = item.querySelector(".missions-player-details");
  if (!details) return;

  // Fecha todas as outras
  missionsPlayerPanel.querySelectorAll(".missions-player-details").forEach((d) => {
    if (d !== details) d.classList.add("hidden");
  });

  // Alterna a atual
  details.classList.toggle("hidden");
});
