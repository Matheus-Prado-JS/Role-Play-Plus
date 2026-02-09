const bgButton = document.querySelector('[data-action="background"]');
const bgPanel = document.getElementById("background-selector");

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

  // UI do painel
  document.querySelectorAll(".background-options li").forEach(li => {
    li.classList.toggle("active", li.dataset.bg === bgFile);
  });
});


if (bgButton && bgPanel) {
  bgButton.addEventListener("click", () => {
    if (!requireMaster("alterar o plano de fundo")) return;
    bgPanel.classList.toggle("hidden");
  });
}

document.addEventListener("click", (e) => {
  if (!bgPanel || bgPanel.classList.contains("hidden")) return;
  if (!bgButton) return;

  if (!bgPanel.contains(e.target) && !bgButton.contains(e.target)) {
    bgPanel.classList.add("hidden");
  }
});

const bgOptions = document.querySelectorAll(".background-options li");

bgOptions.forEach(option => {
  option.addEventListener("click", () => {
    if (!requireMaster("mudar o plano de fundo")) return;

    const bgFile = option.dataset.bg;

    backgroundRef.set({
      current: bgFile,
      changedBy: window.playerName || "Moderador",
      at: Date.now()
    });

    bgPanel.classList.add("hidden");
  });
});
