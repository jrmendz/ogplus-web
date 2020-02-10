<template>
	<div class="headlines">
		<div class="ticker" :style="[{'animation-duration': duration, '-webkit-animation-duration': duration }]">
			<template v-if="repeat" >
				<div class="item" v-for="(message, i) in messages" :key="i + 'r'">
					{{ tt(message.text) }}
				</div>
			</template>
			<template v-else>
				<div class="item" v-for="(message, i) in messages" :key="i">
					{{ tt(message.text) }}
				</div>
			</template>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		repeat: Number,
		messages: Array,
		duration: [Number, String],
	},
	methods: {
		repeatedHeadlines: function () {
			let _s = this
			for (let i = 1; i < _s.repeat;i++) {
				_s.messages.push(_s.messages[0])
			}
		}
	},
	mounted () {
		this.repeatedHeadlines();
	}
}
</script>

<style lang="scss">
.headlines {
	@include position(absolute,0,0,0, $index: 100);
	width: 100%;
  @include rem(margin, 0 16px);
	overflow: hidden;
	padding-left: 100%;
	box-sizing: content-box;
	color: $base-color-inverted;

	.ticker {
		display: inline-block;
		box-sizing: content-box;
		white-space: nowrap;
		padding-right: 100%;
		animation: ticker 40s linear infinite;
		will-change: transform;

		&:hover {
			animation-play-state: paused;
		}

		.item {
			display: inline-block;
			box-sizing: content-box;
			padding-right: 25vw;
			@include rem((
				height: 40px,
				line-height: 40px,
        font-size: 16px
      ));
		}
	}
}

@keyframes ticker {
	0% {
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }

  100% {
    transform: translate3d(-100%, 0, 0);
  }
}
</style>
