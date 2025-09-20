document.addEventListener('DOMContentLoaded', function () {
    const userScoreSpan = document.getElementById('user-score');
    const computerScoreSpan = document.getElementById('computer-score');
    const resultDiv = document.getElementById('result');
    const actionMessageDiv = document.getElementById('action-message');
    const resetButton = document.getElementById('reset');
    const winningPopup = document.getElementById('winning-popup');
    const winningMessage = document.getElementById('winning-message');
    const playAgainButton = document.getElementById('play-again');
    const overlay = document.getElementById('overlay');

    let userScore = 0;
    let computerScore = 0;
    let gameActive = true;
    const winningScore = 3;

    const choices = {
        rock: { name: 'Rock', beats: 'scissors' },
        paper: { name: 'Paper', beats: 'rock' },
        scissors: { name: 'Scissors', beats: 'paper' }
    };

    // Game Initialization
    function initGame() {
        actionMessageDiv.style = 'display: block;';
        userScore = 0;
        computerScore = 0;
        gameActive = true;

        userScoreSpan.textContent = userScore;
        computerScoreSpan.textContent = computerScore;
        resultDiv.textContent = '';
        resultDiv.className = '';
        actionMessageDiv.textContent = 'Choose your weapon!';
        winningPopup.style.display = 'none';
        overlay.style.display = 'none';

        document.querySelectorAll('.choice').forEach(choice => {
            choice.style.pointerEvents = 'auto';
            choice.style.opacity = '1';
        });
    }

    // Computer choice
    function getComputerChoice() {
        const choicesKeys = Object.keys(choices);
        return choicesKeys[Math.floor(Math.random() * choicesKeys.length)];
    }

    // Determine winner
    function determineWinner(userChoice, computerChoice) {
        if (userChoice === computerChoice) {
            return 'draw';
        } else if (choices[userChoice].beats === computerChoice) {
            return 'user';
        } else {
            return 'computer';
        }
    }

    // Update scores and display result
    function updateScores(winner, userChoice, computerChoice) {
        actionMessageDiv.style = 'display: none;';

        if (winner === 'user') {
            userScore++;
            userScoreSpan.textContent = userScore;
            resultDiv.textContent = 'You win this round!';
            resultDiv.className = 'win';
        } else if (winner === 'computer') {
            computerScore++;
            computerScoreSpan.textContent = computerScore;
            resultDiv.textContent = 'Computer wins this round!';
            resultDiv.className = 'lose';
        } else {
            resultDiv.textContent = "It's a draw!";
            resultDiv.className = 'draw';
        }

        // Check Winner
        if (userScore >= winningScore || computerScore >= winningScore) {
            gameActive = false;

            // Disable choices
            document.querySelectorAll('.choice').forEach(choice => {
                choice.style.pointerEvents = 'none';
                choice.style.opacity = '0.7';
            });

            // Winning popup
            if (userScore > computerScore) {
                winningMessage.textContent = '🎉 Congratulations! You won the game! 🎉';
            } else {
                winningMessage.textContent = '💻 Computer won the game! Try again? 💻';
            }

            winningPopup.style.display = 'block';
            overlay.style.display = 'block';
        }
    }

    // Choices event listeners
    document.querySelectorAll('.choice').forEach(choice => {
        choice.addEventListener('click', function () {
            if (!gameActive) return;

            const userChoice = this.id;
            const computerChoice = getComputerChoice();
            const winner = determineWinner(userChoice, computerChoice);

            updateScores(winner, userChoice, computerChoice);
        });
    });

    // Reset
    resetButton.addEventListener('click', initGame);

    // Play again
    playAgainButton.addEventListener('click', initGame);

    // Initialize the game
    initGame();
});