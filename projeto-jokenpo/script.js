// Elementos do DOM
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const playerChoiceElement = document.getElementById('player-choice');
const computerChoiceElement = document.getElementById('computer-choice');
const resultElement = document.getElementById('result');
const choiceButtons = document.querySelectorAll('.choice-btn');
const resetButton = document.getElementById('reset-btn');

// Variáveis do jogo
let playerScore = 0;
let computerScore = 0;
let gameActive = true;

// Emojis para as escolhas
const choiceEmojis = {
    pedra: '✊',
    papel: '✋',
    tesoura: '✌️'
};

// Lógica do jogo
function playGame(playerChoice) {
    if (!gameActive) return;
    
    // Desabilita os botões durante a jogada
    choiceButtons.forEach(button => button.disabled = true);
    
    // Animação de escolha do jogador
    playerChoiceElement.textContent = choiceEmojis[playerChoice];
    playerChoiceElement.classList.add('pulse');
    
    // Escolha aleatória do computador
    const choices = ['pedra', 'papel', 'tesoura'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    
    // Animação de escolha do computador com delay
    setTimeout(() => {
        computerChoiceElement.textContent = choiceEmojis[computerChoice];
        computerChoiceElement.classList.add('pulse');
        
        // Determina o resultado
        const result = determineWinner(playerChoice, computerChoice);
        
        // Atualiza a interface com o resultado
        setTimeout(() => {
            displayResult(result, playerChoice, computerChoice);
            updateScore(result);
            gameActive = false;
            resetButton.style.display = 'block';
        }, 500);
    }, 1000);
}

// Determina o vencedor
function determineWinner(player, computer) {
    if (player === computer) {
        return 'draw';
    }
    
    if (
        (player === 'pedra' && computer === 'tesoura') ||
        (player === 'papel' && computer === 'pedra') ||
        (player === 'tesoura' && computer === 'papel')
    ) {
        return 'win';
    }
    
    return 'lose';
}

// Exibe o resultado
function displayResult(result, playerChoice, computerChoice) {
    // Remove classes anteriores
    playerChoiceElement.classList.remove('win', 'lose', 'draw');
    computerChoiceElement.classList.remove('win', 'lose', 'draw');
    
    // Adiciona classes baseadas no resultado
    if (result === 'win') {
        resultElement.innerHTML = `<p>Você ganhou! ${capitalizeFirstLetter(playerChoice)} vence ${computerChoice}</p>`;
        playerChoiceElement.classList.add('win');
        computerChoiceElement.classList.add('lose');
    } else if (result === 'lose') {
        resultElement.innerHTML = `<p>Você perdeu! ${capitalizeFirstLetter(computerChoice)} vence ${playerChoice}</p>`;
        playerChoiceElement.classList.add('lose');
        computerChoiceElement.classList.add('win');
    } else {
        resultElement.innerHTML = `<p>Empate! Ambos escolheram ${playerChoice}</p>`;
        playerChoiceElement.classList.add('draw');
        computerChoiceElement.classList.add('draw');
    }
    
    // Animação de resultado
    resultElement.classList.add('pulse');
}

// Atualiza o placar
function updateScore(result) {
    if (result === 'win') {
        playerScore++;
        playerScoreElement.textContent = playerScore;
    } else if (result === 'lose') {
        computerScore++;
        computerScoreElement.textContent = computerScore;
    }
}

// Reinicia o jogo
function resetGame() {
    // Reseta as escolhas
    playerChoiceElement.textContent = '?';
    computerChoiceElement.textContent = '?';
    
    // Remove classes de resultado
    playerChoiceElement.classList.remove('win', 'lose', 'draw', 'pulse');
    computerChoiceElement.classList.remove('win', 'lose', 'draw', 'pulse');
    resultElement.classList.remove('pulse');
    
    // Reseta o texto do resultado
    resultElement.innerHTML = '<p>Faça sua jogada!</p>';
    
    // Habilita os botões
    choiceButtons.forEach(button => button.disabled = false);
    
    // Esconde o botão de reiniciar
    resetButton.style.display = 'none';
    
    // Ativa o jogo
    gameActive = true;
}

// Função auxiliar para capitalizar a primeira letra
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Event Listeners
choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.getAttribute('data-choice');
        playGame(playerChoice);
    });
});

resetButton.addEventListener('click', resetGame);

// Inicialização
resetButton.style.display = 'none';