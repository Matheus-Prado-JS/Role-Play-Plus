const inventoryBtn = document.getElementById("inventoryBtn")
const inventoryPanel = document.getElementById("inventoryPanel")

const playersList = document.querySelectorAll(".inventory-players li")

const inventoryPlayers = document.getElementById("inventoryPlayers")
const inventoryGrid = document.getElementById("inventoryGrid")

const inventoryBack = document.getElementById("inventoryBack")

const inventoryClose = document.getElementById("inventoryClose")

/* ABRIR INVENTARIO */

inventoryBtn.addEventListener("click",()=>{

inventoryPanel.classList.toggle("open")

})

/* CLICAR EM PLAYER */

playersList.forEach(player=>{

player.addEventListener("click",()=>{

inventoryPlayers.style.display="none"
inventoryGrid.classList.add("active")

})

})

/* VOLTAR */

inventoryBack.addEventListener("click",()=>{

inventoryPlayers.style.display="block"
inventoryGrid.classList.remove("active")

})

/* FECHAR INVENTÁRIO */

inventoryClose.addEventListener("click",()=>{

inventoryPanel.classList.remove("open")

inventoryPlayers.style.display="block"
inventoryGrid.classList.remove("active")

})