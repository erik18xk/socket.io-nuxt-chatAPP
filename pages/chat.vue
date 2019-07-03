<template>
    <div class="columns">
        <div class="column col-2">
            <Sidebar />
        </div>
         <div class="divider-vert"></div>
        <div class="column col-8">
            <div class="wrapper__messages">
                <div v-for="item in messages">
                    <p><strong> {{ item.username }} </strong><span> {{ item.message }} </span></p>
                </div>
            </div>
            <div class="wrapper__input">
                <div class="form-group">
                    <input class="form-input" type="text" id="input-example-1" placeholder="Name" v-on:keyup.enter="sendMessage" @keyup="checkTyping">
                    <button v-on:click="sendMessage"> Press me </button>
                </div>
            </div>
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
            messages: state => state.messages.messages
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
        },

        checkTyping() {
            clearTimeout(this.timeout)
            socket.emit('typing')
            this.timeout = setTimeout(function() {
                socket.emit('stop typing')
            }, 2000)
        }
    },


    mounted() {

        console.log("Listening")

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

