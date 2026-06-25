/*
========================================
SUBMENU MAPA
========================================
*/

const mapButton =
document.getElementById(
    "mapButton"
);

const mapSubmenu =
document.getElementById(
    "mapSubmenu"
);

mapButton.addEventListener(
    "click",
    ()=>{

        mapSubmenu.classList.toggle(
            "open"
        );

    }
);


/*
========================================
PAINEL MAPA
========================================
*/

const mapPanel =
document.getElementById(
    "mapPanel"
);

const mapImage =
document.getElementById(
    "mapImage"
);

const mapViewport =
document.querySelector(
    ".mapViewport"
);

const mapCanvas =
document.getElementById(
    "mapCanvas"
);

let zoom = 1;

let offsetX = 0;
let offsetY = 0;

let dragging = false;

let startX = 0;
let startY = 0;

let currentMap = "Grayford";


document
.querySelectorAll(".mapLocation")
.forEach(button=>{

    button.addEventListener(
        "click",
        ()=>{

            currentMap =
                button.dataset.map;

            mapImage.src =
                `../necrosis-assets/maps/${currentMap}-1F.png`;

                zoom = 1;

                offsetX = 0;
                offsetY = 0;

                updateMapTransform();

            mapPanel.classList.add(
                "open"
            );

        }
    );

});


/*
========================================
ANDARES
========================================
*/

document
.querySelectorAll(".floorButton")
.forEach(button=>{

    button.addEventListener(
        "click",
        ()=>{

            document
            .querySelectorAll(
                ".floorButton"
            )
            .forEach(btn=>{

                btn.classList.remove(
                    "active"
                );

            });

            button.classList.add(
                "active"
            );

            mapImage.src =
            `../necrosis-assets/maps/${currentMap}-${button.dataset.floor}.png`;

            zoom = 1;

            offsetX = 0;
            offsetY = 0;

            updateMapTransform();

        }
    );

});


/*
========================================
FECHAR
========================================
*/

document
.getElementById(
    "closeMapPanel"
)
.addEventListener(
    "click",
    ()=>{

        mapPanel.classList.remove(
            "open"
        );

    }
);

/*
========================================
ZOOM
========================================
*/

function updateMapTransform(){

    mapCanvas.style.transform =

        `translate(${offsetX}px, ${offsetY}px)
         scale(${zoom})`;

}

mapViewport.addEventListener(
    "wheel",
    event=>{

        event.preventDefault();

        if(event.deltaY < 0){

            zoom += 0.1;

        }

        else{

            zoom -= 0.1;

        }

        zoom =

            Math.min(
                3,
                Math.max(
                    1,
                    zoom
                )
            );

        updateMapTransform();

    }
);


/*
========================================
ARRASTAR MAPA
========================================
*/

mapViewport.addEventListener(
    "mousedown",
    event=>{

        dragging = true;

        startX =
            event.clientX - offsetX;

        startY =
            event.clientY - offsetY;

        mapViewport.classList.add(
            "dragging"
        );

    }
);

window.addEventListener(
    "mousemove",
    event=>{

        if(!dragging){

            return;

        }

        offsetX =
            event.clientX - startX;

        offsetY =
            event.clientY - startY;

        updateMapTransform();

    }
);

window.addEventListener(
    "mouseup",
    ()=>{

        dragging = false;

        mapViewport.classList.remove(
            "dragging"
        );

    }
);