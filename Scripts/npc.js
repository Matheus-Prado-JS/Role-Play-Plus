const npcMasterPanel = document.getElementById("npc-master-panel");

if (npcMasterPanel) {
  npcMasterPanel.addEventListener("click", (e) => {
    const toggle = e.target.closest(".npc-toggle");
    if (!toggle) return;

    if (!requireMaster("controlar NPCs")) return;

    const item = toggle.closest(".npc-item");
    const npcId = item.dataset.npc;

    const isLocked = item.classList.contains("locked");

    npcsRef.child(npcId).update({
      unlocked: isLocked
    });
  });
}

const npcPlayerBtn = document.querySelector('[data-action="npcs"]');
const npcMasterBtn = document.querySelector('[data-action="npcs-master"]');

const npcPlayerPanel = document.getElementById("npc-player-panel");
/* =========================
   NOVO SISTEMA: MODO & FILTROS
========================= */

const modeButtons = npcPlayerPanel.querySelectorAll(".npc-mode-btn");
const filterButtons = npcPlayerPanel.querySelectorAll(".npc-filter-btn");
const npcItems = npcPlayerPanel.querySelectorAll(".npc-item");

let currentMode = "npc";
let currentCategory = "principais";

const npcSheet = document.getElementById("npc-sheet");
let currentOpenNpcId = null;
if (npcPlayerBtn && npcPlayerPanel && npcSheet) {
  npcPlayerBtn.addEventListener("click", () => {
    npcPlayerPanel.classList.toggle("hidden");
    npcSheet.classList.add("hidden");
    currentOpenNpcId = null;

    if (!npcPlayerPanel.classList.contains("hidden")) {
      applyNpcFilters();
    }
  });
}
document.addEventListener("click", (e) => {
    if (
      !npcPlayerPanel.contains(e.target) &&
      !npcPlayerBtn.contains(e.target)
    ) {
      npcPlayerPanel.classList.add("hidden");
      npcSheet.classList.add("hidden");
    }
  });

if (npcMasterBtn) {
  npcMasterBtn.addEventListener("click", () => {
    if (!requireMaster("controlar NPCs")) return;
    if (npcMasterPanel) npcMasterPanel.classList.toggle("hidden");
  });
}

const npcDataMap = {
  elsyra: {
    name: "Capitã Elsyra",
    age: 42,
    image: "assets/persons/Elsyra.png",
    backstory: "Capitã da guarda imperial, lidera pelo o que considera correto.",
    personality: "Firme, estratégica e desconfiada."
  },
  barok: {
    name: "General Barok",
    age: 55,
    image: "assets/persons/Barok.png",
    backstory: "Um general veterano com uma reputação de ser implacável.",
    personality: "Disciplinado, leal e determinado."
  },
  varok: {
    name: "General Varok",
    age: 58,
    image: "assets/persons/Varok.png",
    backstory: "General do exército imperial, conhecido por sua crueldade e eficiência em batalha. Traiu Stilgard e seu irmão Barok em batalha, fingindo estar lutando contra os Rebeldes, quando na verdade tentou usufruir dos poderes de Maelira para si mesmo. Ele é um estrategista frio e calculista, disposto a fazer qualquer coisa para alcançar seus objetivos, mesmo que isso signifique trair seus aliados ou cometer atos cruéis.",
    personality: "Rigoroso, cruel e estratégico."
  },
  ysvelle: {
    name: "Magistrada Ysvelle",
    age: 38,
    image: "assets/persons/Ysvelle.png",
    backstory: "Uma magistrada de renome, conhecida por sua justiça e sabedoria.",
    personality: "Inteligente, calma e determinada."
  },
  valeric: {
    name: "Rei Valeric Kaer",
    age: 64,
    image: "assets/persons/Valeric.png",
    backstory: "Rei de Solarys, governa com justiça e sabedoria.",
    personality: "Sábio, justo e protetor."
  },
  stilgard2: {
    name: "Inquisidor Stilgard II",
    age: 61,
    image: "assets/persons/Stilgard II.png",
    backstory: "Inquisidor e pai, conhecido por sua disciplina rígida e lealdade.",
    personality: "Leal, disciplinado e protetor."
  },
  malrek: {
    name: "Inquisidor Malrek",
    age: 59,
    image: "assets/persons/Malrek.png",
    backstory: "Inquisidor brutal, conhecido por quebrar regras.",
    personality: "Implacável, cruel e obstinado."
  },
  luthiel: {
    name: "Oráculo Luthiel",
    age: 32,
    image: "assets/persons/Luthiel.png",
    backstory: "Uma oráculo misterioso com conhecimento de profundos segredos.",
    personality: "Sagaz, introspectiva e enigmática."
  },
  lyss: {
    name: "Lyss",
    age: 27,
    image: "assets/persons/Lyss.png",
    backstory: "Cresceu em clubes, aprendeu a sobreviver lendo pessoas e explorando fraquezas. Conheceu Eddie em uma noite turbulenta em um dos Clubes.",
    personality: "Ácida, observadora e inteligente."
  },
  jax: {
    name: "Jax",
    age: 28,
    image: "assets/persons/Jax.png",
    backstory: "Viciado em jogos e golpes, conheceu Eddie após uma trapaça dar errado e a música dele salvar sua pele. Desde então, vive entre dívidas, apostas e favores mal pagos.",
    personality: "Arrogante, trapaceiro, carismático e impulsivo."
  },
    serenna: {
    name: "Serenna",
    age: 0,
    image: "assets/persons/Serenna.png",
    backstory: "Althéa (78), Maelis (29), Liora(09) Serrena. As três integrantes da família Serenna e que cuidam da Fazenda Serenna.",
    personality: "Tranquilas, acolhedoras e protetoras."
  },
    korv: {
    name: "Korv",
    age: 76,
    image: "assets/persons/Korv.png",
    backstory: "Korv é um Minotauro bêbado que costuma arrumar confusões, criou desavenças com Jax e Eddie por causa de Poker e roubos.",
    personality: "escandaloso, problemático e imprevisível."
  },
    sevrina: {
    name: "Sevrina",
    age: 122,
    image: "assets/persons/Sevrina.png",
    backstory: "Sevrina é uma bruxa antiga que vivia na parte inferior do vilarejo elaris, criando um local para os refugiados do império. Ela é conhecida por ser uma curandeira poderosa e por ter um passado misterioso, com rumores de que ela já foi uma nobre caída em desgraça.",
    personality: "Tranquila, poderosa e enigmática."
  },
    lyrenne: {
    name: "Lyrenne",
    age: 42,
    image: "assets/persons/Lyrenne.png",
    backstory: "Lyrenne é uma Nefária que vive isolada nas Ruínas de Orphelia, conhecida por sua doença misteriosa, foi acolhida por Sevrina décadas atrás, mas preferiu se manter nas Ruínas de Orphelia, ficou presa lá após o ataque do Portador da Cinza.",
    personality: "Poderosa, errática e solitária."
  },
  horin: {
    name: "Horin",
    age: 56,
    image: "assets/persons/Horin.png",
    backstory: "Horin é um velho lenhador que vive em Zhalem, requisitou ajuda pelo desaparecimento de seu ajudante próximo ao Caminho de Loren.",
    personality: "Tranquilo, gentil e protetor."
  },
  rebeldes: {
    name: "Rebeldes de Metal",
    age: 0,
    image: "assets/persons/Rebeldes.png",
    backstory: "Um grupo de rebeldes que se opõem ao Império e lutam por liberdade. Eles são liderados por Maelira e são conhecidos por sua habilidade em combate e por sua determinação em lutar contra a opressão do Império. Suas principais armas são metálicas, e claro, os grandes Dragões Metálicos controlados por Maelira.",
    personality: "Desafiador, determinado e rebelde."
  },
  maelira: {
    name: "Maelira",
    age: 32,
    image: "assets/persons/Maelira.png",
    backstory: "Maelira é uma Dominante que comanda os Rebeldes de Metal, um grupo de insurgentes que se opõem ao Império. Ela é conhecida por sua habilidade em combate e por sua determinação em lutar pela liberdade de seu povo. Descobriu seu poder dominante em uma situação de perigo, quando conseguiu controlar um grupo de inimigos para escapar de uma emboscada. Desde então, ela tem usado suas habilidades para liderar os Rebeldes de Metal em sua luta contra o Império.",
    personality: "Séria, determinada e líder nata."
  },
  eccho: {
    name: "Eccho",
    age: 34,
    image: "assets/persons/Eccho.png",
    backstory: "Eccho é um Dominante, pouco se sabe a respeito dele. Mas ele diz saber muito a respeito de Eddie e Orion. Além de já ter interferido na ordem natural das coisas. Agora, é difícil dizer de onde ele vem, ou quem ele é, mas ele tem um grande interesse em tornar a vida de todos de Solarys um inferno.",
    personality: "Caótico, misterioso e manipulador."
  },
    filhosdomusgo: {
    name: "Filhos do Musgo",
    age: 0,
    image: "assets/persons/Filhos do Musgo.png",
    backstory: "Um grupo de criaturas misteriosas que vivem nos bosques do Caminho de Loren. Pouco se sabe sobre eles, mas são conhecidos por serem silenciosos e perigosos, atacando qualquer um que se aproxime de seu território. Dizem que eles têm uma conexão com a natureza e podem controlar plantas e animais para proteger seu lar.",
    personality: "Misteriosos, silenciosos e protetores da natureza."
  },
    cervodeloren: {
    name: "Cervo de Loren",
    age: 0,
    image: "assets/persons/Cervo de Loren.png",
    backstory: "Um Cervo misterioso que vive nos bosques do Caminho de Loren. Ele é conhecido por sua beleza e graça, mas também por sua habilidade em se esconder entre as árvores. Dizem que ele é um guardião da floresta e protege os animais selvagens que vivem lá. Quem cruza seu caminho pode sentir uma sensação de paz e tranquilidade, mas também pode ser atacado se for considerado uma ameaça para a floresta.",
    personality: "Mágico, protetor e evasivo."
  },
    apodrecida: {
    name: "Grande Madeira Apodrecida",
    age: 236,
    image: "assets/persons/Apodrecida.png",
    backstory: "Uma árvore gigante que vive nos bosques do Caminho de Loren. Ela é conhecida por sua imensa presença e por sua madeira apodrecida, que é usada por alguns para criar ferramentas e armas. Dizem que ela é um guardião da floresta e protege os animais selvagens que vivem lá. A grande mão que sai do meio dela simboliza a proteção que ela oferece, mas também pode ser um aviso para aqueles que se aproximam demais.",
    personality: "Grande, protetora e imponente."
  },
    omimico: {
    name: "O Mimico",
    age: 0,
    image: "assets/persons/Mimico.png",
    backstory: "Um ser misterioso que aparece em momentos de tensão e desespero. Ele é conhecido por sua habilidade de se transformar e se esconder entre as sombras. Dizem que ele é um guardião do caos, abrir sua caixa ou o que quer que ele seja pode causar um grande estrago, mas também pode trazer uma grande ajuda.",
    personality: "Polimorfo, imprevisível e caótico."
  },
    kael: {
    name: "Cavaleiro Kael",
    age: 126,
    image: "assets/persons/Kael.png",
    backstory: "Cavaleiro Kael, O Portador da Cinza, foi um grande Cavaleiro Imperial que se destacou em inúmeras batalhas. No entanto, durante uma missão, ele foi gravemente ferido e acabou sendo infectado por uma doença misteriosa que o transformou em um ser cinzento e sem emoções. Ele então se isolou em uma caverna que acreditava ser inabitada, mas que na verdade era o lar de inúmeras criaturas e pessoas. Ele tentou conter a doença, mas era tarde.",
    personality: "Corajoso, determinado e líder nato."
  },
    siegmar: {
    name: "Siegmar of Catarina",
    age: 45,
    image: "assets/persons/Siegmar.png",
    backstory: "Siegmar of Catarina é um Cavaleiro que se destacou em batalhas contra os rebeldes de Catarina. Ele é conhecido por sua lealdade ao povo de Catarina e por sua habilidade em combate. Siegmar é um defensor da ordem e da justiça, lutando para proteger os inocentes e combater o opressor. Ele é um líder natural, inspirando os outros com sua coragem e determinação.",
    personality: "Corajoso, determinado e líder nato."
  },
    basili: {
    name: "Basili",
    age: 32,
    image: "assets/persons/Basili.png",
    backstory: "Basili é um Cartógrafo de Zhalem, conhecido por sua habilidade em criar mapas detalhados e precisos. Ele é um explorador nato, sempre em busca de novas terras para mapear e descobrir. Basili é um aventureiro corajoso, enfrentando perigos e desafios para alcançar seus objetivos.",
    personality: "Explorador, corajoso e curioso."
  },
    sarin: {
    name: "Sarin",
    age: 28,
    image: "assets/persons/Sarin.png",
    backstory: "Sarin é o líder de Doran, uma cidade que fica entre Zhalem e Pedrafria. Ele é conhecido em Doran por seu carisma e hospitalidade, mas também por sua habilidade em resolver conflitos e manter a paz na cidade. Sarin é um líder sábio e justo, sempre buscando o melhor para seu povo.",
    personality: "Líder, carismático e justo."
  },
    kaelen: {
    name: "Kaelen",
    age: 24,
    image: "assets/persons/Kaelen.png",
    backstory: "Kaelen é uma jovem filha de Kyra, uma herbalista que foi muito respeitada. Eventualmente, durante os invernos de Pedrafria, Kyra adoeceu, começando com tremores, depois manchas e por fim raízes. Kaelen tinha apenas 14 anos quando sua mãe morreu. Ela enterrou toda a fé e anos depois, se sentiu como a protetora de Nyssa, sua irmã mais nova.",
    personality: "Estressada, protetora e determinada."
  },
    nyssa: {
    name: "Nyssa",
    age: 18,
    image: "assets/persons/Nyssa.png",
    backstory: "Nyssa é a irmã mais nova de Kaelen. Ela é uma jovem que cresceu em meio à tristeza e ao desespero de sua irmã mais velha. Nyssa é gentil, mas também corajosa, e sempre se esforça para manter a esperança viva em meio às dificuldades. Acabou por perder sua mãe quando tinha apenas 8 anos de idade, sem entender muito como aconteceu, até que a doença de sua mãe se manisfetou nela.",
    personality: "Gentil, corajosa e esperançosa."
  },
  
};

function applyNpcFilters() {
  npcItems.forEach(item => {
    const type = item.dataset.type;
    const category = item.dataset.category;

    // Primeiro filtra por modo
    if (type !== currentMode) {
      item.classList.add("hidden");
      return;
    }

    // Se for NPC, filtra categoria
    if (currentMode === "npc") {
      if (category !== currentCategory) {
        item.classList.add("hidden");
        return;
      }
    }

    // Se passou por tudo
    item.classList.remove("hidden");
  });

  // Mostrar ou esconder filtros de categoria
  const filterContainer = npcPlayerPanel.querySelector(".npc-category-filters");
  if (filterContainer) {
    filterContainer.style.display = currentMode === "npc" ? "flex" : "none";
  }
}

/* =========================
   EVENTO: MODO NPC / BESTIÁRIO
========================= */

modeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    modeButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    currentMode = btn.dataset.mode;

    applyNpcFilters();
  });
});

/* =========================
   EVENTO: FILTRO DE CATEGORIA
========================= */

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    currentCategory = btn.dataset.category;

    applyNpcFilters();
  });
});

npcPlayerPanel.addEventListener("click", (e) => {
  const item = e.target.closest(".npc-item");
  if (!item) return;

  // Se estiver bloqueado, não faz nada
  if (item.classList.contains("locked")) return;

  const npcId = item.dataset.npc;
  const npc = npcDataMap[npcId];
  if (!npc) return;

  // 🔥 SE CLICAR NO MESMO NPC → FECHA
  if (currentOpenNpcId === npcId) {
    npcSheet.classList.add("hidden");
    currentOpenNpcId = null;
    return;
  }

  // Caso contrário, abre normalmente
  currentOpenNpcId = npcId;

  document.querySelector(".npc-sheet-name").innerText = npc.name;

  document.querySelector(".npc-sheet-content").innerHTML = `
    <div class="npc-sheet-layout">
      <div class="npc-portrait">
        <img src="${npc.image}" alt="${npc.name}">
      </div>
      <div class="npc-text">
        <p class="npc-meta"><strong>Idade:</strong> ${npc.age}</p>
        <p><strong>Backstory:</strong> ${npc.backstory}</p>
        <p><strong>Personalidade:</strong> ${npc.personality}</p>
      </div>
    </div>
  `;

  npcSheet.classList.remove("hidden");
});


npcsRef.on("value", (snapshot) => {
  const data = snapshot.val();
  if (!data) return;

  Object.entries(data).forEach(([npcId, npcData]) => {
    const unlocked = npcData.unlocked === true;

    /* ===== MESTRE ===== */
    const masterItem = document.querySelector(
      `#npc-master-panel .npc-item[data-npc="${npcId}"]`
    );

    if (masterItem) {
      masterItem.classList.toggle("locked", !unlocked);
      masterItem.classList.toggle("unlocked", unlocked);

      const btn = masterItem.querySelector(".npc-toggle");
      if (btn) {
        btn.className = `npc-toggle ${unlocked ? "unlock" : "lock"}`;
        btn.innerText = unlocked ? "Desbloqueado" : "Bloqueado";
      }
    }

    /* ===== PLAYER ===== */
    const playerItem = document.querySelector(
      `#npc-player-panel .npc-item[data-npc="${npcId}"]`
    );

if (playerItem) {
  playerItem.classList.toggle("locked", !unlocked);
  playerItem.classList.toggle("unlocked", unlocked);

  if (!unlocked) {
    playerItem.classList.add("hidden");
  } else {
    applyNpcFilters();
  }
}
  });
});