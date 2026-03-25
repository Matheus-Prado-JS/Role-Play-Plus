import { db, ref, set, onValue, ROOM } from "./Sol-Fire.js";
import { currentUser, onUserLoaded } from "./Sol-System.js";

const questRef = ref(db, `rooms/${ROOM}/quests/active`);

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

onValue(questRef, (snapshot) => {
  const data = snapshot.val();
  questsAtivas = data || [];
});

// =======================
// 🧿 MASTER
// =======================

const questMasterBtn = document.getElementById("quest-master-btn");

// começa escondido
questMasterBtn.style.display = "none";

onUserLoaded((user) => {
  if (user.nome === "Moderador") {
    questMasterBtn.style.display = "block";
  }
});

questMasterBtn.addEventListener("click", () => {
  if (!currentUser || currentUser.nome !== "Moderador") return;
  openQuestMaster();
});

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
                  ${isQuestActive(i) ? "Remover" : "Liberar"}
                </button>

                <button onclick="toggleConcluida(${i})">
                 ${isQuestDone(i) ? "Desfazer" : "Concluída"}
                </button>
              </div>

            </div>
          `).join("")}
        </div>

      </div>
    </div>
  `);
}

function isQuestActive(index) {
  return questsAtivas.some(q => q.id === index);
}

function isQuestDone(index) {
  return questsAtivas.find(q => q.id === index)?.done === true;
}

function toggleQuest(index) {

  let novos;

  if (isQuestActive(index)) {
    novos = questsAtivas.filter(q => q.id !== index);
  } else {
    novos = [...questsAtivas, { id: index, done: false }];
  }

  set(questRef, novos);

  refreshQuestMaster();
}

function toggleConcluida(index) {

  let novos = questsAtivas.map(q => {
    if (q.id === index) {
      return { ...q, done: !q.done };
    }
    return q;
  });

  set(questRef, novos);

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
        ${questsAtivas.map(q => {
          const data = questsDB[q.id];

          return `
          <div class="quest-card ${q.done ? "done" : ""}">

            <div class="quest-header" onclick="toggleQuestPlayer(this)">
              <strong>${data.nome}</strong>
              <span>${q.done ? "Concluída" : "Ativa"}</span>
            </div>

            <div class="quest-content">
              <span>${data.local}</span>

              <p>${data.descricao}</p>

              <small>Recompensa: ${data.recompensa}</small>
            </div>

          </div>
          `;
        }).join("")}
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

window.toggleQuest = toggleQuest;
window.toggleConcluida = toggleConcluida;
window.closeQuestMaster = closeQuestMaster;
window.closeQuestPlayer = closeQuestPlayer;
window.toggleQuestPlayer = toggleQuestPlayer;