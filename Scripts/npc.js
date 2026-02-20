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
const npcSheet = document.getElementById("npc-sheet");
if (npcPlayerBtn && npcPlayerPanel && npcSheet) {
  npcPlayerBtn.addEventListener("click", () => {
    npcPlayerPanel.classList.toggle("hidden");
    npcSheet.classList.add("hidden");
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
  }
};

npcPlayerPanel.addEventListener("click", (e) => {
    const item = e.target.closest(".npc-item");
    if (!item) return;

    const npcId = item.dataset.npc;
    const npc = npcDataMap[npcId];
    if (!npc) return;

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
      playerItem.style.display = unlocked ? "flex" : "none";
    }
  });
});