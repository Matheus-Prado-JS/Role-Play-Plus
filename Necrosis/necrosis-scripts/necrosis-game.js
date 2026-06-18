const menuToggle =
document.getElementById(
    "menuToggle"
);

const controlMenu =
document.getElementById(
    "controlMenu"
);

const moderatorToggle =
document.getElementById(
    "moderatorToggle"
);

const moderatorMenu =
document.getElementById(
    "moderatorMenu"
);


/*
========================================
MENU CONTROLE
========================================
*/

menuToggle.addEventListener(
    "click",
    () => {

        controlMenu.classList.toggle(
            "open"
        );

        if(
            controlMenu.classList.contains(
                "open"
            )
        ){

            moderatorToggle.classList.add(
                "hidden"
            );

            menuToggle.classList.add(
                "active"
            );

        }

        else{

            moderatorToggle.classList.remove(
                "hidden"
            );

            menuToggle.classList.remove(
                "active"
            );

        }

    }
);


/*
========================================
MENU MODERADOR
========================================
*/

moderatorToggle.addEventListener(
    "click",
    () => {

        moderatorMenu.classList.toggle(
            "open"
        );

        if(
            moderatorMenu.classList.contains(
                "open"
            )
        ){

            menuToggle.classList.add(
                "hidden"
            );

            moderatorToggle.classList.add(
                "active"
            );

        }

        else{

            menuToggle.classList.remove(
                "hidden"
            );

            moderatorToggle.classList.remove(
                "active"
            );

        }

    }
);