const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const redis = require('redis');
const { promisify } = require('util');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
require('dotenv').config();

const client = redis.createClient();
client.on('error', (err) => {
    console.error('Redis error:', err);
});

client.on('connect', () => {
    console.log('Connected to Redis');
});
// const getAsync = promisify(client.get).bind(client);
// const setAsync = promisify(client.set).bind(client);

function getAsync(room) {
    return new Promise((resolve, reject) => {
        client.get(room, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function setAsync(room, data) {
    return new Promise((resolve, reject) => {
        client.set(room, data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route handling
app.use('/', require('./routes/index'));

io.on('connection', socket => {
    console.log('New connection:', socket.id);

    socket.on('joinRoom', async (room) => {
        console.log('####   Joining room:', room);
        socket.join(room);
        const gameState = await getAsync(room);

        if (gameState) {
            socket.emit('gameState', JSON.parse(gameState));
        } else {
            const initialState = {
                board: Array(9).fill(null),
                currentPlayer: 'X',
                players: [socket.id],
            };
            await setAsync(room, JSON.stringify(initialState));
            socket.emit('gameState', initialState);
        }

        socket.to(room).emit('playerJoined', socket.id);
    });

    socket.on('makeMove', async (data) => {
        console.log('Making move:', data);
        const { room, index } = data;
        const gameState = JSON.parse(await getAsync(room));

        if (gameState.board[index] || gameState.currentPlayer !== data.player) {
            return;
        }

        gameState.board[index] = gameState.currentPlayer;
        gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';

        await setAsync(room, JSON.stringify(gameState));
        io.in(room).emit('gameState', gameState);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected:', socket.id);
    });
});



// Server setup
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});