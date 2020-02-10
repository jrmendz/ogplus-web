<template>
	<div class="timeline">
		<div class="timeline__image" :style="{ 'background-image' : 'url(' + imgSrc + ')' }"></div>
		<div class="timeline__date__posted">
			<p>Streamer posted a photo</p>
			<p>5/3/2019, Friday 3:51 PM</p>
			<SocialComponent iconSize="16" :followers="[{name: 'player_icon', count: '150'}]" :comments="[{name: 'comments', count: '200'}]"/>
		</div>
		<div class="timeline__caption">
			This is a timeline caption for this post.
		</div>
	</div>
</template>

<script>
import SocialComponent from '@/components/streamer/SocialComponent'
export default {
	components: {
		SocialComponent
	},
	props: {
    imgSrc: String
  }
}
</script>

<style lang="scss">
.timeline {
  $t-image: 250px;

  display: flex;
  flex-wrap: wrap;
  @include rem((
    padding: 22px 0 0,
    border-bottom: 1px solid rgba($base-color-inverted, .15),
  ));

  .timeline__image,
  .timeline__date__posted,
  .timeline__caption {
    display: inline-flex;
    flex: 1 0 auto;
    max-width: 50%;
    color: $base-color-inverted;
  }

  .timeline__date__posted {
    flex-flow: column;
    justify-content: center;
    @include rem(padding, 0 24px);

    p {
      margin-bottom: 0;

      + p {
        color: darken($base-color-inverted, 35%);
      }
    }
  }

  .timeline__caption {
    max-width: 100%;
    @include rem(padding, 10px 0);
  }

  .timeline__image {
    flex: 1 0 $t-image;
    @include rem((
      max-width: $t-image,
      height: $t-image / 1.5,
      border-radius: 10px,
      border-width: 1px
    ));
    border-style: solid;
    border-color: $base-color-inverted;
    background-color: $base-color;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>

