class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");

        
        this.load.image("player_idle", "final_project_player_1.png");
        this.load.image("player_walk", "final_project_player_2.png");

        
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
        

         
         this.scene.start("title_screen");
    }

   
    update() {
    }
}