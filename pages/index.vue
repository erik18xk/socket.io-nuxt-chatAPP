<template>
  <div class="container">
    <div class="card__wrapper">
      <div class="card">
        <div class="card-header">
          <div class="card-title h5"> Inserisci nome utente </div>
          <div class="card-subtitle text-grey"> Questo è il nome con cui gli altri utenti ti visualizzeranno </div>
        </div>
        <div class="card-body">
          <div class="form-group">
            <label class="form-label" for="input-example-1">Name</label>
            <input class="form-input" type="text" id="input-example-1" placeholder="Name" :value="username" @input="handleChange">
          </div>
          <nuxt-link to="/chat"><button class="btn" v-on:click="updateUsername">Inizia a chattare</button></nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import socket from "../plugins/socket.io"
import { mapMutations, mapState } from 'vuex'

export default {
  components: {
    Logo,
  },
  computed: {
    username() {
      return this.$store.state.socket.username
    }
  },
  methods: {
    updateUsername() {
      this.$store.commit('socket/setUsername', socket)
    },

    handleChange(e) {
      this.$store.commit('socket/handleChange', e.target.value)
    }

  }
}
</script>

<style lang="scss">

@import "~/assets/scss/main.scss";

body {
  background-color: azure !important;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
