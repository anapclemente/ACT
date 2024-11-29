// Verifica se AOS existe antes de inicializar
if (typeof AOS !== 'undefined') {
    // Inicializa AOS
    AOS.init({
        duration: 1000,
        once: true
    });
}

// Função para animar os números
function animateValue(id, start, end, duration) {
    const element = document.getElementById(id);
    if (!element) return; // Proteção contra elemento não encontrado
    
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        element.innerText = Math.floor(progress * (end - start) + start) + (id === 'stat1' || id === 'stat3' ? '%' : '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}

// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se os elementos existem antes de chamar a animação
    const elements = ['stat1', 'stat2', 'stat3'];
    if (elements.every(id => document.getElementById(id))) {
        animateValue('stat1', 0, 92, 2000);
        animateValue('stat2', 0, 800, 2000);
        animateValue('stat3', 0, 100, 2000);
    }
});
