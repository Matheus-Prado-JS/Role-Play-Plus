// =========================
// SISTEMA DE DADOS (NOVO)
// =========================

let diceSelection = {};

function selectDice(type) {
  if (!diceSelection[type]) {
    diceSelection[type] = 0;
  }

  diceSelection[type]++;

  const counter = document.getElementById(`count-d${type}`);
  counter.innerText = diceSelection[type];
  counter.style.display = "block";
}
let diceResultTimeout = null;

function rollAllDice() {
  let allResults = [];
  let logDetails = [];

  for (let dice in diceSelection) {
    const times = diceSelection[dice];

    for (let i = 0; i < times; i++) {
      const roll = Math.floor(Math.random() * dice) + 1;
      allResults.push(roll);
      logDetails.push(`D${dice}: ${roll}`);
    }
  }

  if (allResults.length === 0) {
    document.getElementById("dice-result").innerText = "Nenhum dado selecionado";
    return;
  }

  const total = allResults.reduce((a, b) => a + b, 0);
  const highest = Math.max(...allResults);

  /* RESULTADO LIMPO */
const diceResultEl = document.getElementById("dice-result");

diceResultEl.innerHTML = `
  <div>Total: <strong>${total}</strong></div>
  <div>Maior Dado: <strong>${highest}</strong></div>
`;

diceResultEl.classList.add("show");

// limpa timeout anterior (caso role de novo rápido)
if (diceResultTimeout) {
  clearTimeout(diceResultTimeout);
}

// depois de X segundos, some
diceResultTimeout = setTimeout(() => {
  diceResultEl.classList.remove("show");
}, 3500); // ⏱️ tempo em ms (ajuste livre)

const roller = window.playerName || "Alguém";
addLog(`🎲 ${roller} rolou: ${allResults.join(", ")}`);

  resetDice();
}
function clearLog() {
  if (!isMaster()) {
    addLog("🚫 Apenas o Moderador pode limpar o log.");
    return;
  }
  logRef.remove();
}

function resetDice() {
  diceSelection = {};

  document.querySelectorAll(".dice-count").forEach(counter => {
    counter.innerText = "";
    counter.style.display = "none";
  });
}

window.selectDice = selectDice;
window.rollAllDice = rollAllDice;
window.clearLog = clearLog;
