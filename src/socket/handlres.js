const test = () => {
    console.log('test');
}

const handlres = (socket) => {
    socket.on('test:test', test)
}

module.export = handlres;