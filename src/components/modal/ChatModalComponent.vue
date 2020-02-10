<template>
  <v-slide-x-transition>
    <div class="noc__modal chat__modal" v-if="!isChatModalOpen" >
      <ul class="list__ui">
        <li>
          <div class="dealer__img" :style="[tableInfo.dealer ? {'background-image': 'url(' + tableInfo.dealer.imagePrestige + ')'} : {'background-image': 'url(' + $store.state.noImg + ')'}]"></div>
        </li>
        <li>
          <!-- <h3>{{ tt(capitalizeName(_tables.dealer.name)) }}</h3> -->
          <h3>{{ (tableInfo.dealer.name|| 'No Dealer') | capitalize }}</h3>
          <div class="dealer__btn">
            <div class="follow__btn cursor" :class="[dealerInfo.isFollowed ? '--is-following' : '']" @click="toggleFollowDealer()" >
              <v-icon>{{ !_.isEmpty(dealerInfo) ? 'favorite' : 'lock'}}</v-icon>
              <span>
                {{ !_.isEmpty(dealerInfo) ? tt(dealerInfo.isFollowed ? 'Unfollow': 'Follow') : 'Locked' }}
              </span>
            </div>
            <div class="counter">
              {{ dealerInfo.followers || 0 }}
            </div>
          </div>
        </li>
      </ul>
      <div class="modal__body">
        <ChatComponent />
      </div>
    </div>
  </v-slide-x-transition>
</template>

<script>
import ChatComponent from '@/components/video/ChatComponent'
import Chat from '@/library/Chat'
export default {
  components: {
    ChatComponent
  },
  mixins: [ Chat ],
  mounted () {
    this.getDealerOtherInfo()
  }
}
</script>

<style lang="scss">
.chat__modal {
  @include position(absolute, auto);
  @include rem((
    bottom: 260px
  ));
  width: 403px;
  z-index: 1;
  margin-left: 0;
  background-color: transparent !important;
  background-image: linear-gradient(to right, rgba($base-color,0.75) 0%,rgba($base-color,0) 75%,rgba($base-color,0) 100%) !important;
  border-radius: 0;

  > .list__ui {
    border-bottom: 0;

    > li {
      padding: 5px 10px;
      color: $base-color-inverted;

      &:first-child {
        flex: 0;

        .dealer__img {
          @include box(40px);
          background-size: cover;
          @include rem(border-radius, 40px);
        }
      }

      &:last-child {
        flex-flow: column;
        align-items: flex-start;
        justify-content: center;
        padding-left: 0;

        .dealer__btn {
          display: flex;
          align-items: center;
          @include rem(margin-top, 5px);

          .follow__btn {
            position: relative;
            display: flex;
            @include rem((
              padding: 1px 10px,
              border: 1px solid #F808EB,
              border-radius: 20px
            ));
            background-color: $base-color-inverted;
            text-transform: uppercase;

            &.--is-following {
              background-color: #F808EB;

              i, span {
                color: $base-color-inverted;
              }
            }

            i, span {
              @include rem(font-size, 10px);
              color: #F808EB;
            }

            span {
              @include rem((
                margin-left: 5px
              ))
            }
          }

          .counter {
            @include rem((
              padding: 1px 5px,
              margin-left: 5px
            ));
          }
        }
      }
    }
  }

  > .modal__body {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}
</style>
