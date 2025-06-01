class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");

        
        this.load.atlas("platformer_characters", "tilemap-characters-packed.png", "tilemap-characters-packed.json");

        
        this.load.image("tilemap_tiles", "tilemap_packed.png");                         // Packed tilemap
        this.load.tilemapTiledJSON("platformer-project", "platformer-project.tmj");   // Tilemap in JSON
        this.load.tilemapTiledJSON("entry-scene", "entry-scene.tmj");
        this.load.tilemapTiledJSON("level_2", "level_2.tmj");
        this.load.tilemapTiledJSON("level_3", "level_3.tmj");
        
        this.load.spritesheet("tilemap_sheet", "tilemap_packed.png", {
            frameWidth: 21,
            frameHeight: 21
        });

        this.load.image("background", "backgrounds.png")
        this.load.image("entry_bg", "backgroundEmpty.png")

        this.load.multiatlas("kenny-particles", "kenny-particles.json");

        this.load.audio("walk", "footstep03.ogg");
        this.load.audio("jump", "cloth3.ogg");
        this.load.audio("coins", "handleCoins.ogg");
        this.load.audio("powerup", "impactBell_heavy_000.ogg");
        
    }

    create() {
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('platformer_characters', {
                prefix: "tile_",
                start: 6,
                end: 7,
                suffix: ".png",
                zeroPad: 4
            }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            defaultTextureKey: "platformer_characters",
            frames: [
                { frame: "tile_0006.png" }
            ],
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            defaultTextureKey: "platformer_characters",
            frames: [
                { frame: "tile_0007.png" }
            ],
        });

         
         this.scene.start("entryScene");
    }

   
    update() {
    }
}