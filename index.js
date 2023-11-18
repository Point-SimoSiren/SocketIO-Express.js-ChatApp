// BACK END

const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

// Tässä ei nyt käytetäkään express staticia vaan lähetetään html manuaalisesti
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});


io.on('connection', (socket) => {

  // Kun palvelin vastaanottaa viestin se emitoi sen kaikille clienteille heti
socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
});
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
