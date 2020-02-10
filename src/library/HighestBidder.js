import Global from '@/library/Global.js'
export default {
  mixins: [ Global ],
  data () {
    return {

    }
  },
  computed: {
    betRankData: {
      get () {
        return this.$store.state.betRankData
      }
    },
    tblStatus: {
      get () {
        return this._TableInfo().status
      }
    },
    tbl: {
      get () {
        return this._TableInfo()
      }
    }
  },
  methods: {
  },
  watch: {
    betRankData: function (n, o) {
      let _s = this
      let promptCat = _s.$store.state.promptCat
      let i0

      _.forEach(n, function (v, k) {
        if (v.length) {
          // Get index of the bet place
          i0 = _.findIndex(promptCat, (o) => { return o.bet_place === k })
          // Check if the index greater than
          if (i0 > -1) {
            promptCat[i0]['user_id'] = v[0]['user_id']
            promptCat[i0]['avatar'] = myAvatar(v[0]['user_id'])
            promptCat[i0]['nickname'] = myName(v[0]['user_id'])
            promptCat[i0]['bet_amount'] = v[0]['bet_amount']
          } else {
            promptCat.push({
              user_id: v[0].user_id,
              avatar: myAvatar(v[0]['user_id']),
              nickname: myName(v[0]['user_id']),
              bet_amount: v[0].bet_amount,
              bet_place: v[0].bet_place
            })
          }
        }
      })

      function myAvatar (id) {
        let avatar = _.filter(_s.tbl.playerLists, (o) => { return o.id === id })
        return avatar.length ? avatar[0].imgname : ''
      }

      function myName (id) {
        let name = _.filter(_s.tbl.playerLists, (o) => { return o.id === id })
        return name.length ? name[0].nickname : ''
      }
    },
    tblStatus: function (n, o) {
      let _s = this
      switch (n) {
        case 'dealing' :
          setTimeout(() => {
            _s.$store.state.promptCat = []
          }, 1000)
          break
      }
    }
  }
}
