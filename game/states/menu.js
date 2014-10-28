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
