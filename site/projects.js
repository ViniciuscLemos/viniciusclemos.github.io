// Everything the page shows about each project lives here, so adding one is a new entry
// and nothing else. `tags` drive the filter, `stack` is what shows on the card.

export const FEATURED = [
  {
    id: 'booking-system',
    name: 'booking-system',
    tagline: 'Online booking for a barbershop or a clinic',
    description:
      'The rules are the point: lunch breaks, clean-up time between clients, a team with their own hours, and a Postgres constraint so two people never get the same time, even clicking at the same moment. The owner gets a waiting list, reminders and the month in numbers.',
    highlights: [
      'A database exclusion constraint makes double booking impossible, not just unlikely',
      'Free times come from the same check that accepts a booking, so they always agree',
      'Calendar file (.ics) with reminders for the client, a waiting list and no-show history',
    ],
    stack: ['Java 21', 'Spring Boot 4', 'PostgreSQL'],
    tags: ['java', 'web'],
    image: 'img/booking-system.webp',
    alt: 'Booking a haircut: the days with how many free times each, and the free times of the day picked',
    live: 'https://booking-system-j7po.onrender.com',
    repo: 'https://github.com/ViniciuscLemos/booking-system',
    pt: {
      tagline: 'Agendamento online pra barbearia ou clínica',
      description: 'O foco são as regras: horário de almoço, tempo de limpeza entre clientes, uma equipe com horários próprios e uma restrição no Postgres pra duas pessoas nunca ficarem com o mesmo horário, nem clicando no mesmo instante. O dono tem lista de espera, lembretes e o mês em números.',
      highlights: [
        'Uma restrição de exclusão no banco torna o agendamento duplo impossível, não só improvável',
        'Os horários livres saem da mesma checagem que aceita o agendamento, então sempre batem',
        'Arquivo de calendário (.ics) com lembretes pro cliente, lista de espera e histórico de faltas',
      ],
      alt: 'Marcando um corte: os dias com quantos horários livres cada um e os horários do dia escolhido',
    },
  },
  {
    id: 'trail',
    name: 'trail',
    tagline: 'A link shortener that tells you who clicked',
    description:
      'Clicks per day and per hour, where they came from, phone or computer. Links can have a password or an end date, a QR code in a brand color, or be made fifty at a time from a spreadsheet. Bots and link previews don’t count.',
    highlights: [
      'Clicks go to the database in batches, so the redirect never waits for an insert',
      'Link previews from WhatsApp, Slack and friends are told apart from people',
      'Password-protected links with scrypt hashes and a limit on tries',
    ],
    stack: ['TypeScript', 'Fastify', 'PostgreSQL'],
    tags: ['typescript', 'web'],
    image: 'img/trail.webp',
    alt: 'trail: the clicks of one short link per day, where they came from, device and browser',
    live: 'https://trail-sfqz.onrender.com',
    repo: 'https://github.com/ViniciuscLemos/url-shortener',
    pt: {
      tagline: 'Um encurtador de links que conta quem clicou',
      description: 'Cliques por dia e por hora, de onde vieram, celular ou computador. Os links podem ter senha ou data pra expirar, um QR code na cor da marca, ou ser criados cinquenta de uma vez a partir de uma planilha. Robôs e prévias de link não contam.',
      highlights: [
        'Os cliques vão pro banco em lotes, então o redirecionamento nunca espera um insert',
        'Prévias de link do WhatsApp, Slack e afins são separadas de gente de verdade',
        'Links com senha, hash scrypt e limite de tentativas',
      ],
      alt: 'trail: os cliques de um link curto por dia, de onde vieram, aparelho e navegador',
    },
  },
  {
    id: 'expense-tracker',
    name: 'expense-tracker',
    tagline: 'The month’s money told in plain sentences',
    description:
      'Budgets, goals, the year at a glance and bills split with a flatmate. It reads the bank’s CSV statement, suggests which bills should be automatic, and keeps working with no signal.',
    highlights: [
      'Entries written offline wait in the browser and go once, never twice',
      'Reads Nubank, Inter and most bank CSVs, guessing the category of each line',
      'Half of an expense can be someone else’s, and a page keeps who owes what',
    ],
    stack: ['React', 'FastAPI', 'PostgreSQL'],
    tags: ['python', 'web'],
    image: 'img/expense-tracker.webp',
    alt: 'Marina’s November: a few sentences about the month, what came in and went out, and the budgets',
    live: 'https://expense-tracker-qm7l.onrender.com',
    repo: 'https://github.com/ViniciuscLemos/expense-tracker',
    pt: {
      tagline: 'O dinheiro do mês contado em frases',
      description: 'Orçamentos, metas, o ano num relance e contas divididas com quem mora junto. Lê o CSV do extrato do banco, sugere quais contas deveriam ser automáticas e continua funcionando sem sinal.',
      highlights: [
        'Lançamentos feitos offline esperam no navegador e vão uma vez só, nunca duas',
        'Lê o CSV do Nubank, do Inter e da maioria dos bancos, chutando a categoria de cada linha',
        'Metade de um gasto pode ser de outra pessoa, e uma página guarda quem deve o quê',
      ],
      alt: 'O novembro da Marina: algumas frases sobre o mês, o que entrou e saiu, e os orçamentos',
    },
  },
  {
    id: 'shortlist',
    name: 'shortlist',
    tagline: 'A resume against a job ad, in the browser',
    description:
      'Paste a resume and a job ad: what they require, the line of the resume that shows each one, what’s missing and how to show it, which saved ad fits best, and a cover letter to start from. PDF and Word included, nothing leaves the browser.',
    highlights: [
      'A skill dictionary instead of AI on purpose: instant, and you can see why it said so',
      'Required, mentioned or a plus, read from how the ad is laid out',
      'Every version of the resume scored against the same ad',
    ],
    stack: ['React', 'TypeScript', 'no server'],
    tags: ['typescript', 'web'],
    image: 'img/shortlist.webp',
    alt: 'A resume against a job ad: 81 out of 100, what they require and what is missing',
    live: 'https://viniciusclemos.github.io/shortlist/',
    repo: 'https://github.com/ViniciuscLemos/shortlist',
    pt: {
      tagline: 'Um currículo contra uma vaga, no navegador',
      description: 'Cole o currículo e o anúncio: o que pedem, a linha do currículo que mostra cada coisa, o que falta e como mostrar, qual vaga salva combina mais, e uma carta de apresentação pra começar. Aceita PDF e Word, e nada sai do navegador.',
      highlights: [
        'Um dicionário de habilidades em vez de IA, de propósito: instantâneo, e dá pra ver por que ele disse aquilo',
        'Obrigatório, mencionado ou diferencial, lido pela forma como o anúncio é organizado',
        'Cada versão do currículo ganha nota contra a mesma vaga',
      ],
      alt: 'Um currículo contra uma vaga: 81 de 100, o que pedem e o que falta',
    },
  },
  {
    id: 'online-store',
    name: 'online-store',
    tagline: 'A full e-commerce, hard parts included',
    description:
      'Stripe payments, email confirmation, password reset, stock that can’t oversell and an admin panel. The biggest thing I’ve built, with integration and end-to-end tests.',
    highlights: [
      'The payment is confirmed by Stripe’s webhook, never by the browser',
      'Two people buying the last unit at once: one gets it, the other is told',
      'Money in cents everywhere, so nothing is ever a cent off',
    ],
    stack: ['TypeScript', 'React', 'PostgreSQL', 'Stripe'],
    tags: ['typescript', 'web'],
    image: 'img/online-store.webp',
    alt: 'The online store’s shop page',
    live: 'https://online-store-6ogi.onrender.com',
    repo: 'https://github.com/ViniciuscLemos/online-store',
    pt: {
      tagline: 'Um e-commerce completo, com as partes difíceis',
      description: 'Pagamento com Stripe, confirmação de email, troca de senha, estoque que não vende o que não tem e painel de admin. O maior projeto que já fiz, com testes de integração e de ponta a ponta.',
      highlights: [
        'O pagamento é confirmado pelo webhook do Stripe, nunca pelo navegador',
        'Duas pessoas comprando a última unidade ao mesmo tempo: uma leva, a outra é avisada',
        'Dinheiro em centavos em todo lugar, então nada fica um centavo errado',
      ],
      alt: 'A página da loja online',
    },
  },
  {
    id: 'minecraft-ai-agent',
    name: 'minecraft-ai-agent',
    tagline: 'A bot that plays Minecraft from plain text',
    description:
      'You ask in plain words, an AI plans the steps and tested skills do the work: wood, tools, stone, glass and a whole farmhouse in about 30 minutes, on your own server.',
    highlights: [
      'The AI only picks from skills that have tests, so a plan can’t invent moves',
      'CI starts a real Minecraft server and plays whole scenarios',
      'Chat commands for when you don’t want the AI: !craft, !mine, !build',
    ],
    stack: ['TypeScript', 'mineflayer', 'LLM'],
    tags: ['typescript', 'ai'],
    image: 'img/minecraft-ai-agent.webp',
    alt: 'The bot finishing a farmhouse block by block, with its log beside it',
    repo: 'https://github.com/ViniciuscLemos/minecraft-ai-agent',
    pt: {
      tagline: 'Um bot que joga Minecraft a partir de texto',
      description: 'Você pede com palavras, uma IA planeja os passos e habilidades testadas fazem o trabalho: madeira, ferramentas, pedra, vidro e uma casa de fazenda inteira em uns 30 minutos, no seu próprio servidor.',
      highlights: [
        'A IA só escolhe entre habilidades que têm testes, então o plano não inventa movimento',
        'O CI sobe um servidor de Minecraft de verdade e joga cenários inteiros',
        'Comandos de chat pra quando você não quer a IA: !craft, !mine, !build',
      ],
      alt: 'O bot terminando uma casa de fazenda bloco por bloco, com o log ao lado',
    },
  },
  {
    id: 'overlog',
    name: 'overlog',
    tagline: 'The gym log I use myself',
    description:
      'Weight, reps and RIR on every set, what to lift next time, unlimited workouts and it works offline. Installable on the phone, no account, no ads. Still in progress.',
    highlights: [
      'Double progression decides the next weight, with RIR for the edge cases',
      'Everything stays on the phone (IndexedDB), with a backup file to move it',
      'Search in Portuguese finds exercises that only have an English name',
    ],
    stack: ['React', 'TypeScript', 'PWA'],
    tags: ['typescript', 'web'],
    image: 'img/overlog.webp',
    alt: 'Overlog: logging a set, editing a workout and the progress chart',
    live: 'https://viniciusclemos.github.io/overlog/',
    repo: 'https://github.com/ViniciuscLemos/overlog',
    pt: {
      tagline: 'O app de treino que eu mesmo uso',
      description: 'Peso, repetições e RIR em cada série, o que levantar no próximo treino, treinos sem limite e funciona offline. Instala no celular, sem conta e sem anúncio. Ainda em construção.',
      highlights: [
        'Progressão dupla decide o próximo peso, com o RIR pros casos no limite',
        'Tudo fica no celular (IndexedDB), com um arquivo de backup pra levar pra outro',
        'A busca em português acha exercícios que só têm nome em inglês',
      ],
      alt: 'Overlog: registrando uma série, editando um treino e o gráfico de evolução',
    },
    status: 'in progress',
  },
  {
    id: 'weather-now',
    name: 'weather-now',
    tagline: 'Weather for any city, nicely',
    description:
      'Now, the next hours, the week and air quality, with animated icons, a dark mode and times always in the city’s own timezone. The one I enjoyed building the most.',
    highlights: [
      'Icons drawn in SVG that stop moving when the system asks for less motion',
      'A server in the middle caches by place and keeps the API key out of the page',
      'End-to-end tests with an accessibility check on every page',
    ],
    stack: ['React', 'Node.js', 'Playwright'],
    tags: ['javascript', 'web'],
    image: 'img/weather-now.webp',
    alt: 'Weather Now showing the forecast',
    live: 'https://clima-agora-g5jz.onrender.com',
    repo: 'https://github.com/ViniciuscLemos/weather-now',
    pt: {
      tagline: 'O tempo de qualquer cidade, bonito',
      description: 'Agora, as próximas horas, a semana e a qualidade do ar, com ícones animados, modo escuro e horários sempre no fuso da cidade. O que eu mais curti fazer.',
      highlights: [
        'Ícones desenhados em SVG que param de mexer quando o sistema pede menos movimento',
        'Um servidor no meio guarda em cache por lugar e mantém a chave da API fora da página',
        'Testes de ponta a ponta com checagem de acessibilidade em toda página',
      ],
      alt: 'Weather Now mostrando a previsão',
    },
  },
  {
    id: 'price-watch',
    name: 'price-watch-n8n',
    tagline: 'Steam sale alerts every morning',
    description:
      'n8n checks the games on my list (in R$) and sends the deals to Discord, my phone or WhatsApp, saying when one is at the lowest price it has seen.',
    highlights: [
      'CI runs the real n8n workflow against a fake Steam',
      'Watches a Steam wishlist too, not just a file',
      'A small page with each game’s price history as a sparkline',
    ],
    stack: ['n8n', 'Python', 'Docker'],
    tags: ['python', 'automation'],
    image: 'img/price-watch.webp',
    alt: 'The n8n workflow after a run, sending deals to Discord, the phone and WhatsApp',
    repo: 'https://github.com/ViniciuscLemos/price-watch-n8n',
    pt: {
      tagline: 'Alertas de promoção da Steam toda manhã',
      description: 'O n8n confere os jogos da minha lista (em R$) e manda as promoções pro Discord, pro celular ou pro WhatsApp, avisando quando um está no menor preço que já viu.',
      highlights: [
        'O CI roda o workflow de verdade do n8n contra uma Steam falsa',
        'Acompanha uma lista de desejos da Steam também, não só um arquivo',
        'Uma página com o histórico de preço de cada jogo num minigráfico',
      ],
      alt: 'O workflow do n8n depois de rodar, mandando promoções pro Discord, celular e WhatsApp',
    },
  },
  {
    id: 'recon',
    name: 'recon',
    tagline: 'Reverse engineering for unknown binaries',
    description:
      'Reads PE and ELF files, disassembles the x86-64 code, rebuilds who calls whom and shows which functions changed between two versions, even with every name stripped out.',
    highlights: [
      'Finds main in a stripped binary from the compiler’s startup code',
      'Diff down to the function: same code at another address still matches',
      'Tested on Windows’ own binaries and on broken files',
    ],
    stack: ['Python', 'Capstone', 'LIEF'],
    tags: ['python'],
    image: 'img/recon.webp',
    alt: 'Call graph RECON rebuilt from a binary with no function names',
    repo: 'https://github.com/ViniciuscLemos/recon',
    pt: {
      tagline: 'Engenharia reversa de executáveis desconhecidos',
      description: 'Lê arquivos PE e ELF, desmonta o código x86-64, refaz quem chama quem e mostra quais funções mudaram entre duas versões, mesmo com todos os nomes apagados.',
      highlights: [
        'Acha o main num executável sem símbolos pelo código de inicialização do compilador',
        'Diff até o nível da função: o mesmo código em outro endereço ainda bate',
        'Testado nos próprios executáveis do Windows e em arquivos quebrados',
      ],
      alt: 'Grafo de chamadas que o RECON refez de um executável sem nomes de função',
    },
    status: 'paused',
  },
];

// the filter buttons, in this order, with their label in English and Portuguese;
// a project shows under every tag it has
export const TAGS = [
  ['all', 'All', 'Todos'],
  ['web', 'Web apps', 'Apps web'],
  ['typescript', 'TypeScript', 'TypeScript'],
  ['java', 'Java', 'Java'],
  ['python', 'Python', 'Python'],
  ['ai', 'AI', 'IA'],
  ['automation', 'Automation', 'Automação'],
];

export const MORE = [
  { name: 'task-api-nodejs', what: 'Task API with JWT login and interactive Swagger docs', whatPt: 'API de tarefas com login JWT e documentação Swagger interativa', stack: 'Node, Express, PostgreSQL', repo: 'https://github.com/ViniciuscLemos/task-api-nodejs' },
  { name: 'banking-system-java', what: 'A bank in the terminal: transfers inside a DB transaction, CPF validation', whatPt: 'Um banco no terminal: transferências dentro de uma transação, validação de CPF', stack: 'Java, SQLite', repo: 'https://github.com/ViniciuscLemos/banking-system-java' },
  { name: 'webscraper-python', what: 'Book scraper that saves to PostgreSQL or CSV and builds an HTML gallery', whatPt: 'Scraper de livros que salva no PostgreSQL ou em CSV e monta uma galeria HTML', stack: 'Python, BeautifulSoup', repo: 'https://github.com/ViniciuscLemos/webscraper-python' },
  { name: 'csv-analyzer-python', what: 'Reads a sales CSV and builds a report with SQL', whatPt: 'Lê um CSV de vendas e monta um relatório com SQL', stack: 'Python, SQLite', repo: 'https://github.com/ViniciuscLemos/csv-analyzer-python' },
  { name: 'sentinel', what: 'Says why a suspicious message is (or isn’t) a scam. Paused', whatPt: 'Diz por que uma mensagem suspeita é (ou não é) golpe. Pausado', stack: 'Java, Spring', repo: 'https://github.com/ViniciuscLemos/sentinel' },
  { name: 'battleship-java', what: 'Battleship against a computer that hunts in lines', whatPt: 'Batalha naval contra um computador que caça em linha', stack: 'Java', repo: 'https://github.com/ViniciuscLemos/battleship-java' },
  { name: 'library-manager-c', what: 'Library system with reports and a binary data file', whatPt: 'Sistema de biblioteca com relatórios e arquivo binário de dados', stack: 'C', repo: 'https://github.com/ViniciuscLemos/library-manager-c' },
  { name: 'todo-list', what: 'One of my first projects: a to-do list for the terminal', whatPt: 'Um dos meus primeiros projetos: lista de tarefas no terminal', stack: 'Python', repo: 'https://github.com/ViniciuscLemos/todo-list' },
];
