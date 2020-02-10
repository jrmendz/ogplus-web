<template>
	<div class="streamer">
		<div class="streamer__img" :style="{ 'background-image' : 'url(' + $props.data.imagestreamer + ')' }"></div>
		<div class="streamer__img" :style="{ 'background-image' : 'url(' + $props.data.imagestreamer + ')' }"></div>
		<div class="streamer__body">
			<div class="streamer__name">
				{{ $props.data.table_location !== '' ? $props.data.table_location + '- ' : 'Offline - '}} {{ $props.data.nickname | capitalize }}
			</div>
			<SocialComponent iconSize="14" :followers="[{name: 'player_icon', count: $props.data.live_viewers }]" :hearts="[{name: 'heart', count: $props.data.likes}]"/>
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
    data: Object
  }
}
</script>

<style lang="scss">
.streamer {
  display: flex;
  position: relative;
  @include rem((
    height: 135px,
    margin-bottom: 24px,
    border-radius: 10px,
  ));
  overflow: hidden;

  &:last-child {
    margin-bottom: 0;
  }

  .streamer__body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    @include position(absolute, $right: 0, $index: 1);
    width: 60%;
    height: 100%;
    @include rem((
      padding: 0 10px 0 30px,
    ));
    color: $base-color-inverted;

    .timeline__social__btn {
      @include rem(width, 120px);

      li {
        @include rem(font-size, 12px);

        .svg-holder {
          @include rem(margin-right, 2px);
        }
      }
    }
  }

  .streamer__img {
    position: relative;
    flex: 1 0 auto;
    background-size: cover;

    + .streamer__img {
      width: 10%;
      filter: blur(10px);
      @include rem((
        margin-top: -15px,
        margin-left: -25px,
        margin-bottom: -15px,
      ));
      background-size: 115%;
      overflow: hidden;
    }
  }
}

@for $i from 0 through 100 {
  $random-color: rgb(random(255),random(255),random(255));

  .streamer[data-number="#{$i}"] {
    &:before {
      content: '';
      @include position(absolute,0,0,0,0,1);
      background-image: linear-gradient(to right, rgba($base-color,0) 20%, darken($random-color, 10%) 100%);
      opacity: .55;
    }
  }
}
</style>


