let petNames = {
    dog: 'Fido',
    cat: 'Max',
    fish: 'Bubbles',
    python: 'Mr. Slithers',
  }
  
  let pairs = Object.entries(petNames);
  for (let pair of pairs){
    console.log(pair[1], 'is a', pair[0]);
  }


// 


function buildTableData() {
    let tbody = document.getElementsByTagName('tbody');
    let rows = tbody.children;
    
    let reviews = []

    
    for (let row in rows) {
        let tableData = {};
        let cells = rows.children
        tableData.name = cells[0].textContent
        tableData.rating = cells[1].textContent
        tableData.review = cells[2].textContent
        reviews.push(tableData)
    }
    return reviews

}
let data = buildTableData();
console.log(data)






//   FOR

function changeCards() {
    let cards = document.getElementsByClassName('card')
   for(let i = 0; i<cards.length; i++){ 
    cards[i].style.backgroundColor = "red"
       
   }
}
// 


////////////////////////


// Get the info modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on info button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";

  }
} 

// INSTRUCTION ONLOAD w Timeout
function modalOff() {
    modal.style.display = 'none'
}

window.onload = function onOff() {
    modal.style.display = 'block';
    window.setTimeout(modalOff, 3000)
}


const choices = document.querySelectorAll('.choice');
const userScoreSpan = document.getElementById('user-score');
const computerScoreSpan = document.getElementById('computer-score');
const resultMessage = document.getElementById('result');

let userScore = 0;
let computerScore = 0;
// Restart btn DZIALAAAAAAAAAAAAA
// TERAZ IF ELSE CZY NA PEWNO
const decisionModal = document.getElementById('decision-modal')
const resetIcon = document.getElementById('restartb')
resetIcon.onclick = function(){
    decisionModal.style.display = "block";
}


const cancelBtn = document.getElementById('cancel')
cancelBtn.onclick = function() {
    decisionModal.style.display = "none";
}


const restartBtn = document.getElementById("restartBtn")

restartBtn.onclick = function() {
    userScore = 0;
    computerScore = 0;
    resultMessage.textContent = '';
    userScoreSpan.textContent = '0';
    computerScoreSpan.textContent = '0';
    decisionModal.style.display = "none"
}

// 
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
        // return `You win! You chose ${userChoice}, computer chose ${computerChoice}.`;
        return resultMessage.innerHTML = `You win! You chose ${userChoice}, computer chose ${computerChoice}.`
    } else {
        // return `Computer wins! Computer chose ${computerChoice}, you chose ${userChoice}.`;
        return resultMessage.innerHTML = `Computer wins! Computer chose ${computerChoice}, you chose ${userChoice}.`
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
        resultMessage.textContent = `Game over! You win the game with a score of ${userScore}-${computerScore}. Press Reset button to play again!`;
    } else if (computerScore > userScore) {
        resultMessage.textContent = `Game over! Computer wins the game with a score of ${computerScore}-${userScore}. Press Reset button to play again!`;
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
