// ==========================
// ⚔️ TOGGLE SKILLS / STORAGE
// ==========================

const btnSkills = document.getElementById("btn-skills");
const btnStorage = document.getElementById("btn-storage");

const skillsPanel = document.getElementById("skills-panel");
const storagePanel = document.getElementById("storage-panel");

btnSkills.addEventListener("click", () => {
  btnSkills.classList.add("active");
  btnStorage.classList.remove("active");

  skillsPanel.classList.add("active");
  storagePanel.classList.remove("active");
});

btnStorage.addEventListener("click", () => {
  btnStorage.classList.add("active");
  btnSkills.classList.remove("active");

  storagePanel.classList.add("active");
  skillsPanel.classList.remove("active");
});

// ==========================
// 🌳 SKILL TREE SYSTEM
// ==========================

const skillButtons = document.querySelectorAll(".skills-list button");
const skillTree = document.getElementById("skill-tree");

const skillTitle = document.getElementById("skill-title");
const skillDesc = document.getElementById("skill-desc");
const skillCost = document.getElementById("skill-cost");

// abrir árvore ao clicar na classe
skillButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    console.log("clicou:", btn.textContent);
    skillTree.classList.remove("hidden");

    loadTree(btn.textContent);
  });
});

// ==========================
// 🌳 DADOS DAS SKILLS
// ==========================

const skillData = {
    "Passivas": {
    nodes: [
      { id: 0, name: "Passos Sombra", desc: "Reduz drasticamente chances de ser detectado ao explorar ruínas, florestas ou áreas urbanas. Custa 1 PP.", cost: 2, x: 30, y: 130 },

      { id: 1, name: "Sussurro Natural", desc: "Permite sentir presença de água potável, plantas medicinais ou perigo ambiental. Custa 2 PP.", cost: 3, x: 150, y: 52 },
      { id: 2, name: "Instinto", desc: "Cria mapas mentais precisos automaticamente. Sem Custo.", cost: 2, x: 150, y: 212 },

      { id: 3, name: "Olhos do Arrombador", desc: "Recebe bônus para encontrar passagens secretas, armadilhas e mecanismos ocultos. Custa 1 PP.", cost: 3, x: 310, y: 10 },
      { id: 4, name: "Memória Ancestral", desc: "Ao tocar um objeto antigo ou ruína, pode receber uma visão breve do passado relacionado ao local. Custa 2 PP.", cost: 4, x: 310, y: 90 },

      { id: 5, name: "Improviso", desc: "Permite montar acampamentos seguros rapidamente, reduzindo risco de eventos noturnos negativos. Custa 3 PP.", cost: 2, x: 310, y: 170 },

      { id: 6, name: "Alquimia Prática", desc: "Permite criar itens utilitários simples durante exploração (antídotos fracos, tochas especiais, repelentes). Custa 1 à 3 PP.", cost: 3, x: 310, y: 255 },

      { id: 7, name: "Sensibilidade Arcana", desc: "Detecta magia residual, maldições ambientais ou objetos encantados nas proximidades. Custa 2 PP.", cost: 4, x: 450, y: 52 },
      { id: 8, name: "Leitura de Rastros", desc: "Identifica criaturas que passaram por uma área, direção, número aproximado e tempo decorrido. Custa 1 PP.", cost: 2, x: 450, y: 212 },

      { id: 9, name: "O Navegador", desc: "Recebe bônus em barganhas, coleta de rumores e obtenção de informações durante exploração social. Custa 2 PP.", cost: 3, x: 570, y: 130 },
    ],

    links: [
      [0,1],
      [0,2],
      [1,3],
      [1,4],
      [2,5],
      [2,6],
      [3,7],
      [4,7],
      [5,8],
      [6,8],
      [7,9],
      [8,9],
    ]
  },
        "Guerreiro": {
    nodes: [
      { id: 0, name: "Golpe Brutal", desc: "O Guerreiro ganha 3D4 Adicional caso sua vida esteja acima de 70%. Custa 2 PVg.", cost: 1, x: 30, y: 130 },

      { id: 1, name: "Impacto Quebrante", desc: "O ataque ignora parte da armadura física do alvo. Se acertar estrutura ou escudo, pode danificá-lo. Custa 3 PVg.", cost: 2, x: 150, y: 52 },
      { id: 2, name: "Investida Implacável", desc: "Emite uma Luz que cria ou imbui um escudo e avança na direção do alvo. Causa 2D8 de Dano e o derruba. Custa 3 PVg.", cost: 2, x: 150, y: 212 },

      { id: 3, name: "O Carniceiro", desc: "Permite realizar dois ataques consecutivos. Se o primeiro eliminar o alvo, o segundo pode ser redirecionado. Custa 4PVg.", cost: 3, x: 310, y: 10 },
      { id: 4, name: "Pele de Ferro", desc: "Reduz dano recebido temporariamente. Enquanto ativa, o Guerreiro não pode usar habilidades que usem Mana. Custa 2 PM por turno.", cost: 3, x: 310, y: 90 },

      { id: 5, name: "Grito de Guerra", desc: "Aumenta o dano físico próprio e de aliados próximos por alguns turnos. Custa 2 PM.", cost: 3, x: 310, y: 170 },

      { id: 6, name: "Contra-Ataque Instintivo", desc: "Quando bloqueia ou esquiva com sucesso, pode imediatamente contra-atacar. Custa 4 PVg.", cost: 3, x: 310, y: 255 },

      { id: 7, name: "Executor da Linha de Frente", desc: "Causa dano massivo em alvo com menos de 50% de vida, 5D8 de Dano fora arma. Custa 6 PVg ou 6 PP.", cost: 4, x: 450, y: 52 },
      { id: 8, name: "Fúria Inquebrável", desc: "Entra em estado de Fúria, dobrando dano e velocidade de ataque. Custa 4 PVg por Turno.", cost: 4, x: 450, y: 212 },

      { id: 9, name: "O Último Bastião", desc: "Golpe final devastador em área frontal. Total de 10D12 de Dano + 10. Custa 50% de PVg, PP ou PM.", cost: 5, x: 570, y: 130 },
    ],

    links: [
      [0,1],
      [0,2],
      [1,3],
      [1,4],
      [2,5],
      [2,6],
      [3,7],
      [4,7],
      [5,8],
      [6,8],
      [7,9],
      [8,9],
    ]
  },
        "Tanque": {
    nodes: [
      { id: 0, name: "Postura Defensiva", desc: "Reduz em 4 o dano recebido. Deslocamento inativo até receber o golpe. Custo 2 PVg.", cost: 1, x: 30, y: 130 },

      { id: 1, name: "Provocação Desafiadora", desc: "Provoca um inimigo a atacar o Tanque, caso o inimigo decida atacar o Tanque ao invés de seu alvo inicial, o Tanque tem +3 em Defesa Física como vantagem para bloqueio. Custo 2 PM.", cost: 2, x: 150, y: 52 },
      { id: 2, name: "Escudo Interceptador", desc: "O Tanque pode receber um ataque destinado a um aliado, diferente da Provocação Desafiadora, o Tanque não tentará bloquear o golpe e nem provocar o inimigo, ele saltará na frente do Aliado da melhor maneira que puder. Custa 3 PVg.", cost: 2, x: 150, y: 212 },

      { id: 3, name: "Raiz Inabalável", desc: "Fica imune a empurrões, quedas e deslocamentos forçados por 1 turno. Custa 2 PVg.", cost: 3, x: 310, y: 10 },
      { id: 4, name: "Couraça Espinhosa", desc: "Devolve 50% do dano corpo a corpo recebido. Custa 3 PVg por uso.", cost: 3, x: 310, y: 90 },

      { id: 5, name: "Muralha Coletiva", desc: "Expande seu escudo fazendo com que aliados recebam redução de dano. Custa 4 PM.", cost: 3, x: 310, y: 170 },

      { id: 6, name: "Colosso Impossível", desc: "Reduz em 70% o dano crítico recebido. Ganha resistência de +4 no próximo turno. Custo 4 PVg.", cost: 3, x: 310, y: 255 },

      { id: 7, name: "Julgamento", desc: "Avança usando seu escudo, repelindo ataques e golpeando o chão. Custo 3 PVg ou 3 PP.", cost: 4, x: 450, y: 52 },
      { id: 8, name: "Guardião Absoluto", desc: "Todos os aliados recebem +5 de Defesa Física. O Tanque ganha +8 de Defesa Física. Custo 5 PVg.", cost: 4, x: 450, y: 212 },

      { id: 9, name: "Última Fortaleza", desc: "Cria uma barreira massiva que dura até 3 turnos. Todos os aliados ficam imunes, o Tanque perde 99% da vida ao fim. Recupera 25% se sobreviver no próximo turno. Custa 50% dos PVg.", cost: 5, x: 570, y: 130 },
    ],

    links: [
      [0,1],
      [0,2],
      [1,3],
      [1,4],
      [2,5],
      [2,6],
      [3,7],
      [4,7],
      [5,8],
      [6,8],
      [7,9],
      [8,9],
    ]
  },
        "Mago": {
    nodes: [
      { id: 0, name: "Faísca Arcana", desc: "Projétil mágico de energia. Causa 2D4 de dano mágico. Custa 1 PM.", cost: 1, x: 30, y: 130 },

      { id: 1, name: "Corte de Arcano", desc: "Cria um escudo mágico temporário que absorve o 30% do dano. Custa 3 PM.", cost: 2, x: 150, y: 52 },
      { id: 2, name: "Marcado", desc: "Marca um alvo. Magias lançadas contra ele causam +4 de dano ou amplia em 1 turno um efeito. Custa 3 PM.", cost: 2, x: 150, y: 212 },

      { id: 3, name: "Explosão Prismática", desc: "Explosão mágica em pequena área. Causa 3D6 de dano mágico. Custa 4 PM.", cost: 3, x: 310, y: 10 },
      { id: 4, name: "Distorção do Véu", desc: "Teleporte curto de até 10 metros. Custo 4 PM.", cost: 3, x: 310, y: 90 },

      { id: 5, name: "Canalização Profunda", desc: "Recupera 2 PM durante o combate. Enquanto ativa, o mago fica vulnerável. Custo 2PVg por uso.", cost: 3, x: 310, y: 170 },

      { id: 6, name: "Chuva Astral", desc: "Invoca fragmentos arcanos que atingem múltiplos inimigos em linha reta causando 5D8 de dano mágico. Pode se mover. Custo 6 PM.", cost: 3, x: 310, y: 255 },

      { id: 7, name: "Essência Perdida", desc: "Escolhe um efeito para ativar, sendo maior alcance mágico, reduzir o custo da mágia em 50% e ignorar 50% de resistência mágica. Dura 2 turnos. Custa 4 PM e 2 PP.", cost: 4, x: 450, y: 52 },
      { id: 8, name: "Obliteração", desc: "Abre uma fissura arcana que causa dano massivo de 10D6 de dano em área ampla. Muda o terreno temporariamente. 8 PM + 4 PV.", cost: 4, x: 450, y: 212 },

      { id: 9, name: "Ascensão Arcana", desc: "Por 3 Turnos magias não consomem PM, ignora-se resistência mágica e não pode ser contra-atacado. Após o efeito fica exausto, PV cai 10% e não pode conjurar por 1 turno. Custa 50% do PM.", cost: 5, x: 570, y: 130 },
    ],

    links: [
      [0,1],
      [0,2],
      [1,3],
      [1,4],
      [2,5],
      [2,6],
      [3,7],
      [4,7],
      [5,8],
      [6,8],
      [7,9],
      [8,9],
    ]
  },
        "Bardo": {
    nodes: [
      { id: 0, name: "Nota Estática", desc: "Dispara uma nota carregada que causa dano elétrico 2D6. Custo 1 PM.", cost: 1, x: 30, y: 130 },

      { id: 1, name: "Acorde Vibrante", desc: "O próximo ataque elétrico causa 50% do dano em mais um inimigo. 3 PM.", cost: 2, x: 150, y: 52 },
      { id: 2, name: "Ritmo Condutor", desc: "Aliados próximos causam +6 em dano elétrico adicional. Custa 2 PM.", cost: 2, x: 150, y: 212 },

      { id: 3, name: "Pulso Trovejante", desc: "Explosão sonora em área curta que atordoa inimigos por 1 turno. Custa 4 PM.", cost: 3, x: 310, y: 10 },
      { id: 4, name: "Solo Tempestuoso", desc: "Canaliza por 1 turno, e invoca um raio concentrado no próximo. Causando 5D6 de Dano. Custa 5 PM.", cost: 3, x: 310, y: 90 },

      { id: 5, name: "Harmonia", desc: "Cria uma zona onde inimigos recebem dano elétrico e dificultam seu movimento dura 1D4 de turnos. Causa 1D6 de dano a cada turno mantido. Custo 3 PM.", cost: 3, x: 310, y: 170 },

      { id: 6, name: "Tempestade", desc: "A cada turno ativo, o dano elétrico aumenta progressivamente. Se atacado, o dano dobra na próxima rodada e o efeito é interrompido. Custa 5 PM e 1 PP.", cost: 3, x: 310, y: 255 },

      { id: 7, name: "Orquestra dos Céus", desc: "Invoca múltimos relâmpagos aleatórios em uma área. Cada raio causa 2D6 de dano, e é girado um total de 2D6 para raios. Custo 6 PM.", cost: 4, x: 450, y: 52 },
      { id: 8, name: "Fulguração", desc: "Explosão elétrica massiva em área. Inimigos atingidos ficam com condição 'Charge' e recebem +1D6 de dano elétrico e aumenta progressivamente. A condição só acaba se não for atingido por nenhum golpe elétrico. Custa 8 PM + 4 PVg.", cost: 4, x: 450, y: 212 },

      { id: 9, name: "Apoteose", desc: "Por 3 turnos, causa X2 em todo ataque elétrico. Pode se teleportar 1x por turno como salto elétrico causando 1D6 perto de um inimigo. O PV cai 30% e o instrumento fica inutilizado até reparo. Custa 50% do PM.", cost: 5, x: 570, y: 130 },
    ],

    links: [
      [0,1],
      [0,2],
      [1,3],
      [1,4],
      [2,5],
      [2,6],
      [3,7],
      [4,7],
      [5,8],
      [6,8],
      [7,9],
      [8,9],
    ]
  },
        "Devoto": {
    nodes: [
      { id: 0, name: "Centelha de Fé", desc: "Dispara um projétil de luz sagrada que causa 2D6 de dano sagrado. +2 contra mortos-vivos. Custo 1 PM.", cost: 1, x: 30, y: 130 },

      { id: 1, name: "Toque Restaurador", desc: "Cura um aliado ou a si mesmo em 2D8 + 4. Se usado fora de combate ganha x2. 3 PM.", cost: 2, x: 150, y: 52 },
      { id: 2, name: "Escudo da Devoção", desc: "Concede a si ou a um aliado um escudo divino que absorve 3D6 de dano. Dura 2 turnos. Custa 2 PM.", cost: 2, x: 150, y: 212 },

      { id: 3, name: "Marca do Julgamento", desc: "Marca um inimigo por 3 turnos. Ataques contra ele causam +1D6 de dano sagrado. Se o alvo morrer sob a marca, o Devoto recupera 1 PM. Custa 4 PM.", cost: 3, x: 310, y: 10 },
      { id: 4, name: "Chama Purificadora", desc: "Invoca fogo sagrado em área média. Causa 4D6 de dano e remove efeitos negativos na área. Custa 5 PM.", cost: 3, x: 310, y: 90 },

      { id: 5, name: "Voto de Sacrifício", desc: "O Devoto transfere até 30% do próprio PV para curar um aliado em dobro do valor sacrificado. Se ele chegar a 0, termina o efeito em 1. Custo 3 PM.", cost: 3, x: 310, y: 170 },

      { id: 6, name: "Lança Solar", desc: "Arremessa uma lança de luz concentrada que causa 5D6 de dano. Se atingir um morto-vivo ou criatura das trevas causa +2D6. Custa 5 PM e 1 PP.", cost: 3, x: 310, y: 255 },

      { id: 7, name: "Aura da Graça", desc: "Cria uma aura ao redor do Devoto por 1D4 de turnos. Aliados recuperam 1D6 de PV a cada turno dentro da área. Recebem resistência contra maldição e medo. Custo 6 PM.", cost: 4, x: 450, y: 52 },
      { id: 8, name: "Ira dos Céus", desc: "Explosão divina ao redor do Devoto. Causa 6D6 de dano sagrado em área curta e empurra inimigos. Custa 7 PM + 2 PVg.", cost: 4, x: 450, y: 212 },

      { id: 9, name: "Ascensão do Mártir", desc: "Por 3 turnos. Todo dano sagrado é dobrado. Cura aliados em 2D6 por turno. Não pode cair abaixo de 1 de PV. Ao final do Efeito perde 40% da vida e fica exausto. Custa 50% do PM.", cost: 5, x: 570, y: 130 },
    ],

    links: [
      [0,1],
      [0,2],
      [1,3],
      [1,4],
      [2,5],
      [2,6],
      [3,7],
      [4,7],
      [5,8],
      [6,8],
      [7,9],
      [8,9],
    ]
  },
        "Profanador": {
    nodes: [
      { id: 0, name: "Escarro", desc: "Dispara um projétil de energia corrupta que causa 2D6 de dano profano. Se atingir um alvo sagrado causa 1D6 adicional. Custo 1 PM.", cost: 1, x: 30, y: 130 },

      { id: 1, name: "Mancha", desc: "Marca um inimigo por 3 turnos. Ele recebe -2 em testes de resistência e sofre 1D4 de dano por turno. 3 PM.", cost: 2, x: 150, y: 52 },
      { id: 2, name: "Roubo de Essência", desc: "Causa 2D8 de dano profano e cura o profanador em metade do dano causado. Se estiver marcado, a cura é total. Custa 2 PM.", cost: 2, x: 150, y: 212 },

      { id: 3, name: "Quebra de Juramento", desc: "Dissipa efeitos sagrados ou milagres ativos em um alvo ou área curta. Alvos afetados sofrem 2D6 de dano. Custa 4 PM.", cost: 3, x: 310, y: 10 },
      { id: 4, name: "Chama Negra", desc: "Invoca fogo profano em área média. Causa 4D6 de dano profano e aplica 'Corrupção' por 2 turnos (+1D6 de dano profano) Custa 5 PM.", cost: 3, x: 310, y: 90 },

      { id: 5, name: "Pacto Impuro", desc: "O Profanador sacrifica 15% do PV para ganhar +2D6 de dano em seus ataques por 3 turnos. Custo 3 PM.", cost: 3, x: 310, y: 170 },

      { id: 6, name: "Corrupção", desc: "Área de decadência ao redor do Profanador por 1D4 de turnos. Inimigos sofrem 1D6 por turno e tem redução de cura. Custa 5 PM e 1 PP.", cost: 3, x: 310, y: 255 },

      { id: 7, name: "Invocação do Abismo", desc: "Rasga o solo e invoca tentáculos sombrios que causam 5D6 de dano e imobilizam o alvo por 1 turno. Custo 6 PM.", cost: 4, x: 450, y: 52 },
      { id: 8, name: "Profanação", desc: "Explosão profana em área curta. Causa 6D6 de dano profano. Remove todos os efeitos ativos e transforma em cura recebida por 1 turno. Custa 8 PM + 4 PVg.", cost: 4, x: 450, y: 212 },

      { id: 9, name: "Profanação do Herege", desc: "Por 3 turnos, todo dano profano é dobrado. Cura recebida se converte em dano aos inimigos próximos. Inimigos em área sofrem medo (-2 em Testes) ao fim, o Profanador perde 40% da vida e sofre 1 turno de fraqueza (-2 em tudo). Custa 50% do PM.", cost: 5, x: 570, y: 130 },
    ],

    links: [
      [0,1],
      [0,2],
      [1,3],
      [1,4],
      [2,5],
      [2,6],
      [3,7],
      [4,7],
      [5,8],
      [6,8],
      [7,9],
      [8,9],
    ]
  },
        "Vagante": {
    nodes: [
      { id: 0, name: "Sentido da Mata", desc: "O Vagante aguça seus sentidos naturais por 3 turnos. Ganha +2 em Percepção e pode detectar a presença de criaturas próximas, mesmo escondidas ou camufladas. Custo 1 PM.", cost: 1, x: 30, y: 130 },

      { id: 1, name: "Raízes Prisioneiras", desc: "Raízes emergem do solo e prendem um inimigo por 1 turno. O alvo sofre 1D6 de dano natural e deve passar em um teste de Força para se libertar. Custo 2 PM.", cost: 2, x: 150, y: 52 },
      { id: 2, name: "Forma da Onça", desc: "O Vagante assume a Forma da Onça por 3 turnos. Ganha +2 em Agilidade, ataques causam 2D6 de dano natural e possui vantagem em perseguições e mobilidade. Custo 2 PM.", cost: 2, x: 150, y: 212 },

      { id: 3, name: "Juramento Selvagem", desc: "O Vagante reforça seu juramento com os espíritos da floresta. Por 3 turnos ganha +2 em Defesa e aliados próximos recebem +1 em testes de resistência. Custo 3 PM.", cost: 3, x: 310, y: 10 },
      { id: 4, name: "Forma do Wyvern", desc: "O Vagante assume a forma de um Wyvern Selvagem por 3 turnos. Ganha +3 em Resistência, ataques causam 3D6 de dano, recebe redução de dano e pode realizar investidas aéreas curtas. Custo 4 PM.", cost: 3, x: 310, y: 90 },

      { id: 5, name: "Julgamento da Natureza", desc: "O Vagante invoca a força sagrada da floresta contra um inimigo. Causa 3D8 de dano avançado/fé. Se o alvo tiver causado dano a um aliado no turno anterior, sofre +1D8 adicional. Custo 3 PM.", cost: 3, x: 310, y: 170 },

      { id: 6, name: "Forma do Corvo", desc: "Transformação em Corvo Sombrio por 3 turnos. Pode voar, possui vantagem em furtividade e seus ataques causam 2D6 de dano. Custo 4 PM.", cost: 3, x: 310, y: 255 },

      { id: 7, name: "Guardião do Bosque", desc: "Invoca espíritos da floresta que protegem uma área média por 2 turnos. Aliados recuperam 1D6 de vida por turno e inimigos sofrem 1D6 de dano natural por turno. Custo 5 PM.", cost: 4, x: 450, y: 52 },
      { id: 8, name: "Avatar da Mata", desc: "O Vagante assume uma forma híbrida sagrada e bestial por 3 turnos. Ganha +2 em todos os atributos físicos, ataques causam 4D6 de dano natural/sagrado e recupera 1D6 de vida por turno. Custo 7 PM.", cost: 4, x: 450, y: 212 },

      { id: 9, name: "Fera Ancestral", desc: "Invoca o poder primordial da floresta por 3 turnos. Pode alternar entre formas animais sem custo, ataques causam dano dobrado. Ao terminar sofre exaustão: não pode agir por 1 rodada e na seguinte só pode se mover. Custo 50% do PM.", cost: 5, x: 570, y: 130 },
    ],

    links: [
      [0,1],
      [0,2],
      [1,3],
      [1,4],
      [2,5],
      [2,6],
      [3,7],
      [4,7],
      [5,8],
      [6,8],
      [7,9],
      [8,9],
    ]
  },
  "Piromante": {
    nodes: [
      { id: 0, name: "Faísca Ígnea", desc: "Marca o alvo com uma centelha viva. No próximo turno do Piromante, a marca explode causando 1D6 de dano de fogo. Custa 1 PM.", cost: 1, x: 30, y: 130 },

      { id: 1, name: "Labareda Saltitante", desc: "Lança uma chama instável que ricocheteia entre inimigos próximos até 3 vezes. Cada salto reduz o dano em 25%. Causa 1D8/6/4 de dano. Custa 3 PM.", cost: 2, x: 150, y: 52 },
      { id: 2, name: "Aura Incandescente", desc: "O corpo do Piromante irradia calor intenso por 2 turnos. Aumenta em 2D4 todo dano de fogo por turno. Dura 2 Turnos. Custa 2 PM.", cost: 2, x: 150, y: 212 },

      { id: 3, name: "Explosão Ardente", desc: "O Piromante colapsa o ar ao redor, criando uma detonação ígnea em área curta. Pode incendiar objetos. Causa 3D4 de dano. Custa 4 PM.", cost: 3, x: 310, y: 10 },
      { id: 4, name: "Coluna Vulcânica", desc: "Abre fissuras no chão sob o alvo, liberrando magma por 1 turno. Causando 5D6 de Dano. Custa 5 PM.", cost: 3, x: 310, y: 90 },

      { id: 5, name: "Círculo das Cinzas", desc: "Conjura um anel de cinzas giratórias ao redor de uma área escolhida. Dura 1D4 de turnos. Causa 1D6/8/10 de dano a cada turno mantido. Custo 3 PM.", cost: 3, x: 310, y: 170 },

      { id: 6, name: "Combustão Crescente", desc: "Toda vez que o Piromante causa dano de fogo, acumula Combustão. Ao atingir 3 cargas, pode consumir o fogo. Dobrando o dano no próximo turno. Custa 5 PM e 1 PP.", cost: 3, x: 310, y: 255 },

      { id: 7, name: "Chuva de Meteoros", desc: "Fragmentos Flamejantes caem em pontos aleatórios da área escolhida durante 2 turnos. Cada Fragmento causa 1D6 de dano e pode atingir até 3 vezes durante o turno. Custo 6 PM.", cost: 4, x: 450, y: 52 },
      { id: 8, name: "Inferno Carmesim", desc: "O Piromante convoca um turbilhão carmesim que consome o ar. Causando Asfixia por calor, sofrendo dano contínuo de 2D8. O efeito persiste por 5 turnos. Custa 8PM + 4 PVg.", cost: 4, x: 450, y: 212 },

      { id: 9, name: "Avatar da Fênix", desc: "O Piromante assume uma forma flamejante ancestral por 3 turnos. Torna-se imune a dano de fogo, ao zerar o PV, renasce com 70% do PV. Cada feitiço passa a consumir 2 de PV também. Todo feitiço ganha +3D12 de dano. Custa 50% do PM total.", cost: 5, x: 570, y: 130 },
    ],

    links: [
      [0,1],
      [0,2],
      [1,3],
      [1,4],
      [2,5],
      [2,6],
      [3,7],
      [4,7],
      [5,8],
      [6,8],
      [7,9],
      [8,9],
    ]
  }
};

// ==========================
// 🌳 ELEMENTOS
// ==========================

const treeArea = document.getElementById("tree-area");

// ==========================
// 🌳 GERAR ÁRVORE
// ==========================

function loadTree(className) {
  treeArea.innerHTML = "";

  const data = skillData[className];
  if (!data) return;

  const nodeElements = {};

  // 🧱 CRIAR NODES
  data.nodes.forEach(skill => {
    const node = document.createElement("div");
    node.classList.add("node");

    node.style.left = skill.x + "px";
    node.style.top = skill.y + "px";

    node.textContent = skill.name;

    node.dataset.id = skill.id;

    node.addEventListener("click", () => {
      skillTitle.textContent = skill.name;
      skillDesc.textContent = skill.desc;
      skillCost.textContent = "Custo: " + skill.cost;
    });

    treeArea.appendChild(node);
    nodeElements[skill.id] = node;
  });

  // 🔗 CRIAR LINHAS (AGORA CERTO)
requestAnimationFrame(() => {
  data.links.forEach(([from, to]) => {
    const n1 = nodeElements[from];
    const n2 = nodeElements[to];

    const rect1 = n1.getBoundingClientRect();
    const rect2 = n2.getBoundingClientRect();
    const parentRect = treeArea.getBoundingClientRect();

    const x1 = rect1.left - parentRect.left + rect1.width / 2;
    const y1 = rect1.top - parentRect.top + rect1.height / 2;

    const x2 = rect2.left - parentRect.left + rect2.width / 2;
    const y2 = rect2.top - parentRect.top + rect2.height / 2;

    const length = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    const line = document.createElement("div");
    line.classList.add("line");

    line.style.width = length + "px";
    line.style.left = x1 + "px";
    line.style.top = y1 + "px";
    line.style.transform = `rotate(${angle}deg)`;

    treeArea.appendChild(line);
  });
});
}

loadTree("Passivas");
skillTree.classList.remove("hidden");