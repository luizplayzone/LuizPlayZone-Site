document.addEventListener('DOMContentLoaded', function() {
    
    // ======================================
    // 1. FUNCIONALIDADE DO MENU HAMBURGUER
    // ======================================
    
    const menuToggle = document.getElementById('menu-hamburguer');
    const navMenu = document.getElementById('menu-principal');

    if (menuToggle && navMenu) {
        // Inicializa o menu como fechado e define o atributo aria
        navMenu.setAttribute('aria-expanded', 'false');
        navMenu.style.display = 'none'; // Garante que o menu está escondido por padrão no JS

        menuToggle.addEventListener('click', function() {
            const isExpanded = navMenu.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                // Fecha o menu
                navMenu.style.display = 'none';
                navMenu.setAttribute('aria-expanded', 'false');
                menuToggle.innerHTML = '☰'; // Muda o ícone para hamburguer
            } else {
                // Abre o menu
                // No mobile (definido pelo CSS), queremos que ele apareça como bloco ou coluna
                navMenu.style.display = 'block'; 
                navMenu.setAttribute('aria-expanded', 'true');
                menuToggle.innerHTML = '✕'; // Muda o ícone para fechar
            }
        });

        // Fecha o menu quando um link é clicado (útil no mobile)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                 // Verifica se estamos em uma tela menor (pode ser ajustado conforme o media query do CSS)
                 if (window.innerWidth <= 900) { 
                    navMenu.style.display = 'none';
                    navMenu.setAttribute('aria-expanded', 'false');
                    menuToggle.innerHTML = '☰';
                 }
            });
        });
    }


    // ======================================
    // 2. BOTÃO VOLTAR AO TOPO (BOTÃO 'VOLTAR')
    // ======================================
    
    const scrollToTopBtn = document.getElementById("back-to-top");

    if (scrollToTopBtn) {
        // 2.1 Mostrar/Ocultar o botão ao rolar a página
        window.onscroll = function() {
            // Mostra o botão após rolar 500px
            if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        };

        // 2.2 Comportamento ao clicar no botão
        scrollToTopBtn.addEventListener('click', function() {
            // Rolagem suave para o topo da página
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ======================================
    // 3. SIMULAÇÃO DE LIVE STATUS (Dinamismo)
    // ======================================
    
    // NOTE: Em um projeto real, esta função checaria uma API da Twitch/YouTube
    // Aqui, vamos apenas simular para dar um efeito dinâmico na Home.
    const liveStatusElement = document.querySelector('.live-status');
    
    // Você pode mudar esta variável para 'false' para simular que está offline.
    const isLive = true; 

    if (liveStatusElement) {
        if (isLive) {
            liveStatusElement.textContent = 'LIVE AGORA!';
            liveStatusElement.style.display = 'inline-block';
        } else {
            liveStatusElement.textContent = 'OFFLINE';
            liveStatusElement.style.display = 'none'; // Esconde se estiver offline
        }
    }

});/* --- CONTINUAÇÃO DO assets/js/main.js --- */

// ====================================
// 3. CONTADOR REGRESSIVO DE EVENTOS
// ====================================

function iniciarContadorRegressivo() {
    // 1. Defina a data final do evento (Ex: 25 de Dezembro de 2025, 20:00:00)
    // O JavaScript usa o formato YYYY-MM-DDTHH:MM:SS
    // Ajuste este valor para a data real do seu evento!
    const dataFinal = new Date("2025-12-25T20:00:00").getTime(); 

    const contadorElemento = document.querySelector('.countdown');

    if (!contadorElemento) {
        return; // Sai da função se o elemento não for encontrado na página atual
    }

    const intervalo = setInterval(function() {
        const agora = new Date().getTime();
        const distancia = dataFinal - agora;

        // Cálculo do tempo em dias, horas, minutos e segundos
        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        // Formatação da saída Neon
        const textoContador = 
            (dias.toString().padStart(2, '0')) + " DIAS : " + 
            (horas.toString().padStart(2, '0')) + " HORAS : " + 
            (minutos.toString().padStart(2, '0')) + " MIN : " +
            (segundos.toString().padStart(2, '0')) + " SEG";

        contadorElemento.innerHTML = textoContador;

        // Se a contagem regressiva terminar
        if (distancia < 0) {
            clearInterval(intervalo);
            contadorElemento.innerHTML = "AO VIVO AGORA!";
            // Você pode querer mudar o estilo ou o link do botão de inscrição aqui
        }
    }, 1000);
}

// Inicializa a função do contador quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', iniciarContadorRegressivo);