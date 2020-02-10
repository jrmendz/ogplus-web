<template>
    <div id="pre-loading" v-if="load">
      <div class="text-msg">Loading...</div>
      <div class="loading-bar">
        <div class="progress"></div>
      </div>
    </div>
</template>


<script>

export default {
  data () {
    return {
      load: true
    }
  },

  mounted () {
    let _s = this

    // // progress bar
    if (_s.load === true) {
      let progressRatio = 0;
      // console.log(_s.$store.state.progscreen, 'progscreen from progscreen')
      const progress = document.getElementsByClassName("progress")[0];
      const loadingAnim = (time) => {
        if (progressRatio <  5) progressRatio += (0.25   + Math.random() * 0.15);
        else if (progressRatio <  10) progressRatio += (0.25  + Math.random() * 0.075);
        else if (progressRatio < 25) progressRatio += (0.15 + Math.random() * 0.0375);
        progress.style.width = "calc(" + progressRatio + "% - 2px)";
        if (progressRatio < 100) window.requestAnimationFrame(loadingAnim);
      };
      loadingAnim(0);
      // console.log(progressRatio, 'progressRatio')
    }

  }
}
</script>
<style>
/* global styles */

</style>

<style lang="scss" scoped>


        #pre-loading {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;

          background: #000000;
        }

        #pre-loading .img-logo {
          position: absolute;
          width: 100%;
          height: 80px;
          top: calc(50% - 40px);

          background-size: contain;
          background-repeat: no-repeat;
          background-position: center center;

          animation: scalation 1s infinite alternate;
        }

        #pre-loading .text-msg {
          opacity: 0;
          position: absolute;
          width: 100%;
          height: 24px;
          top: calc(50% + 145px + 24px);

          color: #ffffff;
          font-weight: bold;
          font-size: 20px;
          text-align: center;
          line-height: 24px;

          animation: text-msg 1s infinite alternate;
        }

        #pre-loading .loading-bar {
          position: absolute;
          padding: 1px;
          width: 50%;
          height: 12px;
          top: calc(50% + 150px + 60px);
          left: 25%;

          border: 1px solid white;
          border-radius: 3px;
        }

        #pre-loading .loading-bar .progress {
          position: absolute;
          width: calc(100% - 2px);
          height: calc(100% - 2px);

          border-radius: 3px;
          background: white;
        }

        @keyframes scalation {
            0% { transform: scale(1); }
          100% { transform: scale(1.2); }
        }
        @keyframes text-msg {
            0% { opacity: 1; }
          100% { opacity: 0; }
        }
</style>
