// let GameModel = require('../models/model');

module.exports = Backbone.View.extend({

    initialize: function() {
        this.model.on('change', this.render, this);
    },

    events: {


        'click button': 'clickStart',
    },


    clickStart: function() {
        this.model.choose();
    },

    render: function() {
        let newPlayer = document.getElementById('character');
        newPlayer.textContent = `${this.model.get('name')} Energy:${this.model.get('energy')}`;
    },
});
