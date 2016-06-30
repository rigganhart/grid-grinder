
let HighScore = require("./highscore");


module.exports = Backbone.Model.extend({
    // url:'http://grid.queencityiron.com/api/players',


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
            playerType: document.getElementById('size').value,
            energy: 10,
            score: 0,
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
        this.set('playerType', user.playerType);
        this.set('energy', user.energy);
        this.set('score', user.score);
      // this.save();
    },
    saveUserName: function(){
      let newName = document.getElementById('name').value;
      this.set('name', newName)
    },

    getPlayers: function(){

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
