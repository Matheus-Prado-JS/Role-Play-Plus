/* ============================
   SKILL TREES SYSTEM
============================ */

document.addEventListener("DOMContentLoaded", () => {

  const sectionSkillTrees = document.querySelector("#skill-trees-section");
  const tabs = document.querySelectorAll(".tree-tab");
  const maps = document.querySelectorAll(".skill-tree-map");
  let skillTreeOpen = false;

  // ============================
  // MODAL ELEMENTS
  // ============================
  const skillModal = document.querySelector("#skill-modal");
  const modalTitle = document.querySelector("#skill-modal-title");
  const modalDesc = document.querySelector("#skill-modal-desc");
  const modalCost = document.querySelector("#skill-modal-cost");
  const modalCloseBtn = document.querySelector("#skill-modal-close");

  // ============================
  // CONNECTION RULES (LINHAS)
  // ============================
  const connections = [
    [0, 0],
    [1, 2],
    [1, 3],
    [1, 4],
    [2, 5],
    [3, 6],
    [3, 7],
    [4, 8],
    [5, 9],
    [6, 9],
    [7, 10],
    [8, 10],
  ];

  // ============================
  // FUNÇÃO: DESENHAR LINHAS
  // ============================
  function drawSkillLines(skillMap) {
    if (!skillMap) return;

    const lineContainer = skillMap.querySelector(".skill-tree-lines");
    if (!lineContainer) return;

    // limpa linhas antigas
    lineContainer.innerHTML = "";

    // pega todos nodes dessa árvore
    const nodes = skillMap.querySelectorAll(".skill-node");

    // cria um mapa id -> elemento
    const nodeMap = {};
    nodes.forEach(node => {
      const id = node.dataset.id;
      if (id) nodeMap[id] = node;
    });

    const mapRect = skillMap.getBoundingClientRect();

    connections.forEach(([fromId, toId]) => {

      const fromNode = nodeMap[fromId];
      const toNode = nodeMap[toId];

      if (!fromNode || !toNode) return;

      const fromRect = fromNode.getBoundingClientRect();
      const toRect = toNode.getBoundingClientRect();

      // posição do centro do node inicial
      const x1 = (fromRect.left + fromRect.width / 2) - mapRect.left;
      const y1 = (fromRect.top + fromRect.height / 2) - mapRect.top;

      // posição do centro do node final
      const x2 = (toRect.left + toRect.width / 2) - mapRect.left;
      const y2 = (toRect.top + toRect.height / 2) - mapRect.top;

      // calcula distância e ângulo
      const dx = x2 - x1;
      const dy = y2 - y1;

      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      // cria a linha
      const line = document.createElement("div");
      line.classList.add("skill-line");

      line.style.width = `${distance}px`;
      line.style.left = `${x1}px`;
      line.style.top = `${y1}px`;
      line.style.transform = `rotate(${angle}deg)`;

      lineContainer.appendChild(line);
    });
  }

  // ============================
  // FUNÇÃO: DESENHAR LINHAS DA ABA ATIVA
  // ============================
  function drawActiveTreeLines() {
    const activeMap = document.querySelector(".skill-tree-map.active");
    if (activeMap) {
      drawSkillLines(activeMap);
    }
  }

  // ============================
  // FUNÇÃO: TROCAR ABA
  // ============================
  function switchTree(treeName) {

    tabs.forEach(tab => tab.classList.remove("active"));
    maps.forEach(map => map.classList.remove("active"));

    const activeTab = document.querySelector(`.tree-tab[data-tree="${treeName}"]`);
    if (activeTab) activeTab.classList.add("active");

    const activeMap = document.querySelector(`#tree-${treeName}`);
    if (activeMap) activeMap.classList.add("active");

    // redesenha linhas quando muda de árvore
    setTimeout(() => {
      drawActiveTreeLines();
    }, 50);
  }

  // ============================
  // EVENTOS NAS TABS
  // ============================
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const treeName = tab.dataset.tree;
      switchTree(treeName);
    });
  });

// ============================
// BOTÃO ABRIR / FECHAR SKILL TREE
// ============================

const btnSkillTree = document.querySelector("#open-skills-btn");
const closeSkillsBtn = document.querySelector("#close-skills-btn");

if (btnSkillTree && sectionSkillTrees) {
  btnSkillTree.addEventListener("click", () => {
    sectionSkillTrees.classList.remove("hidden");
    drawActiveTreeLines();
  });
}

if (closeSkillsBtn && sectionSkillTrees) {
  closeSkillsBtn.addEventListener("click", () => {
    sectionSkillTrees.classList.add("hidden");
  });
}
  // ============================
  // FUNÇÃO: ABRIR MODAL
  // ============================
  function openSkillModal(skillNode) {
    if (!skillModal) return;

    const name = skillNode.dataset.name || "Habilidade Desconhecida";
    const desc = skillNode.dataset.desc || "Sem descrição ainda.";
    const cost = skillNode.dataset.cost || "1";

    modalTitle.textContent = name;
    modalDesc.textContent = desc;
    modalCost.textContent = `${cost} ponto`;

    skillModal.classList.remove("hidden");
  }

  // ============================
  // FUNÇÃO: FECHAR MODAL
  // ============================
  function closeSkillModal() {
    if (!skillModal) return;
    skillModal.classList.add("hidden");
  }

  // ============================
  // CLICK NAS SKILLS (ABRIR MODAL)
  // ============================
  document.querySelectorAll(".skill-node").forEach(node => {
    node.addEventListener("click", () => {
      openSkillModal(node);
    });
  });

  // ============================
  // BOTÃO FECHAR
  // ============================
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", () => {
      closeSkillModal();
    });
  }

  // ============================
  // CLICAR FORA FECHA MODAL
  // ============================
  if (skillModal) {
    skillModal.addEventListener("click", (event) => {
      if (event.target === skillModal) {
        closeSkillModal();
      }
    });
  }

  // ============================
  // ESC FECHA MODAL
  // ============================
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSkillModal();
    }
  });

  // ============================
  // REDESENHA LINHAS AO REDIMENSIONAR
  // ============================
  window.addEventListener("resize", () => {
    drawActiveTreeLines();
  });

  // ============================
  // DESENHA LINHAS AO CARREGAR
  // ============================
  setTimeout(() => {
    drawActiveTreeLines();
  }, 200);

});
