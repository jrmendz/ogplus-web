export default {
  /*
  ____ ___                        .___          _____
  |    |   \ ______  ____ _______  |   |  ____ _/ ____\____
  |    |   //  ___/_/ __ \\_  __ \ |   | /    \\   __\/  _ \
  |    |  / \___ \ \  ___/ |  | \/ |   ||   |  \|  | (  <_> )
  |______/ /____  > \___  >|__|    |___||___|  /|__|  \____/
                \/      \/                   \/
   */
  userinfo: {
    id: '',
    username: '',
    password: '',
    nickname: '',
    avatar: '',
    balance: 0,
    token: '',
    status: '',
    videoURL: '//stream.oriental-game.com/hls/',
    videoQuality: {
      FHD: '1',
      SD: '2'
    },
    totalBetsToday: 0, // per table only
    onlinePlayers: 0,
    audio_url: 'https://static.oriental-game.com/audio/ogbacmusic.mp3', // OFFICIAL MUSIC BACKGROUND!!!!
    // audio_url: 'static/ogxmasbac.mp3',
    hlsPlayer: null,
    videojs: null,
    hlsjs: null,
    recordstart: '',
    recordend: '',
    items: '',
    islogin: false,
    min_bet_limit: 0, // -check minChipValue
    max_bet_limit: 0 // -check maxChipValue
  },

  /*
  _________  .__     .__
  \_   ___ \ |  |__  |__|______   ______
  /    \  \/ |  |  \ |  |\____ \ /  ___/
  \     \____|   Y  \|  ||  |_> >\___ \
   \______  /|___|  /|__||   __//____  >
          \/      \/     |__|        \/
   */
  iscustomchips: false,
  istempcustomchips: false,
  chipsminbalance: 500,
  squareChipSelected: 'https://static.oriental-game.com/chips/selected/sq-chip.png',
  TempChipClass: 'sq-chip',
  squareChip: 'https://static.oriental-game.com/chips/sq-chip.png',
  Tempdefaultchip: {},
  tempBettingChipStore: {},
  bettingSpecialChip: [
    {
      class: 'sq-chip',
      value: '1000',
      isActive: false,
      isCustom: false
    }
  ],
  tempbettingSpecialChip: [
    {
      class: 'sq-chip',
      value: '1000',
      isActive: false,
      isCustom: false
    }
  ],
  bettingChips: [
    {
      class: 'bl-chip',
      value: '100',
      isActive: true,
      isCustom: false
    },
    {
      class: 'blk-chip',
      value: '200',
      isActive: true,
      isCustom: false
    },
    {
      class: 'br-chip',
      value: '300',
      isActive: true,
      isCustom: false
    },
    {
      class: 'dbr-chip',
      value: '400',
      isActive: true,
      isCustom: false
    },
    {
      class: 'dg-chip',
      value: '500',
      isActive: true,
      isCustom: false
    },
    {
      class: 'g-chip',
      value: '600',
      isActive: false,
      isCustom: false
    },
    {
      class: 'p-chip',
      value: '700',
      isActive: false,
      isCustom: false
    },
    {
      class: 'r-chip',
      value: '800',
      isActive: false,
      isCustom: false
    },
    {
      class: 'v-chip',
      value: '900',
      isActive: false,
      isCustom: false
    },
    {
      class: 'y-chip',
      value: '1000',
      isActive: false,
      isCustom: false
    }
  ],
  TempbettingChips: [
    {
      class: 'bl-chip',
      value: '100',
      isActive: false,
      isCustom: false
    },
    {
      class: 'blk-chip',
      value: '200',
      isActive: false,
      isCustom: false
    },
    {
      class: 'br-chip',
      value: '300',
      isActive: false,
      isCustom: false
    },
    {
      class: 'dbr-chip',
      value: '400',
      isActive: false,
      isCustom: false
    },
    {
      class: 'dg-chip',
      value: '500',
      isActive: false,
      isCustom: false
    },
    {
      class: 'g-chip',
      value: '600',
      isActive: false,
      isCustom: false
    },
    {
      class: 'p-chip',
      value: '700',
      isActive: false,
      isCustom: false
    },
    {
      class: 'r-chip',
      value: '800',
      isActive: false,
      isCustom: false
    },
    {
      class: 'v-chip',
      value: '900',
      isActive: false,
      isCustom: false
    },
    {
      class: 'y-chip',
      value: '1000',
      isActive: false,
      isCustom: false
    }
  ],

  /*
    _________.__     .___          ________                     .___ ___________.__
   /   _____/|__|  __| _/ ____    /  _____/   ____    ____    __| _/ \__    ___/|__|______   ______
   \_____  \ |  | / __ |_/ __ \  /   \  ___  /  _ \  /  _ \  / __ |    |    |   |  |\____ \ /  ___/
   /        \|  |/ /_/ |\  ___/  \    \_\  \(  <_> )(  <_> )/ /_/ |    |    |   |  ||  |_> >\___ \
  /_______  /|__|\____ | \___  >  \______  / \____/  \____/ \____ |    |____|   |__||   __//____  >
          \/          \/     \/          \/                      \/                 |__|        \/
   */
  checkgoodtips: false,
  goodTipsModal: false,
  staticPattern: {
    gt1: [
      {row: 0, column: 0, result: 'r'},
      {row: 1, column: 0, result: 'r'},
      {row: 2, column: 0, result: 'r'},
      {row: 3, column: 0, result: 'r'}
    ],
    gt2: [
      {row: 0, column: 0, result: 'b'},
      {row: 1, column: 0, result: 'b'},
      {row: 2, column: 0, result: 'b'},
      {row: 3, column: 0, result: 'b'}
    ],
    gt3: [
      {row: 0, column: 0, result: 'r'},
      {row: 1, column: 0, result: 'r'},
      {row: 0, column: 1, result: 'b'},
      {row: 1, column: 1, result: 'b'},
      {row: 2, column: 1, result: 'b'},
      {row: 0, column: 2, result: 'r'},
      {row: 1, column: 2, result: 'r'}
    ],
    gt4: [
      {row: 0, column: 0, result: 'r'},
      {row: 0, column: 1, result: 'b'},
      {row: 0, column: 2, result: 'r'},
      {row: 0, column: 3, result: 'b'}
    ],
    gt5: [
      {row: 0, column: 0, result: 'r'},
      {row: 0, column: 1, result: 'b'},
      {row: 1, column: 1, result: 'b'},
      {row: 0, column: 2, result: 'r'},
      {row: 0, column: 3, result: 'b'},
      {row: 1, column: 3, result: 'b'}
    ],
    gt6: [
      {row: 0, column: 0, result: 'b'},
      {row: 0, column: 1, result: 'r'},
      {row: 1, column: 1, result: 'r'},
      {row: 0, column: 2, result: 'b'},
      {row: 0, column: 3, result: 'r'},
      {row: 1, column: 3, result: 'r'}
    ],
    gt7: [
      {row: 0, column: 0, result: 'r'},
      {row: 1, column: 0, result: 'r'},
      {row: 2, column: 0, result: 'r'},
      {row: 3, column: 0, result: 'r'},
      {row: 0, column: 1, result: 'b'},
      {row: 0, column: 2, result: 'r'},
      {row: 1, column: 2, result: 'r'},
      {row: 0, column: 3, result: 'b'}
    ],
    gt8: [
      {row: 0, column: 0, result: 'b'},
      {row: 1, column: 0, result: 'b'},
      {row: 0, column: 1, result: 'r'},
      {row: 0, column: 2, result: 'b'},
      {row: 1, column: 2, result: 'b'},
      {row: 2, column: 2, result: 'b'},
      {row: 3, column: 2, result: 'b'},
      {row: 0, column: 3, result: 'r'},
      {row: 1, column: 3, result: 'r'}
    ],
    gt9: [
      {row: 0, column: 0, result: 'r'},
      {row: 0, column: 1, result: 'b'},
      {row: 0, column: 2, result: 'r'},
      {row: 1, column: 2, result: 'r'},
      {row: 0, column: 3, result: 'b'},
      {row: 0, column: 4, result: 'r'},
      {row: 0, column: 5, result: 'b'},
      {row: 0, column: 6, result: 'r'},
      {row: 1, column: 6, result: 'r'}
    ],
    gt10: [
      {row: 0, column: 0, result: 'b'},
      {row: 0, column: 1, result: 'r'},
      {row: 0, column: 2, result: 'b'},
      {row: 1, column: 2, result: 'b'},
      {row: 0, column: 3, result: 'r'},
      {row: 0, column: 4, result: 'b'},
      {row: 0, column: 5, result: 'r'},
      {row: 0, column: 6, result: 'b'},
      {row: 1, column: 6, result: 'b'}
    ],
    // START: This will be remove when custom goods tips is activated //
    // gt11: [
    //   {row: 0, column: 0, result: 'b'},
    //   {row: 0, column: 1, result: 'r'},
    //   {row: 0, column: 2, result: 'b'},
    //   {row: 1, column: 2, result: 'b'},
    //   {row: 0, column: 3, result: 'r'},
    //   {row: 0, column: 4, result: 'b'},
    //   {row: 0, column: 5, result: 'r'},
    //   {row: 0, column: 6, result: 'b'},
    //   {row: 1, column: 6, result: 'b'}
    // ],
    // gt12: [
    //   {row: 0, column: 0, result: 'r'},
    //   {row: 0, column: 1, result: 'b'},
    //   {row: 0, column: 2, result: 'r'},
    //   {row: 0, column: 3, result: 'b'}
    // ]
    // END: This will be remove when custom goods tips is activated //
  },
  customPattern: {
    // gt11: '',
    // gt12: ''
  },
  goodTipsActive: {
    gt1: true,
    gt2: true,
    gt3: true,
    gt4: true,
    gt5: true,
    gt6: true,
    gt7: true,
    gt8: true,
    gt9: true,
    gt10: true,
    // gt11: true,
    // gt12: true
  },
  goodTipsName: {
    gt1: 'Long Banker',
    gt2: 'Long Player',
    gt3: 'Patted eat',
    gt4: 'Single Road',
    gt5: 'One hoom two rooms "Banker"',
    gt6: 'One hoom two rooms "Player"',
    gt7: 'Banker across Player',
    gt8: 'Player across Banker',
    gt9: 'Separated Banker',
    gt10: 'Separated Player',
    // gt11: true,
    // gt12: true
  },

  goodTipsMatch: [],
  goodTipsList: [],
  goodTipsException: ['dragontiger', 'moneywheel', 'roulette'],
  /*
  __________          __     __   .__                  .___          _____
  \______   \  ____ _/  |_ _/  |_ |__|  ____    ____   |   |  ____ _/ ____\____
   |    |  _/_/ __ \\   __\\   __\|  | /    \  / ___\  |   | /    \\   __\/  _ \
   |    |   \\  ___/ |  |   |  |  |  ||   |  \/ /_/  > |   ||   |  \|  | (  <_> )
   |______  / \___  >|__|   |__|  |__||___|  /\___  /  |___||___|  /|__|  \____/
          \/      \/                       \//_____/             \/
  */
  AnnouncementNotif: {},
  TempAnnouncementNotif:'Welcome to Oriental Game! For a better gaming experience, we strongly recommend you to browse with Google Chrome / Safari',
  message: '',
  lastBet: 0,
  selectedChip: {},
  selectedCustomChip: {},
  currentSelectedSideBet: '',

  // this.$store.state.betTable['baccarat'].tiger.percentage

  betTable: {
    baccarat: {
      section: {
        player_pair: {
          name: 'Player Pair',
          nameSb: 'PP',
          ratio: '1:11',
          alterRatio: '1:11',
          isActive: true,
          hasPercentage: false,
          percentage: 0,
          chipClass: '',
          chipImage: '',
          totalBetAmt: 0,
          sumOfStagedChips: 0,
          players: 0,
          bets: []
        },
        tie: {
          name: 'Tie',
          nameSb: 'T',
          ratio: '1:8',
          alterRatio: '1:8',
          isActive: true,
          hasPercentage: true,
          percentage: 0,
          chipClass: '',
          chipImage: '',
          totalBetAmt: 0,
          sumOfStagedChips: 0,
          players: 0,
          bets: []
        },
        banker_pair: {
          name: 'Banker Pair',
          nameSb: 'BP',
          ratio: '1:11',
          alterRatio: '1:11',
          isActive: true,
          hasPercentage: false,
          percentage: 0,
          chipClass: '',
          chipImage: '',
          totalBetAmt: 0,
          sumOfStagedChips: 0,
          players: 0,
          bets: []
        },
        player: {
          name: 'Player',
          nameSb: 'P',
          ratio: '1:1',
          alterRatio: '1:1',
          isActive: true,
          hasPercentage: true,
          percentage: 0,
          chipClass: '',
          chipImage: '',
          totalBetAmt: 0,
          sumOfStagedChips: 0,
          players: 0,
          bets: []
        },
        super_six: {
          name: 'Super Six',
          nameSb: 'S6',
          ratio: '1:12',
          alterRatio: '1:12',
          isActive: false,
          hasPercentage: false,
          percentage: 0,
          chipClass: '',
          chipImage: '',
          players: 0,
          totalBetAmt: 0,
          sumOfStagedChips: 0,
          bets: [],
          _totalBetAmt: 0,
          _sumOfStagedChips: 0,
          _bets: []
        },
        banker: {
          name: 'Banker',
          nameSb: 'B',
          ratio: '1:0.95',
          alterRatio: '1:1',
          isActive: true,
          hasPercentage: true,
          percentage: 0,
          chipClass: '',
          chipImage: '',
          totalBetAmt: 0,
          sumOfStagedChips: 0,
          players: 0,
          bets: []
        }
      },
      hasRebet: false
    },
    dragontiger: {
      section: {
        dragon: {
          name: 'Dragon',
          nameSb: 'D',
          ratio: '1:1',
          alterRatio: '1:1',
          hasPercentage: true,
          percentage: 0,
          chipClass: '',
          chipImage: '',
          totalBetAmt: 0,
          sumOfStagedChips: 0,
          players: 0,
          bets: []
        },
        tie: {
          name: 'Tie',
          nameSb: 'T',
          ratio: '1:8',
          alterRatio: '1:8',
          isActive: true,
          hasPercentage: true,
          percentage: 0,
          chipClass: '',
          chipImage: '',
          totalBetAmt: 0,
          sumOfStagedChips: 0,
          players: 0,
          bets: []
        },
        tiger: {
          name: 'Tiger',
          nameSb: 'T',
          ratio: '1:1',
          alterRatio: '1:1',
          isActive: true,
          hasPercentage: true,
          percentage: 0,
          chipClass: '',
          chipImage: '',
          totalBetAmt: 0,
          sumOfStagedChips: 0,
          players: 0,
          bets: []
        }
      },
      hasRebet: false
    },
    moneywheel: {
      section: {
        '1': {
          name: 'Pays 1x',
          isActive: true,
          hasPercentage: true,
          percentage: 0,
          chipClass: '',
          chipImage: '',
          totalBetAmt: 0,
          sumOfStagedChips: 0,
          players: 0,
          bets: []
        },
        '2': {
          name: 'Pays 2x',
          isActive: true,
          hasPercentage: true,
          percentage: 0,
          chipClass: '',
          chipImage: '',
          totalBetAmt: 0,
          sumOfStagedChips: 0,
          players: 0,
          bets: []
        },
        '5': {
          name: 'Pays 5x',
          isActive: true,
          hasPercentage: true,
          percentage: 0,
          chipClass: '',
          chipImage: '',
          totalBetAmt: 0,
          sumOfStagedChips: 0,
          players: 0,
          bets: []
        },
        '10': {
          name: 'Pays 10x',
          isActive: true,
          hasPercentage: true,
          percentage: 0,
          chipClass: '',
          chipImage: '',
          totalBetAmt: 0,
          sumOfStagedChips: 0,
          players: 0,
          bets: []
        },
        '20': {
          name: 'Pays 20x',
          isActive: true,
          hasPercentage: true,
          percentage: 0,
          chipClass: '',
          chipImage: '',
          totalBetAmt: 0,
          sumOfStagedChips: 0,
          players: 0,
          bets: []
        },
        'og': {
          name: 'Pays OG',
          isActive: true,
          hasPercentage: true,
          percentage: 0,
          chipClass: '',
          chipImage: '',
          totalBetAmt: 0,
          sumOfStagedChips: 0,
          players: 0,
          bets: []
        }
      },
      hasRebet: false,
      lastResult: {
        multiplier: 0,
        section: ''
      }
    },
    roulette: {
      ArBetting: {
        area: '',
        ratio: ''
      },
      section: {
        // DONE
        s0: { sumOfStagedChips: 0, bets: [] , area: '0',  ratio: '1:35'},
        s1: { sumOfStagedChips: 0, bets: [] , area: '1',  ratio: '1:35'},
        s2: { sumOfStagedChips: 0, bets: [] , area: '2',  ratio: '1:35'},
        s3: { sumOfStagedChips: 0, bets: [] , area: '3',  ratio: '1:35'},
        s4: { sumOfStagedChips: 0, bets: [] , area: '4',  ratio: '1:35'},
        s5: { sumOfStagedChips: 0, bets: [] , area: '5',  ratio: '1:35'},
        s6: { sumOfStagedChips: 0, bets: [] , area: '6',  ratio: '1:35'},
        s7: { sumOfStagedChips: 0, bets: [] , area: '7',  ratio: '1:35'},
        s8: { sumOfStagedChips: 0, bets: [] , area: '8',  ratio: '1:35'},
        s9: { sumOfStagedChips: 0, bets: [] , area: '9',  ratio: '1:35'},
        s10: { sumOfStagedChips: 0, bets: [], area: '10', ratio: '1:35' },
        s11: { sumOfStagedChips: 0, bets: [], area: '11', ratio: '1:35' },
        s12: { sumOfStagedChips: 0, bets: [], area: '12', ratio: '1:35' },
        s13: { sumOfStagedChips: 0, bets: [], area: '13', ratio: '1:35' },
        s14: { sumOfStagedChips: 0, bets: [], area: '14', ratio: '1:35' },
        s15: { sumOfStagedChips: 0, bets: [], area: '15', ratio: '1:35' },
        s16: { sumOfStagedChips: 0, bets: [], area: '16', ratio: '1:35' },
        s17: { sumOfStagedChips: 0, bets: [], area: '17', ratio: '1:35' },
        s18: { sumOfStagedChips: 0, bets: [], area: '18', ratio: '1:35' },
        s19: { sumOfStagedChips: 0, bets: [], area: '19', ratio: '1:35' },
        s20: { sumOfStagedChips: 0, bets: [], area: '20', ratio: '1:35' },
        s21: { sumOfStagedChips: 0, bets: [], area: '21', ratio: '1:35' },
        s22: { sumOfStagedChips: 0, bets: [], area: '22', ratio: '1:35' },
        s23: { sumOfStagedChips: 0, bets: [], area: '23', ratio: '1:35' },
        s24: { sumOfStagedChips: 0, bets: [], area: '24', ratio: '1:35' },
        s25: { sumOfStagedChips: 0, bets: [], area: '25', ratio: '1:35' },
        s26: { sumOfStagedChips: 0, bets: [], area: '26', ratio: '1:35' },
        s27: { sumOfStagedChips: 0, bets: [], area: '27', ratio: '1:35' },
        s28: { sumOfStagedChips: 0, bets: [], area: '28', ratio: '1:35' },
        s29: { sumOfStagedChips: 0, bets: [], area: '29', ratio: '1:35' },
        s30: { sumOfStagedChips: 0, bets: [], area: '30', ratio: '1:35' },
        s31: { sumOfStagedChips: 0, bets: [], area: '31', ratio: '1:35' },
        s32: { sumOfStagedChips: 0, bets: [], area: '32', ratio: '1:35' },
        s33: { sumOfStagedChips: 0, bets: [], area: '33', ratio: '1:35' },
        s34: { sumOfStagedChips: 0, bets: [], area: '34', ratio: '1:35' },
        s35: { sumOfStagedChips: 0, bets: [], area: '35', ratio: '1:35' },
        s36: { sumOfStagedChips: 0, bets: [], area: '36', ratio: '1:35' },

        // DONE
        near1: { sumOfStagedChips: 0, bets: [] , area: '1 2', ratio: '1:17'},
        near2: { sumOfStagedChips: 0, bets: [] , area: '2 3', ratio: '1:17'},
        near3: { sumOfStagedChips: 0, bets: [] , area: '4 5', ratio: '1:17'},
        near4: { sumOfStagedChips: 0, bets: [] , area: '5 6', ratio: '1:17'},
        near5: { sumOfStagedChips: 0, bets: [] , area: '7 8', ratio: '1:17'},
        near6: { sumOfStagedChips: 0, bets: [] , area: '8 9', ratio: '1:17'},
        near7: { sumOfStagedChips: 0, bets: [] , area: '10 11', ratio: '1:17'},
        near8: { sumOfStagedChips: 0, bets: [] , area: '11 12', ratio: '1:17'},
        near9: { sumOfStagedChips: 0, bets: [] , area: '13 14', ratio: '1:17'},
        near10: { sumOfStagedChips: 0, bets: [], area: '14 15', ratio: '1:17' },
        near11: { sumOfStagedChips: 0, bets: [], area: '16 17', ratio: '1:17' },
        near12: { sumOfStagedChips: 0, bets: [], area: '17 18', ratio: '1:17' },
        near13: { sumOfStagedChips: 0, bets: [], area: '19 20', ratio: '1:17' },
        near14: { sumOfStagedChips: 0, bets: [], area: '20 21', ratio: '1:17' },
        near15: { sumOfStagedChips: 0, bets: [], area: '22 23', ratio: '1:17' },
        near16: { sumOfStagedChips: 0, bets: [], area: '23 24', ratio: '1:17' },
        near17: { sumOfStagedChips: 0, bets: [], area: '25 26', ratio: '1:17' },
        near18: { sumOfStagedChips: 0, bets: [], area: '26 27', ratio: '1:17' },
        near19: { sumOfStagedChips: 0, bets: [], area: '28 29', ratio: '1:17' },
        near20: { sumOfStagedChips: 0, bets: [], area: '29 30', ratio: '1:17' },
        near21: { sumOfStagedChips: 0, bets: [], area: '31 32', ratio: '1:17' },
        near22: { sumOfStagedChips: 0, bets: [], area: '32 33', ratio: '1:17' },
        near23: { sumOfStagedChips: 0, bets: [], area: '34 35', ratio: '1:17' },
        near24: { sumOfStagedChips: 0, bets: [], area: '35 36', ratio: '1:17' },

        // DONE
        zero1: { sumOfStagedChips: 0, bets: [] , area: '0 1', ratio: '1:17'},
        zero2: { sumOfStagedChips: 0, bets: [] , area: '0 2', ratio: '1:17'},
        zero3: { sumOfStagedChips: 0, bets: [] , area: '0 3', ratio: '1:17'},

        // DONE
        split1: { sumOfStagedChips: 0, bets: [] , area: '1 4', ratio: '1:17'},
        split2: { sumOfStagedChips: 0, bets: [] , area: '2 5', ratio: '1:17'},
        split3: { sumOfStagedChips: 0, bets: [] , area: '3 6', ratio: '1:17'},
        split4: { sumOfStagedChips: 0, bets: [] , area: '4 7', ratio: '1:17'},
        split5: { sumOfStagedChips: 0, bets: [] , area: '5 8', ratio: '1:17'},
        split6: { sumOfStagedChips: 0, bets: [] , area: '6 9', ratio: '1:17'},
        split7: { sumOfStagedChips: 0, bets: [] , area: '7 10', ratio: '1:17'},
        split8: { sumOfStagedChips: 0, bets: [] , area: '8 11', ratio: '1:17'},
        split9: { sumOfStagedChips: 0, bets: [] , area: '9 12', ratio: '1:17'},
        split10: { sumOfStagedChips: 0, bets: [], area: '10 13', ratio: '1:17' },
        split11: { sumOfStagedChips: 0, bets: [], area: '11 14', ratio: '1:17' },
        split12: { sumOfStagedChips: 0, bets: [], area: '12 15', ratio: '1:17' },
        split13: { sumOfStagedChips: 0, bets: [], area: '13 16', ratio: '1:17' },
        split14: { sumOfStagedChips: 0, bets: [], area: '14 17', ratio: '1:17' },
        split15: { sumOfStagedChips: 0, bets: [], area: '15 18', ratio: '1:17' },
        split16: { sumOfStagedChips: 0, bets: [], area: '16 19', ratio: '1:17' },
        split17: { sumOfStagedChips: 0, bets: [], area: '17 20', ratio: '1:17' },
        split18: { sumOfStagedChips: 0, bets: [], area: '18 21', ratio: '1:17' },
        split19: { sumOfStagedChips: 0, bets: [], area: '19 22', ratio: '1:17' },
        split20: { sumOfStagedChips: 0, bets: [], area: '20 23', ratio: '1:17' },
        split21: { sumOfStagedChips: 0, bets: [], area: '21 24', ratio: '1:17' },
        split22: { sumOfStagedChips: 0, bets: [], area: '22 25', ratio: '1:17' },
        split23: { sumOfStagedChips: 0, bets: [], area: '23 26', ratio: '1:17' },
        split24: { sumOfStagedChips: 0, bets: [], area: '24 27', ratio: '1:17' },
        split25: { sumOfStagedChips: 0, bets: [], area: '25 28', ratio: '1:17' },
        split26: { sumOfStagedChips: 0, bets: [], area: '26 29', ratio: '1:17' },
        split27: { sumOfStagedChips: 0, bets: [], area: '27 30', ratio: '1:17' },
        split28: { sumOfStagedChips: 0, bets: [], area: '28 31', ratio: '1:17' },
        split29: { sumOfStagedChips: 0, bets: [], area: '29 32', ratio: '1:17' },
        split30: { sumOfStagedChips: 0, bets: [], area: '30 33', ratio: '1:17' },
        split31: { sumOfStagedChips: 0, bets: [], area: '31 34', ratio: '1:17' },
        split32: { sumOfStagedChips: 0, bets: [], area: '32 35', ratio: '1:17' },
        split33: { sumOfStagedChips: 0, bets: [], area: '33 36', ratio: '1:17' },

        // DONE
        street1: { sumOfStagedChips: 0, bets: [] ,area: '1 2 3', ratio: '1:11'},
        street2: { sumOfStagedChips: 0, bets: [] ,area: '4 5 6', ratio: '1:11'},
        street3: { sumOfStagedChips: 0, bets: [] ,area: '7 8 9', ratio: '1:11'},
        street4: { sumOfStagedChips: 0, bets: [] ,area: '10 11 12', ratio: '1:11'},
        street5: { sumOfStagedChips: 0, bets: [] ,area: '13 14 15', ratio: '1:11'},
        street6: { sumOfStagedChips: 0, bets: [] ,area: '16 17 18', ratio: '1:11'},
        street7: { sumOfStagedChips: 0, bets: [] ,area: '19 20 21', ratio: '1:11'},
        street8: { sumOfStagedChips: 0, bets: [] ,area: '22 23 24', ratio: '1:11'},
        street9: { sumOfStagedChips: 0, bets: [] ,area: '25 26 27', ratio: '1:11'},
        street10: { sumOfStagedChips: 0, bets: [],area: '28 29 30', ratio: '1:11' },
        street11: { sumOfStagedChips: 0, bets: [],area: '31 32 33', ratio: '1:11' },
        street12: { sumOfStagedChips: 0, bets: [],area: '34 35 36', ratio: '1:11' },

        // DONE
        line0: { sumOfStagedChips: 0, bets: [] ,area: 'Four Number', ratio: '1:8'},
        line1: { sumOfStagedChips: 0, bets: [] ,area: '1 2 3 4 5 6', ratio: '1:5'},
        line2: { sumOfStagedChips: 0, bets: [] ,area: '4 5 6 7 8 9', ratio: '1:5'},
        line3: { sumOfStagedChips: 0, bets: [] ,area: '7 8 9 10 11 12', ratio: '1:5'},
        line4: { sumOfStagedChips: 0, bets: [] ,area: '10 11 12 13 14 15', ratio: '1:5'},
        line5: { sumOfStagedChips: 0, bets: [] ,area: '13 14 15 16 17 18', ratio: '1:5'},
        line6: { sumOfStagedChips: 0, bets: [] ,area: '16 17 18 19 20 21', ratio: '1:5'},
        line7: { sumOfStagedChips: 0, bets: [] ,area: '19 20 21 22 23 24', ratio: '1:5'},
        line8: { sumOfStagedChips: 0, bets: [] ,area: '22 23 24 25 26 27', ratio: '1:5'},
        line9: { sumOfStagedChips: 0, bets: [] ,area: '25 26 27 28 29 30', ratio: '1:5'},
        line10: { sumOfStagedChips: 0, bets: [],area: '28 29 30 31 32 33', ratio: '1:5' },
        line11: { sumOfStagedChips: 0, bets: [],area: '31 32 33 34 35 36', ratio: '1:5' },

        // DONE
        square1: { sumOfStagedChips: 0, bets: [] ,area: '1 2 4 5', ratio: '1:8'},
        square2: { sumOfStagedChips: 0, bets: [] ,area: '2 3 5 6', ratio: '1:8'},
        square3: { sumOfStagedChips: 0, bets: [] ,area: '4 5 7 8', ratio: '1:8'},
        square4: { sumOfStagedChips: 0, bets: [] ,area: '5 6 8 9', ratio: '1:8'},
        square5: { sumOfStagedChips: 0, bets: [] ,area: '7 8 10 11', ratio: '1:8'},
        square6: { sumOfStagedChips: 0, bets: [] ,area: '8 9 11 12', ratio: '1:8'},
        square7: { sumOfStagedChips: 0, bets: [] ,area: '10 11 13 14', ratio: '1:8'},
        square8: { sumOfStagedChips: 0, bets: [] ,area: '11 12 14 15', ratio: '1:8'},
        square9: { sumOfStagedChips: 0, bets: [] ,area: '13 14 16 17', ratio: '1:8'},
        square10: { sumOfStagedChips: 0, bets: [],area: '14 15 17 18', ratio: '1:8' },
        square11: { sumOfStagedChips: 0, bets: [],area: '16 17 19 20', ratio: '1:8' },
        square12: { sumOfStagedChips: 0, bets: [],area: '17 18 20 21', ratio: '1:8' },
        square13: { sumOfStagedChips: 0, bets: [],area: '19 20 22 23', ratio: '1:8' },
        square14: { sumOfStagedChips: 0, bets: [],area: '20 21 23 24', ratio: '1:8' },
        square15: { sumOfStagedChips: 0, bets: [],area: '22 23 25 26', ratio: '1:8' },
        square16: { sumOfStagedChips: 0, bets: [],area: '23 24 26 27', ratio: '1:8' },
        square17: { sumOfStagedChips: 0, bets: [],area: '25 26 28 29', ratio: '1:8' },
        square18: { sumOfStagedChips: 0, bets: [],area: '26 27 29 30', ratio: '1:8' },
        square19: { sumOfStagedChips: 0, bets: [],area: '28 29 31 32', ratio: '1:8' },
        square20: { sumOfStagedChips: 0, bets: [],area: '29 30 32 33', ratio: '1:8' },
        square21: { sumOfStagedChips: 0, bets: [],area: '31 32 34 35', ratio: '1:8' },
        square22: { sumOfStagedChips: 0, bets: [],area: '32 33 35 36', ratio: '1:8' },

        // DONE
        tri1: { sumOfStagedChips: 0, bets: [],area: '0 1 2', ratio: '1:11' },
        tri2: { sumOfStagedChips: 0, bets: [],area: '0 2 3', ratio: '1:11' },

        // DONE
        row1: { sumOfStagedChips: 0, bets: [],area: '1 4 7 10 ... 34', ratio: '1:2' },
        row2: { sumOfStagedChips: 0, bets: [],area: '2 5 8 11 ... 35', ratio: '1:2' },
        row3: { sumOfStagedChips: 0, bets: [],area: '3 6 9 12 ... 36', ratio: '1:2' },

        // DONE
        dozen1: { sumOfStagedChips: 0, bets: [],area: '1st 12', ratio: '1:2'},
        dozen2: { sumOfStagedChips: 0, bets: [],area: '2nd 12', ratio: '1:2' },
        dozen3: { sumOfStagedChips: 0, bets: [],area: '3rd 12', ratio: '1:2' },

        // DONE
        small: { sumOfStagedChips: 0, bets: [],area: '1 to 18', ratio: '1:1' },
        big: { sumOfStagedChips: 0, bets: [],area: '19 to 36', ratio: '1:1' },

        // DONE
        even: { sumOfStagedChips: 0, bets: [],area: 'Even', ratio: '1:1' },
        odd: { sumOfStagedChips: 0, bets: [],area: 'Odd', ratio: '1:1' },

        // DONE
        red: { sumOfStagedChips: 0, bets: [],area: 'Red', ratio: '1:1' },
        black: { sumOfStagedChips: 0, bets: [],area: 'Black', ratio: '1:1' }
      },
      resultStat: [],
      ovalHover: '',
      ovalHoverNumbers: [],
      celsius: {
        hot: [],
        cold: []
      },
      contentImage: {
        tr_1: '',
        tr_2: '',
        tr_3: '',
        tr_4: '',
        tr_5: '',
        tr_6: '',
        tr_7: '',
        tr_8: '',
        tr_9: '',
        tr_10: '',
        tr_11: '',
        tr_12: '',
        tr_13: '',
        tr_14: '',
        tr_15: '',
        tr_16: '',
        tr_17: '',
        tr_18: '',
        tr_19: '',
        tr_20: '',
        tr_21: '',
        tr_22: '',
        s_0: '',
        s_1: '',
        s_2: '',
        s_3: '',
        s_4: '',
        s_5: '',
        s_6: '',
        s_7: '',
        s_8: '',
        s_9: '',
        s_10: '',
        s_11: '',
        s_12: '',
        s_13: '',
        s_14: '',
        s_15: '',
        s_16: '',
        s_17: '',
        s_18: '',
        s_19: '',
        s_20: '',
        s_21: '',
        s_22: '',
        s_23: '',
        s_24: '',
        s_25: '',
        s_26: '',
        s_27: '',
        s_28: '',
        s_29: '',
        s_30: '',
        s_31: '',
        s_32: '',
        s_33: '',
        s_34: '',
        s_35: '',
        s_36: '',
        split_C_1: '',
        split_C_2: '',
        split_C_3: '',
        split_C_4: '',
        split_C_5: '',
        split_C_6: '',
        split_C_7: '',
        split_C_8: '',
        split_C_9: '',
        split_C_10: '',
        split_C_11: '',
        split_C_12: '',
        split_C_13: '',
        split_C_14: '',
        split_C_15: '',
        split_C_16: '',
        split_C_17: '',
        split_C_18: '',
        split_C_19: '',
        split_C_20: '',
        split_C_21: '',
        split_C_22: '',
        split_C_23: '',
        split_C_24: '',
        split_R_01: '',
        split_R_02: '',
        split_R_03: '',
        split_R_1: '',
        split_R_2: '',
        split_R_3: '',
        split_R_4: '',
        split_R_5: '',
        split_R_6: '',
        split_R_7: '',
        split_R_8: '',
        split_R_9: '',
        split_R_10: '',
        split_R_11: '',
        split_R_12: '',
        split_R_13: '',
        split_R_14: '',
        split_R_15: '',
        split_R_16: '',
        split_R_17: '',
        split_R_18: '',
        split_R_19: '',
        split_R_20: '',
        split_R_21: '',
        split_R_22: '',
        split_R_23: '',
        split_R_24: '',
        split_R_25: '',
        split_R_26: '',
        split_R_27: '',
        split_R_28: '',
        split_R_29: '',
        split_R_30: '',
        split_R_31: '',
        split_R_32: '',
        split_R_33: '',
        th_1: '',
        th_2: '',
        st_1: '',
        st_2: '',
        st_3: '',
        st_4: '',
        st_5: '',
        st_6: '',
        st_7: '',
        st_8: '',
        st_9: '',
        st_10: '',
        st_11: '',
        st_12: '',
        ln_1: '',
        ln_2: '',
        ln_3: '',
        ln_4: '',
        ln_5: '',
        ln_6: '',
        ln_7: '',
        ln_8: '',
        ln_9: '',
        ln_10: '',
        ln_11: '',
        fn: '',
        black: '',
        red: '',
        odd: '',
        even: '',
        bs_2: '',
        bs_1: '',
        doz_3: '',
        doz_2: '',
        doz_1: '',
        r_3: '',
        r_2: '',
        r_1: ''
      }
    }
  },
  betTableGlobal: {
    projectedAmount: 0
  },
  sideBetConfirmBets: [],

  // SECTIONS
  bet_baccarat_sections: {
    player_pair: {
      chipClass: '',
      chipImage: '',
      totalBetAmt: 0,
      totalPlayer: []
    },
    tie: {
      chipClass: '',
      chipImage: '',
      totalBetAmt: 0,
      totalPlayer: []
    },
    banker_pair: {
      chipClass: '',
      chipImage: '',
      totalBetAmt: 0,
      totalPlayer: []
    },
    player: {
      chipClass: '',
      chipImage: '',
      totalBetAmt: 0,
      totalPlayer: []
    },
    super_six: {
      chipClass: '',
      chipImage: '',
      totalBetAmt: 0,
      totalPlayer: []
    },
    banker: {
      chipClass: '',
      chipImage: '',
      totalBetAmt: 0,
      totalPlayer: []
    }
  },
  bet_dragontiger_sections: {
    dragon: {
      chipClass: '',
      chipImage: '',
      totalBetAmt: 0,
      totalPlayer: []
    },
    tiger: {
      chipClass: '',
      chipImage: '',
      totalBetAmt: 0,
      totalPlayer: []
    },
    tie: {
      chipClass: '',
      chipImage: '',
      totalBetAmt: 0,
      totalPlayer: []
    }
  },
  bet_moneywheel_sections: {
    pays_1x: {
      chipClass: '',
      chipImage: '',
      totalBetAmt: 0,
      totalPlayer: []
    },
    pays_2x: {
      chipClass: '',
      chipImage: '',
      totalBetAmt: 0,
      totalPlayer: []
    },
    pays_5x: {
      chipClass: '',
      chipImage: '',
      totalBetAmt: 0,
      totalPlayer: []
    },
    pays_10x: {
      chipClass: '',
      chipImage: '',
      totalBetAmt: 0,
      totalPlayer: []
    },
    pays_20x: {
      chipClass: '',
      chipImage: '',
      totalBetAmt: 0,
      totalPlayer: []
    },
    pays_Ogx: {
      chipClass: '',
      chipImage: '',
      totalBetAmt: 0,
      totalPlayer: []
    }
  },

  betSectionList: [
    {
      index: 'player_pair',
      name: 'Player Pair',
      nameSb: 'PP',
      ratio: '1:11',
      isActive: true,
      hasPercentage: false,
      percentage: 0
    },
    {
      index: 'tie',
      name: 'Tie',
      nameSb: 'T',
      ratio: '1:8',
      isActive: true,
      hasPercentage: true,
      percentage: 0
    },
    {
      index: 'banker_pair',
      name: 'Banker Pair',
      nameSb: 'BP',
      ratio: '1:11',
      isActive: true,
      hasPercentage: false,
      percentage: 0
    },
    {
      index: 'player',
      name: 'Player',
      nameSb: 'P',
      ratio: '1:1',
      isActive: true,
      hasPercentage: true,
      percentage: 0
    },
    {
      index: 'super_six',
      name: 'Super Six',
      nameSb: 'S6',
      ratio: '1:12',
      isActive: false,
      hasPercentage: false,
      percentage: 0
    },
    {
      index: 'banker',
      name: 'Banker',
      nameSb: 'B',
      ratio: '1:0.95',
      alterRatio: '1:1',
      isActive: true,
      hasPercentage: true,
      percentage: 0
    }
  ],
  ActiveSuperSixList: [
    {
      index: 'player_pair',
      name: 'Player Pair',
      nameSb: 'PP',
      ratio: '1:11',
      isActive: true,
      hasPercentage: false,
      percentage: 0
    },
    {
      index: 'tie',
      name: 'Tie',
      nameSb: 'T',
      ratio: '1:8',
      isActive: true,
      hasPercentage: true,
      percentage: 0
    },
    {
      index: 'banker_pair',
      name: 'Banker Pair',
      nameSb: 'BP',
      ratio: '1:11',
      isActive: true,
      hasPercentage: false,
      percentage: 0
    },
    {
      index: 'player',
      name: 'Player',
      nameSb: 'P',
      ratio: '1:1',
      isActive: true,
      hasPercentage: true,
      percentage: 0
    },
    {
      index: 'super_six',
      name: 'Super Six',
      nameSb: 'S6',
      ratio: '1:12',
      isActive: true,
      hasPercentage: true,
      percentage: 0
    },
    {
      index: 'banker',
      name: 'Banker',
      nameSb: 'B',
      ratio: '1:1',
      isActive: true,
      hasPercentage: true,
      percentage: 0
    }
  ],
  betSectionListMW: [
    {
      index: 'pays_1x',
      name: 'Pays 1x',
      totalBetAmt: 0,
      totalPlayer: 0
    },
    {
      index: 'pays_2x',
      name: 'Pays 2x',
      totalBetAmt: 0,
      totalPlayer: 0
    },
    {
      index: 'pays_5x',
      name: 'Pays 5x',
      totalBetAmt: 0,
      totalPlayer: 0
    },
    {
      index: 'pays_10x',
      name: 'Pays 10x',
      totalBetAmt: 0,
      totalPlayer: 0
    },
    {
      index: 'pays_20x',
      name: 'Pays 20x',
      totalBetAmt: 0,
      totalPlayer: 0
    },
    {
      index: 'pays_Ogx',
      name: 'Pays OG',
      totalBetAmt: 0,
      totalPlayer: 0
    }
  ],
  betSectionListDT: [
    {
      index: 'dragon',
      name: 'Dragon',
      ratio: '1:1',
      hasPercentage: true,
      percentage: 0
    },
    {
      index: 'tie',
      name: 'Tie',
      ratio: '1:8',
      hasPercentage: true,
      percentage: 0
    },
    {
      index: 'tiger',
      name: 'Tiger',
      ratio: '1:1',
      hasPercentage: true,
      percentage: 0
    }
  ],

  stacking_dragontiger_bets: {
    dragon: [],
    tiger: [],
    tie: []
  },
  stacking_moneywheel_bets: {
    pays_1x: [],
    pays_2x: [],
    pays_5x: [],
    pays_10x: [],
    pays_20x: [],
    pays_Ogx: []
  },
  stacking_baccarat_bets: {
    player_pair: [],
    tie: [],
    super_six: [],
    banker_pair: [],
    player: [],
    banker: []
  },

  betting_moneywheel_totals: {
    pays_1x: 0,
    pays_2x: 0,
    pays_5x: 0,
    pays_10x: 0,
    pays_20x: 0,
    pays_Ogx: 0
  },
  betting_baccarat_totals: {
    banker: 0,
    player: 0,
    tie: 0,
    player_pair: 0,
    super_six: 0,
    banker_pair: 0
  },
  betting_dragontiger_totals: {
    dragon: 0,
    tiger: 0,
    tie: 0
  },
  sb_betSectionListDT: [
    {
      index: 'tie',
      name: 'Tie',
      nameSb: 'TIE',
      ratio: '1:8'
    },
    {
      index: 'dragon',
      name: 'Dragon',
      nameSb: 'D',
      ratio: '1:1'
    },
    {
      index: 'tiger',
      name: 'Tiger',
      nameSb: 'T',
      ratio: '1:1'
    }
  ],
  sidebar_betting: {
    P1: {},
    P2: {},
    P3: {},
    P4: {},
    P5: {},
    P6: {},
    P7: {},
    P8: {},
    P9: {},
    P10: {},
    P11: {},
    P12: {},
    E1: {},
    E2: {},
    E3: {},
    E5: {},
    M1: {},
    M2: {}
  },
  sidebar_winresult: {
    P1: 0,
    P2: 0,
    P3: 0,
    P4: 0,
    P5: 0,
    P6: 0,
    P7: 0,
    P8: 0,
    P9: 0,
    P10: 0,
    P11: 0,
    P12: 0,
    E1: 0,
    E2: 0,
    E3: 0,
    E5: 0,
    M1: 0,
    M2: 0
  },
  win_loss: {
    P1: {},
    P2: {},
    P3: {},
    P4: {},
    P5: {},
    P6: {},
    P7: {},
    P8: {},
    P9: {},
    P10: {},
    P11: {},
    P12: {},
    E1: {},
    E2: {},
    E3: {},
    E5: {},
    M1: {},
    M2: {}
  },
  sidebar_betSuccess: {
    P1: {},
    P2: {},
    P3: {},
    P4: {},
    P5: {},
    P6: {},
    P7: {},
    P8: {},
    P9: {},
    P10: {},
    P11: {},
    P12: {},
    E1: {},
    E2: {},
    E3: {},
    E5: {},
    M1: {},
    M2: {}
  },
  /*
     _____               .___        .__
    /     \    ____    __| _/_____   |  |
   /  \ /  \  /  _ \  / __ | \__  \  |  |
  /    Y    \(  <_> )/ /_/ |  / __ \_|  |__
  \____|__  / \____/ \____ | (____  /|____/
          \/              \/      \/
   */
  chatModal: false,
  avatarModal: false,
  settingModal: false,
  rankModal: false,
  socialModal: false,
  reportModal: false,
  recordModal: false,
  rrModal: false,
  chipModal: false,
  snackbar: '',
  snackbarnotification: '',
  giftModal: false,
  giftModalName: '',
  storeModal: false,

  /*
  ___________.__ .__    __
  \_   _____/|__||  | _/  |_   ____ _______
   |    __)  |  ||  | \   __\_/ __ \\_  __ \
   |     \   |  ||  |__|  |  \  ___/ |  | \/
   \___  /   |__||____/|__|   \___  >|__|
       \/                         \/
   */
  filters: {
    gamelist: [
      {
        name: 'Baccarat',
        code: 'baccarat',
        subcode: '',
        icon: 'baccarat',
        scaleIcon: '2.5',
        isActive: true,
        isDisabled: false
      },
      {
        name: 'Dragon Tiger',
        code: 'dragontiger',
        subcode: '',
        icon: 'dragontiger',
        scaleIcon: '2.5',
        isActive: true,
        isDisabled: false
      },
      {
        name: 'Roulette',
        code: 'roulette',
        subcode: '',
        icon: 'roulette',
        scaleIcon: '2.5',
        isActive: true,
        isDisabled: false
      },
      {
        name: 'MoneyWheel',
        code: 'moneywheel',
        subcode: '',
        icon: 'moneywheel',
        scaleIcon: '2.5',
        isActive: true,
        isDisabled: false
      },
      {
        name: 'Niuniu',
        code: 'niuniu',
        subcode: '',
        icon: 'niuniu',
        scaleIcon: '2.1',
        isActive: true,
        isDisabled: false
      },
      {
        name: '3cards',
        code: 'threecards',
        subcode: '',
        icon: '3cards',
        scaleIcon: '2.1',
        isActive: true,
        isDisabled: false
      },
      {
        name: 'streamer',
        code: 'streamer',
        subcode: '',
        icon: 'livestream',
        scaleIcon: '2.5',
        isActive: true,
        isDisabled: false
      }
      // {
      //   name: 'Keno',
      //   code: 'keno',
      //   subcode: '',
      //   icon: 'moneywheel',
      //   isActive: false
      // }
      // {
      //   name: 'Emcee Bacc',
      //   code: 'emcee',
      //   isActive: false
      // },
      // {
      //   name: 'VIP',
      //   code: 'vip',
      //   isActive: false
      // }
    ]
  },
  chipLocale: {
    tr_1: 'square1',
    tr_2: 'square2',
    tr_3: 'square3',
    tr_4: 'square4',
    tr_5: 'square5',
    tr_6: 'square6',
    tr_7: 'square7',
    tr_8: 'square8',
    tr_9: 'square9',
    tr_10: 'square10',
    tr_11: 'square11',
    tr_12: 'square12',
    tr_13: 'square13',
    tr_14: 'square14',
    tr_15: 'square15',
    tr_16: 'square16',
    tr_17: 'square17',
    tr_18: 'square18',
    tr_19: 'square19',
    tr_20: 'square20',
    tr_21: 'square21',
    tr_22: 'square22',

    s_0: 's0',
    s_1: 's1',
    s_2: 's2',
    s_3: 's3',
    s_4: 's4',
    s_5: 's5',
    s_6: 's6',
    s_7: 's7',
    s_8: 's8',
    s_9: 's9',
    s_10: 's10',
    s_11: 's11',
    s_12: 's12',
    s_13: 's13',
    s_14: 's14',
    s_15: 's15',
    s_16: 's16',
    s_17: 's17',
    s_18: 's18',
    s_19: 's19',
    s_20: 's20',
    s_21: 's21',
    s_22: 's22',
    s_23: 's23',
    s_24: 's24',
    s_25: 's25',
    s_26: 's26',
    s_27: 's27',
    s_28: 's28',
    s_29: 's29',
    s_30: 's30',
    s_31: 's31',
    s_32: 's32',
    s_33: 's33',
    s_34: 's34',
    s_35: 's35',
    s_36: 's36',

    split_C_1: 'near1',
    split_C_2: 'near2',
    split_C_3: 'near3',
    split_C_4: 'near4',
    split_C_5: 'near5',
    split_C_6: 'near6',
    split_C_7: 'near7',
    split_C_8: 'near8',
    split_C_9: 'near9',
    split_C_10: 'near10',
    split_C_11: 'near11',
    split_C_12: 'near12',
    split_C_13: 'near13',
    split_C_14: 'near14',
    split_C_15: 'near15',
    split_C_16: 'near16',
    split_C_17: 'near17',
    split_C_18: 'near18',
    split_C_19: 'near19',
    split_C_20: 'near20',
    split_C_21: 'near21',
    split_C_22: 'near22',
    split_C_23: 'near23',
    split_C_24: 'near24',

    split_R_01: 'zero1',
    split_R_02: 'zero2',
    split_R_03: 'zero3',

    split_R_1: 'split1',
    split_R_2: 'split2',
    split_R_3: 'split3',
    split_R_4: 'split4',
    split_R_5: 'split5',
    split_R_6: 'split6',
    split_R_7: 'split7',
    split_R_8: 'split8',
    split_R_9: 'split9',
    split_R_10: 'split10',
    split_R_11: 'split11',
    split_R_12: 'split12',
    split_R_13: 'split13',
    split_R_14: 'split14',
    split_R_15: 'split15',
    split_R_16: 'split16',
    split_R_17: 'split17',
    split_R_18: 'split18',
    split_R_19: 'split19',
    split_R_20: 'split20',
    split_R_21: 'split21',
    split_R_22: 'split22',
    split_R_23: 'split23',
    split_R_24: 'split24',
    split_R_25: 'split25',
    split_R_26: 'split26',
    split_R_27: 'split27',
    split_R_28: 'split28',
    split_R_29: 'split29',
    split_R_30: 'split30',
    split_R_31: 'split31',
    split_R_32: 'split32',
    split_R_33: 'split33',

    th_1: 'tri1',
    th_2: 'tri2',

    st_1: 'street1',
    st_2: 'street2',
    st_3: 'street3',
    st_4: 'street4',
    st_5: 'street5',
    st_6: 'street6',
    st_7: 'street7',
    st_8: 'street8',
    st_9: 'street9',
    st_10: 'street10',
    st_11: 'street11',
    st_12: 'street12',

    fn: 'line0',
    ln_1: 'line1',
    ln_2: 'line2',
    ln_3: 'line3',
    ln_4: 'line4',
    ln_5: 'line5',
    ln_6: 'line6',
    ln_7: 'line7',
    ln_8: 'line8',
    ln_9: 'line9',
    ln_10: 'line10',
    ln_11: 'line11',

    black: 'black',
    red: 'red',

    odd: 'odd',
    even: 'even',

    bs_2: 'big',
    bs_1: 'small',

    doz_3: 'dozen3',
    doz_2: 'dozen2',
    doz_1: 'dozen1',

    r_3: 'row3',
    r_2: 'row2',
    r_1: 'row1'
  },

  /*
  _________  .__              __
  \_   ___ \ |  |__  _____  _/  |_
  /    \  \/ |  |  \ \__  \ \   __\
  \     \____|   Y  \ / __ \_|  |
   \______  /|___|  /(____  /|__|
          \/      \/      \/
   */
  chatNewMessage: false,
  thread: [],

  /*
  .___                    ________
  |   |  ____            /  _____/ _____     _____    ____
  |   | /    \   ______ /   \  ___ \__  \   /     \ _/ __ \
  |   ||   |  \ /_____/ \    \_\  \ / __ \_|  Y Y  \\  ___/
  |___||___|  /          \______  /(____  /|__|_|  / \___  >
            \/                  \/      \/       \/      \/
  States for In-Game
   */
  RoadInGame: {
    beadRoad: {
      canvass: [],
      lastResult: {},
      list: []
    },
    bigRoad: {
      canvass: [],
      lastResult: {},
      list: []
    },
    bigEyeRoad: {
      canvass: [],
      lastResult: {}
    },
    smallRoad: {
      canvass: [],
      lastResult: {}
    },
    cockroachRoad: {
      canvass: [],
      lastResult: {}
    },
    statistic: {
      predict: {
        blue: { bigEyeRoad: '', smallRoad: '', cockroachRoad: '' },
        red: { bigEyeRoad: '', smallRoad: '', cockroachRoad: ''}
      },
      demographic: {
        beadRoad: { blue: 0, red: 0, green: 0, blue_pair: 0, red_pair: 0, green_pair: 0, s6: 0 },
        bigRoad: { blue: 0, red: 0, green: 0, blue_pair: 0, red_pair: 0, green_pair: 0, s6: 0 }
      },
      isRoadEmpty: {
        bigRoad: false
      }
    }
  },
  RoadInGame_DEFAULT: '{"beadRoad":{"canvass":[],"lastResult":{},"list":[]},"bigRoad":{"canvass":[],"lastResult":{},"list":[]},"bigEyeRoad":{"canvass":[],"lastResult":{}},"smallRoad":{"canvass":[],"lastResult":{}},"cockroachRoad":{"canvass":[],"lastResult":{}},"statistic":{"predict":{"blue":{"bigEyeRoad":"","smallRoad":"","cockroachRoad":""},"red":{"bigEyeRoad":"","smallRoad":"","cockroachRoad":""}},"demographic":{"beadRoad":{"blue":0,"red":0,"green":0,"blue_pair":0,"red_pair":0,"green_pair":0,"s6":0},"bigRoad":{"blue":0,"red":0,"green":0,"blue_pair":0,"red_pair":0,"green_pair":0,"s6":0}},"isRoadEmpty":{"bigRoad":false}}}',
  predictOpen: false,
  /*
  _________
  \_   ___ \   ____    _____    _____    ____    ____
  /    \  \/  /  _ \  /     \  /     \  /  _ \  /    \
  \     \____(  <_> )|  Y Y  \|  Y Y  \(  <_> )|   |  \
   \______  / \____/ |__|_|  /|__|_|  / \____/ |___|  /
          \/               \/       \/              \/
   */
  tablelist: {},
  GAME_APP_WS: {},
  streamerlist: [],
  liveGame: ['P', 'E', 'M'],
  isOffline: false,
  OfflineText: '',
  currentTableInfo: null,
  currentTableIndex: null,
  drawerWidth: 80,
  loadstat: false,
  cardSHOWnobet: true,
  currentFlipped: {
    gameEnd: false,
    p1: false,
    p2: false,
    p3: false,
    b1: false,
    b2: false,
    b3: false,
    t: false,
    d: false,
    thirdCard: false,
    isSqueezeFlips: false,
    squeezeStatus: '',
    isFlipped: {
      left: [false, false, false],
      right: [false, false, false]
    },
    cardsItem: {
      left: ['','',''],
      right: ['','','']
    }
  },
  currenttab: 'baccarat',
  contentfromwinningstreak: [],
  dealerfollowers: 0,
  lobbymessage: '',
  inGameUser: [],
  goodTipsTblFinal: [],
  tabIndex: '',
  socketio: [],
  cardValues: {},
  isLobby: true,
  isStreamer: false,
  isNiuniu: false,
  is3Cards: false,
  isSideBet: false,
  time: '',
  progscreen: 0,
  progscreencount: 0,
  isSideBarConfirm: false,
  flvPlayer: null,
  flvjs: null,
  withchat: 0,
  soundfx: 1,
  liveSoundSwitch: '',
  volumestreamer: '',
  vid_stream: '',
  chatSwitch: true,
  ismusicactive: true,
  stream: '',
  islivesoundactive: '',
  videoSwitch: true,
  musicSwitch: '',
  isFullscreen: false,
  soundFxSwitch: true,
  roadmapbac: 'black',
  blackRoadMapSelected: false,
  flagSelected: false,
  locale: localStorage._locale || 'en',
  liveSlider: 0,
  musicSlider: 0,
  lobbyTable: '',
  fxSlider: 100,
  setmute: true,
  isNightmode: false,
  with_chat_enable: false,
  game_settings: {
    music: true
  },
  defaultFlag: 'https://static.oriental-game.com/flags/en_normal.png',
  noImg: 'https://static.oriental-game.com/image/no-image.png',
  errorImg: 'https://static.oriental-game.com/image/error-img.jpg',
  noFlag: 'https://static.oriental-game.com/flags/error.png',
  loader: 'https://static.oriental-game.com/audio/loader.gif',
  sideBarNotif: false,
  sideBarMsg: '',
  flags: [
    {
      is_selected: false,
      code: 'cn',
      url: 'https://static.oriental-game.com/flags/ch_normal.png',
      url_selected: 'https://static.oriental-game.com/flags/selected/ch_selected.png'
    },
    {
      is_selected: false,
      code: 'en',
      url: 'https://static.oriental-game.com/flags/en_normal.png',
      url_selected: 'https://static.oriental-game.com/flags/selected/en_selected.png'
    },
    {
      is_selected: false,
      code: 'jp',
      url: 'https://static.oriental-game.com/flags/jp_normal.png',
      url_selected: 'https://static.oriental-game.com/flags/selected/jp_selected.png'
    },
    {
      is_selected: false,
      code: 'ko',
      url: 'https://static.oriental-game.com/flags/kr_normal.png',
      url_selected: 'https://static.oriental-game.com/flags/selected/kr_selected.png'
    },
    {
      is_selected: false,
      code: 'vn',
      url: 'https://static.oriental-game.com/flags/vn_normal.png',
      url_selected: 'https://static.oriental-game.com/flags/selected/vn_selected.png'
    },
    {
      is_selected: false,
      code: 'th',
      url: 'https://static.oriental-game.com/flags/th_normal.png',
      url_selected: 'https://static.oriental-game.com/flags/selected/th_selected.png'
    },
    {
      is_selected: false,
      code: 'id',
      url: 'https://static.oriental-game.com/flags/id_normal.png',
      url_selected: 'https://static.oriental-game.com/flags/selected/id_selected.png'
    }
  ],
  mobile: {
    chat: true,
    lang: 'en',
    live_sound: true,
    music: false,
    roadMapTheme: 'black',
    sfx: true,
    video: true,
  },
  audiosprite: {
    state: false
  },
  audio: {
    en: {
      bet_suc: 'https://static.oriental-game.com/audio/common/en/bet_successful.mp3'
    },
    ch: {
      bet_suc: 'https://static.oriental-game.com/audio/common/zh/bet_successful.mp3'
    },
    results: {
      player: '',
      banker: '',
      winningResult: ''
    },
    buttonclick: 'https://static.oriental-game.com/audio/baccarat/en/buttonclick.mp3',
    chipselect: 'https://static.oriental-game.com/audio/baccarat/en/chipselect.mp3',
    timerticker: 'https://static.oriental-game.com/audio/timerticker.mp3',
    betendring: 'https://static.oriental-game.com/audio/baccarat/en/betendring.mp3',
    moneywheel: {
      en: {
        1: 'https://static.oriental-game.com/audio/en_onewins.mp3',
        2: 'https://static.oriental-game.com/audio/en_twowins.mp3',
        5: 'https://static.oriental-game.com/audio/en_fivewins.mp3',
        10: 'https://static.oriental-game.com/audio/en_tenwins.mp3',
        20: 'https://static.oriental-game.com/audio/en_twentywins.mp3',
        og: 'https://static.oriental-game.com/audio/en_OGwins.mp3',
        spinningwheel: 'https://static.oriental-game.com/audio/en_spinningwheel.mp3'
      },
      cn: {
        1: 'https://static.oriental-game.com/audio/cn_onewins.mp3',
        2: 'https://static.oriental-game.com/audio/cn_twowins.mp3',
        5: 'https://static.oriental-game.com/audio/cn_fivewins.mp3',
        10: 'https://static.oriental-game.com/audio/cn_tenwins.mp3',
        20: 'https://static.oriental-game.com/audio/cn_twentywins.mp3',
        og: 'https://static.oriental-game.com/audio/cn_OGwins.mp3',
        spinningwheel: 'https://static.oriental-game.com/audio/cn_spinningwheel.mp3'
      }
    },
    dragontiger: {
      en: {
        dragon: {
          0: 'https://static.oriental-game.com/audio/dragontiger/en/dragon0.mp3',
          1: 'https://static.oriental-game.com/audio/dragontiger/en/dragon1.mp3',
          2: 'https://static.oriental-game.com/audio/dragontiger/en/dragon2.mp3',
          3: 'https://static.oriental-game.com/audio/dragontiger/en/dragon3.mp3',
          4: 'https://static.oriental-game.com/audio/dragontiger/en/dragon4.mp3',
          5: 'https://static.oriental-game.com/audio/dragontiger/en/dragon5.mp3',
          6: 'https://static.oriental-game.com/audio/dragontiger/en/dragon6.mp3',
          7: 'https://static.oriental-game.com/audio/dragontiger/en/dragon7.mp3',
          8: 'https://static.oriental-game.com/audio/dragontiger/en/dragon8.mp3',
          9: 'https://static.oriental-game.com/audio/dragontiger/en/dragon9.mp3',
          10: 'https://static.oriental-game.com/audio/dragontiger/en/dragon10.mp3',
          11: 'https://static.oriental-game.com/audio/dragontiger/en/dragon11.mp3',
          12: 'https://static.oriental-game.com/audio/dragontiger/en/dragon12.mp3',
          13: 'https://static.oriental-game.com/audio/dragontiger/en/dragon13.mp3'
        },
        tiger: {
          0: 'https://static.oriental-game.com/audio/dragontiger/en/tiger0.mp3',
          1: 'https://static.oriental-game.com/audio/dragontiger/en/tiger1.mp3',
          2: 'https://static.oriental-game.com/audio/dragontiger/en/tiger2.mp3',
          3: 'https://static.oriental-game.com/audio/dragontiger/en/tiger3.mp3',
          4: 'https://static.oriental-game.com/audio/dragontiger/en/tiger4.mp3',
          5: 'https://static.oriental-game.com/audio/dragontiger/en/tiger5.mp3',
          6: 'https://static.oriental-game.com/audio/dragontiger/en/tiger6.mp3',
          7: 'https://static.oriental-game.com/audio/dragontiger/en/tiger7.mp3',
          8: 'https://static.oriental-game.com/audio/dragontiger/en/tiger8.mp3',
          9: 'https://static.oriental-game.com/audio/dragontiger/en/tiger9.mp3',
          10: 'https://static.oriental-game.com/audio/dragontiger/en/tiger10.mp3',
          11: 'https://static.oriental-game.com/audio/dragontiger/en/tiger11.mp3',
          12: 'https://static.oriental-game.com/audio/dragontiger/en/tiger12.mp3',
          13: 'https://static.oriental-game.com/audio/dragontiger/en/tiger13.mp3'
        },
        dwin: 'https://static.oriental-game.com/audio/dragontiger/en/dwin.mp3',
        twin: 'https://static.oriental-game.com/audio/dragontiger/en/twin.mp3'
      },
      ch: {
        dragon: {
          0: 'https://static.oriental-game.com/audio/dragontiger/zh/dragon0.mp3',
          1: 'https://static.oriental-game.com/audio/dragontiger/zh/dragon1.mp3',
          2: 'https://static.oriental-game.com/audio/dragontiger/zh/dragon2.mp3',
          3: 'https://static.oriental-game.com/audio/dragontiger/zh/dragon3.mp3',
          4: 'https://static.oriental-game.com/audio/dragontiger/zh/dragon4.mp3',
          5: 'https://static.oriental-game.com/audio/dragontiger/zh/dragon5.mp3',
          6: 'https://static.oriental-game.com/audio/dragontiger/zh/dragon6.mp3',
          7: 'https://static.oriental-game.com/audio/dragontiger/zh/dragon7.mp3',
          8: 'https://static.oriental-game.com/audio/dragontiger/zh/dragon8.mp3',
          9: 'https://static.oriental-game.com/audio/dragontiger/zh/dragon9.mp3',
          10: 'https://static.oriental-game.com/audio/dragontiger/zh/dragon10.mp3',
          11: 'https://static.oriental-game.com/audio/dragontiger/zh/dragon11.mp3',
          12: 'https://static.oriental-game.com/audio/dragontiger/zh/dragon12.mp3',
          13: 'https://static.oriental-game.com/audio/dragontiger/zh/dragon13.mp3'
        },
        tiger: {
          0: 'https://static.oriental-game.com/audio/dragontiger/zh/tiger0.mp3',
          1: 'https://static.oriental-game.com/audio/dragontiger/zh/tiger1.mp3',
          2: 'https://static.oriental-game.com/audio/dragontiger/zh/tiger2.mp3',
          3: 'https://static.oriental-game.com/audio/dragontiger/zh/tiger3.mp3',
          4: 'https://static.oriental-game.com/audio/dragontiger/zh/tiger4.mp3',
          5: 'https://static.oriental-game.com/audio/dragontiger/zh/tiger5.mp3',
          6: 'https://static.oriental-game.com/audio/dragontiger/zh/tiger6.mp3',
          7: 'https://static.oriental-game.com/audio/dragontiger/zh/tiger7.mp3',
          8: 'https://static.oriental-game.com/audio/dragontiger/zh/tiger8.mp3',
          9: 'https://static.oriental-game.com/audio/dragontiger/zh/tiger9.mp3',
          10: 'https://static.oriental-game.com/audio/dragontiger/zh/tiger10.mp3',
          11: 'https://static.oriental-game.com/audio/dragontiger/zh/tiger11.mp3',
          12: 'https://static.oriental-game.com/audio/dragontiger/zh/tiger12.mp3',
          13: 'https://static.oriental-game.com/audio/dragontiger/zh/tiger13.mp3'
        },
        dwin: 'https://static.oriental-game.com/audio/dragontiger/zh/dwin.mp3',
        twin: 'https://static.oriental-game.com/audio/dragontiger/zh/twin.mp3'
      }
    },
    baccarat: {
      en: {
        banker: {
          0: 'https://static.oriental-game.com/audio/baccarat/en/banker0.mp3',
          1: 'https://static.oriental-game.com/audio/baccarat/en/banker1.mp3',
          2: 'https://static.oriental-game.com/audio/baccarat/en/banker2.mp3',
          3: 'https://static.oriental-game.com/audio/baccarat/en/banker3.mp3',
          4: 'https://static.oriental-game.com/audio/baccarat/en/banker4.mp3',
          5: 'https://static.oriental-game.com/audio/baccarat/en/banker5.mp3',
          6: 'https://static.oriental-game.com/audio/baccarat/en/banker6.mp3',
          7: 'https://static.oriental-game.com/audio/baccarat/en/banker7.mp3',
          8: 'https://static.oriental-game.com/audio/baccarat/en/banker8.mp3',
          9: 'https://static.oriental-game.com/audio/baccarat/en/banker9.mp3'
        },
        bb: 'https://static.oriental-game.com/audio/baccarat/en/bb.mp3',
        bwin: 'https://static.oriental-game.com/audio/baccarat/en/bwin.mp3',
        player: {
          0: 'https://static.oriental-game.com/audio/baccarat/en/player0.mp3',
          1: 'https://static.oriental-game.com/audio/baccarat/en/player1.mp3',
          2: 'https://static.oriental-game.com/audio/baccarat/en/player2.mp3',
          3: 'https://static.oriental-game.com/audio/baccarat/en/player3.mp3',
          4: 'https://static.oriental-game.com/audio/baccarat/en/player4.mp3',
          5: 'https://static.oriental-game.com/audio/baccarat/en/player5.mp3',
          6: 'https://static.oriental-game.com/audio/baccarat/en/player6.mp3',
          7: 'https://static.oriental-game.com/audio/baccarat/en/player7.mp3',
          8: 'https://static.oriental-game.com/audio/baccarat/en/player8.mp3',
          9: 'https://static.oriental-game.com/audio/baccarat/en/player9.mp3'
        },
        pp: 'https://static.oriental-game.com/audio/baccarat/en/pp.mp3',
        pwin: 'https://static.oriental-game.com/audio/baccarat/en/pwin.mp3',
        tie: 'https://static.oriental-game.com/audio/baccarat/en/tie.mp3',
        winningChips: 'https://static.oriental-game.com/audio/baccarat/en/winningChips.mp3',
        betend: 'https://static.oriental-game.com/audio/baccarat/en/betend.mp3',
        betstart: 'https://static.oriental-game.com/audio/baccarat/en/betstart.mp3',
        nobet: 'https://static.oriental-game.com/audio/baccarat/en/nobet.mp3'
      },
      ch: {
        banker: {
          0: 'https://static.oriental-game.com/audio/baccarat/zh/banker0.mp3',
          1: 'https://static.oriental-game.com/audio/baccarat/zh/banker1.mp3',
          2: 'https://static.oriental-game.com/audio/baccarat/zh/banker2.mp3',
          3: 'https://static.oriental-game.com/audio/baccarat/zh/banker3.mp3',
          4: 'https://static.oriental-game.com/audio/baccarat/zh/banker4.mp3',
          5: 'https://static.oriental-game.com/audio/baccarat/zh/banker5.mp3',
          6: 'https://static.oriental-game.com/audio/baccarat/zh/banker6.mp3',
          7: 'https://static.oriental-game.com/audio/baccarat/zh/banker7.mp3',
          8: 'https://static.oriental-game.com/audio/baccarat/zh/banker8.mp3',
          9: 'https://static.oriental-game.com/audio/baccarat/zh/banker9.mp3'
        },
        bb: 'https://static.oriental-game.com/audio/baccarat/zh/bb.mp3',
        bwin: 'https://static.oriental-game.com/audio/baccarat/zh/bwin.mp3',
        player: {
          0: 'https://static.oriental-game.com/audio/baccarat/zh/player0.mp3',
          1: 'https://static.oriental-game.com/audio/baccarat/zh/player1.mp3',
          2: 'https://static.oriental-game.com/audio/baccarat/zh/player2.mp3',
          3: 'https://static.oriental-game.com/audio/baccarat/zh/player3.mp3',
          4: 'https://static.oriental-game.com/audio/baccarat/zh/player4.mp3',
          5: 'https://static.oriental-game.com/audio/baccarat/zh/player5.mp3',
          6: 'https://static.oriental-game.com/audio/baccarat/zh/player6.mp3',
          7: 'https://static.oriental-game.com/audio/baccarat/zh/player7.mp3',
          8: 'https://static.oriental-game.com/audio/baccarat/zh/player8.mp3',
          9: 'https://static.oriental-game.com/audio/baccarat/zh/player9.mp3'
        },
        pp: 'https://static.oriental-game.com/audio/baccarat/zh/pp.mp3',
        pwin: 'https://static.oriental-game.com/audio/baccarat/zh/pwin.mp3',
        tie: 'https://static.oriental-game.com/audio/baccarat/zh/tie.mp3',
        winningChips: 'https://static.oriental-game.com/audio/baccarat/zh/winningChips.mp3',
        betend: 'https://static.oriental-game.com/audio/baccarat/zh/betend.mp3',
        betstart: 'https://static.oriental-game.com/audio/baccarat/zh/betstart.mp3',
        nobet: 'https://static.oriental-game.com/audio/baccarat/zh/nobet.mp3'
      }
    }
  },
  tables: [],
  socketJoined: 0,
  mainWS: null,
  notifs: {
    show: false,
    active: {},
    stack: [], // { message: [String], color: [String], priority: [Integer], delay: [Integer] }
    y: 'top',
    x: null,
    mode: 'vertical',
    debounce: null,
    lastMsg: null,
    coolDown: 50,
    hideDelay: 1500
  },
  haltedTbl: {
    list: [],
    info: {}
  },
  betRankData: {},
  promptCat: [],
  percentLoad: 1,
  totalOnTableBet: 0,
  playerLocation: {},

  /*
  ___________.__
  \_   _____/|  |  _____     ____   ______
   |    __)  |  |  \__  \   / ___\ /  ___/
   |     \   |  |__ / __ \_/ /_/  >\___ \
   \___  /   |____/(____  /\___  //____  >
       \/               \//_____/      \/
   */
  isInitialized: false,
  isConfirm: false,
  hideTabOnLobby: false,
  retryConnTimes: 0,
  preload: false,
  isBusy: false,
  theme: {
    og: true,
    manbetx: false
  },
  streamer: {
    isInGame: false,
    tableNumber: null
  },
  roulette: {
    road: {
      class: ''
    }
  },
  currentStreamerTable: 'E3',
  updateFeeds: {
    follower: {
      dealer: {},
      user: {}
    }
  },
  kickOutCtr: 0,
  tabId: "",



  /*
    ________                           _________                            __                    __
   /  _____/ _____     _____    ____   \_   ___ \   ____    ____    _______/  |_ _____     ____ _/  |_
  /   \  ___ \__  \   /     \ _/ __ \  /    \  \/  /  _ \  /    \  /  ___/\   __\\__  \   /    \\   __\
  \    \_\  \ / __ \_|  Y Y  \\  ___/  \     \____(  <_> )|   |  \ \___ \  |  |   / __ \_|   |  \|  |
   \______  /(____  /|__|_|  / \___  >  \______  / \____/ |___|  //____  > |__|  (____  /|___|  /|__|
          \/      \/       \/      \/          \/              \/      \/             \/      \/
  */
  MIN_BALANCE_TO_ENTER: 10,
  MIN_BET_TO_CHAT: 100,
  MAX_CHAT_LENGTH: 50,
  customChipsValue: 1000,
  tempcustomChipsValue: 1000,
  maxChipValue: 10000,
  maxdigitvalue: 99999999,
  tempmaxdigitvalue: 99999999,
  tableMinBalance: 10,
  minChipValue: 20,
  maxTieValue: 100,
  minTieValue: 1,
  maxPairValue: 100,
  minPairValue: 1,
  chipvalues: 1000,
  ROULETTE_AREA: {
    s36: [36],
    s35: [35],
    s34: [34],
    s33: [33],
    s32: [32],
    s31: [31],
    s30: [30],
    s29: [29],
    s28: [28],
    s27: [27],
    s26: [26],
    s25: [25],
    s24: [24],
    s23: [23],
    s22: [22],
    s21: [21],
    s20: [20],
    s19: [19],
    s18: [18],
    s17: [17],
    s16: [16],
    s15: [15],
    s14: [14],
    s13: [13],
    s12: [12],
    s11: [11],
    s10: [10],
    s9: [9],
    s8: [8],
    s7: [7],
    s6: [6],
    s5: [5],
    s4: [4],
    s3: [3],
    s2: [2],
    s1: [1],
    s0: [0],
    near24: [35, 36],
    near23: [34, 35],
    near22: [32, 33],
    near21: [31, 32],
    near20: [29, 30],
    near19: [28, 29],
    near18: [26, 27],
    near17: [25, 26],
    near16: [23, 24],
    near15: [22, 23],
    near14: [20, 21],
    near13: [19, 20],
    near12: [17, 18],
    near11: [16, 17],
    near10: [14, 15],
    near9: [13, 14],
    near8: [11, 12],
    near7: [10, 11],
    near6: [8, 9],
    near5: [7, 8],
    near4: [5, 6],
    near3: [4, 5],
    near2: [2, 3],
    near1: [1, 2],
    split33: [33, 36],
    split32: [32, 35],
    split31: [31, 34],
    split30: [30, 33],
    split29: [29, 32],
    split28: [28, 31],
    split27: [27, 30],
    split26: [26, 29],
    split25: [25, 28],
    split24: [24, 27],
    split23: [23, 26],
    split22: [22, 25],
    split21: [21, 24],
    split20: [20, 23],
    split19: [19, 22],
    split18: [18, 21],
    split17: [17, 20],
    split16: [16, 19],
    split15: [15, 18],
    split14: [14, 17],
    split13: [13, 16],
    split12: [12, 15],
    split11: [11, 14],
    split10: [10, 13],
    split9: [9, 12],
    split8: [8, 11],
    split7: [7, 10],
    split6: [6, 9],
    split5: [5, 8],
    split4: [4, 7],
    split3: [3, 6],
    split2: [2, 5],
    split1: [1, 4],
    zero1: [0, 1],
    zero2: [0, 2],
    zero3: [0, 3],
    square22: [32, 33, 35, 36],
    square21: [31, 32, 34, 35],
    square20: [29, 30, 32, 33],
    square19: [28, 29, 31, 32],
    square18: [26, 27, 29, 30],
    square17: [25, 26, 28, 29],
    square16: [23, 24, 26, 27],
    square15: [22, 23, 25, 26],
    square14: [20, 21, 23, 24],
    square13: [19, 20, 22, 23],
    square12: [17, 18, 20, 21],
    square11: [16, 17, 19, 20],
    square10: [14, 15, 17, 18],
    square9: [13, 14, 16, 17],
    square8: [11, 12, 14, 15],
    square7: [10, 11, 13, 14],
    square6: [8, 9, 11, 12],
    square5: [7, 8, 10, 11],
    square4: [5, 6, 8, 9],
    square3: [4, 5, 7, 8],
    square2: [2, 3, 5, 6],
    square1: [1, 2, 4, 5],
    tri2: [0, 2, 3],
    tri1: [0, 1, 2],
    street12: [34, 35, 36],
    street11: [31, 32, 33],
    street10: [28, 29, 30],
    street9: [25, 26, 27],
    street8: [22, 23, 24],
    street7: [19, 20, 21],
    street6: [16, 17, 18],
    street5: [13, 14, 15],
    street4: [10, 11, 12],
    street3: [7, 8, 9],
    street2: [4, 5, 6],
    street1: [3, 2, 1],
    line11: [31, 32, 33, 34, 35, 36],
    line10: [28, 29, 30, 31, 32, 33],
    line9: [25, 26, 27, 28, 29, 30],
    line8: [22, 23, 24, 25, 26, 27],
    line7: [19, 20, 21, 22, 23, 24],
    line6: [16, 17, 18, 19, 20, 21],
    line5: [13, 14, 15, 16, 17, 18],
    line4: [10, 11, 12, 13, 14, 15],
    line3: [7, 8, 9, 10, 11, 12],
    line2: [4, 5, 6, 7, 8, 9],
    line1: [1, 2, 3, 4, 5, 6],
    line0: [0, 1, 2, 3],
    dozen1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    dozen2: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    dozen3: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
    small: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    big: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
    even: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36],
    odd: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35],
    red: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36],
    black: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35],
    row1: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
    row2: [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
    row3: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
  },
  TEXT_TO_SPEECH: {
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
    13: 'thirteen',
    14: 'fourteen',
    15: 'fifteen',
    16: 'sixteen',
    17: 'seventeen',
    18: 'eighteen',
    19: 'nineteen',
    20: 'twenty',
    21: 'twenty1',
    22: 'twenty2',
    23: 'twenty3',
    24: 'twenty4',
    25: 'twenty5',
    26: 'twenty6',
    27: 'twenty7',
    28: 'twenty8',
    29: 'twenty9',
    30: 'thirty',
    31: 'thirty1',
    32: 'thirty2',
    33: 'thirty3',
    34: 'thirty4',
    35: 'thirty5',
    36: 'thirty6'
  }
}
