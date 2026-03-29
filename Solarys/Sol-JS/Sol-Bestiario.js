import { db, ref, set, onValue, ROOM } from "./Sol-Fire.js";
import { currentUser, onUserLoaded } from "./Sol-System.js";

const bestiarioRef = ref(db, `rooms/${ROOM}/bestiario/unlocked`);

// =======================
// 📚 DATABASE
// =======================

const bestiarioDB = [
  // NPC
  {
    nome: "Capitã Elsyra",
    tipo: "NPC",
    categoria: "Principal",
    imagem: "Sol-Assets/Persons/Capitã Elsyra.png",
    historia: "Desde jovem, subiu nas fileiras do Império com disciplina implacável e uma presença que fazia até veteranos hesitarem. Ao lado de figuras como Aurelion e Stilgard, construiu uma reputação como Capitã que não recuava, nem em decisões difíceis. Elsyra nunca foi apenas uma soldado, ela foi forjada para Comandar. Hoje, com sua filha, Lyssa. Durante anos, seu nome significou ordem e disciplina, até a chegada de Varok. Suas ordens passaram a ser questionadas, missões reduzidas e influência lentamente drenada. Durante a queda de Elaris, reencontrou Stilgard, sem tempo para nostalgia, apenas reconhecimento."
  },
    {
    nome: "General Barok",
    tipo: "NPC",
    categoria: "Principal",
    imagem: "Sol-Assets/Persons/Barok.png",
    historia: "Barok foi tudo o que o Império dizia valorizar. E tudo aquilo foi deixado a mercê. General respeitado, estrategista brilhante e líder admirado por seus soldados, Barok não comandava pelo medo, mas pelo exemplo. Lutava na linha de frente, sangrava ao lado de seus homens e acreditava acima de tudo, em Honra. Seu irmão, Varok, era o oposto. Durante a invasão Rebelde havia o momento perfeito para um golpe, e Varok sabia disso. No meio da luta, Varok assassinou o próprio irmão, por puro controle, e isso marcou o início de um novo Império. Stilgard estava lá, e viu seu amigo morrer. 'Viva com Honra, e morra com Glória' foram as últimas palavras proferidas entre eles."
  },
    {
    nome: "Lyss",
    tipo: "NPC",
    categoria: "Principal",
    imagem: "Sol-Assets/Persons/Lyss.png",
    historia: "Lyss aprendeu a sobreviver no meio do caos. Cresceu em tavernas, clubes e becos onde a música alta escondia conversas irreais. Enquanto outros se perdiam, Lyss observava. Sempre observando. Aprendeu cedo que sobreviver não era sobre força, e sim sobre entender os idiotas. Se existe algo que define Lyss, é o fato de ela ainda estar viva ao lado de dois completos idiotas. Eddie, um Bardo guitarrista brilhante, e Jax, seu irmão e provavelmente metade dos problemas dela. Ela não lidera nada, mas sem ela talvez esse trio não sobreviva uma semana. Sarcástica na medida certa, perceptiva e sabe exatamente quando sair de uma situação."
  },
    {
    nome: "Jax",
    tipo: "NPC",
    categoria: "Principal",
    imagem: "Sol-Assets/Persons/Jax.png",
    historia: "Enquanto Lyss aprendia a observar, Jax aprendia a manipular. Cartas marcadas, dados viciados, promessas com zero intenção de cumprir. Ele não joga para se divertir, joga para sair por cima, todas as vezes. Jax é o tipo de pessoa que entra devendo, sai lucrando e ainda deixa algum idiota pedindo desculpa. Ele não só engana, faz pessoas acreditarem que foi justo. Se ele sozinho é ruim, pior ainda é quando se junta a Eddie. Os dois juntos são um desastre perfeitamente sincronizado, planejam golpes absurdos, mentiras e sempre apostam mais do que deveriam. Se entendem sem falar uma palavra. Jax provavelmente tem mais inimigos do que o dicionário tem de palavras, e ainda assim, continua jogando."
  },
    {
    nome: "Althéa Serenna",
    tipo: "NPC",
    categoria: "Principal",
    imagem: "Sol-Assets/Persons/Serenna.png",
    historia: "A mais velha das integrantes da Fazenda Serenna. Althéa herdeu a fazenda de seus antepassados para si, e hoje vive nela com Maelis e Liora. Certo dia, Stilgard requisitou refúgio em troca de serviços braçais na fazenda."
  },
    {
    nome: "Sevrina",
    tipo: "NPC",
    categoria: "Principal",
    imagem: "Sol-Assets/Persons/Sevrina.png",
    historia: "Sevrina é uma bruxa antiga que vivia na parte inferior do vilarejo elaris, criando um local para os refugiados do império. Ela é conhecida por ser uma curandeira poderosa e por ter um passado misterioso, com rumores de que ela já foi uma nobre caída em desgraça."
  },
    {
    nome: "Lyrenne",
    tipo: "NPC",
    categoria: "Principal",
    imagem: "Sol-Assets/Persons/Lyrenne.png",
    historia: "Lyrenne é uma Nefária que vive isolada nas Ruínas de Orphelia, conhecida por sua doença misteriosa, foi acolhida por Sevrina décadas atrás, mas preferiu se manter nas Ruínas de Orphelia, ficou presa lá após o ataque do Portador da Cinza."
  },
    {
    nome: "Horin",
    tipo: "NPC",
    categoria: "Secundário",
    imagem: "Sol-Assets/Persons/Horin.png",
    historia: "Horin é um velho lenhador que vive em Zhalem, requisitou ajuda pelo desaparecimento de seu ajudante próximo ao Caminho de Loren."
  },
  {
    nome: "Basili",
    tipo: "NPC",
    categoria: "Secundário",
    imagem: "Sol-Assets/Persons/O Basili.png",
    historia: "Basili é um Cartógrafo de Zhalem, conhecido por sua habilidade em criar mapas detalhados e precisos. Ele é um explorador nato, sempre em busca de novas terras para mapear e descobrir. Basili é um aventureiro corajoso, enfrentando perigos e desafios para alcançar seus objetivos."
  },
    {
    nome: "Korv",
    tipo: "NPC",
    categoria: "Secundário",
    imagem: "Sol-Assets/Persons/Korv.png",
    historia: "Korv é um Minotauro bêbado que costuma arrumar confusões, criou desavenças com Jax e Eddie por causa de Poker e roubos."
  },
    {
    nome: "Kaelen",
    tipo: "NPC",
    categoria: "Secundário",
    imagem: "Sol-Assets/Persons/Kaelen.png",
    historia: "Kaelen é uma jovem filha de Kyra, uma herbalista que foi muito respeitada. Eventualmente, durante os invernos de Pedrafria, Kyra adoeceu, começando com tremores, depois manchas e por fim raízes. Kaelen tinha apenas 14 anos quando sua mãe morreu. Ela enterrou toda a fé e anos depois, se sentiu como a protetora de Nyssa, sua irmã mais nova."
  },
    {
    nome: "Nyssa",
    tipo: "NPC",
    categoria: "Secundário",
    imagem: "Sol-Assets/Persons/Nyssa.png",
    historia: " Nyssa é a irmã mais nova de Kaelen. Ela é uma jovem que cresceu em meio à tristeza e ao desespero de sua irmã mais velha. Nyssa é gentil, mas também corajosa, e sempre se esforça para manter a esperança viva em meio às dificuldades. Acabou por perder sua mãe quando tinha apenas 8 anos de idade, sem entender muito como aconteceu, até que a doença de sua mãe se manisfetou nela."
  },
    {
    nome: "Gorim",
    tipo: "NPC",
    categoria: "Secundário",
    imagem: "Sol-Assets/Persons/Gorim.png",
    historia: "Poucos em Zhalem ainda se lembram como eram os tempos antes da Praga se espalhar. Mas entre os muros da cidade, um nome ainda é murmurado com respeito entre soldados veteranos: Gorim, o Ferreiro da Guarnição Imperial. Um homem de ombros largos e mãos marcadas pelo ferro, ele se especializou naquilo que poucos ferreiros ousavam fabricar: armas de guerra colossais."
  },
    {
    nome: "Sarin",
    tipo: "NPC",
    categoria: "Secundário",
    imagem: "Sol-Assets/Persons/Sarin.png",
    historia: "Sarin é o líder de Doran, uma cidade que fica entre Zhalem e Pedrafria. Ele é conhecido em Doran por seu carisma e hospitalidade, mas também por sua habilidade em resolver conflitos e manter a paz na cidade. Sarin é um líder sábio e justo, sempre buscando o melhor para seu povo."
  },
    {
    nome: "Siegmar of Catarina",
    tipo: "NPC",
    categoria: "Secundário",
    imagem: "Sol-Assets/Persons/Siegmar.png",
    historia: "Siegmar of Catarina é um Cavaleiro que se destacou em batalhas contra os rebeldes de Catarina. Ele é conhecido por sua lealdade ao povo de Catarina e por sua habilidade em combate. Siegmar é um defensor da ordem e da justiça, lutando para proteger os inocentes e combater o opressor. Ele é um líder natural, inspirando os outros com sua coragem e determinação."
  },
    {
    nome: "Rei Valeric Kaer",
    tipo: "NPC",
    categoria: "Império",
    imagem: "Sol-Assets/Persons/Valeric.png",
    historia: "Valeric não herdou o trono, se tornou digno dele. Conhecido como Rei de Aço, Valeric construiu sua imagem não com carisma ou inspiração, mas com estabilidade. Onde outros reis falharam, ele teve sucesso. O Império sob seu comando nunca foi mais forte. Valeric acredita que a Ordem está acima de tudo, quando Varok tomou o controle das forças imperiais, muitos esperavam conflito, mas Valeric não resistiu. Ele observou, analisou e aprovou. As ideias de Varok, duras, eficientes e impiedosas se encaixavam perfeitamente na visão do império. A morte de Barok nunca foi discutida publicamente. "
  },
    {
    nome: "Magistrada Ysvelle",
    tipo: "NPC",
    categoria: "Império",
    imagem: "Sol-Assets/Persons/Ysvelle.png",
    historia: "Havia uma época onde o nome de Ysvelle representava justiça verdadeira. Não julgava, não cedia e não se curvava ao poder. Era conhecida por equilibrar lei e sabedoria, algo que poucos podiam fazer. Até o dia em que o Império mudou. Durante e antes do ataque rebelde que culminou na morte de Barok, Ysvelle já esteve presenta nas decisões que moldariam o futuro, viu o que aconteceu, entendeu e concedeu. Naquele momento, algo dentro dela se ajustou, não que tenha deixado de acreditar na justiça, mas redefiniu o que ela significava. Acima de tudo, está o trono. Se tornou cada vez mais próxima do Rei, concordando com suas ideias, compartilhando clareza, frieza e ausência de duvida."
  },
    {
    nome: "Inquisidor Stilgard II",
    tipo: "NPC",
    categoria: "Império",
    imagem: "Sol-Assets/Persons/Stilgard II.png",
    historia: "Ele nunca foi um homem gentil. Como inquisidor, sua função nunca foi confortar, foi corrigir, purgar e manter o que considerava ordem. Acreditava no Império, na disciplina, na força, e acredita que seu filho deveria ser o mesmo. Mas antes havia um equilíbrio entre eles, Eva. Quando ela morreu, algo quebrou, e tudo o que restou foi o Inquisidor. Ele não criou Stilgard, ele treinou ele. Sem espaço para fraquezas. Mas havia um problema, o garoto não queria a espada, escolheu apenas o escudo. Para ele, isso era incompreensível, a espada resolve tudo, e o escudo só o protege. Ele nunca soube interpretar isso, nunca soube se via aquilo como Fraqueza ou algo maior. Quando seu filho se foi, sem confronto e sem despedida, Stilgard II continuou vivendo. Mas não como antes, tornou-se mais silencioso, mais vazio. Ele ainda serve o Império."
  },
    {
    nome: "Inquisidor Malrek",
    tipo: "NPC",
    categoria: "Império",
    imagem: "Sol-Assets/Persons/Malrek.png",
    historia: "Malrek nunca foi o melhor Inquisidor, sempre foi um problema. Não por falta de habilidade ou disciplina, mas porque ele fazia algo que os outros não queriam, ele pensava, não se curvava as ordens da Magistrada. Antes da ascensão de Varok, Malrek já questionava, não desobedecia, mas perguntava sempre o 'por quê?' enquanto outros só executavam as ordens. Quando Varok assumiu, as perguntas deixaram de ser toleradas, e passaram a ser observadas, Malrek não parou, na verdade piorou, perguntou mais e mais. Dentro do Império poucos compartilhavam dessa ideia, e Elsyra era uma delas, e vimos o que aconteceu. Valeric não puniu Malrek diretamente, mas sim todos os Inquisidores, reduziu o poder deles, dando menos autoridade, autonomia e alcance."
  },
  {
    nome: "Oráculo Luthiel",
    tipo: "NPC",
    categoria: "Império",
    imagem: "Sol-Assets/Persons/Oráculo Luthiel.png",
    historia: "Luthiel nunca enxergou o mundo como os outros. E talvez, esse tenha sido o problema. Desde jovem, foi diagnosticada com uma doença rara na visão. Sua percepção falhava, borrava e distorcia. Os médicos diziam que ela perderia completamente sua visão, e estavam certos, mas incompletos. Conforme sua visão desaparecia, outra coisa surgia. Seu dom. Luthiel começou a ver, antes de acontecer. Fragmentos de decisões, possíveis caminhos, consequências inevitáveis, não previa o futuro, via o que levaria a ele. Antes da Ascensão de Varok, ela era próxima ao poder, consultada, observada e até temida, falava muito, dizia o que aconteceria, quem cairia, quais decisões levariam à ruína. Depois, o Império não queria mais previsões, e sim controle. Pouco a pouco, foi sendo afastada, sua condição não parou, piorou, não era mais apenas sua visão, seu corpo começou a falhar. Músculos não respondiam, movimentos se tornavam lentos, às vezes, inexistentes. Como se algo estivesse tomando espaço. Quando Elsyra foi embora, não havia mais notícias dela."
  },

  // INIMIGOS
  {
    nome: "Filhos do Musgo",
    tipo: "Adversário",
    categoria: "Inimigos",
    imagem: "Sol-Assets/Persons/Filhos do Musgo.png",
    historia: "Um grupo de criaturas misteriosas que vivem nos bosques do Caminho de Loren. Pouco se sabe sobre eles, mas são conhecidos por serem silenciosos e perigosos, atacando qualquer um que se aproxime de seu território. Dizem que eles têm uma conexão com a natureza e podem controlar plantas e animais para proteger seu lar."
  },
    {
    nome: "Rebelde de Metal",
    tipo: "Adversário",
    categoria: "Inimigos",
    imagem: "Sol-Assets/Persons/Rebeldes.png",
    historia: "Um grupo de rebeldes que se opõem ao Império e lutam por liberdade. Eles são liderados por Maelira e são conhecidos por sua habilidade em combate e por sua determinação em lutar contra a opressão do Império. Suas principais armas são metálicas, e claro, os grandes Dragões Metálicos controlados por Maelira."
  },
    {
    nome: "Amaldiçoados",
    tipo: "Adversário",
    categoria: "Inimigos",
    imagem: "Sol-Assets/Persons/Amaldicoados.png",
    historia: "Os Amaldiçoados de Orphelia, são criaturas deformadas pela maldição que cobre as Ruínas de Orphelia. Antigamente foram viajantes, soldados e exploradores que se aproximaram das ruínas após a catástrofe que envolveu a bruxa Orphelia e o Cavaleiro Kael. Ao respirarem a fumaça que emana das profundezas da região, seus corpos começaram a definhar lentamente. A carne apodreceu e a mente se esvaiu."
  },
    {
    nome: "Diamante de Gelo",
    tipo: "Adversário",
    categoria: "Inimigos",
    imagem: "Sol-Assets/Persons/Diamantes.png",
    historia: "Os Diamantes de Gelo são criaturas que surgiram nas montanhas de Pedrafria após as grandes pragas que devastaram a região. Seu aparecimento coincidiu com o abandono da cidade, quando o frio se intensificou e estranhas formações cristalinas começaram a surgir nas encostas da montanha. Seus corpos são compostos por camadas densas de gelo cristalizado, assumindo formas humanoides ou bestiais dependendo da formação."
  },
  {
    nome: "O Mímico",
    tipo: "Adversário",
    categoria: "Elite",
    imagem: "Sol-Assets/Persons/Mimico.png",
    historia: "Um ser misterioso que aparece em momentos de tensão e desespero. Ele é conhecido por sua habilidade de se transformar e se esconder entre as sombras. Dizem que ele é um guardião do caos, abrir sua caixa ou o que quer que ele seja pode causar um grande estrago, mas também pode trazer uma grande ajuda."
  },
    {
    nome: "Grande Madeira Apodrecida",
    tipo: "Adversário",
    categoria: "Elite",
    imagem: "Sol-Assets/Persons/Apodrecida.png",
    historia: "Uma árvore gigante que vive nos bosques do Caminho de Loren. Ela é conhecida por sua imensa presença e por sua madeira apodrecida, que é usada por alguns para criar ferramentas e armas. Dizem que ela é um guardião da floresta e protege os animais selvagens que vivem lá. A grande mão que sai do meio dela simboliza a proteção que ela oferece, mas também pode ser um aviso para aqueles que se aproximam demais."
  },
    {
    nome: "A Balança",
    tipo: "Adversário",
    categoria: "Elite",
    imagem: "Sol-Assets/Persons/Balanca.png",
    historia: "A Balança Pálida é uma seita que opera nas sombras das estradas e vilarejos menores da região. Embora muitos moradores neguem sua existência, relatos dispersos indicam que o grupo já esteve presente em lugares marcados por conflitos, disputas familiares e crises econômicas. Seu líder é conhecido como Juiz. A seita costuma se apresentar como mediadora de conflitos."
  },
  {
    nome: "General Varok",
    tipo: "Adversário",
    categoria: "Chefes",
    imagem: "Sol-Assets/Persons/Varok.png",
    historia: "General do exército imperial, conhecido por sua crueldade e eficiência em batalha. Traiu Stilgard e seu irmão Barok em batalha, fingindo estar lutando contra os Rebeldes, quando na verdade tentou usufruir dos poderes de Maelira para si mesmo. Ele é um estrategista frio e calculista, disposto a fazer qualquer coisa para alcançar seus objetivos, mesmo que isso signifique trair seus aliados ou cometer atos cruéis."
  },
    {
    nome: "Maelira",
    tipo: "Adversário",
    categoria: "Chefes",
    imagem: "Sol-Assets/Persons/Maelira.png",
    historia: "Maelira é uma Dominante que comanda os Rebeldes de Metal, um grupo de insurgentes que se opõem ao Império. Ela é conhecida por sua habilidade em combate e por sua determinação em lutar pela liberdade de seu povo. Descobriu seu poder dominante em uma situação de perigo, quando conseguiu controlar um grupo de inimigos para escapar de uma emboscada. Desde então, ela tem usado suas habilidades para liderar os Rebeldes de Metal em sua luta contra o Império."
  },
    {
    nome: "Eccho",
    tipo: "Adversário",
    categoria: "Chefes",
    imagem: "Sol-Assets/Persons/Eccho.png",
    historia: "Eccho é um Dominante, pouco se sabe a respeito dele. Mas ele diz saber muito a respeito de Eddie e Orion. Além de já ter interferido na ordem natural das coisas. Agora, é difícil dizer de onde ele vem, ou quem ele é, mas ele tem um grande interesse em tornar a vida de todos de Solarys um inferno."
  },
    {
    nome: "Cervo de Loren",
    tipo: "Adversário",
    categoria: "Chefes",
    imagem: "Sol-Assets/Persons/Cervo de Loren.png",
    historia: "Um Cervo misterioso que vive nos bosques do Caminho de Loren. Ele é conhecido por sua beleza e graça, mas também por sua habilidade em se esconder entre as árvores. Dizem que ele é um guardião da floresta e protege os animais selvagens que vivem lá. Quem cruza seu caminho pode sentir uma sensação de paz e tranquilidade, mas também pode ser atacado se for considerado uma ameaça para a floresta."
  },
    {
    nome: "Cavaleiro Kael",
    tipo: "Adversário",
    categoria: "Chefes",
    imagem: "Sol-Assets/Persons/Kael.png",
    historia: "Cavaleiro Kael, O Portador da Cinza, foi um grande Cavaleiro Imperial que se destacou em inúmeras batalhas. No entanto, durante uma missão, ele foi gravemente ferido e acabou sendo infectado por uma doença misteriosa que o transformou em um ser cinzento e sem emoções. Ele então se isolou em uma caverna que acreditava ser inabitada, mas que na verdade era o lar de inúmeras criaturas e pessoas. Ele tentou conter a doença, mas era tarde."
  },
];

// =======================
// 🔓 DESBLOQUEADOS
// =======================

let bestiarioDesbloqueados = [];

onValue(bestiarioRef, (snapshot) => {
  const data = snapshot.val();
  bestiarioDesbloqueados = data || [];
});

// =======================
// 🧿 MASTER
// =======================

const npcMasterBtn = document.querySelector('img[src*="NPC-Master"]');

// começa escondido
npcMasterBtn.style.display = "none";

onUserLoaded((user) => {
  if (user.nome === "Moderador") {
    npcMasterBtn.style.display = "block"; // ou flex
  }
});
npcMasterBtn.addEventListener("click", () => {
  if (!currentUser || currentUser.nome !== "Moderador") return;
  openBestiarioMaster();
});

function openBestiarioMaster() {
  document.body.insertAdjacentHTML("beforeend", `
    <div class="player-menu" id="bestiario-master" onclick="closeBestiarioMaster()">
      <div class="player-select-box" onclick="event.stopPropagation()">

        <h2>Bestiário</h2>

            <div class="bestiario-list">

            ${renderMasterCategoria("NPC")}
            ${renderMasterCategoria("Adversário")}

            </div>

      </div>
    </div>
  `);
}

function renderMasterCategoria(tipo) {
  const lista = bestiarioDB
    .map((n, i) => ({ ...n, index: i }))
    .filter(n => n.tipo === tipo);

  return `
    <div class="bestiario-category">

      <div class="bestiario-header" onclick="toggleBestiarioCat(this)">
        ${tipo} ▾
      </div>

      <div class="bestiario-content">
        ${lista.map(n => `
          <div class="bestiario-item">

            <div class="bestiario-info">
              <strong>${n.nome}</strong>
              <span>${n.categoria}</span>
            </div>

            <button onclick="event.stopPropagation(); toggleBestiario(${n.index})">
              ${isBestiarioUnlocked(n.index) ? "Remover" : "Liberar"}
            </button>

          </div>
        `).join("")}
      </div>

    </div>
  `;
}

function isBestiarioUnlocked(index) {
  return bestiarioDesbloqueados.includes(index);
}

function toggleBestiario(index) {

  let novos;

  if (bestiarioDesbloqueados.includes(index)) {
    novos = bestiarioDesbloqueados.filter(i => i !== index);
  } else {
    novos = [...bestiarioDesbloqueados, index];
  }

  // 🔥 Firebase leve
  set(bestiarioRef, novos);

  // re-render simples
  document.getElementById("bestiario-master").remove();
  openBestiarioMaster();
}
function closeBestiarioMaster() {
  document.getElementById("bestiario-master").remove();
}
function atualizarBotoesMaster() {
  const buttons = document.querySelectorAll("#bestiario-master button");

  buttons.forEach((btn, i) => {
    const npc = bestiarioDB[i];

    if (isBestiarioUnlocked(npc)) {
      btn.textContent = "Remover";
    } else {
      btn.textContent = "Liberar";
    }
  });
}
// =======================
// 🧿 PLAYER
// =======================

const npcPlayerBtn = document.querySelector('img[src*="NPC-Player"]');
npcPlayerBtn.addEventListener("click", openBestiarioPlayer);

function openBestiarioPlayer() {
  document.body.insertAdjacentHTML("beforeend", `
    <div class="player-menu" id="bestiario-player" onclick="closeBestiarioPlayer()">
      <div class="player-select-box" onclick="event.stopPropagation()">

        <h2>Bestiário</h2>

        <div class="bestiario-list">
          ${renderBestiarioCategoria("NPC")}
          ${renderBestiarioCategoria("Adversário")}
        </div>

      </div>
    </div>
  `);
}

function renderBestiarioCategoria(tipo) {
  const subcategorias = {
    NPC: ["Principal", "Secundário", "Império"],
    Adversário: ["Inimigos", "Elite", "Chefes"]
  };

  return `
    <div class="bestiario-category">

      <div class="bestiario-header" onclick="toggleBestiarioCat(this)">
        ${tipo} ▾
      </div>

      <div class="bestiario-content">
        ${subcategorias[tipo].map(sub => renderBestiarioSub(tipo, sub)).join("")}
      </div>

    </div>
  `;
}

function renderBestiarioSub(tipo, sub) {
  const lista = bestiarioDesbloqueados
  .map(i => bestiarioDB[i])
  .filter(n => n.tipo === tipo && n.categoria === sub);

  if (!lista.length) return "";

  return `
    <div class="bestiario-sub">

      <div class="bestiario-sub-header" onclick="toggleBestiarioCat(this)">
        ${sub} ▾
      </div>

      <div class="bestiario-sub-content">
        ${lista.map(n => `
        <div class="bestiario-item" onclick="openBestiarioView('${n.nome}')">

        <div class="bestiario-info">
            <strong>${n.nome}</strong>
        </div>

        </div>
        `).join("")}
      </div>

    </div>
  `;
}

function toggleBestiarioCat(el) {
  el.parentElement.classList.toggle("active");
}

function closeBestiarioPlayer() {
  document.getElementById("bestiario-player").remove();
}

function openBestiarioView(nome) {
  const npc = bestiarioDB.find(n => n.nome === nome);

  document.body.insertAdjacentHTML("beforeend", `
    <div class="player-menu" id="bestiario-view" onclick="closeBestiarioView()">
      <div class="player-box bestiario-view-box" onclick="event.stopPropagation()">

        <img src="${npc.imagem}" class="bestiario-view-img">

        <div class="bestiario-view-info">
        <h2>${npc.nome}</h2>
        <small>${npc.tipo} • ${npc.categoria}</small>

        <p class="bestiario-view-text">
            ${npc.historia}
        </p>
        </div>
    </div>
  `);
}

function closeBestiarioView() {
  document.getElementById("bestiario-view").remove();
}

window.toggleBestiario = toggleBestiario;
window.closeBestiarioMaster = closeBestiarioMaster;
window.closeBestiarioPlayer = closeBestiarioPlayer;
window.openBestiarioView = openBestiarioView;
window.closeBestiarioView = closeBestiarioView;
window.toggleBestiarioCat = toggleBestiarioCat;