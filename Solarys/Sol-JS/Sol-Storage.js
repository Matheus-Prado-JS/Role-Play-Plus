// =========================
// 🎒 STORAGE SYSTEM
// =========================

const storageButtons = document.querySelectorAll(".storage-list button");
const storageTabs = document.querySelectorAll(".storage-tab");

// 🔁 TROCAR ABAS
storageButtons.forEach(btn => {
  btn.addEventListener("click", () => {

    storageButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    storageTabs.forEach(tab => tab.classList.remove("active"));

    const tabName = btn.dataset.tab;
    document.getElementById(tabName + "-tab").classList.add("active");
  });
});


// =========================
// 🗡️ SISTEMA DE ARMAS
// =========================

const weaponsGrid = document.getElementById("weapons-grid");

// 🔥 LISTA DE ARMAS (EDITÁVEL)
const weaponsData = [
{
    name: "Espada de Heliovar",
    img: "Espada de Heliovar.png",
    type: "Espadas",
    unlocked: false,
    hasEffect: true,
      skill: {
    name: "Aurora Invicta",
    desc: "Uma vez por combate. A Espada de Heliovar pode liberar energia solar em múltiplos impactos. Antes de todo golpe do primeiro turno gire 1D10, qualquer valor acima de 5 ativa a habilidade. Ataques causam +2D8 de Dano Radiante. Dura por 3 rodadas. Inimigos adjacentes recebem o 2D8 de dano, mesmo não sendo o alvo."
                },
    upgrades: [
      { level: 0, stats: "2D6", cost: "1 Lasca de Pedra" },
      { level: 1, stats: "+2 Dano", cost: "2 Lasca de Pedra" },
      { level: 2, stats: "+4 Dano", cost: "3 Lasca de Pedra" },
      { level: 3, stats: "+6 Dano", cost: "4 Lasca de Pedra" },
      { level: 4, stats: "+8 Dano", cost: "5 Lasca de Pedra" },
      { level: 5, stats: "+10 Dano & Skill", cost: "1 Pedra Cintilante" },
      { level: 6, stats: "+12 Dano & Skill", cost: "1 Pedra Magma" },
    ]
  },
{
    name: "Escudo Vespera",
    img: "Escudo Vespera.png",
    type: "Escudos",
    unlocked: false,
    hasEffect: false,
    upgrades: [
      { level: 0, stats: "+2 Defesa Física", cost: "1 Lasca de Pedra" },
      { level: 1, stats: "+3 Defesa Física", cost: "2 Lasca de Pedra" },
      { level: 2, stats: "+4 Defesa Física", cost: "3 Lasca de Pedra" },
      { level: 3, stats: "+5 Defesa Física", cost: "4 Lasca de Pedra" },
      { level: 4, stats: "+6 Defesa Física", cost: "5 Lasca de Pedra" },
      { level: 5, stats: "+7 Defesa Física", cost: "1 Pedra Cintilante" },
      { level: 6, stats: "+8 Defesa Física", cost: "1 Pedra Magma" },
    ]
  },
{
    name: "Espada Longa",
    img: "Espada Longa.png",
    type: "Espadas",
    unlocked: false,
    hasEffect: false,
    upgrades: [
      { level: 0, stats: "1D8", cost: "1 Sucata" },
      { level: 1, stats: "+1 Dano", cost: "1 Sucata" },
      { level: 2, stats: "+2 Dano", cost: "2 Sucata" },
      { level: 3, stats: "+3 Dano", cost: "2 Sucata" },
      { level: 4, stats: "+4 Dano", cost: "3 Sucata" },
      { level: 5, stats: "+5 Dano", cost: "1 Metal" },
    ]
  },
{
    name: "Katana de Aço",
    img: "Katana de Aço.png",
    type: "Katanas",
    unlocked: false,
    hasEffect: false,
    upgrades: [
      { level: 0, stats: "1D8", cost: "1 Sucata" },
      { level: 1, stats: "+1 Dano", cost: "1 Sucata" },
      { level: 2, stats: "+2 Dano & Bleed", cost: "2 Sucata" },
      { level: 3, stats: "+3 Dano & Bleed", cost: "2 Sucata" },
      { level: 4, stats: "+4 Dano & Bleed", cost: "3 Sucata" },
      { level: 5, stats: "+5 Dano & Bleed", cost: "1 Metal" },
    ]
  },
{
    name: "Lâmina de Orphelia",
    img: "Lâmina de Orphelia.png",
    type: "Katanas",
    unlocked: false,
    hasEffect: true,
        skill: {
    name: "Dança Carmesim de Orphelia",
    desc: "Uma vez por combate, a Lâmina de Orphelia desperta sua verdadeira natureza, envolvendo seus golpes em uma sequência fluida e letal. Ao ativar a habilidade, durante 3 rodadas, todos os ataques bem-sucedidos aplicam +20 de Bleed e +15 de Miasma adicional. Caso o alvo já esteja com Bleed ativo, os cortes se intensificam, causando dano extra equivalente a +1D10 por ataque. Se o alvo atingir o limite de Miasma durante esse período, o efeito é desencadeado imediatamente com +5% de dano adicional por rodada. A partir do nível 6, o bônus de Miasma aumenta para +20 e a duração passa para 4 rodadas."
            },
    upgrades: [
      { level: 0, stats: "2D8", cost: "1 Lasca de Pedra" },
      { level: 1, stats: "+2 Dano", cost: "2 Lasca de Pedra" },
      { level: 2, stats: "+3 Dano & Bleed", cost: "3 Lasca de Pedra" },
      { level: 3, stats: "+6 Dano & Bleed", cost: "4 Lasca de Pedra" },
      { level: 4, stats: "+9 Dano & Bleed", cost: "5 Lasca de Pedra" },
      { level: 5, stats: "+10 Dano & Skill", cost: "1 Pedra Cintilante" },
      { level: 6, stats: "+13 Dano & Skill", cost: "1 Pedra Magma" },
    ]
  },
{
    name: "Machado de Batalha",
    img: "Machado de Batalha.png",
    type: "Machados",
    unlocked: false,
    hasEffect: false,
    upgrades: [
      { level: 0, stats: "1D8", cost: "1 Sucata" },
      { level: 1, stats: "+1 Dano", cost: "1 Sucata" },
      { level: 2, stats: "+2 Dano", cost: "2 Sucata" },
      { level: 3, stats: "+3 Dano", cost: "2 Sucata" },
      { level: 4, stats: "2D8 +4 Dano", cost: "3 Sucata" },
      { level: 5, stats: "3D8 +5 Dano", cost: "1 Metal" },
    ]
  },
{
    name: "Martelo de Guerra",
    img: "Martelo de Guerra.png",
    type: "Martelos",
    unlocked: false,
    hasEffect: false,
    upgrades: [
      { level: 0, stats: "2D4", cost: "1 Sucata" },
      { level: 1, stats: "+1 Dano", cost: "1 Sucata" },
      { level: 2, stats: "+2 Dano", cost: "2 Sucata" },
      { level: 3, stats: "3D4 +3 Dano & Impact", cost: "2 Sucata" },
      { level: 4, stats: "3D4 +4 Dano & Impact", cost: "3 Sucata" },
      { level: 5, stats: "4D4 +5 Dano & Impact", cost: "1 Metal" },
    ]
  },
{
    name: "Lança de Sarin",
    img: "Lança de Sarin.png",
    type: "Lanças",
    unlocked: false,
    hasEffect: false,
    upgrades: [
      { level: 0, stats: "1D6", cost: "1 Sucata" },
      { level: 1, stats: "+2 Dano", cost: "1 Sucata" },
      { level: 2, stats: "+3 Dano", cost: "2 Sucata" },
      { level: 3, stats: "+4 Dano & Pierce", cost: "2 Sucata" },
      { level: 4, stats: "+4 Dano & Pierce", cost: "3 Sucata" },
      { level: 5, stats: "2D6 +5 Dano & Pierce", cost: "1 Metal" },
    ]
  },
{
    name: "Escudo do Lobo",
    img: "Escudo do Lobo.png",
    type: "Escudos",
    unlocked: false,
    hasEffect: false,
    upgrades: [
      { level: 0, stats: "+1 Defesa Física", cost: "1 Sucata" },
      { level: 1, stats: "+2 Defesa Física", cost: "1 Sucata" },
      { level: 2, stats: "+3 Defesa Física", cost: "2 Sucata" },
      { level: 3, stats: "+4 Defesa Física", cost: "2 Sucata" },
      { level: 4, stats: "+5 Defesa Física", cost: "3 Sucata" },
      { level: 5, stats: "+6 Defesa Física", cost: "1 Metal" },
    ]
  },
{
    name: "Escudo do Brasão do Lobo",
    img: "Escudo do Brasão do Lobo.png",
    type: "Escudos",
    unlocked: false,
    hasEffect: false,
    upgrades: [
      { level: 0, stats: "+1 Defesa Física", cost: "1 Sucata" },
      { level: 1, stats: "+2 Defesa Física", cost: "1 Sucata" },
      { level: 2, stats: "+3 Defesa Física", cost: "2 Sucata" },
      { level: 3, stats: "+4 Defesa Física & Action", cost: "2 Sucata" },
      { level: 4, stats: "+5 Defesa Física & Action", cost: "3 Sucata" },
      { level: 5, stats: "+7 Defesa Física & Action", cost: "1 Metal" },
    ]
  },
];


// 🎨 RENDERIZAR ARMAS
function renderWeapons() {
  weaponsGrid.innerHTML = "";

  weaponsData.forEach(weapon => {

    const slot = document.createElement("div");
    slot.classList.add("weapon-slot");

    // 🔒 anti-spoiler
    if (!weapon.unlocked) {
      slot.classList.add("locked");
    }

    const img = document.createElement("img");

    if (weapon.unlocked) {
      img.src = "Sol-Assets/Weapons/" + weapon.img;
    } else {
      img.src = "Sol-Assets/Weapons/Block.png"; // 🔥 imagem genérica
    }

    slot.appendChild(img);

    // 👁️ VISUALIZAR (não desbloqueia)
    slot.addEventListener("click", () => {
      if (!weapon.unlocked) return;

      openWeaponPreview(weapon);
    });

    weaponsGrid.appendChild(slot);
  });
}
// 🎨 PREVIEW DAS ARMAS
function openWeaponPreview(weapon) {

  const preview = document.createElement("div");
  preview.classList.add("weapon-preview");

  preview.innerHTML = `
    <div class="preview-box">
      <img src="Sol-Assets/Weapons/${weapon.img}">
    </div>
  `;

  preview.addEventListener("click", () => {
    preview.remove();
  });

  document.body.appendChild(preview);
}

// =========================
// 🗡️ CONTROLE DAS ARMAS E RECURSOS
// =========================

const controlTab = document.getElementById("control-tab");

const categories = [
  "Espadas",
  "Katanas",
  "Adagas",
  "Machados",
  "Martelos",
  "Lanças",
  "Escudos",
  "Recursos"
];

function renderControl() {
  controlTab.innerHTML = "";

  categories.forEach(cat => {

    const column = document.createElement("div");
    column.classList.add("control-column");

    const title = document.createElement("h4");
    title.textContent = cat;

    column.appendChild(title);

        let list = [];

        if (cat === "Recursos") {
        list = resourcesData;
        } else {
        list = weaponsData.filter(w => w.type === cat);
        }
        
        list.forEach(itemData => {

        const item = document.createElement("div");
        item.classList.add("control-item");

        item.innerHTML = `
            <span>${itemData.name}</span>
            <div class="status-dot ${itemData.unlocked ? "on" : ""}"></div>
        `;

        item.addEventListener("click", () => {
            itemData.unlocked = !itemData.unlocked;

            renderControl();
            renderWeapons();
            renderUpgrades();
            renderResources(); // 👈 IMPORTANTE
        });

        column.appendChild(item);
        });

    controlTab.appendChild(column);
  });
}

// =========================
// 🗡️ RENDER UPGRADES
// =========================

const upgradesTab = document.getElementById("upgrades-tab");

function renderUpgrades() {
  upgradesTab.innerHTML = "";

  const categories = [
    "Espadas",
    "Katanas",
    "Adagas",
    "Machados",
    "Martelos",
    "Lanças",
    "Escudos"
  ];

  categories.forEach(cat => {

    const column = document.createElement("div");
    column.classList.add("control-column");

    const title = document.createElement("h4");
    title.textContent = cat;

    column.appendChild(title);

    weaponsData
      .filter(w => w.type === cat)
      .forEach(weapon => {

        // 🔒 anti-spoiler
        if (!weapon.unlocked) return;

        const item = document.createElement("div");
        item.classList.add("upgrade-item");

        item.textContent = weapon.name;

        item.addEventListener("click", () => {
          openUpgradeMenu(weapon);
        });

        column.appendChild(item);
      });

    upgradesTab.appendChild(column);
  });
}

function openUpgradeMenu(weapon) {

  const menu = document.createElement("div");
  menu.classList.add("upgrade-menu");

  let showingSkill = false;

  function renderContent() {

    // 🔹 TABELA
    let rows = weapon.upgrades.map(up => `
      <div class="upgrade-row">
        <span>${up.level}</span>
        <span class="upgrade-stats">${up.stats}</span>
        <span>${up.cost}</span>
      </div>
    `).join("");

    let effect = weapon.hasEffect
      ? `<div class="upgrade-effect">✨ Possui efeito especial</div>`
      : "";

    // 🔹 CONTEÚDO NORMAL (UPGRADES)
    let upgradesHTML = `
      <h3>${weapon.name}</h3>
      ${effect}

      <div class="upgrade-header">
        <span>Nível</span>
        <span>Status</span>
        <span>Custo</span>
      </div>

      ${rows}
    `;

    // 🔹 CONTEÚDO SKILL
    let skillHTML = weapon.skill ? `
      <h3>${weapon.skill.name}</h3>
      <div class="upgrade-effect">
        ${weapon.skill.desc}
      </div>
    ` : "";

    // 🔹 BOTÃO SÓ SE TEM EFEITO
    let skillButton = weapon.hasEffect ? `
      <div class="skill-toggle">S</div>
    ` : "";

    menu.innerHTML = `
      <div class="upgrade-box" style="position: relative;">
        ${skillButton}
        ${showingSkill ? skillHTML : upgradesHTML}
      </div>
    `;

    // 🔥 EVENTO DO BOTÃO
    if (weapon.hasEffect) {
      const btn = menu.querySelector(".skill-toggle");

      btn.addEventListener("click", (e) => {
        e.stopPropagation(); // 🔥 NÃO fecha o menu
        showingSkill = !showingSkill;
        renderContent(); // 🔁 troca conteúdo
      });
    }
  }

  renderContent();

  // fechar clicando fora
  menu.addEventListener("click", () => menu.remove());

  document.body.appendChild(menu);
}

// =========================
// 🗡️ RENDER RECURSOS
// =========================

const resourcesTab = document.getElementById("resources-tab");

function renderResources() {
  resourcesTab.innerHTML = "";

  resourcesData.forEach(res => {

    if (!res.unlocked) return;

    const item = document.createElement("div");
    item.classList.add("resource-item");

    item.innerHTML = `
      <img src="Sol-Assets/Resources/${res.img}">
      <div class="resource-info">
        <h4>${res.name}</h4>
        <p>${res.desc}</p>
      </div>
    `;

    resourcesTab.appendChild(item);
  });
}

const resourcesData = [
  {
    name: "Sucata",
    img: "Sucata.png",
    unlocked: false,
    desc: "Materiais comuns usados para upgrades básicos."
  },
  {
    name: "Metal",
    img: "Metal.png",
    unlocked: false,
    desc: "Material refinado usado em melhorias avançadas."
  },
  {
    name: "Lasca de Pedra",
    img: "Lasca de Pedra.png",
    unlocked: false,
    desc: "Fragmentos minerais usados em armas especiais."
  },
  {
    name: "Placa de Pedra",
    img: "Placa de Pedra.png",
    unlocked: false,
    desc: "Versão sólida e resistente para upgrades superiores."
  },
  {
    name: "Pedra Cintilante",
    img: "Pedra Cintilante.png",
    unlocked: false,
    desc: "Carrega energia mágica intensa."
  },
  {
    name: "Pedra Magma",
    img: "Pedra Magma.png",
    unlocked: false,
    desc: "Material raro com energia vulcânica extrema."
  }
];

// =========================
// 🗡️ RENDER EFEITOS
// =========================

const effectsData = [
  // 🔥 RUPTURA
  {
    name: "Bleed",
    img: "Bleed.png",
    desc: "O alvo é atingido por ataques sucessivos que acumulam sangramento ao longo do combate baseado no dano da arma. Cada golpe contribui para o aumento dessa pressão, especialmente quando executados de forma rápida e precisa. Ao chegar ao limite, o sangramento é desencadeado, causando o dobro do dano atual da arma, infligindo dano massivo no alvo. Após a ativação, o acúmulo é reiniciado.",
    category: "Ruptura"
  },
  {
    name: "Poison",
    img: "Poison.png",
    desc: "O alvo é afetado por ataques que acumulam veneno ao longo do combate, com base no dano da arma ou habilidade utilizada. Cada aplicação contribui para o envenenamento progressivo, tornando o efeito mais consistente em confrontos prolongados. Ao atingir o limite, o veneno é ativado, causando dano contínuo equivalente a 5% da vida máxima do alvo por turno durante 3 rodadas. Após esse período, o efeito se encerra e o acúmulo é reiniciado.",
    category: "Ruptura"
  },
  {
    name: "Miasma",
    img: "Miasma.png",
    desc: "O alvo é consumido por uma doença desconhecida que se acumula a cada ataque ou habilidade afetada pelo Miasma, com base no dano causado. Diferente de outros efeitos, seu acúmulo representa a progressão de uma infecção latente presente em todos os seres. Ao atingir o limite, o Miasma é desencadeado, abrindo cortes violentos no corpo do alvo que causam dano contínuo equivalente a 10% da vida máxima por turno durante 3 rodadas, além de reduzir qualquer cura recebida pela metade nesse período. Após a ativação, o acúmulo é reiniciado.",
    category: "Ruptura"
  },
  {
    name: "Frostbite",
    img: "Frostbite.png",
    desc: "O alvo é afetado por ataques que acumulam gelo em seu corpo, reduzindo gradualmente sua mobilidade e resistência com base no dano da arma ou habilidade utilizada. Cada aplicação intensifica o resfriamento, tornando o alvo mais vulnerável ao longo do combate. Ao atingir o limite, o congelamento é desencadeado, causando dano imediato equivalente a 15% da vida máxima do alvo e reduzindo sua Defesa Física e Mágica em 5 pontos durante 2 rodadas. Após a ativação, o acúmulo é reiniciado.",
    category: "Ruptura"
  },
  {
    name: "Burn",
    img: "Burn.png",
    desc: "O alvo é afetado por ataques que acumulam calor intenso, com base no dano da arma ou habilidade utilizada. Devido à sua natureza instável, o acúmulo de Burn ocorre de forma mais rápida, porém em menor escala. Ao atingir o limite, a queimadura é desencadeada, causando dano contínuo equivalente a 3% da vida máxima do alvo por turno durante 2 rodadas, podendo ser reaplicado facilmente em sequência. Após a ativação, o acúmulo é reiniciado.",
    category: "Ruptura"
  },
  {
    name: "Interruption",
    img: "Interruption.png",
    desc: "O alvo é afetado por ataques que acumulam instabilidade, com base no dano da arma ou habilidade utilizada. Cada aplicação aumenta a chance de quebrar o fluxo de ações do alvo, especialmente sob pressão contínua. Ao atingir o limite, a interrupção é desencadeada, cancelando a ação atual do alvo e fazendo com que ele perca 1 ação no próximo turno. Após a ativação, o acúmulo é reiniciado.",
    category: "Ruptura"
  },

  // ⚔️ TÁTICO
  {
    name: "Impact",
    img: "Impact.png",
    desc: "O alvo é atingido por golpes carregados de força bruta, capazes de abalar sua postura com base no dano da arma ou habilidade utilizada. Diferente de outros efeitos, Impact não se acumula. Ao atingir um valor elevado em um único golpe ou em sequências pesadas causando o dobro do dano anterior nos 2 golpes na sequência, o impacto é desencadeado, aplicando Break no alvo. Após isso, o estado é encerrado normalmente. ",
    category: "Tático"
  },
    {
    name: "Break",
    img: "Break.png",
    desc: "O alvo tem sua postura quebrada após sofrer um impacto significativo, perdendo completamente a capacidade de reagir momentaneamente. Durante esse estado, ele não pode realizar ações defensivas ou contra-ataques. O próximo ataque recebido durante Break é convertido em um Critical, Após sofrer esse ataque, o estado é encerrado imediatamente.",
    category: "Tático"
  },
    {
    name: "Critical",
    img: "Critical.png",
    desc: "O alvo sofre um ataque em estado de vulnerabilidade, geralmente após entrar em Break. Diferente de um crítico comum obtido por rolagem, o Critical é um efeito garantido ativado por condições específicas de combate. Ao ser aplicado, o ataque causa dano equivalente ao triplo do dano da arma, ignorando defesas do alvo. Após a execução, o efeito é consumido imediatamente.",
    category: "Tático"
  },
  {
    name: "Action",
    img: "Action.png",
    desc: "O alvo possui um potencial limitado de ações adicionais que podem ser utilizadas ao longo do combate. No início do confronto, é rolado 1D4 para determinar quantas ações extras estarão disponíveis. Essas ações podem ser utilizadas para realizar ataques, habilidades ou movimentações adicionais, porém não podem ser acumuladas em um único turno, sendo limitadas a uma ação extra por rodada, exceto caso o resultado da rolagem seja 1. Uma vez utilizadas, essas ações não são recuperadas durante o combate.",
    category: "Tático"
  },
];

const effectsTab = document.getElementById("effects-tab");

function renderEffects() {
  effectsTab.innerHTML = "";

  effectsData.forEach(effect => {

    const item = document.createElement("div");
    item.classList.add("effect-item");

    item.innerHTML = `
      <img src="Sol-Assets/Effects/${effect.img}">
      
      <div class="effect-info">
        <h4>${effect.name}</h4>
        <p>${effect.desc}</p>
        <div class="effect-category">${effect.category}</div>
      </div>
    `;

    effectsTab.appendChild(item);
  });
}

// 🚀 INICIAR
renderWeapons();
renderControl();
renderUpgrades();
renderResources();
renderEffects();
