const playerChoiceDisplay = document.getElementById("player-choice");
const computerChoiceDisplay = document.getElementById("computer-choice");
const choiceDisplay = document.getElementsByClassName("choice-display");
const modalText = document.getElementById("modal-text");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("close-button")
const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");
const preGame = document.getElementById("pre-game-container");
const startGameBtn = document.getElementById("start-game-button");
const choicesBtn = document.getElementsByClassName("choices-button");
const resultDisplay = document.getElementById("result-container");
const messageContainer = document.getElementById("message");
const restartBtn = document.getElementById("restart-button");

const choices = ["rock", "paper", "scissors"];
const iconClassName = ["fa-solid fa-hand-back-fist", "fa-solid fa-hand", "fa-solid fa-hand-scissors"];

let ready = true;
let player;
let computer;

startGameBtn.addEventListener("click", () => {
   startGame();
})

Array.from(choicesBtn).forEach((btn) => {
    btn.addEventListener("click", () => {
        player = btn.id;
        computer = computerSelects(choices);
        console.log(player, computer);

        // Clear previous choices and display new ones
        displayChoices(playerChoiceDisplay, iconClassName[choices.indexOf(player)]);
        displayChoices(computerChoiceDisplay, iconClassName[choices.indexOf(computer)]);
        showMessage();
    })
})

restartBtn.addEventListener("click", () => {
    restartGame();
})

function computerSelects(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    computer = arr[randomIndex];
    return computer;
}

function checkWinner() {
    if (player == computer) {
        return("Draw. You and Computer's choice is the same.");
    } 
    else if (computer == choices[0]) {
        return (player == choices[1]) ? "You Win!" : "You Lose!";
    } 
    else if (computer == choices[1]) {
        return (player == choices[2]) ? "You Win!" : "You Lose!";
    } 
    else if (computer == choices[2]){
        return (player == choices[0]) ? "You Win!" : "You Lose!";
    }
}

function showMessage() {
    setTimeout(() => {
        resultDisplay.style.display = "block";
        messageContainer.textContent = checkWinner();
        
        restartBtn.style.transform = "scale(1)"; // Reset the scale
        restartBtn.style.opacity = "1"; // Reset the opacity
        restartBtn.style.display = "block"; // Reset the display
    }, 1000);
}

function displayChoices(displayContainer, iconClassName) {
    // Clear previous choices
    displayContainer.innerHTML = "";
    
    // Create and append the new icon
    const icon = document.createElement('i');
    icon.className = `fa-solid ${iconClassName}`;
    displayContainer.appendChild(icon);
}

function startGame() {
    let size = 100;

    intervalId = setInterval(() => {
        if(size <= 0) {
            clearInterval(intervalId);
            preGame.style.display = "none";
        } else {
            size -= 5;
            preGame.style.transform = `scale(0.${size})`;
            preGame.style.opacity = `0.${size}`;
        }
    }, 5);
}

function restartGame() {
    // Clear player and computer choices
    playerChoiceDisplay.innerHTML = "";
    computerChoiceDisplay.innerHTML = "";

    // Reset the game state
    player = null;
    computer = null;

    let size = 100;

    intervalId = setInterval(() => {
        if(size <= 0) {
            clearInterval(intervalId);
            resultDisplay.style.display = "none";
        } else {
            size -= 5;
            restartBtn.style.transform = `scale(0.${size})`;
            restartBtn.style.opacity = `0.${size}`;
        }
    }, 5);
}