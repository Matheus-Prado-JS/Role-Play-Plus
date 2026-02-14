// =========================
// BACKGROUND SELECTOR (MASTER)
// =========================

const bgButton = document.querySelector('[data-action="background"]');
const bgPanel = document.getElementById("background-selector");


// =========================
// FIREBASE LISTENER
// =========================

backgroundRef.on("value", (snapshot) => {
  const data = snapshot.val();
  if (!data || !data.current) return;

  const bgFile = data.current;

  const bgMain = document.getElementById("bg-main");
  const bgFade = document.getElementById("bg-fade");

  if (!bgMain || !bgFade) return;

  // evita trocar pra mesma imagem
  if (bgMain.src.includes(bgFile)) return;

  // prepara a imagem de transição
  bgFade.src = `assets/backgrounds/${bgFile}`;
  bgFade.classList.add("active");

  // após o fade, troca os papéis
  setTimeout(() => {
    bgMain.src = bgFade.src;
    bgFade.classList.remove("active");
  }, 600);

  // UI do painel: ativa o selecionado
  document.querySelectorAll(".background-options li").forEach(li => {
    li.classList.toggle("active", li.dataset.bg === bgFile);
  });

  // abre automaticamente a categoria do background ativo
  const activeOption = document.querySelector(`.background-options li[data-bg="${bgFile}"]`);
  if (activeOption) {
    const categoryContent = activeOption.closest(".bg-category-content");
    const category = activeOption.closest(".bg-category");

    if (categoryContent && category) {
      document.querySelectorAll(".bg-category-content").forEach(c => c.classList.add("hidden"));
      document.querySelectorAll(".bg-category-title").forEach(t => t.classList.remove("open"));

      categoryContent.classList.remove("hidden");
      category.querySelector(".bg-category-title")?.classList.add("open");
    }
  }
});


// =========================
// OPEN / CLOSE PANEL
// =========================

if (bgButton && bgPanel) {
  bgButton.addEventListener("click", (e) => {
    e.stopPropagation();

    if (!requireMaster("alterar o plano de fundo")) return;

    bgPanel.classList.toggle("hidden");
  });
}

// Fecha clicando fora
document.addEventListener("click", (e) => {
  if (!bgPanel || bgPanel.classList.contains("hidden")) return;
  if (!bgButton) return;

  if (!bgPanel.contains(e.target) && !bgButton.contains(e.target)) {
    bgPanel.classList.add("hidden");
  }
});

// Impede clique dentro de fechar
bgPanel?.addEventListener("click", (e) => e.stopPropagation());


// =========================
// DROPDOWN CATEGORIES
// =========================

document.querySelectorAll(".bg-category-title").forEach(titleBtn => {
  titleBtn.addEventListener("click", () => {
    const category = titleBtn.closest(".bg-category");
    if (!category) return;

    const content = category.querySelector(".bg-category-content");
    if (!content) return;

    const isHidden = content.classList.contains("hidden");

    // Fecha todos primeiro
    document.querySelectorAll(".bg-category-content").forEach(c => c.classList.add("hidden"));
    document.querySelectorAll(".bg-category-title").forEach(t => t.classList.remove("open"));

    // Se estava fechado, abre
    if (isHidden) {
      content.classList.remove("hidden");
      titleBtn.classList.add("open");
    }
  });
});


// =========================
// CLICK OPTIONS (MISSION SELECT)
// =========================

document.querySelectorAll(".background-options li").forEach(option => {
  option.addEventListener("click", () => {
    if (!requireMaster("mudar o plano de fundo")) return;

    const bgFile = option.dataset.bg;
    if (!bgFile) return;

    backgroundRef.set({
      current: bgFile,
      changedBy: window.playerName || "Moderador",
      at: Date.now()
    });

    bgPanel.classList.add("hidden");
  });
});
