// Monsters

const Assets = require("../assets");

class Monster {
  constructor(x, y, screen) {
    this.x = Math.floor(x);
    this.y = Math.floor(y);
    this.asset = Assets.IMAGES.MONSTER;
    this.state = "living";
    this.screen = screen;
    this.offset = 0;

    this.danceInterval = setInterval(() => {
      screen.put({ x: this.x + this.offset, y: this.y }, " ");
      if (this.offset) {
        this.offset = 0;
      } else {
        this.offset = 1;
      }
      if (this.state === "dead") {
        clearInterval(this.danceInterval);
        screen.put({ x: this.x + this.offset, y: this.y }, " ");
      } else {
        screen.put({ x: this.x + this.offset, y: this.y }, this.asset);
      }
    }, 500);
  }

  kill() {
    //clearInterval(this.danceInterval);
    this.screen.put({ x: this.x, y: this.y }, " ");
    this.state = "dead";
  }
}

module.exports = class Monsters {
  constructor(screen) {
    this.screen = screen;
    this.term = screen.dst;

    this.Monsters = [];
    this.count = 0;
  }

  generate(monsterCount) {
    this.Monsters = [];
    for (let monsterIndex = 0; monsterIndex < monsterCount; monsterIndex++) {
      let x = Math.random() * this.term.width - 4;
      let y = Math.random() * this.term.height - 5;
      if (x <= 0) {
        x = 3;
      }
      if (x >= this.term.width) {
        x = this.term.width - 3;
      }

      if (y <= 0) {
        y = 3;
      }
      if (y >= this.term.height) {
        y = this.term.height - 3;
      }

      let monster = new Monster(x, y, this.screen);
      this.Monsters.push(monster);
    }

    Assets.LOG = monsterCount + " Monsters genrrated";
  }

  renderStats(show) {
    this.count++;
    if (show) {
      this.screen.put(
        { x: this.term.width - 20, y: 3 },
        `${Assets.IMAGES.MONSTER} Stats ${this.count}`
      );

      this.Monsters.forEach((monster, i) => {
        let message =
          Assets.IMAGES.MONSTER +
          `[${i}] ${monster.state} ${monster.x} ${monster.y}`;
        this.screen.put({ x: this.term.width - 20, y: i + 4 }, message);
      });
    } else {
      this.screen.put(
        { x: this.term.width - 20, y: 3 },
        "                    "
      );
      this.Monsters.forEach((monster, i) => {
        this.screen.put(
          { x: this.term.width - 20, y: i + 4 },
          "                    "
        );
      });
    }
  }
};
