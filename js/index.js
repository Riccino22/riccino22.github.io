import { Game } from "./scenes/game.js";
import { Menu } from "./scenes/menu.js";
import { GameOver } from "./scenes/gameOver.js";

const game = new Phaser.Game({ 
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: document.querySelector("#game"),
    scene: [Menu, Game, GameOver],
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    }
});