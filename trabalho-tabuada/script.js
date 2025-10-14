// =============================================
// GERADOR DE TABUADA INTERATIVO
// Disciplina: Desenvolvimento em JavaScript
// Aula: Estruturas de Repetição
// =============================================

// Elementos do DOM
const numeroInput = document.getElementById('numero');
const gerarBtn = document.getElementById('gerar-tabuada');
const resultSection = document.getElementById('result-section');
const tabuadaTitle = document.getElementById('tabuada-title');
const numeroSelecionadoSpan = document.getElementById('numero-selecionado');
const tabuadaContainer = document.getElementById('tabuada-container');
const errorMessage = document.getElementById('error-message');

/**
 * Função principal para gerar a tabuada
 * Utiliza estrutura de repetição FOR para calcular as multiplicações
 */
function gerarTabuada() {
    console.log('=== INICIANDO GERAÇÃO DE TABUADA ===');
    
    // 1. Limpar estado anterior
    limparEstadoAnterior();
    
    // 2. Obter e validar o número
    const numero = obterNumero();
    if (!numero) return;
    
    console.log(`Número selecionado: ${numero}`);
    
    // 3. Gerar e exibir a tabuada
    gerarETabular(numero);
    
    // 4. Exibir seção de resultados
    exibirResultados();
    
    console.log('=== TABUADA GERADA COM SUCESSO ===');
}

/**
 * Limpa mensagens de erro e resultados anteriores
 */
function limparEstadoAnterior() {
    errorMessage.style.display = 'none';
    tabuadaContainer.innerHTML = '';
}

/**
 * Obtém e valida o número digitado pelo usuário
 * @returns {number|boolean} Número validado ou false se inválido
 */
function obterNumero() {
    const valor = numeroInput.value.trim();
    const numero = parseInt(valor);
    
    console.log(`Valor digitado: "${valor}", Convertido: ${numero}`);
    
    // Validação do número
    if (valor === '' || isNaN(numero)) {
        exibirErro('Por favor, digite um número.');
        return false;
    }
    
    if (numero < 1 || numero > 10) {
        exibirErro('O número deve estar entre 1 e 10.');
        return false;
    }
    
    return numero;
}

/**
 * Exibe mensagem de erro para o usuário
 * @param {string} mensagem - Mensagem de erro a ser exibida
 */
function exibirErro(mensagem) {
    errorMessage.textContent = `❌ ${mensagem}`;
    errorMessage.style.display = 'block';
    console.error(`Erro de validação: ${mensagem}`);
}

/**
 * Gera a tabuada usando estrutura de repetição FOR
 * @param {number} numero - Número para gerar a tabuada
 */
function gerarETabular(numero) {
    console.log('Iniciando loop FOR para gerar tabuada...');
    
    // Atualizar título
    numeroSelecionadoSpan.textContent = numero;
    
    // ESTRUTURA DE REPETIÇÃO FOR
    // Itera de 1 a 10 para calcular cada multiplicação
    for (let i = 1; i <= 10; i++) {
        // Cálculo da multiplicação
        const resultado = numero * i;
        
        console.log(`Iteração ${i}: ${numero} × ${i} = ${resultado}`);
        
        // Criar elemento para exibir a operação
        criarElementoTabuada(numero, i, resultado);
    }
    
    console.log('Loop FOR finalizado. Todas as iterações concluídas.');
}

/**
 * Cria e adiciona um elemento HTML para exibir uma linha da tabuada
 * @param {number} numero - Número base da tabuada
 * @param {number} multiplicador - Número que está multiplicando
 * @param {number} resultado - Resultado da multiplicação
 */
function criarElementoTabuada(numero, multiplicador, resultado) {
    const tabuadaItem = document.createElement('div');
    tabuadaItem.className = 'tabuada-item';
    tabuadaItem.innerHTML = `
        <strong>${numero} × ${multiplicador}</strong> = <span class="resultado">${resultado}</span>
    `;
    
    // Adicionar efeito visual progressivo
    tabuadaItem.style.animationDelay = `${multiplicador * 0.1}s`;
    
    tabuadaContainer.appendChild(tabuadaItem);
}

/**
 * Exibe a seção de resultados com animação
 */
function exibirResultados() {
    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

// =============================================
// EVENT LISTENERS E INICIALIZAÇÃO
// =============================================

// Evento de clique no botão "Gerar Tabuada"
gerarBtn.addEventListener('click', gerarTabuada);

// Evento para gerar tabuada pressionando Enter
numeroInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        gerarTabuada();
    }
});

// Focar no input quando a página carregar
window.addEventListener('load', function() {
    numeroInput.focus();
    console.log('Página carregada. Gerador de Tabuada pronto para uso.');
});

// Evento para limpar validação enquanto digita
numeroInput.addEventListener('input', function() {
    errorMessage.style.display = 'none';
});

// =============================================
// FUNÇÕES ADICIONAIS PARA TESTES
// =============================================

/**
 * Função para testar a tabuada com diferentes números
 * Útil para verificar se todos os cálculos estão corretos
 */
function testarTabuada() {
    const testes = [1, 5, 10];
    console.log('=== INICIANDO TESTES AUTOMÁTICOS ===');
    
    testes.forEach(numero => {
        console.log(`Testando tabuada do ${numero}:`);
        for (let i = 1; i <= 10; i++) {
            const resultado = numero * i;
            console.log(`  ${numero} × ${i} = ${resultado} ${resultado === numero * i ? '✅' : '❌'}`);
        }
    });
}

// Descomente a linha abaixo para executar testes automáticos
// testarTabuada();