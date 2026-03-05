const fichaBtn = document.getElementById("fichaBtn")

const fichaMenu = document.getElementById("fichaMenu")
const fichaPlayerSelect = document.getElementById("fichaPlayerSelect")
const fichaSheet = document.getElementById("fichaSheet")

const fichaPlayers = document.querySelectorAll(".fichaPlayer")

const fichaBack = document.getElementById("fichaBack")
const fichaClose = document.getElementById("fichaClose")


/* ========================= */
/* ABRIR MENU */
/* ========================= */

fichaBtn.onclick = () => {

  fichaMenu.classList.add("open")

  fichaPlayerSelect.classList.remove("hidden")

  fichaSheet.classList.remove("active")

}


/* ========================= */
/* FECHAR MENU */
/* ========================= */

fichaClose.onclick = () => {

  fichaMenu.classList.remove("open")

}


/* ========================= */
/* ESCOLHER PLAYER */
/* ========================= */

fichaPlayers.forEach(btn => {

  btn.onclick = () => {

    fichaPlayerSelect.classList.add("hidden")

    fichaSheet.classList.add("active")

  }

})


/* ========================= */
/* VOLTAR PARA PLAYERS */
/* ========================= */

fichaBack.onclick = () => {

  fichaSheet.classList.remove("active")

  fichaPlayerSelect.classList.remove("hidden")

}
/* ========================= */
/* HELIX HEALTH SYSTEM */
/* ========================= */

const cfInputs = document.querySelectorAll(".estadoRow input")

const cfAtual = cfInputs[0]
const cfTotal = cfInputs[1]

const healthText = document.getElementById("healthText")
const healthFill = document.getElementById("healthFill")
const healthMonitor = document.getElementById("healthMonitor")

/* contaminação */
const contInput = cfInputs[6] // input de CO

function updateHealthStatus(){

  const atual = Number(cfAtual.value)
  const total = Number(cfTotal.value)

  if(!atual || !total) return

  const percent = (atual / total) * 100

  /* barra */

  healthFill.style.width = percent + "%"

  /* reset classes */

  healthText.classList.remove(
    "health-good",
    "health-fine",
    "health-caution",
    "health-danger"
  )

  /* estado */

  if(percent <= 20){

    healthText.textContent = "DANGER"
    healthText.classList.add("health-danger")

  }

  else if(percent <= 40){

    healthText.textContent = "CAUTION"
    healthText.classList.add("health-caution")

  }

  else if(percent <= 60){

    healthText.textContent = "FINE"
    healthText.classList.add("health-fine")

  }

  else{

    healthText.textContent = "GOOD"
    healthText.classList.add("health-good")

  }

  /* velocidade ECG baseada na vida */

  const ecg = document.querySelector(".ecg-svg")

  if(percent <= 20){

    ecg.style.animationDuration = "1s"

  }

  else if(percent <= 40){

    ecg.style.animationDuration = "1.6s"

  }

  else{

    ecg.style.animationDuration = "3s"

  }

}

/* ========================= */
/* CONTAMINATION EFFECT */
/* ========================= */

function updateContamination(){

  const contamination = Number(contInput.value)

  if(contamination > 0){

    healthMonitor.classList.add("contaminated")

  } else{

    healthMonitor.classList.remove("contaminated")

  }

}

/* listeners */

cfAtual.addEventListener("input", updateHealthStatus)
cfTotal.addEventListener("input", updateHealthStatus)

contInput.addEventListener("input", updateContamination)