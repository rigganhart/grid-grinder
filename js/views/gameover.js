let GameModel = require('../models/model');


module.exports = Backbone.View.extend({

  initialize: function () {
        this.model.on('change', this.render, this);
        this.model.getScoresCollection();
        this.model.scoreList.on('highscores', this.render, this);


    },

    events: {
      'click #add-scores': 'addScore',

    },

    addScore: function(){
      this.model.sendScore();
      // this.model.getScoresCollection();
    },

    render: function(){
      let playerScore = this.el.querySelector('#playerScore');
      playerScore.textContent = `Name: ${this.model.get('name')} Score: ${this.model.get('score')} Type: ${this.model.get('playerType')} `;

      var listOfScores = this.el.querySelector('#scoreList');
      listOfScores.innerHTML = "";
      this.model.scoreList.forEach(function(element, idx){
        if (idx < 5) {
        // console.log(element.get('name'));
        var score = document.createElement('li');
        score.textContent = `${element.get('name')}---Score: ${element.get('score')}--- Player Type: ${element.get('playerType')}`;
        // console.log(listOfScores);
        listOfScores.appendChild(score);
      }
      });
    }
});
