// Importar bibliotecas
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CountUp } from 'countup.js';
import SmoothScroll from 'smooth-scroll';

// Importe o conteúdo do script.js
import './script.js';

// Envolver todo o código em um evento DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // Inicializar Smooth Scroll
    new SmoothScroll('a[href*="#"]', {
        speed: 800,
        speedAsDuration: true
    });

    // Navbar transparência dinâmica
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // Menu mobile
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Animação das estatísticas
    const stats = [
        { element: 'stat1', end: 92, suffix: '%' },
        { element: 'stat2', end: 800, suffix: '+' },
        { element: 'stat3', end: 100, suffix: '%' }
    ];

    // Função para iniciar animação das estatísticas quando visíveis
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stats.forEach(stat => {
                    const countUp = new CountUp(stat.element, stat.end, {
                        duration: 2.5,
                        suffix: stat.suffix
                    });
                    countUp.start();
                });
                // Desconectar o observer após a animação iniciar
                observer.disconnect();
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.5
    });

    // Observar a seção de estatísticas
    const statsSection = document.querySelector('.estatisticas');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Validação do formulário
    const form = document.querySelector('form');
    const telefoneInput = document.querySelector('input[name="telefone"]');
    
    if (telefoneInput) {
        telefoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                value = value.replace(/(\d)(\d{4})$/, '$1-$2');
                e.target.value = value;
            }
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
            
            if (!telefoneRegex.test(telefoneInput.value)) {
                alert('Por favor, insira um telefone válido no formato (XX) XXXXX-XXXX');
                return;
            }

            // Aqui você pode adicionar o código para enviar o formulário
            form.submit();
        });
    }
});