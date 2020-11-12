import './LoadEnv'; // Must be the first import

import engine from 'engine.io';

const server = engine.listen(80);

server.on('connection', function (socket) {
  console.log('123');
  socket.send('string');
});
