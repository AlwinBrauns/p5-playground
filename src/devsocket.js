import {io} from "socket.io-client"

const socket = io("ws://localhost:3000")
socket.on("restart", () => {
    window.location.reload()
})
export default socket