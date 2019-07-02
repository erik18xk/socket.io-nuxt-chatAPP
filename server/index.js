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

  http.listen(3001, host)
  consola.ready({
    message: `socket.io listring on http://${host}:3001`,
    badge: true
  })

  io.on('connection', (socket) => {
    // Emit a consola when user connect to the socket.
    consola.ready({
      message: `new user connected on port 3001`,
      badge: true
    })

    // Emit a consola when user disconnect from the socket.
    socket.on('disconnect', (socket) => {
      consola.ready({
        message: `user disconnected on port 3001`,
        badgne: true
      })
    })

  })
}
start()
