
'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    this.bg = this.game.add.sprite(0, 0, "menuBg");
	 this.playBtn = this.game.add.sprite(184, 246, "menuPlayBtn");
	 this.playBtn.inputEnabled = true;
	 this.playBtn.events.onInputUp.add(this.playBtnInputUpHandler, this);
	 this.playBtn.events.onInputOver.add(this.playBtnInputOverHandler, this);
	 this.playBtn.events.onInputOut.add(this.playBtnInputOutHandler, this);
  },
	playBtnInputUpHandler: function(button, pointer) {
		this.playBtn.events.onInputUp.remove(this.playBtnInputUpHandler);
		this.playBtn.events.onInputOver.remove(this.playBtnInputOverHandler);
		this.playBtn.events.onInputOut.remove(this.playBtnInputOutHandler);
		this.game.state.start("play");
	},
	playBtnInputOverHandler: function(button, pointer) {
		console.log("over");
		this.game.add.tween(this.playBtn).to({y:246 - 4}, 200, Phaser.Easing.Cubic.Out, true);
	},
	playBtnInputOutHandler: function(button, pointer) {
		this.game.add.tween(this.playBtn).to({y:246}, 200, Phaser.Easing.Cubic.In, true);
	},
  update: function() {

  }
};

module.exports = Menu;
