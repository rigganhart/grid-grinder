let HighScores = require("./highscorecollection");
let PlayerTypes = require("./types")

module.exports = Backbone.Model.extend({

    initialize: function() {
        this.types = new PlayerTypes();
        this.scoreList = new HighScores();
    },
    url:'http://grid.queencityiron.com/api/highscore',
    defaults: {
        gamesize: 10,
        name: "DumDum",
        playerType: "",
        startingEnergy: 0,
        energyPerMove: 0,
        score: 0,
        x: 0,
        y: 0,
        powerY:0,
        powerX:0,
        boostAmmount:10,
        badY:0,
        badX:5,
    },

    down: function() {
        if (this.get('y') < 10) {
            this.set('y', this.get('y') + 1);
        };
    },

    up: function() {
        if (this.get('y') > 0) {
            this.set('y', this.get('y') - 1);
        };
    },

    left: function() {
        if (this.get('x') > 0) {
            this.set('x', this.get('x') - 1);
        };
    },

    right: function() {
        if (this.get('x') < 10) {
            this.set('x', this.get('x') + 1);
        };
    },
    damagePlayer: function(){
      console.log('model damages');
      if(this.get('startingEnergy') <= 20){
        this.trigger('death', this.model);
      } else {
      this.set('startingEnergy', this.get('startingEnergy')- 20);
    }
    },

    decreaseEnergy: function() {
        if (this.get('startingEnergy') > 0) {
            this.set('startingEnergy', this.get('startingEnergy') - this.get('energyPerMove'))
        } else {
            console.log(`you  are out of energy: ${this.get('startingEnergy')}`);
            this.trigger('death', this.model);
        }

    },
    moveBaddie: function(){
      this.set('badY', Math.ceil(Math.random() * 10));
      this.set('badX', Math.ceil(Math.random() * 10));
      // if(this.get('badY') < 10){
      //   this.set(this.get('badY'), this.get('badY') + 1);
      // }
    },

    changeScore: function() {
        this.set('score', this.get('score') + 10)
    },

    setPlayer: function() {
        // luke wrote this:
        let target = this.types.find(function(type) {
            return type.get('name') === event.target.textContent;
        });
        // end of lukes stuff
        console.log(target.get('startingEnergy'));
        this.set('name', document.getElementById('name').value);
        this.set('playerType', event.target.textContent)
        this.set('startingEnergy',  target.get('startingEnergy'));
        this.set('energyPerMove', target.get('energyPerMove'));
        this.set('x', Math.ceil(Math.random() * 10));
        this.set('y', Math.ceil(Math.random() * 10));
        this.set('score', 0);

    },
    setBoost: function(){
      this.set('powerY', Math.ceil(Math.random() * 10));
      this.set('powerX', Math.ceil(Math.random() * 10));
      this.set('boostAmmount', Math.ceil(Math.random() * 10));
    },
    addEnergy: function(){
      this.set('startingEnergy', this.get('startingEnergy')+this.get('boostAmmount'));
    },
    getPlayers: function() {
        console.log('tell collection to get players');
        this.types.getPlayersFromserver();
    },
    sendScore: function() {
        let self = this;
            console.log("send high score");
            this.save({},{
              success: function(){
              console.log("got response");
              self.getScoresCollection();
            }})

    },
    getScoresCollection: function(){
      this.scoreList.getHighscoreFromServer();
    },

});
