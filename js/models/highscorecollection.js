let HighScore = require('./highscore');

module.exports = Backbone.Collection.extend({
    url: 'http://grid.queencityiron.com/api/highscore',
    model: HighScore,
    getHighscoreFromServer: function() {
      console.log('ask server for scores');
      let self = this;
        this.fetch({
          success: function(){
            console.log('server gave highscores');
            self.trigger('highscores', this.model);
          }
        });
    },
    sendHighScore: function(){
        ``
      self.save()
    },
});
