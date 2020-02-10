<template>
	<div>
		<iframe ref="frame" id="niuniu__frame" src="https://streaming.oriental-game.com/niuniu/index.html" frameborder="0"></iframe>
	</div>
</template>
<script>
export default {
	created () {
		window.onmessage = (e) => {
			console.log('EVENTS ====>', e)
			const userId = this.userId
			const data = e.data
			const elFrame = this.$refs.frame.contentWindow;
			if (data.id === 'ready_game') {
				elFrame.postMessage({
					id: 'init_game',
					token: localStorage._token,
					userId
				}, '*')
			}

      if (data.id === 'hide_loading') {
        this.hideTabOnLobby = true
      }
		}
	},
	computed: {
		userId () {
			return this.$store.state.userinfo.id
		},
    hideTabOnLobby: {
		  get () { return this.$store.state.hideTabOnLobby },
      set (v) { this.$store.state.hideTabOnLobby = v }
    }
	}
}
</script>
<style lang="scss">
	iframe {
		@include position(absolute,0,0,0,0);
		height: 100%;
		width: 100%;
	}
</style>
