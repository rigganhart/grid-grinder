let Types = require('./types.model');


module.exports = Backbone.Collection.extend({
    url: 'http://grid.queencityiron.com/api/players',
    model: Types,

    getPlayersFromserver: function() {
      let self = this;
      console.log('look to server for players');
        this.fetch({
          success: function(){
            console.log('we got some players from the server!');
            console.log(self);
            self.trigger('newtypes', this.model);
          }
        });
    },
});
