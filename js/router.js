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
        // console.log('make a new player');
        this.user.el.classList.remove('hidden');
        this.game.el.classList.add('hidden');
        this.endGame.el.classList.add('hidden');
        // this.trigger('load', this.model);
    },

    gameStart: function() {
        // console.log('play the game');
        this.game.el.classList.remove('hidden');
        this.user.el.classList.add('hidden');
        this.endGame.el.classList.add('hidden');
    },

    gameOver: function() {
        // console.log('you are out of energy');
        this.endGame.el.classList.remove('hidden');
        this.user.el.classList.add('hidden');
        this.game.el.classList.add('hidden');
    },

});
