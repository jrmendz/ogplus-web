<template>
  <v-container grid-list-md mt-5>
    <v-layout align-center justify-center>
      <v-flex xs3>
        <span class="default textbold">{{ tt('Start date') }}</span>
        <v-menu
          ref="menu1"
          :close-on-content-click="false"
          v-model="menu1"
          :return-value.sync="date"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
          content-class="date3"
        >
          <v-text-field
            append-icon="event"
            color="white"
            single-line
            slot="activator"
            align="center"
            v-model="start_date_picker_rep"
            readonly
              v-on:click="clickEff"
          ></v-text-field>
          <v-date-picker v-model="start_date_picker_rep" type="date" :formatted-value.sync="start_date_rep" :locale="$store.state.locale === 'cn' ? 'zh-cn' : 'en-us'" :max="end_date_picker_rep"></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex xs3>
        <span class="default textbold">{{ tt('End date') }}</span>
        <v-menu
          ref="menu2"
          :close-on-content-click="false"
          v-model="menu2"
          :return-value.sync="date"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
          content-class="date4"
        >
          <v-text-field
            append-icon="event"
            color="white"
            single-line
            slot="activator"
            align="center"
            v-model="end_date_picker_rep"
            readonly
              v-on:click="clickEff"
          ></v-text-field>
          <v-date-picker v-model="end_date_picker_rep" :formatted-value.sync="end_date_rep" type="date" :locale="$store.state.locale === 'cn' ? 'zh-cn' : 'en-us'" :min="start_date_picker_rep" :max='end_date_max'></v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>
    <v-layout justify-center align-center>
      <v-flex xs3>
        <span class="default textbold">{{ tt('Win/Lose') }}</span>
        <v-text-field
          class="--is-number"
          v-model="itemsrep.win_loss"
          persistent-hint
          color="white"
          single-line
          placeholder="0.00"
          disabled
        >
        </v-text-field>
      </v-flex>
      <v-flex xs3>
        <span class="default textbold">{{ tt('Rolling') }}</span>
        <v-text-field
          class="--is-number"
          v-model="itemsrep.rolling"
          persistent-hint
          color="white"
          single-line
          placeholder="0.00"
          disabled
        >
        </v-text-field>
      </v-flex>

    </v-layout>
    <v-layout justify-center align-center>

      <v-flex xs6 class="text-xs-center">
        <v-btn color="btn__success_gradient --is-btn-radius --no-shadow" v-on:click="reportsWLR">{{ tt('Submit') }}</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import RecordsNReports from '@/library/RecordsNReports.js'
export default {
  mixins: [ RecordsNReports ]
}
</script>

<style lang="scss">
.btn__success_gradient {
  background-image: linear-gradient(to left, #008fa4 0%,#00bf51 100%);
}

.--no-shadow {
  box-shadow: none !important;
}
</style>

