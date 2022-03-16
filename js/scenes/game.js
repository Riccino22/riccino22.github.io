//import Phaser  from "../../js/phaser.js";
import { CorrectPlatforms } from "../components/platformsCorrect.js";
import { FakePlatforms } from "../components/platformsFake.js";

import { Player } from "../components/player.js";
import { Score } from "../components/score.js";
import { Suplements } from "../components/suplement.js";

export class Game extends Phaser.Scene {
    constructor(){
        super({ key : "game" });
        this.score = new Score(this);
        this.player = new Player(this);
        this.correctPlatforms = new CorrectPlatforms(this);
        this.fakePlatforms = new FakePlatforms(this);
        this.suplements = new Suplements(this);
    }


    preload(){
        this.player.preload();
        this.correctPlatforms.preload();
        this.fakePlatforms.preload();
        this.suplements.preload();
        this.load.image("bg", "../assets/bg.png");
        this.load.image("cap", "assets/cap.png");
        //this.load.audio("theme", "../assets/song.mp3");
        this.load.audio("fakeSound", "../assets/fake.wav");
        this.load.audio("suplementAudio", "../assets/suplement.wav");

    }



    create(){
        this.bg = this.add.image(0, -2, "bg").setOrigin(0, 0);
        this.song = this.sound.add("theme", {
            loop : true,
        });

        this.fakeSound = this.sound.add("fakeSound", {
            volume: 2
        });

        this.suplementSound = this.sound.add("suplementAudio");

        this.sound.pauseOnBlur = false;
        this.sound.stopAll();
        this.song.play();
//        this.song.hasLooped = true;
        
        if (this.song.hasEnded) {
            alert();
        }
        //this.song.config.loop = true;
        console.log(this.song);
        this.correctPlatforms.create();
        this.fakePlatforms.create();
        this.player.create();
        this.score.create();
        this.suplements.create();

        this.physics.add.collider(this.player.body, this.correctPlatforms.body);
        
        this.physics.add.overlap(this.player.body, this.fakePlatforms.body, (player, platform)=>{
            platform.disableBody(true, true);
            platform.x = "";
            this.score.scoreNumber -= 10;
            this.fakeSound.play();
        }, null, this);

        
        this.physics.add.overlap(this.correctPlatforms.body, this.correctPlatforms.body, (platform)=>{
            platform.disableBody(true, true);
            platform.x = "";
        }, null, this)

          
        this.physics.add.overlap(this.fakePlatforms.body, this.fakePlatforms.body, (platform)=>{
            platform.disableBody(true, true);
            platform.x = "";

        }, null, this)


          
        this.physics.add.overlap(this.correctPlatforms.body, this.fakePlatforms.body, (platform1, platform2)=>{
            if (Phaser.Math.Between(1,2) == 1) {
            platform1.disableBody(true, true);   
            platform1.x = "";
            } else {
                platform2.disableBody(true, true);   
                platform2.x = "";
                    
            }

        }, null, this)




        this.physics.add.overlap(this.player.body, this.suplements.multp2, (player, suplement)=>{
            this.score.scoreNumber *= 2;
            suplement.disableBody(true, true);
            this.suplementSound.play();
        })


        this.physics.add.overlap(this.player.body, this.suplements.add10, (player, suplement)=>{
            this.score.scoreNumber += 10;
            suplement.disableBody(true, true);
            this.suplementSound.play();
        })


        this.count = 1;
        this.countCap = 1;

 
        this.songPaused = false;


        this.cap = this.add.image(0,0, "cap").setOrigin(0, 0).setScale(2);


        console.log(this.player.body.setScale(0.5).width);

    }




    update(){


        this.countCap -= 0.01;
        this.cap.setAlpha(this.countCap);

        document.addEventListener("keydown", e => {
            if(e.keyCode == 77){
                this.song.pause();
            }
            else if (e.keyCode == 32) {
                this.song.resume();
            }
        })


        /*
        if (this.songPaused) {  
            if (this.player.cursors.shift.isDown) {
                this.soungPaused = false;
                this.song.resume();
            }
        }

        if (!this.songPaused) {
            if (this.player.cursors.space.isDown) {
                this.soungPaused = true;
            }            
        }
*/


/*


        if (this.song.hasEnded) {
            this.song.isPlaying = true;
        }
*/
       this.count--;
        this.score.update();
        this.suplements.update();



  
        this.player.update();
        this.correctPlatforms.update();
        this.fakePlatforms.update();



        if (this.player.body.y > 730 || this.player.body.x < -25) {
            this.player.body.y = 750;
            this.song.volume -= 0.01;
            this.score.scoreVelocity = 0;

            if (this.song.volume < 0) {
                if (!localStorage.getItem("high score")) {
                    localStorage.setItem("high score", this.score.scoreNumber);
                } else {
                    if(this.score.scoreNumber > parseInt(localStorage.getItem("high score"))){
    
                        this.scene.start("gameover");
                        localStorage.setItem("high score", this.score.scoreNumber);
    
                    } else{
                        
                        this.scene.start("gameover")
    
    
                    }
                }
            }


            

        }
    }
}