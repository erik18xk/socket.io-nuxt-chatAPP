export default {
    setUsername(state, socket) {

        if (state.username) {
            socket.emit('add user', state.username)
        } 

        // Use this snippet for returning an error if the user did't insert a valid username.

        if (!state.username) {
            state.hasError = true
        }
    },

    handleChange(state, message) {
        state.username = message
    },
}