<template>
  <div class="form__wrapper">
    <NotificationModalComponent />
    <v-form>
      <!-- <img :src="nocGirls" > -->
      <img class="logo" src="https://static.oriental-game.com/image/logo.png" ondragstart="return false" >
      <LanguageComponent />
      <div class="form__border">
        <div class="form__body">
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            :label="tt('Username')"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="passwordInput ? 'visibility_off' : 'visibility'"
            @click:append="() => (passwordInput = !passwordInput)"
            :type="passwordInput ? 'password' : 'text'"
            :rules="passwordRules"
            :label="tt('Password')"
            required
            @keyup.enter="login"
          ></v-text-field>
          <!-- {{user}} -->
          <span class="errorlogin">{{isLogin}}</span>
          <div class="btn__group">
            <v-btn color="success"
            @click="login"
            :rules="passwordRules">{{ tt('Login') }}</v-btn>
            <!-- <v-btn color="error" type="reset">Reset</v-btn> -->
          </div>
        </div>
      </div>
    </v-form>
    
    <CopyRightsComponent />
  </div>
</template>
<script>
import LoginMixin from './mixins/Login.mixin'
import NotificationModalComponent from '@/components/modal/NotificationModalComponent'
import LanguageComponent from '@/components/translation/LanguageComponent'
import CopyRightsComponent from '@/components/lobby/CopyRightsComponent.vue'


export default {
  mixins: [LoginMixin],
  components: {
    NotificationModalComponent,
    LanguageComponent,
    CopyRightsComponent
  },
  data () {
    return {
      nocGirls: 'static/login_girls.png',
      nocLogo: 'https://static.oriental-game.com/image/logo.png',
      passwordInput: true,
      ProgScreenComponent: 0
    }
  },
  mounted () {

  }
}
</script>
<style lang="scss">
.form__wrapper {
  @include position(absolute, 0);
  @include box(100vw, 100vh);
  display: flex;
  align-items: center;

  form {
    margin: 0 auto;
    @include rem(max-width, 400px);
    text-align: center;

    .language__list {
      display: flex;
      @extend %clearfix;
      @include position(relative, rem(-90px), $index: 2);
      @include rem(width, 400px);
      margin: 0 auto;

      .--is-login {
        float: left;
        @include rem(width, 80px);
      }

      .--flex-wrap {
        // @include flex-wrap(wrap);
        flex-wrap: wrap;
      }

      li,
      .list {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        flex: 1 0 auto;
        @include box(rem(15px), rem(10px));
        @include rem(margin, 10px);

        img {
          width: auto;
        }
      }
    }

    > img {
      @include rem(max-width, 360px);
      @include rem((
        margin: 0 auto 120px
      ));
    }

    .form__border {
      @include rem(margin-top, -120px);

      &:before,
      &:after {
        content: "";
        display: block;
        @include position(relative, $left: 0);
        @include box(100%, 100px);
        @include cover-image(100%, url('/static/form_bg_top.png'));
        background-position: bottom;
      }

      &:after {
        margin-top: 0;
        @include cover-image(100%, url('/static/form_bg_bottom.png'));
        background-position: top;
      }
    }

    .form__body {
      background-color: rgba($base-color, .80);
      @include rem(padding, 20px);

      .btn__group {
        display: flex;

        .btn {
          margin-left: 0;
          margin-right: 0;
          width: 50%;

          &:first-child {
            @include rem(margin-right, 5px);
          }

          &:last-child {
            @include rem(margin-left, 5px);
          }
        }
      }
    }
  }
}

.errorlogin {
  font-family: Georgia,"Times New Roman",Times,serif;
  color: #ff5252;
}
</style>
