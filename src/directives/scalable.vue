<template>
  <div class="scalable__window" :style="[dynamicStyle]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 1920
    },
    height: {
      type: Number,
      default: 937
    }
  },
  data () {
    return {
      dynamicStyle: "",
      changeHeight: null,
    }
  },

  computed: {
    heightValue: {
      get () {
        return this.height
      },
      set (newValue){
        this.changeHeight = newValue
      }
    }
  },

  methods: {
    scalePages () {

      let _s = this,
          scale = null,
          scaleX = null,
          scaleY = null,
          pageWidth = null,
          pageHeight = null

      // responsible when the browser resize its height
      if (window.innerHeight < _s.$props.height) {
        _s.changeHeight = _s.$props.height
      } else {
        _s.changeHeight = window.innerHeight
      }

      pageWidth = _s.$parent.$el.offsetWidth
      pageHeight = _s.$parent.$el.offsetHeight

      let computeScaleX = pageWidth / _s.$props.width
      let computeScaleY = pageHeight / _s.$props.height

      scaleX = computeScaleX
      scaleY = computeScaleY
      scale = (scaleX > scaleY) ? scaleY : scaleX;

      let getLeftPosition = Math.abs(Math.floor((( _s.$props.width * scale) - pageWidth)/2))
      let getTopPosition = Math.abs(Math.floor(((_s.changeHeight * scale) - pageHeight)/2))
      let scaleRound = Math.floor(scale * 1000) / 1000

      this.dynamicStyle = {
        'transform': 'translateZ(0) scale(' + (window.innerWidth < _s.$props.width || window.innerWidth > _s.$props.width ? scaleRound : scaleRound.toFixed(1)) + ')',
        'top': getTopPosition + 'px',
        'left': getLeftPosition + 'px',
        'width': _s.$props.width + 'px',
        'height': _s.changeHeight + 'px'
      }
    }
  },
  mounted () {
    let _s = this
    // Initialized the function
    _s.scalePages()
    // listen first to check if the browser was already resize
    window.addEventListener('resize', () => {
      _s.scalePages()
    })
  },
  destroyed() {
    window.removeEventListener('resize', () => {
      this.scalePages()
    })
  }
}
</script>

<style lang="scss" scoped>
.scalable__window {
  position: absolute;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url('/static/translucent.png');
  transform-origin: top left;
  will-change: transform, top, left;
  backface-visibility: hidden;
}
</style>
