<template>
    <div class="wrapper__sidebar">
        <div class="header__sidebar">
            <h3> Online users  </h3>
        </div>
        <div class="body__sidebar">
            <div v-for="(item, key) in list" v-bind:key="key">
                <UserCard :username="item.username" :is_typing="item.is_typing" />
            </div>
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
    justify-content: flex-start;
    min-height: 86vh;
    max-height: 86vh;
}

.body__sidebar {
    display: flex;
    flex-flow: column;

}

</style>

