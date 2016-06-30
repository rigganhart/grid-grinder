// let GameModel = require('../models/model');

module.exports = Backbone.View.extend({

    initialize: function() {
        this.model.on('change', this.render, this);
        this.model.types.on('newtypes', this.render, this);
        this.model.on('load',this.render,this);
        this.model.getPlayers();
    },

    events: {

        'click button': 'startGame',

    },



    startGame: function(event) {
      console.log(event.target.textContent);
        this.trigger('start', this.model);
    },


    render: function() {
      let listOfTypes =  this.el.querySelector('#playerType');
      console.log(this.model.types);
      this.model.types.forEach(function(element){
        console.log(element.get('name'));
        let button = document.createElement('button');
        button.textContent = element.get('name');
        listOfTypes.appendChild(button);
      });


    },
});
