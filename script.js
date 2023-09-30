const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const reset = document.querySelector("#reset");

const startCells = [
    "", "", "", "", "", "", "", "", ""
];

let count = 0;
let go = "circle";
infoDisplay.textContent = "Circle goes first"

function createBoard() {
    startCells.forEach((cell, index) => {
        const cellElements = document.createElement('div')
        cellElements.classList.add('square')
        cellElements.id = index
        cellElements.addEventListener("click", addGo)
        gameBoard.append(cellElements)

    })
}

createBoard();

function addGo(e) {
    console.log(e.target)
    const goDisplay = document.createElement('div');
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go === "circle" ? "cross" : "circle";
    infoDisplay.textContent = "it is now " + go + "'s go.";
    e.target.removeEventListener("click", addGo)
    count = count + 1;
    checkScore();
    
}

function checkScore() {
    let crossWins;
    let circleWins;

    const allSquares = document.querySelectorAll(".square")
    // console.log(allSquares);
    const winningCombo = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    if (count == 9 && !crossWins && !circleWins) {
        infoDisplay.textContent = "Its a draw";

    }
    winningCombo.forEach(array => {
        circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains("circle"))
        if (circleWins) {
            infoDisplay.textContent = "Circle Wins !"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            // this cloneNode act as event remover 
            return;
        }
    })

    winningCombo.forEach(array => {
        crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains("cross"))
        if (crossWins) {
            infoDisplay.textContent = "Cross Wins !"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            // this cloneNode act as event remover 
            return;
        }
    })
  
} 

function resetGame() {
    // Clearing the game board
    gameBoard.innerHTML = "";

    // Reseting the startCells array and other variable
    startCells.fill("");
    count = 0;
    go = "circle";
    infoDisplay.textContent = "Circle goes first";

    // Recreating the game board
    createBoard();
}

reset.addEventListener("click", resetGame);








