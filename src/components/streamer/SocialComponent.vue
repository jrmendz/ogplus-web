<template>
	<ul class="timeline__social__btn">
		<template v-if="followers">
			<li v-for="(follower, i) in followers" :key="'f' + i">
				<div class="svg-holder">
					<svgicon :name="follower.name" :height="iconSize" original></svgicon>
				</div>
				{{ follower.count }}
			</li>
		</template>
		<template v-if="hearts">
			<li v-for="(heart, i) in hearts" :key="'h' + i">
				<div class="svg-holder cursor" @click="togglefollowstreamer(streamerinfo)">
					<svgicon :name="heart.name" :height="iconSize" original></svgicon>
				</div>
				{{ heart.count }}
			</li>
		</template>
		<template v-if="comments">
			<li v-for="(comment, i) in comments" :key="'c' + i">
				<div class="svg-holder">
					<svgicon :name="comment.name" :height="iconSize" original></svgicon>
				</div>
				{{ comment.count }}
			</li>
		</template>
	</ul>
</template>

<script>
export default {
	props: {
		hearts: Array,
		followers: Array,
		comments: Array,
		iconSize: String,
		streamerinfo: Number
	},
	methods: {
		 togglefollowstreamer: function (dealerscode) {
			let _s = this
			
      // Validators
      if (!dealerscode)
        return false

      _s.$store.dispatch('FOLLOW_STREAMERS', {
        method: 'follow',
        dealerscode: dealerscode
      })
    }
	}
}
</script>

<style lang="scss">
ul.timeline__social__btn {
  display: flex;
  @include rem(margin, 5px 0);

  li {
    display: flex;
    align-items: center;
    flex: 1 0 auto;
    color: $base-color-inverted;
    @include rem(font-size, 16px);

    .svg-holder {
      @include rem(margin-right,5px);

      path {
        fill: $base-color-inverted;
      }
    }
  }
}
</style>
