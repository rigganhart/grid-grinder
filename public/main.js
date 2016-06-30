(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

let Router = require('./router');


window.addEventListener('load', function(){
  let mainRouter = new Router();
  Backbone.history.start();
});

},{"./router":4}],2:[function(require,module,exports){
module.exports = Backbone.Model.extend({

  defaults: {
    name: "player",
    score: 2,
    playerType: "tiny",
  }













});

},{}],3:[function(require,module,exports){
module.exports = Backbone.Model.extend({
    url:'http://grid.queencityiron.com/api/players',


    defaults: {
        name: "DumDum",
        size: "small",
        energy: 10,
        moves: 0,
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

    choose: function() {
        let user = {
            name: document.getElementById('name').value,
            size: document.getElementById('size').value,
            energy: 10,
            moves: 0,
            x: 0,
            y: 0,
        };
        if (user.size === "large") {
            user.energy = 15
        } else if(user.size === "hulk"){
          user.energy = 500
        }
        console.log('clicked');
        console.log(`user: ${user.name} size: ${user.size} energy: ${user.energy}`);
        this.set('name', user.name);
        this.set('size', user.size);
        this.set('energy', user.energy);
        this.set('moves', user.moves);
      // this.save();
    },
    saveUser: function(){
      let newName = documetn.getElementById('name').value;
      this.set('name', newName)
    },




});

},{}],4:[function(require,module,exports){
let CreateView = require('./views/create');
let GameView = require('./views/game');
let GameModel = require('./models/model');
let GameOver = require('./views/gameover');
let HighScore = require('./models/higscore')

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
        let self = this;
        let scoreList = new HighScore();
        scoreList.fetch({
          url:"",
          success: function(){
            self.gameOver.model = scoreList;
            self.gameOver.render();
          }
        });
    },

});

},{"./models/higscore":2,"./models/model":3,"./views/create":5,"./views/game":6,"./views/gameover":7}],5:[function(require,module,exports){
// let GameModel = require('../models/model');

module.exports = Backbone.View.extend({

    initialize: function() {
        this.model.on('change', this.render, this);
    },

    events: {

        'click #saveName': 'saveName',
        'click #start': 'clickStart',

    },
    saveName: function(){
        this.model.saveUserName();
        
    },

    clickStart: function() {
        this.model.choose();
    },

    render: function() {
        let newPlayer = document.getElementById('character');
        newPlayer.textContent = `${this.model.get('name')} Energy:${this.model.get('energy')}`;
    },
});

},{}],6:[function(require,module,exports){
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



    render: function(){
      let x = this.el.querySelector('#x');
      x.textContent = this.model.get('x')+",";

      let y = this.el.querySelector('#y');
      y.textContent = this.model.get('y');

      let newMoves = this.el.querySelector('#moves');
      newMoves.textContent = "Moves:" + this.model.get('moves');
    }



});

},{}],7:[function(require,module,exports){
let GameModel = require('../models/model');


module.exports = Backbone.View.extend({

  initialize: function () {
        this.model.on('change', this.render, this);
    },

    events: {
      'click #add-scores': 'addScore',

    },

    addScore: function(){


    },

    render: function(){
      let highScores = this.el.querySelector('#score-list');

      highScores.textContent = `Name: ${this.model.get('name')} Score: ${this.model.get('score')} Type: ${this.model.get('playerType')} `;
    }
});

},{"../models/model":3}]},{},[1])