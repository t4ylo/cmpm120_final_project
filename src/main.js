
"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    physics: {
        default: 'arcade',
        arcade: {
            
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    width: 1440,
    height: 840,
    scene: [Load, Title_screen, Entry, Text_scene_1, Platformer, Text_scene_2, Level_2, Text_scene_3, Level_3, Text_scene_4]
}

var cursors;
const SCALE = 2.0;
var my = {sprite: {}, text: {}, vfx: {}};

const game = new Phaser.Game(config);