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
    desc: "O nome do hospital carrega uma história que muitos moradores conhecem com orgulho. Ele homenageia Dra. Eleanor Mercy Vale, médica e filantropa que chegou a Rhodes Town décadas atrás, em um período marcado por violência crescente e precariedade nos atendimentos de emergência, especialmente no então decadente distrito de Blackridge. Filha de uma família tradicional, mas movida por vocação profundamente social, Eleanor abriu a primeira clínica comunitária em um prédio pequeno e improvisado, atendendo vítimas de crimes, trabalhadores feridos e famílias que não tinham condições de pagar nenhum tratamento. Sua filosofia era simples 'A cidade só é forte quando a compaixão é alta'. Com o aumento da demanda e o apoio da população, a clínica cresceu, recebeu doações e, após a morte de sua fundadora, foi oficialmente expandida e renomeada como Hospital Mercy Vale. Hoje o hospital é um complexo médico moderno, equipado com centro cirúrgico avançado, ala de trauma 24 horas e uma das emergências mais rápidas da região, funcionando em integração direta com a DPRT e o Terminal Greyford para respostas imediatas."
  },
{
    nome: "Sistema Subterrâneo Blackflow",
    tipo: "Sistema de Esgotos",
    img: "imgs/regioes/esgotos.png",
    desc: "Criado para conectar e modernizar todo o sistema de esgotos e drenagem urbana, o Blackflow nasceu em um momento crucial do desenvolvimento de Rhodes Town. Com a revitalização do distrito de Blackridge e a construção de centros estratégicos como a DPRT, o Hospital Mercy Vale e o Terminal Greyford, tornou-se necessário expandir a infraestrutura subterrânea para sustentar o crescimento acelerado da região. O projeto foi financiado e executado pela poderosa corporação TAL - Tarsis Advanced Logistics, uma empresa de engenharia e infraestrutura que rapidamente se tornou uma das maiores forças industriais da cidade. À frente da empresa está seu fundador e CEO, Alistair V. Lorne, um empresário visionário conhecido por sua mente estratégica e por investir em projetos que outras companhias consideravam ousados demais. Sob sua liderança, a TAL propôs algo que ia muito além de simples redes de esgoto: o Blackflow foi projetado como um sistema integrade de drenagem, manutenção urbana e acesso técnico, com túneis largos o suficiente para veículos de serviço, estações de controle automatizadas e rotas de inspeção que percorrem quilômetros sob Rhodes Town. Oficialmente, o sistema trouxe enormes benefícios. Ele reduziu alagamentos, melhorou o saneamento da cidade e permitiu que novas construções em Blackridge fossem planejadas com muito mais eficiência. Engenheiros frequentemente chamam Blackflow de 'sucesso absoluto de Rhodes Town'."
  },
{
    nome: "Complexo Saint Alder",
    tipo: "Complexo Corporativo",
    img: "imgs/regioes/saint-alder.png",
    desc: "Construído durante o grance processo de revitalização de Blackridge, o complexo foi projetado para funcionar como um centro empresarial, administrativo e estratégico, reunindo instituições públicas, representantes privados e especialistas urbanos em um único espaço. Sua localização não foi decidida por acaso, situado poucos minutos da DPRT, do Hospital Mercy Vale e do Terminal Greyford, Saint Alder possui acesso rápido a segurança, atendimentos médicos e transporte, permitindo respostas imediatas a qualquer situação crítica envolvendo a cidade. Arquitetonicamente, o complexo mistura elegância moderna com imponência institucional. Por conta dessa função central, o Saint Alder ficou conhecido como o cérebro administrativo de Rhodes Town. A liderança do complexo está nas mãos de Sebastian Alder, Urbanista e herdeiro da família que financiou parte da construção do complexo. Conhecido por sua visão estratégica de crescimento urbano, Sebastian atua como coordenador das iniciativas de desenvolvimento e planejamento da cidade. Dra. Helena Crowford, especialista em gestão pública e segurança urbana. Helena trabalhou por anos como consultora para a DPRT e diversas organizações cívicas. Dentro do Saint Alder, ela supervisiona as análises de risco, planejamento de resposta emergencial e integração entre instituições da cidade. Marcus Halberg, empresário e representante de grandes investimentos corporativos ligados à infraestrutura e tecnologia. Com uma mente pragmática e grande influência no setor privado, Marcus é responsável por intermediar projetos entre empresas como TAL e as autoridades de Rhodes Town. Juntos, os três formam o Conselho Diretor do Complexo Saint Alder."
  },
  {
    nome: "Terminal Greyford",
    tipo: "Terminal de Metrô",
    img: "imgs/regioes/greyford.png",
    desc: "O Projeto foi desenvolvido em parceria entre a TAL e a tradicional família Greyford, que por gerações atuou no setor de transporte e planejamento urbano. A ideia era simples, mas ambiciosa: criar um grande terminal subterrâneo capaz de ligar Blackridge ao restante de Rhodes Town com rapidez, segurança e fluxo constante de pessoas. Hoje, o Terminal Greyford funciona como um verdadeiro nó central do metrô da cidade. Linhas modernas atravessam seus túneis conectando bairros importantes de Rhodes Town e também abrindo caminhos para cidades vizinhas, como Ironvale, um polo industrial conhecido por fábricas e centros logísticos, e Larkspur Bay, uma cidade portuária que se tornou um importante ponto comercial da região. Graças ao terminal, Blackridge deixou de ser um distrito isolado. Trabalhadores, estudantes, médicos, policiais e empresários passam diariamente por suas plataformas iluminadas, transformando o local em um dos pontos mais vivos da cidade. Mas por trás da grandiosidade do terminal existe uma história de perda. A família responsável pelo projeto era formada por Arthur Greyford, engenheiro urbano, sua esposa Marianne Greyford, arquiteta especializada em mobilidade pública; e seus dois filhos, Clara e Elliot Greyford. Durante anos, Arthur e Marianne lutaram para convencer investidores e autoridades de que Blackridge precisava ser conectado ao resto da cidade, quando finalmente conseguiram apoio financeiro, incluindo o investimento da TAL, a construção começou. No entanto, durante uma das fases iniciais do projeto, um grave acidente estrutural ocorreu em um túnel ainda em expansão. Marianne, que supervisionava pessoalmente parte da obra, acabou falecendo no acidente. Arthur, devastado, chegou a considerar abandonar o projeto. Mas foi a própria filha, Clara, que insistiu que a obra continuasse. Segundo relatos da época, ela disse 'se pararmos, o sonho da mamãe morre'. Meses depois, a construção foi retomada e concluída. O terminal foi inaugurado oficialmente com o nome Greyford. E uma placa de metal, instalada próxima à entrada principal, carrega uma simples inscrição 'Em memória de Marianne Greyford, cuja visão ajudou a abrir caminhos'."
  },
    {
    nome: "???",
    tipo: "Desconhecido",
    img: "imgs/regioes/helix.png",
    desc: "Dados restritos."
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