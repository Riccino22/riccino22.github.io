export class Menu extends Phaser.Scene {

    constructor(){
        super({ key : "menu" });
    }

    preload(){
        this.load.image("menu", "assets/start.png");
        this.load.image("btn", "assets/btn-start.png");
        this.load.audio("theme", "assets/song.mp3");
    }

    create(){
        this.start = this.add.image(0,0, "menu").setOrigin(0,0);
        this.btn = this.add.image(380,500, "btn").setInteractive().setScale(2);

        this.btn.on("pointerdown", ()=>{
            this.scene.start("game");
        })

    }

    update(){
        
    }

}