const infoContent = document.getElementById("infoContent");
const tabs = document.querySelectorAll(".info-tab");
const helixModal = document.getElementById("helixModal");
const closeModal = document.getElementById("closeModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalType = document.getElementById("modalType");
const modalDesc = document.getElementById("modalDesc");

/* ========================= */
/* DADOS DAS REGIÕES */
/* ========================= */

const regioes = [
  {
    nome: "Rhodes Town",
    tipo: "Cidade",
    img: "imgs/regioes/rhodes-town.png",
    desc: "Situada entre o passado e o presente, Rhodes Town cresceu ao redor de sua arquitetura imponente e de seus becos charmosos, onde cada esquina guarda uma história. No coração da cidade está o lendário Bradley's Coffee, ponto de encontro obrigatório para qualquer morador e visitante. Com seu letreito iluminado e aroma constante de café recém-passado. A poucos quarteirões dali, o sofisticado Bar Aurora colore as noites com jazz ao vivo e coquetéis autorais, enquanto o tradicional Mercado Saint Rowan mantém viva a essência comunitária com produtos artenasais, flores frescas e padarias familiares. Já o moderno Cine Atlas mistura tecnologia de ponta com charme retrô, tornando cada estreia um pequeno evento da cidade. Mas Rhodes Town não vive apenas de seus estabelecimentos icônicos. Morar ali é ter o privilégio de caminhar sob luzes quentes em noites chuvosas, conhecer o dono do café pelo nome e sentir que, apesar do ritmo urbano, existe uma conexão real entre as pessoas. É uma cidade grande o suficiente para oferecer oportunidades e pequena o suficiente para que se sinta em casa. "
  },
  {
    nome: "Distrito Blackridge",
    tipo: "Distrito",
    img: "imgs/regioes/blackridge.png",
    desc: "Durante décadas, Blackridge ganhou notoriedade por crimes hediondos que marcaram profundamente a cidade. Becos escuros, prédios abandonados e ruas silenciosas alimentam manchetes e lendas urbanas. Histórias de desaparecimentos, organizações clandestinas e noites que nunca terminavam criaram uma reputação que atrevessou gerações. Mas Rhodes Town não virou o rosto para Blackridge. Como uma resposta direta à toda violência que um dia dominou esse distrito, foram erguidos grandes centros estratégicos para transformar medo em vigilância. O imponente prédio da DPRT tornou-se símbolo dessa nova era, suas luzes permanecem acesas 24 horas por dia. Ao lado, o Hospital Mercy Vale garante atendimento imediato a qualquer emergência, funcionando como um pilar. O Complexo Saint Alder, com sua arquitetura moderna e multifuncional, trouxe moradia, comércio e espaços culturais, devolvendo movimento às ruas antes desertas. E o Terminal de Metrô Greyford, conectou Blackbridge ao restante da cidade, eliminando o isolamento que por anos contribuiu para sua decadência. "
  },
  {
    nome: "Delegacia de Polícia de Rhodes Town",
    tipo: "Delegacia",
    img: "imgs/regioes/dprt.png",
    desc: "Localizada estrategicamente em Blackridge, a delegacia foi projetada para ser uma resposta direta aos tempos mais sombrios do distrito. Sua arquitetura mistura o clássico e o moderno: fachada neoclássica que impõe respeito, tecnologia de ponta por trás das paredes e uma movimentação constante que nunca desacelera. Viaturas entram e saem sob a chuva frequente de Rhodes Town, refletindo no asfalto molhado. Lá dentro, corredores amplos conduzem a salas de investigação, centrais de monitoramento e unidades especializadas que atuam em casos de alta complexidade. A delegacia abriga divisões como Crimes Violentos, Pessoas Desaparecidas e Inteligência Urbana, setores que nasceram da necessidade de enfrentar os desafios que um dia assombraram Blackridge. "
  },
  {
    nome: "Hospital Mercy Vale",
    tipo: "Hospital",
    img: "imgs/regioes/mercy-vale.png",
    desc: "Unidade médica que esteve na linha de frente do incidente."
  },
{
    nome: "Sistema Subterrâneo Blackflow",
    tipo: "Sistema de Esgotos",
    img: "imgs/regioes/esgotos.png",
    desc: "Rede subterrânea antiga e parcialmente inacessível."
  },
{
    nome: "Complexo Saint Alder",
    tipo: "Complexo Corporativo",
    img: "imgs/regioes/saint-alder.png",
    desc: "Centro empresarial ligado aos protocolos experimentais."
  },
  {
    nome: "Terminal Greyford",
    tipo: "Terminal de Metrô",
    img: "imgs/regioes/greyford.png",
    desc: "Sistema de transporte urbano agora abandonado."
  },
    {
    nome: "???",
    tipo: "Desconhecido",
    img: "imgs/regioes/helix.png",
    desc: "Última parte conhecida do protocolo. Dados restritos."
  },
];

/* ========================= */
/* FUNÇÃO DE RENDER */
/* ========================= */

function renderRegioes() {
  infoContent.innerHTML = "";

  regioes.forEach(regiao => {
    const card = document.createElement("div");
    card.classList.add("info-card");

    card.innerHTML = `
      <img src="${regiao.img}" alt="${regiao.nome}">
      <div class="info-card-body">
        <h3>${regiao.nome}</h3>
        <p>${regiao.tipo}</p>
      </div>
    `;

    card.addEventListener("click", () => {
      openModal(regiao);
    });

    infoContent.appendChild(card);
  });
}

function openModal(regiao) {
  modalImg.src = regiao.img;
  modalTitle.textContent = regiao.nome;
  modalType.textContent = regiao.tipo;
  modalDesc.textContent = regiao.desc;

  helixModal.classList.add("active");
}
/* ========================= */
/* CONTROLE DE TABS */
/* ========================= */

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const selected = tab.dataset.tab;

    if (selected === "regioes") {
      renderRegioes();
    } else {
      infoContent.innerHTML = `
        <p style="color:#555;">Conteúdo de ${selected} será implementado futuramente.</p>
      `;
    }
  });
});

/* Inicializa com Regiões */
renderRegioes();

closeModal.addEventListener("click", () => {
  helixModal.classList.remove("active");
});

helixModal.addEventListener("click", (e) => {
  if (e.target === helixModal) {
    helixModal.classList.remove("active");
  }
});