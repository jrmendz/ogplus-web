<template>
  <div>
    <template v-if="isLobby">
      <v-slide-x-transition origin="center center">
        <div class="noc__modal avatar__modal elevation-12" v-if="$store.state.avatarModal" :style="{ top: this.$store.state.drawerWidth  + 120 + 'px' }">
          <div class="modal__title --is-center">{{ tt('Avatar') }}</div>
          <div class="modal__body">
            <v-text-field
              :rules="[(v) => v.length <= 10 || 'Max 10 characters']"
              :counter="10"
              maxlength="10"
              v-model="nickname"
              :value="nickname"
              v-bind:label="tt('Nickname')"
              minlength="1"
              color="white"
              v-on:click="clickEff"
            ></v-text-field>
            <ul class="avatar__list">
              <li v-for="(list, index) in 11" :key="list">
                <label :for="'radio-' + (index + 1)" class="checkbox__ui">
                  <input v-if='isActiveAvatar(index + 1)' checked type="radio" :id="'radio-' + (index + 1)" name="avatar" :value="(index + 1)" @click="updateAvatar">
                  <input v-else type="radio" :id="'radio-' + (index + 1)" name="avatar" :value="(index + 1)" @click="updateAvatar">
                  <span class="checkmark"></span>
                  <v-img :src="'http://static.oriental-game.com/avatars/desktop/avatar' + (index + 1) + 'a.png?lazy'" aspect-ratio="1" contain>
                    <v-layout
                      slot="placeholder"
                      fill-height
                      align-center
                      justify-center
                      ma-0
                    >
                      <v-progress-circular indeterminate color="accent__color"></v-progress-circular>
                    </v-layout>
                  </v-img>
                </label>
              </li>
            </ul>
          </div>
          <div class="modal__footer  --is-center">
            <!-- <v-btn color="success" @click="saveChanges">{{ tt('Save') }}</v-btn> // removing save button -->
          </div>
        </div>
      </v-slide-x-transition>
    </template>
    <template v-else>
      <v-slide-x-reverse-transition origin="center center">
        <div class="noc__modal ingame__avatar avatar__modal elevation-12" v-if="$store.state.avatarModal">
          <div class="modal__title --is-center">{{ tt('Avatar') }}</div>
          <div class="modal__body">
            <v-text-field
              :rules="[(v) => v.length <= 10 || 'Max 10 characters']"
              :counter="10"
              maxlength="10"
              v-model="nickname"
              :value="nickname"
              v-bind:label="tt('Nickname')"
              minlength="1"
              color="white"
              v-on:click="clickEff"
            ></v-text-field>
            <ul class="avatar__list">
              <li v-for="(list, index) in 19" :key="list">
                <label :for="'radio-' + (index + 1)" class="checkbox__ui">
                  <input v-if='isActiveAvatar(index + 1)' checked type="radio" :id="'radio-' + (index + 1)" name="avatar" :value="(index + 1)" @click="updateAvatar">
                  <input v-else type="radio" :id="'radio-' + (index + 1)" name="avatar" :value="(index + 1)" @click="updateAvatar">
                  <span class="checkmark"></span>
                  <v-img :src="'http://static.oriental-game.com/avatars/desktop/avatar' + (index + 1) + 'a.png?lazy'" aspect-ratio="1" contain>
                    <v-layout
                      slot="placeholder"
                      fill-height
                      align-center
                      justify-center
                      ma-0
                    >
                      <v-progress-circular indeterminate color="accent__color"></v-progress-circular>
                    </v-layout>
                  </v-img>
                </label>
              </li>
            </ul>
          </div>
          <div class="modal__footer  --is-center">
            <!-- <v-btn color="success" @click="saveChanges">{{ tt('Save') }}</v-btn> // removing save button -->
          </div>
        </div>
      </v-slide-x-reverse-transition>
    </template>
    <v-fade-transition>
      <div class="overlay__bg" v-if="$store.state.avatarModal" @click="saveChanges"></div>
    </v-fade-transition>
  </div>
</template>

<script>
import ModalMixins from '@/library/Modals.js'
export default {
  mixins: [ ModalMixins ],
  data () {
    return {
      avatarModal: false,
      modified: false
    }
  },
  methods: {
    toggleModal: function () {
      let _s = this
      _s.$store.state.avatarModal = !_s.$store.state.avatarModal
      _s.$store.state.goodTipsModal = false
    }
  },
  computed: {
    isLobby: {
      get () {
        return this.$store.state.isLobby
      },
      set (value) {
        this.$store.state.isLobby = value
      }
    }
  }
}
</script>

<style lang="scss">
.avatar__modal.ingame__avatar {
  top: 0 !important;
  left: auto;
  @include rem((
    right: 245px,
    margin-top: 16px
  ));

  + .overlay__bg {
    width: 100vw;
    left: inherit;
    @include rem((
      padding-right: 230px
    ));
    transform: translateX(-230px);
  }
}

.avatar__modal {
  @include position(absolute, rem(16px), 80px, $index: 999);
  @include rem((
    width: 360px,
    margin-top: 16px,
    margin-left: 16px,
    border-radius: 7px,
  ));
  will-change: transform, opacity;
  
  .v-image {
    filter: drop-shadow(0 5px 4px rgba($base-color,.35))
  }

  .avatar__list {
    margin: 0;
    @include rem((
      margin-top: 16px,
      margin-right: -5px
    ));
    @extend %clearfix;

    li {
      position: relative;
      display: inline-flex;
      justify-content: center;
      @include box(calc(100% / 4 - 5px), rem(75px));
      color: $base-color;
      @include rem((
        padding: 5px,
        margin-right: 5px,
        margin-bottom: 10px
      ));

      img {
        display: block;
        margin: 0 auto;
        max-width: 100%;
      }

      .checkbox__ui {
        @include position(absolute,0,0,0,0);
        height: inherit;
        @include rem(padding, 5px);
      }
    }
  }

  + .overlay__bg {
    width: 100vw;
    left: inherit;
  }
}
</style>
