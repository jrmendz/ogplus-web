<template>
  <div v-if="showLobby">
    <loadingScreen/>
    <LobbyComponent/>
  </div>
  <div v-else>
    <loadingScreen/>
  </div>
</template>

<script>
import LobbyComponent from '@/components/lobby/LobbyComponent'
import LoadingScreen from '@/components/loading/LoadingScreenComponent'
import $cookie from 'vue-cookie'

export default {
  components: {
    LobbyComponent,
    LoadingScreen,
  },
  data () {
    return {
      showLobby: false,
      deleteSession: true
    }
  },
  mounted () {
    let token = localStorage._token
    let tabID = "TAB_" + _.random(0, 999999999999999999);

    window.addEventListener('storage', this.changeOfToken);
    // window.addEventListener('beforeunload', (ev) => {
    //   if (this.deleteSession) {
    //     $cookie.delete('userSession');
    //     $cookie.delete('tabId');
    //   }
    // });

    this.$store.dispatch('VERIFY_LOGIN', {
      token,
      justVerify: true
    }).then(() => {
      // $cookie.set('userSession', token);
      localStorage.setItem('tabId', tabID);
      this.$store.state.tabId = tabID;
      this.showLobby = true

      this.$store.dispatch('GET_TABLES').then((res) => {
        this.$store.dispatch('GET_USER_INFO')
        this.$store.dispatch('ENTER_TABLE_UPON_REFRESH')
      })

    }, () => {
      console.error("Token was invalid. Proceed to login.")
      return location.assign('/#/login')
    })

  },
  methods: {
    changeOfToken (ev) {
      if (ev.storageArea === localStorage) {
        if (ev.key === 'tabId') {
          if (this.$store.state.tabId !== ev.newValue) {
              location.assign('/#/logout');
              setTimeout(() => {
                  return location.reload();
              }, 1000)
          }
        }
      }
    }
  }
}
</script>
