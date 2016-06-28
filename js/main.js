let GameModel = require('./models/model');
let CreateView = require('./views/create');
let GameView = require('./views/game');
let GameCollection = require('./collection');
let Router = require('./router');


window.addEventListener('load', function(){
  let gmodel = new GameModel();

  let user = new CreateView({
      model: gmodel,
      el: document.getElementById('user'),
    });

  let game = new GameView({
    model: gmodel,
    el: document.getElementById('game'),
  });





})
