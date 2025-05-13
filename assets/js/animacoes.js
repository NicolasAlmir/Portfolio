// Adiciona classes de animação aos elementos
function addAnimationClasses() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        const delayClass = `delay-${(index % 5) + 1}`;
        section.classList.add('fade-in', delayClass);
    });
    
    // Adiciona animação aos cards
    const cards = document.querySelectorAll('.project-card, .certificate-card, .highlight-card, .soft-skill-card');
    cards.forEach((card, index) => {
        const delayClass = `delay-${(index % 5) + 1}`;
        card.classList.add('fade-in', delayClass);
    });
    
    // Adiciona animação flutuante à imagem de perfil
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.classList.add('floating');
    }
}

// Inicializa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    addAnimationClasses();
});