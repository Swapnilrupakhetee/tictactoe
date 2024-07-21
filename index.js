document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".box");
    const clickSound = document.getElementById("click-sound");

    boxes.forEach(box => {
        box.addEventListener("click", () => {
            clickSound.play();
        });
    });
});

let playerText = document.getElementById("playertext");
let restartButton = document.querySelector(".restart-button");
let boxes = Array.from(document.querySelectorAll(".box"));

const o = "O";
const x = "X";

let currentPlayer = x;
let spaces = Array(9).fill(null);

const startGame = () => {
    boxes.forEach(box => box.addEventListener("click", boxClicked));
}

function boxClicked(e) {
    const id = e.target.id;

    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon() !== false) {
            playerText.innerText = `${currentPlayer} has won!`;
            let winningBlocks = playerHasWon();
            console.log(winningBlocks);
            boxes.forEach(box => box.removeEventListener("click", boxClicked)); 
            return;
        }

        currentPlayer = currentPlayer == x ? o : x;
        playerText.innerText = "Player " + currentPlayer + "'s Turn";
    }
}

const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function playerHasWon() {
    for (const wins of win) {
        let [a, b, c] = wins;
        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] === spaces[c])) {
            return [a, b, c];
        }
    }
    return false;
}

function restart() {
    spaces = Array(9).fill(null);
    boxes.forEach(box => {
        box.innerText = "";
        box.addEventListener("click", boxClicked); 
    });
    currentPlayer = x;
    playerText.innerText = "Player X's Turn";
}

restartButton.addEventListener("click", restart);

startGame();
