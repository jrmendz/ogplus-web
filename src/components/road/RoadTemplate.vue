<template>
  <table class="table__ui">
    <!-- API Loading Progress -->
    <tr v-if="!$props.data.length" v-cloak>
      <td align="center">
        <v-progress-circular color="accent__color" size="50" width="7" indeterminate></v-progress-circular>
      </td>
    </tr>

    <!--Loaded Road-->
    <tr v-if="$props.data.length" v-cloak v-for="(rows, ri) in $props.data" :key="ri">
      <td v-for="(cols, ci) in rows" :key="ci">
        <!-- beadRoad and bigRoad -->
        <template v-if="['beadRoad','bigRoad','goodTips'].indexOf($props.type) > -1" v-cloak>

          <!--  THIS IS DEVELOPMENT TEST-->
          <!--  TODO: Bro Louie, dito nalang tayo mag-test for development :) -->
          <template v-if="$env === 'development'">
            <v-tooltip top :disabled="!tooltip && $env === 'development'">
              <template v-slot:activator="{ on }" v-if="!cols.isPredict">
              <span :class="cols.class" v-on="on">
                <i>{{($props.game === 'moneywheel' ? cols.result === 'og' ? '' : cols.result : $props.type === 'beadRoad' ? tt(locale === 'cn' && cols.result === 'tiger' ? 'TG' : cols.char) : cols.ties) || ''}}</i>
              </span>
              </template>
              <template v-else-if="cols.isPredict && cols.isPredictShow">
              <span :class="cols.class">
                {{ $props.type === 'beadRoad' ? tt(cols.char) : '' }}
              </span>
              </template>
              <span v-if="tooltip && $env === 'development'">{{ bead(cols).cards }}</span>
            </v-tooltip>
          </template>
          <!--  THIS IS DEVELOPMENT TEST-->

          <!--  THIS IS LIVE TEST -->
          <template v-else>
            <template v-if="!cols.isPredict">
              <span :class="cols.class">
                <i>{{($props.game === 'moneywheel' ? cols.result === 'og' ? '' : cols.result : $props.type === 'beadRoad' ? tt(locale === 'cn' && cols.result === 'tiger' ? 'TG' : cols.char) : cols.ties) || ''}}</i>
              </span>
            </template>
            <template v-else-if="cols.isPredict && cols.isPredictShow">
              <span :class="cols.class">
                {{ $props.type === 'beadRoad' ? tt(cols.char) : '' }}
              </span>
            </template>
          </template>
          <!--  THIS IS LIVE TEST-->

        </template>
        <!-- bigEyeRoad, smallRoad and cockroachRoad -->
        <template v-else-if="['bigEyeRoad', 'smallRoad', 'cockroachRoad'].indexOf($props.type) > -1" v-cloak>
          <ul class="b__road">
            <li v-for="(index, ii) in cols" :key="ii">
              <span v-if="!index.isPredict" :class="index.class"></span>
              <span v-else-if="index.isPredict && index.isPredictShow" :class="index.class"></span>
            </li>
          </ul>
        </template>

        <template v-else>
          <span>?</span>
        </template>
      </td>
    </tr>
  </table>
</template>

<script>
  /**
     _____                                 _                 _
     \_   \ _ __ ___   _ __    ___   _ __ | |_  __ _  _ __  | |_
      / /\/| '_ ` _ \ | '_ \  / _ \ | '__|| __|/ _` || '_ \ | __|
   /\/ /_  | | | | | || |_) || (_) || |   | |_| (_| || | | || |_
   \____/  |_| |_| |_|| .__/  \___/ |_|    \__|\__,_||_| |_| \__|
                      |_|
   Intended for rendering road only, refrain from adding functions/logic here, add logic on parent component instead :)
   */
  export default {
    name: "RoadTemplate",
    props: {
      type: String, // Road Type
      data: Array, // Road data should be in here
      game: String, // Current game name (baccarat, dragontiger & moneywheel,
      tooltip: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      bead (data) {
        return _.isObject(data.rawResult) ? data.rawResult : {};
      }
    },
    computed: {
      locale: {
        get () { return this.$store.state.locale }
      }
    }
  }
</script>

<style scoped>
/*
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 999999;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }

  span {
    color: white;
  } */
</style>
