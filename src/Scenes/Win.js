class Win extends Phaser.Scene {
    constructor() {
        super("Win");
    }


    create() {

        this.add.text(600, game.config.height/2 - 50, "YOU WIN!", {
            fontFamily: 'Times',
            fontSize: 50,
            color: '#ffffff'
            
        })

        this.add.text(game.config.width/2 - 250, game.config.height/2, "Press SPACE to play again", {
            fontFamily: 'Times',
            fontSize: 50,
            color: '#ffffff'
            
        })

        this.input.keyboard.once("keydown-SPACE", () => {
            this.scene.start("platformerScene");
        });
    }
}