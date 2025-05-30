class Entry extends Phaser.Scene {
    constructor() {
        super("entryScene");
        this.sceneTriggered = false;
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
        this.map = this.add.tilemap("entry-scene", 21, 21, 50, 20);

        // add tileset and bg
        this.tileset = this.map.addTilesetImage("kenny_tilemap_packed", "tilemap_tiles");

        this.bg = this.add.tileSprite(
            0, 0,
            this.map.widthInPixels, this.map.heightInPixels,
            "background"
        ).setOrigin(0, 0).setScrollFactor(0);  

        this.bg.setScale(this.SCALE * 2);

        

        // Create a layer
        this.groundLayer = this.map.createLayer("ground", this.tileset, 0, 0);
        
        

        // Make it collidable
        this.groundLayer.setCollisionByProperty({
            collides: true
        });

        


        // add collectables and make them interact

        this.scenetrigger = this.map.createFromObjects("scene-trigger", {
            name: "scene",
            key: "tilemap_sheet",
            frame: 122
        });

        this.sceneGroup = this.physics.add.staticGroup();

        this.scenetrigger.forEach((t) => {
            this.coinGroup.add(t);
        });

       

        

        
        // set up player avatar
        my.sprite.player = this.physics.add.sprite(0, 0, "platformer_characters", "tile_0006.png");
        my.sprite.player.setCollideWorldBounds(true);

        const tileset = this.tileset;

       

        

        
        
        

        

        // Enable collision handling
        this.physics.add.collider(my.sprite.player, this.groundLayer);
        
        
        

        

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
            my.sprite.player.resetFlip();
            my.sprite.player.anims.play('walk', true);
          
            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth/2-10, my.sprite.player.displayHeight/2-5, false);

            my.vfx.walking.setParticleSpeed(this.PARTICLE_VELOCITY, 0);
            

            

            if (my.sprite.player.body.blocked.down) {

                my.vfx.walking.start();

            }

        } else if(cursors.right.isDown) {
            my.sprite.player.setAccelerationX(this.ACCELERATION);
            my.sprite.player.setFlip(true, false);
            my.sprite.player.anims.play('walk', true);
            
            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth/2-10, my.sprite.player.displayHeight/2-5, false);

            my.vfx.walking.setParticleSpeed(this.PARTICLE_VELOCITY, 0);

            

            if (my.sprite.player.body.blocked.down) {

                my.vfx.walking.start();

            }

        } else {
            
            my.sprite.player.setAccelerationX(0);
            my.sprite.player.setDragX(this.DRAG);
            my.sprite.player.anims.play('idle');
           
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

        if (this.powerupCollected && !this.powerupMessageShown) {
            this.add.text(my.sprite.player.x, my.sprite.player.y - 50,
                'Power Up! You can now double jump!',
                { font: '"Press Start 2P"', fontSize: '8px', fill: '#ffffff' });
            this.powerupMessageShown = true;
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

        
        
        

    }

        
    }