import Vue from 'vue'

export default {
  /*
     _____            __   .__                      __   .__                  __   .__
    /  _  \   __ __ _/  |_ |  |__    ____    ____ _/  |_ |__|  ____  _____  _/  |_ |__|  ____    ____
   /  /_\  \ |  |  \\   __\|  |  \ _/ __ \  /    \\   __\|  |_/ ___\ \__  \ \   __\|  | /  _ \  /    \
  /    |    \|  |  / |  |  |   Y  \\  ___/ |   |  \|  |  |  |\  \___  / __ \_|  |  |  |(  <_> )|   |  \
  \____|__  /|____/  |__|  |___|  / \___  >|___|  /|__|  |__| \___  >(____  /|__|  |__| \____/ |___|  /
          \/                    \/      \/      \/                \/      \/                        \/
   */
  AUTH_REQUEST (state) {
    state.status = 'loading'
  },
  AUTH_SUCCESS (state, token) {
    state.status = 'success'
    state.token = token
  },
  AUTH_ERROR (state) {
    state.status = 'error'
  },
  /*
   ____ ___
  |    |   \ ______  ____ _______
  |    |   //  ___/_/ __ \\_  __ \
  |    |  / \___ \ \  ___/ |  | \/
  |______/ /____  > \___  >|__|
                \/      \/
   */
  SET_USER (state, user) {
    state.userinfo = user
  },
  SET_USER_USERNAME (state, username) {
    state.userinfo.username = username
  },
  SET_USER_PASSWORD (state, password) {
    state.userinfo.password = password
  },
  SET_USER_NICKNAME (state, nickname) {
    state.userinfo.nickname = nickname
  },
  SET_USER_AVATAR (state, avatar) {
    state.userinfo.avatar = avatar
  },
  SET_USER_NOTIFICATION (state, options) {
    // state.snackbar = args.value
    // state.snackbarnotification = args.message
  },
  SET_USER_BALANCE (state, balance) {
    state.userinfo.balance = balance
  },
  SET_PLAYER_CHIPS (state, chips) {
    state.chipvalues = chips
  },
  SET_PLAYER_ORIGINALCHIPS (state, chips) {
    state.customChipsValue = chips
  },
  SET_USER_MAXMININFO (state, data) {
    // console.log('SET_USER_MAXMININFO', data)
    state.maxChipValue = data.max_bet_limit
    state.minChipValue = data.min_bet_limit
  },
  // SET_USER_CHIPS (state, data) {
  //   let userData = {
  //     user_settings: JSON.parse(data.user_settings)
  //   }
  //   if (data.user_settings) {
  //     if (userData.user_settings.desktop.chips) {
  //       state.bettingChips = _.cloneDeep(userData.user_settings.desktop.chips)
  //       state.TempbettingChips = _.cloneDeep(userData.user_settings.desktop.chips)
  //     }
  //   }
  // },
  SET_USER_INFO (state, data) {
    let userData = {
      nickname: data.nickname,
      balance: data.balance,
      avatar: data.imgname,
      id: data.id,
      user_settings: JSON.parse(data.user_settings),
      min_bet_limit: data.min_bet_limit,
      max_bet_limit: data.max_bet_limit,
      otherBetLimits: data.otherBetLimits
    }
    // Update settings from DB
    if (data.user_settings) {
      _.merge(state, userData.user_settings.desktop)
      //to set the chips selected
      if (userData.user_settings.desktop.chips) {
        state.bettingChips = _.cloneDeep(userData.user_settings.desktop.chips)
        state.TempbettingChips = _.cloneDeep(userData.user_settings.desktop.chips)
        _.mapValues(state.TempbettingChips, function (x) { x.isActive = false })
        state.TempbettingChips[0].isActive = true
        state.TempbettingChips[0].isCustom = true
      }
    }

    // Update other user data
    _.merge(state.userinfo, userData)
  },
  SET_ONLINE_PLAYERS (state, onlinePlayers) {
    // state.userinfo.onlinePlayers = onlinePlayers
  },

  SET_ONLINE_STREAMERS (state, streamers) {
    console.log('SET_ONLINE_STREAMERS', streamers)
    state.streamerlist = streamers
  },
  SET_PLAYERS_INFO (state, data) {
    let property = data.property
    state.userinfo[property] = data.value
  },
  SET_FOLLOW_FRIEND (state, followplayer) {
    state.contentfromuser = followplayer
  },


  /*
     _____               .___.__
    /     \    ____    __| _/|__|_____
   /  \ /  \ _/ __ \  / __ | |  |\__  \
  /    Y    \\  ___/ / /_/ | |  | / __ \_
  \____|__  / \___  >\____ | |__|(____  /
          \/      \/      \/          \/
   */
  loadSound: (state, data) => {
    state.audiosprite[data.property] = data.value
  },
  BGM: (state, data) => {
    let _s = this
    state.game_settings.music = data
  },
  CHANGEVIDEOJS (state, data) {
    let _s = this
    _s.state.videojs = data
  },
  CHANGEHLSPLAYER (state, data) {
    let _s = this
    _s.state.hlsPlayer = data
  },
  CHANGEHLSJS (state, data) {
    let _s = this
    _s.state.hlsjs = data
  },
  STREAM (state, data) {
    state.stream = data
  },
  VID_STREAM (state, data) {
    state.vid_stream = data
  },
  PROGSRCN (state, data) {
    state.progscreen = data
  },
  changeFlvPlayer (state, data) {
    let _s = this
    _s.state.flvPlayer = data
  },
  LIVE_SOUND (state, data) {
    let _s = this
    _s.state.liveSoundSwitch = data
  },
  SET_MUTE (state, data) {
    let _s = this
    _s.state.setmute = data
  },
  VID_QUALITY (state, data) {
    let _s = this
    _s.state.videoQuality = data
  },
  PLAY_VIDEO (state, data) {
    state.hlsjs.loadSource('//stream.oriental-game.com/hls/' + data.charAt(0) + 'game' + data.charAt(1) + 'table1.m3u8')
    state.hlsjs.attachMedia(state.hlsPlayer)
    state.hlsPlayer.play()
  },

  /*
  __________                    .___    _____
  \______   \  ____ _____     __| _/   /     \  _____   ______
   |       _/ /  _ \\__  \   / __ |   /  \ /  \ \__  \  \____ \
   |    |   \(  <_> )/ __ \_/ /_/ |  /    Y    \ / __ \_|  |_> >
   |____|_  / \____/(____  /\____ |  \____|__  /(____  /|   __/
          \/             \/      \/          \/      \/ |__|
   */
  SET_GOODTIPS_ALL (state, goodtips) {
    console.log('goodtipsmutation', goodtips)
    state.checkgoodtips = goodtips
  },
  ADD_ROAD_MAPS (state, data) {
    if (state.tablelist[data.tableName]) {
      state.tablelist[data.tableName].roadMaps = data.roadMaps.data
    }
  },
  ROAD_BACKGROUND (state, data) {
    let _s = this
    _s.state.roadmapbac = data
  },
  ROAD_MAPS_UPDATE (state, data) {
    state.RoadInGame = data
  },

  GOOD_TIPS_UPDATE (state, data) {
    let gt = state.goodTipsMatch
    let index

    // Pre-setting variables
    index = gt.map(function(d){ return d['tableNumber']; }).indexOf(data.tableNumber)

    if (index > -1) {
      if (data.goodTips.length) {
        gt[index] = data
      } else {
        gt.splice(index, 1)
      }
    } else {
      if (data.goodTips.length) {
        gt.push(data)
      }
    }

    // console.log('GOOD TIPS', gt)
  },
  /*
    ___ ___  .__           __
   /   |   \ |__|  _______/  |_  ____ _______  ___.__.
  /    ~    \|  | /  ___/\   __\/  _ \\_  __ \<   |  |
  \    Y    /|  | \___ \  |  | (  <_> )|  | \/ \___  |
   \___|_  / |__|/____  > |__|  \____/ |__|    / ____|
         \/           \/                       \/
   */
  RECORD_ITEMS (state, data) {
    let _s = this
    _s.state.items = data
  },
  RECORD_HISTORY (state, data) {
    let _s = this
    _s.state.recordstart = data
  },
  RECORD_HISTORYE (state, data) {
    let _s = this
    _s.state.recordend = data
  },


  /*
  ___________       ___.    .__
  \__    ___/_____  \_ |__  |  |    ____    ______
    |    |   \__  \  | __ \ |  |  _/ __ \  /  ___/
    |    |    / __ \_| \_\ \|  |__\  ___/  \___ \
    |____|   (____  /|___  /|____/ \___  >/____  >
                  \/     \/            \/      \/
   */
  SET_ALL_TABLES_LIST: function (state, data) {
    let betAreas = {
      baccarat: {
        player: 0,
        player_pair: 0,
        tie: 0,
        banker: 0,
        banker_pair: 0,
        super_six: 0
      },
      dragontiger: {
        dragon: 0,
        tie: 0,
        tiger: 0
      },
      moneywheel: {
        '1': 0,
        '2': 0,
        '5': 0,
        '10': 0,
        '20': 0,
        'og': 0
      },
      roulette: {}
    }

    let totalBetAmountAndUsersObj = {
      totalBetAmt: 0,
      totalUser: 0
    }

    let totalBettingInfo = {
      baccarat: {
        banker: Object.assign({}, totalBetAmountAndUsersObj),
        player: Object.assign({}, totalBetAmountAndUsersObj),
        tie: Object.assign({}, totalBetAmountAndUsersObj),
        banker_pair: Object.assign({}, totalBetAmountAndUsersObj),
        player_pair: Object.assign({}, totalBetAmountAndUsersObj),
        super_six: Object.assign({}, totalBetAmountAndUsersObj)
      },
      dragontiger: {
        dragon: Object.assign({}, totalBetAmountAndUsersObj),
        tiger: Object.assign({}, totalBetAmountAndUsersObj),
        tie: Object.assign({}, totalBetAmountAndUsersObj)
      },
      moneywheel: {
        '1': Object.assign({}, totalBetAmountAndUsersObj),
        '2': Object.assign({}, totalBetAmountAndUsersObj),
        '5': Object.assign({}, totalBetAmountAndUsersObj),
        '10': Object.assign({}, totalBetAmountAndUsersObj),
        '20': Object.assign({}, totalBetAmountAndUsersObj),
        'og': Object.assign({}, totalBetAmountAndUsersObj)
      },
      roulette: {}
    }

    _.forEach(data, function (value, key) {
      let obj = {
        showBtn: false,
        playerLists: [],
        goodTipsMatch: [],
        highestBankerBidder: {userId: 0},
        highestPlayerBidder: {userId: 0},
        highestDragonBidder: {userId: 0},
        highestTigerBidder: {userId: 0},
        highestS6Bidder: {userId: 0},
        showDealerInfo: false,
        showRoad: true,
        superSix: false,
        isSuperSix: false,
        superSixDisabled: false,
        isSideBetting: false,
        isRoadUpdated: false,
        cards: {},
        totalBettingInfo: totalBettingInfo[value.code],
        confirmedBets: Object.assign({}, betAreas[data[key].code]),
        unconfirmedBets: Object.assign({}, betAreas[data[key].code]),
        tableNumber: key,
        squeezeUpdate: {}
      }
      // console.log(key, value.code)
      // if (!value.code && key.includes('M')) {
      //   value.code = 'moneywheel'
      // }
      if (key === 'M1') {
        Object.assign(obj, {isDragon: true})
      }
      data[key] = Object.assign({}, data[key], obj)
    })
    state.tablelist = Object.assign({}, state.tablelist, data)
  },
  SET_WINLOSE_INFO (state, data) {
    // console.log('------------- data.winloss ', data.winloss, ' ----- ', data.tableNumber)
    let result = data.win + data.loss
    state.sidebar_winresult[data.tableNumber] = result
    state.win_loss[data.tableNumber] = data
  },
  SET_TABLE_PLAYERS (state, table) {
    if (!state.tablelist[table.tableNumber] || _.isEmpty(table.playersList)) return;

    Object.assign(state.tablelist[table.tableNumber], { playerLists: table.playersList })
  },
  SET_TABLE_PLAYER_COUNT (state, tablePlayers) {
    _.map(state.tablelist, (value, index) => {
      value.playerCount = tablePlayers[index]
    })
  },
  UPDATE_TABLE_LIST (state, data) {
    var property = data.property
    // console.log('UPDATE_TABLE_LISTx', property)
    var value = data.value
    var tableName = data.tableName
    if (value) {
      Object.assign({}, value.cards, value.cards)
    }
    Vue.set(state.tablelist[tableName], property, value)
  },

  /**
   * @return {boolean}
   */
  FILL_BET_TABLE (state, data) {
    let betTable

    // Validators
    if (_.isUndefined(data.gameCode)) return false
    if (_.isUndefined(data.tableNumber)) return false
    if (_.isUndefined(data.sections)) return false

    // Initiate variable
    betTable = state.betTable[state.tablelist[data.tableNumber].code]

    _.map(data.sections, (bet) => {
      betTable.bets.push({
        isConfirmed: true,
        betSection: bet.betSection,
        chipValue: parseFloat(bet.chipValue),
        chipClass: bet.chipClass
      })

      betTable.sumOfStagedChips += parseFloat(bet.chipValue)
    })
  },
  /*
  ________                   .__
  \______ \    ____  _____   |  |    ____ _______  ______
   |    |  \ _/ __ \ \__  \  |  |  _/ __ \\_  __ \/  ___/
   |    `   \\  ___/  / __ \_|  |__\  ___/ |  | \/\___ \
  /_______  / \___  >(____  /|____/ \___  >|__|  /____  >
          \/      \/      \/            \/            \/
   */
  SET_FOLLOW_DEALER (state, followdealer) {
    state.contentfromdealer = followdealer
  },
  SET_FOLLOW_DEALERCOUNT (state, dealercount) {
    state.dealerfollowers = dealercount
  },

  /*
  _________  .__              __
  \_   ___ \ |  |__  _____  _/  |_
  /    \  \/ |  |  \ \__  \ \   __\
  \     \____|   Y  \ / __ \_|  |
   \______  /|___|  /(____  /|__|
          \/      \/      \/
   */
  SET_CHAT_NEW_MESSAGE (state, data) {
    state.thread.push(data)
    // Add prompt if new chat is received
    if (state.chatModal) {
      state.chatNewMessage = true
    }
  },
  GET_CHAT_THREAD (state, data) {
    state.thread = data.data.thread || []
    // state.thread = []
  },
  SET_CHAT_NEW_NICKNAME (state, data) {
    let thread, players, promptCat
    if (typeof data.table_number !== 'undefined') {
      // Variable Assignment
      thread = state.thread || []
      players = state.tablelist[data.table_number].playerLists
      promptCat = state.promptCat

      // Change Chat nickname
      for (let i = 0; i < thread.length; i++) {
        if (thread[i]['nickname'] === data['oldNickname']) {
          thread[i]['nickname'] = data['newNickname']
        }
      }
      // Change Highest bidder nickname
      for (let i = 0; i < promptCat.length; i++) {
        if (promptCat[i].nickname === data['oldNickname']) {
          promptCat[i].nickname = data['newNickname']
          promptCat[i].avatar = state.userinfo.avatar
        }
      }
      // Change Player list update
      for (let i = 0; i < players.length; i++) {
        if (players[i].nickname === data['oldNickname']) {
          players[i].nickname = data['newNickname']
        }
      }
    }
  },

  /*
  _________
  \_   ___ \   ____    _____    _____    ____    ____
  /    \  \/  /  _ \  /     \  /     \  /  _ \  /    \
  \     \____(  <_> )|  Y Y  \|  Y Y  \(  <_> )|   |  \
   \______  / \____/ |__|_|  /|__|_|  / \____/ |___|  /
          \/               \/       \/              \/
   */
  SET_DRAWER_WIDTH (state) {
    state.drawerWidth = 230
  },
  SET_LOCALE (state, locale) {
    state.locale = locale
  },
  SET_SOCKET (state, socket) {
    state.socketio = socket
  },
  SET_ISLOGIN_NOTIFICATION (state, notif) {
    console.log('SET_ISLOGIN_NOTIFICATION', notif)
    state.userinfo.islogin = notif
  },

  USER_UPDATES (state, data) {
    switch (data.action) {
      case 'FOLLOWERS':
        state.updateFeeds.follower.user = data.data
        break;
      default:
        console.log('ACTION NOT REGISTERED');
        break;
    }
  },

  DEALER_UPDATES (state, data) {
    switch (data.action) {
      case 'FOLLOWERS':
        state.updateFeeds.follower.dealer = data.data
        break;
      default:
        console.log('ACTION NOT REGISTERED');
        break;
    }
  },

  PLAYER_COUNT (state, data) {
    let players = 0
    state.playerLocation = data

    _.forEach(data, (v, k) => {
      players += v.players.length
    })

    state.userinfo.onlinePlayers = players
  },

  ANNOUNCEMENT_INFO (state, data) {

    let table = state.currentTableIndex || "Lobby"
    let result =  _.filter(data, function (o) { return o.TableNumber === table })
    state.AnnouncementNotif = result
  },

  CHANGE_TABLE_PLAYER_INFO (state, data) {
    let players = state.tablelist[data.tableNumber].playerLists;

    for (let i = 0; i < players.length; i++) {
      let player = players[i];
      if (data.id === player.id) {
        player.imgname = data.imgname
      }
    }
  }
}
