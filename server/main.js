// Don't forget to install socket.io module first :))

const http = require('http').createServer();
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  socket.on('message', (data) => {
    console.log(data);
    socket.broadcast.emit('message', data);
  });
});

http.listen(8080, () => {
  console.log('Server is running...');
});