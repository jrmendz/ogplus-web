<template>
  <div>
    <v-slide-x-transition origin="center center">
      <div class="noc__modal settings__modal elevation-12" v-if="$store.state.settingModal" >
        <div class="modal__title --is-center">{{ tt('Settings') }}</div>
        <div class="modal__body">
          <h3 class="title-header">{{ tt('Language') }}</h3>
          <LanguageComponent isLogin="true"/>
          <!-- music -->
          <h3 class="title-header">{{ tt('Sounds') }}</h3>
          <div class="sound-wrapper">
            <ul class="list__ui" >
              <li>{{ tt('Music') }}</li>
              <li>
                <template  v-if="$store.state.isLobby">
                <v-switch
                  v-model="musicSwitch"
                  color="blue"
                  hide-details
                ></v-switch>
                  </template>
                  <template v-else>
                  <v-switch
                  color="blue"
                  hide-details
                  disabled
                ></v-switch>
                  </template>
              </li>
              <li v-on:click="clickEff">
                <template  v-if="$store.state.isLobby">
                  <v-slider
                    v-model="musicSlider"
                    color="bg-blue"
                    hide-details
                    step="7"
                    min="0"
                    max="100"
                    :click="volumeSlider()">
                  </v-slider>
                </template>
                <template v-else>
                  <v-slider
                    color="bg-blue"
                    hide-details
                    disabled>
                  </v-slider>
                </template>
              </li>
            </ul>
            <!-- fx -->
            <ul class="list__ui">
              <li>{{ tt('Sound FX') }}</li>
              <li>
                <v-switch
                  v-model="$store.state.soundFxSwitch"
                  color="blue"
                  hide-details
                ></v-switch>
              </li>
              <li>
                <v-slider  v-on:click="clickEff"
                  v-model="fxSlider"
                  color="bg-blue"
                  hide-details
                  step="7"
                  min="0"
                  max="100"
                  :click="volumeSlider()"
                >
                </v-slider>
              </li>
            </ul>
            <!-- live sound -->
            <ul class="list__ui">
              <li>{{ tt('Live Sound') }}</li>
              <li>
                <v-switch
                  v-if="!$store.state.isLobby"
                  v-model="liveSoundSwitch"
                  color="blue"
                  hide-details
                ></v-switch>
                <v-switch
                  v-if="$store.state.isLobby"
                  color="blue"
                  hide-details
                  disabled
                ></v-switch>
              </li>
              <li>
                <v-slider
                  v-if="!$store.state.isLobby"
                  v-model="liveSlider"
                  color="bg-blue"
                  hide-details
                  step="7"
                  min="0"
                  max="100"
                  :click="volumeSlider()"
                >
                </v-slider>
                <v-slider
                  v-if="$store.state.isLobby"
                  color="bg-blue"
                  hide-details
                  disabled
                >
                </v-slider>
              </li>
            </ul>
          </div>
          <h3 class="title-header">{{ tt('Road Map Color') }}</h3>
          <ul class="list__ui --is-justify-center road" >
            <li :class="!$store.state.blackRoadMapSelected ? '--is-selected' : ''"><img :src="roadWhite" @click="$store.state.blackRoadMapSelected = false" v-on:click="clickEff"></li>
            <li :class="$store.state.blackRoadMapSelected ? '--is-selected' : ''"><img :src="roadBlack" @click="$store.state.blackRoadMapSelected = true" v-on:click="clickEff"></li>
          </ul>
          <p class="version-text">{{ tt('Version.') }} {{$version}}</p>
<!--          <button @click="squeeze()">SQUEEZE</button>-->
        </div>
      </div>
    </v-slide-x-transition>
    <v-fade-transition>
      <div class="overlay__bg" v-if="$store.state.settingModal" @click="save"></div>
    </v-fade-transition>
  </div>
</template>

<script>
import LanguageComponent from '@/components/translation/LanguageComponent'
import Settings from '@/library/Settings.js'

export default {
  components: {
    LanguageComponent
  },
  mixins: [Settings],
  methods: {
  }
}
</script>

<style lang="scss">
.settings__modal {
  @include position(fixed, $top: 16px, $left: 96px, $index: 999);
  @include rem(width, 360px,);
  @include rem(border-radius, 7px,);
  will-change: transform, opacity;
  margin-left: 0;

  .sound-wrapper {
    @include rem((
      margin-top: -10px,
      margin-right: 28px,
      margin-bottom: 16px
    ));
  }

  .road {
    @include rem(margin-bottom, 24px);

    li {
      @include rem(margin, 0 24px);

      &.--is-selected {
        position: relative;

        &:before {
          content: "";
          @include position(absolute, $bottom: -5px, $translate-horizontal: true);
          @include box(6px);
          background-color: $blue;
          @include rem(
            border-radius, 6px
          );
        }
      }

      &:first-child {
        justify-content: center !important;
      }

      &:last-child {
        opacity: .75;
      }
    }
  }

  .list__ui {
    border-bottom: 0;

    &.--is-justify-center {
      justify-content: center;
    }
  }

  .v-icon {
    @include rem((
      font-size: 16px,
      padding: 0 5px
    ));
  }

  .v-input--switch {
    margin-top: 0;
    padding-top: 0;
  }

  .v-input--slider {
    margin-top: 0;
  }

  .v-input--selection-controls .v-input__slot {
    margin-bottom: 0;
  }

  .list__ui {

    > li {
      @include rem(padding, 5px);

      &:first-child {
        flex: 0 1 100px;
        justify-content: flex-end;
      }

      &:nth-child(2) {
        flex: 0
      }
    }
  }
}
</style>
