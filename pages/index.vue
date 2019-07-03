<template>
  <div class="container">
    <div class="card__wrapper">
      <div class="card">
        <div class="card-header">
          <div class="card-title h1"> Inserisci nome utente </div>
          <div class="card-subtitle text-grey"> Questo è il nome con cui gli altri utenti ti visualizzeranno </div>
        </div>
        <div class="card-body">
          <div class="form-group " v-bind:class="{'has-error' : hasError } ">
            <input class="form-input" type="text" id="input-username" placeholder="Inserisci nome utente" :value="username" @input="handleChange">
            <p class="form-input-hint">Devi inserire un nome utente valido </p>
          </div>
          <nuxt-link to="/chat"><button class="btn" v-on:click="updateUsername">Inizia a chattare</button></nuxt-link>
          <p> Attenzione questa chat di testo non dispone di database e non utilizza cookies, quindi una volta aggiornata o chiusa la chat, i messaggi saranno eliminati e non sarà possibile recuperarli </p>
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

    // Fix with ...mapState

    username() {
      return this.$store.state.socket.username
    },
    hasError() {
      return this.$store.state.socket.hasError
    }
  },
  methods: {
    updateUsername() {
      this.$store.commit('socket/setUsername', socket)
    },

    handleChange(e) {
      this.$store.commit('socket/handleChange', e.target.value)
    }

  },
  mounted() {
    socket.on('login', (onlineUser) => {
      this.$store.commit('users/set', onlineUser)
    }) 
  }
}
</script>

<style lang="scss">

@import "~/assets/scss/main.scss";


.card {
  padding: 4em 4em;
}

.form-input {
  margin-top: 2em;
  margin-bottom: 1em;
}

.btn {
  margin-top: 1em;
  margin-bottom: 2.5em;
}

.container {
  max-width: 920px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

</style>
