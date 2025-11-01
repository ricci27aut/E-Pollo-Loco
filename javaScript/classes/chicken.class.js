class Chicken extends MovableObject {
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };
    height = 80;
    width = 70;
    y = 350;
    chickenEnergy = 1;
    intervalChicken;


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 2000;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }


    animate() {
        this.intervalChicken = setInterval(() => {
            this.intervalForMovement();
        }, 1000 / 60)

        setInterval(() => {
            this.intervalForImages();
        }, 200);

        setInterval(() => {
            this.chickenDead();
        })
    }

    
    /**
     * Chicken should move permanently to the left.
     */
    intervalForMovement() {
        if (this.chickenEnergy > 0) {
            this.moveLeft();
        }
    }

    
    /**
     * For the left movement.
     */
    intervalForImages() {
        if (this.chickenEnergy == 0) {
            this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }


    /**
     * If the chicken is dead, the X coordinate should no longer change, so the interval is stopped.
     */
    chickenDead() {
        if (this.chickenEnergy == 0) {
            clearInterval(this.intervalChicken);
        }
    }
}