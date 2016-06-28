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
