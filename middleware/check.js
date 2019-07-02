
export default function ({ store, redirect }) {
    let username = store.getters['socket/username']

    if (!username) {
        return redirect('/')
    }
}