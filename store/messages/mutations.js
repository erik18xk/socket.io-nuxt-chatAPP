export default {
    addMessage(state, { message, socket, username }) {

        console.log(socket)

        state.messages.push({
            message: message,
            username: username
        })

        // send the message to the server.

        socket.emit('new message', message)

    },

    receivedMessage(state, { message, username }) {

        state.messages.push({
            message: message, 
            username: username
        })

    },

    handleChange(state, message) {
        state.message = message
    },

    messageSend(state) {
        state.message = ''
    },
}