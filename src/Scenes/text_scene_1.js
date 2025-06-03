class Text_1 extends Phaser.Scene {
    constructor() {
        super("text_1");
    }


    create() {

        this.add.text(600, game.config.height/2 - 50, "Oh hello. It looks like you have travelled further than you should have.", {
            fontFamily: 'Times',
            fontSize: 50,
            color: '#ffffff'
            
        })

        this.add.text(game.config.width/2 - 250, game.config.height/2, "Unfortunately, this means you will have to escape my dungeon. Good luck >:)", {
            fontFamily: 'Times',
            fontSize: 50,
            color: '#ffffff'
            
        })

        this.input.keyboard.once("keydown-SPACE", () => {
            this.scene.start("platformerScene");
        });
    }
}