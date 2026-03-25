import { db, ROOM } from "./Sol-Fire.js";
import { set, ref, onValue } from "./Sol-Fire.js";
import { update } from "./Sol-Fire.js";
import { currentUser, onUserLoaded } from "./Sol-System.js";
// =======================
// 🔓 AMULETOS DESBLOQUEADOS (MESTRE)
// =======================

let amuletosDesbloqueados = [];

// =======================
// 🧿 CATÁLOGO DE AMULETOS
// =======================

const amuletosDB = [
  {
    nome: "Amuleto de Loren",
    efeito: "Aumenta em 2 os Ataques que consomem Mana.",
    imagem: "Sol-Assets/Amulets/loren.png"
  },
    {
    nome: "Amuleto da Balança",
    efeito: "Permite agir mais uma vez a cada 4 turnos",
    imagem: "Sol-Assets/Amulets/balanca.png"
  },
    {
    nome: "Amuleto da Família",
    efeito: "Aumenta em 2 a Resistência a Frost.",
    imagem: "Sol-Assets/Amulets/familia.png"
  },
    {
    nome: "Amuleto de Siegbrau",
    efeito: "Aumenta o poder de Luta em 2.",
    imagem: "Sol-Assets/Amulets/siegbrau.png"
  },
  
];

// =======================
// 🧿 MENU DO MESTRE
// =======================

document.addEventListener("DOMContentLoaded", () => {
  const masterFichaBtn = document.querySelector('img[src*="Ficha-Master"]');

  if (masterFichaBtn) {
    masterFichaBtn.style.display = "none";
  }

  if (!masterFichaBtn) return;

  onUserLoaded((user) => {
    const role = (user.role || "").toLowerCase();

    if (user.role === "moderador") {
      masterFichaBtn.style.display = "block";
      masterFichaBtn.addEventListener("click", openMasterMenu);
    } else {
      masterFichaBtn.style.display = "none";
    }
  });
});

function openMasterMenu() {

  document.body.insertAdjacentHTML("beforeend", `
    <div class="player-menu" id="master-overlay" onclick="closeMasterMenu()">

      <div class="player-select-box" onclick="event.stopPropagation()">

        <h2>Ficha do Mestre</h2>

        <div class="master-section">
          <h3>Amuletos</h3>

          <div class="amulet-list">
            ${amuletosDB.map((a, i) => `
              
              <div class="amulet-item">

                <div class="amulet-info">
                  <strong>${a.nome}</strong>
                  <span>${a.efeito}</span>
                </div>

                <button onclick="toggleAmuleto(${i})">
                  ${isUnlocked(a) ? "Remover" : "Liberar"}
                </button>

              </div>

            `).join("")}
          </div>

        </div>

      </div>
    </div>
  `);
}

function isUnlocked(amuleto) {
  return amuletosDesbloqueados.some(a => a.nome === amuleto.nome);
}

function toggleAmuleto(index) {
  const amuleto = amuletosDB[index];

if (isUnlocked(amuleto)) {
  amuletosDesbloqueados = amuletosDesbloqueados.filter(a => a.nome !== amuleto.nome);
} else {
  amuletosDesbloqueados = [...amuletosDesbloqueados, amuleto];
}

console.log("ANTES:", amuletosDesbloqueados);

update(ref(db, `rooms/${ROOM}`), {
  amuletosDesbloqueados: amuletosDesbloqueados
});

  // 🔥 força atualização visual
  document.getElementById("master-overlay")?.remove();
  openMasterMenu();

  console.log("ENVIADO PRO FIREBASE:", amuletosDesbloqueados);
}

onValue(ref(db, `rooms/${ROOM}/amuletosDesbloqueados`), (snap) => {
  const data = snap.val() || [];

  // evita loop se não mudou
  if (JSON.stringify(data) === JSON.stringify(amuletosDesbloqueados)) return;

  amuletosDesbloqueados = data;

  console.log("VINDO DO FIREBASE:", data);
});
// =======================
// 📦 RENDER - INFORMAÇÕES
// =======================

function renderInformacoes(p) {
  garantirEstrutura(p);

  const info = {
    Ataques: [],
    Habilidades: [],
    Notas: [],
    Amuletos: [null, null, null, null],
    ...(p.informacoes || {})
  };

  return `
  <div class="category">
    <div class="category-header">Informações</div>

    <div class="category-content">

      ${renderInfoSection("Ataques", "Ataques", info.Ataques)}
      ${renderInfoSection("Habilidades", "Habilidades", info.Habilidades)}
      ${renderInfoSection("Notas", "Notas", info.Notas)}
      ${renderAmuletos(p)}

    </div>
  </div>
  `;
}

function renderInfoSection(titulo, tipo, lista = []) {
  return `
    <div class="subcategory">
      <div class="subcategory-header">${titulo}</div>

      <div class="subcategory-content">

        <div class="info-header-top">
          <button class="btn-novo" onclick="openForm('${tipo}')">+ Novo</button>
        </div>

        <div class="info-list">
          ${lista.map((item, i) => `
            <div class="info-card" onclick="toggleInfo(this)">

              <div class="info-header">
                <strong>${item.nome}</strong>
                <button class="btn-editar" onclick="event.stopPropagation(); editItem('${tipo}', ${i})">
                  Editar
                </button>
              </div>

              <div class="info-resumo">${item.resumo}</div>
              <div class="info-desc hidden">${item.descricao}</div>

            </div>
          `).join("")}
        </div>

      </div>
    </div>
  `;
}

function toggleInfo(card) {
  const desc = card.querySelector(".info-desc");
  desc.classList.toggle("hidden");
}

// =======================
// 📝 FORMULÁRIOS
// =======================

function openForm(tipo, index = null) {
  const p = window.playersData[window.getCurrentPlayerIndex()];
  const isEdit = index !== null && index !== undefined;

  let data = {
    nome: "",
    resumo: "",
    descricao: ""
  };

  if (isEdit) {
    data = p.informacoes[tipo][index];
  }

  document.body.insertAdjacentHTML("beforeend", `
    <div class="player-menu" id="form-overlay" onclick="closeForm()">

      <div class="player-select-box" onclick="event.stopPropagation()">

        <h2>${isEdit ? "Editar" : "Novo"} ${tipo}</h2>

        <input id="form-nome" placeholder="Nome" value="${data.nome}">
        <input id="form-resumo" placeholder="Resumo" value="${data.resumo}">
        <textarea id="form-desc" placeholder="Descrição">${data.descricao}</textarea>

        <div class="form-actions">
          <button onclick="saveForm('${tipo}', ${index})">Salvar</button>
          <button onclick="closeForm()">Cancelar</button>
        </div>

      </div>
    </div>
  `);
}
function garantirEstrutura(p) {
  if (!p.informacoes) p.informacoes = {};

  p.informacoes.Ataques = p.informacoes.Ataques || [];
  p.informacoes.Habilidades = p.informacoes.Habilidades || [];
  p.informacoes.Notas = p.informacoes.Notas || [];
  p.informacoes.Amuletos = p.informacoes.Amuletos || [null, null, null, null];
}

function saveForm(tipo, index) {
  const p = window.playersData[window.getCurrentPlayerIndex()];

  const novo = {
    nome: document.getElementById("form-nome").value,
    resumo: document.getElementById("form-resumo").value,
    descricao: document.getElementById("form-desc").value
  };

  if (index !== null && index !== undefined) {
    p.informacoes[tipo][index] = novo;
  } else {
    p.informacoes[tipo].push(novo);
  }

  closeForm();
  openPlayerSheet(window.getCurrentPlayerIndex());

  garantirEstrutura(p);
  savePlayer();
}

function editItem(tipo, index) {
  openForm(tipo, index);
}

function closeForm() {
  document.getElementById("form-overlay").remove();
}

// =======================
// 🧿 RENDER - AMULETOS
// =======================

function renderAmuletos(p) {
  garantirEstrutura(p);
  const slots = p.informacoes.Amuletos;

  return `
  <div class="subcategory">
    <div class="subcategory-header">Amuletos</div>

    <div class="subcategory-content">

      <div class="amulet-grid">
        ${[0,1,2,3].map(i => {
          const amuleto = slots[i];

          return `
            <div class="amulet-slot">

              <div class="amulet-click-area" onclick="openAmuletSelector(${i})">

                ${amuleto 
                  ? `
                    <img src="${amuleto.imagem}" alt="${amuleto.nome}">

                    <div class="amulet-tooltip">
                      <strong>${amuleto.nome}</strong>
                      <div>${amuleto.efeito}</div>
                    </div>

                    <button class="amulet-remove"
                      onclick="event.stopPropagation(); removeAmulet(${i})">
                      ✕
                    </button>
                  `
                  : `<span>+</span>`
                }

              </div>

            </div>
          `;
        }).join("")}
      </div>

    </div>
  </div>
  `;
}
// =======================
// 📜 SELECTOR DE AMULETO
// =======================

function openAmuletSelector(slotIndex) {

  document.body.insertAdjacentHTML("beforeend", `
    <div class="player-menu" id="amulet-overlay" onclick="closeAmuletSelector()">

      <div class="player-select-box" onclick="event.stopPropagation()">

        <h2>Escolher Amuleto</h2>

        <div class="amulet-list">
          ${(amuletosDesbloqueados || []).map((a, i) => `
          <div class="amulet-item" onclick="selectAmulet(${slotIndex}, ${i})">

            <img src="${a.imagem}">

            <div class="amulet-info">
              <strong>${a.nome}</strong>
              <span>${a.efeito}</span>
            </div>

          </div>
          `).join("")}
        </div>

      </div>
    </div>
  `);
}

function selectAmulet(slotIndex, amuletIndex) {
  const p = window.playersData[window.getCurrentPlayerIndex()];

  p.informacoes.Amuletos[slotIndex] = amuletosDesbloqueados[amuletIndex];

  closeAmuletSelector();
  openPlayerSheet(window.getCurrentPlayerIndex());

  garantirEstrutura(p);
  savePlayer();
}

function closeAmuletSelector() {
  document.getElementById("amulet-overlay").remove();
}

function removeAmulet(slotIndex) {
  const p = window.playersData[window.getCurrentPlayerIndex()];
  p.informacoes.Amuletos[slotIndex] = null;

  openPlayerSheet(window.getCurrentPlayerIndex());

  garantirEstrutura(p);
  savePlayer();
}

function closeMasterMenu() {
  document.getElementById("master-overlay")?.remove();
}

window.openForm = openForm;
window.editItem = editItem;
window.toggleInfo = toggleInfo;
window.openAmuletSelector = openAmuletSelector;
window.toggleAmuleto = toggleAmuleto;
window.selectAmulet = selectAmulet;
window.removeAmulet = removeAmulet;
window.closeMasterMenu = closeMasterMenu;
window.closeAmuletSelector = closeAmuletSelector;
window.saveForm = saveForm;
window.closeForm = closeForm;
export { renderInformacoes };

console.log("ROLE:", currentUser?.role);
console.log("USER:", currentUser);