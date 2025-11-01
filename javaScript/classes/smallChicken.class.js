class SmallChicken extends MovableObject {
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];
    offset = {
        top: 10,
        bottom: 0,
        left: 0,
        right: 0
    };
    height = 60;
    width = 60;
    y = 370;
    chickenEnergy = 1;


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 1000 + Math.random() * 1000;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.15 + Math.random() * 2;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.intervalForMovement();
        }, 1000 / 60)

        setInterval(() => {
            this.ifChickenIsDead();
        })
        this.intervalForImages();
    }


    /**
     * What the Clients Chicken Should Do.
     */
    intervalForMovement() {
        if (this.chickenEnergy > 0) {
            this.moveLeft();
        }
    }

    
    ifChickenIsDead() {
        if (this.chickenEnergy == 0) {
            this.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png');
        }
    }


    /**
     * For the images that are displayed.
     */
    intervalForImages() {
        if (this.speed > 1.4 && this.chickenEnergy == 1){
            setInterval(() => {
                this.playAnimation(this.IMAGES_WALKING);
            }, 100);
        } else if (this.speed < 1.4 && this.chickenEnergy == 1) {
            setInterval(() => {
                this.playAnimation(this.IMAGES_WALKING);
            }, 200);
        }
    }
}