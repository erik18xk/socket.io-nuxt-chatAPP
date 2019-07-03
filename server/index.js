const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const http = require('http').createServer(app)
const socketIO = require('socket.io')

const io = socketIO(http)

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

let userCount = 0

let onlineUser = []

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })

  http.listen(8000, host)
  consola.ready({
    message: `socket.io listring on http://${host}:8000`,
    badge: true
  })

  io.on('connection', (socket) => {
    // Emit a consola when user connect to the socket.


    socket.on('new message', (data) => {
      consola.success({
        message: `new message from ${socket.username} saing ${data}`,
        badge: true
      })

      socket.broadcast.emit('new message', {
        username: socket.username,
        message: data
      })

    })

    var addUser = false

    // Create the login for the online users...

    socket.on('add user', (username) => {

      if (addUser) return;

      socket.username = username

      userCount++

      // Adding online user to the list

      onlineUser.push(username)

      addUser = true

      socket.emit('login', {
        user: onlineUser,
      })

      consola.success({
        message: `online user are ${onlineUser}`,
        badge: true,
      })


      // I should let know that a new user joined the server to all the client that are listening

      socket.broadcast.emit('user joined', {
        username: socket.username
      })
    })

    // Implement the code for getting the user that is typing.

    socket.on('typing', () => {
      socket.broadcast.emit('typing', {
        username: socket.username
      })

      consola.success({
        message: `${socket.username} is typing`
      })

    })

    socket.on('stop typing', () => {
      socket.broadcast.emit('stop typing', {
        username: socket.username
      })
    })

    // Emit a consola when user disconnect from the socket.
    socket.on('disconnect', () => {

      if (addUser) {
        userCount--

        onlineUser.splice(onlineUser.indexOf(socket.username), 1)

        consola.success({
          message: `user ${socket.username} left the channel`,
          badge: true
        })

        socket.broadcast.emit('user left', {
          username: socket.username
        })

      } else {
        console.log("What da fuck")
      }      
    })

  })
}
start()
