// I use the plugin for extablish the connection when the page hit the server.
import io from "socket.io-client"
const socket = io('http://localhost:3001')

export default socket