import { db, ref, set, onValue, ROOM } from "./Sol-Fire.js";
import { currentUser, onUserLoaded } from "./Sol-System.js";
const docsRef = ref(db, `rooms/${ROOM}/docs/unlocked`);

// =======================
// 📚 DATABASE DE DOCUMENTOS
// =======================

const docsDB = [
  {
    nome: "Diário do Vigia",
    categoria: "Secundário",
    style: "antigo",
    conteudo: `
      <p>Entrada 1</p>
      <p>Hoje o silêncio da floresta de Loren pareceu mais pesado do que o normal. Caminhei pelas trilhas conhecidas, mas sentia que estava sendo observado. Estranho. Será que essa solidão está me pregando peças? Tenho que seguir atento.</p>
      <p>Entrada 2</p>
      <p>Elas voltaram. As vozes. Desta vez, reconheci um tom familiar, parecia minha irmã, chamando meu nome. Não faz sentido, ela se foi há anos. Caminhei em direção ao som, mas não havia ninguém. A floresta estava vazia, exceto pelos animais que eu vejo todo dia.</p>
      <p>Entrada 3</p>
      <p>Cada noite que passa, parecem que estão ficando mais perto. Minha irmã fala comigo, implora para que eu me esconda, mas não sei do que ou de quem. Cheguei a ver alguns vultos pelas árvores, mas tudo isso, parece loucura. Parece. </p>
      <p>Entrada 4</p>
      <p>Esta noite, as vozes foram insistentes, quase gritantes. Segui o som até a clareira, mas novamente não havia nada. Minha irmã dizia que iam se aproximar a cada noite. Isso é loucur- </p>
    `
  },
  {
    nome: "O Artista Sangrento",
    categoria: "Principal",
    style: "intenso",
    conteudo: `
      <p>Eu caminhava sozinho na 5° de Zhalem, quando ouvi um som estranho vindo do Ateliê, lugar pequeno, sempre fechado ao anoitecer. O ruído era irregular, estranho. Era bem tarde para qualquer cliente, e ninguém mais ousava circular por aquelas ruelas. A curiosidade me venceu, me aproximei dessa janela empoeirada e tentei enxegar. O que vi congelou meu sangue, o maior horror que eu já vi na minha vida. Pareciam pinceladas densas e vermelhas, espalhadas em padrões que lembravam carne e vísceras, figuras contorcidas e agonizantes. E então, no canto da sala, notei que algo se moveu. Um homem, alto, silhueta imponente, como se a própria sombra tivesse ganho qualquer tipo de forma. Um frio percorreu minha espinha e eu recuei sem fazer barulho. Ele saiu do ateliê, até hoje não sei se aquilo era humano, ou se apenas o medo me impediu de ver a verdade.</p>
    `
  },
  {
    nome: "Casa Arkley",
    categoria: "Secundário",
    style: "padrao",
    conteudo: `
      <p>A Casa Arkley foi, por gerações, o símbolo do poder e da opulência em Zhalem. Uma família real que ostentava riquezas, influências e luxo como poucos ousavam sonhar. Seus salões eram adornados com tapeçarias raras, candelabros de cristal e móveis que pareciam feitos de ouro sólido. Eles eram o orgulho da cidade... e, para muitos, também o alvo da inveja e do ódio.</p>
      <p>Tudo mudou quando a população, cansada da desigualdade e da ostentação, se levantou contra eles. Toda a caçada foi brutal, ninguém na cidade ousava proteger os Arkley, e rumores dizem que parte da família desapareceu sem deixar nenhum vestígio, enquanto outros foram executados em praça pública. A tentativa de erradicar a burguesia parecia, por um momento, ter sucesso.</p>
      <p>Mas a chegada do Império mudou tudo. O poder imperial restaurou a burguesia, não apenas com riquezas, mas com uma autoridade ainda mais opressiva. A cidade foi dividida, Zhalem, com a burguesia e história floresce em palácios; Distrito Baixo, um lugar triste, pobre e doente.</p>
      <p>Hoje, a Casa Arkley é tanto símbolo quanto prisão. Seu legado é admirado, temido e odiado em igual medida. Aqueles que vivem em Zhalem olham para os palácios e veem luxo e poder, mas os moradores do Distrito Baixo só conhecem a dor, fome e desprezo. A cidade nunca mais será a mesma, e a lenda da Casa Arkley permanece.</p>
    `
  },
  {
    nome: "Os Duendes",
    categoria: "Secundário",
    style: "padrao",
    conteudo: `
    <p>Os duendes chegaram a Distrito Baixo anos após a queda da Casa Arkley, aproveitando o caos econômico e social deixado pela instabilidade. Pequenos, orelhudos e de aparência pouco atraente, eles rapidamente se tornaram conehcidos por sua habilidade técnica e astúcia nos negócios. Sua presença trouxe uma mistura de fascínio e desconfiança à população.</p>
    <p>Aparência</p>
    <p>Pequenos, geralmente não ultrapassam 120 centimetros. Orelhas longas e pontudas, olhos grandes e penetrantes. Pele geralmente cinzenta ou esverdeada, mãos ágeis e dedos finos. Roupas simples, muitas vezes com bolsos e cintos cheios de ferramentas.</p>
    <p>Comportamento e Cultura</p>
    <p>São extremamente técnicos, conhecedores de moedas, contas, comércio e logística. Pragmáticos, valorizam contratos, negociações e precisão em qualquer transação. Geralmente não confiam facilmente em humanos, mas respeitam aqueles que provam competência e honestidade. Apesar de feios, possuem uma inteligência aguçada e uma memória impecável.</p>
    <p>Curiosidades</p>
    <p>Dizem que cada duende possui um objeto valioso guardado, e que revelar ou roubar é quase impossível sem consequências graves. Alguns acreditam que eles vieram além das fronteiras do Sol, depois da Cordilheira.</p>
    `
  },
  {
    nome: "Lista de Pedidos",
    categoria: "Secundário",
    style: "antigo",
    conteudo: `
      <p>Remetente: Sarin</p>
      <p>Destino: Comerciantes de Zhalem</p>
      <p>Itens solicitados:</p>
      <p>Potes de óleo de Lavanda - Para manutenção de lâmpadas da vila</p>
      <p>12 velas de cera pura - resistentes à umidade do Distrito Baixo</p>
      <p>Um lote de tecidos finos (verde e marrom) - Para uniformes</p>
      <p>Ferramentas de precisão - para consertos mecânicos e artesanais</p>
      <p>Nota: Não economizem em qualidade, Zhalem sempre fornece o melhor. Lembrem-se cada item é essencial. Não posso arcar com nenhum atraso.</p>
    `
  },
    {
    nome: "Documento de Kyra",
    categoria: "Secundário",
    style: "padrao",
    conteudo: `
      <p>As contas não param de se acumular. Cada mês está pior do que o outro, e a despensa quase vazia. Tento manter a aparência para que ninguém perceba, mas é sufocante. Hoje, recebi notícias que podem mudar tudo. Uma ajuda considerável está a caminho, e finalmente poderei quitar dívidas e recuperar um pouco de dignidade. Não posso me deixar levar pela ansiedade; é preciso planejamento.</p>
      <p>Assinado: Kyra</p>
      `
  },
      {
    nome: "Documento Confidencial",
    categoria: "Secundário",
    style: "padrao",
    conteudo: `
      <p> Ao Juiz,</p>
      <p> O ritmo de produção das minas de Doran tem superado todas as expectativas iniciais. A extração segue acelerada, com resultados consistentes e aumento progressivo nos lucros. As operações continuam estáveis, sem levantar suspeitas relevantes entre os trabalhodores ou a população. Conforme alinhado, seguimos utilizando propriedades da cidade para expandir discretamente as atividades, evitando qualquer registro formal que possa comprometer nossa operação. As áreas menos supervisionadas têm sido particularmente úteis para esse propósito. Quanto às diretrizes estratégicas, as ideias originalmente propostas por Sarin têm se mostrado extremamente eficazes, especialmente quando aplicadas de maneira... flexível. Ajustes foram necessários. Sarin permanece convencido de que suas propostas estão sendo executadas da maneria íntegra e conforme planejado. A redução coincidente da criminalidade, o aumento da circulação capital e a melhoria geral na qualidade de vida têm reforçado essa percepção. Ele não está questionando os resultados.</p>
      <p> Aguardamos novas instruções.</p>
      `
  },
        {
    nome: "Registro de Trabalhadores",
    categoria: "Secundário",
    style: "padrao",
    conteudo: `
      <p>Kyra, 27 anos — Empilhadora</p>
        <p>Cubar, 39 anos — Minerador</p>
        <p>Leris, 34 anos — Supervisor de turno</p>
        <p>Tavin, 19 anos — Carregador</p>
        <p>Mera, 31 anos — Separadora de minério</p>
        <p>Drol, 42 anos — Escavador profundo</p>
        <p>Elin, 14 anos — Auxiliar de trilho</p>
        <p>Pasko, 11 anos — Coletor de fragmentos</p>
        <p>Rima, 22 anos — Transportadora</p>
        <p>Garen, 36 anos — Ferreiro de suporte</p>
        <p>Nilo, 9 anos — Limpeza de detritos</p>
        <p>Savel, 28 anos — Operador de guincho</p>
        <p>Toren, 45 anos — Capataz</p>
        <p>Yuni, 16 anos — Mensageira interna</p>
        <p>Brak, 33 anos — Quebrador de rocha</p>
        <p>Observação: Registros incompletos. Substituições frequentes devido a desgaste físico, acidentes e evasão.</p>
      `
  },
          {
    nome: "Registro de Descarte",
    categoria: "Secundário",
    style: "padrao",
    conteudo: `
      <p>Haren, 41 anos — Escavador profundo — Descarte por colapso físico (inapto para trabalho)</p>
        <p>Luma, 23 anos — Transportadora — Descarte por ferimento permanente na perna</p>
        <p>Bronn, 37 anos — Quebrador de rocha — Descarte por insubordinação</p>
        <p>Keli, 12 anos — Coletora de fragmentos — Descarte por baixa produtividade</p>
        <p>Varn, 29 anos — Operador de guincho — Descarte após acidente (perda de um braço)</p>
        <p>Dresa, 33 anos — Separadora de minério — Descarte por doença pulmonar</p>
        <p>Orik, 46 anos — Capataz assistente — Descarte por questionamento de ordens</p>
        <p>Sena, 15 anos — Mensageira — Descarte por tentativa de fuga</p>
        <p>Torv, 38 anos — Minerador — Descarte por desaparecimento em turno</p>
        <p>Peli, 10 anos — Limpeza de detritos — Descarte por “ineficiência contínua”</p>
        <p>Gral, 44 anos — Escavador — Descarte por exaustão extrema</p>
        <p>Nera, 26 anos — Empilhadora — Descarte após incidente não especificado</p>
        <p>Nota marginal (rasgada): Evitar registros detalhados. Frequência de descarte dentro do esperado.</p>
      `
  },
          {
    nome: "Lista de Compras",
    categoria: "Secundário",
    style: "antigo",
    conteudo: `
      <p>Edrik, não esquece de passar em Doran antes de voltar. Precisamos disso</p>
        <p>* 2 sacos de farinha boa (não aquela vagabunda que veio da última vez)</p>
        <p>* Sal grosso (acabou ontem)</p>
        <p>3 frascos de óleo para lamparina</p>
        <p>Ervas secas (principalmente hortelã e raiz amarga, se tiver)</p>
        <p>Um pedaço de tecido grosso para remendar o casaco</p>
        <p>Pregos e um martelo novo (aquela velharia que você usa não presta mais)</p>
        <p>Um pouco de carne</p>
        <p>Sabão (se estiver caro, pede para cortarem)</p>
        <p>Se sobrar algumas moedas... tenta trazer algum doce. Faz tempo que não temos nada assim por aqui. Volta antes de escurer. As noites têm estado frias demais.</p>
      `
  },
    {
    nome: "Carta para minhas filhas",
    categoria: "Secundário",
    style: "antigo",
    conteudo: `
      <p>Minhas queridas filhas,</p>
        <p>Se vocês estão lendo isso, é porque eu não vou estar aqui. Escrever essas palavras é mais difícil do que qualquer coisa que eu já enfrentei, mas preciso que vocês saibam, tudo que eu fiz foi por vocês.</p>
        <p>Kaelen, cuide da sua irmã como sempre fez, não esqueça de cuidar de si também. Nyssa, minha pequena... eu sei que você ainda vê o mundo com esperança, e por favor, nunca perca isso. Sua luz é muito rara.</p>
        <p>Eu sinto muito por não poder estar com vocês. Sinto muito todas as noites em que meu corpo sente o frio e que eu não posso aquecer vocês, por cada palavra e cada coisa que não posso ensinar para vocês, e por cada momento que vou perder.</p>
        <p>Vocês são tudo pra mim. Sempre foram.</p>
        <p>Kyra</p>
      `
  },
      {
    nome: "Última anotação",
    categoria: "Principal",
    style: "intenso",
    conteudo: `
      <p>Eu me lembro de quando este lugar era belo.</p>
        <p>As pedras brilhavam sob a luz do sol, e os homens que aqui trabalhavam cantavam enquanto extraíam da terra seus tesouros. Havia vida, alegria, amor. Eu caminhava entre eles sem medo.</p>
        <p>Mas isso foi antes de Zhalem decidir o que eu era.</p>
        <p>Não fui eu quem mudou. A Casa Arkley precisava de um monstro, e então me deram um nome que não era meu. Bruxa, Devoradora. Ladra. Construíram histórias tão horríveis que até os inocentes passaram a acreditar. Vi mães puxarem filhos para longe de mim, homens que já dividiram alimentos empunharem pedras. Tentei explicar, mas ninguém questiona os Arkley.</p>
        <p>Fui trazida até aqui, não como uma mulher, mas como algo que deveria ser morto. Um erro a ser enterrado. Sinto meu corpo falhar agora. A carne cede, tem algo nesse lugar que me responde, que respira comigo. Isso é magia.</p>
        <p>Eles me chamaram de monstro, talvez eu me torne um.</p>
        <p>Prenderei este diário na rocha antes de ir para a parte mais baixa da ruína. Se alguém encontrar e ler isso, saibam que eu não roubei nenhuma criança, eu não fui o monstro que temeram. Mas agora, eu vou me refugiar, onde o que quer que saia de mim não machuque ninguém do lado de fora.</p>
      `
  },
        {
    nome: "Carta de um Minerador",
    categoria: "Principal",
    style: "intenso",
    conteudo: `
      <p>Recebi o pedido.</p>
        <p>Sei exatamente qual minério estão procurando. O veio escuro, quase vivo ao toque. Não existe em nenhum outro lugar além das ruínas de Orphelia. Já trabalhei lá antes... quando ainda era normal. Posso tentar conseguir o que pedem, mas deixo claro que não vai ser como antigamente. As escavações não são mais seguras por lá, a terra cede sem aviso, e ainda tem os sons. Ainda assim, entendo o valor do minério para vocês. Vou reunir alguns homens e descer mais uma vez. Se não houver retorno, considerem este o último aviso.</p>
        <p>Darek</p>
        `
  },
      {
    nome: "Registros de Lyrenne",
    categoria: "Principal",
    style: "intenso",
    conteudo: `
      <p>Os sintomas observados por aqui não se comportam como nenhuma doença comum. Não tem um padrão natural. A deterioração não é apenas física, ela se manifesta nas estruturas, no ar, e até na percepção daqueles que ficam por aqui muito tempo.</p>
        <p>Eu vim aqui para estudar e entender isso. O que é essa doença? Mas quanto mais eu observo, mais evidente se torna que isso não nasceu aqui.</p>
        <p>Hoje, fui interrompida durante meus estudos. Um homem cruzou os limites da ruína sem nenhuma hesitação, armadura marcada pelo símbolo do Império. Identificou-se como Kael. Sua presença destoava completamente do ambiente, como se recusasse a ser afetado por ele. Ele falou pouco, disse ter ignorado ordens diretas, segundo ele limpar o nome de "uma bruxa" não valia o esforço para o império. Mas para ele valia tudo. Nessa hora eu entendi, Orphelia não era só um nome para ele, era alguém especial, sua esposa. Quando o questionei, ele falou com convicção, disse que ela foi até Zhalem em uma simples visita ocasional. Não sabiam mais quem ela era, não sabiam com quem estavam lidando, e ainda assim, a julgaram e condenaram. Sem nenhum questionamento ou verdade. Kael ainda acredita que pode salvá-la, não tentei impedir ele, tinha algo em sua determinação que tornava qualquer argumento irrelevante. Ele caminhou na direção das profundezas das ruínas.</p>
        <p>"Estou indo, meu bem. Não se preocupe, estou aqui."</p>
        <p>Isso foi há dias, não houve nenhum retorno.</p>
        `
  },
];

// =======================
// 🔓 DOCUMENTOS DESBLOQUEADOS
// =======================

let docsDesbloqueados = []; 

onValue(docsRef, (snapshot) => {
  const data = snapshot.val();

  docsDesbloqueados = data || [];
});

const docMasterBtn = document.getElementById("doc-master");

// começa escondido
docMasterBtn.style.display = "none";
onUserLoaded((user) => {

  if (user.nome === "Moderador") {
    docMasterBtn.style.display = "block"; // ou "flex" dependendo do CSS
  }

});

docMasterBtn.addEventListener("click", () => {

  if (!currentUser || currentUser.nome !== "Moderador") {
    return;
  }

  openDocMaster();
});

function openDocMaster() {
  document.body.insertAdjacentHTML("beforeend", `
    <div class="player-menu" id="doc-master-overlay" onclick="closeDocMaster()">
      <div class="player-select-box" onclick="event.stopPropagation()">

        <h2>Documentos</h2>

        <div class="doc-list">
          ${docsDB.map((doc, i) => `
            <div class="doc-item">

              <div class="doc-info">
                <strong>${doc.nome}</strong>
                <span>${doc.categoria}</span>
              </div>

              <button onclick="toggleDoc(${i})">
                ${isDocUnlocked(i) ? "Remover" : "Liberar"}
              </button>

            </div>
          `).join("")}
        </div>

      </div>
    </div>
  `);
}

function isDocUnlocked(index) {
  return docsDesbloqueados.includes(index);
}

function toggleDoc(index) {

  let novos;

  if (docsDesbloqueados.includes(index)) {
    novos = docsDesbloqueados.filter(i => i !== index);
  } else {
    novos = [...docsDesbloqueados, index];
  }

  // 🔥 envia pro Firebase (UMA escrita leve)
  set(docsRef, novos);

  document.getElementById("doc-master-overlay").remove();
  openDocMaster();
}

function closeDocMaster() {
  document.getElementById("doc-master-overlay").remove();
}

const docPlayerBtn = document.getElementById("doc-player");
docPlayerBtn.addEventListener("click", openDocPlayer);

function openDocPlayer() {
  document.body.insertAdjacentHTML("beforeend", `
    <div class="player-menu" id="doc-player-overlay" onclick="closeDocPlayer()">
      <div class="player-select-box" onclick="event.stopPropagation()">

        <h2>Documentos</h2>

        <div class="doc-list">

            ${renderDocCategoria("Principal")}
            ${renderDocCategoria("Secundário")}

            </div>

      </div>
    </div>
  `);
}

function renderDocCategoria(tipo) {
  const docsFiltrados = docsDesbloqueados
    .map(i => ({ ...docsDB[i], index: i }))
    .filter(doc => doc.categoria === tipo);

  if (docsFiltrados.length === 0) return "";

  return `
    <div class="doc-category">

      <div class="doc-category-header" onclick="toggleDocCategoria(this)">
        ${tipo}s ▾
      </div>

      <div class="doc-category-content">
        ${docsFiltrados.map(doc => `
          <div class="doc-item" onclick="openDocView(${doc.index})">
            <div class="doc-info">
              <strong>${doc.nome}</strong>
              <span>${doc.categoria}</span>
            </div>
          </div>
        `).join("")}
      </div>

    </div>
  `;
}

function toggleDocCategoria(header) {
  const parent = header.parentElement;
  parent.classList.toggle("active");
}

function closeDocPlayer() {
  document.getElementById("doc-player-overlay").remove();
}

function openDocView(index) {
  const doc = docsDB[index];

  document.body.insertAdjacentHTML("beforeend", `
    <div class="player-menu" id="doc-view-overlay" onclick="closeDocView()">
      <div class="player-box doc-${doc.style}" onclick="event.stopPropagation()">

        <h2>${doc.nome}</h2>
        <small>${doc.categoria}</small>

        <div class="doc-content">
          ${doc.conteudo}
        </div>

      </div>
    </div>
  `);
}

function closeDocView() {
  document.getElementById("doc-view-overlay").remove();
}

window.toggleDoc = toggleDoc;
window.closeDocMaster = closeDocMaster;
window.closeDocPlayer = closeDocPlayer;
window.openDocView = openDocView;
window.closeDocView = closeDocView;
window.toggleDocCategoria = toggleDocCategoria;