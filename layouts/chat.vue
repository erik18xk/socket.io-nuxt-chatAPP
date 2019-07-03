<template>
    <div class="wrapper__chat">
        <Header />
        <main>
            <nuxt />
        </main>
        <footer>
            <h1> This is the footer of the page </h1>
        </footer>
    </div>
</template>

<script>

import Header from "../components/Header"

export default {
    name: 'chat',
    components: {
        Header,
    }
}
</script>


<style lang="scss">


body {
    overflow: auto;
}

main {
    min-height: 86vh;
}

.wrapper__chat {
    max-width: 1440px;
    margin: 0 auto;
    min-height: 100vh;
    max-height: 100vh;
}

footer {
    min-height: 6vh;
}

</style>
