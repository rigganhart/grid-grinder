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
