// Função principal que inicializa todas as funcionalidades
function initializeApp() {
    // Inicializa AOS se existir
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    // Inicializa o menu mobile
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });

        // Fecha o menu ao clicar em um link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
            });
        });
    }

    // Função para animar os números
    function animateValue(id, start, end, duration) {
        const element = document.getElementById(id);
        if (!element) return;
        
        let startTime = null;
        
        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            element.innerHTML = Math.floor(progress * (end - start) + start) + (id === 'stat1' || id === 'stat3' ? '%' : '');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        }
        
        window.requestAnimationFrame(step);
    }

    // Inicia as animações dos números
    const stats = {
        'stat1': 92,
        'stat2': 800,
        'stat3': 100
    };

    Object.entries(stats).forEach(([id, value]) => {
        if (document.getElementById(id)) {
            animateValue(id, 0, value, 2000);
        }
    });
}

// Garante que o código só execute quando o DOM estiver totalmente carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Adiciona listener para scroll suave nos links de navegação
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
