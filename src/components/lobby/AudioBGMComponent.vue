<template>
  <div>
    <audio id="myAudio" loop="infinite">
      <source :src="audios.music" type='audio/mp3'>
      Your user agent does not support the HTML5 Audio element.
    </audio>
  </div>
</template>

<script>
import SocialModalComponent from '@/components/modal/SocialModalComponent'
import {Howl} from 'howler'

export default {
  name: 'AudioBGM',
  components: {
    SocialModalComponent
  },
  data () {
    return {
      audios: {
        music: 'https://static.oriental-game.com/audio/ogbackground.mp3',
        buttonClick: '//og-333.s3.amazonaws.com/panda/assets/audio/baccarat/en/buttonclick.mp3',
        spotFX: 'static/audio/spotFX.mp3',
        en: {
          moneywheel: 'static/audio/MoneyWheelENfin.mp3',
          baccarat: 'static/audio/SFX/baccarat/baccarat_en.mp3',
          dragontiger: 'static/audio/DragonTigerENfin.mp3',
          roulette: 'static/audio/Roulette_EN.mp3',
          spotFX: 'static/audio/spotfxENfin.mp3'
        },
        cn: {
          moneywheel: 'static/audio/MoneyWheelCHfin.mp3',
          baccarat: 'static/audio/SFX/baccarat/baccarat_cn.mp3',
          dragontiger: 'static/audio/SFX/dragontiger/dragontiger_cn.mp3',
          roulette: 'static/audio/SFX/roulette/roulette_cn.mp3',
          spotFX: 'static/audio/spotfxCHfin.mp3'
        }
      }
    }
  },
  mounted: function () {
    let _s = this
    _s.spotFX()
    _s.spotFXSounden()
    _s.spotFXSoundcn()
    _s.moneywheelSounden()
    _s.moneywheelSoundcn()
    _s.dten()
    _s.dtcn()
    _s.baccen()
    _s.bacccn()
    _s.loadMusic()
    _s.rlten()
    _s.rltcn()
    if (_s.isLobby === true) {
      if (_s.$store.state.musicSwitch === true) {
        _s.$store.state.audiosprite['bgm'].play()
      } else {
        _s.$store.state.audiosprite['bgm'].stop()
      }
    }

    try {
      let options = {}
      // Get specific settings to save
      _.map(_s.$options.computed, (value, key) => {
        if (['liveSoundSwitch'].indexOf(key) > -1) {
          options[key] = _s[key]
        }
        console.log('OPTIONS', options.liveSoundSwitch)
        if (options.liveSoundSwitch === '' || options.liveSoundSwitch === undefined) {
          _s.$store.state.liveSoundSwitch = true
        }
      })
    } catch (err) {
      console.log('Live Sound', err)
    }
 

  },
  watch: {
    bgmaudio: function (we) {
      let _s = this
      if (we === true) {
        _s.$store.state.audiosprite['bgm'].play() 
      } else {
        _s.$store.state.audiosprite['bgm'].stop()  
      }
    }
  },
  computed: {
    liveSoundSwitch: {
      get () {
        return this.$store.state.liveSoundSwitch
      }
    },    
    isLobby: {
      get () {
        return this.$store.state.isLobby
      }
    },    
    bgmaudio: {
      get () {
        let _s = this
        return _s.$store.state.game_settings.music
      }
    }
  },  
  methods: { 
    loadMusic: function () {
      let _s = this
      const bgm = new Howl({
        src: [_s.audios.music],
        format: ['mp3'],
        preload: true,
        loop: true,
        html5: false,
        xhrWithCredentials: false
      })
      _s.$store.commit('loadSound', {property: 'bgm', value: bgm})
    },
    spotFX: function () {
      let _s = this
      const sound = new Howl({
        src: [_s.audios.spotFX],
        format: ['mp3'],
        preload: true,
        xhrWithCredentials: false,
        mute: false,
        sprite: {
          triger: [0, 1],
          chipselect: [0, 800],
          timetick: [1000, 1200],
          winchips: [2000, 3400],
          endRing: [5500, 2000],
          click: [8500, 1800]
        }
      })
      // sound.play('click')
      _s.$store.commit('loadSound', {property: 'spotFX', value: sound})
    },
    spotFXSounden: function () {
      let _s = this
      const soundFXen = new Howl({
        src: [_s.audios['en'].spotFX],
        format: ['mp3'],
        preload: true,
        xhrWithCredentials: false,
        mute: false,
        sprite: {
          triger: [0, 1],
          betsuccesful: [1000, 1000],
          betstart: [2000, 1300],
          betstop: [3200, 1000],
          placebet: [4200, 1500],
          nomore: [5800, 2400],
          tie: [8240, 900]
        }
      })
      // soundFXen.play('betstart')
      _s.$store.commit('loadSound', {property: 'spotFXen', value: soundFXen})
    },
    spotFXSoundcn: function () {
      let _s = this
      const soundFXcn = new Howl({
        src: [_s.audios['cn'].spotFX],
        format: ['mp3'],
        preload: true,
        xhrWithCredentials: false,
        mute: false,
        sprite: {
          triger: [0, 1],
          betsuccesful: [800, 1100],
          betstart: [1800, 1600],
          betstop: [3200, 1500],
          placebet: [4500, 1100],
          nomore: [5500, 4000],
          tie: [9400, 1500]
        }
      })
     // soundFXcn.play('tie')
       _s.$store.commit('loadSound', {property: 'spotFXcn', value: soundFXcn})
    },
    moneywheelSounden: function () {
      let _s = this
      const soundENMW = new Howl({
        src: [_s.audios['en'].moneywheel],
        format: ['mp3'],
        preload: true,
        xhrWithCredentials: false,
        mute: false,
        sprite: {
          triger: [0, 1],
          spinningW: [0, 1700],
          onewins: [1600, 900],
          twowins: [2500, 1000],
          fivewins: [3400, 1100],
          tenwins: [4400, 900],
          twentywins: [5200, 1200],
          ogwins: [6300, 1200]
        }
      })
      _s.$store.commit('loadSound', {property: 'moneywheelen', value: soundENMW})
    },    
    moneywheelSoundcn: function () {
      let _s = this
      const soundCNMW = new Howl({
        src: [_s.audios['cn'].moneywheel],
        format: ['mp3'],
        preload: true,
        xhrWithCredentials: false,
        mute: false,
        sprite: {
          triger: [0, 1],
          spinningW: [0, 1900],
          onewins: [1900, 950],
          twowins: [2700, 950],
          fivewins: [3500, 850],
          tenwins: [4300, 900],
          twentywins: [5100, 900],
          ogwins: [6000, 1400]
        }          
      })
      // soundCNMW.play('ogwins')
      _s.$store.commit('loadSound', {property: 'moneywheelcn', value: soundCNMW})
    },
    baccen: function () {
      let _s = this
      const soundEN = new Howl({
        src: [_s.audios['en'].baccarat],
        format: ['mp3'],
        preload: true,
        xhrWithCredentials: false,
        mute: false,
        sprite: {
          triger: [0, 1],
          bwin: [0, 1000],
          bPair: [1200, 1000],
          banker0: [2200, 1300],
          banker1: [3500, 900],
          banker2: [4300, 1000],
          banker3: [5200, 1000],
          banker4: [6200, 1100],
          banker5: [7200, 1200],
          banker6: [8300, 1200],
          banker7: [9400, 1200],
          banker8: [10500, 1000],
          banker9: [11500, 1100],
          pwin: [12400, 1000],
          pPair: [13300, 1200],        
          player0: [14500, 1300],
          player1: [15800, 1100],
          player2: [16800, 1000],
          player3: [17800, 1100],
          player4: [18800, 1100],
          player5: [19800, 1100],
          player6: [20900, 1100],
          player7: [22000, 1000],
          player8: [23000, 900],
          player9: [24000, 1000]
        }
      })
      // soundEN.play('player9')
      _s.$store.commit('loadSound', {property: 'baccaraten', value: soundEN})
    },
    bacccn: function () {
      let _s = this
      const soundCN = new Howl({
        src: [_s.audios['cn'].baccarat],
        format: ['mp3'],
        preload: true,
        xhrWithCredentials: false,
        mute: false,
        sprite: {
          triger: [0, 1],
          bwin: [0, 1700],
          banker0: [2200, 1400],
          banker1: [3700, 1600],
          banker2: [5200, 1600],
          banker3: [6900, 1600],
          banker4: [8400, 1600],
          banker5: [10000, 1600],
          banker6: [12000, 1600],
          banker7: [13500, 1600],
          banker8: [15000, 1800],
          banker9: [16900, 1600],
          pwin: [18900, 1800],      
          player0: [21000, 1800],
          player1: [22800, 1800],
          player2: [24800, 1900],
          player3: [27000, 1700],
          player4: [28900, 1700],
          player5: [31000, 1800],
          player6: [32800, 2200],
          player7: [35000, 2300],
          player8: [37000, 1800],
          player9: [39000, 1800]
        }
      })
      _s.$store.commit('loadSound', {property: 'baccaratcn', value: soundCN})
    },
    dten: function () {
      let _s = this
      const sounddtEN = new Howl({
        src: [_s.audios['en'].dragontiger],
        format: ['mp3'],
        preload: true,
        xhrWithCredentials: false,
        sprite: {
          triger: [0, 1],
          dwin: [0, 1500],
          dragon1: [1400, 1300],
          dragon2: [2500, 1000],
          dragon3: [3700, 1000],
          dragon4: [4800, 1000],
          dragon5: [5800, 1300],
          dragon6: [6900, 1200],
          dragon7: [8100, 1300],
          dragon8: [9200, 1100],
          dragon9: [10300, 1100],
          dragon10: [11200, 1200],
          dragon11: [12500, 900],
          dragon12: [13500, 1200],
          dragon13: [14500, 1300],
          twin: [15700, 1100],
          tiger1: [16700, 1000],
          tiger2: [17600, 1000],
          tiger3: [18600, 900],
          tiger4: [19400, 900],
          tiger5: [20400, 1000],
          tiger6: [21500, 900],
          tiger7: [22500, 800],
          tiger8: [23200, 900],
          tiger9: [24200, 900],
          tiger10: [25000, 1000],
          tiger11: [26000, 900],
          tiger12: [27000, 1000],
          tiger13: [28000, 1000]          
        }
      })
      // sounddtEN.play('dragon4')
      _s.$store.commit('loadSound', {property: 'dragontigeren', value: sounddtEN})
    },
    dtcn: function () {
      let _s = this
      const sounddtCN = new Howl({
        src: [_s.audios['cn'].dragontiger],
        format: ['mp3'],
        preload: true,
        xhrWithCredentials: false,
        sprite: {
          triger: [0, 1],
          dwin: [0, 1600],
          dragon1: [3000, 1300],
          dragon2: [5000, 1500],
          dragon3: [7000, 1500],
          dragon4: [9000, 1500],
          dragon5: [11000, 1500],
          dragon6: [13000, 1500],
          dragon7: [15000, 1500],
          dragon8: [17000, 1500],
          dragon9: [19000, 1500],
          dragon10: [21000, 1600],
          dragon11: [23000, 1800],
          dragon12: [25500, 2100],
          dragon13: [27000, 2100],
          twin: [29000, 2100],
          tiger1: [32000, 2100],
          tiger2: [34000, 2200],
          tiger3: [36000, 2100],
          tiger4: [38000, 2100],
          tiger5: [40000, 2100],
          tiger6: [42000, 2100],
          tiger7: [44000, 2100],
          tiger8: [46000, 2100],
          tiger9: [48000, 2100],
          tiger10: [50000, 2400],
          tiger11: [53000, 2300],
          tiger12: [55000, 2300],
          tiger13: [57000, 2300],
        }
      })
     //  sounddtCN.play('tiger13')
      _s.$store.commit('loadSound', {property: 'dragontigercn', value: sounddtCN})
    },
    rlten: function () {
      let _s = this
      const soundrlEN = new Howl({
        src: [_s.audios['en'].roulette],
        format: ['mp3'],
        preload: true,
        xhrWithCredentials: false,
        sprite: {
          triger: [0, 1],
          betsuccesful: [0, 2100],
          placebet: [2100, 1400],
          nomore: [3500, 1700],
          black: [5300,680],
          red: [5900,680],
          odd: [6500,680],
          even: [7100,690],
          zero: [7800,670],
          one: [8400,670],
          two: [8900,670],
          three: [9600,690],
          four: [10400,600],
          five: [11000,600],
          six: [11600,630],
          seven: [12200,650],
          eight: [12900,690],
          nine: [13400,690],
          ten: [14200,640],
          eleven: [14700,900],
          twelve: [15400,850],
          thirteen: [16200,900],
          fourteen: [17000,900],
          fifteen: [17900,900],
          sixteen: [18700,1200],
          seventeen: [19900,1200],
          eighteen: [21000,900],
          nineteen: [21900,900],
          twenty: [22600,900],
          twenty1: [23300,1000],
          twenty2: [24300,1000],
          twenty3: [25300,1000],
          twenty4: [26300,1000],
          twenty5: [27500,1000],
          twenty6: [28500,1000],
          twenty7: [29500,1300],
          twenty8: [30600,1100],
          twenty9: [31600,1000],
          thirty: [32600,800],
          thirty1: [33500,900],
          thirty2: [34200,900],
          thirty3: [35200,900],
          thirty4: [36200,900],
          thirty5: [37200,1100],
          thirty6: [38500,1200]
        }
      })
      // soundrlEN.play('zero')
      _s.$store.commit('loadSound', {property: 'rouletteen', value: soundrlEN})
    },
    rltcn: function () {
      let _s = this
      const soundrlCN = new Howl({
        src: [_s.audios['cn'].roulette],
        format: ['mp3'],
        preload: true,
        xhrWithCredentials: false,
        sprite: {
          triger: [0, 1],
          betsuccesful: [0, 3200],
          placebet: [3400, 2500],
          nomore: [6000, 3300],
          black: [9000, 1000],
          red: [10000, 1200],
          even: [11800, 1200],
          odd: [12800, 1300],
          zero: [14000, 1300],
          one: [15000, 1400],
          two: [17000,1400],
          three: [18900,1300],
          four: [19900,1300],
          five: [21000,1600],
          six: [23000,1600],
          seven: [25000,1600],
          eight: [26000,1400],
          nine: [28000,1300],
          ten: [29000,1500],
          eleven: [31000,1300],
          twelve: [32000,1600],
          thirteen: [34000,1400],
          fourteen: [35800,1400],
          fifteen: [37000,1500],
          sixteen: [39000,1500],
          seventeen: [40600,1500],
          eighteen: [41800,1800],
          nineteen: [43800,1600],
          twenty: [45500,1600],
          twenty1: [47000,1600],
          twenty2: [49000,1600],
          twenty3: [50500,1600],
          twenty4: [52000,1600],
          twenty5: [54000,1600],
          twenty6: [56000,1600],
          twenty7: [58000,1600],
          twenty8: [60000,1600],
          twenty9: [62000,1600],
          thirty:  [64000,1400],
          thirty1: [65000,1800],
          thirty2: [67000,1800],
          thirty3: [69000,1800],
          thirty4: [71000,1800],
          thirty5: [73000,1800],
          thirty6: [75000,1800],
        }
      })
      // soundrlCN.play('thirty6')
      _s.$store.commit('loadSound', {property: 'roulettecn', value: soundrlCN})
    }    
  }
}
</script>
