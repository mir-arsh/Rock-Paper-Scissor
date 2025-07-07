let playerScore = 0;
let computerScore = 0;
let lastDisabledChoice = null;

const choices = document.querySelectorAll(".choice");
const message = document.querySelector(".msg");
const playerScoreDisplay = document.querySelector(".playerScore");
const computerScoreDisplay = document.querySelector(".computerScore");
const reset = document.querySelector(".reset");

const WINNING_SCORE = 10;

const computerChoice = () => {
    const choices = ["rock", "paper", "scissors"];
    const randomIdx = Math.floor(Math.random() * 3);
    return choices[randomIdx];
}

const showWinner = (playerWin) => {
    if (playerWin) {
        playerScore++;
        playerScoreDisplay.innerHTML = playerScore;
        if (playerScore === WINNING_SCORE) {
            message.innerHTML = "🎉 You won the game!";
            message.style.backgroundColor = "green";
            message.style.color = "white";
            setTimeout(() => {
                document.querySelector(".ca2").style.display = "block";
                document.querySelector(".overlay2").style.display = "block";
            }, 0);
            return;
        }
        message.innerHTML = "You win this round!";
        message.style.backgroundColor = "green";
        message.style.color = "white";
    } else {
        computerScore++;
        computerScoreDisplay.innerHTML = computerScore;
        if (computerScore === WINNING_SCORE) {
            message.innerHTML = "💀 You lost the game!";
            message.style.backgroundColor = "red";
            message.style.color = "white";
            setTimeout(() => {
                document.querySelector(".ca2").style.display = "block";
                document.querySelector(".overlay2").style.display = "block";
            }, 0);
            return;
        }
        message.innerHTML = "You lose this round!";
        message.style.backgroundColor = "red";
        message.style.color = "white";
    }
}

const gamePlay = (playerChoice) => {
    const computerChoiceFunc = computerChoice();
    if (playerChoice === computerChoiceFunc) {
        message.innerHTML = "It's a tie!";
        message.style.backgroundColor = "yellow";
        message.style.color = "black";
    } else {
        let playerWin = true;
        if (playerChoice === "rock") {
            playerWin = computerChoiceFunc === "paper" ? false : true;
        } else if (playerChoice === "paper") {
            playerWin = computerChoiceFunc === "scissors" ? false : true;
        } else if (playerChoice === "scissors") {
            playerWin = computerChoiceFunc === "rock" ? false : true;
        }
        showWinner(playerWin);
    }
}

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const playerChoice = choice.querySelector("img").id;

        if (choice.classList.contains("disabled")) return;

        gamePlay(playerChoice);

        // Re-enable the last disabled choice
        if (lastDisabledChoice) {
            lastDisabledChoice.classList.remove("disabled");
            lastDisabledChoice.style.opacity = "1";
            lastDisabledChoice.style.pointerEvents = "auto";
        }

        // Disable the current choice
        choice.classList.add("disabled");
        choice.style.opacity = "0.5";
        choice.style.pointerEvents = "none";

        lastDisabledChoice = choice;
    });
});

reset.addEventListener("click", () => {
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.innerHTML = playerScore;
    computerScoreDisplay.innerHTML = computerScore;
    message.innerHTML = "Make your choice!";
    message.style.backgroundColor = "green";
    message.style.color = "white";

    // Reset all choices
    choices.forEach((choice) => {
        choice.classList.remove("disabled");
        choice.style.opacity = "1";
        choice.style.pointerEvents = "auto";
    });

    lastDisabledChoice = null;
});

// Alert popup logic
window.addEventListener("load", () => {
    document.getElementById("customAlert").style.display = "block";
    document.getElementById("overlay").style.display = "block";
});

document.getElementById("alertClose").addEventListener("click", () => {
    document.getElementById("customAlert").style.display = "none";
    document.getElementById("overlay").style.display = "none";
});

//Logic for Yes and No buttons
function yes() {
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.innerHTML = playerScore;
    computerScoreDisplay.innerHTML = computerScore;
    message.innerHTML = "Make your choice!";
    message.style.backgroundColor = "green";
    message.style.color = "white";
    document.getElementById("ca2").style.display = "none";
    document.getElementById("overlay2").style.display = "none";
    choices.forEach((choice) => {
        choice.classList.remove("disabled");
        choice.style.opacity = "1";
        choice.style.pointerEvents = "auto";
    });
}
function no() {
    window.location.reload();
}