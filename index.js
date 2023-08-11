const openRulesButton = document.getElementById("openRulesButton");
const gameRulesPopup = document.getElementById("gameRulesPopup");
const closeButton = document.getElementById("closeButton");

openRulesButton.addEventListener("click", () => {
  gameRulesPopup.style.display = "block";
});

closeButton.addEventListener("click", () => {
  gameRulesPopup.style.display = "none";
});

const hands = document.querySelectorAll(".hand");
const playerScoreElement = document.querySelector(
  ".player-score .score-number"
);
const computerScoreElement = document.querySelector(
  ".computer-score .score-number"
);
const lowerPanel = document.querySelector(".lower-panel");
const resultPanel = document.createElement("div");
resultPanel.classList.add("result-panel");
const mainContainer = document.querySelector(".main-container");
// const lowerPanel = document.querySelector('.lower-panel');

// Game state
let playerScore = 0;
let computerScore = 0;

// Update the player and computer scores
function updateScore() {
  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;

  if (playerScore >= 10 || computerScore >= 10) {
    hands.forEach((hand) => (hand.style.display = "none"));

    resultPanel.textContent = playerScore >= 10 ? "You Win!" : "You Lose!";
    resultPanel.classList.add(playerScore >= 10 ? "win" : "lose");
    resultPanel.style.textAlign = "center";
    resultPanel.style.fontSize = "4rem";
    resultPanel.style.fontWeight = "bold";
    resultPanel.style.color = "#fff";
    resultPanel.appendChild(document.createElement("br"));

    const playAgainButton = document.createElement("button");
    playAgainButton.textContent = "PLAY AGAIN";
    playAgainButton.addEventListener("click", () => {
      resetGame();
      clearBorders();
    });

    resultPanel.appendChild(playAgainButton);
    mainContainer.insertBefore(resultPanel, lowerPanel);
  }
}

// Reset the game
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  updateScore();
  hands.forEach((hand) => (hand.style.display = "block"));
  if (resultPanel.parentNode) {
    mainContainer.removeChild(resultPanel);
  }
}

// Computer's random choice
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];
}

function clearBorders() {
    hands.forEach((hand) => hand.classList.remove('selected', 'computer-selected'));
  }

// Compare choices and update scores
function compareChoices(playerChoice, computerChoice) {
    clearBorders(); // Clear existing borders
  
    // Add green border to player's selected hand
    const playerHand = document.querySelector(`.hand.${playerChoice}`);
    playerHand.classList.add('selected');
  
    // Add border to computer's selected hand
    const computerHand = document.querySelector(`.hand.${computerChoice}`);
    computerHand.classList.add('computer-selected');
  
    if (playerChoice === computerChoice) {
      return;
    }
    if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")
    ) {
      playerScore++;
    } else {
      computerScore++;
    }
    updateScore();
  }
  
// Add click event listeners to hands
hands.forEach((hand) => {
  hand.addEventListener("click", () => {
    const playerChoice = hand.classList[1]; // rock, paper, scissors
    const computerChoice = getComputerChoice();
    compareChoices(playerChoice, computerChoice);
  });
});

// Initialize the game
resetGame();
