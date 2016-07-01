let Types = require('./types.model');


module.exports = Backbone.Collection.extend({
    url: 'http://grid.queencityiron.com/api/players',
    model: Types,

    getPlayersFromserver: function() {
      let self = this;
        this.fetch({
          success: function(){
            self.trigger('newtypes', this.model);
          }
        });
    },
});
