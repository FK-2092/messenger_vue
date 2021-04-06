const httpServer = require("http").createServer();
const uuid = require('uuid').v4

const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:8080",
    },
});

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
        return next(new Error("invalid username"));
    }
    socket.username = username;
    next();
});

io.on("connection", (socket) => {
    const id = socket.handshake.auth.username
    socket.join(id)

    socket.onAny((event, ...args) => {
        console.log('ANY', event, args, 'ENDANY');
    })

    socket.on('send-message', (message) => {
        const {conversation} = message
        io.to(conversation).emit('new-message', {
            ...message,
            id: uuid(),
            user: {
                name: id
            }
        })
    })

    socket.on('join-conversations', (conversations) => {
        conversations.map(item => {
            socket.join(item)
        })
    })

    socket.on('leave-conversations', (conversations) => {
        conversations.map(item => {
            socket.leave(item)
        })
    })
});

httpServer.listen(3000)