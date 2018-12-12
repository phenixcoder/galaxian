#! /usr/bin/env node
const termkit = require("terminal-kit");
const term = termkit.terminal;
const ScreenBuffer = termkit.ScreenBuffer;

const Assets = require("./assets");
const SpaceShip = require("./lib/spaceship");
const Bullets = require("./lib/bullets");
const Monsters = require("./lib/monsters");

var screen = new ScreenBuffer({ dst: term, noFill: true });
const ship = new SpaceShip(screen);
const monsters = new Monsters(screen);
const bullets = new Bullets(screen, monsters);
monsters.generate();

term.on("key", function(name, matches, data) {
  if (name === "CTRL_C") {
    term.grabInput(false);
    screen.clear();
    setTimeout(function() {
      process.exit();
    }, 100);
  } else {
    // console.log("Key: ", name);
    switch (name) {
      case "LEFT":
        ship.goLeft();
        break;
      case "RIGHT":
        ship.goRight();
        break;
      case " ":
        bullets.fire(ship);
        break;
      default:
        break;
    }
  }
  screen.put(
    {
      x: 1,
      y: 1
    },
    `${name} ${ship.location.x}        `
  );
});

term.grabInput(true);

console.log(
  "Starting Galaxian Game . . .",
  Assets.IMAGES.SPACESHIP,
  Assets.IMAGES.MONSTER,
  term.width,
  term.height
);

screen.fill({
  attr: {
    // Both foreground and background must have the same color
    color: 0,
    bgColor: 0
  }
});

// 10 FPS refresh rate
setInterval(() => {
  // monsters.renderStats();
  screen.put({ x: 0, y: 0 }, `Score ${bullets.score}`);
  screen.put({ x: term.width - 10, y: 0 }, `Level ${bullets.level}`);
  screen.put(
    { x: 0, y: term.height - 1 },
    `Kill ${monsters.Monsters.length} Monsters`
  );
  // screen.put({ x: 0, y: term.height - 1 }, Assets.LOG);
  screen.draw();
}, Assets.FPS);
