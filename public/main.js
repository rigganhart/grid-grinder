(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

let Router = require('./router');


window.addEventListener('load', function(){
  let mainRouter = new Router();
  Backbone.history.start();
});

},{"./router":7}],2:[function(require,module,exports){
let HighScore = require('./highscore');

module.exports = Backbone.Collection.extend({
    url: 'http://grid.queencityiron.com/api/highscore',
    model: HighScore,
    getHighscoreFromServer: function() {
        this.fetch();
    },
});

},{"./highscore":3}],3:[function(require,module,exports){


module.exports = Backbone.Model.extend({

url:'http://grid.queencityiron.com/api/highscore',

defaults: {
  name:"",
  score: 0,
  playerType:"",
}

});

},{}],4:[function(require,module,exports){

let HighScores = require("./highscore.collection");
let PlayerTypes = require("./types")

module.exports = Backbone.Model.extend({

    initialize: function(){
      this.types = new PlayerTypes();
    },
    defaults: {

        name: "DumDum",
        playerType:"",
        score: 0,
        x: 0,
        y: 0,
    },

    up: function() {
      if(this.get('y') < 10){
        this.set('y', this.get('y') + 1);
      };
    },

    down: function() {
      if(this.get('y') > 0){
        this.set('y', this.get('y') - 1);
      };
    },

    left: function() {
      if(this.get('x') > 0){
        this.set('x', this.get('x') - 1);
      };
    },

    right: function() {
      if(this.get('x') < 10){
        this.set('x', this.get('x') + 1);
      };
    },

    decreaseEnergy: function() {
      if(this.get('energy')> 0){
            if(this.get('size') === 'small'){
              this.set('energy', this.get('energy') - 1)
            } else if (this.get('size') === 'large'){
              this.set('energy', this.get('energy') - 2)
            } else {
              this.set('energy', this.get('energy') -1)
            }
          } else {
            console.log(`you  are out of energy: ${this.get('energy')}`);
            this.trigger('death', this.model);
          }

    },
    changeMoves: function(){
        this.set('moves', this.get('moves')+1)
    },

    setPlayer: function(){
      this.set('name', document.getElementById('name').value);
      this.set('playerType', event.target.textContent)
// luke wrote this:
      let target = this.types.find(function (type) {
        return type.get('name') === event.target.textContent;
      });
    },

    getPlayers: function(){
      this.types.getPlayersFromserver();
    },
    sendScore: function(){
      let highscore = new HighScore({
        name: this.get('name'),
        score: this.get('score'),
        playerType: this.get('playerType')
      });
      highscore.save();
    },

});

},{"./highscore.collection":2,"./types":5}],5:[function(require,module,exports){
let Types = require('./types.model');


module.exports = Backbone.Collection.extend({
    url: 'http://grid.queencityiron.com/api/players',
    model: Types,

    getPlayersFromserver: function() {
      let self = this;
        this.fetch({
          success: function(){
            self.trigger('newtypes', this.model);
          }
        });
    },
});

},{"./types.model":6}],6:[function(require,module,exports){
module.exports = Backbone.Model.extend({

    defaults: {
        name: "",
        energyPerMove: 1,
        startingEnergy: 20
    }



});

},{}],7:[function(require,module,exports){
let CreateView = require('./views/create');
let GameView = require('./views/game');
let GameModel = require('./models/model');
let GameOver = require('./views/gameover');

module.exports = Backbone.Router.extend({
    initialize: function() {
        let stuff = new GameModel();
        let that = this;

        this.user = new CreateView({
            model: stuff,
            el: document.getElementById('user'),
        });

        this.game = new GameView({
            model: stuff,
            el: document.getElementById('game'),
        });

        this.endGame = new GameOver({
            model: stuff,
            el: document.getElementById('game-over'),
        });
        stuff.on('death', function(stuff){
          that.navigate('over', {trigger: true});
        });
        this.user.on('start', function(stuff){
          that.navigate('agame', {trigger: true});
        });
        this.game.on('create', function(stuff){
          that.navigate('anew', {trigger:true});
        })
    },

    routes: {
        'anew': 'newPlayer',
        'agame': 'gameStart',
        'over': 'gameOver',
        '': 'newPlayer',
    },

    newPlayer: function() {
        console.log('make a new player');
        this.user.el.classList.remove('hidden');
        this.game.el.classList.add('hidden');
        this.endGame.el.classList.add('hidden');
        this.trigger('load', this.model);
    },

    gameStart: function() {
        console.log('play the game');
        this.game.el.classList.remove('hidden');
        this.user.el.classList.add('hidden');
        this.endGame.el.classList.add('hidden');
    },

    gameOver: function() {
        console.log('you are out of energy');
        this.endGame.el.classList.remove('hidden');
        this.user.el.classList.add('hidden');
        this.game.el.classList.add('hidden');
    },

});

},{"./models/model":4,"./views/create":8,"./views/game":9,"./views/gameover":10}],8:[function(require,module,exports){
// let GameModel = require('../models/model');

module.exports = Backbone.View.extend({

    initialize: function() {
        this.model.on('change', this.render, this);
        this.model.types.on('newtypes', this.render, this);
        this.model.getPlayers();
    },

    events: {

        'click button': 'startGame',

    },



    startGame: function(event) {
      // console.log(event.target.textContent);
      this.model.setPlayer();
      this.trigger('start', this.model);
    },


    render: function() {
      let listOfTypes =  this.el.querySelector('#playerType');
      listOfTypes.innerHTML="";
      this.model.types.forEach(function(element){
        let button = document.createElement('button');
        button.textContent = element.get('name');
        button.id = element.get('name');

        listOfTypes.appendChild(button);
      });


    },
});

},{}],9:[function(require,module,exports){
// let GameModel = require('../models/model');


module.exports = Backbone.View.extend({

  initialize: function () {
        this.model.on('change', this.render, this);
    },

    events: {
      'click #up': 'clickUp',
      'click #down': 'clickDown',
      'click #left': 'clickLeft',
      'click #right': 'clickRight',
      'click button': 'changeEnergy',
      'click #newPlayer': 'startOver',
    },

    clickUp: function(){
      console.log('clicked up');
      this.model.up();
    },
    clickDown: function(){
      console.log('clicked down');
      this.model.down();
    },
    clickLeft: function(){
      console.log('clicked left');
      this.model.left();
    },
    clickRight: function(){
      console.log('clicked right');
      this.model.right();
    },

    changeEnergy: function(){
      console.log('decrease');
        this.model.decreaseEnergy();
        this.model.changeMoves();
    },
    startOver: function(){
      this.trigger('create', this.model);
    },


    render: function(){
      let x = this.el.querySelector('#x');
      x.textContent = this.model.get('x')+",";

      let y = this.el.querySelector('#y');
      y.textContent = this.model.get('y');

      let newMoves = this.el.querySelector('#moves');
      newMoves.textContent = "Moves:" + this.model.get('moves');

      let character = this.el.querySelector('#character');
      character.textContent = `Name: ${this.model.get('name')} Player Type:${this.model.get('playerType')}`
    }



});

},{}],10:[function(require,module,exports){
let GameModel = require('../models/model');


module.exports = Backbone.View.extend({

  initialize: function () {
        this.model.on('change', this.render, this);
    },

    events: {
      'click #add-scores': 'addScore',

    },

    addScore: function(){
      this.model.sendScore();

    },

    render: function(){
      let highScores = this.el.querySelector('#score-list');

      highScores.textContent = `Name: ${this.model.get('name')} Score: ${this.model.get('score')} Type: ${this.model.get('playerType')} `;
    }
});

},{"../models/model":4}]},{},[1])