
let HighScore = require('./highscore');

module.exports = Backbone.Collection.extend({
  url:'http://grid.queencityiron.com/api/highscore',
  model: HighScore,


});
