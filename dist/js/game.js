(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'towers');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":3,"./states/gameover":4,"./states/menu":5,"./states/play":6,"./states/preload":7}],2:[function(require,module,exports){
'use strict';

var MainMenuButton = function (game, x, y, textureKey) {
	Phaser.Sprite.call(this, game, x, y, textureKey);
	this.inputEnabled = true;
	var playBtnInputOverHandler = function () {
		this.game.add.tween(this).to({y: 246 - 4}, 200, Phaser.Easing.Back.Out, true);
	}
	var playBtnInputOutHandler = function () {
		this.game.add.tween(this).to({y: 246}, 200, Phaser.Easing.Cubic.In, true);
	}
	this.events.onInputOver.add(playBtnInputOverHandler, this);
	this.events.onInputOut.add(playBtnInputOutHandler, this);
};

MainMenuButton.prototype = Object.create(Phaser.Sprite.prototype);
MainMenuButton.prototype.constructor = MainMenuButton;

MainMenuButton.prototype.update = function () {
	// write your prefab's specific update code here

};

MainMenuButton.prototype.destroy = function () {
	this.events.onInputUp.removeAll();
	this.events.onInputOver.removeAll();
	this.events.onInputOut.removeAll();
	Phaser.Sprite.prototype.destroy.call(this);
};

module.exports = MainMenuButton;

},{}],3:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],4:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],5:[function(require,module,exports){
'use strict';
var MainMenuButton = require('../prefabs/mainMenuButton');

function Menu() {
}

Menu.prototype = {
	preload: function () {

	},
	create: function () {
		this.bg = this.game.add.sprite(0, 0, "menuBg");
		this.playBtn = new MainMenuButton(this.game, 184, 246, "menuPlayBtn");
		this.playBtn.events.onInputUp.add(this.playBtnInputUpHandler, this);
		this.game.add.existing(this.playBtn);
	},
	playBtnInputUpHandler: function (button, pointer) {
		this.game.state.start("play");
	},
	shutdown: function() {
		this.playBtn.destroy();
	},
	update: function () {

	}
};

module.exports = Menu;

},{"../prefabs/mainMenuButton":2}],6:[function(require,module,exports){
'use strict';
function Play() {
}
Play.prototype = {
	create: function () {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.sprite = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'yeoman');
		this.sprite.inputEnabled = true;

		this.game.physics.arcade.enable(this.sprite);
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.bounce.setTo(1, 1);
		this.sprite.body.velocity.x = this.game.rnd.integerInRange(-500, 500);
		this.sprite.body.velocity.y = this.game.rnd.integerInRange(-500, 500);

		this.sprite.events.onInputDown.add(this.clickListener, this);
	},
	update: function () {

	},
	clickListener: function () {
		this.game.state.start('gameover');
	}
};

module.exports = Play;
},{}],7:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    this.load.image("menuBg", "assets/mainMenuBg.jpg");
    this.load.image("menuPlayBtn", "assets/playBtn.png");

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])