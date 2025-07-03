// Função para carregar o tema salvo ou detectar preferência do sistema
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (systemPrefersDark) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
}

// Função para alternar entre temas
function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Função para aplicar o tema
function setTheme(theme) {
    const themeStyle = document.getElementById('theme-style');
    const themeToggle = document.getElementById('theme-toggle');
    
    if (theme === 'light') {
        themeStyle.href = './assets/css/light-mode.css';
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeStyle.href = './assets/css/dark-mode.css';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    localStorage.setItem('theme', theme);
}

// Função para o menu mobile
function setupMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.nav');
    
    if (!mobileMenu || !nav) return; // Verifica se elementos existem
    
    mobileMenu.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        // Adicionar manipulação de aria-expanded para acessibilidade
        const isExpanded = mobileMenu.classList.contains('active');
        mobileMenu.setAttribute('aria-expanded', isExpanded);
    });
    
    // Adicionar evento para teclado (acessibilidade)
    mobileMenu.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            mobileMenu.click();
        }
    });
}

// Chamar a função quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', setupMobileMenu);
// Função para o loader do terminal
let loaderExecuted = false; // Variável de controle

function setupTerminalLoader() {
    // Verifica se já executou
    if (loaderExecuted) return;
    loaderExecuted = true;
    
    const terminalLoader = document.getElementById('terminal-loader');
    const typingAnimation = document.getElementById('typing-animation');
    
    if (!terminalLoader || !typingAnimation) return;

    // Limpa o conteúdo inicial
    typingAnimation.innerHTML = '<span class="prompt">$</span> Initializing portfolio system...';
    
    const messages = [
        { text: 'Carregando...', delay: 1100 },
        { text: 'Preparando componentes...', delay: 1050 },
        { text: 'Pronto!', delay: 1080 }
    ];
    
    let currentMessage = 0;
    
    function showNextMessage() {
        if (currentMessage >= messages.length) {
            terminalLoader.style.opacity = '0';
            setTimeout(() => {
                terminalLoader.style.display = 'none';
            }, 500);
            return;
        }

        const message = messages[currentMessage];
        setTimeout(() => {
            // Verifica se já não adicionou esta mensagem
            if (!typingAnimation.innerHTML.includes(message.text)) {
                typingAnimation.innerHTML += `<br><span class="prompt">$</span> ${message.text}`;
            }
            currentMessage++;
            showNextMessage();
        }, message.delay);
    }
    
    showNextMessage();
}

// Adiciona o event listener corretamente
document.addEventListener('DOMContentLoaded', setupTerminalLoader);

// Chama a função quando a página carrega
window.addEventListener('load', setupTerminalLoader);

// Função para animações de scroll
function setupScrollAnimation() {
    const elements = document.querySelectorAll('[data-anime="scroll"]');
    const windowHeight = window.innerHeight * 0.8;
    
    function animateScroll() {
        elements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            const isElementVisible = elementTop - windowHeight < 0;
            
            if (isElementVisible) {
                element.classList.add('ativo');
            }
        });
    }
    
    if (elements.length) {
        animateScroll();
        window.addEventListener('scroll', animateScroll);
    }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    setupMobileMenu();
    setupTerminalLoader();
    setupScrollAnimation();
    
    // Configura o botão de alternar tema
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});