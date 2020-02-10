// NOTES:
// Please only add betting commands that will only be used for betting
// VUE component using this
// src/components/BettingComponent.vue
// src/sidebar/games/CardGames.vue
import {Back, Expo, TweenLite, TweenMax, Power2, TimelineLite, TimelineMax} from 'gsap'
import '@/library/DrawSVGPlugin.js'
import Betting from '@/library/Betting.js'

export default {
  mixins: [ Betting ],
  component: {
    DrawSVGPlugin, Back, Expo, TweenLite, TweenMax, Power2, TimelineLite, TimelineMax
  },
  data () {
    return {
      content: [
        // Single - DONE
        {id: 's_0',    cLoc: {x: 1,      y: 8, xImg: 10, yImg: 60}, size: {width: 40.5, height: 121.5}, class:'st1', zindex:1},
        {id: 's_1',    cLoc: {x: 41,  y: 88.8, xImg: 42.8 +7, yImg: 88.8+10}, size: {width: 39, height: 40.5}, class:'st1', zindex:1},
        {id: 's_2',    cLoc: {x: 41,  y: 48.8, xImg: 42.8 +7, yImg: 48.8+10}, size: {width: 39, height: 40.5}, class:'st1', zindex:1},
        {id: 's_3',    cLoc: {x: 41,  y: 8.8 , xImg: 42.8 +7, yImg: 8.8 +10}, size: {width: 39, height: 40.5}, class:'st1', zindex:1},
        {id: 's_4',    cLoc: {x: 81.5,  y: 88.8, xImg: 82.8 +7, yImg: 88.8+10}, size: {width: 39, height: 40.5}, class:'st1', zindex:1},
        {id: 's_5',    cLoc: {x: 81.5,  y: 48.8, xImg: 82.8 +7, yImg: 48.8+10}, size: {width: 39, height: 40.5}, class:'st1', zindex:1},
        {id: 's_6',    cLoc: {x: 81.5,  y: 8.8 , xImg: 82.8 +7, yImg: 8.8 +10}, size: {width: 39, height: 40.5}, class:'st1', zindex:1},
        {id: 's_7',    cLoc: {x: 122,  y: 88.8, xImg: 123.8+7, yImg: 88.8+10}, size: {width: 39.3, height: 40.5}, class:'st1', zindex:1},
        {id: 's_8',    cLoc: {x: 122,  y: 48.8, xImg: 123.8+7, yImg: 48.8+10}, size: {width: 39.3, height: 40.5}, class:'st1', zindex:1},
        {id: 's_9',    cLoc: {x: 122,  y: 8.8 , xImg: 123.8+7, yImg: 8.8 +10}, size: {width: 39.3, height: 40.5}, class:'st1', zindex:1},
        {id: 's_10',   cLoc: {x: 162.5,  y: 88.8, xImg: 163.8+7, yImg: 88.8+10}, size: {width: 39.5, height: 40.5}, class:'st1', zindex:1},
        {id: 's_11',   cLoc: {x: 162.5,  y: 48.8, xImg: 163.8+7, yImg: 48.8+10}, size: {width: 39.5, height: 40.5}, class:'st1', zindex:1},
        {id: 's_12',   cLoc: {x: 162.5,  y: 8.8 , xImg: 163.8+7, yImg: 8.8 +10}, size: {width: 39.5, height: 40.5}, class:'st1', zindex:1},
        {id: 's_13',   cLoc: {x: 203.5,  y: 88.8, xImg: 204.8+7, yImg: 88.8+10}, size: {width: 39.5, height: 40.5}, class:'st1', zindex:1},
        {id: 's_14',   cLoc: {x: 203.5,  y: 48.8, xImg: 204.8+7, yImg: 48.8+10}, size: {width: 39.5, height: 40.5}, class:'st1', zindex:1},
        {id: 's_15',   cLoc: {x: 203.5,  y: 8.8 , xImg: 204.8+7, yImg: 8.8 +10}, size: {width: 39.5, height: 40.5}, class:'st1', zindex:1},
        {id: 's_16',   cLoc: {x: 244.3,  y: 88.8, xImg: 245.8+7, yImg: 88.8+10}, size: {width: 39.5, height: 40.5}, class:'st1', zindex:1},
        {id: 's_17',   cLoc: {x: 244.3,  y: 48.8, xImg: 245.8+7, yImg: 48.8+10}, size: {width: 39.5, height: 40.5}, class:'st1', zindex:1},
        {id: 's_18',   cLoc: {x: 244.3,  y: 8.8 , xImg: 245.8+7, yImg: 8.8 +10}, size: {width: 39.5, height: 40.5}, class:'st1', zindex:1},
        {id: 's_19',   cLoc: {x: 284.8,  y: 88.8, xImg: 285.8+7, yImg: 88.8+10}, size: {width: 39.5, height: 40.5}, class:'st1', zindex:1},
        {id: 's_20',   cLoc: {x: 284.8,  y: 48.8, xImg: 285.8+7, yImg: 48.8+10}, size: {width: 39.5, height: 40.5}, class:'st1', zindex:1},
        {id: 's_21',   cLoc: {x: 284.8,  y: 8.8 , xImg: 285.8+7, yImg: 8.8 +10}, size: {width: 39.5, height: 40.5}, class:'st1', zindex:1},
        {id: 's_22',   cLoc: {x: 325.6,  y: 88.8, xImg: 326.8+7, yImg: 88.8+10}, size: {width: 39.5, height: 40.5}, class:'st1', zindex:1},
        {id: 's_23',   cLoc: {x: 325.6,  y: 48.8, xImg: 326.8+7, yImg: 48.8+10}, size: {width: 39.5, height: 40.5}, class:'st1', zindex:1},
        {id: 's_24',   cLoc: {x: 325.6,  y: 8.8 , xImg: 326.8+7, yImg: 8.8 +10}, size: {width: 39.5, height: 40.5}, class:'st1', zindex:1},
        {id: 's_25',   cLoc: {x: 366.4,  y: 88.8, xImg: 366.8+7, yImg: 88.8+10}, size: {width: 39.5, height: 40.5}, class:'st1', zindex:1},
        {id: 's_26',   cLoc: {x: 366.4,  y: 48.8, xImg: 366.8+7, yImg: 48.8+10}, size: {width: 39.5, height: 40.5}, class:'st1', zindex:1},
        {id: 's_27',   cLoc: {x: 366.4,  y: 8.8 , xImg: 366.8+7, yImg: 8.8 +10}, size: {width: 39.5, height: 40.5}, class:'st1', zindex:1},
        {id: 's_28',   cLoc: {x: 407.1,  y: 88.8, xImg: 407.8+7, yImg: 88.8+10}, size: {width: 39.5, height: 40.5}, class:'st1', zindex:1},
        {id: 's_29',   cLoc: {x: 407.1,  y: 48.8, xImg: 407.8+7, yImg: 48.8+10}, size: {width: 39.5, height: 40.5}, class:'st1', zindex:1},
        {id: 's_30',   cLoc: {x: 407.1,  y: 8.8 , xImg: 407.8+7, yImg: 8.8 +10}, size: {width: 39.5, height: 40.5}, class:'st1', zindex:1},
        {id: 's_31',   cLoc: {x: 447.9,  y: 88.8, xImg: 448.8+7, yImg: 88.8+10}, size: {width: 39,   height: 40.5}, class:'st1', zindex:1},
        {id: 's_32',   cLoc: {x: 447.9,  y: 48.8, xImg: 448.8+7, yImg: 48.8+10}, size: {width: 39,   height: 40.5}, class:'st1', zindex:1},
        {id: 's_33',   cLoc: {x: 447.9,  y: 8.8 , xImg: 448.8+7, yImg: 8.8 +10}, size: {width: 39,   height: 40.5}, class:'st1', zindex:1},
        {id: 's_34',   cLoc: {x: 488.5,  y: 88.8, xImg: 488.8+7, yImg: 88.8+10}, size: {width: 39.5, height: 40.5}, class:'st1', zindex:1},
        {id: 's_35',   cLoc: {x: 488.5,  y: 48.8, xImg: 488.8+7, yImg: 48.8+10}, size: {width: 39.5, height: 40.5}, class:'st1', zindex:1},
        {id: 's_36',   cLoc: {x: 488.5,  y: 8.8 , xImg: 488.8+7, yImg: 8.8 +10}, size: {width: 39.5, height: 40.5}, class:'st1', zindex:1},

        // Square - DONE
        {id: 'tr_2',   cLoc: {x: 75 , y: 42, xImg: 75  - 5, yImg: 42 - 2}, size: {width: 15, height: 15}, class:'st3', zindex:2},
        {id: 'tr_4',   cLoc: {x: 115, y: 42, xImg: 115 - 5, yImg: 42 - 2}, size: {width: 15, height: 15}, class:'st3', zindex:2},
        {id: 'tr_6',   cLoc: {x: 155, y: 42, xImg: 155 - 5, yImg: 42 - 2}, size: {width: 15, height: 15}, class:'st3', zindex:2},
        {id: 'tr_8',   cLoc: {x: 195, y: 42, xImg: 195 - 3, yImg: 42 - 2}, size: {width: 15, height: 15}, class:'st3', zindex:2},
        {id: 'tr_10',   cLoc: {x: 236, y: 42, xImg: 236 - 3, yImg: 42 - 2}, size: {width: 15, height: 15}, class:'st3', zindex:2},
        {id: 'tr_12',   cLoc: {x: 276, y: 42, xImg: 276 - 2, yImg: 42 - 2}, size: {width: 15, height: 15}, class:'st3', zindex:2},
        {id: 'tr_14',   cLoc: {x: 316, y: 42, xImg: 316 - 1, yImg: 42 - 2}, size: {width: 15, height: 15}, class:'st3', zindex:2},
        {id: 'tr_16',   cLoc: {x: 357, y: 42, xImg: 357 - 1, yImg: 42 - 2}, size: {width: 15, height: 15}, class:'st3', zindex:2},
        {id: 'tr_18',   cLoc: {x: 399, y: 42, xImg: 399 - 3, yImg: 42 - 2}, size: {width: 15, height: 15}, class:'st3', zindex:2},
        {id: 'tr_20',  cLoc: {x: 439, y: 42, xImg: 439 - 2, yImg: 42 - 2}, size: {width: 15, height: 15}, class:'st3', zindex:2},
        {id: 'tr_22',  cLoc: {x: 480, y: 42, xImg: 480 - 3, yImg: 42 - 2}, size: {width: 15, height: 15}, class:'st3', zindex:2},
        {id: 'tr_1',  cLoc: {x: 75 , y: 82, xImg: 75  - 5, yImg: 82 - 2}, size: {width: 15, height: 15}, class:'st3', zindex:2},
        {id: 'tr_3',  cLoc: {x: 115, y: 82, xImg: 115 - 5, yImg: 82 - 2}, size: {width: 15, height: 15}, class:'st3', zindex:2},
        {id: 'tr_5',  cLoc: {x: 155, y: 82, xImg: 155 - 5, yImg: 82 - 2}, size: {width: 15, height: 15}, class:'st3', zindex:2},
        {id: 'tr_7',  cLoc: {x: 195, y: 82, xImg: 195 - 3, yImg: 82 - 2}, size: {width: 15, height: 15}, class:'st3', zindex:2},
        {id: 'tr_9',  cLoc: {x: 236, y: 82, xImg: 236 - 3, yImg: 82 - 2}, size: {width: 15, height: 15}, class:'st3', zindex:2},
        {id: 'tr_11',  cLoc: {x: 276, y: 82, xImg: 276 - 2, yImg: 82 - 2}, size: {width: 15, height: 15}, class:'st3', zindex:2},
        {id: 'tr_13',  cLoc: {x: 316, y: 82, xImg: 316 - 1, yImg: 82 - 2}, size: {width: 15, height: 15}, class:'st3', zindex:2},
        {id: 'tr_15',  cLoc: {x: 357, y: 82, xImg: 357 - 1, yImg: 82 - 2}, size: {width: 15, height: 15}, class:'st3', zindex:2},
        {id: 'tr_17',  cLoc: {x: 399, y: 82, xImg: 399 - 3, yImg: 82 - 2}, size: {width: 15, height: 15}, class:'st3', zindex:2},
        {id: 'tr_19',  cLoc: {x: 439, y: 82, xImg: 439 - 2, yImg: 82 - 2}, size: {width: 15, height: 15}, class:'st3', zindex:2},
        {id: 'tr_21',  cLoc: {x: 480, y: 82, xImg: 480 - 3, yImg: 82 - 2}, size: {width: 15, height: 15}, class:'st3', zindex:2},

        // Near - DONE
        {id: 'split_C_2',  cLoc: {x: 55 ,  y: 42, xImg: 55  - 5,  yImg: 42 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_C_1',  cLoc: {x: 55 ,  y: 82, xImg: 55  - 5,  yImg: 82 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_C_4',  cLoc: {x: 95 ,  y: 42, xImg: 95  - 5,  yImg: 42 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_C_3',  cLoc: {x: 95 ,  y: 82, xImg: 95  - 5,  yImg: 82 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_C_6',  cLoc: {x: 135,  y: 42, xImg: 135 - 5,  yImg: 42 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_C_5',  cLoc: {x: 135,  y: 82, xImg: 135 - 5,  yImg: 82 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_C_8',  cLoc: {x: 175,  y: 42, xImg: 175 - 5,  yImg: 42 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_C_7',  cLoc: {x: 175,  y: 82, xImg: 175 - 5,  yImg: 82 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_C_10',  cLoc: {x: 216,  y: 42, xImg: 216 - 5,  yImg: 42 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_C_9', cLoc: {x: 216,  y: 82, xImg: 216 - 5,  yImg: 82 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_C_12', cLoc: {x: 256,  y: 42, xImg: 256 - 5,  yImg: 42 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_C_11', cLoc: {x: 256,  y: 82, xImg: 256 - 5,  yImg: 82 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_C_14', cLoc: {x: 296,  y: 42, xImg: 296 - 5,  yImg: 42 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_C_13', cLoc: {x: 296,  y: 82, xImg: 296 - 5,  yImg: 82 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_C_16', cLoc: {x: 337,  y: 42, xImg: 337 - 5,  yImg: 42 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_C_15', cLoc: {x: 337,  y: 82, xImg: 337 - 5,  yImg: 82 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_C_18', cLoc: {x: 379,  y: 42, xImg: 379 - 5,  yImg: 42 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_C_17', cLoc: {x: 379,  y: 82, xImg: 379 - 5,  yImg: 82 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_C_20', cLoc: {x: 419,  y: 42, xImg: 419 - 5,  yImg: 42 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_C_19', cLoc: {x: 419,  y: 82, xImg: 419 - 5,  yImg: 82 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_C_22', cLoc: {x: 459,  y: 42, xImg: 459 - 5,  yImg: 42 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_C_21', cLoc: {x: 459,  y: 82, xImg: 459 - 5,  yImg: 82 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_C_24', cLoc: {x: 500,  y: 42, xImg: 500 - 5,  yImg: 42 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_C_23', cLoc: {x: 500,  y: 82, xImg: 500 - 5,  yImg: 82 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},

        // Zero - DONE
        {id: 'split_R_03',  cLoc: {x: 35 , y: 22 , xImg: 35  - 5, yImg: 22  - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_02',  cLoc: {x: 35 , y: 62 , xImg: 35  - 5, yImg: 62 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_01',  cLoc: {x: 35 , y: 102 , xImg: 35  - 5, yImg: 102 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},

        // Split - DONE
        {id: 'split_R_3',  cLoc: {x: 75 , y: 22 , xImg: 75  - 5, yImg: 22  - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_6',  cLoc: {x: 115, y: 22 , xImg: 115 - 5, yImg: 22  - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_9',  cLoc: {x: 155, y: 22 , xImg: 155 - 5, yImg: 22  - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_12',  cLoc: {x: 195, y: 22 , xImg: 195 - 3, yImg: 22  - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_15',  cLoc: {x: 236, y: 22 , xImg: 236 - 3, yImg: 22  - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_18',  cLoc: {x: 276, y: 22 , xImg: 276 - 2, yImg: 22  - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_21',  cLoc: {x: 316, y: 22 , xImg: 316 - 1, yImg: 22  - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_24',  cLoc: {x: 357, y: 22 , xImg: 357 - 1, yImg: 22  - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_27',  cLoc: {x: 399, y: 22 , xImg: 399 - 3, yImg: 22  - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_30', cLoc: {x: 439, y: 22 , xImg: 439 - 2, yImg: 22  - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_33', cLoc: {x: 480, y: 22 , xImg: 480 - 3, yImg: 22  - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_2', cLoc: {x: 75 , y: 62 , xImg: 75  - 5, yImg: 62  - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_5', cLoc: {x: 115, y: 62 , xImg: 115 - 5, yImg: 62  - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_8', cLoc: {x: 155, y: 62 , xImg: 155 - 5, yImg: 62  - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_11', cLoc: {x: 195, y: 62 , xImg: 195 - 3, yImg: 62  - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_14', cLoc: {x: 236, y: 62 , xImg: 236 - 3, yImg: 62  - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_17', cLoc: {x: 276, y: 62 , xImg: 276 - 2, yImg: 62  - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_20', cLoc: {x: 316, y: 62 , xImg: 316 - 1, yImg: 62  - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_23', cLoc: {x: 357, y: 62 , xImg: 357 - 1, yImg: 62  - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_26', cLoc: {x: 399, y: 62 , xImg: 399 - 3, yImg: 62  - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_29', cLoc: {x: 439, y: 62 , xImg: 439 - 2, yImg: 62  - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_32', cLoc: {x: 480, y: 62 , xImg: 480 - 3, yImg: 62  - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_1', cLoc: {x: 75,  y: 102, xImg: 75 - 5,  yImg: 102 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_4', cLoc: {x: 115, y: 102, xImg: 115 - 5, yImg: 102 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_7', cLoc: {x: 155, y: 102, xImg: 155 - 5, yImg: 102 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_10', cLoc: {x: 195, y: 102, xImg: 195 - 3, yImg: 102 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_13', cLoc: {x: 236, y: 102, xImg: 236 - 3, yImg: 102 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_16', cLoc: {x: 276, y: 102, xImg: 276 - 2, yImg: 102 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_19', cLoc: {x: 316, y: 102, xImg: 316 - 1, yImg: 102 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_22', cLoc: {x: 357, y: 102, xImg: 357 - 1, yImg: 102 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_25', cLoc: {x: 399, y: 102, xImg: 399 - 3, yImg: 102 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_28', cLoc: {x: 439, y: 102, xImg: 439 - 2, yImg: 102 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},
        {id: 'split_R_31', cLoc: {x: 480, y: 102, xImg: 480 - 3, yImg: 102 - 2}, size: {width: 15, height: 15}, class:'st4', zindex:2},

        // Triangle - DONE
        {id: 'th_2', cLoc: {x: 35, y: 42, xImg: 35 - 2, yImg: 42 - 1}, size: {width: 15, height: 15}, class: 'st5', zindex: 2},
        {id: 'th_1', cLoc: {x: 35, y: 82, xImg: 35 - 2, yImg: 82 - 1}, size: {width: 15, height: 15}, class: 'st5', zindex: 2},

        // Street - DONE
        {id: 'st_1',       cLoc: {x: 55 ,  y: 2, xImg: 55  - 2,  yImg: 2 - 1}, size: {width: 15, height: 15}, class:'st6', zindex:2},
        {id: 'st_2',       cLoc: {x: 95 ,  y: 2, xImg: 95  - 2,  yImg: 2 - 1}, size: {width: 15, height: 15}, class:'st6', zindex:2},
        {id: 'st_3',       cLoc: {x: 135,  y: 2, xImg: 135 - 2,  yImg: 2 - 1}, size: {width: 15, height: 15}, class:'st6', zindex:2},
        {id: 'st_4',       cLoc: {x: 175,  y: 2, xImg: 175 - 2,  yImg: 2 - 1}, size: {width: 15, height: 15}, class:'st6', zindex:2},
        {id: 'st_5',       cLoc: {x: 216,  y: 2, xImg: 216 - 2,  yImg: 2 - 1}, size: {width: 15, height: 15}, class:'st6', zindex:2},
        {id: 'st_6',       cLoc: {x: 256,  y: 2, xImg: 256 - 2,  yImg: 2 - 1}, size: {width: 15, height: 15}, class:'st6', zindex:2},
        {id: 'st_7',       cLoc: {x: 296,  y: 2, xImg: 296 - 2,  yImg: 2 - 1}, size: {width: 15, height: 15}, class:'st6', zindex:2},
        {id: 'st_8',       cLoc: {x: 337,  y: 2, xImg: 337 - 2,  yImg: 2 - 1}, size: {width: 15, height: 15}, class:'st6', zindex:2},
        {id: 'st_9',       cLoc: {x: 379,  y: 2, xImg: 379 - 2,  yImg: 2 - 1}, size: {width: 15, height: 15}, class:'st6', zindex:2},
        {id: 'st_10',      cLoc: {x: 419,  y: 2, xImg: 419 - 2,  yImg: 2 - 1}, size: {width: 15, height: 15}, class:'st6', zindex:2},
        {id: 'st_11',      cLoc: {x: 459,  y: 2, xImg: 459 - 2,  yImg: 2 - 1}, size: {width: 15, height: 15}, class:'st6', zindex:2},
        {id: 'st_12',      cLoc: {x: 500,  y: 2, xImg: 500 - 2,  yImg: 2 - 1}, size: {width: 15, height: 15}, class:'st6', zindex:2},

        // Line - DONE
        {id: 'fn',       cLoc:  {x: 35,  y: 2, xImg: 35 - 2,  yImg: 2 - 1}, size: {width: 15, height: 15}, class:'st8', zindex:2},
        {id: 'ln_1',       cLoc: {x: 75 ,  y: 2, xImg: 75  - 2,  yImg: 2 - 1}, size: {width: 15, height: 15}, class:'st7', zindex:2},
        {id: 'ln_2',       cLoc: {x: 115,  y: 2, xImg: 115 - 2,  yImg: 2 - 1}, size: {width: 15, height: 15}, class:'st7', zindex:2},
        {id: 'ln_3',       cLoc: {x: 155,  y: 2, xImg: 155 - 2,  yImg: 2 - 1}, size: {width: 15, height: 15}, class:'st7', zindex:2},
        {id: 'ln_4',       cLoc: {x: 195,  y: 2, xImg: 195 - 2,  yImg: 2 - 1}, size: {width: 15, height: 15}, class:'st7', zindex:2},
        {id: 'ln_5',       cLoc: {x: 236,  y: 2, xImg: 236 - 2,  yImg: 2 - 1}, size: {width: 15, height: 15}, class:'st7', zindex:2},
        {id: 'ln_6',       cLoc: {x: 276,  y: 2, xImg: 276 - 2,  yImg: 2 - 1}, size: {width: 15, height: 15}, class:'st7', zindex:2},
        {id: 'ln_7',       cLoc: {x: 316,  y: 2, xImg: 316 - 2,  yImg: 2 - 1}, size: {width: 15, height: 15}, class:'st7', zindex:2},
        {id: 'ln_8',       cLoc: {x: 356,  y: 2, xImg: 356 - 2,  yImg: 2 - 1}, size: {width: 15, height: 15}, class:'st7', zindex:2},
        {id: 'ln_9',       cLoc: {x: 399,  y: 2, xImg: 399 - 2,  yImg: 2 - 1}, size: {width: 15, height: 15}, class:'st7', zindex:2},
        {id: 'ln_10',      cLoc: {x: 439,  y: 2, xImg: 439 - 2,  yImg: 2 - 1}, size: {width: 15, height: 15}, class:'st7', zindex:2},
        {id: 'ln_11',      cLoc: {x: 480,  y: 2, xImg: 480 - 2,  yImg: 2 - 1}, size: {width: 15, height: 15}, class:'st7', zindex:2},

        // Color - DONE
        {id: 'black',    cLoc:  {x: 285,  y: 155, xImg: 285 + 29,  yImg: 155 + 2}, size: {width: 80, height: 24.5}, class:'st2', zindex:2},
        {id: 'red',      cLoc:  {x: 203.4,  y: 155, xImg: 204 + 29,  yImg: 155 + 2}, size: {width: 80, height: 24.5}, class:'st2', zindex:2},

        // Odd/Even - DONE
        {id: 'odd',      cLoc:  {x: 366.4,  y: 155, xImg: 367 + 29,  yImg: 155 + 2}, size: {width: 80, height: 24.5}, class:'st2', zindex:2},
        {id: 'even',     cLoc:  {x: 122.9,  y: 155, xImg: 123 + 29,  yImg: 155 + 2}, size: {width: 80, height: 24.5}, class:'st2', zindex:2},

        // Small/Big - DONE
        {id: 'bs_2',     cLoc:  {x: 447.8,  y: 155, xImg: 448 + 29,  yImg: 155 + 2}, size: {width: 80, height: 24.5}, class:'st2', zindex:2},
        {id: 'bs_1',     cLoc:  {x: 42,   y: 155.5, xImg: 42  + 29,  yImg: 155 + 2}, size: {width: 80, height: 24}, class:'st2', zindex:2},

        // Dozen - DONE
        {id: 'doz_3',    cLoc:  {x: 366.5,  y: 130.2, xImg: 366.8 + 68,  yImg: 130.8 - 1}, size: {width: 161.5, height: 24}, class:'st2', zindex:2},
        {id: 'doz_2',    cLoc:  {x: 203.6,  y: 130.2, xImg: 204.8 + 68,  yImg: 130.8 - 1}, size: {width: 161.5, height: 24}, class:'st2', zindex:2},
        {id: 'doz_1',    cLoc:  {x: 42 ,  y: 130.2, xImg: 42.8  + 68,  yImg: 130.8 - 1}, size: {width: 161.5, height: 24}, class:'st2', zindex:2},

        // Row - DONE
        {id: 'r_1',      cLoc:  {x: 529.2,  y: 88.8, xImg: 529.8+7,  yImg: 88.8+10 }, size: {width:  39.5, height: 40.5}, class:'st2', zindex:2},
        {id: 'r_2',      cLoc:  {x: 529.2,  y: 48.8, xImg: 529.8+7,  yImg: 48.8+10 }, size: {width:  39.5, height: 40.5}, class:'st2', zindex:2},
        {id: 'r_3',      cLoc:  {x: 529.2,  y: 8.8 , xImg: 529.8+7,  yImg: 8.8 +10 } , size: {width: 39.5, height: 40.5}, class:'st2', zindex:2}
      ],
      hitArea: this.$store.state.ROULETTE_AREA
    }
  },
  mounted () {
    this.ovalOut()
  },
  methods: {

    mouseM: function (val = '') {
      let _s = this
      let tl = new TimelineLite()
      tl.set('.--message-rectangle', {css:{x: val.offsetX - 100, y: val.offsetY - 50}})

      console.log(val);

      if (_s.chipLocale[val.target.id]) {
        _s.getRoulettebetinfo.ArBetting.area = _s.getRoulettebetinfo.section[_s.chipLocale[val.target.id]].area
        _s.getRoulettebetinfo.ArBetting.ratio = _s.getRoulettebetinfo.section[_s.chipLocale[val.target.id]].ratio
      }

    },
    chipHref: function (id) {
      let _s = this
      let lastChip = _s.betTable.section[_s.chipLocale[id]].bets[0]
      return _.isUndefined(lastChip) ? '' : 'static/chips/betting/' + lastChip.chipClass + '.png'
    },
    ovalOut: function () {
      var tl = new TimelineLite()
      for (let i = 0; i < 37; i++) {
        tl.set('._' + i, {opacity: 0})
      }

      tl.set('.--message-rectangle', {opacity: 0})
      tl.set('._series58', {opacity: 0})
      tl.set('._orphans', {opacity: 0})
      tl.set('._series023', {opacity: 0})
      tl.set('._zerospiel', {opacity: 0})
      tl.set('._zerospiel', {opacity: 0})
      tl.set('._zerospiel', {opacity: 0})
      tl.set('._zerospiel', {opacity: 0})
      tl.set('#doz_1', {opacity: 0})
      tl.set('#doz_2', {opacity: 0})
      tl.set('#doz_3', {opacity: 0})
      tl.set('#bs_1', {opacity: 0})
      tl.set('#bs_2', {opacity: 0})
      tl.set('#even', {opacity: 0})
      tl.set('#odd', {opacity: 0})
      tl.set('#red', {opacity: 0})
      tl.set('#black', {opacity: 0})
      tl.set('#r_1', {opacity: 0})
      tl.set('#r_2', {opacity: 0})
      tl.set('#r_3', {opacity: 0})
      this.betTable.ovalHover = ''
      this.betTable.ovalHoverNumbers = []
    },

    formatToPrice (value) {
      return this.$options.filters.toMoney(value)
    },
    ovalHoverNumbers: function (val = '') {
      let _s = this
      // Validator
      let tl = new TimelineLite();
      let items = ['doz_1', 'doz_2', 'doz_3', 'bs_1', 'bs_2', 'even', 'odd', 'red', 'black', 'r_1', 'r_2', 'r_3']
      tl.set('.--message-rectangle', {opacity: 1})
      if (_.includes(items, val.target.id)) {
        tl.set('#' + val.target.id, { opacity: 0.5 })
      }
      if (!val) return;
      _s.betTable.ovalHoverNumbers = _.map(_s.hitArea[_s.chipLocale[val.target.id]], (o) => { return o.toString() })

      console.log("Roulette Betting Area =>", _s.chipLocale[val.target.id], val.target.id)
    },

    bettingClick: function (val = '') {
      let _s = this
      // Validator
      if (!val) return;
      _s.addChips(_s.chipLocale[val.target.id], {}, true, {}, '', false, false, false)
    },
    getStockAmount: function (val) {
      let _s = this
      return _s.getRoulettebetinfo.section[_s.chipLocale[val]].sumOfStagedChips
    },
    getUpper: function (val) {
      let _s = this
      let items = ['fn', 'st_1', 'st_2', 'st_3', 'st_4', 'st_5', 'st_6', 'st_7', 'st_8', 'st_9', 'st_10', 'st_11', 'st_12', 'ln_1', 'ln_2', 'ln_3', 'ln_4', 'ln_5', 'ln_6', 'ln_7', 'ln_8', 'ln_9', 'ln_10', 'ln_11', 'ln_12']
      return _.includes(items, val)
    }
  },
  computed: {
    getArea: {
      get () { return this.getRoulettebetinfo.ArBetting.area }
    },
    getRatio: {
      get () { return this.getRoulettebetinfo.ArBetting.ratio }
    },
    getRoulettebetinfo: {
      get () { return this.$store.state.betTable.roulette }
    },

    chipLocale: {
      get () { return this.$store.state.chipLocale }
    },

    isBusy: {
      get () { return this.$store.state.isBusy },
      set (v) { this.$store.state.isBusy = v }
    },
    // Returns bet table information
    betTable: {
      get () {
        return this.$store.state.betTable[this.getBettingtable]
      }
    },
    projectedBalance: {
      get () { return this.$store.state.betTableGlobal.projectedAmount },
      set (v) { this.$store.state.betTableGlobal.projectedAmount = v > 0 ? v : 0 }
    },
    // Returns current table information
    _table: {
      get () {
        return this.$store.state.tablelist[this.$store.state.currentTableIndex]
      }
    },
    getSelectedChips: {
      get () {
        return this.$store.state.selectedChip
      }
    },
    balance: {
      get () {
        let _s = this
        return _s.$store.state.userinfo.balance
      },
      set (balance) {
        let _s = this
        _s.$store.commit('SET_USER_BALANCE', balance)
      }
    },
    getBettingtable: {
      get () {
        let _s = this
        return this.$store.state.currenttab
      }
    },
    result: {
      // RETURN RESULT AFTER THE GAME IS FINISHED
      get () {
        return this._table.game.result ? this._table.game.result : ''
      }
    },
    getMessage: {
      get () {
        return this.$store.state.sideBarMsg
      }
    },
    getBettingStatus: {
      get () {
        var result = false
        if (this.table.status === 'default' || this.table.status === 'betting') {
          result = true
        }
        return result
      }
    },
    isLobby: {
      get () {
        return this.$store.state.isLobby
      },

      set (value) {
        this.$store.state.isLobby = value
      }
    },

    selectedChip: {
      get () {
        return this.$store.state.selectedChip
      }
    },


    status: function () {
      return this.table.status
    }
  },
  watch: {

  }
}
