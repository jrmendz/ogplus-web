<template>
  <v-scale-transition origin="center center">
    <div class="noc__modal record__modal elevation-12" v-if="$store.state.rrModal">
      <v-card class="rrmodal" style="overflow: hidden;">
        <v-tabs v-model="tabIndex" centered height="80" class="lobby__table" slider-color="slider-color-bg">
          <v-tab href="#tab-1" :ripple="false" v-on:click="clickEff">
            <div class="tab__holder">
              {{ tt('Record') }}
            </div>
          </v-tab>
          <v-tab href="#tab-2" :ripple="false" v-on:click="clickEff">
            <div class="tab__holder">
              {{ tt('Report') }}
            </div>
          </v-tab>
        </v-tabs>
        <div class="divider"></div>
        <v-tabs-items v-model="tabIndex" class="lobby__table__content">
          <v-tab-item value="tab-1">
            <RecordModalComponent />
          </v-tab-item>
          <v-tab-item value="tab-2">
            <LogsComponent />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </div>
  </v-scale-transition>
</template>

<script>
import RecordModalComponent from '@/components/modal/RecordModalComponent'
import LogsComponent from '@/components/modal/LogsComponent'
import RecordsNReports from '@/library/RecordsNReports.js'

export default {
  data () {
    return {
      tabIndex: 'tab-1'
    }
  },
  components: {
    LogsComponent,
    RecordModalComponent
  },
  mixins: [RecordsNReports],
  methods: {
    getTabIndex () {
      this.tabIndex = this.$store.state.isLobby ? 'tab-1' : 'tab-2'
    }
  },
  computed: {
    rrModal: {
      get () {
        return this.$store.state.rrModal
      }
    }
  },
  watch: {
    rrModal: function () {
      this.tabIndex = 'tab-1'
    }
  }
}
</script>

<style lang="scss">
.record__modal {
  @include position(absolute, $translate-center: true, $index: 999);
  @include rem(width, 1366px);
  @include rem(border-radius, 10px);
  will-change: transform, opacity;
  overflow: hidden;
  margin-left: 0;
}

.rrmodal {

  .v-tabs__slider-wrapper {
    transition-delay: initial;
    z-index: initial !important;
  }

  .v-tabs__div {

    a {
      @include rem(font-size, 22px !important);
      text-transform: uppercase;
      font-weight: normal !important;

      &:not(.v-tabs__item--active) {
        opacity: .75 !important;
      }
    }
  }

  .theme--dark.v-tabs__bar  {
    background-color: transparent !important;
  }

  .vb-content {
    box-sizing: border-box !important;
    padding-right: 0 !important;
  }

  .lobby__table .v-tabs__container {
    padding-top: 0;
  }

  .lobby__table .v-tabs__slider {
    width: 100% !important;
    margin-left: 0 !important;
    transform: skewX(-$skew) perspective(0);
  }

  .lobby__table .v-tabs__div {

    .tab__holder {
      transform: skewX($skew) perspective(0);
    }

    a,
    .v-tabs__item--disabled {
      transform: skewX(-$skew) perspective(0);
    }

    a:before {
      display: none;
    }
  }

  .v-table {
    background-color: transparent !important;
  }

  .v-window-item {
    position: relative;
  }

  .lobby__table__content,
  .v-window-item {
    background-color: transparent !important;
    height: calc(960px - 255px) !important;
    overflow: hidden;
  }

  .paginator {
    @include position(absolute, $translate-horizontal: true, $bottom: 0);
  }
}
</style>

