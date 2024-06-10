document.addEventListener("DOMContentLoaded", () => {
    let cells = document.querySelectorAll(".cell");
    let displayMessage = document.getElementById("message");
    let resetbtn = document.getElementById("reset");

    let xTurn = true;
    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""];


    let winningState = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function checkWin() {
        for (let condition of winningState) {
            let [a, b, c] = condition;
            if (gameState[a] && gameState[a] == gameState[b] && gameState[a] == gameState[c]) {
                gameActive = false;
                return gameState[a];
            }
        }
        if (!gameState.includes('')) {
            gameActive = false;
            return 'tie';
        }
        return null;
    }

    function handleClickEvent(e) {
        let cellIndex = parseInt(e.target.getAttribute('cell-index'),10);

        if (gameState[cellIndex] || !gameActive) {
            return;
        }

        gameState[cellIndex] = xTurn ? 'X' : 'O';
        e.target.textContent = xTurn ? 'X' : 'O';


        let winner = checkWin();
        if (winner) {
            displayMessage.textContent = winner === 'tie' ? 'It is Tie!!' : `${winner} wins!!`;
        }
        else {
            xTurn = !xTurn;
        }

    }

    function resetGame() {
        xTurn = true;
        gameActive = true;
        gameState = ["", "", "", "", "", "", "", "", ""];

        cells.forEach(cell => cell.textContent = '');
        displayMessage.textContent = '';

    }

    cells.forEach(cell => cell.addEventListener("click", handleClickEvent));
    resetbtn.addEventListener("click", resetGame);
});