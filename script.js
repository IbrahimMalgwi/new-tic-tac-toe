const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("reset");
const statusDisplay = document.getElementById("status");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const closeModal = document.querySelector(".close");

let currentPlayer = "X";
let gameState = Array(9).fill(null);
let isGameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (gameState[index] || !isGameActive) {
    return;
  }

  gameState[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWinner()) {
    showModal(`${currentPlayer} has won!`);
    isGameActive = false;
    return;
  }

  if (gameState.every((cell) => cell)) {
    showModal("It's a draw!");
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
}

function checkWinner() {
  return winningConditions.some((condition) => {
    const [a, b, c] = condition;
    return (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    );
  });
}

function resetGame() {
  gameState = Array(9).fill(null);
  cells.forEach((cell) => (cell.textContent = ""));
  currentPlayer = "X";
  isGameActive = true;
  statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
}

function showModal(message) {
  modalMessage.textContent = message;
  modal.style.display = "block";
}

function closeModalHandler() {
  modal.style.display = "none";
}

board.addEventListener("click", handleCellClick);
resetButton.addEventListener("click", resetGame);
closeModal.addEventListener("click", closeModalHandler);
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModalHandler();
  }
});

resetGame(); // Initialize the game status display
