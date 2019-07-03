<template>
    <div>
        <div class="wrapper__chat hide-lg">
            <main>
                <nuxt />
            </main>
        </div>
        <div class="wrapper__error show-lg">
            <h1> Ci scusiamo per il disguido ma questa applicazione funziona solamente su schermi grandi </h1>
        </div>
    </div>
</template>

<script>

export default {
    name: 'chat',
}
</script>


<style lang="scss">


body {
    overflow: hidden !important;
}


.wrapper__chat {
    max-width: 1280px;
    min-width: 960px;
    margin: 0 auto;
    height: 100vh;
    background-color: #fff !important;

    main {
        height: 100vh;
    }

}

.wrapper__error {
    padding: 1.20rem 2rem 1.20rem 2rem;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
}

</style>
