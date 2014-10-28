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
