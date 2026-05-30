document.addEventListener("DOMContentLoaded", () => {

  const creatorNext = document.getElementById("creatorNext");
  const characterCreator = document.getElementById("characterCreator");
  const fichaScreen = document.getElementById("fichaScreen");

  window.selectedArchetype = null;

  creatorNext.addEventListener("click", () => {

    if (!window.selectedArchetype) {
      console.log("Nenhum arquétipo selecionado");
      return;
    }

    characterCreator.classList.add("hidden");
    fichaScreen.classList.remove("hidden");

    document.getElementById("fichaTitle").textContent = "FICHA";
    document.getElementById("fichaSubtitle").textContent = window.selectedArchetype;

    document.getElementById("fichaContent").innerHTML =
      window.infos?.[window.selectedArchetype] || "Ficha não encontrada";

  });

});