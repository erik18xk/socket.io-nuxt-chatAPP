<template>
    <div class="card__wrapper">
        <div class="columns">
            <div class="column col-3">
                <figure class="avatar avatar-lg">
                    <img src="https://picturepan2.github.io/spectre/img/avatar-1.png" alt="avatar">
                </figure>
            </div>
            <div class="column col-9">
                <p v-if="username == username">  {{ username }} </p>
                <p v-if="is_typing"> Is typing ... </p>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'UserCard',
    props: [
        'username',
        'is_typing'
    ]
}
</script>

<style lang="scss" scoped>

.card__wrapper {
    margin-top: 1em;
    margin-bottom: 1em;
}

p {
    margin: 0;
}

</style>

