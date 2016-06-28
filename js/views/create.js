module.exports = Backbone.View.extend({

    initialize: function() {
        this.model.on('change', this.render, this);
    },

    events: {


        'click button': 'clickStart',
    },


    clickStart: function() {
        let user = this.el.querySelector('#name').value;
        console.log(user);
        this.model.start();
    },
    render: function() {
        // let user = this.el.querySelector('#name');


    },
});
