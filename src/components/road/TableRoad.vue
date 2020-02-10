<!--<template>-->
  <!--<table class="table__ui">-->
    <!--<tr v-for="row in rows" :key="row">-->
      <!--<td v-for="column in columns" :key="column">-->
        <!--<template v-if="isGoodTips">-->
          <!--<span :key="index" :class="goodtips_patterns['gt' + index]['count_column' + column] !== undefined && goodtips_patterns['gt' + index]['count_column' + column] >= row ? goodtips_patterns['gt' + index]['class_column' + column] : ''"></span>-->
        <!--</template>-->
        <!--<template v-if="isBigRoad">-->
          <!--<span :class="BRRoad(row, column, isMiniCard, table.tableNumber)">{{BRRoadtieCount(row, column, isMiniCard, table.tableNumber)}}</span>-->
        <!--</template>-->
        <!--<template v-if="isMainRoad">-->
          <!--<span :class="MRRoad(row, column, columns, table.tableNumber)">{{MRRoadText(row, column, columns, table.tablenumber)}}</span>-->
        <!--</template>-->
        <!--<template v-if="isBigEyeRoad">-->
          <!--<ul class="b__road">-->
            <!--<li>-->
              <!--<span :class="BERoad(row, column, table.tableNumber, '0')"></span>-->
            <!--</li>-->
            <!--<li>-->
              <!--<span :class="BERoad(row, column, table.tableNumber, '1')"></span>-->
            <!--</li>-->
            <!--<li>-->
              <!--<span :class="BERoad(row, column, table.tableNumber, '2')"></span>-->
            <!--</li>-->
            <!--<li>-->
              <!--<span :class="BERoad(row, column, table.tableNumber, '3')"></span>-->
            <!--</li>-->
          <!--</ul>-->
        <!--</template>-->
        <!--<template v-if="isSmallRoad">-->
          <!--<ul class="s__road">-->
            <!--<li>-->
              <!--<span :class="SRRoad(row, column, table.tableNumber, '0')"></span>-->
            <!--</li>-->
            <!--<li>-->
              <!--<span :class="SRRoad(row, column, table.tableNumber, '1')"></span>-->
            <!--</li>-->
            <!--<li>-->
              <!--<span :class="SRRoad(row, column, table.tableNumber, '2')"></span>-->
            <!--</li>-->
            <!--<li>-->
              <!--<span :class="SRRoad(row, column, table.tableNumber, '3')"></span>-->
            <!--</li>-->
          <!--</ul>-->
        <!--</template>-->
        <!--<template v-if="isCockRoachRoad">-->
          <!--<ul class="c__road">-->
            <!--<li>-->
              <!--<span :class="CRRoad(row, column, table.tableNumber, '0')"></span>-->
            <!--</li>-->
            <!--<li>-->
              <!--<span :class="CRRoad(row, column, table.tableNumber, '1')"></span>-->
            <!--</li>-->
            <!--<li>-->
              <!--<span :class="CRRoad(row, column, table.tableNumber, '2')"></span>-->
            <!--</li>-->
            <!--<li>-->
              <!--<span :class="CRRoad(row, column, table.tableNumber, '3')"></span>-->
            <!--</li>-->
          <!--</ul>-->
        <!--</template>-->
        <!--<template v-if="isAnimal">-->
          <!--<ul class="animals">-->
            <!--<li>20</li>-->
            <!--<li>-->
              <!--<svgicon name="animals/dog" height="24" scale="1" color="#ffbd00"></svgicon>-->
            <!--</li>-->
          <!--</ul>-->
        <!--</template>-->
        <!--<template v-if="isDragon">-->
          <!--&lt;!&ndash; <svgicon name="roadmap_beads_mw-dragon" scale="1" color="url(#svgicon_roadmap_beads_mw-dragon_a)"></svgicon> &ndash;&gt;-->
          <!--<span class="dragon dragon__win" v-if="mwRoad(row, column, table.tableNumber) > 0">{{mwRoad(row, column, table.tableNumber)}}</span>-->
          <!--<span class="dragon multi__bead" v-else-if="mwRoad(row, column, table.tableNumber) === 'og'"></span>-->
        <!--</template>-->
      <!--</td>-->
    <!--</tr>-->
  <!--</table>-->
<!--</template>-->
<!--<script type="text/javascript">-->

<!--import RoadMap from '@/library/RoadMaps.js'-->
<!--export default {-->
  <!--mixins: [ RoadMap ]-->
<!--}-->
<!--</script>-->
