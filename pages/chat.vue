<template>
    <div class="columns col-gapless">
        <div class="column col-4">
            <Sidebar />
        </div>
        <div class="column col-8">
            <section class="wrapper__messages">
                <div v-for="(item, key) in messages" v-bind:key="key">
                    <p><strong> {{ item.username }} </strong><span> {{ item.message }} </span></p>
                </div>
            </section>
            <div class="divider"></div>
            <section class="wrapper__input">
                <div class="input-group">
                    <input class="form-input" type="text" id="input-example-1" placeholder="Inserisci messaggio qui" v-on:keyup.enter="sendMessage" @keyup="checkTyping">
                    <button class="btn btn-primary input-group-btn" v-on:click="sendMessage">Invia</button>
                </div>
                <p class="wrapper__markdown"> #TODO adding <strong> **bold </strong> markdown system for the messages, for send a <strong> message </strong> just hit the enter or use the submit button </p>
            </section>
        </div>
    </div>
</template>

<script>

import Sidebar from "../components/Sidebar"
import { mapState } from "vuex"
import socket from "../plugins/socket.io"
import _ from "lodash"

export default {
    layout: 'chat',
    name: 'Chat',
    data: {
        timeout: null
    },
    components: {
        Sidebar,
    },

    computed: {
        ...mapState({
            users: state => state.users.list,
            messages: state => state.messages.messages,
            message: state => state.messages.message
        })
    },

    methods: {
        sendMessage(e) {
            this.$store.commit('messages/addMessage', {
                // I destruct the payload argument for passing socket and the message to the mutation
                message: e.target.value,
                socket,   
                username: 'you'
            })

            e.target.value = ''
        },

        checkTyping() {
            clearTimeout(this.timeout)
            socket.emit('typing')
            this.timeout = setTimeout(function() {
                socket.emit('stop typing')
            }, 1000)
        },
    },


    mounted() {

        socket.on('user joined', (username) => {
            this.$store.commit('users/addUser', username)
        })

        socket.on('user left', (username) => {
            this.$store.commit('users/userLeft', username)
        })

        socket.on('new message', (data) => {
            this.$store.commit('messages/receivedMessage', {
                message: data.message,
                username: data.username
            }) 
        })

        socket.on('typing', (username) => {
            this.$store.commit('users/userTyping', username)
        })

        socket.on('stop typing', (username) => {
            this.$store.commit('users/userStopTyping', username)
        })
    }

}
</script>

<style lang="scss" scoped>

@import "~/assets/scss/main.scss";

.wrapper__messages {
    height: 90vh;
    padding: 2.50rem 1.10rem 1.10rem 1.10rem;
    overflow: auto !important;
}

.wrapper__input {
    height: 10vh;
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    padding: 0rem 0.50rem 1rem 0.5rem;

    input {
        font-size: 13.5px;
    }

    .wrapper__markdown {
        margin: 0;
        font-size: 11px;
        margin-top: 12px;
        margin-bottom: 6px;
    }
}

.column.col-4 {
    padding-right: 1em;
    border-right: 0.10rem solid #f1f3f5
}

.columns.col-gapless {
    height: 100vh;
}

</style>


