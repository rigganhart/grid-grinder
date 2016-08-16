

module.exports = Backbone.Model.extend({

url:'http://grid.queencityiron.com/api/highscore',

defaults: {
  name:"",
  score: 0,
  playerType:"",
}

});
