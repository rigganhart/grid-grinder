let Types = require('./types.model');


module.exports = Backbone.Collection.extend({
    url: 'http://grid.queencityiron.com/api/players',
    model: Types,

    getPlayersFromserver: function() {
      console.log('ask server for players');
      let self = this;
        this.fetch({
          success: function(){
            console.log('server gave us players');
            self.trigger('newtypes', this.model);
          }
        });
    },
});
