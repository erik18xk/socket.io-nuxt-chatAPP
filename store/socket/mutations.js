export default {
    setUsername(state, socket) {
        state.username = 'erikolivero'
        socket.emit('add user', state.username)
    }
}