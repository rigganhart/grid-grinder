// let GameModel = require('../models/model');


module.exports = Backbone.View.extend({

    initialize: function() {
        this.model.on('change', this.render, this);
        this.on('boost', this.moveBoost, this);
    },

    events: {
        'click #up': 'clickUp',
        'click #down': 'clickDown',
        'click #left': 'clickLeft',
        'click #right': 'clickRight',
        'click button': 'changeEnergy',
        'click #newPlayer': 'startOver',
        'boost' : 'moveBoost',
    },

    clickUp: function() {
        console.log('clicked up');
        this.model.up();
    },
    clickDown: function() {
        console.log('clicked down');
        this.model.down();
    },
    clickLeft: function() {
        console.log('clicked left');
        this.model.left();
    },
    clickRight: function() {
        console.log('clicked right');
        this.model.right();
    },

    changeEnergy: function() {
        console.log('decrease');
        this.model.decreaseEnergy();
        this.model.changeScore();
    },
    startOver: function() {
        this.trigger('create', this.model);
    },
    moveBoost: function(){
      console.log('should move boost and add energy');
      this.model.setBoost();
      this.model.addEnergy();
    },

    render: function() {
        let x = this.el.querySelector('#x');
        x.textContent = this.model.get('x') + ",";

        let y = this.el.querySelector('#y');
        y.textContent = this.model.get('y');

        let newScore = this.el.querySelector('#score');
        newScore.textContent = `Score: ${this.model.get('score')}`;

        let character = this.el.querySelector('#character');
        character.textContent = `Name: ${this.model.get('name')} Player Type:${this.model.get('playerType')}`;

        let energy = this.el.querySelector('#energy');
        energy.textContent = `Energy: ${this.model.get('startingEnergy')}`
// Thanks to Geoff for help with the grid:
        let grid = this.el.querySelector('#grid');
        grid.innerHTML = "";

        for (let y = 0; y < this.model.get('gamesize'); y++) {
            var row = document.createElement('div');
            row.classList.add('row')
            for (let x = 0; x < this.model.get('gamesize'); x++) {
                var col = document.createElement('div');
                col.classList.add('col')
                if(this.model.get('y') === y && this.model.get('x') === x){
                  col.classList.add('player');
                }
                if(this.model.get('powerY') === y && this.model.get('powerX') === x){
                  col.classList.add('powerup');
                }
                if(this.model.get('y')===this.model.get('powerY') && this.model.get('x')=== this.model.get('powerX')) {
                  
                  let self= this;
                  self.trigger('boost', this.model);
                }

                row.appendChild(col);
            }
            grid.appendChild(row);
        }




    }



});
