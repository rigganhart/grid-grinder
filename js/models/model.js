
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
