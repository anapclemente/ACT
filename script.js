let lastScrollY = window.scrollY;
const nav = document.querySelector('nav');
let timer;

// Controla o scroll
window.addEventListener('scroll', () => {
    clearTimeout(timer);
    
    if (window.scrollY > 100) { // Só começa a esconder depois de 100px de scroll
        if (window.scrollY > lastScrollY) { // Scrollando para baixo
            nav.classList.add('nav-hidden');
            nav.classList.remove('nav-visible');
        } else { // Scrollando para cima
            nav.classList.remove('nav-hidden');
            nav.classList.add('nav-visible');
        }
    }
    
    lastScrollY = window.scrollY;
});

// Mostra o menu quando o mouse está próximo ao topo
nav.addEventListener('mouseenter', () => {
    nav.classList.remove('nav-hidden');
    nav.classList.add('nav-visible');
});

// Volta ao topo
window.addEventListener('scroll', () => {
    if (window.scrollY === 0) {
        nav.classList.remove('nav-hidden');
        nav.classList.add('nav-visible');
    }
});

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Fecha o menu mobile se estiver aberto
        const navLinks = document.querySelector('.nav-links');
        const menuBtn = document.querySelector('.menu-btn');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        }
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = targetPosition + window.pageYOffset - navHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
}); 