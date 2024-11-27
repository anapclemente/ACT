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

    const form = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const errorModal = document.getElementById('errorModal');
    const closeButtons = document.querySelectorAll('.close-modal');

    // Função para fechar os modais
    function closeModals() {
        successModal.style.display = 'none';
        errorModal.style.display = 'none';
    }

    // Adiciona evento de clique nos botões de fechar
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModals);
    });

    // Fecha modal ao clicar fora dele
    window.addEventListener('click', (e) => {
        if (e.target === successModal || e.target === errorModal) {
            closeModals();
        }
    });

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    // Removemos o Content-Type para deixar o navegador definir com o boundary correto
                },
                mode: 'cors' // Adiciona modo CORS
            });

            const data = await response.json();

            if (response.ok) {
                successModal.style.display = 'block';
                form.reset();
            } else {
                throw new Error('Erro no envio');
            }
        } catch (error) {
            console.error('Erro:', error);
            errorModal.style.display = 'block';
        }
    });
});