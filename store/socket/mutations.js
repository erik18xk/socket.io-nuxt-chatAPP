export default {
    setUsername(state, socket) {

        if (state.username) {
            socket.emit('add user', state.username)
        } 
    },

    handleChange(state, message) {
        state.username = message
    }
}