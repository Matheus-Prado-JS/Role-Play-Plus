/*
========================================
NECROSIS
SISTEMA DE CRIAÇÃO DE PERSONAGEM
========================================
*/


/*
========================================
ABRIR / FECHAR PAINEL DE CRIAÇÃO
========================================
*/

const createCharacterBtn =
document.getElementById(
    "createCharacterBtn"
);

const panel =
document.getElementById(
    "characterCreationPanel"
);

createCharacterBtn.addEventListener(
    "click",
    () => {

        panel.classList.toggle("open");

    }
);


/*
========================================
SELEÇÃO DE PERSONAGEM
ALTERA A ARTE EXIBIDA
========================================
*/

const characterSelect =
document.getElementById(
    "characterSelect"
);

const characterImage =
document.getElementById(
    "characterImage"
);

characterSelect.addEventListener(
    "change",
    () => {

        const selected =
            characterSelect.value;

        characterImage.src =
            `../necrosis-assets/${selected}-Art.png`;

    }
);


/*
========================================
ARQUÉTIPOS
APLICAÇÃO AUTOMÁTICA
========================================
*/

const archetypeSelect =
document.getElementById(
    "archetypeSelect"
);

archetypeSelect.addEventListener(
    "change",
    applyArchetype
);


/*
========================================
ETAPAS DA CRIAÇÃO
========================================
*/

const baseStep =
document.getElementById(
    "baseStep"
);

const attributeStep =
document.getElementById(
    "attributeStep"
);

const trainingStep =
document.getElementById(
    "trainingStep"
);

const inventoryStep =
document.getElementById(
    "inventoryStep"
);

const summaryStep =
document.getElementById(
    "summaryStep"
);

const confirmCharacterBtn =
document.getElementById(
    "confirmCharacterBtn"
);

const printCharacterBtn =
document.getElementById(
    "printCharacterBtn"
);

const returnCharacterBtn =
document.getElementById(
    "returnCharacterBtn"
);

const saveCharacterBtn =
document.getElementById(
    "saveCharacterBtn"
);

const nextStep =
document.getElementById(
    "nextStep"
);

const previousStep =
document.getElementById(
    "previousStep"
);

let currentStep = 0;


/*
========================================
NAVEGAÇÃO ENTRE ETAPAS
BASE -> ATRIBUTOS
ATRIBUTOS -> TREINAMENTOS
TREINAMENTOS -> INVENTÁRIO
========================================
*/

nextStep.addEventListener(
    "click",
    () => {

        if(currentStep === 0){

            baseStep.classList.remove(
                "active"
            );

            attributeStep.classList.add(
                "active"
            );

            currentStep = 1;

            previousStep.disabled = false;

            previousStep.classList.remove(
                "disabled"
            );

        }

        else if(currentStep === 1){

            attributeStep.classList.remove(
                "active"
            );

            trainingStep.classList.add(
                "active"
            );

            currentStep = 2;

        }

        else if(currentStep === 2){

    trainingStep.classList.remove(
        "active"
    );

    inventoryStep.classList.add(
        "active"
    );

    nextStep.style.display =
        "none";

    confirmCharacterBtn.style.display =
        "inline-block";

    currentStep = 3;

}

    }
);

previousStep.addEventListener(
    "click",
    () => {

        if(currentStep === 3){

            inventoryStep.classList.remove(
                "active"
            );

            trainingStep.classList.add(
                "active"
            );

            nextStep.style.display =
                "inline-block";

            confirmCharacterBtn.style.display =
                "none";

            currentStep = 2;

        }

        else if(currentStep === 2){

            trainingStep.classList.remove(
                "active"
            );

            attributeStep.classList.add(
                "active"
            );

            currentStep = 1;

        }

        else if(currentStep === 1){

            attributeStep.classList.remove(
                "active"
            );

            baseStep.classList.add(
                "active"
            );

            currentStep = 0;

            previousStep.disabled = true;

            previousStep.classList.add(
                "disabled"
            );

        }

    }
);


/*
========================================
ATRIBUTOS
FOR | AGI | VIG | PER | INT | PRE
========================================
*/

const attributes = {

    FOR: 0,
    AGI: 0,
    VIG: 0,
    PER: 0,
    INT: 0,
    PRE: 0

};

let remainingPoints = 6;

const remainingPointsElement =
document.getElementById(
    "remainingPoints"
);


/*
========================================
CONTROLES DE ATRIBUTOS
BOTÕES + E -
========================================
*/

document
.querySelectorAll(".attributeRow")
.forEach(row => {

    const attributeName =
    row.querySelector(
        ".attributeValue"
    ).id;

    const valueElement =
    document.getElementById(
        attributeName
    );

    const plusButton =
    row.querySelector(".plus");

    const minusButton =
    row.querySelector(".minus");

    plusButton.addEventListener(
        "click",
        () => {

            if(
                remainingPoints > 0 &&
                attributes[attributeName] < 3
            ){

                attributes[attributeName]++;

                remainingPoints--;

                valueElement.textContent =
                    attributes[attributeName];

                remainingPointsElement.textContent =
                    remainingPoints;

            }

        }
    );

    minusButton.addEventListener(
        "click",
        () => {

            if(
                attributes[attributeName] > 0
            ){

                attributes[attributeName]--;

                remainingPoints++;

                valueElement.textContent =
                    attributes[attributeName];

                remainingPointsElement.textContent =
                    remainingPoints;

            }

        }
    );

});


/*
========================================
TREINAMENTOS
========================================
*/

let selectedTrainings = 0;

const trainingCount =
document.getElementById(
    "trainingCount"
);

document
.querySelectorAll(".trainingButton")
.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            if(
                !button.classList.contains(
                    "selected"
                )
            ){

                if(
                    selectedTrainings >= 3
                ){

                    return;

                }

                button.classList.add(
                    "selected"
                );

                selectedTrainings++;

            }

            else{

                button.classList.remove(
                    "selected"
                );

                selectedTrainings--;

            }

            trainingCount.textContent =
                selectedTrainings;

        }
    );

});


/*
========================================
APLICAÇÃO DE ARQUÉTIPOS
ATRIBUTOS
TREINAMENTOS
INVENTÁRIO
========================================
*/

function applyArchetype(){

    const archetypeName =
        archetypeSelect.value;

    const archetype =
        archetypes[archetypeName];

    if(!archetype){

        return;

    }

    /*
    ========================
    ATRIBUTOS
    ========================
    */

    Object.keys(
        attributes
    ).forEach(attribute => {

        attributes[attribute] =
            archetype.attributes[
                attribute
            ];

        document.getElementById(
            attribute
        ).textContent =
            archetype.attributes[
                attribute
            ];

    });

    /*
    ========================
    PONTOS RESTANTES
    ========================
    */

    const spentPoints =
        Object.values(
            archetype.attributes
        ).reduce(
            (
                total,
                value
            ) =>
                total + value,
            0
        );

    remainingPoints =
        6 - spentPoints;

    remainingPointsElement.textContent =
        remainingPoints;

    /*
    ========================
    TREINAMENTOS
    ========================
    */

    document
    .querySelectorAll(
        ".trainingButton"
    )
    .forEach(button => {

        button.classList.remove(
            "selected"
        );

    });

    selectedTrainings = 0;

    archetype.trainings.forEach(
        training => {

            const button =
            document.querySelector(
                `[data-training="${training}"]`
            );

            if(button){

                button.classList.add(
                    "selected"
                );

                selectedTrainings++;

            }

        }
    );

    trainingCount.textContent =
        selectedTrainings;

    /*
    ========================
    INVENTÁRIO
    ========================
    */

    createInventorySlots();

    fillArchetypeEquipment();

}


/*
========================================
INVENTÁRIO
========================================
*/

const inventoryGrid =
document.getElementById(
    "inventoryGrid"
);

/*
========================================
MENU DE SELEÇÃO DE ITENS
========================================
*/

const itemSelector =
document.getElementById(
    "itemSelector"
);

let selectedSlot = null;

/*
========================================
CRIAR SLOTS DE INVENTÁRIO
========================================
*/

function createInventorySlots(){

    inventoryGrid.innerHTML = "";

    const archetypeName =
        archetypeSelect.value;

    const slotCount =
        archetypeName === "Oficial"
        ? 6
        : 4;

    for(
        let i = 0;
        i < slotCount;
        i++
    ){

        const slot =
        document.createElement(
            "div"
        );

        slot.classList.add(
            "inventorySlot"
        );

        slot.addEventListener(
            "click",
            () => {

                selectedSlot = slot;

                itemSelector.style.display =
                    "block";

                itemSelector.focus();

            }
        );

        inventoryGrid.appendChild(
            slot
        );

    }

}

/*
========================================
POPULAR MENU DE ITENS
========================================
*/

function populateItemSelector(){

    itemSelector.innerHTML =

        `<option value="">
            Selecione um Item
        </option>`;

    Object.keys(items)
    .forEach(itemName => {

        const option =
        document.createElement(
            "option"
        );

        option.value =
            itemName;

        option.textContent =
            itemName;

        itemSelector.appendChild(
            option
        );

    });

}


/*
========================================
PREENCHER INVENTÁRIO
COM EQUIPAMENTOS DO ARQUÉTIPO
========================================
*/

function fillArchetypeEquipment(){

    const archetype =
        archetypes[
            archetypeSelect.value
        ];

    const slots =
    document.querySelectorAll(
        ".inventorySlot"
    );

    slots.forEach(slot => {

        slot.innerHTML = "";

    });

    archetype.equipment.forEach(
        (
            itemName,
            index
        ) => {

            const slot =
                slots[index];

            if(
                !slot ||
                !items[itemName]
            ){

                return;

            }

            const image =
            document.createElement(
                "img"
            );

            image.src =
                items[itemName].image;

                image.dataset.item =
                itemName;

            image.classList.add(
                "inventoryItem"
            );

            slot.appendChild(
                image
            );

            slot.classList.add(
                "filled"
            );

        }
    );

}

/*
========================================
SELECIONAR ITEM
========================================
*/

itemSelector.addEventListener(
    "change",
    () => {

        if(
            !selectedSlot ||
            !itemSelector.value
        ){

            return;

        }

        const itemName =
            itemSelector.value;

        selectedSlot.innerHTML =
            "";

        const image =
        document.createElement(
            "img"
        );

        image.src =
            items[itemName].image;

        image.dataset.item =
            itemName;

        image.classList.add(
            "inventoryItem"
        );

        selectedSlot.classList.add(
            "filled"
        );

        selectedSlot.appendChild(
            image
        );

        itemSelector.style.display =
            "none";

    }
);


/*
========================================
FICHA FINAL
========================================
*/

confirmCharacterBtn.addEventListener(
    "click",
    generateCharacterSummary
);

function generateCharacterSummary(){

    inventoryStep.classList.remove(
        "active"
    );

    summaryStep.classList.add(
        "active"
    );
        document
    .querySelector(".characterCreator")
    .classList.add(
        "summaryMode"
    );

    confirmCharacterBtn.style.display =
        "none";

    previousStep.style.display =
        "none";

    const characterName =
        document.getElementById(
            "characterName"
        ).value || "Sem Nome";

    const characterAge =
        document.getElementById(
            "characterAge"
        ).value || "-";

    const archetype =
        archetypeSelect.value;

    const selectedCharacter =
        characterSelect.value;

    document.getElementById(
        "summaryCharacterImage"
    ).src =
    `../necrosis-assets/${selectedCharacter}-Icon.png`;

    const trainings = [];

    document
    .querySelectorAll(
        ".trainingButton.selected"
    )
    .forEach(button=>{

        trainings.push(
            button.dataset.training
        );

    });

    const inventory = [];

    document
    .querySelectorAll(
        ".inventoryItem"
    )
    .forEach(item=>{

        inventory.push(
            item.dataset.item
        );

    });

    document.getElementById(
        "summaryData"
    ).innerHTML =

    `
    <h2>${characterName}</h2>

    <p>

        <strong>Idade:</strong>
        ${characterAge}

    </p>

    <p>

        <strong>Arquétipo:</strong>
        ${archetype}

    </p>

    <hr>

    <h3>Atributos</h3>

<div class="summaryAttributes">

    ${
        Object.entries(attributes)
        .map(([attribute,value]) =>

            `
            <div class="summaryAttribute ${value === 0 ? "zero" : "active"}">

                <span>${attribute}</span>
                <strong>${value}</strong>

            </div>
            `

        ).join("")
    }

</div>

    <hr>

    <h3>Treinamentos</h3>

    <ul>

        ${
            trainings.map(
                training =>
                `<li>${training}</li>`
            ).join("")
        }

    </ul>

    <hr>

    <h3>Inventário</h3>

    <ul>

        ${
            inventory.map(
                item =>
                `<li>${item}</li>`
            ).join("")
        }

    </ul>
    `;

}

returnCharacterBtn.addEventListener(
    "click",
    () => {

        summaryStep.classList.remove(
            "active"
        );

        inventoryStep.classList.add(
            "active"
        );

        previousStep.style.display =
            "inline-block";

        confirmCharacterBtn.style.display =
            "inline-block";

            document
        .querySelector(".characterCreator")
        .classList.remove(
            "summaryMode"
        );

    }
);

saveCharacterBtn.addEventListener(
    "click",
    () => {

        alert(
            "Sistema de salvamento ainda não implementado."
        );

    }
);

printCharacterBtn.addEventListener(
    "click",
    () => {

        window.print();

    }
);

/*
========================================
INICIALIZAÇÃO
========================================
*/

createInventorySlots();

populateItemSelector();

applyArchetype();