// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import vuetify from './plugins/vuetify'
import '@/assets/fonts/material-icons.css'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import VueTranslate from 'vue-translate-plugin'
import VueSVGIcon from 'vue-svgicon'
import vueHeadful from 'vue-headful'
import Carousel3d from 'vue-carousel-3d'

import App from './App'
import router from '@/router'
import store from '@/store/index'
import icons from '@/icons'

// Plugins
import ioPlugin from '@/plugins/io.js'
import lodashPlugin from '@/plugins/lodash.js'
import AnimatedNumber from 'animated-number-vue'
import jQuery from 'jquery'
import Snotify, { SnotifyPosition } from 'vue-snotify'
import browserDetect from "vue-browser-detect-plugin"

Vue.use(browserDetect)
window.jQuery = jQuery
window.$ = jQuery
window._ = require('lodash')

const defLang = localStorage.getItem('_locale')
const LocaleMixin = {
  created: function () {
    this.$translate.setLocales({ en: {} })
    this.$translate.setLocales({ cn: this.lng('cn') })
    this.$translate.setLocales({ jp: this.lng('jp') })
    this.$translate.setLocales({ ko: this.lng('ko') })
    this.$translate.setLocales({ vn: this.lng('vn') })
    this.$translate.setLocales({ th: this.lng('th') })
    this.$translate.setLocales({ id: this.lng('id') })
  },
  mounted () {
    let _s = this
    _s.$translate.setLang(_s.locale || 'en')
    // Pre-load tables connection
  },
  computed: {
    locale: {
      get () { return this.$store.state.locale },
      set (locale) { this.$store.commit('SET_LOCALE', locale) }
    }
  },
  watch: {
    locale () {
      this.$translate.setLang(this.locale)
    }
  }
}

/*
  __________                  __           __
  \______   \_______   ____ _/  |_  ____ _/  |_  ___.__.______    ____
   |     ___/\_  __ \ /  _ \\   __\/  _ \\   __\<   |  |\____ \ _/ __ \
   |    |     |  | \/(  <_> )|  | (  <_> )|  |   \___  ||  |_> >\  ___/
   |____|     |__|    \____/ |__|  \____/ |__|   / ____||   __/  \___  >
                                                 \/     |__|         \/
 */
Vue.prototype.$env = process.env.NODE_ENV
Vue.prototype.$version = process.env.VUE_APP_VERSION

/*
   ____ ___
  |    |   \ ______  ____
  |    |   //  ___/_/ __ \
  |    |  / \___ \ \  ___/
  |______/ /____  > \___  >
                \/      \/
*/
Vue.use(require('vue-shortkey'), { prevent: ['input', 'textarea'] })
Vue.use(VueTranslate)
Vue.use(Carousel3d)
Vue.use(VueResource)
Vue.use(VueTranslate)
Vue.use(ioPlugin)
Vue.use(lodashPlugin)
Vue.use(VueSVGIcon)
Vue.use(Snotify, {
  toast: {
    position: SnotifyPosition.rightBottom,
    timeout: 3000,
    showProgressBar: false,
    closeOnClick: true
  },
  global: {
    maxOnScreen: 5,
    maxAtPosition: 5,
    // oneAtTime: true
  }
})
Vue.use(Vuetify, {
  options: {
    minifyTheme: function (css) {
      return process.env.NODE_ENV === 'production'
        ? css.replace(/[\s|\r\n|\r|\n]/g, '')
        : css
    }
  }
})

/*
  _________                                                            __
  \_   ___ \   ____    _____  ______    ____    ____    ____    ____ _/  |_
  /    \  \/  /  _ \  /     \ \____ \  /  _ \  /    \ _/ __ \  /    \\   __\
  \     \____(  <_> )|  Y Y  \|  |_> >(  <_> )|   |  \\  ___/ |   |  \|  |
   \______  / \____/ |__|_|  /|   __/  \____/ |___|  / \___  >|___|  /|__|
          \/               \/ |__|                 \/      \/      \/
 */
Vue.component('vue-headful', vueHeadful)
Vue.component('animated-number', AnimatedNumber)
Vue.component('helper', {
  render () {
    return this.$scopedSlots.default(this.$attrs)
  }
})

/*
     _____   .__         .__
    /     \  |__|___  ___|__|  ____    ______
   /  \ /  \ |  |\  \/  /|  | /    \  /  ___/
  /    Y    \|  | >    < |  ||   |  \ \___ \
  \____|__  /|__|/__/\_ \|__||___|  //____  >
          \/           \/         \/      \/
 */
Vue.mixin({
  data: function () {
    return {
      lng: function (code) {
        return require('@/assets/lng/' + code + '.json')
      },
      tt: function (t = '') {
        let origT = t
        let translate

        // Validators
        if (!t) return t

        translate = this.$translate.text(t.toString().toLowerCase())
        // return (translate === t.toLowerCase()) ? origT : translate
        return translate === t.toString().toLowerCase() ? origT : translate
      }
    }
  },
  methods: {
    // RoadMap Parser
    _gbl_roadParser: function (data = {}) {
      let tempArray = [];
      let matrix = [];
      let maxColumn = 0;
      // Validator
      if (_.isUndefined(data.type)) {
        console.error('Invalid [type]');
        return [];
      }
      if (_.isUndefined(data.rows)) {
        console.error('Invalid [rows]');
        return [];
      }
      if (_.isUndefined(data.columns)) {
        console.error('Invalid [columns]');
        return [];
      }

      console.log('Isa-isa', data.type);

      let roadData = _.get(data, 'data', [])
      switch (_.toUpper(data.type)) {
        case 'BEADROAD':
          // Create a matrix based on maximum column
          matrix = Array.from({length: data.columns}, e => Array(data.rows).fill({}));
          // Chunk array of road maps based on rows requirements and scroll if needed
          tempArray = _.takeRight(_.chunk(roadData, data.rows), data.columns);
          // Merge the main array to temporary array
          _.map(tempArray,(o, i) => _.map(o, (_o, _i) => _.set(matrix[i], _i, _o)));
          // Flatten array
          matrix = _.flatten(matrix);
          break;
        case 'BIGROAD':
          // Get the maximum column
          maxColumn = _.max(_.map(roadData, o => _.get(o, 'place[0]', 0))) || 0;
          // Create a matrix based on maximum column
          matrix = Array.from({length: (data.columns > maxColumn ? data.columns : (maxColumn + 1))}, e => Array(data.rows).fill({}));
          // Plot the beads
          _.map(_.get(data, 'data', []), (o) => {
            _.set(matrix, "[" + (o.place[0]) + "]" + "[" + (o.place[1]) + "]", _.pick(o, ["result", "tie", "pair"]));
          });
          // Flatten array and scroll if needed
          matrix = _.flatten(_.takeRight(matrix, data.columns));
          break;
        case 'BIGEYE':
        case 'SMALLROAD':
        case 'ROACHROAD':
          // Get the maximum column
          maxColumn = _.max(_.map(roadData, o => _.get(o, 'place[0]', 0))) || 0;
          // Create a matrix based on maximum column
          matrix = Array.from({length: (data.columns > maxColumn ? data.columns: (maxColumn + 1)) * 2}, e => Array(data.rows * 2).fill(null));
          // Plot the beads
          _.map(roadData, (o) => {
            _.set(matrix, "[" + (o.place[0]) + "]" + "[" + (o.place[1]) + "]", _.get(o, 'result', null));
          });
          // Scroll if needed
          matrix = _.takeRight(matrix, data.columns * 2);
          for (let i = 0; i < matrix.length; i++) {
            if (i % 2 === 0) {
              for (let ii = 0; ii < matrix[i].length; ii++) {
                if (ii % 2 === 0) {
                  tempArray.push([
                    _.get(matrix,`[${i}][${ii}]`, null),
                    _.get(matrix,`[${i}][${ii+1}]`, null),
                    _.get(matrix,`[${i+1}][${ii}]`, null),
                    _.get(matrix,`[${i+1}][${ii+1}]`, null)
                  ])
                }
              }
            }
          }
          matrix = tempArray;
          break;
        default:
          console.warn('Road type unknown.');
          break;
      }
      // Return processed data
      return matrix;
    },
  }
})

/*
  ___________.__ .__    __
  \_   _____/|__||  | _/  |_   ____ _______  ______
   |    __)  |  ||  | \   __\_/ __ \\_  __ \/  ___/
   |     \   |  ||  |__|  |  \  ___/ |  | \/\___ \
   \___  /   |__||____/|__|   \___  >|__|  /____  >
       \/                         \/            \/
*/
Vue.filter('toMoney', (value, currency) => {
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD'
  })
  if (typeof value === 'undefined' || value === null || isNaN(value)) {
    value = 0
  }
  value = value.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
  return currency ? formatter.format(value) : formatter.format(value).substring(1).replace(/\$/g, '-')
})
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
Vue.filter('formatTblName', (str) => {
  // return str.replace(/bidding|normal/gi, '').trim()
  return str.replace(/normal/gi, '').trim()
})
Vue.filter('uniqOnly', function (array, key) {
  try {
    return array.filter((item, pos, arr) => {
      return typeof key === 'undefined' ? array.indexOf(item) === pos : arr.map(mapObj => mapObj[key]).indexOf(item[key]) === pos
    })
  } catch (err) {
    return []
  }
})
Vue.filter('ceil', function (number = 0) {
  return Math.ceil(number)
})


// Filter EN
Vue.filter('minimizeNumber', num => {
  let si = [
    { value: 1, symbol: '' },
    { value: 1E3, symbol: 'K' },
    { value: 1E6, symbol: 'M' },
    { value: 1E9, symbol: 'B' },
    { value: 1E12, symbol: 'T' },
    { value: 1E15, symbol: 'Qd' }
  ]
  let i, a
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break
    }
  }
  a = (num / si[i].value).toFixed(10).split('.')
  return a[0] + (a[1] > 1 ? '.' + (a[1]).toString()[0] : '') + si[i].symbol
})

// Filter JP
Vue.filter('minimizeNumberJP', num => {
  let si = [
    { value: 1, symbol: '' },
    { value: 1E3, symbol: '千' },
    { value: 1E6, symbol: 'M' },
    { value: 1E9, symbol: 'B' },
    { value: 1E12, symbol: 'T' },
    { value: 1E15, symbol: 'Qd' }
  ]
  let i, a
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break
    }
  }
  a = (num / si[i].value).toFixed(10).split('.')
  return a[0] + (a[1] > 1 ? '.' + (a[1]).toString()[0] : '') + si[i].symbol
})

// Filter KO
Vue.filter('minimizeNumberKO', num => {
  let si = [
    { value: 1, symbol: '' },
    { value: 1E3, symbol: '천' },
    { value: 1E6, symbol: 'M' },
    { value: 1E9, symbol: 'B' },
    { value: 1E12, symbol: 'T' },
    { value: 1E15, symbol: 'Qd' }
  ]
  let i, a
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break
    }
  }
  a = (num / si[i].value).toFixed(10).split('.')
  return a[0] + (a[1] > 1 ? '.' + (a[1]).toString()[0] : '') + si[i].symbol
})

// Filter TH
Vue.filter('minimizeNumberTH', num => {
  let si = [
    { value: 1, symbol: '' },
    { value: 1E3, symbol: 'พัน' },
    { value: 1E6, symbol: 'M' },
    { value: 1E9, symbol: 'B' },
    { value: 1E12, symbol: 'T' },
    { value: 1E15, symbol: 'Qd' }
  ]
  let i, a
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break
    }
  }
  a = (num / si[i].value).toFixed(10).split('.')
  return a[0] + (a[1] > 1 ? '.' + (a[1]).toString()[0] : '') + si[i].symbol
})


Vue.filter('limitTo', function (value, amount) {
  return value.filter(function(val, index, arr) {
    return index < 8
  })
})

Vue.filter('mwMultiplier', function (value = {}) {
  let multi
  // Validators
  if (!value) return ''

  multi = Math.pow(3, _.split(value.values, ',').length - 1)
  // Return processed value
  return multi > 1 ? '(' + multi + 'x)' : ''
})

Vue.filter('resultAlias', function (result) {
  let alias

  if (_.startsWith(result, 's') && result.length <= 3) {
    alias = 'single'
  } else if (_.startsWith(result, 'split') || _.startsWith(result, 'near') || _.startsWith(result, 'zero')) {
    alias = 'split'
  } else if (_.startsWith(result, 'square')) {
    alias = 'square'
  } else if (_.startsWith(result, 'tri')) {
    alias = 'three numbers'
  } else if (_.startsWith(result, 'street')) {
    alias = 'street'
  } else if (_.startsWith(result, 'line')) {
    alias = result === 'line0' ? 'four numbers' : 'line'
  } else if (_.startsWith(result, 'row')) {
    alias = 'row'
  } else if (_.startsWith(result, 'dozen')) {
    alias = 'dozen'
  } else if (_.startsWith(result, 'og')) {
    alias = '财'
  } else {
    alias = _.upperCase(result)
  }

  return _.toUpper(alias)
})

/* eslint-disable no-new */
new Vue({
  vuetify,
  el: '#app',
  store,
  router,
  icons,
  components: { App },
  mixins: [LocaleMixin],
  template: '<App/>'
})
