// This is the main store for the application.

export const state = () => ({
    is_typing: false,
    is_online: false,
    username: '__mock__',
})

export const mutations = {
    setUsername (state) {
        state.username = 'erikolivero'
    }
}