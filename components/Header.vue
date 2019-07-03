<template>
    <header class="navbar">
        <section class="navbar-section">
            <a href="#" class="btn btn-link">Welcome {{ username }}</a>
        </section>
        <section class="navbar-section">
            <a href="#" class="btn btn-link">GitHub</a>
        </section>
    </header>
</template>

<script>

export default {
    name: 'Header',

    computed: {
        username() {
            return this.$store.state.socket.username
        }
    },
}
</script>

<style lang="scss" scoped>

.navbar {
    min-height: 8vh;
}

</style>


