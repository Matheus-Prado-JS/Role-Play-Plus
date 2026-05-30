const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

/* =========================
   ✨ CRIAR PARTÍCULAS
========================= */

function createParticles() {

  particles = [];

  for (let i = 0; i < 55; i++) {

    particles.push({

      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,

      size: Math.random() * 2 + 0.5,

      speedX: (Math.random() - 0.5) * 0.2,
      speedY: Math.random() * -0.4 - 0.1,

      opacity: Math.random() * 0.5

    });

  }

}

/* =========================
   🎨 DESENHAR
========================= */

function drawParticles() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {

    ctx.beginPath();

    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

    ctx.fillStyle = `rgba(160,20,20,${p.opacity})`;

    ctx.fill();

  });

}

/* =========================
   🔄 UPDATE
========================= */

function updateParticles() {

  particles.forEach(p => {

    p.x += p.speedX;
    p.y += p.speedY;

    if (p.y < -10) {

      p.y = canvas.height + 10;
      p.x = Math.random() * canvas.width;

    }

  });

}

/* =========================
   🎬 LOOP
========================= */

function animate() {

  drawParticles();
  updateParticles();

  requestAnimationFrame(animate);

}

/* =========================
   📱 RESIZE
========================= */

window.addEventListener("resize", () => {

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  createParticles();

});

/* init */

createParticles();
animate();

/* =========================
   🎮 MENUS
========================= */

const startButton = document.querySelector(".start-button");

const loginMenu = document.getElementById("loginMenu");

const moderatorToggle = document.getElementById("moderatorToggle");

const moderatorPassword = document.getElementById("moderatorPassword");

const openTutorial = document.getElementById("openTutorial");

const tutorialScreen = document.getElementById("tutorialScreen");

/* abrir login */

startButton.addEventListener("click", () => {

  startButton.style.display = "none";

  loginMenu.classList.remove("hidden");

});

/* moderador */

moderatorToggle.addEventListener("change", () => {

  if (moderatorToggle.checked) {

    moderatorPassword.classList.remove("hidden");

  } else {

    moderatorPassword.classList.add("hidden");

  }

});

/* tutorial */

openTutorial.addEventListener("click", () => {

  tutorialScreen.classList.remove("hidden");

});

/* =========================
   📖 TUTORIAL SLIDES
========================= */

const slides = document.querySelectorAll(".tutorial-slide");

const nextButtons = document.querySelectorAll(".tutorial-next");

let currentSlide = 0;

/* próximo slide */

nextButtons.forEach(button => {

  button.addEventListener("click", () => {

    slides[currentSlide].classList.remove("active-slide");

    currentSlide++;

    if (currentSlide >= slides.length) {

      currentSlide = slides.length - 1;

    }

    slides[currentSlide].classList.add("active-slide");

  });

});

/* =====================================
   🎭 CHARACTER CREATOR
===================================== */

const finishTutorial =
  document.querySelector(".tutorial-finish");

const characterCreator =
  document.getElementById("characterCreator");

const archetypeCards =
  document.querySelectorAll(".archetype-card");

const creatorNext =
  document.getElementById("creatorNext");

const archetypeModal =
  document.getElementById("archetypeModal");

const modalContent =
  document.getElementById("modalContent");

const closeModal =
  document.getElementById("closeModal");


/* abrir creator */

finishTutorial.addEventListener("click", () => {

  tutorialScreen.classList.add("hidden");

  characterCreator.classList.remove("hidden");

});

/* selecionar arquétipo */

archetypeCards.forEach(card => {

card.addEventListener("click", () => {

  archetypeCards.forEach(c =>
    c.classList.remove("selected-archetype")
  );

  card.classList.add("selected-archetype");

window.selectedArchetype = card.dataset.archetype;

  creatorNext.classList.remove("disabled-button");

});

});

/* info */

/* info */

document.querySelectorAll(".info-button")
.forEach(button => {

  button.addEventListener("click", (e) => {

    e.stopPropagation();

    const archetype =
      button.closest(".archetype-card")
      .dataset.archetype;

    openArchetypeInfo(archetype);

  });

});

/* fechar modal */

closeModal.addEventListener("click", () => {

  archetypeModal.classList.add("hidden");

});
function openArchetypeInfo(type) {

  archetypeModal.classList.remove("hidden");

  modalContent.innerHTML = infos[type];

}

  const infos = {

"Criminoso": `

<pre>
FICHA — CRIMINOSO


ATRIBUTOS

Pontos Disponíveis: 5

• Valor mínimo: 0
• Valor máximo: 3

Os pontos são colocados nos grupos.

Exemplo:
CORPO +2

Todos atributos físicos recebem +2.


CORPO: +1

Força: +1
Reflexo: +1
Resistência: +1


MENTE: +1

Inteligência: +1
Frieza: +1
Percepção: +1


SOCIAL: +3

Presença: +3
Influência: +3
Máscara: +3


LEQUE MESTRE

Máscara

Uma vez por sessão:
+1 temporário em Máscara.


TREINAMENTOS

Pontos Disponíveis: 15

COMBATE

Luta: 2
Armas Leves: 3
Armas Pesadas: 0
Armas Brancas: 3


CRIME

Furto: 2
Invasão: 2
Tática: 1


INVESTIGAÇÃO

Interrogatório: 0
Perícia: 0
Vigilância: 0
Tecnologia: 0


SOCIAL

Diplomacia: 0
Manipulação: 0
Intimidação: 1


SOBREVIVÊNCIA

Direção: 1
Resistência Urbana: 0
Primeiros Socorros: 0


SAÚDE

Estabilidade:
5 + Resistência

Estado:
6 - Estável


EQUIPAMENTOS

Arma Primária:
Pistola Compacta

Arma Secundária:
Revólver Velho

Arma Corpo a Corpo:
Canivete


Itens:
- Kit de Lockpick
- Rádio Clandestino
- Máscara Criminal


RECURSOS

Dinheiro:
Médio

Influência:
Alta no submundo

Estrelismo:
Baixo


FACÇÃO

Benefício:

Vantagem:

Recurso Exclusivo:

Fraqueza:


ANOTAÇÕES

- 
- 
- 
- 



</pre>
`,

"Detetive": `

<pre>

<pre>
FICHA — DETETIVE


ATRIBUTOS

Pontos Disponíveis: 5

• Valor mínimo: 0
• Valor máximo: 3

Os pontos são colocados nos grupos.

Exemplo:
CORPO +2

Todos atributos físicos recebem +2.


CORPO: +0

Força: +0
Reflexo: +0
Resistência: +0


MENTE: +3

Inteligência: +3
Frieza: +3
Percepção: +3


SOCIAL: +2

Presença: +2
Influência: +2
Máscara: +2


LEQUE MESTRE

Frieza

Uma vez por sessão:
+1 temporário em Frieza.


TREINAMENTOS

Pontos Disponíveis: 15

COMBATE

Luta: 1
Armas Leves: 2
Armas Pesadas: 0
Armas Brancas: 0


CRIME

Furto: 0
Invasão: 1
Tática: 2


INVESTIGAÇÃO

Interrogatório: 3
Perícia: 3
Vigilância: 1
Tecnologia: 1


SOCIAL

Diplomacia: 1
Manipulação: 0
Intimidação: 0


SOBREVIVÊNCIA

Direção: 1
Resistência Urbana: 0
Primeiros Socorros: 0


SAÚDE

Estabilidade:
5 + Resistência

Estado:
5 - Estável


EQUIPAMENTOS

Arma Primária:
Revólver .38

Arma Secundária:
Taser

Arma Corpo a Corpo:
Cassetete


Itens:
- Distintivo, Rádio da DPGC
- Gravador de Voz, Lanterna Tática
- Kit de Perícia


RECURSOS

Dinheiro:
Médio

Influência:
Média na Polícia

Estrelismo:
Médio


FACÇÃO

Benefício:

Vantagem:

Recurso Exclusivo:

Fraqueza:


ANOTAÇÕES

- 
- 
- 
- 

</pre>
`,

"Mercenário": `

<pre>


FICHA — MERCENÁRIO


ATRIBUTOS

Pontos Disponíveis: 5

• Valor mínimo: 0
• Valor máximo: 3

Os pontos são colocados nos grupos.

Exemplo:
CORPO +2

Todos atributos físicos recebem +2.


CORPO: +3

Força: +3
Reflexo: +3
Resistência: +3


MENTE: +1

Inteligência: +1
Frieza: +1
Percepção: +1


SOCIAL: +1

Presença: +1
Influência: +1
Máscara: +1


LEQUE MESTRE

Reflexo
Uma vez por sessão:
+1 temporário em Reflexo.


TREINAMENTOS

Pontos Disponíveis: 15

COMBATE

Luta: 3
Armas Leves: 2
Armas Pesadas: 0
Armas Brancas: 0


CRIME

Furto: 0
Invasão: 0
Tática: 2


INVESTIGAÇÃO

Interrogatório: 0
Perícia: 1
Vigilância: 1
Tecnologia: 1


SOCIAL

Diplomacia: 0
Manipulação: 0
Intimidação: 2


SOBREVIVÊNCIA

Direção: 0
Resistência Urbana: 2
Primeiros Socorros: 1


SAÚDE

Estabilidade:
5 + Resistência

Estado:
8 - Estável


EQUIPAMENTOS

Arma Primária:
Fuzil de Assalto Compacto

Arma Secundária:
Pistola Automática

Arma Corpo a Corpo:
Faca Tática


Itens:
- Rádio Codificado, Kit de Sobrevivência
- Silenciador, Binóculos


RECURSOS

Dinheiro:
Alto

Influência:
Baixa no Sistema | Alta no Submundo

Estrelismo:
Baixo


FACÇÃO

Benefício:

Vantagem:

Recurso Exclusivo:

Fraqueza:


ANOTAÇÕES

- 
- 
- 
- 

</pre>
`,

"Manipulador": `

<pre>


FICHA — MANIPULADOR


ATRIBUTOS

Pontos Disponíveis: 5

• Valor mínimo: 0
• Valor máximo: 3

Os pontos são colocados nos grupos.

Exemplo:
CORPO +2

Todos atributos físicos recebem +2.


CORPO: +0

Força: +0
Reflexo: +0
Resistência: +0


MENTE: +2

Inteligência: +2
Frieza: +2
Percepção: +2


SOCIAL: +3

Presença: +3
Influência: +3
Máscara: +3


LEQUE MESTRE

Inteligência
Uma vez por sessão:
+1 temporário em Inteligência.


TREINAMENTOS

Pontos Disponíveis: 15

COMBATE

Luta: 1
Armas Leves: 1
Armas Pesadas: 0
Armas Brancas: 1


CRIME

Furto: 0
Invasão: 0
Tática: 1


INVESTIGAÇÃO

Interrogatório: 1
Perícia: 0
Vigilância: 1
Tecnologia: 0


SOCIAL

Diplomacia: 3
Manipulação: 5
Intimidação: 1


SOBREVIVÊNCIA

Direção: 0
Resistência Urbana: 0
Primeiros Socorros: 0


SAÚDE

Estabilidade:
5 + Resistência

Estado:
5 - Estável


EQUIPAMENTOS

Arma Primária:
Pistola Compacta Silenciosa

Arma Secundária:
Derringer 263

Arma Corpo a Corpo:
Faca Curta


Itens:
- Microgravador, Kit de Disfarce
- Rádio Clandestino, Sedativos leves


RECURSOS

Dinheiro:
Médio

Influência:
Alta na Política

Estrelismo:
Médio


FACÇÃO

Benefício:

Vantagem:

Recurso Exclusivo:

Fraqueza:


ANOTAÇÕES

- 
- 
- 
- 

</pre>
`

  };

window.infos = infos;