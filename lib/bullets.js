// Bullets
const Assets = require("../assets");

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.asset = Assets.IMAGES.SPACESHIP_FIRE;
    this.assetBlast = Assets.IMAGES.SPACESHIP_FIRE_BLAST;
    this.assetBlastEnd = Assets.IMAGES.SPACESHIP_FIRE_BLAST_END;
    this.state = "loaded";
  }

  fire(screen) {
    this.state = "fired";
    this.screen = screen;
    this.fireInterval = setInterval(() => {
      screen.put({ x: this.x, y: this.y }, " ");
      switch (this.state) {
        case "fired":
          if (this.y > 0) {
            this.y--;
            screen.put({ x: this.x, y: this.y }, this.asset);
          } else {
            this.blast();
          }
          break;
        case "blast":
          screen.put({ x: this.x, y: this.y }, this.assetBlast);
          this.state = "blast-end";
          break;
        case "blast-end":
          screen.put({ x: this.x, y: this.y }, this.assetBlastEnd);
          this.state = "dead";
          break;
        default:
          screen.put({ x: this.x, y: this.y }, " ");
          break;
      }
    }, Assets.FPS);
  }

  blast() {
    this.state = "blast";
  }
}

module.exports = class Bullets {
  constructor(screen, monsters) {
    this.screen = screen;
    this.term = screen.dst;
    this.monsters = monsters;
    this.score = 0;
    this.level = 0;
    this.bullets = [];

    setInterval(() => {
      let allDead = true;
      this.monsters.Monsters.forEach((monster, mi) => {
        if (monster.state !== "dead") {
          allDead = false;
        }
      });
      if (allDead) {
        this.level++;
        this.bullets.forEach(bullet => {
          bullet.blast();
        });
        this.bullets = [];
        this.monsters.generate(this.level * 5);
      } else {
        this.bullets.forEach((bullet, bi) => {
          this.monsters.Monsters.forEach((monster, mi) => {
            if (
              monster.state !== "dead" &&
              bullet.x === monster.x + monster.offset &&
              bullet.y === monster.y
            ) {
              this.score += 10;
              monster.kill();
              Assets.LOG = bi + " Killed Monster " + mi;

              bullet.blast();
            }
          });
        });
      }
    }, 100);
  }

  fire(ship) {
    let bullet = new Bullet(ship.location.x, ship.location.y - 1);
    this.bullets.push(bullet);
    bullet.fire(this.screen);
  }
};
