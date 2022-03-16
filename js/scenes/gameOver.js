export class GameOver extends Phaser.Scene{


    constructor(){
        super({ key : "gameover" });


    }

    preload(){
        this.load.image("gameover", "assets/gameover.png");
        this.load.image("btn", "assets/btn-start.png");
    }

    create(){
        this.add.image(0, 0, "gameover").setOrigin(0, 0);
        this.btn = this.add.image(640, 550, "btn").setInteractive().setScale(1.5);

        this.scoretext = this.add.text(0, 350, parseInt(localStorage.getItem("high score")), {
            fill: "blue",
            fontFamily: "Arial Black",
            fontSize: 75
        })


        this.scoretext.x = (this.sys.canvas.width / 2) - (this.scoretext.width/2) 


        this.btn.on("pointerdown", () => {
            this.scene.start("game");
        })


    }


}