module.exports = Backbone.Model.extend({
    // url:'/',


    defaults: {
        name: "DumDum",
        size: "small",
        energy: 10,
        moves: 0,
        x: 0,
        y: 0,
    },

    up: function() {
      if(this.get('y') < 10){
        this.set('y', this.get('y') + 1);
      };
    },

    down: function() {
      if(this.get('y') > 0){
        this.set('y', this.get('y') - 1);
      };
    },

    left: function() {
      if(this.get('x') > 0){
        this.set('x', this.get('x') - 1);
      };
    },

    right: function() {
      if(this.get('x') < 10){
        this.set('x', this.get('x') + 1);
      };
    },

    decreaseEnergy: function() {
      if(this.get('energy')> 0){
            if(this.get('size') === 'small'){
              this.set('energy', this.get('energy') - 1)
            } else if (this.get('size') === 'large'){
              this.set('energy', this.get('energy') - 2)
            } else {
              this.set('energy', this.get('energy') -1)
            }
          } else {
            console.log(`you  are out of energy: ${this.get('energy')}`);
            this.trigger('death', this.model);
          }

    },

    choose: function() {
        let user = {
            name: document.getElementById('name').value,
            size: document.getElementById('size').value,
            energy: 10,
            moves: 0,
            x: 0,
            y: 0,
        };
        if (user.size === "large") {
            user.energy = 15
        }
        console.log('clicked');
        console.log(`user: ${user.name} size: ${user.size} energy: ${user.energy}`);
        this.set('name', user.name);
        this.set('size', user.size);
        this.set('energy', user.energy);
        this.set('moves', user.moves);

        // this.save();
    },





});
