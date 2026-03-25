import { db, ref, set, onValue, ROOM } from "./Sol-Fire.js";
import { currentUser, onUserLoaded } from "./Sol-System.js";
const docsRef = ref(db, `rooms/${ROOM}/docs/unlocked`);

// =======================
// 📚 DATABASE DE DOCUMENTOS
// =======================

const docsDB = [
  {
    nome: "Diário do Vigia",
    categoria: "Secundário",
    style: "antigo",
    conteudo: `
      <p>Dia 17...</p>
      <p>A névoa voltou a cobrir os portões.</p>
      <p>Eu ouvi algo... não era humano.</p>
    `
  },
  {
    nome: "O Artista Sangrento",
    categoria: "Principal",
    style: "intenso",
    conteudo: `
      <p>As paredes estavam cobertas.</p>
      <p>Não era tinta.</p>
      <p>Ele chamava aquilo de arte.</p>
    `
  },
  {
    nome: "Casa Arkley",
    categoria: "Secundário",
    style: "padrao",
    conteudo: `
      <p>Uma casa antiga nos arredores.</p>
      <p>Ninguém entra.</p>
      <p>Ninguém sai.</p>
    `
  },
];

// =======================
// 🔓 DOCUMENTOS DESBLOQUEADOS
// =======================

let docsDesbloqueados = []; 

onValue(docsRef, (snapshot) => {
  const data = snapshot.val();

  docsDesbloqueados = data || [];
});

const docMasterBtn = document.getElementById("doc-master");

// começa escondido
docMasterBtn.style.display = "none";
onUserLoaded((user) => {

  if (user.nome === "Moderador") {
    docMasterBtn.style.display = "block"; // ou "flex" dependendo do CSS
  }

});

docMasterBtn.addEventListener("click", () => {

  if (!currentUser || currentUser.nome !== "Moderador") {
    return;
  }

  openDocMaster();
});

function openDocMaster() {
  document.body.insertAdjacentHTML("beforeend", `
    <div class="player-menu" id="doc-master-overlay" onclick="closeDocMaster()">
      <div class="player-select-box" onclick="event.stopPropagation()">

        <h2>Documentos</h2>

        <div class="doc-list">
          ${docsDB.map((doc, i) => `
            <div class="doc-item">

              <div class="doc-info">
                <strong>${doc.nome}</strong>
                <span>${doc.categoria}</span>
              </div>

              <button onclick="toggleDoc(${i})">
                ${isDocUnlocked(i) ? "Remover" : "Liberar"}
              </button>

            </div>
          `).join("")}
        </div>

      </div>
    </div>
  `);
}

function isDocUnlocked(index) {
  return docsDesbloqueados.includes(index);
}

function toggleDoc(index) {

  let novos;

  if (docsDesbloqueados.includes(index)) {
    novos = docsDesbloqueados.filter(i => i !== index);
  } else {
    novos = [...docsDesbloqueados, index];
  }

  // 🔥 envia pro Firebase (UMA escrita leve)
  set(docsRef, novos);

  document.getElementById("doc-master-overlay").remove();
  openDocMaster();
}

function closeDocMaster() {
  document.getElementById("doc-master-overlay").remove();
}

const docPlayerBtn = document.getElementById("doc-player");
docPlayerBtn.addEventListener("click", openDocPlayer);

function openDocPlayer() {
  document.body.insertAdjacentHTML("beforeend", `
    <div class="player-menu" id="doc-player-overlay" onclick="closeDocPlayer()">
      <div class="player-select-box" onclick="event.stopPropagation()">

        <h2>Documentos</h2>

        <div class="doc-list">

            ${renderDocCategoria("Principal")}
            ${renderDocCategoria("Secundário")}

            </div>

      </div>
    </div>
  `);
}

function renderDocCategoria(tipo) {
  const docsFiltrados = docsDesbloqueados
    .map(i => ({ ...docsDB[i], index: i }))
    .filter(doc => doc.categoria === tipo);

  if (docsFiltrados.length === 0) return "";

  return `
    <div class="doc-category">

      <div class="doc-category-header" onclick="toggleDocCategoria(this)">
        ${tipo}s ▾
      </div>

      <div class="doc-category-content">
        ${docsFiltrados.map(doc => `
          <div class="doc-item" onclick="openDocView(${doc.index})">
            <div class="doc-info">
              <strong>${doc.nome}</strong>
              <span>${doc.categoria}</span>
            </div>
          </div>
        `).join("")}
      </div>

    </div>
  `;
}

function toggleDocCategoria(header) {
  const parent = header.parentElement;
  parent.classList.toggle("active");
}

function closeDocPlayer() {
  document.getElementById("doc-player-overlay").remove();
}

function openDocView(index) {
  const doc = docsDB[index];

  document.body.insertAdjacentHTML("beforeend", `
    <div class="player-menu" id="doc-view-overlay" onclick="closeDocView()">
      <div class="player-box doc-${doc.style}" onclick="event.stopPropagation()">

        <h2>${doc.nome}</h2>
        <small>${doc.categoria}</small>

        <div class="doc-content">
          ${doc.conteudo}
        </div>

      </div>
    </div>
  `);
}

function closeDocView() {
  document.getElementById("doc-view-overlay").remove();
}

window.toggleDoc = toggleDoc;
window.closeDocMaster = closeDocMaster;
window.closeDocPlayer = closeDocPlayer;
window.openDocView = openDocView;
window.closeDocView = closeDocView;
window.toggleDocCategoria = toggleDocCategoria;