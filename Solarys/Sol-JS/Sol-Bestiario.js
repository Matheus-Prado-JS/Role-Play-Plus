// =======================
// 📚 DATABASE
// =======================

const bestiarioDB = [
  // NPC
  {
    nome: "Capitã Elsyra",
    tipo: "NPC",
    categoria: "Principal",
    imagem: "Sol-Assets/Persons/elsyra.png",
    historia: "Líder firme e implacável da guarda costeira."
  },
  {
    nome: "Basili",
    tipo: "NPC",
    categoria: "Secundário",
    imagem: "Sol-Assets/Persons/basili.png",
    historia: "Um informante nervoso que sabe mais do que deveria."
  },
  {
    nome: "Oráculo Luthiel",
    tipo: "NPC",
    categoria: "Império",
    imagem: "Sol-Assets/Persons/luthiel.png",
    historia: "Uma entidade antiga que enxerga além do tempo."
  },

  // INIMIGOS
  {
    nome: "Filhos do Musgo",
    tipo: "Adversário",
    categoria: "Inimigos",
    imagem: "Sol-Assets/Persons/Filhos do Musgo.png",
    historia: "Criaturas que emergem da floresta viva."
  },
  {
    nome: "O Mímico",
    tipo: "Adversário",
    categoria: "Elite",
    imagem: "Sol-Assets/Persons/Mimico.png",
    historia: "Nada é o que parece quando ele está por perto."
  },
  {
    nome: "General Varok",
    tipo: "Adversário",
    categoria: "Chefes",
    imagem: "Sol-Assets/Persons/Varok.png",
    historia: "Um comandante brutal que nunca perdeu uma guerra."
  }
];

// =======================
// 🔓 DESBLOQUEADOS
// =======================

let bestiarioDesbloqueados = [];

// =======================
// 🧿 MASTER
// =======================

const npcMasterBtn = document.querySelector('img[src*="NPC-Master"]');
npcMasterBtn.addEventListener("click", openBestiarioMaster);

function openBestiarioMaster() {
  document.body.insertAdjacentHTML("beforeend", `
    <div class="player-menu" id="bestiario-master" onclick="closeBestiarioMaster()">
      <div class="player-select-box" onclick="event.stopPropagation()">

        <h2>Bestiário</h2>

            <div class="bestiario-list">

            ${renderMasterCategoria("NPC")}
            ${renderMasterCategoria("Adversário")}

            </div>

      </div>
    </div>
  `);
}

function renderMasterCategoria(tipo) {
  const lista = bestiarioDB
    .map((n, i) => ({ ...n, index: i }))
    .filter(n => n.tipo === tipo);

  return `
    <div class="bestiario-category">

      <div class="bestiario-header" onclick="toggleBestiarioCat(this)">
        ${tipo} ▾
      </div>

      <div class="bestiario-content">
        ${lista.map(n => `
          <div class="bestiario-item">

            <div class="bestiario-info">
              <strong>${n.nome}</strong>
              <span>${n.categoria}</span>
            </div>

            <button onclick="event.stopPropagation(); toggleBestiario(${n.index})">
              ${isBestiarioUnlocked(n) ? "Remover" : "Liberar"}
            </button>

          </div>
        `).join("")}
      </div>

    </div>
  `;
}

function isBestiarioUnlocked(npc) {
  return bestiarioDesbloqueados.includes(npc);
}

function toggleBestiario(index) {
  const npc = bestiarioDB[index];

  if (isBestiarioUnlocked(npc)) {
    bestiarioDesbloqueados = bestiarioDesbloqueados.filter(n => n !== npc);
  } else {
    bestiarioDesbloqueados.push(npc);
  }

  atualizarBotoesMaster();
}
function closeBestiarioMaster() {
  document.getElementById("bestiario-master").remove();
}
function atualizarBotoesMaster() {
  const buttons = document.querySelectorAll("#bestiario-master button");

  buttons.forEach((btn, i) => {
    const npc = bestiarioDB[i];

    if (isBestiarioUnlocked(npc)) {
      btn.textContent = "Remover";
    } else {
      btn.textContent = "Liberar";
    }
  });
}
// =======================
// 🧿 PLAYER
// =======================

const npcPlayerBtn = document.querySelector('img[src*="NPC-Player"]');
npcPlayerBtn.addEventListener("click", openBestiarioPlayer);

function openBestiarioPlayer() {
  document.body.insertAdjacentHTML("beforeend", `
    <div class="player-menu" id="bestiario-player" onclick="closeBestiarioPlayer()">
      <div class="player-select-box" onclick="event.stopPropagation()">

        <h2>Bestiário</h2>

        <div class="bestiario-list">
          ${renderBestiarioCategoria("NPC")}
          ${renderBestiarioCategoria("Adversário")}
        </div>

      </div>
    </div>
  `);
}

function renderBestiarioCategoria(tipo) {
  const subcategorias = {
    NPC: ["Principal", "Secundário", "Império"],
    Adversário: ["Inimigos", "Elite", "Chefes"]
  };

  return `
    <div class="bestiario-category">

      <div class="bestiario-header" onclick="toggleBestiarioCat(this)">
        ${tipo} ▾
      </div>

      <div class="bestiario-content">
        ${subcategorias[tipo].map(sub => renderBestiarioSub(tipo, sub)).join("")}
      </div>

    </div>
  `;
}

function renderBestiarioSub(tipo, sub) {
  const lista = bestiarioDesbloqueados.filter(n => n.tipo === tipo && n.categoria === sub);

  if (!lista.length) return "";

  return `
    <div class="bestiario-sub">

      <div class="bestiario-sub-header" onclick="toggleBestiarioCat(this)">
        ${sub} ▾
      </div>

      <div class="bestiario-sub-content">
        ${lista.map(n => `
        <div class="bestiario-item" onclick="openBestiarioView('${n.nome}')">

        <div class="bestiario-info">
            <strong>${n.nome}</strong>
        </div>

        </div>
        `).join("")}
      </div>

    </div>
  `;
}

function toggleBestiarioCat(el) {
  el.parentElement.classList.toggle("active");
}

function closeBestiarioPlayer() {
  document.getElementById("bestiario-player").remove();
}

function openBestiarioView(nome) {
  const npc = bestiarioDesbloqueados.find(n => n.nome === nome);

  document.body.insertAdjacentHTML("beforeend", `
    <div class="player-menu" id="bestiario-view" onclick="closeBestiarioView()">
      <div class="player-box bestiario-view-box" onclick="event.stopPropagation()">

        <img src="${npc.imagem}" class="bestiario-view-img">

        <div class="bestiario-view-info">
        <h2>${npc.nome}</h2>
        <small>${npc.tipo} • ${npc.categoria}</small>

        <p class="bestiario-view-text">
            ${npc.historia}
        </p>
        </div>
    </div>
  `);
}

function closeBestiarioView() {
  document.getElementById("bestiario-view").remove();
}