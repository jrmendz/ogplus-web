import axios from 'axios'
import router from '@/router'
import Hls from 'hls.js'
import $cookie from 'vue-cookie'
import { setWsHeartbeat } from "ws-heartbeat/client";
import {Expo, TweenLite} from "gsap";

export default {
  /*
     _____            __   .__                      __   .__                  __   .__
    /  _  \   __ __ _/  |_ |  |__    ____    ____ _/  |_ |__|  ____  _____  _/  |_ |__|  ____    ____
   /  /_\  \ |  |  \\   __\|  |  \ _/ __ \  /    \\   __\|  |_/ ___\ \__  \ \   __\|  | /  _ \  /    \
  /    |    \|  |  / |  |  |   Y  \\  ___/ |   |  \|  |  |  |\  \___  / __ \_|  |  |  |(  <_> )|   |  \
  \____|__  /|____/  |__|  |___|  / \___  >|___|  /|__|  |__| \___  >(____  /|__|  |__| \____/ |___|  /
          \/                    \/      \/      \/                \/      \/                        \/
   */
  AUTH_REQUEST (context, {username, password}) {
    context.rootState.loadstat = true
    context.commit('AUTH_REQUEST')
    return context.rootState.socketio.socket.post('/user/login', {username: username, password: password}, (response) => {
      if (response.status === 200) {
        localStorage.setItem('_token', response.credentials.token)
        localStorage.setItem('_userData', JSON.stringify(response.credentials.user))
        sessionStorage.session = `${response.credentials.user.id}${_.now()}`
        $cookie.set('panda_id', response.credentials.user.id)
        $cookie.set('panda_token', response.credentials.token)
        localStorage.setItem('_confirm', 'off')
        // context.rootState.lobbyTable = 'MoneyWheel'
        if (response.credentials.user.table_location !== 'Lobby') {
          context.dispatch('EXIT_TABLE', {tableid: response.credentials.user.table_location})
        }
        // settingup Max/Min Bet
        context.commit('SET_USER_MAXMININFO', response.credentials.user)
        context.commit('SET_USER_INFO', response.credentials.user)
        context.commit('AUTH_SUCCESS', response)
        context.dispatch('GET_USER_INFO')
        location.href = '/#/'
        // router.replace({path: '/'})
        return response
      } else {
        context.commit('SET_ISLOGIN_NOTIFICATION', true)
        context.commit('AUTH_ERROR', response)
        console.error(response)
        return response
      }
    })
  },

  VERIFY_LOGIN (context, payload) {
    let justVerify = _.isUndefined(payload.justVerify) ? false : payload.justVerify
    context.rootState.loadstat = true

    return new Promise((resolve, reject) => {
      context.rootState.socketio.socket.post('/verifyLogin', { token: payload.token }, (response) => {
        if (response.status === 200) {

          if (justVerify) {
            return resolve(response)
          }

          localStorage.setItem('_token', response.token)
          if (response.userdata.table_location !== 'Lobby') {
            context.dispatch('EXIT_TABLE', {tableid: response.userdata.table_location})
          }
          context.commit('SET_USER_INFO', response.userdata)
          context.commit('SET_USER_MAXMININFO', response.userdata)
          context.commit('AUTH_SUCCESS', response)
          context.dispatch('GET_USER_INFO')
          context.rootState.isVerified = true
          router.replace({path: '/'})
          return resolve(response)
        } else {

          if (justVerify) {
            return reject(response)
          }

          context.commit('AUTH_ERROR', response)
          router.push('/login')
          return reject(response)
        }
      })
    })
  },

  AUTH_LOGOUT ({ state }, payload) {
    let token = _.isUndefined(payload.token) ? localStorage._token : payload.token || ''
    let clearStorage = _.isUndefined(payload.clearStorage) ? true : payload.clearStorage

    return new Promise((resolve, reject) => {
      return state.socketio.socket.post('/user/logout', {
        token
      }, function (response) {

        if (clearStorage) {
          localStorage.clear()
          location.reload()
        }

        return resolve(response)
      })
    })
  },

  /*
     _____          .__    __   .__                      .___.__
    /     \   __ __ |  | _/  |_ |__|  _____    ____    __| _/|__|_____
   /  \ /  \ |  |  \|  | \   __\|  | /     \ _/ __ \  / __ | |  |\__  \
  /    Y    \|  |  /|  |__|  |  |  ||  Y Y  \\  ___/ / /_/ | |  | / __ \_
  \____|__  /|____/ |____/|__|  |__||__|_|  / \___  >\____ | |__|(____  /
          \/                              \/      \/      \/          \/
   */
  HLS_PLAY (context) {
    // context.commit('CHANGEVIDEOJS', require('video.js'))
    // require('videojs-contrib-hls.js')
    // context.commit('CHANGEHLSPLAYER', context.rootState.videojs('panda_desk_Video', {
    //   sources: [{src: 'http://stream.oriental-game.com/hls/Ggame3table1.m3u8', type: 'application/x-mpegURL'}]
    // }))
    var video = document.getElementById('panda_desk_Video')
    var video_quality = localStorage.getItem('video_quality')
    // console.log(video_quality, 'video_quality')
    context.commit('CHANGEHLSPLAYER', video)
    if (Hls.isSupported()) {
      var hls = new Hls()
      context.commit('CHANGEHLSJS', hls)
      if (context.rootState.isLobby !== true) {
        let tableNumber = context.rootState.currentTableInfo.tableNumber
        // context.rootState.hlsjs.loadSource('//stream.oriental-game.com/hls/' + tableNumber.charAt(0) + 'game' + tableNumber.substr(1) + 'table1.m3u8')
        // console.log(context.rootState.tablelist[tableNumber].videoUrl.sea, 'bidyo')
        try {
          if (video_quality === null || video_quality === 'HD') {
            context.rootState.hlsjs.loadSource(context.rootState.tablelist[tableNumber].videoUrl.sea[0])
          } else {
            context.rootState.hlsjs.loadSource(context.rootState.tablelist[tableNumber].videoUrl.sea[1])
          }

          context.rootState.hlsjs.attachMedia(context.rootState.hlsPlayer)
          context.rootState.hlsjs.on(Hls.Events.MANIFEST_PARSED, function () {
            context.rootState.hlsPlayer.play()
          })
        } catch(err) {
          console.log('No Video in DB')
        }
      }
    }
    // context.rootState.hlsPlayer.play()
    // let flvjs = require('flv.js')
    // context.commit('changeFlvjs', flvjs.default)
    // if (context.rootState.flvjs.isSupported()) {
    //   let videoElement = document.getElementById('panda_desk_Video')
    //   context.commit('changeFlvPlayer', context.rootState.flvjs.createPlayer({
    //     type: 'flv',
    //     cors: true,
    //     url: 'https://stream.oriental-game.com:8443/live?port=19350&app=live&stream=Ggame2table1'
    //   }))
    //   context.rootState.flvPlayer.attachMediaElement(videoElement)
    //   context.rootState.flvPlayer.load()
    //   context.rootState.flvPlayer.play()
    // }
  },

  /*
    _________                 __             __
   /   _____/  ____    ____  |  | __  ____ _/  |_
   \_____  \  /  _ \ _/ ___\ |  |/ /_/ __ \\   __\
   /        \(  <_> )\  \___ |    < \  ___/ |  |
  /_______  / \____/  \___  >|__|_ \ \___  >|__|
          \/              \/      \/     \/
   */
   JOIN_SOCKET: ({commit, state, getters, dispatch}, data) => {
    state.socketio.socket.on('disconnect', function () {
     state.isOffline = true
     state.OfflineText = 'Connecting Athens...'
    })

    state.socketio.socket.on('reconnect', function () {
     console.log('Yes! Socket IO connection is up.')
     state.isOffline = false
     location.reload()
    })

    // userUpdates, balance, image, etc
    state.socketio.socket.on('userUpdates', function (response) {
     if (state.userinfo.id === response.userId) {
       _.forEach(response, function (value, property) {
         commit('SET_PLAYERS_INFO', {property, value})
       })
     }
    })
    // SINGLE LOGIN
    state.socketio.socket.on('order66', data => {
     if (data !== localStorage._token) {
       if (!state.isLobby) {
         const tableInfo = {
           data: state.currentTableInfo,
           tableid: state.currentTableIndex
         }
         dispatch('EXIT_TABLE', tableInfo)
       }
       dispatch('AUTH_LOGOUT', true)
     }
    })
    // Follow users listener
    state.socketio.socket.on('followUser', data => {
     commit('SET_FOLLOW_FRIEND', data)
    })
    // Follow dealer listener
    state.socketio.socket.on('followDealer', data => {
     commit('SET_FOLLOW_DEALER', data)
    })
    state.socketio.socket.on('broadcastDealercount', data => {
     try {
       let arrayDealer = []
       let x = 0
       let userid = state.contentfromuser === undefined || state.contentfromuser.length === 0 ? state.contentfromdealer[0].user_id : state.contentfromuser[0].user_id
       _.forEach(data, (value, key) => {
         if (value.user_id === userid) {
           arrayDealer[x] = value
           x++
         }
       })
       if (!_.isEmpty(arrayDealer)) {
         // console.log('Para-a pag ok na', arrayDealer)
         commit('SET_FOLLOW_DEALER', arrayDealer)
       }
       commit('SET_FOLLOW_DEALERCOUNT', data)
     } catch (err) {
       console.log('socket - broadcastDealercount', err)
     }
    })
    // state.socketio.socket.on('countDealer', data => {
    //   commit('SET_COUNT_DEALER', data)
    // })
    // Online players listener
    state.socketio.socket.on('getOnlinePlayers', data => {
      commit('SET_ONLINE_PLAYERS', data)
    })

    state.socketio.socket.on('streamersEvent', data => {
      commit('SET_ONLINE_STREAMERS', data)
    })
     // Initial table players catcher
    state.socketio.socket.on('initial_players', data => {
      commit('SET_TABLE_PLAYER_COUNT', data)
    })
    // players in tables
    state.socketio.socket.on('table_players', function (response) {
      console.log("PLAYERS", response.tableNumber, response.playersList);

      if (response.tableNumber === 'Lobby') {
        return false
      }


      if (state.tablelist[response.tableNumber]) {
        state.tablelist[response.tableNumber].playerLists = response ? response.playersList : []
      }
      commit('SET_TABLE_PLAYERS', response)
    })
    // Balance updates
    state.socketio.socket.on('user_balance', response => {
     // console.log('user_balance', response)
     commit('SET_PLAYERS_INFO', {property: 'balance', value: response})
    })
    state.socketio.socket.on('winloss', function (data) {
     // console.log('------------- SET_WINLOSE_INFO ', data.winloss, ' ----- ', data.tableNumber)
     //  console.log('winloss', data)
     commit('SET_WINLOSE_INFO', data)
    })
    state.socketio.socket.on('table_balance', response => {
     let players = getters.playersInTable(state.currentTableIndex)
     if (players && response && response.length !== 0) {
       for (let a = 0; a <= players.length; a++) {
         if (!response[a]) {
           continue
         }
         _.map(players, item => {
           if (item.id === response[a].id) {
             item.balance = response[a].balance
           }
         })
       }
     }
    })

    // Bet socket watchers
    state.socketio.socket.on('betting_results', function (response) {
     let betInfo = response.data
     let map = {
       banker: 'highestBankerBidder',
       player: 'highestPlayerBidder',
       super_six: 'highestS6Bidder',
       dragon: 'highestDragonBidder',
       tiger: 'highestTigerBidder'
     }
     let sections

     // console.log('betting percentages ===>', betInfo)

     // Update only the active table when bet, doesnt affect betting on side bar
     if (betInfo.tableNumber === state.currentTableIndex) {
       // Generate bet table sections based on current table
       sections = state.betTable[state.tablelist[betInfo.tableNumber].code].section

       _.forEach(sections, (section, secKey) => {
         let percentage, userBetInfo, highestBidder;
         // Sub-Validators

         // Bet Percentage
         if (_.isUndefined(betInfo.bet_percentages[secKey]))
           return 0
         percentage = betInfo.bet_percentages[secKey] || 0
         section.percentage = percentage

         // Bet Player Bets and Amounts
         if (_.isUndefined(betInfo.totalUsersAndBettings[secKey]))
           return 0
         userBetInfo = betInfo.totalUsersAndBettings[secKey][0]
         section.players = userBetInfo.total_users || 0
         section.totalBetAmt = userBetInfo.total_bets || 0

         // Highest Bidder
         if (_.isUndefined(betInfo.highestBidders[secKey]))
           return 0
         highestBidder = betInfo.highestBidders[secKey]

         state.tablelist[betInfo.tableNumber][map[secKey]] = {userId: highestBidder}
       })

       // Bet Ranking
       state.betRankData = betInfo.betRankData
     }
    })

    // Watch Chat Message
    state.socketio.socket.on('new_message', function (response) {
     commit('SET_CHAT_NEW_MESSAGE', response)
    })

    // Watch Chat Change Nickname
    state.socketio.socket.on('change_nickname', (response) => {
     commit('SET_CHAT_NEW_NICKNAME', response)
    })
    state.socketio.socket.on('goodTipsUpdate', (data) => {
     commit('GOOD_TIPS_UPDATE', data)
     dispatch('GET_GOOD_TIPS', {
       tableNumber: data.tableNumber,
       customPattern: state.customPattern,
       isBroadcast: false
     })
    })
    state.socketio.socket.on('userUpdates', (data) => {
      commit('USER_UPDATES', data)
    })

    state.socketio.socket.on('dealerUpdates', (data) => {
     commit('DEALER_UPDATES', data)
    })

    // Watch Player Location
    state.socketio.socket.on('player_location', function (data) {
     commit('PLAYER_COUNT', data)
    })

    state.socketio.socket.on('announcementEvent_', function (data) {
      commit('ANNOUNCEMENT_INFO', data)
     })

    // Table Players Avatar
    state.socketio.socket.on('table_user_update', function (data) {
     commit('CHANGE_TABLE_PLAYER_INFO', data)
    });

    // Streamer Updates
    state.socketio.socket.on('streamer_update', function (data) {
      dispatch('LOAD_TOP_STREAMER')
    });

    // join room
    return state.socketio.socket.get('/socket/join-room', {token: localStorage._token}, function () {})
   },

  /*
  ___________       ___.    .__
  \__    ___/_____  \_ |__  |  |    ____    ______
    |    |   \__  \  | __ \ |  |  _/ __ \  /  ___/
    |    |    / __ \_| \_\ \|  |__\  ___/  \___ \
    |____|   (____  /|___  /|____/ \___  >/____  >
                  \/     \/            \/      \/
   */
  GET_TABLES ({state, dispatch, commit}) {
    return new Promise((resolve, reject) => {
      dispatch('JOIN_SOCKET');

      RECONNECT();

      function RECONNECT() {
        const ws = new WebSocket(process.env.VUE_APP_WS + localStorage._token);
        let resData;

        // let minutes = 3
        // let halt = state.haltedTbl

        setWsHeartbeat(ws, '{"heartBeat":"PING"}', {
          pingTimeout: 60000, // in 60 seconds, if no message accepted from server, close the connection.
          pingInterval: 25000, // every 25 seconds, send a ping message to the server.
        });

        state.GAME_APP_WS = ws;

        ws.onmessage = (res) => {
          state.isOffline = false

          if (!res) return;

          if (res.data === 'NOT_AUTHORIZED_GO_LOGOUT') {
            state.isOffline = true
            state.OfflineText = 'Your connection to game server is not authenticated maybe due to expired token.'
            setTimeout(function(){
              dispatch('AUTH_LOGOUT')
              return false
            }, 2000);
          }

          // Parsing Data from Game App
          resData = _.cloneDeep(JSON.parse(res.data));

          if (!_.isUndefined(resData.action)) {
            switch (resData.action) {
              case "L_SQUEEZE":
              case "R_SQUEEZE":
              case "L_3rd_SQUEEZE":
              case "R_3rd_SQUEEZE":

                // Don't accept command if it is from ownself
                // if (resData.data.playerId === state.userinfo.id) return;



                state.tablelist[resData.tableNumber].squeezeUpdate = _.assign(_.get(resData, 'data', {}), { tableNumber: resData.tableNumber, action: resData.action});
                console.log("SQUEEZE BROADCASTER:", resData)
                break;
            }
          } else {
            // Set initial table list
            if (!_.size(state.tablelist)) {
              commit('SET_ALL_TABLES_LIST', resData.tables)
              // HALTER CHECK by: Alvin Valdez
              // This is to check if the table is halted not updating
              // START: Game Halt Checker
              // _.forEach(resData.tables, (v, k) => {
              //   halt.info[k] = { gameSet: v.gameSet }
              // })
              // setInterval(() => {
              //   _.forEach(resData.tables, (v, k) => {
              //     // Check if the gameSet still the same
              //     if (halt.info[k].gameSet === state.tablelist[k].gameSet) {
              //       // Check if the table number still in list
              //       if (halt.list.indexOf(k) === -1) {
              //         // If not, add it to the list
              //         halt.list.push(k)
              //       }
              //     } else {
              //       // Remove from halted list
              //       let index = halt.list.indexOf(k)
              //       if (index > -1) {
              //         console.log(halt.list[index], ' is now removed from halted list')
              //         halt.list.splice(index, 1)
              //       }
              //     }
              //     halt.info[k].gameSet = state.tablelist[k].gameSet
              //   })
              // }, (1000 * 60) * minutes)
              // END: Game Halt Checker
            }
            // Get succeeding table updates
            if (_.size(resData.tables) === 1) {
              _.forEach(resData.tables, function (values, key) {
                // Check if there is already a stored road in state
                _.forEach(values, function (v, k) {
                  commit('UPDATE_TABLE_LIST', {property: k, value: v, tableName: key})
                })
              })
            } else {
              // Chunk data update
              _.merge(state.tablelist, resData.tables)
            }

            return resolve(ws)
          }
        };

        ws.onclose = (res) => {
          // Increment reconnection counter
          state.retryConnTimes++

          if (state.retryConnTimes >= 10) {
            state.OfflineText = 'Refreshing Page...'
            setTimeout(() => {
              localStorage.clear()
              sessionStorage.clear()
              location.reload()
            }, 2000)
          } else {
            state.isOffline = true
            state.OfflineText = 'Retry ' + state.retryConnTimes + '. Connecting Game App...'
            console.log('<< Game Server Disconnected', state.retryConnTimes,' >>');

            setTimeout(function(){
              RECONNECT()
            }, 2000);
          }
        }
      }
    })
  },

  ENTER_TABLE_UPON_REFRESH: ({state, dispatch}, data) => {
    let betTable = state.betTable
    let table
    dispatch('LTHB_API', { method: 'GET' }).then((res) => {
      // Check if the cached is not empty
      if (!_.isEmpty(res.data)) {
        table = state.tablelist[res.data.tableNumber]
        // // Proceed to table
        if (table.gameSet === res.data.gameSet) {
          // Don't proceed if status is default preparation for next betting
          if (['default'].indexOf(table.status) > -1) return 0

          setTimeout(() => {
            // Enter table
            dispatch('ENTER_TABLE', {
              data: table,
              tableid: res.data.tableNumber,
              isStreamer: !_.isNull(localStorage.getItem('_fromStreamer'))
            }).then((tableRes) => {
              if (res.data.sections.length) {
                // Insert bet your saved bet details
                _.map(res.data.sections, (o) => {
                  let section = betTable[table.code].section[o.betSection]
                  // Add chips to betting tables
                  section.bets.push({
                    betSection: o.betSection,
                    chipClass: o.chipClass,
                    chipImage: o.chipClass,
                    chipValue: parseFloat(o.chipValue),
                    isConfirmed: true,
                    isRebet: false
                  })

                  state.totalOnTableBet += parseFloat(o.chipValue)

                  setTimeout(function () {
                    if (table.code === 'moneywheel') {
                      TweenLite.set('._1', {width: 30, height: 30})
                    }
                    TweenLite.set('.label__bet', {x: '-20', opacity: 1})
                    TweenLite.to('._1', 1, {ease: Expo.easeOut, rotation: 0, y: '+45%', x: '-15'})
                  }, 100)

                  section.sumOfStagedChips = parseFloat(o.chipValue)
                })


                // Toggle if there is a super six in loading of chips
                if (_.findIndex(res.data.sections, (o) => { return o.betSection === 'super_six'}) > -1) {
                  state.tablelist[res.data.tableNumber].isSuperSix = true
                }
                // Disable super_six if there's an confirmed chips
                state.tablelist[res.data.tableNumber].superSixDisabled = true

                // Set flag for confirm
                state.isConfirm = true
              }
            })
          }, 500)
        } else {
          console.log("GAMESET MISMATCHED", table.gameSet, res.data.gameSet)
          // Remove cache if gameSets are different
          dispatch('LTHB_API', { method: 'DEL' })
        }
      }
    }, (err) => {
      console.log(err)
    })
  },
  ENTER_TABLE: ({commit, state, getters, dispatch}, table) => {
    let s6 = state.betTable.baccarat.section['super_six']
    let payLoad = { token: localStorage._token, tableid: table.tableid }
    let isStreamer;
    let video_quality = localStorage.getItem('video_quality')
    // let URL
    return new Promise((resolve, reject) => {
      let chosenTable = state.tablelist[table.tableid]

      // Validators
      if (!chosenTable) {
        state.message = 'Invalid Table'
        return reject('Invalid Table')
      }
      if (chosenTable.status === 'disconnected') {
        state.message = 'Table Offline'
        return reject('Table Offline')
      }
      if (state.liveGame.indexOf(table.tableid[0]) === -1) {
        state.message = 'Table Offline'
        return reject('Table Offline')
      }
      if (state.userinfo.balance < state.MIN_BALANCE_TO_ENTER) {
        state.message = 'Minimum balance required is ' + state.MIN_BALANCE_TO_ENTER + ' ||--is-banker'
        return reject('Minimum balance required is ' + state.MIN_BALANCE_TO_ENTER)
      }

      // URL = _.isUndefined(table.isSideBet) ? '/tables/enterTable' : '/tables/sideBet'
      isStreamer = _.isUndefined(table.isStreamer) ? false : table.isStreamer

      // Refresh roads and good tips and road maps upon entering
      state.RoadInGame = JSON.parse(state.RoadInGame_DEFAULT)

      state.socketio.socket.post('/tables/enterTable', payLoad, function (response) {
        if (response.status === 400) {
          state.message = 'Something wrong with server. Contact your local provider.' + '||--is-banker'
          console.log(response.msg)
          return reject(response.msg)
        }

        if (!state.isLobby) {
          dispatch('REBET_API', {
            method: 'DEL',
            tableNumber: state.currentTableIndex
          })
        }

        try {
          state.kickOutCtr = 0
          state.lastBet = 0
          state.inGameUser = response.data
          state.currentTableInfo = table.data
          state.currentTableIndex = table.tableid
          state.currenttab = table.data.code
          state.isLobby = false
          state.isSideBet = false
          localStorage._location = table.tableid
          localStorage.setItem('_musicSwitchIng', true)
          localStorage.setItem('_canChat', JSON.stringify({ activated: false }))
          state.thread = []
          state.isStreamer = false
          state.streamer.isInGame = false
          state.isNiuniu = false
          state.is3Cards = false
          state.totalOnTableBet = 0
          state.win_loss[table.tableid] = {};

          // Condition for Streamer Tables
          localStorage.removeItem('_fromStreamer') // Reset the streamer flag
          localStorage.removeItem('_bet_' + chosenTable.tableNumber)
          if (isStreamer) {
            state.streamer.tableNumber = table.tableid
            state.streamer.isInGame = true
            localStorage.setItem('_fromStreamer', '1')
          } else {
            state.streamer.tableNumber = null
            state.streamer.isInGame = false
          }

          // Get User Info
          dispatch('GET_USER_INFO')
          // Prepare re-bet
          dispatch('REBET_API', { method: 'GET', tableNumber: table.tableid, gameSet: table.data.gameSet, shoeGame: table.data.shoeGame })
          // Join Chat
          dispatch('JOIN_CHAT_TABLE', { token: localStorage._token, table_number: table.tableid })
          // Get Table Bets
          dispatch('GET_TABLE_BETTING_INFO', { gameSet: chosenTable.gameSet, tableNumber: table.tableid })
          // Load RoadMap
          dispatch('LOAD_INGAME_ROAD', {
            code: chosenTable.code,
            tableNumber: chosenTable.tableNumber,
            shoeGame: chosenTable.shoeGame
          })

          // Disable Chat
          state.withchat = 0
          state.chatSwitch = 0
          state.chatNewMessage = false

          // Set super six toggle off when table load
          chosenTable.isSuperSix = false
          chosenTable.superSixDisabled = false

          state.isConfirm = false
          state.selectedChip = state.bettingChips[0]
          state.customChipsValue = state.bettingChips[0].value

          // Remove table from sideBetConfirm if any
          _.forEachRight(state.sideBetConfirmBets, (v, k) => {
            if (v === table.tableid) {
              state.sideBetConfirmBets.splice(k, 1)
            }
          })

          // Set the tabs to what it enters
          _.forEach(state.filters.gamelist, (o) => {
            if (o.code === chosenTable.code) {
              localStorage.setItem('_deftab', o.name)
              state.lobbyTable = o.name
            }
          });

          // Remove temporary super six info upon change of table
          s6._bets = []
          s6._totalBetAmt = 0
          s6._sumOfStagedChips = 0

          // Stop existing video and play new table stream
          if (!_.isUndefined(state.hlsjs)) {
            state.hlsjs.stopLoad()
            if (video_quality === null || video_quality === 'HD') {
              state.hlsjs.loadSource(state.tablelist[table.tableid].videoUrl.sea[0])
            } else {
              state.hlsjs.loadSource(state.tablelist[table.tableid].videoUrl.sea[1])
            }
            state.hlsjs.attachMedia(state.hlsPlayer)

            if (_.isFunction(state.hlsjs)) {
              state.hlsjs.play()
            }
          }

          // commit('PLAY_VIDEO', table.tableid)
        } catch (ex) {
          return reject(ex)
        }
        return resolve(table)
      })
    })
  },

  EXIT_TABLE ({state, dispatch}, table) {

    return new Promise((resolve, reject) => {
      let payLoad = {token: localStorage._token, tableid: table.tableid}

      if (!localStorage._token)
        return reject('Invalid Parameter (Non-Backend Error): [token]')

      if (!table.tableid)
        return reject('Invalid Parameter (Non-Backend Error): [tableid]')

      state.socketio.socket.post('/tables/exitTable', payLoad, (response) => {
        if (response.status !== 200) {
          return reject('Something wrong while exiting table')
        }

        state.lastBet = 0
        state.currentTableIndex = null
        state.currentTableInfo = null
        state.isLobby = true
        state.with_chat_enable = false
        state.settingModal = false
        state.chipModal = false
        state.rankModal = false
        state.socialModal = false
        state.promptCat = []
        state.streamer.tableNumber = null
        state.streamer.isInGame = false

        // Reset projected balance
        state.betTableGlobal.projectedAmount = 0

        // Stop existing video and play new table stream
        if (!_.isUndefined(state.hlsjs)) {
          state.hlsjs.stopLoad()
        }

        localStorage.removeItem('_fromStreamer')

        dispatch('REBET_API', {
          method: 'DEL',
          tableNumber: table.tableid
        })

        return resolve()
      })
    })
  },
  TABLE_PLAYERS: ({ state, commit }, data) => {
    return new Promise((resolve, reject) => {
      state.socketio.socket.post('/tables/players', _.assign(data, { token: localStorage._token }),(res) => {
        if (res.err) {
          return reject(res.err)
        } else {
          commit('PLAYER_COUNT', res.players)
          return resolve(res)
        }
      })
    })
  },
  GET_TABLE_LIST: ({ state }, data) => {
    return new Promise ((resolve, reject) => {
      let tableArr = []
      try {
        if (state.locale === 'cn') {
          tableArr.push({id: '', tableno: '所有'})
        } else if (state.locale === 'jp') {
          tableArr.push({id: '', tableno: '全て'})
        } else if (state.locale === 'vn') {
          tableArr.push({id: '', tableno: 'tất cả'})
        } else if (state.locale === 'ko') {
          tableArr.push({id: '', tableno: '전체'})
        } else if (state.locale === 'id') {
          tableArr.push({id: '', tableno: 'semua'})
        } else {
          tableArr.push({id: '', tableno: 'All'})
        }
        _.forEach(state.tablelist, function (value, key) {
          let getFirstStr = key.charAt(0)
          if (['P','M', 'E'].indexOf(getFirstStr) > -1) {
            tableArr.push({ id: value.id, tableno: key, status: value.status })
          }
        })
        tableArr = tableArr.sort((a, b) => a['tableno'].localeCompare(b['tableno'], 'en', { numeric: true }))
      } catch (ex) {
        return reject([])
      }
      return resolve(tableArr)
    })
  },

  // Good Tips API
  GET_GOOD_TIPS ({ state, commit }, data ) {
    let payLoad = _.assign(data, { token: localStorage._token })
    return new Promise((resolve, reject) => {
      axios.post(process.env.VUE_APP_ATHENS_BASEURL + 'getGoodTips', payLoad)
        .then((response) => {
          // Update good tips match of the selected table
          commit('GOOD_TIPS_UPDATE', response.data)
          return resolve(response.data)
        })
        .catch((error) => {
          return reject(error)
        });
    })
  },
  // New RoadMap API
  GET_ROAD_MAP ({ state, commit }, data) {
    let payLoad = _.assign(data, { token: localStorage._token })

    return new Promise((resolve, reject) => {
      state.socketio.socket.post('/getRoadMaps', payLoad, (res) => {
        if (!res) {
          return reject(res)
        } else {
          return resolve(res)
        }
      })
    })
  },

  // New RoadMap API
  ROAD ({ state, commit }, data) {
    let payLoad = _.assign(data, { token: localStorage._token })

    return new Promise((resolve, reject) => {
      state.socketio.socket.get('/roadmaps/road/canvas', payLoad, (res) => {
        if (!res) {
          return reject(res)
        } else {
          return resolve(res)
        }
      })
    })
  },

  /**
   * Get road map updates
   * @param commit
   * @param state
   * @param getters
   * @param dispatch
   * @param payLoad
   * @constructor
   */
  LOAD_ROAD_MAP ({commit, state, getters, dispatch}, payLoad = {}) {
    return new Promise((resolve, reject) => {
      let roadMapData = {};
      // Validators
      if (_.isEmpty(payLoad.tableNumber))
        return reject('Invalid [tableNumber]');
      if (_.isEmpty(payLoad.gameType))
        return reject('Invalid [gameType]');

      axios({
        method: 'GET',
        url: process.env.VUE_APP_ATHENS_BASEURL + 'roadmaps/road/canvas',
        params: _.assign(payLoad, { token: localStorage._token })
      })
        .then((resData) => {
          let { data } = resData;

          switch (_.toUpper(payLoad.gameType)) {
            case 'BACCARAT':
            case 'DRAGONTIGER':
              roadMapData = {
                beadRoad: _.get(data, 'roadMap.beadRoad', []),
                bigRoad: _.get(data, 'roadMap.bigRoad', []),
                bigEyeRoad: _.get(data, 'roadMap.bigEyeRoad', []),
                smallRoad: _.get(data, 'roadMap.smallRoad', []),
                roachRoad: _.get(data, 'roadMap.roachRoad', []),
              };
              break;

            case 'MONEYWHEEL':
              roadMapData = {
                beadRoad: _.get(data, 'roadMap.wheelies', []),
              };
              break;

            case 'ROULETTE':
              roadMapData = {
                beadRoad: _.get(data, 'roadMap.rollRoad', []),
              };
              break;

            case 'NIUNIU':
              roadMapData = {
                beadRoad: _.get(data, 'roadMap.beadRoad', []),
                count: _.get(data, 'roadMap.count', {}),
              };
              break;

            case 'THREECARDS':
              roadMapData = {
                beadRoad: _.get(data, 'roadMap.beadRoad', []),
                count: _.get(data, 'roadMap.count', {}),
              };
              break;

            default:
              console.warn(new Error('Invalid table code'));
              return reject('Invalid table code');
          }

          return resolve(roadMapData);
        })
        .catch((error) => {
          return reject(error);
        });

    })
  },


  LOAD_INGAME_ROAD ({ state, dispatch, commit }, data) {
    let _s = this;
    let config, lastResultMW;

    // Pre-setting variables
    lastResultMW = state.betTable.moneywheel.lastResult;

    if (_.includes(['moneywheel'], data.code)) {
      config = { beadRoad: { row: 5, col: 8 } }
    } else if (_.includes(['roulette'], data.code)) {
      config = { beadRoad: { row: 6, col: 12 } }
    } else {
      config = {
        beadRoad: { row: 6, col: 17, hasPredict: true },
        bigRoad: { row: 6, col: 26, hasPredict: true },
        bigEyeRoad: { row: 3, col: 26, hasPredict: true },
        smallRoad: { row: 3, col: 13, hasPredict: true },
        cockroachRoad: { row: 3, col: 13, hasPredict: true },
        statistics: {
          predict: true,
          beadRoadDemoGraph: true,
          // bigRoadDemoGraph: true
        }
      }
    }

    return new Promise ((resolve, reject) => {
      dispatch('GET_ROAD_MAP', {
        config: config,
        tableNumber: data.tableNumber,
        shoeHand: data.shoeGame,
        gameName: data.code
      }).then((res) => {
        if (data.code === 'moneywheel') {
          lastResultMW['multiplier'] = Math.pow(3, res.beadRoad.lastResult.rawResult.values.length -1);
          lastResultMW['section'] = res.beadRoad.lastResult.rawResult.result
        }

        commit('ROAD_MAPS_UPDATE', res);
        return resolve();
      }, (err) => {
        console.error(new Error(err));
        return reject();
      })
    })
  },

  GET_TABLE_BETTING_INFO ({ state }, data) {
    return new Promise((resolve, reject) => {
      let payLoad = _.assign(data, { token: localStorage._token })
      let map = {
        banker: 'highestBankerBidder',
        player: 'highestPlayerBidder',
        super_six: 'highestS6Bidder' ,
        dragon: 'highestDragonBidder',
        tiger: 'highestTigerBidder'
      }
      let sections
      state.socketio.socket.post('/bettings/gameSetInformation', payLoad, (res) => {
        if (res.err) {
          console.log(res.err)
          return reject(res.err)
        } else {
          // Update only the active table when bet, doesnt affect betting on side bar
          if (data.tableNumber === state.currentTableIndex) {
            // Generate bet table sections based on current table
            sections = state.betTable[state.tablelist[data.tableNumber].code].section

            _.forEach(sections, (section, secKey) => {
              let betPlace = res.data[secKey]
              // Bet Percentage
              if (!_.isUndefined(betPlace)) {
                section.percentage = betPlace.betPercentage
                section.players = betPlace.totalUserBet
                section.totalBetAmt = betPlace.totalBetAmount
                state.tablelist[data.tableNumber][map[secKey]] = { userId: betPlace.topBidderId }
              }
            })
            // Bet Ranking
            state.betRankData = []
          }

          return resolve(res)
        }
      })
    })
  },

  /**
   * Get, set and delete re-bet flag API
   * @param state
   * @param method
   * @param data
   * @returns {Promise}
   * @constructor
   */
  REBET_API ({ state }, data) {
    let payload = _.assign(data, { token: localStorage._token })
    return new Promise((resolve, reject) => {
      state.socketio.socket.post('/bettings/rebet', payload, (res) => {
        return res.err ? reject(res) : resolve(res)
      })
    })
  },

  /**
   * Get, set and delete re-bet flag API
   * @param state
   * @param data
   * @returns {Promise}
   * @constructor
   */
  REBET_FLAG_API ({ state }, data) {
    let payload = _.assign(data, { token: localStorage._token })
    return new Promise((resolve, reject) => {
      state.socketio.socket.post('/bettings/rebetFlag', payload, (res) => {
        return res.err ? reject(res) : resolve(res)
      })
    })
  },


  /**
   * LTHB stands for "Last Table Having Bet"
   * @param state
   * @param method
   * @param data
   * @returns {Promise}
   * @constructor
   */
  LTHB_API ({ state }, data) {
    let payload = _.assign(data, { token: localStorage._token })
    return new Promise((resolve, reject) => {
      state.socketio.socket.post('/bettings/lastBet', payload, (res) => {
        return res.err ? reject(res) : resolve(res)
      })
    })
  },

  /**
   * LTB stands for Last Table Bet
   * @param state
   * @param data
   * @returns {Promise}
   * @constructor
   */
  LTB_API ({ state }, data) {
    let payload = _.assign(data, { token: localStorage._token })
    return new Promise((resolve, reject) => {
      state.socketio.socket.post('/bettings/lastBetOnTable', payload, (res) => {
        return res.err ? reject(res) : resolve(res)
      })
    })
  },

  /**
   * Bet Flag is used for check if the table has existing bet to refrain from leaving page
   * @param state
   * @param method
   * @param data
   * @returns {Promise}
   * @constructor
   */
  BET_FLAG_API ({ state }, data) {
    return new Promise((resolve, reject) => {
      let payload = _.assign(data, { token: localStorage._token })
      let URL = ''
      // Generate url by method requested
      switch (data.method) {
        case 'SET': URL = '/bettings/setBetFlag';    break;
        case 'GET': URL = '/bettings/getBetFlag';    break;
        case 'DEL': URL = '/bettings/deleteBetFlag'; break;
      }

      if (URL) {
        state.socketio.socket.post(URL, payload, (res) => {
          return res.err ? reject(res) : resolve(res)
        })
      } else {
        return reject("[NON-API ERROR] Invalid method provided")
      }
    })
  },
  /*
   ____ ___
  |    |   \ ______  ____ _______  ______
  |    |   //  ___/_/ __ \\_  __ \/  ___/
  |    |  / \___ \ \  ___/ |  | \/\___ \
  |______/ /____  > \___  >|__|  /____  >
                \/      \/            \/
   */
  GET_USER_INFO ({commit, state, getters, dispatch}) {
    return state.socketio.socket.get('/api/current-user-information', {token: localStorage._token}, (response) => {
      if (response.status === 200) {
        // console.log(response.data.user_settings, 'getuser!!!!!!!!!')
        commit('SET_USER_INFO', response.data)
        dispatch('TABLE_PLAYERS', {})
        // dispatch('GET_TABLES')
      } else {
        dispatch('AUTH_LOGOUT', true)
      }
    })
  },
  GET_USER_INFO_AVATAR ({commit, state}) {
    return state.socketio.socket.get('/api/current-user-information', {token: localStorage._token}, (response) => {
      if (response.status === 200) {
        commit('SET_USER_INFO', response.data)
      }
    })
  },
  UPDATE_USER (context, obj) {
    // console.log('UPDATE_USER | ' + obj)
    return new Promise((resolve, reject) => {
      context.rootState.socketio.socket.put('/user/update-information', {
        token: localStorage._token,
        params: obj
      }, (response) => {
        if (response.error) {
          if (response.error === 'E_UNIQUE' && _.has(obj, 'nickname')) {
            // alert('Nickname is already in use.')
            context.rootState.message = 'Nickname is already in use.'
            return reject(response.error)
          }
          return reject(response.error)
        } else {
          return resolve(response)
        }
      })
    })
  },

  /**
   * Get user rankings
   * @param state
   * @param data
   * @returns {Promise}
   * @constructor
   */
  RANKING_USER ({ state }, data = {}) {
    const payLoad = _.assign({ token: localStorage._token }, data)

    return new Promise((resolve, reject) => {
      if (!localStorage._token)
        return reject({err: "Invalid localStorage token"})

      state.socketio.socket.get('/ranking/rankinglist', payLoad, function (response) {
        // Check if the status is success
        if (response.status !== 200)
          return reject(response)
        return resolve(response)
      })
    })
  },

  /**
   * List of followed user
   * @param state
   * @param data
   * @returns {Promise}
   * @constructor
   */
  FOLLOWED_USER ({ state }, data = {}) {
    const payLoad = _.assign({ token: localStorage._token }, data)

    return new Promise((resolve, reject) => {
      if (!localStorage._token)
        return reject({err: "Invalid localStorage token"})

      state.socketio.socket.get('/follow/userlist', payLoad, function (response) {
        // Check if the status is success
        if (response.status !== 200)
          return reject(response)
        return resolve(response)
      })
    })
  },

  /**
   * Follow and Un-follow player
   * @param state
   * @param data
   * @returns {Promise}
   * @constructor
   */
  FOLLOW_UNFOLLOW_PLAYER ({ state }, data = {}) {
    const payLoad = _.assign({ token: localStorage._token }, data)

    return new Promise((resolve, reject) => {
      if (!localStorage._token)
        return reject({err: "Invalid localStorage token"})
      if (_.isUndefined(data.method)) // Method should be `follow` or `remove`
        return reject("Invalid Parameter (Non-backend): [method]")
      if (_.isUndefined(data.followedUserId))
        return reject("Invalid Parameter (Non-backend): [followedUserId]")

      state.socketio.socket.post('/follow/user', payLoad, (response) => {
        // Check if the status is success
        if (response.status !== 200)
          return reject(response)
        return resolve(response)
      })
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
  /**
   * List of Dealers followed by player
   * @param state
   * @param data
   * @returns {Promise}
   * @constructor
   */
  FOLLOWED_DEALER ({ state }, data = {}) {
    const payLoad = _.assign({token: localStorage._token}, data)
    // Create a promise
    return new Promise((resolve, reject) => {
      if (!localStorage._token)
        return reject({err: "Invalid localStorage token"})

      state.socketio.socket.get('/follow/dealerlist', payLoad,  (response) => {
        // Check if the status is success
        if (response.status !== 200)
          return reject(response)
        return resolve(response)
      })
    })
  },

  /**
   * Follow and Un-follow Dealer
   * @param state
   * @param data
   * @returns {Promise}
   * @constructor
   */
  FOLLOW_UNFOLLOW_DEALER ({ state }, data = {}) {
    const payLoad = _.assign({ token: localStorage._token }, data)

    return new Promise((resolve, reject) => {
      if (!localStorage._token)
        return reject({err: "Invalid localStorage token"})
      if (_.isUndefined(data.method)) // Method should be `follow` or `remove`
        return reject("Invalid Parameter (Non-backend): [method]")
      if (_.isUndefined(data.dealerscode))
        return reject("Invalid Parameter (Non-backend): [dealerscode]")

      state.socketio.socket.post('/follow/dealer', payLoad, (response) => {
        // Check if the status is success
        if (response.status !== 200)
          return reject(response)
        return resolve(response)
      })
    })
  },

  FOLLOW_STREAMERS ({ state }, data = {}) {
    const payLoad = _.assign({ token: localStorage._token }, data)
    return new Promise((resolve, reject) => {
      if (!localStorage._token)
        return reject({err: "Invalid localStorage token"})
      if (_.isUndefined(data.method)) // Method should be `follow` or `remove`
        return reject("Invalid Parameter (Non-backend): [method]")
      if (_.isUndefined(data.dealerscode))
        return reject("Invalid Parameter (Non-backend): [dealerscode]")

      state.socketio.socket.post('/streamer/follow-streamers', payLoad, (response) => {
        // Check if the status is success
        if (response.status !== 200) {
          return reject(response)
        }
        return resolve(response)
      })
    })
  },

  /**
   * Counts dealer's followers
   * @param state
   * @param data
   * @param dealerscode
   * @constructor
   */
  DEALERS_INFO ({ state }, data = {}) {
    const payLoad = _.assign({ token: localStorage._token }, data)

    return new Promise((resolve, reject) => {
      if (_.isUndefined(data.dealerscode))
        return reject('Invalid Parameter: [dealerscode]')

      state.socketio.socket.get('/follow/dealerinfo', payLoad, function (response) {
        // Check if the status is success
        if (response.status !== 200)
          return reject(response)
        // Return dealers followers
        return resolve(response)
      })
    })
  },

  SEND_GIFT_TO_DEALER ({commit, state}, data) {
    return new Promise((resolve, reject) => {
      state.socketio.socket.post('/dealergift/addById', {
        token: localStorage._token,
        dealer_id: data.dealer_id,
        table_id: data.table_id,
        gift_name: data.gift_name,
        gift_price: data.gift_price
      }, (res) => {
        if (res.err) {
          console.log('SEND_GIFT_TO_DEALER', '[ERROR]', res.err)
          reject(res.err)
        } else {
          // Set new player balance
          commit('SET_PLAYERS_INFO', {
            property: 'balance',
            value: state.userinfo.balance = res.data.new_balance
          })
          resolve(res)
        }
      })
    })
  },

  /*
  __________          __     __   .__
  \______   \  ____ _/  |_ _/  |_ |__|  ____    ____   ______
   |    |  _/_/ __ \\   __\\   __\|  | /    \  / ___\ /  ___/
   |    |   \\  ___/ |  |   |  |  |  ||   |  \/ /_/  >\___ \
   |______  / \___  >|__|   |__|  |__||___|  /\___  //____  >
          \/      \/                       \//_____/      \/
   */
  CONFIRM_BETTINGS: ({commit, state, getters, dispatch}, betdatas) => {
    let payLoad = {
      token: localStorage._token,
      bettings: betdatas.bettings,
      gameset: betdatas.gameset,
      tableid: betdatas.tableid,
      super_six: betdatas.superSix
    }
    let isSideBet = _.isUndefined(betdatas.isSideBet) ? false : betdatas.isSideBet;
    let totalBet = 0

    return new Promise((resolve, reject) => {
      // Validators
      if (!localStorage._token) return reject('FRONTEND: Invalid Token.')
      if (_.isUndefined(betdatas)) return reject('Invalid Bet Datas.')
      if (!betdatas.bettings.length) return reject('Not Chips to bet, please check your betting data.')

      // Sum round bets
      totalBet = _.sumBy(betdatas.bettings, 'chipValue')
      state.totalOnTableBet += totalBet

      // API Request via Socket
      state.socketio.socket.post('/bettings/transaction/confirm', payLoad, function (response) {
        if (response.status === 200) {
          // Set last bet details
          state.lastBet = 0
          let currTblId = state.currentTableInfo.id
          if (currTblId === betdatas.tableid) {
            dispatch('GET_ALL_BETS', {id: currTblId, gameSet: betdatas.gameset})
            dispatch('REBET_API', { method: 'DEL', tableNumber: betdatas.tableNumber })

            if (totalBet >= state.MIN_BET_TO_CHAT) {
              localStorage.setItem('_canChat', JSON.stringify({ activated: true }))
              console.log("Chat has been activated to", betdatas.tableid)
            }

          }
          commit('SET_PLAYERS_INFO', {property: 'balance', value: response.data.balance})
          // console.log('bet successful')
          if (!isSideBet) {
            state.tablelist[state.currentTableIndex].superSixDisabled = 1
            state.message = 'Bet Successful'
          }
          // Enable Chat & Disable SuperSix Toggle & Other flags
          state.withchat = 1
          state.chatSwitch = 1
          if (state.soundFxSwitch === true) {
            if (state.locale === 'en') {
              state.audiosprite['spotFXen'].play('betsuccesful')
            } else if (state.locale === 'cn') {
              state.audiosprite['spotFXcn'].play('betsuccesful')
            }
          }
          localStorage.setItem('_bet_' + betdatas.tableNumber, JSON.stringify({ gameSet: betdatas.gameset, isSideBet: isSideBet }))
          return resolve(response)
        } else {
          if (!isSideBet) state.message = response.message;
          console.log(response.message);
          return reject(response)
        }
      })
    })
  },
  GET_ALL_BETS: ({commit, state, getters, dispatch}, table) => {
    if (localStorage._token) {
      state.socketio.socket.get('/bettings/transaction/getAllBetsPerGameSet', {token: localStorage._token, table_id: table.id, gameSet: table.gameSet}, function (response, JWR) {
        if (JWR.statusCode === 200) {
          commit('SET_PLAYERS_INFO', {property: 'totalBetsToday', value: response.rows[0][0].totalBetsToday})
        }
      })
    }
  },

  /**
   * Add chips function
   * @param state
   * @param dispatch
   * @param data
   * @returns {*}
   * @constructor
   */

  // sectionCode = '', customChip = {}, showAlert = true, customSection = {}, betClass = '', byPassConfirm = false
  ADD_CHIPS: ({ state }, data) => {
    let totChipAmt = 0, balChipsDiff = 0, m25 = 15, m100 = 60
    let totUnconChips = 0, totConChips = 0
    let section, chosenChip, myBalance, sectionCode, customChip, showAlert, customSection, betClass, byPassConfirm
    let map = {
      betLimits: {
        min: {
          player: '_min',
          banker: '_min',
          dragon: '_min',
          tiger: '_min',
          tie: '_min',
          player_pair: '_min',
          banker_pair: '_min',
          super_six: '_min',
          '1': '_min',
          '2': '_min',
          '5': '_min',
          '10': '_min',
          '20': '_min',
          'og': '_min'
        },
        max: {
          player: '_max',
          banker: '_max',
          dragon: '_max',
          tiger: '_max',
          tie: 'tie_max',
          player_pair: 'pair_max',
          banker_pair: 'pair_max',
          super_six: 'ss_max',
          '1': '_max',
          '2': '_max',
          '5': '_max',
          '10': '_max',
          '20': '_max',
          'og': '_max'
        }
      }
    }

    // Validators
    if (!sectionCode) return { err: 1, status: 'Invalid Section Code' }
    sectionCode = _.isUndefined(data.sectionCode) ? '' : data.sectionCode
    customChip = _.isUndefined(data.customChip) ? {} : data.customChip
    showAlert = _.isUndefined(data.showAlert) ? true : data.showAlert
    customSection = _.isUndefined(data.customSection) ? {} : data.customSection
    betClass = _.isUndefined(data.betClass) ? '' : data.betClass
    byPassConfirm = _.isUndefined(data.byPassConfirm) ? false : data.byPassConfirm


    // Initializing Variables
    section = !_.isEmpty(customSection) ? customSection[sectionCode] : state.betTable.section[sectionCode]
    chosenChip = !_.isEmpty(customChip) ? customChip : state.selectedChip
    myBalance = state.userinfo.balance

    // Sum all unconfirmed and confirmed chips
    _.map(section.bets, (bet) => { if (bet.isConfirmed) { totConChips += parseFloat(bet.chipValue) } else { totUnconChips += parseFloat(bet.chipValue) } })

    // Add the current selected chip value to be added
    totUnconChips += parseFloat(chosenChip.value)

    // Implementing standard betting limits
    if (limit('min') > (totUnconChips + totConChips)) {
      // Minimum bet reached
      state.message = showAlert ? 'Bet is below minimum' : ''
      return { err: 1, status: 'Bet is below minimum' }
    } else if (limit('max') < (totUnconChips + totConChips)) {
      // Compute the lump sum for All-In Chips condition
      balChipsDiff = limit('max') - ((totUnconChips + totConChips) - parseFloat(chosenChip.value))
      // All-In chips
      if (balChipsDiff < parseFloat(chosenChip.value) && balChipsDiff > 0) {
        section.bets.push({
          betSection: sectionCode,
          chipClass: chosenChip.class,
          chipImage: chosenChip.class,
          chipValue: parseFloat(balChipsDiff),
          isConfirmed: false,
          isRebet: chosenChip.isRebet
        })
      } else {
        // Maximum bet reached
        state.message = showAlert ? _s.tt('Maximum bet reached') : ''
        return { err: 1, status: _s.tt('Maximum bet reached') }
      }
    } else {
      // Balance checker
      if (myBalance < totUnconChips) {
        // Compute the lump sum for All-In Chips condition
        balChipsDiff = myBalance - ((totUnconChips) - parseFloat(chosenChip.value))

        if (balChipsDiff < parseFloat(chosenChip.value) && balChipsDiff > 0) {
          section.bets.push({
            betSection: sectionCode,
            chipClass: chosenChip.class,
            chipImage: chosenChip.class,
            chipValue: parseFloat(balChipsDiff),
            isConfirmed: false,
            isRebet: chosenChip.isRebet
          })
        } else {
          // Not enough credits to place bet
          state.message = showAlert ? 'All-In Insufficient Balance' : ''
          return { err: 'Insufficient Balance' }
        }
      } else {
        section.bets.push({
          betSection: sectionCode,
          chipClass: chosenChip.class,
          chipImage: chosenChip.class,
          chipValue: parseFloat(chosenChip.value),
          isConfirmed: byPassConfirm,
          isRebet: chosenChip.isRebet
        })
      }
    }

    // Sum all betting chips and add positioning of chips
    _.forEach(section.bets, function (bet, index) {
      let valueIs, valueOfY

      totChipAmt += parseFloat(bet.chipValue)
      m100 = m100 - m25
      valueIs = '._' + (index + 1)
      valueOfY = '+' + m100 + '%'
      console.log('this.getBettingtable: ', state.currenttab)
      setTimeout(function () {
        if (state.currenttab === 'moneywheel') {
          TweenLite.set(valueIs, { width: 30, height: 30 })
        }
        TweenLite.set('.' + (betClass ? betClass : 'label__bet'), { x: '-20', opacity: 1 })
        TweenLite.to(valueIs, 1, { ease: Expo.easeOut, rotation: 0, y: valueOfY, x: '-15' })
      }, 100)
    })

    // Set sum of chips value
    section.sumOfStagedChips = totChipAmt
    // Return success
    return { err: 0, status: '' }

    /**
     * Limit
     * @param type
     * @returns {*}
     */
    function limit (type) {
      return state.userinfo.otherBetLimits[map.betLimits[type][sectionCode]]
    }
  },

  /*
  _________  .__              __
  \_   ___ \ |  |__  _____  _/  |_
  /    \  \/ |  |  \ \__  \ \   __\
  \     \____|   Y  \ / __ \_|  |
   \______  /|___|  /(____  /|__|
          \/      \/      \/
   */
  JOIN_CHAT_TABLE ({commit, state}, table) {
    return new Promise((resolve, reject) => {
      state.socketio.socket.post('/user/joinChatTable', {
        token: localStorage._token,
        table_number: table.table_number
      }, (res) => {
        if (res.err) {
          reject(res.err)
        } else {
          // console.log('JOIN_CHAT_TABLE')
          commit('GET_CHAT_THREAD', Object.assign({ table_number: table.table_number }, res))
          resolve()
        }
      })
    })
  },
  SEND_CHAT_TABLE ({state}, chat) {
    return new Promise((resolve, reject) => {
      state.socketio.socket.post('/user/chatMessage', {
        token: localStorage._token,
        message: chat.message,
        table_number: chat.table_number,
        ip: chat.ip
      }, (res) => {
        if (res.err) {
          reject(res.err)
        } else {
          // console.log('SEND_CHAT_TABLE')
          resolve()
        }
      })
    })
  },
  SET_USER_NICKNAME_ON_CHAT ({state}, info) {
    return new Promise((resolve, reject) => {
      state.socketio.socket.put('/user/chatChangeNickname', info, (res) => {
        if (res.err) {
          reject(res.err)
        } else {
          resolve()
        }
      })
    })
  },

  /*
    _________  __
   /   _____/_/  |_ _______   ____  _____     _____    ____ _______
   \_____  \ \   __\\_  __ \_/ __ \ \__  \   /     \ _/ __ \\_  __ \
   /        \ |  |   |  | \/\  ___/  / __ \_|  Y Y  \\  ___/ |  | \/
  /_______  / |__|   |__|    \___  >(____  /|__|_|  / \___  >|__|
          \/                     \/      \/       \/      \/
   */
  LOAD_TOP_STREAMER ({state}, data) {
    return new Promise((resolve, reject) => {
      let payLoad = _.assign(data, { token: localStorage._token });
      let finalList = []
      state.socketio.socket.post('/topStreamer', payLoad, (res) => {
        if (res.err) {
          return reject(res)
        } else {
          finalList = _.orderBy(res.data, [streamer => streamer.table_location.toLowerCase()], ['desc']);

          state.streamerlist = finalList
          state.currentStreamerTable = finalList[0].table_location
          return resolve({data: finalList})
        }
      })
    })
  },

  /*
  __________                                  .___
  \______   \  ____   ____   ____ _______   __| _/ ______
   |       _/_/ __ \_/ ___\ /  _ \\_  __ \ / __ | /  ___/
   |    |   \\  ___/\  \___(  <_> )|  | \// /_/ | \___ \
   |____|_  / \___  >\___  >\____/ |__|   \____ |/____  >
          \/      \/     \/                    \/     \/
   */
  LOAD_TRANSACTION_HISTORY ({ state }, data) {
    return new Promise((resolve, reject) => {
      let payLoad = _.assign(data, { token: localStorage._token })
      state.socketio.socket.get('/transaction/new_records', payLoad, (res) => {
        if (res.err) {
          reject(res)
        } else {
          resolve(res)
        }
      })
    })
  },
  LOAD_TRANSACTION_RWL ({ state }, data) {
    return new Promise((resolve, reject) => {
      let payLoad = _.assign(data, { token: localStorage._token })
      state.socketio.socket.get('/transaction/new_records', payLoad, (res) => {
        if (res.err) {
          reject(res)
        } else {
          resolve(res)
        }
      })
    })
  },

  /*
  _________
  \_   ___ \   ____    _____    _____    ____    ____
  /    \  \/  /  _ \  /     \  /     \  /  _ \  /    \
  \     \____(  <_> )|  Y Y  \|  Y Y  \(  <_> )|   |  \
   \______  / \____/ |__|_|  /|__|_|  / \____/ |___|  /
          \/               \/       \/              \/
   */
  UPDATE_ONGAME_PLAYER ({state}) {
    return state.socketio.socket.post('/tables/updateOnGamePlayer', {
      token: localStorage._token
    })
  },

  PLAYER_BROADCAST ({ state }, data) {
    const WS = state.GAME_APP_WS;

    // console.log("WS", WS);

    // Validator
    if (!data) return;

    // if (WS.readyState === WebSocket.CLOSED) {
      WS.send(JSON.stringify({
        command: "BROADCAST_TO_PLAYERS",
        data
      }));
    // } else {
    //   console.log("Invalid GameApp WebSocket Connection");
    // }
  },

  GET_ANNOUNCEMENTBYTABLE (context, tablenumber) {
    if (localStorage._token) {
      let resultTablenumber = tablenumber ? tablenumber : 'Lobby'
      context.rootState.socketio.socket.get('/announcement/getAnnouncementsBy', { tablenumber: resultTablenumber }, function (response) {
        // console.log('GET_ANNOUNCEMENTBYTABLE', response.data)
        context.rootState.AnnouncementNotif = response.data
      })
    }
  },

  GET_IP ({}, payLoad) {
    return new Promise((resolve, reject) => {
      axios.get('https://ipapi.co/json/', payLoad)
        .then((response) => {
          return resolve(response.data)
        })
        .catch((error) => {
          return reject(error)
        });
    })
  }
}
