const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let waitingPlayers = [];
let games = [];

wss.on('connection', ws => {
    console.log('A new player connected');

    waitingPlayers.push(ws);

    if (waitingPlayers.length >= 2) {
        const player1 = waitingPlayers.pop();
        const player2 = waitingPlayers.pop();

        const game = {
            players: [player1, player2],
            board: Array(9).fill(null),
            currentPlayer: 0, 
        };

        player1.send(JSON.stringify({ type: 'pairing', message: 'You are paired with a player!' }));
        player2.send(JSON.stringify({ type: 'pairing', message: 'You are paired with a player!' }));

        player1.send(JSON.stringify({ type: 'game', game: game }));
        player2.send(JSON.stringify({ type: 'game', game: game }));

        games.push(game);

        player1.on('message', (message) => handlePlayerMove(player1, message, game));
        player2.on('message', (message) => handlePlayerMove(player2, message, game));
    }
});

function handlePlayerMove(player, message, game) {
    const move = JSON.parse(message);

    if (game.players[game.currentPlayer] === player && game.board[move.index] === null) {
        game.board[move.index] = game.currentPlayer === 0 ? 'X' : 'O';
        game.currentPlayer = game.currentPlayer === 0 ? 1 : 0;

        game.players.forEach(p => {
            p.send(JSON.stringify({ type: 'game', game: game }));
        });

        checkWinner(game);
    }
}

function checkWinner(game) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (game.board[a] && game.board[a] === game.board[b] && game.board[a] === game.board[c]) {
            game.players[game.currentPlayer].send(JSON.stringify({ type: 'game-over', winner: game.board[a] }));
            game.players[game.currentPlayer === 0 ? 1 : 0].send(JSON.stringify({ type: 'game-over', winner: game.board[a] }));
            return;
        }
    }

    if (!game.board.includes(null)) {
        game.players.forEach(p => {
            p.send(JSON.stringify({ type: 'game-over', winner: 'Draw' }));
        });
    }
}
