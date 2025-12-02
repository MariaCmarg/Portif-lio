/**
 * Função para mostrar a modal de simulação (substitui alert() conforme regra).
 * Adicionada ao objeto window para ser acessível via `onclick` no HTML.
 * @param {string} title - Título da modal.
 * @param {string} message - Mensagem detalhada da simulação.
 */
window.showSimulationModal = function(title, message) {
    const modal = document.getElementById('simulation-modal');
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-message').innerText = message;
    
    // Exibir a modal
    modal.classList.add('opacity-100', 'pointer-events-auto');
}

/**
 * Simula a funcionalidade de um projeto e exibe uma mensagem na modal.
 * Adicionada ao objeto window para ser acessível via `onclick` no HTML.
 * @param {string} projeto - O nome do projeto a ser simulado.
 */
window.simularProjeto = function(projeto) {
    let titulo = `Simulação: ${projeto}`;
    let mensagem = '';

    if (projeto === 'Forkly') {
        mensagem = "Transação enviada ao servidor... Status: 200 OK. Pedido #A1B2C3 processado e enviado para a cozinha em 0.15s.";
    } else if (projeto === 'SIS') {
        mensagem = "Verificação biométrica concluída. Token NFC validado com sucesso. Acesso concedido em 0.08s. Bem-vinda ao sistema.";
    } else {
        mensagem = "Simulação iniciada para um projeto desconhecido.";
    }
    
    window.showSimulationModal(titulo, mensagem);
}

/**
 * Filtra a lista de habilidades com base na categoria e atualiza o estado dos botões.
 * Adicionada ao objeto window para ser acessível via `onclick` no HTML.
 * @param {string} categoria - A categoria a filtrar ('software', 'design' ou 'all').
 * @param {HTMLElement} activeBtn - O botão clicado.
 */
window.filtrarHabilidades = function(categoria, activeBtn) {
    const lista = document.getElementById('listaHabilidades');
    const habilidades = lista.querySelectorAll('li');
    const buttons = document.querySelectorAll('.futuristic-button');

    // 1. Resetar o estado dos botões de filtro
    buttons.forEach(btn => btn.classList.remove('active-filter'));
    if (activeBtn) {
        activeBtn.classList.add('active-filter');
    }

    // 2. Aplicar a lógica de filtragem e estilo
    habilidades.forEach(li => {
        const liCategory = li.getAttribute('data-category');
        
        // Remove estilos de destaque e esconde/mostra
        li.classList.remove('bg-cyan-highlight'); // Remove destaque
        li.classList.remove('hidden');

        if (categoria === 'all') {
            li.classList.add('bg-cyan-highlight'); // Destaca todos em 'Mostrar Tudo'
        } else if (liCategory !== categoria) {
            // Esconder itens que não correspondem
            li.classList.add('hidden');
        } else {
            // Item corresponde e deve ser destacado
            li.classList.add('bg-cyan-highlight');
        }
    });
}

// Lógica de Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa os ícones Lucide (no HTML)
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Personaliza o título e o texto de boas-vindas
    const tituloEl = document.getElementById('bemVindaTitulo');
    const textoEl = document.getElementById('textoSobreMim');
    
    if (tituloEl) {
        tituloEl.innerHTML = '<span class="text-cyan">Visitante,</span> bem-vinda ao meu portfólio.';
    }

    if (textoEl) {
        // Envolve o nome em destaque e adiciona a saudação direta
        let originalText = textoEl.innerHTML;
        originalText = originalText.replace('Eu sou Maria Clara Camargos', 'Eu sou <span class="text-cyan font-semibold">Maria Clara Camargos</span>');
        textoEl.innerHTML = `Olá, <strong class="text-cyan">Visitante</strong>! ${originalText}`;
    }

    // Garante que o filtro "Mostrar Tudo" esteja ativo e a lista formatada no início
    const btnAll = document.getElementById('btn-all');
    if (btnAll) {
        window.filtrarHabilidades('all', btnAll);
    }
});
