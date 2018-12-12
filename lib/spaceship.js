// SpaceShip
const Assets = require("../assets");

module.exports = class SpaceShip {
  constructor(screen) {
    this.screen = screen;
    this.term = screen.dst;
    this.location = {
      x: Math.floor(this.term.width / 2),
      y: this.term.height - 3
    };
    this.asset = Assets.IMAGES.SPACESHIP;
    this.fireAsset = Assets.IMAGES.SPACESHIP_FIRE;
    this.renderAsset();

    this.MIN_X = 1;
    this.MAX_X = this.term.width - 2;
  }

  removeAsset() {
    this.screen.put(this.location, " ");
  }

  renderAsset() {
    this.screen.put(this.location, this.asset);
  }

  goLeft() {
    if (this.location.x > this.MIN_X && this.location.x <= this.MAX_X) {
      this.removeAsset();
      this.location.x = this.location.x - 1;
      this.renderAsset();
    }
  }

  goRight() {
    if (this.location.x >= this.MIN_X && this.location.x < this.MAX_X) {
      this.removeAsset();
      this.location.x = this.location.x + 1;
      this.renderAsset();
    }
  }
};
