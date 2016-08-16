(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);throw new Error("Cannot find module '" + o + "'");
            }var f = n[o] = { exports: {} };t[o][0].call(f.exports, function (e) {
                var n = t[o][1][e];return s(n ? n : e);
            }, f, f.exports, e, t, n, r);
        }return n[o].exports;
    }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) s(r[o]);return s;
})({ 1: [function (require, module, exports) {

        let Router = require('./router');

        window.addEventListener('load', function () {
            let mainRouter = new Router();
            Backbone.history.start();
        });
    }, { "./router": 7 }], 2: [function (require, module, exports) {

        module.exports = Backbone.Model.extend({

            url: 'http://grid.queencityiron.com/api/highscore',

            defaults: {
                name: "",
                score: 0,
                playerType: ""
            }

        });
    }, {}], 3: [function (require, module, exports) {
        let HighScore = require('./highscore');

        module.exports = Backbone.Collection.extend({
            url: 'http://grid.queencityiron.com/api/highscore',
            model: HighScore,
            getHighscoreFromServer: function () {
                console.log('ask server for scores');
                let self = this;
                this.fetch({
                    success: function () {
                        console.log('server gave highscores');
                        self.trigger('highscores', this.model);
                    }
                });
            },
            sendHighScore: function () {
                this.save({
                    success: function () {
                        console.log("saved");
                        this.getHighscoreFromServer();
                    }
                });
            }
        });
    }, { "./highscore": 2 }], 4: [function (require, module, exports) {
        let HighScores = require("./highscorecollection");
        let PlayerTypes = require("./types");

        module.exports = Backbone.Model.extend({

            initialize: function () {
                this.types = new PlayerTypes();
                this.scoreList = new HighScores();
            },
            url: 'http://grid.queencityiron.com/api/highscore',
            defaults: {
                gamesize: 10,
                name: "DumDum",
                playerType: "",
                startingEnergy: 0,
                energyPerMove: 0,
                score: 0,
                x: 0,
                y: 0,
                powerY: 0,
                powerX: 0,
                boostAmmount: 10,
                badY: 0,
                badX: 5
            },

            down: function () {
                if (this.get('y') < 10) {
                    this.set('y', this.get('y') + 1);
                };
            },

            up: function () {
                if (this.get('y') > 0) {
                    this.set('y', this.get('y') - 1);
                };
            },

            left: function () {
                if (this.get('x') > 0) {
                    this.set('x', this.get('x') - 1);
                };
            },

            right: function () {
                if (this.get('x') < 10) {
                    this.set('x', this.get('x') + 1);
                };
            },
            damagePlayer: function () {
                console.log('model damages');
                if (this.get('startingEnergy') <= 20) {
                    this.trigger('death', this.model);
                } else {
                    this.set('startingEnergy', this.get('startingEnergy') - 20);
                }
            },

            decreaseEnergy: function () {
                if (this.get('startingEnergy') > 0) {
                    this.set('startingEnergy', this.get('startingEnergy') - this.get('energyPerMove'));
                } else {
                    console.log(`you  are out of energy: ${ this.get('startingEnergy') }`);
                    this.trigger('death', this.model);
                }
            },
            moveBaddie: function () {
                this.set('badY', Math.ceil(Math.random() * 10));
                this.set('badX', Math.ceil(Math.random() * 10));
                // if(this.get('badY') < 10){
                //   this.set(this.get('badY'), this.get('badY') + 1);
                // }
            },

            changeScore: function () {
                this.set('score', this.get('score') + 10);
            },

            setPlayer: function () {
                // luke wrote this:
                let target = this.types.find(function (type) {
                    return type.get('name') === event.target.textContent;
                });
                // end of lukes stuff
                console.log(target.get('startingEnergy'));
                this.set('name', document.getElementById('name').value);
                this.set('playerType', event.target.textContent);
                this.set('startingEnergy', target.get('startingEnergy'));
                this.set('energyPerMove', target.get('energyPerMove'));
                this.set('x', Math.ceil(Math.random() * 10));
                this.set('y', Math.ceil(Math.random() * 10));
                this.set('score', 0);
            },
            setBoost: function () {
                this.set('powerY', Math.ceil(Math.random() * 10));
                this.set('powerX', Math.ceil(Math.random() * 10));
                this.set('boostAmmount', Math.ceil(Math.random() * 10));
            },
            addEnergy: function () {
                this.set('startingEnergy', this.get('startingEnergy') + this.get('boostAmmount'));
            },
            getPlayers: function () {
                console.log('tell collection to get players');
                this.types.getPlayersFromserver();
            },
            sendScore: function () {
                // got help from logan

                this.save(), this.scoreList.getHighscoreFromServer();
            },
            getScoresCollection: function () {
                this.scoreList.getHighscoreFromServer();
            }

        });
    }, { "./highscorecollection": 3, "./types": 5 }], 5: [function (require, module, exports) {
        let Types = require('./types.model');

        module.exports = Backbone.Collection.extend({
            url: 'http://grid.queencityiron.com/api/players',
            model: Types,

            getPlayersFromserver: function () {
                console.log('ask server for players');
                let self = this;
                this.fetch({
                    success: function () {
                        console.log('server gave us players');
                        self.trigger('newtypes', this.model);
                    }
                });
            }
        });
    }, { "./types.model": 6 }], 6: [function (require, module, exports) {
        module.exports = Backbone.Model.extend({

            defaults: {
                name: "",
                energyPerMove: 1,
                startingEnergy: 20
            }

        });
    }, {}], 7: [function (require, module, exports) {
        let CreateView = require('./views/create');
        let GameView = require('./views/game');
        let GameModel = require('./models/model');
        let GameOver = require('./views/gameover');

        module.exports = Backbone.Router.extend({
            initialize: function () {
                let stuff = new GameModel();
                let that = this;

                this.user = new CreateView({
                    model: stuff,
                    el: document.getElementById('user')
                });

                this.game = new GameView({
                    model: stuff,
                    el: document.getElementById('game')
                });

                this.endGame = new GameOver({
                    model: stuff,
                    el: document.getElementById('game-over')
                });
                stuff.on('death', function (stuff) {
                    that.navigate('over', { trigger: true });
                });
                this.user.on('start', function (stuff) {
                    that.navigate('agame', { trigger: true });
                });
                this.game.on('create', function (stuff) {
                    that.navigate('anew', { trigger: true });
                });
            },

            routes: {
                'anew': 'newPlayer',
                'agame': 'gameStart',
                'over': 'gameOver',
                '': 'newPlayer'
            },

            newPlayer: function () {
                // console.log('make a new player');
                this.user.el.classList.remove('hidden');
                this.game.el.classList.add('hidden');
                this.endGame.el.classList.add('hidden');
                // this.trigger('load', this.model);
            },

            gameStart: function () {
                // console.log('play the game');
                this.game.el.classList.remove('hidden');
                this.user.el.classList.add('hidden');
                this.endGame.el.classList.add('hidden');
            },

            gameOver: function () {
                // console.log('you are out of energy');
                this.endGame.el.classList.remove('hidden');
                this.user.el.classList.add('hidden');
                this.game.el.classList.add('hidden');
            }

        });
    }, { "./models/model": 4, "./views/create": 8, "./views/game": 9, "./views/gameover": 10 }], 8: [function (require, module, exports) {
        // let GameModel = require('../models/model');

        module.exports = Backbone.View.extend({

            initialize: function () {
                this.model.on('change', this.render, this);
                this.model.types.on('newtypes', this.render, this);
                console.log('tell model to get players from collection');
                this.model.getPlayers();
                // this.model.getScoresCollection();
            },

            events: {

                'click button': 'startGame'

            },

            startGame: function (event) {
                console.log(event.target.textContent);
                this.model.setPlayer();
                this.model.setBoost();
                this.trigger('start', this.model);
            },

            render: function () {
                let listOfTypes = this.el.querySelector('#playerType');
                listOfTypes.innerHTML = "";
                this.model.types.forEach(function (element) {
                    let button = document.createElement('button');
                    button.textContent = element.get('name');
                    button.id = element.get('name');

                    listOfTypes.appendChild(button);
                });
            }
        });
    }, {}], 9: [function (require, module, exports) {
        // let GameModel = require('../models/model');


        module.exports = Backbone.View.extend({

            initialize: function () {
                this.model.on('change', this.render, this);
                this.on('boost', this.moveBoost, this);
                this.on('hurt', this.takeDamage, this);
            },

            events: {
                'click #up': 'clickUp',
                'click #down': 'clickDown',
                'click #left': 'clickLeft',
                'click #right': 'clickRight',
                'click button': 'changeEnergy',
                'click #newPlayer': 'startOver'
            },

            clickUp: function () {
                console.log('clicked up');
                this.model.up();
            },
            clickDown: function () {
                console.log('clicked down');
                this.model.down();
            },
            clickLeft: function () {
                console.log('clicked left');
                this.model.left();
            },
            clickRight: function () {
                console.log('clicked right');
                this.model.right();
            },

            changeEnergy: function () {
                console.log('decrease');
                this.model.decreaseEnergy();
                this.model.changeScore();
            },
            startOver: function () {
                this.trigger('create', this.model);
            },
            moveBoost: function () {
                console.log('should move boost and add energy');
                this.model.setBoost();
                this.model.addEnergy();
            },
            takeDamage: function () {
                console.log("view says to do damage");
                this.model.damagePlayer();
                this.model.moveBaddie();
            },
            // startBaddie: function(){
            //   this.model.moveBaddie();
            // },

            render: function () {
                // this.setInterval(startBaddie,500);

                let x = this.el.querySelector('#x');
                x.textContent = this.model.get('x') + ",";

                let y = this.el.querySelector('#y');
                y.textContent = this.model.get('y');

                let newScore = this.el.querySelector('#score');
                newScore.textContent = `Score: ${ this.model.get('score') }`;

                let character = this.el.querySelector('#character');
                character.textContent = `Name: ${ this.model.get('name') } Player Type:${ this.model.get('playerType') }`;

                let energy = this.el.querySelector('#energy');
                energy.textContent = `Energy: ${ this.model.get('startingEnergy') }`;
                // Thanks to Geoff for help with the grid:
                let grid = this.el.querySelector('#grid');
                grid.innerHTML = "";

                for (let y = 0; y < this.model.get('gamesize'); y++) {
                    var row = document.createElement('div');
                    row.classList.add('row');
                    for (let x = 0; x < this.model.get('gamesize'); x++) {
                        var col = document.createElement('div');
                        col.classList.add('col');
                        if (this.model.get('y') === y && this.model.get('x') === x) {
                            col.classList.add('player');
                        }
                        if (this.model.get('powerY') === y && this.model.get('powerX') === x) {
                            col.classList.add('powerup');
                        }
                        // end of geoffs help
                        if (this.model.get('y') === this.model.get('powerY') && this.model.get('x') === this.model.get('powerX')) {

                            let self = this;
                            self.trigger('boost', this.model);
                        }
                        if (this.model.get('badX') === x && this.model.get('badY') === y) {
                            col.classList.add('baddie');
                        }
                        if (this.model.get('y') === this.model.get('badY') && this.model.get('x') === this.model.get('badX')) {
                            console.log("tirgger damage event");
                            let self = this;
                            self.trigger('hurt', this.model);
                        }

                        row.appendChild(col);
                    }
                    grid.appendChild(row);
                }
            }

        });
    }, {}], 10: [function (require, module, exports) {
        let GameModel = require('../models/model');

        module.exports = Backbone.View.extend({

            initialize: function () {
                this.model.on('change', this.render, this);
                this.model.getScoresCollection();
                this.model.scoreList.on('highscores', this.render, this);
            },

            events: {
                'click #add-scores': 'addScore'

            },

            addScore: function () {
                this.model.sendScore();
            },

            render: function () {
                let playerScore = this.el.querySelector('#playerScore');
                playerScore.textContent = `Name: ${ this.model.get('name') } Score: ${ this.model.get('score') } Type: ${ this.model.get('playerType') } `;

                var listOfScores = this.el.querySelector('#scoreList');
                listOfScores.innerHTML = "";
                this.model.scoreList.forEach(function (element, idx) {
                    if (idx < 5) {
                        // console.log(element.get('name'));
                        var score = document.createElement('li');
                        score.textContent = `${ element.get('name') }---Score: ${ element.get('score') }--- Player Type: ${ element.get('playerType') }`;
                        // console.log(listOfScores);
                        listOfScores.appendChild(score);
                    }
                });
            }
        });
    }, { "../models/model": 4 }] }, {}, [1]);