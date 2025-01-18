const ws = new WebSocket('ws://localhost:8080');
let game = null;
let playerSymbol = null;

const gameBoard = document.getElementById('game-board');
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.addEventListener('click', () => makeMove(i));
    gameBoard.appendChild(cell);
}

ws.onmessage = function (event) {
    const data = JSON.parse(event.data);

    if (data.type === 'pairing') {
        document.getElementById('status-message').textContent = data.message;
    }

    if (data.type === 'game') {
        game = data.game;
        renderBoard();
    }

    if (data.type === 'game-over') {
        const message = data.winner === 'Draw' ? 'It\'s a draw!' : `Player ${data.winner} wins!`;
        document.getElementById('status-message').textContent = message;
    }
};

function renderBoard() {
    gameBoard.querySelectorAll('.cell').forEach((cell, index) => {
        cell.textContent = game.board[index] ? game.board[index] : '';
        cell.style.pointerEvents = game.board[index] ? 'none' : 'auto';
    });
}

function makeMove(index) {
    if (!game || game.board[index] !== null) return;

    const move = { index: index };
    ws.send(JSON.stringify(move));
}