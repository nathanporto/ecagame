const questions = document.querySelectorAll('.question');
const nextButton = document.getElementById('nextButton');
let currentQuestion = parseInt(localStorage.getItem('currentQuestion')) || 0; // Recupera o índice da pergunta salva

// Mostra a pergunta atual ao carregar a página
function showQuestion(index) {
    questions.forEach((question, i) => {
        question.classList.toggle('hidden', i !== index);
    });
    nextButton.classList.add('hidden'); // Esconde o botão "Próxima Pergunta" inicialmente
}

// Verifica se a resposta está correta
function handleOptionClick(event) {
    const option = event.target;
    const isCorrect = option.getAttribute('data-correct') === 'true';
    const feedback = option.closest('.question').querySelector('.feedback');

    if (isCorrect) {
        option.classList.add('correct');
        nextButton.classList.remove('hidden'); // Mostra o botão "Próxima Pergunta"
        feedback.classList.add('hidden'); // Esconde o feedback se estiver visível
    } else {
        option.classList.add('incorrect');
        feedback.classList.remove('hidden'); // Mostra o feedback de erro
    }
}

// Avança para a próxima pergunta
function goToNextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion(currentQuestion);
        localStorage.setItem('currentQuestion', currentQuestion); // Salva o índice da pergunta atual
    } else {
        alert('Parabéns! Você finalizou o Desafio!');
        localStorage.removeItem('currentQuestion'); // Remove o índice salvo ao finalizar o quiz
    }
}

// Adiciona eventos aos elementos
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', handleOptionClick);
});

nextButton.addEventListener('click', goToNextQuestion);

// Inicializa o quiz com a pergunta salva
showQuestion(currentQuestion);