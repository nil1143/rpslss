const choices = document.querySelectorAll('.choice');
const userScoreSpan = document.getElementById('user-score');
const computerScoreSpan = document.getElementById('computer-score');
const resultMessage = document.getElementById('result');

let userScore = 0;
let computerScore = 0;

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return 'It\'s a draw!';
    } else if (
        (userChoice === 'rock' && (computerChoice === 'scissors' || computerChoice === 'lizard')) ||
        (userChoice === 'paper' && (computerChoice === 'rock' || computerChoice === 'spock')) ||
        (userChoice === 'scissors' && (computerChoice === 'paper' || computerChoice === 'lizard')) ||
        (userChoice === 'lizard' && (computerChoice === 'spock' || computerChoice === 'paper')) ||
        (userChoice === 'spock' && (computerChoice === 'rock' || computerChoice === 'scissors'))
    ) {
        return `You win! You chose ${userChoice}, computer chose ${computerChoice}.`;
    } else {
        return `Computer wins! Computer chose ${computerChoice}, you chose ${userChoice}.`;
    }
}

function updateScore(userChoice, computerChoice) {
    if (userScore < 15 && computerScore < 15) {
        const result = determineWinner(userChoice, computerChoice);
        if (result.startsWith('You win')) {
            userScore++;
        } else if (result.startsWith('Computer wins')) {
            computerScore++;
        }
 
        userScoreSpan.textContent = userScore;
        computerScoreSpan.textContent = computerScore;
        resultMessage.textContent = result;

        if (userScore === 15 || computerScore === 15) {
            endGame();
        }
    }
}

function endGame() {
    if (userScore > computerScore) {
        resultMessage.textContent = `Game over! You win the game with a score of ${userScore}-${computerScore}.`;
    } else if (computerScore > userScore) {
        resultMessage.textContent = `Game over! Computer wins the game with a score of ${computerScore}-${userScore}.`;
    } else {
        resultMessage.textContent = `Game over! It's a draw with a score of ${userScore}-${computerScore}.`;
    }

    choices.forEach(choice => choice.removeEventListener('click', handleClick));
}

function userChoiceHandler(userChoice) {
    const computerChoice = getComputerChoice();
    updateScore(userChoice, computerChoice);
}

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const userChoice = choice.getAttribute('data-choice');
        userChoiceHandler(userChoice);
    });
});