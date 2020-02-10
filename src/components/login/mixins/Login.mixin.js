export default {
  computed: {
    user: {
      get () {
        let _s = this
        return _s.$store.state.userinfo
      }
    },

    username: {
      get () {
        let _s = this
        return _s.$store.state.userinfo.username
      },

      set (username) {
        let _s = this
        _s.$store.commit('SET_USER_USERNAME', username)
      }
    },

    password: {
      get () {
        let _s = this
        return _s.$store.state.userinfo.password
      },

      set (password) {
        this.$store.commit('SET_USER_PASSWORD', password)
      }
    },
    usernameRules: {
      get () {
        return [
          v => !!v || 'Username is required'
        ]
      }
    },
    passwordRules: {
      get () {
        return [
          v => !!v || 'Password is required'
        ]
      }
    },
    unsuccessfulRules: {
      get () {
        return [
          v => !!v || 'Please check your username or password'
        ]
      }
    },
    isLogin: {
      get () {
        return this.$store.state.userinfo.islogin ? 'Please check your username or password' : ''
      }
    }
  },

  methods: {
    login: function () {
      this.$store.dispatch('AUTH_REQUEST', this.user)
    }
  },
  destroyed () {
    let _s = this
    _s.username = ''
    _s.password = ''
    _s.$store.state.userinfo.islogin = false
  }
}
