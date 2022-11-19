import {io} from "socket.io-client"

const socket = io("ws://localhost:3000")
socket.on("restart", () => {
    setTimeout(() => {
        window.location.reload()
    }, 1000)
})
export default socket 