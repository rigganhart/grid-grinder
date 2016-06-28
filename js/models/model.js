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
