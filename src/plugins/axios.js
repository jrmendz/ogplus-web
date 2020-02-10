import axios from 'axios'

export default {
  install (Vue) { // Axios
    Object.defineProperty(Vue.prototype, 'axios', { value: axios })
  }
}
