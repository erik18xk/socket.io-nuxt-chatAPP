<template>
    <div class="wrapper__sidebar">
        <div class="header__sidebar">
            <h3> UTENTI ONLINE </h3>
        </div>
        <div class="divider text-center" data-content="User List"></div>
        <div class="body__sidebar">
            <div v-for="(item, key) in list" v-bind:key="key">
                <UserCard :username="item.username" :is_typing="item.is_typing" />
            </div>
        </div>
        <div class="footer__sidebar">
            <a href="http://www.google.it"> GitHub repo </a>
        </div>
    </div>
</template>

<script>

import UserCard from "./UserCard"

import { mapState } from "vuex"

export default {
    name: 'Sidebar',

    components: {
        UserCard,
    },

    computed: {
        ...mapState({
            list: state => state.users.list
        })
    },

}
</script>

<style lang="scss" scoped>

.wrapper__sidebar {
    display: flex;
    flex-flow: column;
    margin-top: 4em;
    padding: 0 1.50rem;
    height: 100vh;
}

.header__sidebar {
    margin-bottom: 1.60em;
}

.body__sidebar {
    display: flex;
    flex-flow: column;
    margin-top: 2.5em;
    align-items: flex-start;
}

.footer__sidebar {
    position: absolute;
    bottom: 20px;
}

</style>

