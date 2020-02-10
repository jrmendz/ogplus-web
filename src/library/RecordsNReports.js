import moment from 'moment'
import _ from 'lodash'
const HTTP_API_DEBOUNCE = 250

export default {
  data () {
    return {
      // START: Common
      end_date_max: '',
      max: 8,
      // END: Common

      // START: Log Components
      date: '',
      menu1: '',
      menu2: '',
      start_date_picker_rep: '',
      start_date_rep: '',
      end_date_picker_rep: '',
      end_date_rep: '',
      itemsrep: {
        win_loss: '',
        rolling: ''
      },
      // END: Log Components

      // START: Record Modal Component
      date2: null,
      start_date_picker: '',
      start_date: '',
      end_date: '',
      end_date_picker: '',
      table: '',
      search: '',
      tableList: [],
      loading: false,
      shoeNumber: '',
      headers: [
        { text: 'Bet Code', align: 'left', sortable: false, value: 'name'},
        { sortable: false, text: 'Date', value: 'date' },
        { sortable: false, text: 'Table', value: 'table'},
        { sortable: false, text: 'Game', value: 'game' },
        { sortable: false, text: 'Shoe No', value: 'shoe' },
        { text: 'Bet Area', value: 'bet', sortable: false },
        { text: 'Result', value: 'result', sortable: false },
        { text: 'Bet Amount', value: 'amount', sortable: false },
        { text: 'Win / Lose', value: 'wl', sortable: false },
        { text: 'Balance', value: 'balance', sortable: false }
      ],
      items: [],
      pagination: {
        page: 1,
        rowsPerPage: 10,
        totalItems: 1,
        crumbs: 0,
      },
      toggle: ''
      // END: Record Modal Component
    }
  },
  mounted: function () {
    let _s = this
    _s.getTableList()

    _s.$nextTick(() => {
      _s.getCurrentDates()
      // Change the table dropdown to current table id
      _s.loadHistory()
      // if (!_s.isLobby) _s.table = _s.tableData.id
      // _s.loadHistory()
    })
  },
  methods: {
    // START: Common
    clickEff: function () {
      let _s = this
      if (_s.$store.state.soundFxSwitch === true) {
        _s.$store.state.audiosprite['spotFX'].play('click')
      }
    },
    toggleData: function (betCode) {
      this.toggle = betCode
    },
    showData: function (betCode) {
      return this.toggle === betCode
    },
    loadInfo: function (item = {}) {
      let _s = this
      let canvassHTML = '';
      let mwTmp

      if (item.gamecode === 'roulette') {
        canvassHTML = `<div><pre><h4>BETTING AREA</h4>` + _s.$store.state.betTable.roulette.section[item.bet_place].area + `</pre></div>`
      } else if (item.gamecode === 'moneywheel') {
        mwTmp = item.gameValues ? item.gameValues.values || 'No Results Yet' : 'No Results Yet'
        canvassHTML = `<div><pre><h4>RESULT</h4>` + _.toUpper(mwTmp) + `</pre></div>`
      }

      _s.$snotify.html(canvassHTML, {
        timeout: 2500,
        closeOnClick: true,
        position: 'centerCenter',
        backdrop: 0.5
      })
    },
    showInfo: function (item = {}) {
      let mw;

      if (item.gamecode === 'roulette') {
        return true;
      } else if (item.gamecode === 'moneywheel') {

        if (item.gameValues && item.result) {
          mw = _.split(item.gameValues.values, ',')

          return (_.includes(mw, 'x3') && _.includes(mw, item.bet_place))
        } else {
          return false
        }
      } else {
        return false;
      }
    },

    getLocalTime: function (time) {
      return this.$store.getters.getLocalTime(time)
    },
    toMoneyFormat: function (string) {
      return this.$options.filters.toMoney(string)
    },
    timeNow: function () {
      let d = new Date()
      return d.getHours()
    },
    getCurrentDates: function () {
      let _s = this
      if (_s.timeNow() < 12) {
        _s.start_date_picker = moment().subtract(1, 'days').format('YYYY-MM-DD')
        _s.start_date_picker_rep = moment().subtract(1, 'days').format('YYYY-MM-DD')
        _s.end_date_picker = moment().format('YYYY-MM-DD')
        _s.end_date_picker_rep = moment().format('YYYY-MM-DD')
        _s.end_date_max = moment().format('YYYY-MM-DD')
      } else {
        _s.start_date_picker = moment().format('YYYY-MM-DD')
        _s.start_date_picker_rep = moment().format('YYYY-MM-DD')
        _s.end_date_picker = moment().add(1, 'days').format('YYYY-MM-DD')
        _s.end_date_picker_rep = moment().add(1, 'days').format('YYYY-MM-DD')
        _s.end_date_max = moment().add(1, 'days').format('YYYY-MM-DD')
      }
    },
    reportsWLR: function () {
      let _s = this
      _s.clickEff()
      _s.$store.dispatch('LOAD_TRANSACTION_RWL', {
        fromDate: _s.getLocalTime(_s.start_date_picker_rep + ' 12:00:00'),
        toDate: _s.getLocalTime(_s.end_date_picker_rep + ' 11:59:59')
      }).then((res) => {
        _s.itemsrep.win_loss = _s.toMoneyFormat(res.data.win_loss)
        _s.itemsrep.rolling = _s.toMoneyFormat(res.data.rolling)
      })
    },

    onInputLoadHistory: _.debounce(function () {
      // Use debounce to prevent traffic request
      this.loadHistory()
    }, HTTP_API_DEBOUNCE),

    loadHistory: function () {
      let _s = this
      _s.loading = true
      _s.$store.dispatch('LOAD_TRANSACTION_HISTORY', {
        fromDate: _s.getLocalTime(_s.start_date_picker + ' 12:00:00'),
        toDate: _s.getLocalTime(_s.end_date_picker + ' 11:59:59'),
        perPage: 25,
        page: _s.pagination.page,
        table_id: _s.table,
        shoehand_id: _s.shoeNumber
      }).then((res) => {
        _s.items = res.data.betting_history
        _s.pagination.totalItems = res.data.totalRows
        _s.loading = false
      }, (err) => {
        _s.loading = false
      })
    },
    // END: Common

    // START: Record Modal Component
    getTableList: function () {
      let _s = this
      _s.$store.dispatch('GET_TABLE_LIST').then((res) => {
        _s.tableList = _.filter(res, (o) => { return o['status'] !== 'disconnected'})
      })
    },
    getTotalCardBaccarat: function (a, b, c) {
      let valueEquivalent = { A: 1, J: 0, Q: 0, K: 0 }
      let valueA = a.substring(0, a.length - 1)
      let valueB = b.substring(0, b.length - 1)
      let valueC = c.substring(0, c.length - 1)
      valueA = isNaN(+valueA) ? valueEquivalent[valueA] : valueA
      valueB = isNaN(+valueB) ? valueEquivalent[valueB] : valueB
      valueC = isNaN(+valueC) ? valueEquivalent[valueC] : valueC
      let totalval = Number(valueA) + Number(valueB) + Number(valueC)
      return totalval % 10
    },
    getTotalCardDT: function (a) {
      let valueEquivalent = {A: 1, J: 11, Q: 12, K: 13 }
      let valueA = a.substring(0, a.length - 1)
      valueA = isNaN(+valueA) ? valueEquivalent[valueA] : valueA
      return valueA
    }
    // END: Record Modal Component
  },
  computed: {
    // START: Log Component
    isrrModal: {
      get () {
        return this.$store.state.rrModal
      },
      set (value) {
        this.$store.state.rrModal = value
      }
    },
    // END: Log Component

    isLobby: {
      get () {
        return this.$store.state.isLobby
      },
      set (value) {
        this.$store.state.isLobby = value
      }
    },
    currentTableIndex: {
      get (e) {
        return e.$store.state.currentTableIndex
      }
    },
    tableData: {
      get (e) {
        return e.$store.state.tablelist[e.currentTableIndex]
      }
    },
    recordModal: {
      get (e) {
        return e.$store.state.recordModal
      }
    },
    locale: {
      get (s) {
        return s.$store.state.locale
      }
    },
  },
  watch: {
    // START: Log Component
    isrrModal: function (n, o) {
      let _s = this
      if (n) {
        // Change the table dropdown to current table id
        if (!_s.isLobby) { _s.table = _s.tableData.id } else { _s.table = '' }
        _s.pagination.page = 1
        _s.shoeNumber = ''
        _s.itemsrep = { win_loss: '', rolling: '' }
        _s.getCurrentDates()
      }
    },
    recordModal: function () {
      let _s = this
      _s.getCurrentDates()
      _s.getTableList()
    },

    'tableData.status' : function (n) {
      if (this.isrrModal) {
        if (n === 'betting') this.loadHistory()
      }
    },

    'pagination.totalItems': function () {
      this.pagination.crumbs = Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  }
}
