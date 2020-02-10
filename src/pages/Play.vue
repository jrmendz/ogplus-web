<template>
  <div class="loader">
    <div id='big'>
      <div id="particleholder">
      </div>
      <div class="loader-logoblack">
        <img class="loader-logoin0" src="@/assets/img/blackOG.png">
      </div>
      <div class="loader-logo">
        <img class="loader-logoin" src="@/assets/img/Logo400x400.png">
      </div>
    </div>
  </div>

  <!-- Ito yung edit ko -->
</template>

<style lang="scss" scoped>

  .loader,
  .animationcontainer {
    @include position(absolute, $index: 9999);
    display: block;
    @include box(100%);
    background-color: $base-color;
    pointer-events: none;
  }

  .ogContent {
    opacity: 0;
  }
  .loader-logoin0, .loader-logoin {
    pointer-events: none;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .loader-logoblack {
    pointer-events: none;
    opacity: 0;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .loader-logo {
    /* opacity: 0; */
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  #info {
    color: white;
    font-family: monospace;
  }

  canvas {
    position: absolute;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
  }

  img {
    position: absolute;
    cursor: pointer;
  }
</style>

<script>
  import LoadingScreen from '@/components/loading/LoadingScreenComponent'
  import $cookie from 'vue-cookie'
  export default {
    components: {
      LoadingScreen
    },
    mounted() {
      this.verifyLogin()
    },

    methods: {
      verifyLogin () {
        let query = this.$route.query || {}

        if (query.platform) {
          if (query.platform.toUpperCase() === 'MOBILE') {
            location.href = `https://m-${location.host}/${location.hash}`
            return false
          }
        }

        // Check if query token is valid
        if (query.t) {

          this.$store.dispatch('VERIFY_LOGIN', {
            token: query.t,
            justVerify: true
          }).then((success) => {

            this.$store.dispatch('AUTH_LOGOUT', {
              token: localStorage._token,
              clearStorage: false
            }).then(() => {
              $cookie.delete('userSession');
              $cookie.delete('tabId');
              localStorage._token = query.t
              localStorage._locale = query.lang ? _.toLower(query.lang) : 'en'
              sessionStorage.session = `${query.t}${_.now()}`
              // Set local language
              this.$store.state.locale = localStorage._locale

              setTimeout(() => {
                return location.assign('/#/');
              }, 2000)
            })

          }, (error) => {
            console.error(error)
            return location.assign('/#/401');
          });

        } else {
          return location.assign('/#/404')
        }

      }
    }
  }

</script>

<style scoped>

</style>
