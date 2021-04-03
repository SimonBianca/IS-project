export const SocketIO = (function () {
    let io: any;
    let clients: any[] = [];

    return {
        emit: emit,
        connectWebSocket: connectWebSocket
    };

    function connectWebSocket(server: any) {
        io = require('socket.io')(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST", "PUT"]
              }
        });
        io.on('connection', (newClient: any) => { 
            clients.push(newClient);
        });
    }

    function emit(channel: string, value: any) {
        clients.forEach(c => c.emit(channel, value));
    }
})();