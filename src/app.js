const gameBoard = document.querySelector(".game-board");
const gameMessage = document.querySelector(".game-message");

const wordle = "OCEAN"; // tmp

const guessBoard = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
];

function createCell(rowIndex, guessIndex) {
    const cell = document.createElement("div");
    cell.setAttribute("id", `row-${rowIndex}-cell-${guessIndex}`);
    cell.classList.add("cell");
    return cell;
}

function createRow(rowIndex) {
    const rowElement = document.createElement("div");
    rowElement.setAttribute("id", `row-${rowIndex}`);
    rowElement.classList.add("row");

    guessBoard[rowIndex].forEach((guess, guessIndex) => {
        const cell = createCell(rowIndex, guessIndex);
        rowElement.appendChild(cell);
    });

    return rowElement;
}

function createGameBoard() {
    guessBoard.forEach((row, rowIndex) => {
        const rowElement = createRow(rowIndex);
        gameBoard.appendChild(rowElement);
    });
}

let currentRow = 0;
let currentCell = 0;

function addLetter(letter) {
    const pattern = /^$|^[A-Z]$/;
    // allow only normal letters
    if (!pattern.test(letter)) {
        return;
    }
    if (
        currentCell >= guessBoard[0].length ||
        currentRow >= guessBoard.length
    ) {
        return;
    }
    const cell = document.getElementById(
        `row-${currentRow}-cell-${currentCell}`
    );
    cell.textContent = letter;
    guessBoard[currentRow][currentCell] = letter;
    cell.setAttribute("data-letter", letter);
    currentCell++;
}

function checkWord() {
    // TODO: finish
    checkLetter();

    const guess = guessBoard[currentRow++].join("");
    if (guess === wordle) gameOver(true);
    else if (
        currentCell == guessBoard[0].length &&
        currentRow == guessBoard.length
    ) {
        gameOver(false);
    }

    currentCell = 0;
}

function checkLetter() {
    const row = document.querySelector("#row-" + currentRow).childNodes;
    row.forEach((cell, index) => {
        const guessLetter = cell.getAttribute("data-letter");

        setTimeout(() => {
            if (guessLetter == wordle[index]) {
                cell.classList.add("green-overlay");
            } else if (wordle.includes(guessLetter)) {
                cell.classList.add("yellow-overlay");
            } else cell.classList.add("grey-overlay");
        }, index * 300);
    });
}

function gameOver(correctGuess) {
    if (correctGuess) {
        gameMessage.textContent = "Congratulations!";
        gameMessage.style.color = "green";
        currentCell = guessBoard[0].length;
        currentRow = guessBoard.length;
    } else {
        gameMessage.textContent = "Game over, better luck next time!";
        gameMessage.style.color = "#ff0000";
    }
}

addEventListener("keypress", (event) => {
    if (event.code === "Enter") {
        if (currentCell !== guessBoard[0].length) return; // Return if row not filled
        checkWord();
    } else {
        addLetter(event.key.toUpperCase());
    }
});

addEventListener("keydown", (event) => {
    if (event.code === "Backspace") {
        if (currentCell === 0) return;
        currentCell--;
        addLetter("");
        currentCell--;
    }
});

createGameBoard();
