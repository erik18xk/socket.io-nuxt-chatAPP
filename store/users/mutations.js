export default {
    set(state, users) {
        users.user.map(user => {
            state.list.push({
                username: user,
                is_typing: false
            })
        })
    },

    addUser(state, username) {
        state.list.push({
            username: username.username,
            is_typing: false
        })
    },

    userTyping(state, username) {

        let i = state.list.map(item => item.username).indexOf(username.username)

        state.list[i].is_typing = true

        console.log(`${username.username} is typing`)
    },


    userStopTyping(state, username) {
        let i = state.list.map(item => item.username).indexOf(username.username)

        state.list[i].is_typing = false
    },


    userLeft(state, username) {
        let i = state.list.map(item => item.username).indexOf(username.username)

        console.log(i)

        state.list.splice(i, 1)

        console.log(`User ${username.username} left`)
        console.log(typeof(state.list))
        console.log(state.list)
    },

}