/* ============================
   SKILL TREES SYSTEM
============================ */

document.addEventListener("DOMContentLoaded", () => {

  const sectionSkillTrees = document.querySelector("#skill-trees-section");
  const tabs = document.querySelectorAll(".tree-tab");
  const maps = document.querySelectorAll(".skill-tree-map");

  // ============================
  // FUNÇÃO: TROCAR ABA
  // ============================
  function switchTree(treeName) {

    // remove active de todas as tabs
    tabs.forEach(tab => tab.classList.remove("active"));

    // remove active de todos os mapas
    maps.forEach(map => map.classList.remove("active"));

    // ativa tab clicada
    const activeTab = document.querySelector(`.tree-tab[data-tree="${treeName}"]`);
    if (activeTab) activeTab.classList.add("active");

    // ativa mapa correspondente
    const activeMap = document.querySelector(`#tree-${treeName}`);
    if (activeMap) activeMap.classList.add("active");
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
  // SCROLL SUAVE PRA SKILL TREE
  // ============================
  function scrollToSkillTree() {
    if (!sectionSkillTrees) return;

    sectionSkillTrees.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  // ============================
  // SCROLL SUAVE PRA CIMA (MAPA)
  // ============================
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }


  // ============================
  // TRIGGER PRA DESCER
  // ============================
  // ⚠️ Aqui você precisa ter um botão no HTML com id="btn-skill-tree"
  const btnSkillTree = document.querySelector("#btn-skill-tree");

  if (btnSkillTree) {
    btnSkillTree.addEventListener("click", () => {
      scrollToSkillTree();
    });
  }


  // ============================
  // TRIGGER PRA SUBIR (topbar)
  // ============================
  // Clica no texto do topo pra voltar
  const skillTreeTopbar = document.querySelector(".skill-tree-topbar");

  if (skillTreeTopbar) {
    skillTreeTopbar.addEventListener("click", () => {
      scrollToTop();
    });
  }


  // ============================
  // SCROLL COM RODA DO MOUSE
  // 1 scroll desce / 1 scroll sobe
  // ============================
  let scrollingLocked = false;

  window.addEventListener("wheel", (event) => {

    if (scrollingLocked) return;

    // detecta direção
    const direction = event.deltaY > 0 ? "down" : "up";

    // trava pra não disparar 20 vezes
    scrollingLocked = true;

    if (direction === "down") {
      scrollToSkillTree();
    } else {
      scrollToTop();
    }

    // destrava depois do smooth scroll
    setTimeout(() => {
      scrollingLocked = false;
    }, 900);

  }, { passive: true });


});
