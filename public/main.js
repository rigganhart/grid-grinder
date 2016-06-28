(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
let gameCollection = Backbone.Collection.extend({




});

},{}],2:[function(require,module,exports){
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

},{"./collection":1,"./models/model":3,"./router":4,"./views/create":5,"./views/game":6}],3:[function(require,module,exports){
module.exports = Backbone.Model.extend({

  defaults: {
          name: document.getElementById('#name')||"DumDum",
          x: 0,
          y: 0,
      },

up: function(){
  this.set('y',this.get('y')+1);
},

down: function(){
  this.set('y',this.get('y')-1);

},

left: function(){
  this.set('x',this.get('x')-1);
},

right: function(){
  this.set('x',this.get('x')+1);
},

start: function(){
  console.log('start');
  this.set('name', this.get('name'));
  console.log(this.get('name'));
}




});

},{}],4:[function(require,module,exports){
module.exports = Backbone.Router.extend({





});

},{}],5:[function(require,module,exports){
module.exports = Backbone.View.extend({

    initialize: function() {
        this.model.on('change', this.render, this);
    },

    events: {


        'click button': 'clickStart',
    },


    clickStart: function() {
        let user = this.el.querySelector('#name').value;
        console.log(user);
        this.model.start();
    },
    render: function() {
        // let user = this.el.querySelector('#name');


    },
});

},{}],6:[function(require,module,exports){
module.exports = Backbone.View.extend({

  initialize: function () {
        this.model.on('change', this.render, this);
    },

    events: {
      'click #up': 'clickUp',
      'click #down': 'clickDown',
      'click #left': 'clickLeft',
      'click #right': 'clickRight',
    },

    clickUp: function(){
      console.log('clicked up');
      this.model.up();
    },
    clickDown: function(){
      console.log('clicked down');
      this.model.down();
    },
    clickLeft: function(){
      console.log('clicked left');
      this.model.left();
    },
    clickRight: function(){
      console.log('clicked right');
      this.model.right();
    },




    render: function(){
      let x = this.el.querySelector('#x');
      x.textContent = this.model.get('x');

      let y = this.el.querySelector('#y');
      y.textContent = this.model.get('y');
    }



});

},{}]},{},[2])