document.addEventListener('DOMContentLoaded', () => {
    // Inicializa AOS
    AOS.init({
        duration: 1000,
        once: true
    });
    
    // Função para animar os números
    function animateValue(id, start, end, duration) {
        const element = document.getElementById(id);
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

    // Chama a função para cada número
    animateValue('stat1', 0, 92, 2000);
    animateValue('stat2', 0, 800, 2000);
    animateValue('stat3', 0, 100, 2000);
});