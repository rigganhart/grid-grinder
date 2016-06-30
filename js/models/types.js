let GameModel = require('./model');


module.exports = Backbone.Collection.extend({
  url:'http://grid.queencityiron.com/api/players',

  model:GameModel,


});
