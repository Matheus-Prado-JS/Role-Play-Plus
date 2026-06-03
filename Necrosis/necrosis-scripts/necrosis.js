const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

class Particle{

    constructor(){

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 3 + 1;

        this.speedY = Math.random() * 0.3 + 0.1;

        this.opacity = Math.random() * 0.6;
    }

    update(){

        this.y -= this.speedY;

        if(this.y < -10){

            this.y = canvas.height + 10;
            this.x = Math.random() * canvas.width;
        }
    }

    draw(){

        ctx.beginPath();

        ctx.fillStyle = `rgba(0,180,255,${this.opacity})`;

        ctx.shadowBlur = 10;
        ctx.shadowColor = "#00BFFF";

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }
}

for(let i = 0; i < 120; i++){

    particles.push(new Particle());
}

function animate(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(p => {

        p.update();
        p.draw();

    });

    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});

const themeMusic = document.getElementById("themeMusic");
const startSound = document.getElementById("startSound");

themeMusic.volume = 0.25;

/*
    Alguns navegadores bloqueiam autoplay.
    Esta solução inicia a música na primeira interação.
*/

function startThemeMusic(){

    themeMusic.play().catch(() => {});

    document.removeEventListener(
        "click",
        startThemeMusic
    );
}

document.addEventListener(
    "click",
    startThemeMusic
);
document
.getElementById("startButton")
.addEventListener("click", () => {

    const button =
        document.getElementById("startButton");

    const loadingScreen =
        document.getElementById("loadingScreen");

    const loadingProgress =
        document.querySelector(".loadingProgress");

    button.disabled = true;

    startSound.volume = 0.3;
    startSound.play();

    loadingScreen.classList.add("active");

    let progress = 0;

    const fakeLoad = setInterval(() => {

        progress += 1.7;

        loadingProgress.style.width =
            progress + "%";

        if(themeMusic.volume > 0.01){

            themeMusic.volume -= 0.003;

        }

        if(progress >= 100){

            clearInterval(fakeLoad);

            window.location.href =
                "./necrosis-pages/necrosis-creation.html";
        }

    }, 100);

});