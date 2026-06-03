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
NAVEGAÇÃO ENTRE ETAPAS
FICHA BASE -> ATRIBUTOS
========================================
*/

const trainingStep =
document.getElementById(
    "trainingStep"
);

const baseStep =
document.getElementById(
    "baseStep"
);

const attributeStep =
document.getElementById(
    "attributeStep"
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

    }
);

previousStep.addEventListener(
    "click",
    () => {

        if(currentStep === 2){

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

                if(selectedTrainings >= 3){

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