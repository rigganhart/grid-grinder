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
