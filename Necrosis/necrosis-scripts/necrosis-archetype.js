/*
========================================
ARQUÉTIPOS NECROSIS
========================================
*/

const archetypes = {

    "Médico de Campo": {

        attributes: {

            FOR: 0,
            AGI: 0,
            VIG: 1,
            PER: 2,
            INT: 3,
            PRE: 0

        },

        trainings: [

            "Medicina",
            "Sobrevivência",
            "Tecnologia"

        ],

        equipment: [

            "Spray Anestésico",
            "Modulador de Amostras",
            "Rádio"

        ]

    },

    "Oficial": {

        attributes: {

            FOR: 1,
            AGI: 2,
            VIG: 2,
            PER: 1,
            INT: 0,
            PRE: 0

        },

        trainings: [

            "Armas Curtas",
            "Armas Longas",
            "Sobrevivência"

        ],

        equipment: [

            "Matilda 9mm",
            "Lanterna",
            "Faca Curta"

        ]

    },

    "Detetive": {

        attributes: {

            FOR: 0,
            AGI: 1,
            VIG: 0,
            PER: 3,
            INT: 2,
            PRE: 0

        },

        trainings: [

            "Investigação",
            "Armas Curtas",
            "Tecnologia"

        ],

        equipment: [

            "Rádio",
            "Lanterna",
            "SLS 60"

        ]

    },

    "Investigador": {

        attributes: {

            FOR: 0,
            AGI: 0,
            VIG: 0,
            PER: 2,
            INT: 1,
            PRE: 3

        },

        trainings: [

            "Investigação",
            "Tecnologia",
            "Sobrevivência"

        ],

        equipment: [

            "Câmera Fotográfica",
            "Lanterna",
            "Diário de Investigação"

        ]

    },

    "Nenhum": {

        attributes: {

            FOR: 0,
            AGI: 0,
            VIG: 0,
            PER: 0,
            INT: 0,
            PRE: 0

        },

        trainings: [

        ],

        equipment: [

        ]

    }

};

/*
========================================
BANCO DE ITENS
========================================
*/

/*
========================================
BANCO DE ITENS
========================================
*/

const items = {

    "Spray Anestésico": {

        image:
        "../necrosis-assets/items/Spray-Anestesico.png",

        category:
        "medical",

        description:
        "Aerossol utilizado para sedação emergencial e procedimentos rápidos. Pode ser aplicado para acalmar vítimas, curando um total de 8 pontos de vida. Recupera quase que totalmente a saúde. "

    },

    "Modulador de Amostras": {

        image:
        "../necrosis-assets/items/Modulador-Amostras.png",

        category:
        "medical",

        description:
        "Equipamento portátil para análise e estabilização de amostras biológicas. Pode ser utilizado para desenvolver vacinas e curas para os personagens. Combinando com itens medicinais encontrados no cenário, pode ser criado outros tipos de cura."

    },

    "Rádio": {

        image:
        "../necrosis-assets/items/Radio.png",

        category:
        "communication",

        description:
        "Permite comunicação entre equipes em campo. O equipamento contém 3 rádios contando com o rádio pessoal, funciona em uma distância de até 500 metros, dependendo do ambiente. Pode ser utilizado para coordenar ações, solicitar reforços ou compartilhar informações sobre o ambiente e os inimigos. Em situações de emergência, pode ser usado para pedir evacuação ou assistência médica. Além disso, pode ser combinado com outros equipamentos para obter vantagens em testes de comunicação ou investigação."

    },

    "Matilda 9mm": {

        image:
        "../necrosis-assets/items/Matilda.png",

        category:
        "weapon",

        type:
        "weapon",

        description:
        "Pistola padrão utilizada por agentes de campo.",

        stats:{

            power:2,
            penetration:1,
            reload:2,
            magazine:9

        }

    },

    "Lanterna": {

        image:
        "../necrosis-assets/items/Lanterna.png",

        category:
        "utility",

        type:
        "tool",

        description:
        "Fonte portátil de iluminação.",

        stats:{

            battery:5,
            durability:4

        }

    },

    "Faca Curta": {

        image:
        "../necrosis-assets/items/Faca-Curta.png",

        category:
        "weapon",

        description:
        "Lâmina compacta utilizada para combate próximo.",

        stats:{

            power:2,
            durability:5

        }

    },

    "SLS 60": {

        image:
        "../necrosis-assets/items/SLS60.png",

        category:
        "weapon",

        type:
        "weapon",

        description:
        "Revólver robusto utilizado por investigadores.",

        stats:{

            power:1,
            penetration:2,
            reload:2,
            magazine:5

        }

    },

    "Câmera Fotográfica": {

        image:
        "../necrosis-assets/items/Camera-Fotografica.png",

        category:
        "investigation",

        description:
        "Utilizada para registrar evidências e anomalias. Pode capturar detalhes que passam despercebidos a olho nu, como rastros de sangue, marcas de arranhões ou fenômenos paranormais. As fotos podem ser analisadas posteriormente para obter informações adicionais sobre o ambiente e os inimigos. Além disso, combinada com o Diário, pode dar informações valiosas e vantagens em testes de investigação ou sobrevivência."

    },

    "Diário de Investigação": {

        image:
        "../necrosis-assets/items/Diario-Investigacao.png",

        category:
        "investigation",

        description:
        "Contém observações, pistas e registros de campo. Pode ser usado para atualizar informações sobre o ambiente e os inimigos. Além de enigmas que podem ser resolvidos para obter vantagens ou desbloquear áreas secretas. Informações de portas, estruturas e outros detalhes do cenário podem ser anotados para referência futura."

    },

    "Punisher": {

        image:
        "../necrosis-assets/items/Punisher.png",

        category:
        "weapon",

        description:
        "Pistola modificada com alto poder de perfuração.",

        stats:{

            power:2,
            penetration:3,
            reload:1,
            magazine:8

        }

    },

    "SG-09R": {

        image:
        "../necrosis-assets/items/SG09R.png",

        category:
        "weapon",

        description:
        "Pistola tática moderna de uso profissional.",

        stats:{

            power:2,
            penetration:2,
            reload:2,
            magazine:6

        }

    },

    "Taser": {

        image:
        "../necrosis-assets/items/Taser.png",

        category:
        "weapon",

        description:
        "Dispositivo incapacitante de curto alcance.",

        stats:{

            power:1,
            battery:4

        }

    }

};

const inventoryInfoBtn =
document.getElementById(
    "inventoryInfoBtn"
);

const inventoryInfoPanel =
document.getElementById(
    "inventoryInfoPanel"
);

inventoryInfoBtn.addEventListener(
    "click",
    () => {

        inventoryInfoPanel.style.display =
            "flex";

        generateInventoryInfo();

    }
);

document
.getElementById(
    "closeInventoryInfo"
)
.addEventListener(
    "click",
    () => {

        inventoryInfoPanel.style.display =
            "none";

    }
);

function generateInventoryInfo(){

    const list =
    document.getElementById(
        "inventoryItemList"
    );

    list.innerHTML = "";

    const categories = {

        weapon:
        "ARMAS",

        medical:
        "MÉDICOS",

        investigation:
        "INVESTIGAÇÃO",

        communication:
        "COMUNICAÇÃO",

        utility:
        "UTILITÁRIOS"

    };

    Object.entries(categories)
    .forEach(([categoryKey,categoryName])=>{

        const categoryItems =

        Object.entries(items)
        .filter(
            ([,item])=>

            item.category ===
            categoryKey
        );

        if(
            categoryItems.length === 0
        ){

            return;

        }

        const title =
        document.createElement(
            "div"
        );

        title.classList.add(
            "inventoryCategory"
        );

        title.textContent =
            categoryName;

        list.appendChild(
            title
        );

        categoryItems.forEach(
            ([itemName])=>{

                const entry =
                document.createElement(
                    "div"
                );

                entry.classList.add(
                    "inventoryInfoItem"
                );

                entry.textContent =
                    itemName;

                entry.addEventListener(
                    "click",
                    ()=>{

                        showItemInfo(
                            itemName
                        );

                    }
                );

                list.appendChild(
                    entry
                );

            }
        );

    });

    const firstItem =
        Object.keys(items)[0];

    if(firstItem){

        showItemInfo(
            firstItem
        );

    }

}

function showItemInfo(itemName){

    const item =
        items[itemName];

    document.getElementById(
        "infoItemImage"
    ).src =
        item.image;

    let statsHTML = "";

    if(item.stats){

        Object.entries(item.stats)
        .forEach(([name,value])=>{

            const translated = {

                power:
                    "Poder",

                penetration:
                    "Perfuração",

                reload:
                    "Recarga",

                magazine:
                    "Cartucho",

                battery:
                    "Bateria",

                durability:
                    "Durabilidade"

            };

            statsHTML +=
            `
            <div class="itemStat">

                <span class="statName">

                    ${
                        translated[name] ||
                        name
                    }

                </span>

                <span class="statValue">

                    ${value}

                </span>

            </div>
            `;
        });
    }

    document.getElementById(
        "infoItemData"
    ).innerHTML =

    `
    <h2 class="itemTitle">

        ${itemName}

    </h2>

    <p class="itemDescription">

        ${
            item.description ||
            "Nenhuma descrição cadastrada."
        }

    </p>

    <div class="itemStats">

        ${statsHTML}

    </div>
    `;
}