
let Router = require('./router');


window.addEventListener('load', function(){
  let mainRouter = new Router();
  Backbone.history.start();
});
