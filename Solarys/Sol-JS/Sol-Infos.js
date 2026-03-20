
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
    efeito: "+10 de PV máximo",
    imagem: "Sol-Assets/Amulets/loren.png"
  }
];

// =======================
// 🧿 MENU DO MESTRE
// =======================
const masterFichaBtn = document.getElementById("ficha-master");

masterFichaBtn.addEventListener("click", openMasterMenu);

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

                <img src="${a.imagem}">

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
  return amuletosDesbloqueados.includes(amuleto);
}

function toggleAmuleto(index) {
  const amuleto = amuletosDB[index];

  if (isUnlocked(amuleto)) {
    amuletosDesbloqueados = amuletosDesbloqueados.filter(a => a !== amuleto);
  } else {
    amuletosDesbloqueados.push(amuleto);
  }

  // re-render
  document.getElementById("master-overlay").remove();
  openMasterMenu();
}

function closeMasterMenu() {
  document.getElementById("master-overlay").remove();
}

// =======================
// 📦 RENDER - INFORMAÇÕES
// =======================

function renderInformacoes(p) {
  const info = p.informacoes;

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

function renderInfoSection(titulo, tipo, lista) {
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
  const p = playersData[currentPlayerIndex];
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

function saveForm(tipo, index) {
  const p = playersData[currentPlayerIndex];

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
  openPlayerSheet(currentPlayerIndex);
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
  const slots = p.informacoes.Amuletos;

  return `
  <div class="subcategory">
    <div class="subcategory-header">Amuletos</div>

    <div class="subcategory-content">

      <div class="amulet-grid">
        ${[0,1,2,3].map(i => {
          const amuleto = slots[i];

            return `
            <div class="amulet-slot"
                onclick="openAmuletSelector(${i})">

                ${amuleto 
                ? `
                    <img src="${amuleto.imagem}" alt="${amuleto.nome}">

                    <div class="amulet-tooltip">
                    <strong>${amuleto.nome}</strong>
                    <div>${amuleto.efeito}</div>
                    </div>
                `
                : `<span>+</span>`
                }

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
          ${amuletosDesbloqueados.map((a, i) => `
            <div class="amulet-item" onclick="selectAmulet(${slotIndex}, ${i})">

              <img src="${a.imagem}">
              <span>${a.nome}</span>

            </div>
          `).join("")}
        </div>

      </div>
    </div>
  `);
}

function selectAmulet(slotIndex, amuletIndex) {
  const p = playersData[currentPlayerIndex];

  p.informacoes.Amuletos[slotIndex] = amuletosDB[amuletIndex];

  closeAmuletSelector();
  openPlayerSheet(currentPlayerIndex);
}

function closeAmuletSelector() {
  document.getElementById("amulet-overlay").remove();
}
