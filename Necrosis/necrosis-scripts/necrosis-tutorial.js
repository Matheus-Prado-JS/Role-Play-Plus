const warningScreen =
document.getElementById(
    "warningScreen"
);

const tutorialScreen =
document.getElementById(
    "tutorialScreen"
);

const storyScreen =
document.getElementById(
    "storyScreen"
);

const startTutorialBtn =
document.getElementById(
    "startTutorialBtn"
);

const tutorialMusic =
document.getElementById(
    "tutorialMusic"
);

const revealButtons =
document.querySelectorAll(
    ".revealBtn"
);

const continueBtn =
document.getElementById(
    "continueBtn"
);

const proceedBtn =
document.getElementById(
    "proceedBtn"
);

tutorialMusic.volume = 0.25;

startTutorialBtn.addEventListener(
    "click",
    () => {

        tutorialMusic.play().catch(() => {});

        warningScreen.classList.remove(
            "active"
        );

        tutorialScreen.classList.add(
            "active"
        );

        window.scrollTo(
            0,
            0
        );

    }
);

revealButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const card =
            button.closest(
                ".tutorialCard"
            );

            card.classList.add(
                "revealed"
            );

            button.textContent =
                "Revelado";

            button.disabled = true;

        }
    );

});

continueBtn.addEventListener(
    "click",
    () => {

        tutorialScreen.classList.remove(
            "active"
        );

        storyScreen.classList.add(
            "active"
        );

        window.scrollTo(
            0,
            0
        );

    }
);

proceedBtn.addEventListener(
    "click",
    () => {

        window.location.href =
            "necrosis-game.html";

    }
);