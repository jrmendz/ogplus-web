<template>
  <div class="chat__box">
    <div class="chat" id="chat" :class="tableInfo.code === 'moneywheel' ? '--is-mw-chat' : ''" @click="showEmoji = false">
      <small v-if="typing" class="text-white">user is typing...</small>
      <!--<div v-if="$store.state.withchat">-->
        <div v-for="(message, key) in messages" :key="key" class="list">
          <div class="cursor" @click="toggleFollowUser(message.user_id)">{{ message.nickname }}:</div>
          <div :class="{'float-left':message.type === 1}">{{ message.message }}</div>
        </div>
      <!--</div>-->
      <!--<div v-else style="text-align: center">-->
        <!--Place your bet before using chat-->
      <!--</div>-->
    </div>
    <v-slide-y-reverse-transition>
      <div class="emoji__box" v-if="showEmoji">
        <ul>
          <li v-for="(emoji, index) in chatEmoji" :key="index" @click="addEmoji(emoji)">
            {{emoji}}
          </li>
        </ul>
      </div>
    </v-slide-y-reverse-transition>
    <ul class="list__ui">
      <li @click="showEmoji = false">
        <div class="chat__input">
          <form @submit.prevent="send">
            <!-- :disabled="!$store.state.withchat" -->
            <input type="text" :maxlength="maxChatLength" class="cursor" v-bind:placeholder="tt('Type here')" v-model="newmessage" id="chatTextArea" autocomplete="off" v-on:click="clickEff()">
          </form>
        </div>
      </li>
      <li class="--has-border-right pa-2 cursor" @click="toggleEmoticons()">
        <img src="static/icon/emo1.png" class="cursor" width="10px">
      </li>
      <li @click="showEmoji = false">
        <!--:disabled="!$store.state.withchat"-->
        <v-btn small flat outline @click="send" :disabled="isBusy">
          {{ tt('SEND') }}
        </v-btn>
      </li>
    </ul>
  </div>
</template>

<script>
import Chat from '@/library/Chat'
export default {
  mixins: [ Chat ],
  mounted () {
    this.scrollToTop()
  },
}
</script>

<style lang="scss">
.chat__box {
  position: relative;

  .vb {
    @include position(absolute !important, $bottom: 45px !important);
    width: 100% !important;
    @include rem(height, 220px !important);

    .chat {
      bottom: 0;
    }

    &:hover {

      .vb-dragger {
        opacity: 1;
      }
    }

    .vb-dragger {
      opacity: 0;
    }
  }

  .chat {
    position: relative;
    @include rem((
      height: 121px,
      padding-top: 10px,
      padding-left: 10px,
      padding-right: 10px,
      border-top: 1px solid
    ));
    border-top-color: rgba($base-color-inverted, .15) !important;
    overflow: hidden;
    overflow-y: auto;
    @extend %placeholder;

    .list {
      @include rem(margin-bottom, 5px);
      @extend %clearfix;

      div {
        @include rem((
          font-size: 16px
        ));

        &:first-child {
          float: left;
          color: $gold-text;
        }

        &:last-child {
          @include rem(padding, 0 5px);
          overflow: hidden;
          word-break: break-all;
          color: $base-color-inverted;
        }
      }
    }
  }

  .list__ui {
    @include rem((
      padding: 10px 10px,
      border-top: 1px solid transparent
    ));
    border-top-color: rgba($base-color-inverted, .15) !important;
    border-bottom: 0;

    > li {
      padding: 0;
      @include rem(border, 1px solid rgba($base-color-inverted, .15));

      .chat__input {
        display: flex;
        flex: 1 0 auto;

        form {
          width: 100%;
        }

        input {
          @include box(100%, rem(30px));
          @include rem(padding, 5px 7px);
          color: $base-color-inverted;

          &:focus {
            outline: 0;
          }
        }
      }

      .v-btn {
        margin: 0;
        @include rem(min-width, 60px);
        border: 0;

        .v-btn__content {
          color: $base-color-inverted;
        }
      }

      &:nth-child(2) {
        color: $dark-red;
      }

      &:nth-child(2),
      &:nth-child(3),
      &:last-child {
        flex: 0 1 auto;
        border-left: 0;
      }

      &:last-child {
        border: 0;
      }
    }
  }
}

.emoji__box {
  @include position(absolute, $bottom: 53px);
  width: 100%;
  @include rem(padding, 5px);
  background-color: rgba($base-color, .5);

  ul {
    display: flex;
    flex-flow: wrap;
    align-items: center;
    text-align: center;

    li {
      flex: 1 0 0;
      @include rem((
        width: 30px,
        font-size: 17px
      ));
    }
  }
}
</style>
