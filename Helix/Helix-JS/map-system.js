const mapBtn = document.getElementById("mapBtn")
const mapUI = document.getElementById("mapUI")

const mapMenu = document.querySelector(".map-menu")
const mapView = document.querySelector(".map-view")

const mapImage = document.getElementById("mapImage")

const floorUp = document.getElementById("floorUp")
const floorDown = document.getElementById("floorDown")
const floorLabel = document.getElementById("floorLabel")

let currentMap = null
let currentFloor = 0

/* abrir mapa */

mapBtn.addEventListener("click",()=>{

mapUI.classList.toggle("hidden")

})

/* escolher local */

document.querySelectorAll(".map-location").forEach(btn=>{

btn.addEventListener("click",()=>{

const map = btn.dataset.map

if(map !== "dprt") return

currentMap = MAP_DATA.dprt

/* sempre começar no primeiro andar */

currentFloor = currentMap.floors.findIndex(f => f.id === "DPRT-1")

loadFloor()

mapMenu.classList.add("hidden")
mapView.classList.remove("hidden")

})

})

/* carregar andar */

function loadFloor(){

const floorData = currentMap.floors[currentFloor]

if(!floorData) return

mapImage.src = `${currentMap.imagePath}${floorData.id}.png`
floorLabel.textContent = floorData.name

}
/* subir andar */

floorUp.addEventListener("click",()=>{

if(currentFloor < currentMap.floors.length - 1){

currentFloor++
loadFloor()

}

})

/* descer andar */

floorDown.addEventListener("click",()=>{

if(currentFloor > 0){

currentFloor--
loadFloor()

}

})

/* fechar mapa clicando fora */

mapUI.addEventListener("click",(e)=>{

const clickedInsideMenu = mapMenu.contains(e.target)
const clickedInsideMap = mapView.contains(e.target)

if(!clickedInsideMenu && !clickedInsideMap){

mapUI.classList.add("hidden")

/* reset visual */

mapMenu.classList.remove("hidden")
mapView.classList.add("hidden")

}

})

/* fechar com ESC */

document.addEventListener("keydown",(e)=>{

if(e.key === "Escape"){

mapUI.classList.add("hidden")

mapMenu.classList.remove("hidden")
mapView.classList.add("hidden")

}

})