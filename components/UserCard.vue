<template>
    <div class="card__wrapper">
        <div class="img__wrapper">
            <figure class="avatar avatar-lg">
                <img src="https://picturepan2.github.io/spectre/img/avatar-1.png" alt="avatar">
            </figure>
        </div>
        <div class="info__wrapper">
            <p v-if="username == user"> <strong> you </strong> </p>
            <p v-else>  {{ username }} </p>
            <p v-if="is_typing" class="is_typing"> Is typing ... </p>
        </div>
    </div>
</template>


<script>

import { mapState } from "vuex";

export default {
    name: 'UserCard',
    props: [
        'username',
        'is_typing'
    ],

    computed: {
        ...mapState({
            user: state => state.socket.username
        })
    }

}
</script>

<style lang="scss" scoped>

.card__wrapper {
    margin-top: 1em;
    margin-bottom: 1em;
    display: flex;
    flex: 1;
    flex-flow: row;
    justify-content: flex-start;

    figure {
        margin-right: 25px;
    }

    .info__wrapper {
        display: flex;
        flex-flow: column;

        .is_typing {
            font-size: 13px;
            color: grey;
        }
    }
}

p {
    margin: 0;
}

</style>

