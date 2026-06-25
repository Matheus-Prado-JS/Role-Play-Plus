/*
========================================
DADOS TEMPORÁRIOS DOS JOGADORES
FUTURAMENTE VEM DO FIREBASE / SUPABASE
========================================
*/

const players = [

    {
        name:"Jogador 1",
        archetype:"Oficial",
        icon:"../necrosis-assets/Becky-Icon.png",
        status:"active"
    },

    {
        name:"Jogador 2",
        archetype:"Médico de Campo",
        icon:"../necrosis-assets/Evelyn-Icon.png",
        status:"active"
    },

    {
        name:"Jogador 3",
        archetype:"Detetive",
        icon:"../necrosis-assets/Victor-Icon.png",
        status:"inactive"
    },

    {
        name:"Jogador 4",
        archetype:"Investigador",
        icon:"../necrosis-assets/Christopher-Icon.png",
        status:"inactive"
    }

];


/*
========================================
ELEMENTOS
========================================
*/

const profileButton =
document.getElementById(
    "profileButton"
);

const cooperatorsButton =
document.getElementById(
    "cooperatorsButton"
);

const profilePanel =
document.getElementById(
    "profilePanel"
);

const cooperatorsPanel =
document.getElementById(
    "cooperatorsPanel"
);

const closeProfilePanel =
document.getElementById(
    "closeProfilePanel"
);

const closeCooperatorsPanel =
document.getElementById(
    "closeCooperatorsPanel"
);

const profileContent =
document.getElementById(
    "profileContent"
);

const cooperatorsContent =
document.getElementById(
    "cooperatorsContent"
);


/*
========================================
RENDERIZAR PERFIL
========================================
*/

function renderProfile(){

    const player =
        players[0];

    profileContent.innerHTML =
    `
    <div class="profileCard">

        <div class="profileIcon">

            <img src="${player.icon}">

        </div>

        <div class="profileInfo">

            <h3>${player.name}</h3>

            <p>${player.archetype}</p>

            <span class="playerStatus ${player.status}">

                ${
                    player.status === "active"
                    ? "Ativo"
                    : "Desativado"
                }

            </span>

        </div>

    </div>
    `;

}


/*
========================================
RENDERIZAR COOPERADORES
========================================
*/

function renderCooperators(){

    cooperatorsContent.innerHTML = "";

    players
    .slice(1)
    .forEach(player => {

        const card =
        document.createElement(
            "div"
        );

        card.classList.add(
            "cooperatorCard"
        );

        card.innerHTML =
        `
        <div class="cooperatorIcon">

            <img src="${player.icon}">

        </div>

        <div class="cooperatorInfo">

            <h3>${player.name}</h3>

            <p>${player.archetype}</p>

            <span class="playerStatus ${player.status}">

                ${
                    player.status === "active"
                    ? "Ativo"
                    : "Desativado"
                }

            </span>

        </div>
        `;

        cooperatorsContent.appendChild(
            card
        );

    });

}


/*
========================================
ABRIR / FECHAR PAINÉIS
========================================
*/

profileButton.addEventListener(
    "click",
    () => {

        renderProfile();

        profilePanel.classList.add(
            "open"
        );

        cooperatorsPanel.classList.remove(
            "open"
        );

    }
);

cooperatorsButton.addEventListener(
    "click",
    () => {

        renderCooperators();

        cooperatorsPanel.classList.add(
            "open"
        );

        profilePanel.classList.remove(
            "open"
        );

    }
);

closeProfilePanel.addEventListener(
    "click",
    () => {

        profilePanel.classList.remove(
            "open"
        );

    }
);

closeCooperatorsPanel.addEventListener(
    "click",
    () => {

        cooperatorsPanel.classList.remove(
            "open"
        );

    }
);