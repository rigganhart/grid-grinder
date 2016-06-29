let GameModel = require('../models/model');


module.exports = Backbone.View.extend({

  initialize: function () {
        this.model.on('change', this.render, this);
    },

    events: {

      
    },

    lose: function(){


    },

    render: function(){

    }
});
