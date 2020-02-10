// NOTES:
// Please only add Squeeze commands that will only be used for Squeezing
// VUE component using this
// src/components/drawer/SqueezeComponent.vue
//static/cards/club/1c - kc
//diamond
//heart
//spade
// static/cards/img_finger.png

import $ from 'jquery'
import { TweenLite } from 'gsap'
import Paper, { Raster, Point, Event, Tool, Group, Path, Rectangle, PaperScope } from "paper";

export default {
  component: {
    $,
    TweenLite
  },
  data () {
    return {
      squeezeScale: 0.30,
      isLandscape: {
        left: false,
        right: false
      },
      paperCard: {
        left: new Paper.PaperScope(),
        right: new Paper.PaperScope()
      },
      cardFolder: {
        c: 'club',
        d: 'diamond',
        h: 'heart',
        s: 'spade',
      }
    }
  },
  props: {
    position: String,
    wherebetis: String
  },
  created: function () {
    let _s = this
    // console.log('POS: ', this.position)
  },
  mounted: function () {
    let _s = this
    _s.onRedrawCard()
    _s.isFlipped['left'][0] = false
    _s.isFlipped['left'][1] = false
    _s.isFlipped['left'][2] = false
    _s.isFlipped['right'][0] = false
    _s.isFlipped['right'][1] = false
    _s.isFlipped['right'][2] = false
    window.addEventListener('resize', this.onRedrawCard)

  },
  methods: {
    return_playerCard1 (val) {
      let _s = this
      if (val !== '') {
        _s.cardsItem['left'][0] = val
      }
      return _s.cardsItem['left'][0]
    },
    return_playerCard2 (val) {
      let _s = this
      if (val !== '') {
        _s.cardsItem['left'][1] = val
      }
      return _s.cardsItem['left'][1]
    },
    return_playerCard3 (val) {
      let _s = this
      if (val !== '') {
        _s.cardsItem['left'][2] = val
      }
      return _s.cardsItem['left'][2]
    },
    return_bankerCard1 (val) {
      let _s = this
      if (val !== '') {
        _s.cardsItem['right'][0] = val
      }
      return _s.cardsItem['right'][0]
    },
    return_bankerCard2 (val) {
      let _s = this
      if (val !== '') {
        _s.cardsItem['right'][1] = val
      }
      return _s.cardsItem['right'][1]
    },
    return_bankerCard3 (val) {
      let _s = this
      if (val !== '') {
        _s.cardsItem['right'][2] = val
      }
      return _s.cardsItem['right'][2]
    },
   onRedrawCard() {
    let _s = this
    
    // console.log("_s.isFlipped['left'][0] ==========================>", _s.isFlipped['left'])    
    // console.log("STATUS: ", _s.status)
    switch(_s.status) {
      case 'default' :  
        this.$store.state.tablelist[this._table.tableNumber].squeezeUpdate = {}
        _s.isFlipped['left'][0] = false
        _s.isFlipped['left'][1] = false
        _s.isFlipped['left'][2] = false

        _s.isFlipped['right'][0] = false
        _s.isFlipped['right'][1] = false
        _s.isFlipped['right'][2] = false
    
      break
      case 'squeeze_start' :  
        _s.$store.state.currentFlipped.gameEnd = false;
        _s.drawSqueezeCardL('left', document.getElementById('squeeze-canvas-L'), true, false); 
        _s.drawSqueezeCardR('right', document.getElementById('squeeze-canvas-R'), true, false);
        switch(this.wherebetis) {
          case 'P' : 
            if(_s.highestPlayerBidder.userId === _s._getUserID) {
              TweenLite.set('.rotate-btn-a-L', {display: 'block'});
            }
          break
          case 'B' : 
            if(_s.highestBankerBidder.userId === _s._getUserID) {
              TweenLite.set('.rotate-btn-a-R', {display: 'block'});
            }
          break
          case 'PB' : 
            if(_s.highestPlayerBidder.userId === _s._getUserID) {
              TweenLite.set('.rotate-btn-a-L', {display: 'block'});
            }
            if(_s.highestBankerBidder.userId === _s._getUserID) {
              TweenLite.set('.rotate-btn-a-R', {display: 'block'});
            }
            if((_s.highestBankerBidder.userId === _s._getUserID) && (_s.highestPlayerBidder.userId === _s._getUserID)) {
              TweenLite.set('.rotate-btn-a-R', {display: 'none'});
            }
          break
        }
      break
      case 'squeeze_time' :  
          _s.drawSqueezeCardL('left', document.getElementById('squeeze-canvas-L'), true, false); 
          _s.drawSqueezeCardR('right', document.getElementById('squeeze-canvas-R'), true, false);
          switch(this.wherebetis) {
            case 'P' : 
              if(_s.highestPlayerBidder.userId === _s._getUserID) {
                TweenLite.set('.rotate-btn-a-L', {display: 'block'});
              }
            break
            case 'B' : 
              if(_s.highestBankerBidder.userId === _s._getUserID) {
                TweenLite.set('.rotate-btn-a-R', {display: 'block'});
              }
            break
            case 'PB' : 
              if(_s.highestPlayerBidder.userId === _s._getUserID) {
                TweenLite.set('.rotate-btn-a-L', {display: 'block'});
              }
              if(_s.highestBankerBidder.userId === _s._getUserID) {
                TweenLite.set('.rotate-btn-a-R', {display: 'block'});
              }
              if((_s.highestBankerBidder.userId === _s._getUserID) && (_s.highestPlayerBidder.userId === _s._getUserID)) {
                TweenLite.set('.rotate-btn-a-R', {display: 'none'});
              }
            break
          }
          break
        case 'squeezep_end' : 
          _s.$store.state.currentFlipped.gameEnd = true;
          _s.isLandscape["left"] = false
          _s.isLandscape["right"] = false
          _s.isFlipped['left'][2] = true;
          TweenLite.set('.rotate-btn-a-L', {display: 'none'});
          TweenLite.set('.rotate-btn-a-R', {display: 'none'});
          setTimeout(function () {
          _s.drawSqueezeCardL('left', document.getElementById('squeeze-canvas-L'), false, true); 
          },3000)
          break
        case 'squeezeb_end' : 
          _s.$store.state.currentFlipped.gameEnd = true;
          _s.isLandscape["left"] = false
          _s.isLandscape["right"] = false
          _s.isFlipped['right'][2] = true;
          
          TweenLite.set('.rotate-btn-a-L', {display: 'none'});
          TweenLite.set('.rotate-btn-a-R', {display: 'none'});
          setTimeout(function () {
          _s.drawSqueezeCardR('right', document.getElementById('squeeze-canvas-R'), false, true);
          },3000)
          break
        case 'squeeze_end' :
            _s.$store.state.currentFlipped.gameEnd = true;
            _s.isFlipped['left'][0] = true;
            _s.isFlipped['left'][1] = true;
            _s.isFlipped['right'][0] = true;
            _s.isFlipped['right'][1] = true;
            _s.isLandscape["left"] = false
            _s.isLandscape["right"] = false
            TweenLite.set('.rotate-btn-a-L', {display: 'none'});
            TweenLite.set('.rotate-btn-a-R', {display: 'none'});
            setTimeout(function () {
              _s.drawSqueezeCardL('left', document.getElementById('squeeze-canvas-L'), true, false); 
              _s.drawSqueezeCardR('right', document.getElementById('squeeze-canvas-R'), true, false);
            },5000)
            
          break
        case 'squeezepb_start' :
            
          break
        case 'squeezepb_end' :
            
          break
        }

    switch(_s.position) {
      case 'L' : 
        switch(_s.status) {
          case 'squeezep_start' : 
          _s.$store.state.currentFlipped.gameEnd = false;
            _s.drawSqueezeCardL('left', document.getElementById('squeeze-canvas-L'), false, true);
            if(_s.highestPlayerBidder.userId === _s._getUserID) {
              TweenLite.set('.rotate-btn-a-L', {display: 'block'}); 
            }
          break
          case 'squeezep_time' :  
            _s.drawSqueezeCardL('left', document.getElementById('squeeze-canvas-L'), false, true); 
          break
        }  
      break
      case 'R' : 
        switch(_s.status) {
          case 'squeezeb_start' : 
            _s.$store.state.currentFlipped.gameEnd = false;
            _s.drawSqueezeCardR('right', document.getElementById('squeeze-canvas-R'), false, true); 
            if(_s.highestBankerBidder.userId === _s._getUserID) {
              TweenLite.set('.rotate-btn-a-R', {display: 'block'});
            }
            if((_s.highestBankerBidder.userId === _s._getUserID) && (_s.highestPlayerBidder.userId === _s._getUserID)) {
              TweenLite.set('.rotate-btn-a-R', {display: 'none'});
            }
            
          break
          case 'squeezeb_time' :  
            _s.drawSqueezeCardR('right', document.getElementById('squeeze-canvas-R'), false, true); 
          break
        }  
      break
    }



    
   },
   onRotateCardL() {
    let _s = this
    // console.log('_s.isLandscapeL: ', _s.isLandscape["left"])
    _s.isLandscape["left"]= !_s.isLandscape["left"];
    _s.onRedrawCard()
   },
   onRotateCardR() {
    let _s = this
    // console.log('_s.isLandscapeR: ', _s.isLandscape)
    _s.isLandscape["right"]= !_s.isLandscape["right"];
    _s.onRedrawCard()
   },
   onClearCard: function () {
    this.isLandscape = true
   },
   drawInitialized: function () {
    
    // let computedStyle = window.getComputedStyle(document.getElementById('squeeze-canvas'))
   },
   getCardImage: function (card) {
    let valueEquivalent = { j: 11, q: 12, k: 13 };
    let value = card.substring(0, card.length - 1);
        value = isNaN(+value) ? valueEquivalent[value] : value;
        
    return `${ value }${ card.slice(-1) }`;
   },
   drawSqueezeCardL: function (id, canvasElement, introCards, thirdCard) {
    
    let _s = this
    let _paper


    if (!id) return
    
    _paper = _s.paperCard[id];
    _paper.setup(canvasElement)
    _paper.tool = new Tool(); 
    _paper.activate()
    _paper.project.clear()
    

    let computedStyle = window.getComputedStyle(canvasElement)
    
    // console.log(parseInt(_paper.view.bounds.width), 'drawSqueezeCardL')
    // console.log(parseInt(_paper.view.bounds.height), 'drawSqueezeCardL')


    let styleW = parseInt(_paper.view.bounds.width);
    let styleH = parseInt(_paper.view.bounds.height);
    
    let cardsize = parseInt(_paper.view.bounds.width) + parseInt(_paper.view.bounds.height)
    let cardcanvas = cardsize/2400
    // console.log(cardcanvas, 'cardsizeL')
    this.squeezeScale = cardcanvas



    let moveL = -(parseInt(_paper.view.bounds.width) * 0.23)
    let moveC = 0
    let moveR = parseInt(_paper.view.bounds.width) * 0.23


    let bckURLP = `card-back-blue`
    let bckURLB = `card-back-red`
    
    let frontURL0 = _s.cardsItem[id][0]
    let frontURL1 = _s.cardsItem[id][1]
    let frontURL2 = _s.cardsItem[id][2]


    let finger = `card-finger`

    
    let ht = 650
    let wt = 450
    let cardW = (this.isLandscape[id] ? ht : wt ) * this.squeezeScale;
    let cardH = (this.isLandscape[id] ? wt  : ht) * this.squeezeScale;

    // __________                __     _________                  .___
    // \______   \_____    ____ |  | __ \_   ___ \_____ _______  __| _/
    //  |    |  _/\__  \ _/ ___\|  |/ / /    \  \/\__  \\_  __ \/ __ | 
    //  |    |   \ / __ \\  \___|    <  \     \____/ __ \|  | \/ /_/ | 
    //  |______  /(____  /\___  >__|_ \  \______  (____  /__|  \____ | 
    //         \/      \/     \/     \/         \/     \/           \/ 
    let rasterBack
    let rasterBack2
    let rasterBack3
    
    if (introCards) {
      rasterBack = new Raster(_s.isFlipped[id][0] ? `card-table-${ this.getCardImage(frontURL0) }` : bckURLP);
      rasterBack.rotation = this.isLandscape[id] ? 90 : 0;
      rasterBack.position = new Point(styleW/2 + moveR, styleH/2)
      rasterBack.scale(this.squeezeScale)

      rasterBack2 = new Raster(_s.isFlipped[id][1] ? `card-table-${ this.getCardImage(frontURL1) }` : bckURLP);
      rasterBack2.rotation = this.isLandscape[id] ? 90 : 0;
      rasterBack2.position = new Point(styleW/2 + moveL, styleH/2)
      rasterBack2.scale(this.squeezeScale)
    }

    if (thirdCard) {
      rasterBack3 = new Raster(_s.isFlipped[id][2] ? `card-table-${ this.getCardImage(frontURL2) }` : bckURLP);
      rasterBack3.rotation = this.isLandscape[id] ? 90 : 0;
      rasterBack3.position = new Point(styleW/2 + moveC, styleH/2)
      rasterBack3.scale(this.squeezeScale)
    }
    
    if(this.wherebetis === 'B') return
    if(_s.highestPlayerBidder.userId !== _s._getUserID) return
    
    


    // ___________                     __    _________                  .___
    // \_   _____/______  ____   _____/  |_  \_   ___ \_____ _______  __| _/
    //  |    __) \_  __ \/  _ \ /    \   __\ /    \  \/\__  \\_  __ \/ __ | 
    //  |     \   |  | \(  <_> )   |  \  |   \     \____/ __ \|  | \/ /_/ | 
    //  \___  /   |__|   \____/|___|  /__|    \______  (____  /__|  \____ | 
    //      \/                      \/               \/     \/           \/ 
    let rasterFront
    let rasterFront2
    let rasterFront3
    if (introCards) {
        rasterFront = new Raster(`card-table-${ this.getCardImage(frontURL0) }`);
        rasterFront.pivot = this.isLandscape[id] ? rasterFront.bounds.leftCenter : rasterFront.bounds.topCenter;
        rasterFront.rotation = this.isLandscape[id] ? 90 : 0;
        rasterFront.position = new Point(styleW / 2 + moveR, (parseInt(styleH) + parseInt(cardH))/2);
        rasterFront.scale(this.squeezeScale);

        rasterFront2 = new Raster(`card-table-${ this.getCardImage(frontURL1) }`);
        rasterFront2.pivot = this.isLandscape[id] ? rasterFront2.bounds.leftCenter : rasterFront2.bounds.topCenter;
        rasterFront2.rotation = this.isLandscape[id] ? 90 : 0;
        rasterFront2.position = new Point(styleW / 2 + moveL, (parseInt(styleH) + parseInt(cardH))/2);
        rasterFront2.scale(this.squeezeScale); 
      }
      if (thirdCard) {
        // console.log('frontURL2: ', frontURL2)
        rasterFront3 = new Raster(`card-table-${ this.getCardImage(frontURL2) }`);
        rasterFront3.pivot = this.isLandscape[id] ? rasterFront3.bounds.leftCenter : rasterFront3.bounds.topCenter;
        rasterFront3.rotation = this.isLandscape[id] ? 90 : 0;
        rasterFront3.position = new Point(styleW / 2 + moveC, (parseInt(styleH) + parseInt(cardH))/2);
        rasterFront3.scale(this.squeezeScale);       
      }

    //    _____                 __    
    //   /     \ _____    _____|  | __
    //  /  \ /  \\__  \  /  ___/  |/ /
    // /    Y    \/ __ \_\___ \|    < 
    // \____|__  (____  /____  >__|_ \
    //         \/     \/     \/     \/
    let pathBack = null
    let pathBack2 = null
    let pathBack3 = null
    let group = null
    let group2 = null
    let group3 = null
    if (introCards) {



      // console.log(styleH)
      //   console.log(cardH
        pathBack = new Path.Rectangle(new Rectangle((parseInt(styleW) - parseInt(cardW)) / 2 + moveR, (parseInt(styleH) - parseInt(cardH)) / 2, cardW, cardH));
        pathBack.clipMask = true;
        pathBack2 = new Path.Rectangle(new Rectangle((parseInt(styleW) - parseInt(cardW)) / 2 + moveL, (parseInt(styleH) - parseInt(cardH)) / 2, cardW, cardH));
        pathBack2.clipMask = true;
        group = new Group([rasterBack, rasterFront, pathBack]);
        group2 = new Group([rasterBack2, rasterFront2, pathBack2]);
      }
    if (thirdCard) {
        pathBack3 = new Path.Rectangle(new Rectangle((parseInt(styleW) - parseInt(cardW)) / 2 + moveC, (parseInt(styleH) - parseInt(cardH)) / 2, cardW, cardH));
        pathBack3.clipMask = true; 
        group3 = new Group([rasterBack3, rasterFront3, pathBack3]);
    }
    
    
    
    // ___________.__                             
    // \_   _____/|__| ____    ____   ___________ 
    //  |    __)  |  |/    \  / ___\_/ __ \_  __ \
    //  |     \   |  |   |  \/ /_/  >  ___/|  | \/
    //  \___  /   |__|___|  /\___  / \___  >__|   
    //      \/            \//_____/      \/       
    let fingerL
    let fingerR
    let fingerL2
    let fingerR2
    let fingerL3
    let fingerR3
    let fingerGroup
    let fingerGroup2
    let fingerGroup3
    let fingerScalingL = cardsize / 976
    if (introCards) {
          fingerL = new Raster(finger)
          fingerL.scale(fingerScalingL)
          fingerL.rotate(135)
          fingerR = new Raster(finger)
          fingerR.scale(fingerScalingL)
          fingerR.rotate(-135)
          fingerR.position.x = cardW * 1.05
          fingerGroup = new Group([fingerL, fingerR])
          fingerGroup.position = new Point(styleW / 2 + moveR, (parseInt(styleH) + parseInt(cardH)) / 2)
          fingerGroup.visible = false

          fingerL2 = new Raster(finger)
          fingerL2.scale(fingerScalingL)
          fingerL2.rotate(135)
          fingerR2 = new Raster(finger)
          fingerR2.scale(fingerScalingL)
          fingerR2.rotate(-135)
          fingerR2.position.x = cardW * 1.05
          fingerGroup2 = new Group([fingerL2, fingerR2])
          fingerGroup2.position = new Point(styleW / 2 + moveL, (parseInt(styleH) + parseInt(cardH)) / 2)
          fingerGroup2.visible = false          
    }
    if (thirdCard) {
          fingerL3 = new Raster(finger)
          fingerL3.scale(fingerScalingL)
          fingerL3.rotate(135)
          fingerR3 = new Raster(finger)
          fingerR3.scale(fingerScalingL)
          fingerR3.rotate(-135)
          fingerR3.position.x = cardW * 1.05
          fingerGroup3 = new Group([fingerL3, fingerR3])
          fingerGroup3.position = new Point(styleW / 2 + moveC, (parseInt(styleH) + parseInt(cardH)) / 2)
          fingerGroup3.visible = false          
    }
    //   _________                                           .___        __                                     __  .__               
    //  /   _____/ ________ __   ____   ____ ________ ____   |   | _____/  |_  ___________  ______ ____   _____/  |_|__| ____   ____  
    //  \_____  \ / ____/  |  \_/ __ \_/ __ \\___   // __ \  |   |/    \   __\/ __ \_  __ \/  ___// __ \_/ ___\   __\  |/  _ \ /    \ 
    //  /        < <_|  |  |  /\  ___/\  ___/ /    /\  ___/  |   |   |  \  | \  ___/|  | \/\___ \\  ___/\  \___|  | |  (  <_> )   |  \
    // /_______  /\__   |____/  \___  >\___  >_____ \\___  > |___|___|  /__|  \___  >__|  /____  >\___  >\___  >__| |__|\____/|___|  /
    //         \/    |__|           \/     \/      \/    \/           \/          \/           \/     \/     \/                    \/ 

    if(_s.$store.state.currentFlipped.gameEnd) {
      return
    }

      let startDrag = false;
      let startDrag2 = false;
      let startDrag3 = false;

      let updatePath = (pointY) => {
          pathBack.segments[0].point.y = pathBack.segments[3].point.y = (parseInt(styleH) + parseInt(cardH)) / 2 - ((parseInt(styleH) + parseInt(cardH)) / 2 - pointY) / 2;
          pathBack.segments[1].point.y = pathBack.segments[2].point.y = (parseInt(styleH) - parseInt(cardH)) / 2 - ((parseInt(styleH) + parseInt(cardH)) / 2 - pointY) / 2;

          rasterFront.position.y = pointY;
          fingerGroup.position.y = pointY;

          if (pointY < (parseInt(styleH) - parseInt(cardH)) / 2) {
              startDrag = false;
              fingerGroup.visible = true;
              _s.isFlipped[id][0] = true;
              _s.$store.state.currentFlipped.flipped = true
              _s.$store.state.currentFlipped.p1 = true;
          
              pathBack.clipMask = false;
              TweenLite.set(rasterFront.scaling, { x: cardcanvas, y: cardcanvas }, { x: cardcanvas, y: cardcanvas, onComplete:function(){
                  _s.isFlipped[id][0] = true;                 
              }});
              _s.drawSqueezeCardL('left', document.getElementById('squeeze-canvas-L'), true, false); 
              this.$store.dispatch('PLAYER_BROADCAST', {
                tableNumber: this._table.tableNumber,
                action: "L_SQUEEZE",
                data: {
                  playerId: this.$store.state.userinfo.id,
                  isSqueeze: false,
                  leftS: false
                }
              });
          }
      };
      let updatePath2 = (pointY) => {
        
        pathBack2.segments[0].point.y = pathBack2.segments[3].point.y = (parseInt(styleH) + parseInt(cardH)) / 2 - ((parseInt(styleH) + parseInt(cardH)) / 2 - pointY) / 2;
        pathBack2.segments[1].point.y = pathBack2.segments[2].point.y = (parseInt(styleH) - parseInt(cardH)) / 2 - ((parseInt(styleH) + parseInt(cardH)) / 2 - pointY) / 2;

        rasterFront2.position.y = pointY;
        fingerGroup2.position.y = pointY;

        if (pointY < (parseInt(styleH) - parseInt(cardH)) / 2) {
            startDrag2 = false;
            fingerGroup2.visible = true;
            _s.isFlipped[id][1] = true;
            _s.$store.state.currentFlipped.flipped = true
            _s.$store.state.currentFlipped.p2 = true;
            pathBack2.clipMask = false;
            TweenLite.set(rasterFront2.scaling, { x: cardcanvas, y: cardcanvas }, { x: cardcanvas, y: cardcanvas, onComplete:function(){
              _s.isFlipped[id][1] = true;
            }});
            _s.drawSqueezeCardL('left', document.getElementById('squeeze-canvas-L'), true, false); 
            this.$store.dispatch('PLAYER_BROADCAST', {
              tableNumber: this._table.tableNumber,
              action: "L_SQUEEZE",
              data: {
                playerId: this.$store.state.userinfo.id,
                isSqueeze: false,
                leftS: false
              }
            });
        }
      };

      let updatePath3 = (pointY) => {
        pathBack3.segments[0].point.y = pathBack3.segments[3].point.y = (parseInt(styleH) + parseInt(cardH)) / 2 - ((parseInt(styleH) + parseInt(cardH)) / 2 - pointY) / 2;
        pathBack3.segments[1].point.y = pathBack3.segments[2].point.y = (parseInt(styleH) - parseInt(cardH)) / 2 - ((parseInt(styleH) + parseInt(cardH)) / 2 - pointY) / 2;

        rasterFront3.position.y = pointY;
        fingerGroup3.position.y = pointY;

        if (pointY < (parseInt(styleH) - parseInt(cardH)) / 2) {

            startDrag3 = false;
            fingerGroup3.visible = true;
            this.isFlipped[id][2] = true;
            _s.$store.state.currentFlipped.flipped = true
            _s.$store.state.currentFlipped.p3 = true;
            _s.$store.state.currentFlipped.thirdCard = true;
            pathBack3.clipMask = false;
            TweenLite.set(rasterFront3.scaling, { x: cardcanvas, y: cardcanvas }, { x: cardcanvas, y: cardcanvas, onComplete:function(){
                this.isFlipped[id][2] = true;
            }});
            _s.drawSqueezeCardL('left', document.getElementById('squeeze-canvas-L'), false, true); 
            this.$store.dispatch('PLAYER_BROADCAST', {
              tableNumber: this._table.tableNumber,
              action: "L_SQUEEZE",
              data: {
                playerId: this.$store.state.userinfo.id,
                isSqueeze: false,
                leftS: false
              }
            });
        }
      };
      if(introCards) {
        rasterBack.onMouseDown = (event) => {
          if (this.isFlipped[id][0]) return  
            startDrag = true;
            fingerGroup.visible = true;
            updatePath(event.point.y);
            this.$store.dispatch('PLAYER_BROADCAST', {
              tableNumber: this._table.tableNumber,
              action: "L_SQUEEZE",
              data: {
                playerId: this.$store.state.userinfo.id,
                isSqueeze: true,
                leftS: true
              }
            });
        };
        rasterBack2.onMouseDown = (event) => {
          if (this.isFlipped[id][1]) return
          startDrag2 = true;
          fingerGroup2.visible = true;
          updatePath2(event.point.y);
          this.$store.dispatch('PLAYER_BROADCAST', {
            tableNumber: this._table.tableNumber,
            action: "L_SQUEEZE",
            data: {
              playerId: this.$store.state.userinfo.id,
              isSqueeze: true,
              leftS: true
            }
          });
        };
      }
      if(thirdCard) {
        rasterBack3.onMouseDown = (event) => {
          if (this.isFlipped[id][2]) return
          startDrag3 = true;
          fingerGroup3.visible = true;
          updatePath3(event.point.y);
          this.$store.dispatch('PLAYER_BROADCAST', {
            tableNumber: this._table.tableNumber,
            action: "L_SQUEEZE",
            data: {
              playerId: this.$store.state.userinfo.id,
              isSqueeze: true,
              leftS: true
            }
          });
        };
      }
      _paper.tool.onMouseMove = (event) => {
          if (startDrag) {
            updatePath(event.point.y);
            // console.log('event.point.y: ', event.point.y)
            this.$store.dispatch('PLAYER_BROADCAST', {
              tableNumber: this._table.tableNumber,
              action: "L_SQUEEZE",
              data: {
                playerId: this.$store.state.userinfo.id,
                isSqueeze: true,
                leftS: true,
                L1: true,
                HP: _s.highestPlayerBidder.userId
              }
          });
          } else if (startDrag2) {
            updatePath2(event.point.y);
            this.$store.dispatch('PLAYER_BROADCAST', {
              tableNumber: this._table.tableNumber,
              action: "L_SQUEEZE",
              data: {
                playerId: this.$store.state.userinfo.id,
                isSqueeze: true,
                leftS: true,
                L2: true,
                HP: _s.highestPlayerBidder.userId
              }
          });
          } else if (startDrag3) {
            updatePath3(event.point.y);
            this.$store.dispatch('PLAYER_BROADCAST', {
                tableNumber: this._table.tableNumber,
                action: "L_SQUEEZE",
                data: {
                  playerId: this.$store.state.userinfo.id,
                  isSqueeze: true,
                  leftS: true,
                  L3: true,
                  HP: _s.highestPlayerBidder.userId
                }
            });
          }
          
      };
      _paper.tool.onMouseUp = (event) => {
        this.$store.dispatch('PLAYER_BROADCAST', {
          tableNumber: this._table.tableNumber,
          action: "L_SQUEEZE",
          data: {
            playerId: this.$store.state.userinfo.id,
            isSqueeze: false,
            leftS: false,
            L1: false,
            L2: false,
            L3: false
          }
        });
          if(introCards) {
            startDrag = false;
            startDrag2 = false;
            fingerGroup.visible = false;
            fingerGroup2.visible = false;

            pathBack.segments[0].point.y = pathBack.segments[3].point.y = (parseInt(styleH) + parseInt(cardH)) / 2;
            pathBack.segments[1].point.y = pathBack.segments[2].point.y = (parseInt(styleH) - parseInt(cardH)) / 2;

            pathBack2.segments[0].point.y = pathBack2.segments[3].point.y = (parseInt(styleH) + parseInt(cardH)) / 2;
            pathBack2.segments[1].point.y = pathBack2.segments[2].point.y = (parseInt(styleH) - parseInt(cardH)) / 2;
               
            if (!this.isFlipped[id][0]) {
              rasterFront.position.y = (parseInt(styleH) + parseInt(cardH)) / 2;
            }
            if (!this.isFlipped[id][1]) {
              rasterFront2.position.y = (parseInt(styleH) + parseInt(cardH)) / 2;
            }
          } 
          if(thirdCard) {
            startDrag3 = false;
            fingerGroup3.visible = false;

            pathBack3.segments[0].point.y = pathBack3.segments[3].point.y = (parseInt(styleH) + parseInt(cardH)) / 2;
            pathBack3.segments[1].point.y = pathBack3.segments[2].point.y = (parseInt(styleH) - parseInt(cardH)) / 2;

            if (!this.isFlipped[id][2]) {
              rasterFront3.position.y = (parseInt(styleH) + parseInt(cardH)) / 2;
            }
          }
      };
    },
    drawSqueezeCardR: function (id, canvasElement, introCards, thirdCard) {
    
      let _s = this
    let _paper

    if (!id) return
    
    _paper = _s.paperCard[id];
    _paper.setup(canvasElement)
    _paper.tool = new Tool(); 
    _paper.activate()
    _paper.project.clear()
    

    let computedStyle = window.getComputedStyle(canvasElement)
    
    // console.log(parseInt(_paper.view.bounds.width), 'drawSqueezeCardR')
    // console.log(parseInt(_paper.view.bounds.height), 'drawSqueezeCardR')


    let styleW = parseInt(_paper.view.bounds.width);
    let styleH = parseInt(_paper.view.bounds.height);
    
    let cardsize = parseInt(_paper.view.bounds.width) + parseInt(_paper.view.bounds.height)
    let cardcanvas = cardsize/2400
    // console.log(cardcanvas, 'cardsizeR')
    this.squeezeScale = cardcanvas



    let moveL = -(parseInt(_paper.view.bounds.width) * 0.23)
    let moveC = 0
    let moveR = parseInt(_paper.view.bounds.width) * 0.23

    
    let bckURLP = `card-back-blue`
    let bckURLB = `card-back-red`
    let frontURL0 = _s.cardsItem[id][0]
    let frontURL1 = _s.cardsItem[id][1]
    let frontURL2 = _s.cardsItem[id][2]
    let finger = `card-finger`
    
    let ht = 650
    let wt = 450
    let cardW = (this.isLandscape[id] ? ht : wt ) * this.squeezeScale;
    let cardH = (this.isLandscape[id] ? wt  : ht) * this.squeezeScale;

    // __________                __     _________                  .___
    // \______   \_____    ____ |  | __ \_   ___ \_____ _______  __| _/
    //  |    |  _/\__  \ _/ ___\|  |/ / /    \  \/\__  \\_  __ \/ __ | 
    //  |    |   \ / __ \\  \___|    <  \     \____/ __ \|  | \/ /_/ | 
    //  |______  /(____  /\___  >__|_ \  \______  (____  /__|  \____ | 
    //         \/      \/     \/     \/         \/     \/           \/ 
    let rasterBack
    let rasterBack2
    let rasterBack3
    
    if (introCards) {
      rasterBack = new Raster(_s.isFlipped[id][0] ? `card-table-${ this.getCardImage(frontURL0) }` : bckURLB);
      rasterBack.rotation = this.isLandscape[id] ? 90 : 0;
      rasterBack.position = new Point(styleW/2 + moveL, styleH/2)
      rasterBack.scale(this.squeezeScale)

      rasterBack2 = new Raster(_s.isFlipped[id][1] ? `card-table-${ this.getCardImage(frontURL1) }` : bckURLB);
      rasterBack2.rotation = this.isLandscape[id] ? 90 : 0;
      rasterBack2.position = new Point(styleW/2 + moveR, styleH/2)
      rasterBack2.scale(this.squeezeScale)
    }

    if (thirdCard) {
      rasterBack3 = new Raster(_s.isFlipped[id][2] ? `card-table-${ this.getCardImage(frontURL2) }` : bckURLB);
      rasterBack3.rotation = this.isLandscape[id] ? 90 : 0;
      rasterBack3.position = new Point(styleW/2 + moveC, styleH/2)
      rasterBack3.scale(this.squeezeScale)
    }
    
    if(this.wherebetis === 'P') return
    if(_s.highestBankerBidder.userId !== _s._getUserID) return
    
    
    

    // ___________                     __    _________                  .___
    // \_   _____/______  ____   _____/  |_  \_   ___ \_____ _______  __| _/
    //  |    __) \_  __ \/  _ \ /    \   __\ /    \  \/\__  \\_  __ \/ __ | 
    //  |     \   |  | \(  <_> )   |  \  |   \     \____/ __ \|  | \/ /_/ | 
    //  \___  /   |__|   \____/|___|  /__|    \______  (____  /__|  \____ | 
    //      \/                      \/               \/     \/           \/ 
    let rasterFront
    let rasterFront2
    let rasterFront3
    if (introCards) {
        rasterFront = new Raster(`card-table-${ this.getCardImage(frontURL0) }`);
        rasterFront.pivot = this.isLandscape[id] ? rasterFront.bounds.leftCenter : rasterFront.bounds.topCenter;
        rasterFront.rotation = this.isLandscape[id] ? 90 : 0;
        rasterFront.position = new Point(styleW / 2 + moveL, (parseInt(styleH) + parseInt(cardH))/2);
        rasterFront.scale(this.squeezeScale);

        rasterFront2 = new Raster(`card-table-${ this.getCardImage(frontURL1) }`);
        rasterFront2.pivot = this.isLandscape[id] ? rasterFront2.bounds.leftCenter : rasterFront2.bounds.topCenter;
        rasterFront2.rotation = this.isLandscape[id] ? 90 : 0;
        rasterFront2.position = new Point(styleW / 2 + moveR, (parseInt(styleH) + parseInt(cardH))/2);
        rasterFront2.scale(this.squeezeScale); 
      }
      if (thirdCard) {
        rasterFront3 = new Raster(`card-table-${ this.getCardImage(frontURL2) }`);
        rasterFront3.pivot = this.isLandscape[id] ? rasterFront3.bounds.leftCenter : rasterFront3.bounds.topCenter;
        rasterFront3.rotation = this.isLandscape[id] ? 90 : 0;
        rasterFront3.position = new Point(styleW / 2 + moveC, (parseInt(styleH) + parseInt(cardH))/2);
        rasterFront3.scale(this.squeezeScale);       
      }

    //    _____                 __    
    //   /     \ _____    _____|  | __
    //  /  \ /  \\__  \  /  ___/  |/ /
    // /    Y    \/ __ \_\___ \|    < 
    // \____|__  (____  /____  >__|_ \
    //         \/     \/     \/     \/
    let pathBack = null
    let pathBack2 = null
    let pathBack3 = null
    let group = null
    let group2 = null
    let group3 = null
    if (introCards) {
        pathBack = new Path.Rectangle(new Rectangle((parseInt(styleW) - parseInt(cardW)) / 2 + moveL, (parseInt(styleH) - parseInt(cardH)) / 2, cardW, cardH));
        pathBack.clipMask = true;
        pathBack2 = new Path.Rectangle(new Rectangle((parseInt(styleW) - parseInt(cardW)) / 2 + moveR, (parseInt(styleH) - parseInt(cardH)) / 2, cardW, cardH));
        pathBack2.clipMask = true;
        group = new Group([rasterBack, rasterFront, pathBack]);
        group2 = new Group([rasterBack2, rasterFront2, pathBack2]);
      }
    if (thirdCard) {
        pathBack3 = new Path.Rectangle(new Rectangle((parseInt(styleW) - parseInt(cardW)) / 2 + moveC, (parseInt(styleH) - parseInt(cardH)) / 2, cardW, cardH));
        pathBack3.clipMask = true; 
        group3 = new Group([rasterBack3, rasterFront3, pathBack3]);
    }
    
    
    
    // ___________.__                             
    // \_   _____/|__| ____    ____   ___________ 
    //  |    __)  |  |/    \  / ___\_/ __ \_  __ \
    //  |     \   |  |   |  \/ /_/  >  ___/|  | \/
    //  \___  /   |__|___|  /\___  / \___  >__|   
    //      \/            \//_____/      \/       
    let fingerL
    let fingerR
    let fingerL2
    let fingerR2
    let fingerL3
    let fingerR3
    let fingerGroup
    let fingerGroup2
    let fingerGroup3
    let fingerScalingR = cardsize / 976
    if (introCards) {
          fingerL = new Raster(finger)
          fingerL.scale(fingerScalingR)
          fingerL.rotate(135)
          fingerR = new Raster(finger)
          fingerR.scale(fingerScalingR)
          fingerR.rotate(-135)
          fingerR.position.x = cardW * 1.05
          fingerGroup = new Group([fingerL, fingerR])
          fingerGroup.position = new Point(styleW / 2 + moveL, (parseInt(styleH) + parseInt(cardH)) / 2)
          fingerGroup.visible = false

          fingerL2 = new Raster(finger)
          fingerL2.scale(fingerScalingR)
          fingerL2.rotate(135)
          fingerR2 = new Raster(finger)
          fingerR2.scale(fingerScalingR)
          fingerR2.rotate(-135)
          fingerR2.position.x = cardW * 1.05
          fingerGroup2 = new Group([fingerL2, fingerR2])
          fingerGroup2.position = new Point(styleW / 2 + moveR, (parseInt(styleH) + parseInt(cardH)) / 2)
          fingerGroup2.visible = false          
    }
    if (thirdCard) {
          fingerL3 = new Raster(finger)
          fingerL3.scale(fingerScalingR)
          fingerL3.rotate(135)
          fingerR3 = new Raster(finger)
          fingerR3.scale(fingerScalingR)
          fingerR3.rotate(-135)
          fingerR3.position.x = cardW * 1.05
          fingerGroup3 = new Group([fingerL3, fingerR3])
          fingerGroup3.position = new Point(styleW / 2 + moveC, (parseInt(styleH) + parseInt(cardH)) / 2)
          fingerGroup3.visible = false          
    }
    //   _________                                           .___        __                                     __  .__               
    //  /   _____/ ________ __   ____   ____ ________ ____   |   | _____/  |_  ___________  ______ ____   _____/  |_|__| ____   ____  
    //  \_____  \ / ____/  |  \_/ __ \_/ __ \\___   // __ \  |   |/    \   __\/ __ \_  __ \/  ___// __ \_/ ___\   __\  |/  _ \ /    \ 
    //  /        < <_|  |  |  /\  ___/\  ___/ /    /\  ___/  |   |   |  \  | \  ___/|  | \/\___ \\  ___/\  \___|  | |  (  <_> )   |  \
    // /_______  /\__   |____/  \___  >\___  >_____ \\___  > |___|___|  /__|  \___  >__|  /____  >\___  >\___  >__| |__|\____/|___|  /
    //         \/    |__|           \/     \/      \/    \/           \/          \/           \/     \/     \/                    \/ 
    // for dragging if user bets on player banker you can only drag player cards
    if((_s.highestBankerBidder.userId === _s._getUserID) &&  (_s.highestPlayerBidder.userId === _s._getUserID)) return


    if(_s.$store.state.currentFlipped.gameEnd) {
      return
    }
      let startDrag = false;
      let startDrag2 = false;
      let startDrag3 = false;

      let updatePath = (pointY) => {
          pathBack.segments[0].point.y = pathBack.segments[3].point.y = (parseInt(styleH) + parseInt(cardH)) / 2 - ((parseInt(styleH) + parseInt(cardH)) / 2 - pointY) / 2;
          pathBack.segments[1].point.y = pathBack.segments[2].point.y = (parseInt(styleH) - parseInt(cardH)) / 2 - ((parseInt(styleH) + parseInt(cardH)) / 2 - pointY) / 2;

          rasterFront.position.y = pointY;
          fingerGroup.position.y = pointY;

          if (pointY < (parseInt(styleH) - parseInt(cardH)) / 2) {
              startDrag = false;
              fingerGroup.visible = true;
              _s.isFlipped[id][0] = true;
              _s.$store.state.currentFlipped.flipped = true
              _s.$store.state.currentFlipped.b1 = true;
              pathBack.clipMask = false;
              TweenLite.set(rasterFront.scaling, { x: cardcanvas, y: cardcanvas }, { x: cardcanvas, y: cardcanvas, onComplete:function(){
                
                
                  _s.isFlipped[id][0] = true;
                  
              }});
              _s.drawSqueezeCardR('right', document.getElementById('squeeze-canvas-R'), true, false);
              this.$store.dispatch('PLAYER_BROADCAST', {
                tableNumber: this._table.tableNumber,
                action: "R_SQUEEZE",
                data: {
                  playerId: this.$store.state.userinfo.id,
                  isSqueeze: false,
                  rightS: false
                }
              });
          }
      };
      let updatePath2 = (pointY) => {
        pathBack2.segments[0].point.y = pathBack2.segments[3].point.y = (parseInt(styleH) + parseInt(cardH)) / 2 - ((parseInt(styleH) + parseInt(cardH)) / 2 - pointY) / 2;
        pathBack2.segments[1].point.y = pathBack2.segments[2].point.y = (parseInt(styleH) - parseInt(cardH)) / 2 - ((parseInt(styleH) + parseInt(cardH)) / 2 - pointY) / 2;

        rasterFront2.position.y = pointY;
        fingerGroup2.position.y = pointY;

        if (pointY < (parseInt(styleH) - parseInt(cardH)) / 2) {
            startDrag2 = false;
            fingerGroup2.visible = true;
            _s.isFlipped[id][1] = true;
            _s.$store.state.currentFlipped.flipped = true
            _s.$store.state.currentFlipped.b2 = true;
            pathBack2.clipMask = false;
            TweenLite.set(rasterFront2.scaling, { x: cardcanvas, y: cardcanvas }, { x: cardcanvas, y: cardcanvas, onComplete:function(){
              _s.isFlipped[id][1] = true;
            }});
            _s.drawSqueezeCardR('right', document.getElementById('squeeze-canvas-R'), true, false);
            this.$store.dispatch('PLAYER_BROADCAST', {
              tableNumber: this._table.tableNumber,
              action: "R_SQUEEZE",
              data: {
                playerId: this.$store.state.userinfo.id,
                isSqueeze: false,
                rightS: false
              }
            });
        }
      };

      let updatePath3 = (pointY) => {
        pathBack3.segments[0].point.y = pathBack3.segments[3].point.y = (parseInt(styleH) + parseInt(cardH)) / 2 - ((parseInt(styleH) + parseInt(cardH)) / 2 - pointY) / 2;
        pathBack3.segments[1].point.y = pathBack3.segments[2].point.y = (parseInt(styleH) - parseInt(cardH)) / 2 - ((parseInt(styleH) + parseInt(cardH)) / 2 - pointY) / 2;

        rasterFront3.position.y = pointY;
        fingerGroup3.position.y = pointY;

        if (pointY < (parseInt(styleH) - parseInt(cardH)) / 2) {
            startDrag3 = false;
            fingerGroup3.visible = true;
            this.isFlipped[id][2] = true;
            _s.$store.state.currentFlipped.flipped = true
            _s.$store.state.currentFlipped.b3 = true;
            _s.$store.state.currentFlipped.thirdCard = true;
            pathBack3.clipMask = false;
            TweenLite.set(rasterFront3.scaling, { x: cardcanvas, y: cardcanvas }, { x: cardcanvas, y: cardcanvas, onComplete:function(){
                this.isFlipped[id][2] = true;
            }});
            _s.drawSqueezeCardR('right', document.getElementById('squeeze-canvas-R'), false, true);
            this.$store.dispatch('PLAYER_BROADCAST', {
              tableNumber: this._table.tableNumber,
              action: "R_SQUEEZE",
              data: {
                playerId: this.$store.state.userinfo.id,
                isSqueeze: false,
                rightS: false
              }
            });
        }
      };
      if(introCards) {
        rasterBack.onMouseDown = (event) => {
          if (this.isFlipped[id][0]) return  
            startDrag = true;
            fingerGroup.visible = true;
            updatePath(event.point.y);
            this.$store.dispatch('PLAYER_BROADCAST', {
              tableNumber: this._table.tableNumber,
              action: "R_SQUEEZE",
              data: {
                playerId: this.$store.state.userinfo.id,
                isSqueeze: true,
                rightS: true
              }
            });
        };
        rasterBack2.onMouseDown = (event) => {
          if (this.isFlipped[id][1]) return
          startDrag2 = true;
          fingerGroup2.visible = true;
          updatePath2(event.point.y);
          this.$store.dispatch('PLAYER_BROADCAST', {
            tableNumber: this._table.tableNumber,
            action: "R_SQUEEZE",
            data: {
              playerId: this.$store.state.userinfo.id,
              isSqueeze: true,
              rightS: true
            }
          });
        };
      }
      if(thirdCard) {
        rasterBack3.onMouseDown = (event) => {
          if (this.isFlipped[id][2]) return
          startDrag3 = true;
          fingerGroup3.visible = true;
          updatePath3(event.point.y);
          this.$store.dispatch('PLAYER_BROADCAST', {
            tableNumber: this._table.tableNumber,
            action: "R_SQUEEZE",
            data: {
              playerId: this.$store.state.userinfo.id,
              isSqueeze: true,
              rightS: true
            }
          });
        };
      }
      _paper.tool.onMouseMove = (event) => {
          if (startDrag) {
            updatePath(event.point.y);
            this.$store.dispatch('PLAYER_BROADCAST', {
              tableNumber: this._table.tableNumber,
              action: "R_SQUEEZE",
              data: {
                playerId: this.$store.state.userinfo.id,
                isSqueeze: true,
                rightS: true,
                R1: true,
                HB: _s.highestBankerBidder.userId
              }
          });
          } else if (startDrag2) {
            updatePath2(event.point.y); 
            this.$store.dispatch('PLAYER_BROADCAST', {
              tableNumber: this._table.tableNumber,
              action: "R_SQUEEZE",
              data: {
                playerId: this.$store.state.userinfo.id,
                isSqueeze: true,
                rightS: true,
                R2: true,
                HB: _s.highestBankerBidder.userId
              }
          });
          } else if (startDrag3) {
            updatePath3(event.point.y);
            this.$store.dispatch('PLAYER_BROADCAST', {
              tableNumber: this._table.tableNumber,
              action: "R_SQUEEZE",
              data: {
                playerId: this.$store.state.userinfo.id,
                isSqueeze: true,
                rightS: true,
                R2: true,
                HB: _s.highestBankerBidder.userId
              }
          });
          }
          
      };
      _paper.tool.onMouseUp = (event) => {
          this.$store.dispatch('PLAYER_BROADCAST', {
            tableNumber: this._table.tableNumber,
            action: "R_SQUEEZE",
            data: {
              playerId: this.$store.state.userinfo.id,
              isSqueeze: false,
              leftS: false,
              R1: false,
              R2: false,
              R3: false
            }
          });
          
          if(introCards) {
            startDrag = false;
            startDrag2 = false;
            fingerGroup.visible = false;
            fingerGroup2.visible = false;

            pathBack.segments[0].point.y = pathBack.segments[3].point.y = (parseInt(styleH) + parseInt(cardH)) / 2;
            pathBack.segments[1].point.y = pathBack.segments[2].point.y = (parseInt(styleH) - parseInt(cardH)) / 2;

            pathBack2.segments[0].point.y = pathBack2.segments[3].point.y = (parseInt(styleH) + parseInt(cardH)) / 2;
            pathBack2.segments[1].point.y = pathBack2.segments[2].point.y = (parseInt(styleH) - parseInt(cardH)) / 2;
               
            if (!this.isFlipped[id][0]) {
              rasterFront.position.y = (parseInt(styleH) + parseInt(cardH)) / 2;
            }
            if (!this.isFlipped[id][1]) {
              rasterFront2.position.y = (parseInt(styleH) + parseInt(cardH)) / 2;
            }
          } 
          if(thirdCard) {
            startDrag3 = false;
            fingerGroup3.visible = false;

            pathBack3.segments[0].point.y = pathBack3.segments[3].point.y = (parseInt(styleH) + parseInt(cardH)) / 2;
            pathBack3.segments[1].point.y = pathBack3.segments[2].point.y = (parseInt(styleH) - parseInt(cardH)) / 2;

            if (!this.isFlipped[id][2]) {
              rasterFront3.position.y = (parseInt(styleH) + parseInt(cardH)) / 2;
            }
          }
      };
    }
  },
  watch: {
    getStatus: function () {
      let _s = this
      this.onRedrawCard()      
    },
    bankerCard1: function () { this.return_bankerCard1(this.bankerCard1) },
    bankerCard2: function () { this.return_bankerCard2(this.bankerCard2) },
    bankerCard3: function () { this.return_bankerCard3(this.bankerCard3) },
    playerCard1: function () { this.return_playerCard1(this.playerCard1) },
    playerCard2: function () { this.return_playerCard2(this.playerCard2) },
    playerCard3: function () { this.return_playerCard3(this.playerCard3) },
    getCardbeingSqueezed: function () {
      let cardInfo = this.getCardbeingSqueezed
      console.log('CARD THROWN: ', cardInfo)
    },
    _getSqueezeUpdate: function (v) {
      console.log('V: ', v)
    }
  },
  computed: {
    _getSqueezeUpdate: {
      get () {
        return this.$store.state.tablelist[this._table.tableNumber].squeezeUpdate
      },
      set (v) {
        this.$store.state.tablelist[this._table.tableNumber].squeezeUpdate = v
      }
    },
    _getUserID: {
      get () {
        return this.$store.state.userinfo.id
      }
    },
    highestPlayerBidder: {
      get () {
        return this._table.highestPlayerBidder
      }
    },
    highestBankerBidder: {
      get () {
        return this._table.highestBankerBidder
      }
    },
    getCardbeingSqueezed: {
      get () {
        return this.$store.state.tablelist[this.currentTableIndex].squeezeUpdate
      }
    },
    cardsItem: {
      get() {
        return this.$store.state.currentFlipped.cardsItem
      }
    },
    isFlipped: {
      get() {
        return this.$store.state.currentFlipped.isFlipped
      }
    },
    getAllcards: {
      get () {
        return this._table.game
      }
    },
    getBettingtable: {
      get () {
        return this.$store.state.currenttab
      }
    },
    currentTableIndex: {
      get () {
        return this.$store.state.currentTableIndex
      }
    },
    getStatus: {
      get () {
        return this.$store.state.currentTableInfo.status
      }
    },
    _table: {
      get () {
        return this.$store.state.tablelist[this.currentTableIndex]
      }
    },
    status: {
      get () {
        try {
          return this._table.status
        } catch (err) {
        }
      }
    },
    bankerCards: {
      get () {
        return this._table.game.cards ? this._table.game.cards.banker : ''
      }
    },
    playerCards: {
      get () {
        return this._table.game.cards ? this._table.game.cards.player : ''
      }
    },
    bankerCard1: {
      get () {
        return this.bankerCards.card1 ?  this.bankerCards.card1.toLowerCase().replace('a', '1') : ''
      }
    },
    bankerCard2: {
      get () {
        return this.bankerCards.card2 ?  this.bankerCards.card2.toLowerCase().replace('a', '1') : ''
      }
    },
    bankerCard3: {
      get () {
        if (this.getBettingtable === 'baccarat') {
          return this.bankerCards.card3 ?  this.bankerCards.card3.toLowerCase().replace('a', '1') : ''
        }
      }
    },
    playerCard1: {
      get () {
        return this.playerCards.card1 ?  this.playerCards.card1.toLowerCase().replace('a', '1') : ''
      }
    },
    playerCard2: {
      get () {
        return this.playerCards.card2 ?  this.playerCards.card2.toLowerCase().replace('a', '1') : ''
      }
    },
    playerCard3: {
      get () {
        if (this.getBettingtable === 'baccarat') {
          return this.playerCards.card3 ?  this.playerCards.card3.toLowerCase().replace('a', '1') : ''
        }
      }
    }
  }
}
