import { logRoll, currentUser } from "./Sol-System.js";

// ==========================
// 🎲 CONTADOR DE DADOS
// ==========================

const diceWrappers = document.querySelectorAll(".dice-wrapper");

diceWrappers.forEach(wrapper => {
  const dice = wrapper.querySelector(".dice");
  const countEl = wrapper.querySelector(".dice-count");

  let count = 0;

  // clique esquerdo (+1)
  dice.addEventListener("click", () => {
    count++;
    countEl.textContent = count;
  });

  // clique direito (-1)
  dice.addEventListener("contextmenu", (e) => {
    e.preventDefault();

    if (count > 0) {
      count--;
      countEl.textContent = count;
    }
  });
});

// ==========================
// 🎲 ROLL
// ==========================

const rollBtn = document.getElementById("roll-btn");
const resultBox = document.getElementById("roll-result");

rollBtn.addEventListener("click", () => {
  let diceSummary = [];
  let results = [];
  let rollDetails = [];

  diceWrappers.forEach(wrapper => {
    const dice = wrapper.querySelector(".dice");
    const count = parseInt(wrapper.querySelector(".dice-count").textContent);
    const sides = parseInt(dice.dataset.dice);

    if (count > 0) {
      diceSummary.push(`${count}D${sides}`);
    }

    for (let i = 0; i < count; i++) {
      const roll = Math.floor(Math.random() * sides) + 1;

      results.push(roll);

      rollDetails.push({
        value: roll,
        sides: sides
      });
    }
  });

  if (results.length === 0) return;

  // ordenar
  results.sort((a, b) => b - a);

  const main = results[0];
  const others = results.slice(1);

// ==========================
// 🎯 CRÍTICO / FALHA (NOVO)
// ==========================

let mainClass = "";
let statusText = "";

// encontra o dado correspondente ao maior valor
const mainRoll = rollDetails.find(r => r.value === main);

if (mainRoll) {
  if (main === mainRoll.sides) {
    mainClass = "roll-critical";
    statusText = "CRÍTICO!";
  } else if (main === 1) {
    mainClass = "roll-fail";
    statusText = "FALHA!";
  }
}

  // ==========================
  // 🎲 UI
  // ==========================

  resultBox.innerHTML = `
    <div class="roll-main ${mainClass}">${main}</div>
    <div class="roll-others">${others.join(" • ")}</div>
    ${statusText ? `<div class="roll-status ${mainClass}">${statusText}</div>` : ""}
  `;

  resultBox.classList.remove("hidden");

  setTimeout(() => {
    resultBox.classList.add("hidden");
  }, 2000);

  // ==========================
// 📜 LOG
// ==========================

  const nome = currentUser?.nome ?? "Alguém";
  const dados = diceSummary.join(" ");
  const resultados = results;

  logRoll(nome, dados, resultados);

});