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
    backstory: "General firme e respeitado, conhecido por sua estratégia militar.",
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
    age: 0,
    image: "assets/persons/Korv.png",
    backstory: "Korv é um Minotauro bêbado que costuma arrumar confusões, criou desavenças com Jax e Eddie por causa de Poker e roubos.",
    personality: "escandaloso, problemático e imprevisível."
  },
    sevrina: {
    name: "Sevrina",
    age: 0,
    image: "assets/persons/Sevrina.png",
    backstory: "Sevrina é uma bruxa antiga que vivia na parte inferior do vilarejo elaris, criando um local para os refugiados do império. Ela é conhecida por ser uma curandeira poderosa e por ter um passado misterioso, com rumores de que ela já foi uma nobre caída em desgraça.",
    personality: "Tranquila, poderosa e enigmática."
  },
    lyrenne: {
    name: "Lyrenne",
    age: 0,
    image: "assets/persons/Lyrenne.png",
    backstory: "Lyrenne é uma Nefária que vive isolada nas Ruínas de Orphelia, conhecida por sua doença misteriosa, foi acolhida por Sevrina décadas atrás, mas preferiu se manter nas Ruínas de Orphelia, ficou presa lá após o ataque do Portador da Cinza.",
    personality: "Poderosa, errática e solitária."
  },
      horin: {
    name: "Horin",
    age: 0,
    image: "assets/persons/Horin.png",
    backstory: "Horin é um velho lenhador que vive em Zhalem, requisitou ajuda pelo desaparecimento de seu ajudante próximo ao Caminho de Loren.",
    personality: "Tranquilo, gentil e protetor."
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