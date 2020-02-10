<template>
  <div>
    <!-- <div class="language__list --is-login" v-if="isLogin">
      <div class="list">
        {{ tt('Language') }}
      </div>
    </div> -->
    <ul class="language__list --flex-wrap">
      <li class="list" v-for="(flag, index) in flags" :key="index" @click="toggleTranslation(flag.code)" :class="!flag.is_selected ? '' : '--is-selected'" v-cloak>
        <!-- <img v-if="flag.is_selected"  :src="flag.url_selected" alt=""> -->
        <img :src="flag.url" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
import LanguagesNTranslations from '@/library/LanguagesNTranslations.js'

export default {
  props: {
    isLogin: false
  },
  mixins: [LanguagesNTranslations]
}
</script>
