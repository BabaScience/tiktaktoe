const socket = io();

let room;
let player;

const X_CLASS = 'x';
const O_CLASS = 'o';
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winning-message');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restartButton');
const joinRoomButton = document.getElementById('joinRoomButton');

joinRoomButton.addEventListener('click', joinRoom);
restartButton.addEventListener('click', restartGame);

function joinRoom() {
    room = document.getElementById('roomName').value;
    if (room) {
        socket.emit('joinRoom', room);
        document.getElementById('room').style.display = 'none';
        board.style.display = 'grid';
    }
}

socket.on('playerJoined', (playerId) => {
    if (!player) {
        player = playerId === socket.id ? 'X' : 'O';
    }
});

socket.on('gameState', gameState => {
    updateBoard(gameState);
});

cellElements.forEach(cell => {
    cell.addEventListener('click', () => handleClick(cell), { once: true });
});

function handleClick(cell) {
    const index = Array.from(cellElements).indexOf(cell);
    if (player && cell.innerText === '') {
        socket.emit('makeMove', { room, index, player });
    }
}

function updateBoard(gameState) {
    gameState.board.forEach((mark, index) => {
        const cell = cellElements[index];
        cell.innerText = mark;
        cell.className = 'cell';
        if (mark) {
            cell.classList.add(mark.toLowerCase());
        }
    });

    if (checkWin(gameState.board)) {
        endGame(false, gameState.currentPlayer === 'X' ? 'O' : 'X');
    } else if (isDraw(gameState.board)) {
        endGame(true);
    }
}

function endGame(draw, winner = '') {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!';
    } else {
        winningMessageTextElement.innerText = `${winner} Wins!`;
    }
    winningMessageElement.classList.add('active');
}

function isDraw(board) {
    return board.every(cell => cell !== null);
}

function checkWin(board) {
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return board[index] && board[index] === board[combination[0]];
        });
    });
}

function restartGame() {
    socket.emit('joinRoom', room);
    winningMessageElement.classList.remove('active');
}
