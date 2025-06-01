class Level_2 extends Phaser.Scene {
    constructor() {
        super("level_2Scene");
        this.powerupCollected = true;
        this.win = false;
        this.playerIsDead = false;
        this.walkSoundCooldown = 0;
    }

    init() {
        // variables and settings
        this.ACCELERATION = 600;
        this.DRAG = 700;    // DRAG < ACCELERATION = icy slide
        this.physics.world.gravity.y = 2000;
        this.JUMP_VELOCITY = -600;
        this.PARTICLE_VELOCITY = 50;
        this.SCALE = 2.0;
    }

    create() {
        //audio
        this.sfx = {};
        this.sfx.walk = this.sound.add("walk");
        this.sfx.jump = this.sound.add("jump");
        this.sfx.coins = this.sound.add("coins");
        this.sfx.powerup = this.sound.add("powerup");

        this.win = false
        this.playerIsDead = false;

        // Create a new tilemap.
        this.map = this.add.tilemap("level_2", 21, 21, 50, 20);

        // add tileset and bg
        this.tileset = this.map.addTilesetImage("kenny_tileset_packed", "tilemap_tiles");

        this.bg = this.add.tileSprite(
            0, 0,
            this.map.widthInPixels, this.map.heightInPixels,
            "background"
        ).setOrigin(0, 0).setScrollFactor(0);  

        this.bg.setScale(this.SCALE * 2);

        

        // Create a layer
        this.groundsLayer = this.map.createLayer("grounds", this.tileset, 0, 0);
        this.lavaNspikesLayer = this.map.createLayer("lava-spikes", this.tileset, 0, 0);

        
      
        
        this.chainsLayer = this.map.createLayer("chains", this.tileset, 0, 0);
        

        // Make it collidable
        this.groundsLayer.setCollisionByProperty({
            collides: true
        });

        this.lavaNspikesLayer.setCollisionByProperty({
            collides: true
        });


        // add collectables and make them interact

        this.coins = this.map.createFromObjects("coins", {
            name: "coin",
            key: "tilemap_sheet",
            frame: 78
        });

        this.coinGroup = this.physics.add.staticGroup();

        this.coins.forEach((coin) => {
            this.coinGroup.add(coin);
        });

        this.powerup = this.map.createFromObjects("powerup", {
            name: "powerup",
            key: "tilemap_sheet",
            frame: 376
        });

        this.powerupGroup = this.physics.add.staticGroup();
        
        this.powerup.forEach((p) => {
            this.powerupGroup.add(p);
        });

        this.flag = this.map.createFromObjects("flag", {
            name: "flag",
            key: "tilemap_sheet",
            frame: 342
        });

        this.flagGroup = this.physics.add.staticGroup();
        
        this.flag.forEach((f) => {
            this.anims.create({
                key: 'flagWave',
                frames: this.anims.generateFrameNumbers('tilemap_sheet', {frames: [342, 312]}),
                frameRate: 10,
                repeat: -1
            });

            f.anims.play('flagWave');
            this.flagGroup.add(f);
        });

        
        // set up player avatar
        my.sprite.player = this.physics.add.sprite(0, 200, "platformer_characters", "tile_0006.png");
        my.sprite.player.setCollideWorldBounds(true);

        const tileset = this.tileset;

        for (const index in tileset.tileProperties) {
            const props = tileset.tileProperties[index];
            if (props.spike) {
                this.map.setTileIndexCallback(Number(index), () => {
                    this.handlePlayerDeath();
                }, this, this.lavaNspikesLayer);
            }
        }

        

        this.lavaTiles = this.chainsLayer.filterTiles(tile => {
            return tile.properties.bubble == true;
        });

        this.lavaTiles.forEach(tile => {
            const x = this.map.tileToWorldX(tile.x) + this.map.tileWidth / 2;
            const y = this.map.tileToWorldY(tile.y) + this.map.tileHeight / 2;

            

            this.add.particles(0,0, "kenny-particles", {
                frame: ['circle_05.png', 'circle_03.png', 'circle_04.png'], 
                x,
                y,
                lifespan: 2500,
                speedY: { min: -5, max: -30 },
                scale: { start: 0.05, end: 0 },
                alpha: { start: 0.5, end: 0 },
                frequency: 1000,
                quantity: 1,
                random: true
                
                
            });
        });
        
        this.physics.add.collider(my.sprite.player, this.lavaNspikesLayer);
        this.lavaNspikesLayer.setCollisionFromCollisionGroup();

        

        // Enable collision handling
        this.physics.add.collider(my.sprite.player, this.groundsLayer);
        
        
        

        
        // Handle collision detection with coins
        this.physics.add.overlap(my.sprite.player, this.coinGroup, (player, coin) => {
            console.log("Collected!");
            coin.destroy();
            this.sfx.coins.play()
        });

        this.physics.add.overlap(my.sprite.player, this.powerupGroup, (player, powerup) => {
            console.log("PowerUp Collected!");
            powerup.destroy();
            this.powerupCollected = true;
            this.sfx.powerup.play()
        });

        this.physics.add.overlap(my.sprite.player, this.flagGroup, (player, flag) => {
            console.log("Complete!");
            this.win = true
        });
        

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        this.rKey = this.input.keyboard.addKey('R');

        

        
        // movement vfx

        my.vfx.walking = this.add.particles(0, 0, "kenny-particles", {
            frame: ['smoke_01.png', 'smoke_02.png'],
            
            random: true,
            scale: {start: 0.03, end: 0.1},
            
            maxAliveParticles: 8,
            lifespan: 350,
            
            gravityY: -400,
            alpha: {start: 1, end: 0.1}, 
        });

        my.vfx.walking.stop();

        this.canDoubleJump = false;
        

        // cam
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(my.sprite.player, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.setZoom(this.SCALE = 2);

        
        
        

    }

    update() {
        //walking vfx
        if(cursors.left.isDown) {
            my.sprite.player.setAccelerationX(-this.ACCELERATION);
            my.sprite.player.setTexture("player_walk");
            my.sprite.player.flipX = true
            
          
            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth/2-10, my.sprite.player.displayHeight/2-5, false);

            my.vfx.walking.setParticleSpeed(this.PARTICLE_VELOCITY, 0);
            

            

            if (my.sprite.player.body.blocked.down) {

                my.vfx.walking.start();

            }

        } else if(cursors.right.isDown) {
            my.sprite.player.setAccelerationX(this.ACCELERATION);
            my.sprite.player.setTexture("player_walk");
            my.sprite.player.flipX = false;
            
            
            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth/2-10, my.sprite.player.displayHeight/2-5, false);

            my.vfx.walking.setParticleSpeed(this.PARTICLE_VELOCITY, 0);

            

            if (my.sprite.player.body.blocked.down) {

                my.vfx.walking.start();

            }

        } else {
            
            my.sprite.player.setVelocityX(0);
            my.sprite.player.setTexture("player_idle");
            my.sprite.player.setDragX(this.DRAG);
           
           
            my.vfx.walking.stop();
        }

        if ((cursors.left.isDown || cursors.right.isDown) && my.sprite.player.body.blocked.down) {
            if (this.walkSoundCooldown <= 0) {
                this.sfx.walk.play();
                this.walkSoundCooldown = 200; 
            }
        } else {
            this.walkSoundCooldown = 0; 
        }

        
        if (this.walkSoundCooldown > 0) {
            this.walkSoundCooldown -= this.game.loop.delta;
        }

        // player jump and doublejump
        
        if (my.sprite.player.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);
            this.canDoubleJump = this.powerupCollected; 
            this.sfx.jump.play();
        }

        else if (this.canDoubleJump && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            my.sprite.player.body.setVelocityY(-600); 
            this.canDoubleJump = false; 
        }

        

        // reset on landing
        if (my.sprite.player.body.blocked.down) {
            this.canDoubleJump = this.powerupCollected;
            
        }

        if(Phaser.Input.Keyboard.JustDown(this.rKey)) {
            this.scene.restart();
        }

        this.bg.tilePositionX = this.cameras.main.scrollX * 0.5;
        this.bg.tilePositionY = this.cameras.main.scrollY * 0.5;

        
        
        

        if(this.win) {
            this.scene.start("level_3Scene");
        }

        
    }
    handlePlayerDeath() {
        console.log("Player hit lava/spike!");
        if (this.playerIsDead) return;
        this.playerIsDead = true;

        my.sprite.player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            this.scene.restart();
        });
    }

    
}