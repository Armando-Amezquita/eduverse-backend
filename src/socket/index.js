const socketIO = require('socket.io')
const jwt = require('jsonwebtoken');
const { config } = require('dotenv');
const eventHandlres = require('./handlres');

class SocketManager{
    constructor(){
        if(!SocketManager.instace){
            this.socket = null;
            SocketManager.instace = this;
        }
        return SocketManager.instace;
    }

    authenticateUser(socket, next){
        try {
            const token = socket.handshake.auth;
            if(!token){
                throw new Error('Error, token not send');
            }
            const decodedToken = jwt.verify(token, config.jwt.secret);
            socket.user = decodedToken;
            next();
        } catch (error) {
            console.log('error :>> ', error);
            socket.disconnect();
        }
    }

    onConnection(socket){
        const { _id } = socket.handshake.query || {};
        socket.join(socket.user._id)
        socket.join(_id)

        eventHandlres(socket)
        socket.on("disconnect", () => {})
    }

    createSocketInstance(server){
        if(!this.socket){
            this.socket = socketIO();

            const io = this.socket.attach(server, {
                path: '/socket.io',
                transports: ["websocket"], 
                cors: "aqui configurar cors"
            });

            io.use(this.authenticateUser);
            io.on("connection", this.onConnection);
        }
    }

    getSocket(){
        return this.socket;
    }
}

module.export = new SocketManager()