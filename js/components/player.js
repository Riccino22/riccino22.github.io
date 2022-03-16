export class Player {
    constructor(scene){
        this.relatedScene = scene;
    }

    preload(){
        
        this.relatedScene.load.image("dude", "assets/apple.png");
        this.relatedScene.load.audio("jumpSound", "assets/jump.wav");
    }


    create(){
        this.jumpSound = this.relatedScene.sound.add("jumpSound");
        this.body = this.relatedScene.physics.add.sprite(500, 10, "dude").setScale(0.5);
        this.velocity = 0;
        //this.body.setCollideWorldBounds(true);
        this.body.setBounce(0.2);
        this.cursors = this.relatedScene.input.keyboard.createCursorKeys();
        this.body.setData("in platform", false);

        this.angle = 0;
    }

    update(){
        this.body.setAngle(this.angle);
        
        if (this.body.x > 1200) {
            this.body.x = 1200;
            //alert();
        }

        if(this.body.y < -100){
            this.body.y = -100;
        }
        
        this.body.setVelocityX(this.velocity);
 
        if (this.cursors.right.isDown) {
            this.velocity = 200;
            this.angle += 10;

            this.body.setData("in platform", false);
        }

        
       else if (this.cursors.left.isDown) {
           this.velocity = -200;
           this.angle -= 10;
           this.body.setData("in platform", false);
        }

        else{
            if (this.body.body.touching.down) {
                this.body.setVelocityX(-100);
                //this.body.setData("In platform", true);
            }else{
                this.body.setVelocityX(0);
                //this.body.setData("In platform", false); 
            }
        }

        if (this.cursors.up.isDown && this.body.body.touching.down) {
            this.body.setVelocityY(-350);
            this.jumpSound.play();
        }


        

    }

}