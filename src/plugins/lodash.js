import lodash from 'lodash'

export default {
  install (Vue) { // Sails Socket IO Client
    Object.defineProperty(Vue.prototype, '_', { value: lodash })
  }
}
