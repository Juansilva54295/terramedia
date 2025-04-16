document.addEventListener('DOMContentLoaded', function() {
    // Animação do anel pulsante
    function createRing() {
        const ring = document.querySelector('.ring-animation');
        ring.style.left = Math.random() * 100 + 'vw';
        ring.style.top = Math.random() * 100 + 'vh';
        ring.style.opacity = '0.7';

        setTimeout(() => {
            ring.style.opacity = '0';
            setTimeout(createRing, 1000);
        }, 3000);
    }

    createRing();

    // Navegação suave
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });

            history.pushState(null, null, targetId);
        });
    });

    // Efeito de digitação no título
    const title = document.getElementById('main-title');
    const originalText = title.textContent;
    title.textContent = '';

    let i = 0;
    const typingEffect = setInterval(() => {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typingEffect);
        }
    }, 150);

    // Modal para os livros (sem imagens)
    const bookCards = document.querySelectorAll('.book-card');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close-btn');

    bookCards.forEach(card => {
        card.addEventListener('click', function() {
            const bookType = this.getAttribute('data-book');
            let title = '';
            let content = '';

            switch(bookType) {
                case 'hobbit':
                    title = 'O Hobbit';
                    content = `
                        <p><strong>Publicado em:</strong> 1937</p>
                        <p><strong>Sinopse:</strong> Bilbo Bolseiro, um hobbit tranquilo, é arrastado para uma aventura épica por Gandalf e um grupo de anões para recuperar o tesouro guardado pelo dragão Smaug.</p>
                    `;
                    break;
                case 'lotr':
                    title = 'O Senhor dos Anéis';
                    content = `
                        <p><strong>Publicado em:</strong> 1954-1955 (trilogia)</p>
                        <p><strong>Sinopse:</strong> Frodo Bolseiro herda o Um Anel e deve embarcar em uma jornada perigosa para destruí-lo na Montanha da Perdição, enquanto as forças do Senhor do Escuro, Sauron, o perseguem.</p>
                    `;
                    break;
                case 'silmarillion':
                    title = 'O Silmarillion';
                    content = `
                        <p><strong>Publicado em:</strong> 1977 (póstumo)</p>
                        <p><strong>Sinopse:</strong> Uma coleção de mitos e lendas que contam a história da criação da Terra Média e os eventos da Primeira Era, incluindo a história das Silmarils.</p>
                    `;
                    break;
            }

            modalTitle.textContent = title;
            modalBody.innerHTML = content;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Fechar modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Carrossel de personagens
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const carousel = document.querySelector('.character-carousel');

    prevBtn.addEventListener('click', function() {
        carousel.scrollBy({ left: -250, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', function() {
        carousel.scrollBy({ left: 250, behavior: 'smooth' });
    });

    // Mapa interativo
    const mapLocations = document.querySelectorAll('.map-location');
    const locationName = document.getElementById('location-name');
    const locationDesc = document.getElementById('location-desc');

    const locationInfo = {
        hobbiton: {
            name: 'Hobbiton',
            desc: 'A pacata vila dos Hobbits no Condado, lar de Bilbo e Frodo Bolseiro. Conhecida por seus buracos-hobbit confortáveis e paisagens verdejantes.'
        },
        rivendell: {
            name: 'Rivendell',
            desc: 'O Último Lar Acolhedor a Leste do Mar, um refúgio élfico governado por Elrond. Local onde a Sociedade do Anel foi formada.'
        },
        mordor: {
            name: 'Mordor',
            desc: 'A terra sombria governada por Sauron, protegida pelas Montanhas da Sombra. Lar da Montanha da Perdição, onde o Um Anel foi forjado.'
        },
        erebor: {
            name: 'Erebor',
            desc: 'A Montanha Solitária, lar do Reino dos Anões sob a Montanha e do dragão Smaug. Local central dos eventos em "O Hobbit".'
        }
    };

    mapLocations.forEach(location => {
        location.addEventListener('click', function() {
            const locId = this.getAttribute('data-location');
            const info = locationInfo[locId];

            locationName.textContent = info.name;
            locationDesc.textContent = info.desc;

            mapLocations.forEach(loc => loc.style.backgroundColor = 'gold');
            this.style.backgroundColor = 'red';
            this.style.boxShadow = '0 0 15px red';

            setTimeout(() => {
                this.style.backgroundColor = 'gold';
                this.style.boxShadow = '0 0 10px gold';
            }, 1000);
        });
    });

    // Efeito parallax no header
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const header = document.querySelector('header');

        if (scrollPosition < header.offsetHeight) {
            header.style.backgroundPositionY = -scrollPosition * 0.5 + 'px';
        }
    });

    // Galeria interativa (sem imagens)
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const artType = this.getAttribute('data-art');
            let title = '';
            let content = '';

            switch(artType) {
                case 'fellowship':
                    title = 'A Sociedade do Anel';
                    content = `
                        <p>A formação da Sociedade do Anel em Rivendell, com Frodo como portador do Um Anel e seus oito companheiros.</p>
                    `;
                    break;
                case 'hobbit':
                    title = 'Bilbo e Smaug';
                    content = `
                        <p>Bilbo Bolseiro enfrentando o dragão Smaug na Montanha Solitária, uma cena icônica de "O Hobbit".</p>
                    `;
                    break;
                case 'minas-tirith':
                    title = 'Minas Tirith';
                    content = `
                        <p>A imponente cidade de Minas Tirith, capital de Gondor, palco da Batalha dos Campos de Pelennor.</p>
                    `;
                    break;
                    case 'mordor':
                    title = 'Mordor';
                    content = `
                        <p>Terra sombria governada por Sauron, protegida por montanhas e vulcões, onde o Um Anel foi forjado na Montanha da Perdição. Palco da batalha final contra as forças do mal em O Senhor dos Anéis.</p>
                    `;
                    break;
                    case 'hobbiton':
                    title = 'Hobbiton';
                    content = `
                        <p>Pacata região habitada pelos hobbits, conhecida por seus campos verdejantes, casas aconchegantes e vida simples. Lar de Bilbo e Frodo Bolseiro, onde começa a jornada para destruir o Um Anel.</p>
                    `;
                    break;
                    case 'rivendell':
                    title = 'Rivendell';
                    content = `
                        <p>Refúgio élfico escondido entre os vales, governado por Elrond, onde a Sociedade do Anel foi formada. Local de sabedoria, beleza e descanso, protegido pelo poder dos Elfos.</p>
                    `;
                    break;
            }

            modalTitle.textContent = title;
            modalBody.innerHTML = content;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Efeito de rolagem nas seções
    const sections = document.querySelectorAll('.section');

    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.75) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', checkScroll);
    checkScroll();
});
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("theme-switch");
    const body = document.body;

    // Verifica se o usuário já tem uma preferência salva
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        body.classList.add(savedTheme);
        toggle.checked = savedTheme === "sauron-theme";
    } else {
        // Tema padrão: Lothlórien
        body.classList.add("lothlorien-theme");
    }

    toggle.addEventListener("change", () => {
        if (toggle.checked) {
            body.classList.remove("lothlorien-theme");
            body.classList.add("sauron-theme");
            localStorage.setItem("theme", "sauron-theme");
        } else {
            body.classList.remove("sauron-theme");
            body.classList.add("lothlorien-theme");
            localStorage.setItem("theme", "lothlorien-theme");
        }
    });
});
const quizData = [
    {
      question: "Quem forjou os Anéis de Poder?",
      options: ["Sauron", "Celebrimbor", "Gandalf", "Saruman"],
      answer: "Celebrimbor"
    },
    {
      question: "Qual é o nome verdadeiro de Gollum?",
      options: ["Déagol", "Smeagol", "Bolg", "Uglúk"],
      answer: "Smeagol"
    },
    {
      question: "Qual é a raça de Legolas?",
      options: ["Hobbit", "Homem", "Elfo", "Anão"],
      answer: "Elfo"
    },
    {
      question: "Quem é o pai de Aragorn?",
      options: ["Elendil", "Isildur", "Arathorn", "Denethor"],
      answer: "Arathorn"
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  
  function openQuiz() {
    document.getElementById("quiz-modal").style.display = "block";
    loadQuestion();
  }
  
  function closeQuiz() {
    document.getElementById("quiz-modal").style.display = "none";
    currentQuestion = 0;
    score = 0;
  }
  
  function loadQuestion() {
    const q = quizData[currentQuestion];
    const container = document.getElementById("quiz-container");
    container.innerHTML = `
      <p><strong>${currentQuestion + 1}.</strong> ${q.question}</p>
      ${q.options.map(opt => `<div class="quiz-option" onclick="selectOption('${opt}')">${opt}</div>`).join("")}
    `;
  }
  
  function selectOption(option) {
    const correct = quizData[currentQuestion].answer;
    if (option === correct) score++;
  
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }
  
  function showResult() {
    const container = document.getElementById("quiz-container");
    container.innerHTML = `
      <h3>Você acertou ${score} de ${quizData.length} perguntas!</h3>
      <button onclick="closeQuiz()">Fechar</button>
    `;
  }
