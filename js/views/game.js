// let GameModel = require('../models/model');


module.exports = Backbone.View.extend({

    initialize: function() {
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

        let grid = this.el.querySelector('#grid');

        // addCell =
        //     for (let y = 0; y < this.get('gamesize'); y++) {
        //         row = document.createElement('div');
        //         for (let x = 0; x < this.get('gamesize'); x++) {
        //             cell = document.createElement('div');
        //         }
        //     }




    }



});
