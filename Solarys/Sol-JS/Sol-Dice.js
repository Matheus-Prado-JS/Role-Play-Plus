// ==========================
// 🎲 SISTEMA DE DADOS (BASE)
// ==========================

const dices = document.querySelectorAll(".dice");

dices.forEach(dice => {
  dice.addEventListener("click", () => {
    const sides = dice.dataset.dice;

    console.log(`Rolando D${sides}...`);

    // futuramente:
    // gerar número aleatório
    // animar dado
    // enviar pro Firebase
  });
});