import { db, ref, set, onValue, ROOM } from "./Sol-Fire.js";
import { currentUser } from "./Sol-System.js";
import { off } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { renderInformacoes } from "./Sol-Infos.js";

// =======================
// 📦 DADOS DOS PLAYERS
// =======================

const playersData = [
  {
    name: "Eddie",

    identidade: {
      PE: 0,
      PN: 0,
      creditos: 0,

      recursos: {
        PV: { atual: 10, total: 10 },
        PM: { atual: 5, total: 5 },
        PVg: { atual: 0, total: 0 },
        PP: { atual: 0, total: 0 }
      },

      status: {
        bleed: 0,
        miasma: 0,
        frost: 0,
        burn: 0,
        interruption: 0
      },

      defesas: {
        fisica: 5,
        magica: 5,
        esquiva: 5,
        contra: 5
      },

      resistencias: {
        bleed: 0,
        poison: 0,
        miasma: 0,
        frost: 0,
        interrupt: 0
      }
    },

    atributos: {
      forca: 0,
      agilidade: 0,
      solar: 0,
      vigor: 0,
      vitalidade: 0,
    },

    treinamentos: {
      Combatente: { 
        Luta: 0, 
        Reflexo: 0,
        Mira: 0,
        Postura: 0
                 },
      Mágicos: { 
        solar: 0, 
        Fé: 0,
        Avanço: 0,
        Piromancia: 0
                 },
      Explorador: { 
        Investigação: 0, 
        Intuição: 0,
        Carisma: 0,
        Percepção: 0
                 },
      Sobrevivente: { 
        Foco: 0, 
        Cura: 0,
        Resiliência: 0,
        Adaptação: 0
                 },
    },
        informacoes: {
        Ataques: [],
        Habilidades: [],
        Notas: [],
        Amuletos: [null, null, null, null]
        }
  },
    {
    name: "Aurelion",

    identidade: {
      PE: 0,
      PN: 0,
      creditos: 0,

      recursos: {
        PV: { atual: 10, total: 10 },
        PM: { atual: 5, total: 5 },
        PVg: { atual: 0, total: 0 },
        PP: { atual: 0, total: 0 }
      },

      status: {
        bleed: 0,
        miasma: 0,
        frost: 0,
        burn: 0,
        interruption: 0
      },

      defesas: {
        fisica: 5,
        magica: 5,
        esquiva: 5,
        contra: 5
      },

      resistencias: {
        bleed: 0,
        poison: 0,
        miasma: 0,
        frost: 0,
        interrupt: 0
      }
    },

    atributos: {
      forca: 0,
      agilidade: 0,
      solar: 0,
      vigor: 0,
      vitalidade: 0,
    },

    treinamentos: {
      Combatente: { 
        Luta: 0, 
        Reflexo: 0,
        Mira: 0,
        Postura: 0
                 },
      Mágicos: { 
        solar: 0, 
        Fé: 0,
        Avanço: 0,
        Piromancia: 0
                 },
      Explorador: { 
        Investigação: 0, 
        Intuição: 0,
        Carisma: 0,
        Percepção: 0
                 },
      Sobrevivente: { 
        Foco: 0, 
        Cura: 0,
        Resiliência: 0,
        Adaptação: 0
                 },
    },
        informacoes: {
        Ataques: [],
        Habilidades: [],
        Notas: [],
        Amuletos: [null, null, null, null]
        }
  },
    {
    name: "Stilgard",

    identidade: {
      PE: 0,
      PN: 0,
      creditos: 0,

      recursos: {
        PV: { atual: 10, total: 10 },
        PM: { atual: 5, total: 5 },
        PVg: { atual: 0, total: 0 },
        PP: { atual: 0, total: 0 }
      },

      status: {
        bleed: 0,
        miasma: 0,
        frost: 0,
        burn: 0,
        interruption: 0
      },

      defesas: {
        fisica: 5,
        magica: 5,
        esquiva: 5,
        contra: 5
      },

      resistencias: {
        bleed: 0,
        poison: 0,
        miasma: 0,
        frost: 0,
        interrupt: 0
      }
    },

    atributos: {
      forca: 0,
      agilidade: 0,
      solar: 0,
      vigor: 0,
      vitalidade: 0,
    },

    treinamentos: {
      Combatente: { 
        Luta: 0, 
        Reflexo: 0,
        Mira: 0,
        Postura: 0
                 },
      Mágicos: { 
        solar: 0, 
        Fé: 0,
        Avanço: 0,
        Piromancia: 0
                 },
      Explorador: { 
        Investigação: 0, 
        Intuição: 0,
        Carisma: 0,
        Percepção: 0
                 },
      Sobrevivente: { 
        Foco: 0, 
        Cura: 0,
        Resiliência: 0,
        Adaptação: 0
                 },
    },
        informacoes: {
        Ataques: [],
        Habilidades: [],
        Notas: [],
        Amuletos: [null, null, null, null]
        }
  },
    {
    name: "Orion",

    identidade: {
      PE: 0,
      PN: 0,
      creditos: 0,

      recursos: {
        PV: { atual: 10, total: 10 },
        PM: { atual: 5, total: 5 },
        PVg: { atual: 0, total: 0 },
        PP: { atual: 0, total: 0 }
      },

      status: {
        bleed: 0,
        miasma: 0,
        frost: 0,
        burn: 0,
        interruption: 0
      },

      defesas: {
        fisica: 5,
        magica: 5,
        esquiva: 5,
        contra: 5
      },

      resistencias: {
        bleed: 0,
        poison: 0,
        miasma: 0,
        frost: 0,
        interrupt: 0
      }
    },

    atributos: {
      forca: 0,
      agilidade: 0,
      solar: 0,
      vigor: 0,
      vitalidade: 0,
    },

    treinamentos: {
      Combatente: { 
        Luta: 0, 
        Reflexo: 0,
        Mira: 0,
        Postura: 0
                 },
      Mágicos: { 
        solar: 0, 
        Fé: 0,
        Avanço: 0,
        Piromancia: 0
                 },
      Explorador: { 
        Investigação: 0, 
        Intuição: 0,
        Carisma: 0,
        Percepção: 0
                 },
      Sobrevivente: { 
        Foco: 0, 
        Cura: 0,
        Resiliência: 0,
        Adaptação: 0
                 },
    },
        informacoes: {
        Ataques: [],
        Habilidades: [],
        Notas: [],
        Amuletos: [null, null, null, null]
        }
  },
    {
    name: "Ashen",

    identidade: {
      PE: 0,
      PN: 0,
      creditos: 0,

      recursos: {
        PV: { atual: 10, total: 10 },
        PM: { atual: 5, total: 5 },
        PVg: { atual: 0, total: 0 },
        PP: { atual: 0, total: 0 }
      },

      status: {
        bleed: 0,
        miasma: 0,
        frost: 0,
        burn: 0,
        interruption: 0
      },

      defesas: {
        fisica: 5,
        magica: 5,
        esquiva: 5,
        contra: 5
      },

      resistencias: {
        bleed: 0,
        poison: 0,
        miasma: 0,
        frost: 0,
        interrupt: 0
      }
    },

    atributos: {
      forca: 0,
      agilidade: 0,
      solar: 0,
      vigor: 0,
      vitalidade: 0,
    },

    treinamentos: {
      Combatente: { 
        Luta: 0, 
        Reflexo: 0,
        Mira: 0,
        Postura: 0
                 },
      Mágicos: { 
        solar: 0, 
        Fé: 0,
        Avanço: 0,
        Piromancia: 0
                 },
      Explorador: { 
        Investigação: 0, 
        Intuição: 0,
        Carisma: 0,
        Percepção: 0
                 },
      Sobrevivente: { 
        Foco: 0, 
        Cura: 0,
        Resiliência: 0,
        Adaptação: 0
                 },
    },
        informacoes: {
        Ataques: [],
        Habilidades: [],
        Notas: [],
        Amuletos: [null, null, null, null]
        }
  },
    {
    name: "Alverian",

    identidade: {
      PE: 0,
      PN: 0,
      creditos: 0,

      recursos: {
        PV: { atual: 10, total: 10 },
        PM: { atual: 5, total: 5 },
        PVg: { atual: 0, total: 0 },
        PP: { atual: 0, total: 0 }
      },

      status: {
        bleed: 0,
        miasma: 0,
        frost: 0,
        burn: 0,
        interruption: 0
      },

      defesas: {
        fisica: 5,
        magica: 5,
        esquiva: 5,
        contra: 5
      },

      resistencias: {
        bleed: 0,
        poison: 0,
        miasma: 0,
        frost: 0,
        interrupt: 0
      }
    },

    atributos: {
      forca: 0,
      agilidade: 0,
      solar: 0,
      vigor: 0,
      vitalidade: 0,
    },

    treinamentos: {
      Combatente: { 
        Luta: 0, 
        Reflexo: 0,
        Mira: 0,
        Postura: 0
                 },
      Mágicos: { 
        solar: 0, 
        Fé: 0,
        Avanço: 0,
        Piromancia: 0
                 },
      Explorador: { 
        Investigação: 0, 
        Intuição: 0,
        Carisma: 0,
        Percepção: 0
                 },
      Sobrevivente: { 
        Foco: 0, 
        Cura: 0,
        Resiliência: 0,
        Adaptação: 0
                 },
    },
    informacoes: {
    Ataques: [],
    Habilidades: [],
    Notas: [],
    Amuletos: [null, null, null, null]
    }
  },
];

import { get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

async function initPlayers() {
  for (const player of playersData) {
    const playerRef = ref(db, `rooms/${ROOM}/fichas/${player.name}`);
    const snapshot = await get(playerRef);

    if (!snapshot.exists()) {
      await set(playerRef, player);
    }
  }
}

initPlayers();

// =======================
// 🎯 ELEMENTOS DOM
// =======================

const playerMenu = document.getElementById("player-menu");
const fichaBtn = document.querySelector('img[src*="Ficha-Player"]');

// =======================
// ⚡ EVENTOS
// =======================

if (fichaBtn) {
  fichaBtn.addEventListener("click", openPlayerMenu);
}

// =======================
// 🖥️ UI PRINCIPAL
// =======================

function openPlayerMenu() {
  playerMenu.classList.remove("hidden");

playerMenu.innerHTML = `
  <div class="player-select-box" id="player-list-box" onclick="event.stopPropagation()">
    <h2>Players</h2>
    <div class="player-list" id="player-list"></div>
  </div>
`;

  const list = document.getElementById("player-list");

  playersData.forEach((p, i) => {
    const item = document.createElement("div");
    item.classList.add("player-item");
    item.textContent = p.name;

    item.addEventListener("click", (e) => {
      e.stopPropagation(); // 🔥 importante
      openPlayerSheet(i);
    });

    list.appendChild(item);
  });

playerMenu.addEventListener("click", (e) => {
  if (e.target === playerMenu) {

    playerMenu.classList.add("hidden");

    // 🔥 remove listener ao fechar
    if (currentPlayerRef) {
      off(currentPlayerRef);
      currentPlayerRef = null;
    }
  }
});
}

// =======================
// 🧩 RENDERIZAÇÃO
// =======================

function renderIdentidade(p) {
  return `
  <div class="category">
    <div class="category-header">Identidade</div>

    <div class="category-content">

      <!-- BASE -->
      ${inputSimples("PE", "identidade.PE", p.identidade.PE)}
      ${inputSimples("PN", "identidade.PN", p.identidade.PN)}
      ${inputSimples("Créditos", "identidade.creditos", p.identidade.creditos)}

      <!-- 🔹 RECURSOS -->
      <div class="subcategory">
        <div class="subcategory-header">Recursos</div>
        <div class="subcategory-content">

          ${renderRecurso("PV", p.identidade.recursos.PV)}
          ${renderRecurso("PM", p.identidade.recursos.PM)}
          ${renderRecurso("PVg", p.identidade.recursos.PVg)}
          ${renderRecurso("PP", p.identidade.recursos.PP)}

        </div>
      </div>

      <!-- 🔹 STATUS -->
      <div class="subcategory">
        <div class="subcategory-header">Status</div>
        <div class="subcategory-content">

          ${renderStatus("Bleed", "identidade.status.bleed", p.identidade.status.bleed, 100)}
          ${renderStatus("Miasma", "identidade.status.miasma", p.identidade.status.miasma, 100)}
          ${renderStatus("Frost", "identidade.status.frost", p.identidade.status.frost, 100)}
          ${renderStatus("Burn", "identidade.status.burn", p.identidade.status.burn, 10)}
          ${renderStatus("Interruption", "identidade.status.interruption", p.identidade.status.interruption, 100)}

        </div>
      </div>

      <!-- 🔹 DEFESAS -->
      <div class="subcategory">
        <div class="subcategory-header">Defesas</div>
        <div class="subcategory-content">

          ${inputSimples("Física", "identidade.defesas.fisica", p.identidade.defesas.fisica)}
          ${inputSimples("Mágica", "identidade.defesas.magica", p.identidade.defesas.magica)}
          ${inputSimples("Esquiva", "identidade.defesas.esquiva", p.identidade.defesas.esquiva)}
          ${inputSimples("Contra-Ataque", "identidade.defesas.contra", p.identidade.defesas.contra)}

        </div>
      </div>

      <!-- 🔹 RESISTÊNCIAS -->
      <div class="subcategory">
        <div class="subcategory-header">Resistências</div>
        <div class="subcategory-content">

          ${inputSimples("Resistência Bleed", "identidade.resistencias.bleed", p.identidade.resistencias.bleed)}
          ${inputSimples("Resistência Poison", "identidade.resistencias.poison", p.identidade.resistencias.poison)}
          ${inputSimples("Resistência Miasma", "identidade.resistencias.miasma", p.identidade.resistencias.miasma)}
          ${inputSimples("Resistência Frost", "identidade.resistencias.frost", p.identidade.resistencias.frost)}
          ${inputSimples("Resistência Interrupt", "identidade.resistencias.interrupt", p.identidade.resistencias.interrupt)}

        </div>
      </div>

    </div>
  </div>
  `;
}

function renderRecurso(nome, data) {
  return `
    <div class="stat-row stat-duplo">
      <span>${nome}:</span>

      <div class="input-group">
        <input type="number" value="${data.atual}"
        onchange="updateValue('identidade.recursos.${nome}.atual', this.value)">

        <span class="divider">|</span>

        <input type="number" value="${data.total}"
        onchange="updateValue('identidade.recursos.${nome}.total', this.value)">
      </div>
    </div>
  `;
}

function renderAtributos(p) {
  return `
  <div class="category">
    <div class="category-header">Atributos</div>

    <div class="category-content">

      ${inputSimples("Força", "atributos.forca", p.atributos.forca)}
      ${inputSimples("Agilidade", "atributos.agilidade", p.atributos.agilidade)}
      ${inputSimples("Solar", "atributos.solar", p.atributos.solar)}
      ${inputSimples("Vigor", "atributos.vigor", p.atributos.vigor)}
      ${inputSimples("Vitalidade", "atributos.vitalidade", p.atributos.vitalidade)}

    </div>
  </div>
  `;
}

function renderTreinamentos(p) {
  return `
  <div class="category">
    <div class="category-header">Treinamentos</div>
    <div class="category-content">

      ${Object.entries(p.treinamentos).map(([cat, data]) => `
        <div class="subcategory">
          <div class="subcategory-header">${cat}</div>
          <div class="subcategory-content">

            ${Object.entries(data).map(([nome, val]) => `
              <div class="stat-row">
                <span>${nome}:</span>
                <input 
                  type="number" 
                  value="${val}"
                  onchange="updateValue('treinamentos.${cat}.${nome}', this.value)"
                >
              </div>
            `).join("")}

          </div>
        </div>
      `).join("")}

    </div>
  </div>
  `;
}

// =======================
// 🖱️ INTERAÇÕES
// =======================

function setupCategoryToggle() {

  document.querySelectorAll(".category-header").forEach(header => {
    header.addEventListener("click", () => {
      header.parentElement.classList.toggle("active");
    });
  });

  document.querySelectorAll(".subcategory-header").forEach(header => {
    header.addEventListener("click", () => {
      header.parentElement.classList.toggle("active");
    });
  });
}

// =======================
// 🧠 ESTADO
// =======================

let currentPlayerIndex = 0;
let currentPlayerName = null;

let currentPlayerRef = null;

function openPlayerSheet(index) {

  currentPlayerIndex = index;
  const p = playersData[index];
  currentPlayerName = p.name;

  const newRef = ref(db, `rooms/${ROOM}/fichas/${currentPlayerName}`);

  // 🔥 remove listener antigo
  if (currentPlayerRef) {
    off(currentPlayerRef);
  }

  currentPlayerRef = newRef;

  onValue(newRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    // 🔥 GARANTE estrutura
    if (!data.informacoes) {
      data.informacoes = {
        Ataques: [],
        Habilidades: [],
        Notas: [],
        Amuletos: [null, null, null, null]
      };
    }

    playersData[index] = data;
    renderPlayerSheet(data);
  });
}

function renderPlayerSheet(p) {

  playerMenu.innerHTML = `
    <div class="player-box" onclick="event.stopPropagation()">

      <div class="player-header">
        <h2>${p.name}</h2>
        <button id="save-btn">Save</button>
      </div>

      ${renderIdentidade(p)}
      ${renderAtributos(p)}
      ${renderTreinamentos(p)}
      ${renderInformacoes(p)}

    </div>
  `;

  document.getElementById("save-btn").addEventListener("click", savePlayer);

  setupCategoryToggle();
}

// =======================
// 🛠️ UTILIDADES
// =======================


function updateValue(path, value) {

  const num = Number(value);

  const keys = path.split(".");
  let obj = playersData[currentPlayerIndex];

  while (keys.length > 1) {
    obj = obj[keys.shift()];
  }

  obj[keys[0]] = num;

}

function savePlayer() {

  if (!currentPlayerName) return;

  const player = playersData[currentPlayerIndex];

  set(
    ref(db, `rooms/${ROOM}/fichas/${currentPlayerName}`),
    player
  );

  console.log("SALVO:", player);
}

function inputSimples(label, path, value) {
  return `
    <div class="stat-row">
      <span>${label}:</span>
      <input type="number" value="${value}"
      onchange="updateValue('${path}', this.value)">
    </div>
  `;
}

function renderStatus(nome, path, value, max) {
  return `
    <div class="stat-row stat-duplo">
      <span>${nome}:</span>

      <div class="input-group">
        <input type="number" min="0" max="${max}" value="${value}"
        onchange="updateValue('${path}', this.value)">

        <span class="divider">|</span>

        <input type="number" value="${max}" disabled>
      </div>
    </div>
  `;
}

window.updateValue = updateValue;
window.savePlayer = savePlayer;

window.playersData = playersData;

window.getCurrentPlayerIndex = () => currentPlayerIndex;

window.openPlayerSheet = openPlayerSheet;
window.savePlayer = savePlayer;