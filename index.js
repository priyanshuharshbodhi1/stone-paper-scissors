const openRulesButton = document.getElementById("openRulesButton");
const gameRulesPopup = document.getElementById("gameRulesPopup");
const closeButton = document.getElementById("closeButton");
const resetButton = document.querySelector(".lower-panel button:first-child");




resetButton.addEventListener("click", () => {
  resetGame();
});

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  updateScore();
  hands.forEach((hand) => (hand.style.display = "block"));
  if (resultPanel.parentNode) {
    mainContainer.removeChild(resultPanel);
  }
  clearBorders(); // Clear existing borders
}

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

// Game state
// let playerScore = 0;
// let computerScore = 0;

// Update the player and computer scores
function updateScore() {
  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
  saveScores();


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

    saveScores();
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

  // Clear scores from local storage when game resets
  localStorage.removeItem("playerScore");
  localStorage.removeItem("computerScore");
}

// Computer's random choice
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];
}

getComputerChoice()
function clearBorders() {
  hands.forEach((hand) =>
    hand.classList.remove("selected", "computer-selected")
  );
}

// Compare choices and update scores
function compareChoices(playerChoice, computerChoice) {
  if (playerScore >= 10 || computerScore >= 10) {
    return; // Game is already won, no need to update scores
  }

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

function animateHands(playerChoice, computerChoice) {
  const playerOverlay = document.createElement("div");
  playerOverlay.classList.add("hand-overlay", "left");
  playerOverlay.innerHTML = `YOUR CHOICE <br> <br> <img src="/assets/${playerChoice}.png" class="hand ${playerChoice}" />`;
  playerOverlay.style.textAlign = "center";
  playerOverlay.style.color = "#fff";
  playerOverlay.style.marginLeft = "1rem";

  const computerOverlay = document.createElement("div");
  computerOverlay.classList.add("hand-overlay", "right");
  computerOverlay.innerHTML = `AI'S CHOICE <br> <br> <img src="/assets/${computerChoice}.png" class="hand ${computerChoice}" />`;
  computerOverlay.style.textAlign = "center";
  computerOverlay.style.color = "#fff";
  computerOverlay.style.marginRight = "1rem";

  mainContainer.appendChild(playerOverlay);
  mainContainer.appendChild(computerOverlay);

  setTimeout(() => {
    playerOverlay.classList.add("show");
    computerOverlay.classList.add("show");

    setTimeout(() => {
      mainContainer.removeChild(playerOverlay);
      mainContainer.removeChild(computerOverlay);
      compareChoices(playerChoice, computerChoice);
    }, 1000);
  }, 10);
}

// Add click event listeners to hands
hands.forEach((hand) => {
  hand.addEventListener("click", () => {
    const playerChoice = hand.classList[1]; // rock, paper, scissors
    const computerChoice = getComputerChoice();

    animateHands(playerChoice, computerChoice);
  });
});

// Initialize the game
resetGame();

loadScores();

// Load scores from local storage
function loadScores() {
  const savedPlayerScore = localStorage.getItem("playerScore");
  const savedComputerScore = localStorage.getItem("computerScore");
  if (savedPlayerScore !== null && savedComputerScore !== null) {
    playerScore = parseInt(savedPlayerScore);
    computerScore = parseInt(savedComputerScore);
    updateScore();
  }
}

// Save scores to local storage
function saveScores() {
  localStorage.setItem("playerScore", playerScore);
  localStorage.setItem("computerScore", computerScore);
}

window.addEventListener("load", () => {
  loadScores();
});

