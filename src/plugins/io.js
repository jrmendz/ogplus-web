import sails from 'sails.io.js'
import io from 'socket.io-client'

export default {
  install (Vue) { // Sails Socket IO Client
    this.io = sails(io)
    this.io.sails.reconnection = true
    this.io.sails.url = process.env.VUE_APP_ATHENS_BASEURL
    Object.defineProperty(Vue.prototype, 'io', { value: this.io })
  }
}
