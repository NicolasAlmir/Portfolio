// Carrega o header em todas as páginas
document.addEventListener('DOMContentLoaded', function() {
    fetch('header.html')
        .then(response => {
            if (!response.ok) throw new Error('Header não encontrado');
            return response.text();
        })
        .then(html => {
            document.body.insertAdjacentHTML('afterbegin', html);
            setupMobileMenu();
            setupThemeToggle();
        })
        .catch(err => console.error('Erro ao carregar o header:', err));
});

// Configura o menu mobile
function setupMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.nav');

    mobileMenu?.addEventListener('click', () => {
        const isExpanded = mobileMenu.getAttribute('aria-expanded') === 'true';
        nav.classList.toggle('active');
        mobileMenu.setAttribute('aria-expanded', !isExpanded);
    });
}

// Configura o alternador de tema
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    themeToggle?.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
        
        // Salva preferência
        localStorage.setItem('darkMode', document.body.classList.contains('dark-theme'));
    });

    // Aplica tema salvo
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-theme');
        const icon = themeToggle?.querySelector('i');
        if (icon) icon.classList.replace('fa-moon', 'fa-sun');
    }
}