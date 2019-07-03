<template>
    <div class="wrapper__chat">
        <Header />
        <div class="divider"></div>
        <main>
            <nuxt />
        </main>
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

.wrapper__chat {
    max-width: 1440px;
    margin: 0 auto;
}

</style>
