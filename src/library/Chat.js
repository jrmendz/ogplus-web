/**
 * Chat Feature
 * => Used by ChatComponent
 */
export default {
  data() {
    return {
      dealerInfo: {},
      isBusy: false,
      newmessage: null,
      nickName: this.$store.state.userinfo.nickname,
      typing: false,
      showEmoji: false,
      chatEmoji: ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😗', '😙', '😚', '🙂', '🤗', '🤩', '🤔', '🤨', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '😴', '😌', '😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🙃', '🤑', '😲', '🙁', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '😰', '😱', '😳', '🤪', '😵', '😡', '😠', '🤬', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '😇', '🤠', '🤡', '🤥', '🤫', '🤭', '🧐', '🤓', '😈', '👿', '👹', '👺', '💀', '👻', '👽', '🤖', '💩', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾']
    }
  },
  computed: {
    isChatModalOpen: {
      get() {
        return this.$store.state.chatModal
      }
    },
    isSocialModalOpen: {
      get() {
        return this.$store.state.socialModal
      }
    },
    tableInfo: {
      get() {
        return this.tableNumber ? this.$store.state.tablelist[this.tableNumber] : {}
      }
    },
    tableNumber: {
      get() {
        return this.$store.state.currentTableIndex || {}
      }
    },
    messages: {
      get() {
        return this.tableNumber ? this.$store.state.thread : []
      }
    },
    streamerInGame: {
      get() {
        return this.$store.state.streamer.isInGame
      }
    },
    soundFx: {
      get() {
        return this.$store.state.soundFxSwitch
      }
    },
    isPlayerFollowed: {
      get() {
        return function (playerId = '') {
          return !_.isUndefined(_.find(this.$store.state.contentfromuser, {user_id: playerId}))
        }
      }
    },
    dealerUpdate: {
      get() {
        return this.$store.state.updateFeeds.follower.dealer
      }
    },
    maxChatLength: {
      get () {
        return this.$store.state.MAX_CHAT_LENGTH
      }
    },
    minBetToChat: {
      get () { return this.$store.state.MIN_BET_TO_CHAT }
    },
    totalOnTableBet: {
      get () { return this.$store.state.totalOnTableBet }
    }
  },
  methods: {
    clickEff: function () {
      if (this.soundFx) this.$store.state.audiosprite['spotFX'].play('click')
    },

    toggleFollowDealer: function () {
      let _s = this

      // Validators
      if (!_s.tableInfo.dealer)
        return false

      _s.$store.dispatch('FOLLOW_UNFOLLOW_DEALER', {
        method: _s.dealerInfo.isFollowed ? 'unfollow' : 'follow',
        dealerscode: _s.tableInfo.dealer.rid
      }).then(() => {
        // Update dealer other information
        _s.getDealerOtherInfo()
      })
    },

    toggleFollowUser: function (userId = "") {
      let _s = this
      _s.clickEff()

      // Validators
      if (!userId)
        return false

      _s.$store.dispatch('FOLLOW_UNFOLLOW_PLAYER', {
        method: _s.isPlayerFollowed(userId) ? 'unfollow' : 'follow',
        followuser: userId
      }).then(() => {
        _s.$store.state.message = 'Player has been followed'
      })
    },

    getDealerOtherInfo: function () {
      let _s = this
      _s.clickEff()

      if (!_s.tableInfo.dealer)
        return false

      _s.$store.dispatch('DEALERS_INFO', {
        dealerscode: _s.tableInfo.dealer.rid
      })
        .then((data) => {
          _s.dealerInfo = data.data.length ? data.data[0] : {}
        }, (err) => {
          console.log(err)
        })
    },

    toggleEmoticons: function () {
      this.clickEff()
      this.showEmoji = !this.showEmoji
    },

    addEmoji: function (emoji) {
      this.clickEff()
      this.newmessage = document.getElementById('chatTextArea').value + emoji
    },

    scrollToTop: function () {
      let container = document.getElementById('chat')
      // Validators
      if (!container)
        return 0
      // Scroll to bottom
      container.scrollTop = container.scrollHeight
    },

    send: function () {
      let _s = this
      let chat = JSON.parse(localStorage.getItem('_canChat'));
      _s.clickEff()

      // Validators
      if (_s.isBusy)
        return 0
      if (!_s.newmessage.trim())
        return 0

      // Check if the player can chat
      if (!chat.activated) {
        _s.$store.state.message = 'Place ' + _s.minBetToChat + ' to enable chatting!'
        return 0
      }

      _s.isBusy = true;
      _s.$store.dispatch('GET_IP', {})
        .then((res) => {
          _s.$store.dispatch('SEND_CHAT_TABLE', {
            message: _s.newmessage.substring(0, _s.maxChatLength),
            table_number: _s.tableNumber,
            ip: res.ip
          }).then((res) => {
            _s.isBusy = false
            _s.newmessage = ""
            _s.scrollToTop()
          }, (err) => {
            this.isBusy = false
            console.log(err);
            this.$store.state.message = err.error ? err.error : 'Something wrong while sending your message'
          })
        }, (err) => {
          this.isBusy = false;
          console.log(err);
        });
    }
  },
  watch: {
    messages: {
      handler: function () {
        this.$nextTick(() => {
          this.scrollToTop()
        })
      },
      deep: true
    },

    'tableInfo.dealer': {
      handler: function (n) {
        if (n) this.getDealerOtherInfo()
      },
      deep: true
    },

    isSocialModalOpen: function (n) {
      if (!n) this.getDealerOtherInfo()
    },

    dealerUpdate: function (n) {
      if (n) {
        if (this.dealerInfo.dealerscode === n.dealersCode) {
          this.dealerInfo.followers += (n.method === '+' ? 1 : -1)
        }
      }
    }
  }
}
