// =======================
// 📚 DATABASE
// =======================

const questsDB = [
  {
    nome: "Sob a Casca",
    local: "Caminho de Loren",
    recompensa: "Amuleto de Loren",
    descricao: "Algo antigo se esconde sob as raízes da floresta. Investigue antes que desperte.",
  },
];

// =======================
// 🔓 ESTADO
// =======================

let questsAtivas = [];

// =======================
// 🧿 MASTER
// =======================

const questMasterBtn = document.getElementById("quest-master-btn");
questMasterBtn.addEventListener("click", openQuestMaster);

function openQuestMaster() {
  document.body.insertAdjacentHTML("beforeend", `
    <div class="player-menu" id="quest-master" onclick="closeQuestMaster()">
      <div class="player-select-box" onclick="event.stopPropagation()">

        <h2>Quests</h2>

        <div class="quest-list">
          ${questsDB.map((q, i) => `
            <div class="quest-item">

              <div class="quest-info">
                <strong>${q.nome}</strong>
                <span>${q.local}</span>
              </div>

              <div class="quest-buttons">
                <button onclick="toggleQuest(${i})">
                  ${isQuestActive(q) ? "Remover" : "Liberar"}
                </button>

                <button onclick="toggleConcluida(${i})">
                  ${isQuestDone(q) ? "Desfazer" : "Concluída"}
                </button>
              </div>

            </div>
          `).join("")}
        </div>

      </div>
    </div>
  `);
}

function isQuestActive(q) {
  return questsAtivas.includes(q);
}

function isQuestDone(q) {
  return q.concluida === true;
}

function toggleQuest(index) {
  const q = questsDB[index];

  if (isQuestActive(q)) {
    questsAtivas = questsAtivas.filter(x => x !== q);
    q.concluida = false;
  } else {
    questsAtivas.push(q);
  }

  refreshQuestMaster();
}

function toggleConcluida(index) {
  const q = questsDB[index];

  if (!isQuestActive(q)) return; // só pode concluir se estiver ativa

  q.concluida = !q.concluida;

  refreshQuestMaster();
}

function refreshQuestMaster() {
  document.getElementById("quest-master").remove();
  openQuestMaster();
}

function closeQuestMaster() {
  document.getElementById("quest-master").remove();
}

// =======================
// 🧿 PLAYER
// =======================

const questPlayerBtn = document.querySelector('img[src*="Quest-Player"]');
questPlayerBtn.addEventListener("click", openQuestPlayer);

function openQuestPlayer() {
  document.body.insertAdjacentHTML("beforeend", `
    <div class="player-menu" id="quest-player" onclick="closeQuestPlayer()">
      <div class="player-select-box" onclick="event.stopPropagation()">

        <h2>Quests</h2>

        <div class="quest-list">
        ${questsAtivas.map(q => `
        <div class="quest-card ${q.concluida ? "done" : ""}">

            <div class="quest-header" onclick="toggleQuestPlayer(this)">
            <strong>${q.nome}</strong>
            <span>${q.concluida ? "Concluída" : "Ativa"}</span>
            </div>

            <div class="quest-content">
            <span>${q.local}</span>

            <p>${q.descricao}</p>

            <small>Recompensa: ${q.recompensa}</small>
            </div>

        </div>
        `).join("")}
        </div>

      </div>
    </div>
  `);
}

function toggleQuestPlayer(el) {
  el.parentElement.classList.toggle("active");
}

function closeQuestPlayer() {
  document.getElementById("quest-player").remove();
}
