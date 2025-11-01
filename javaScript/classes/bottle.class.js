class Bottle extends MovableObject {
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];
    offset = {
        top: 20,
        bottom: 10,
        left: 35,
        right: 35
    };
    width = 80;
    height = 60;
    y = 370;
    

    constructor() {
        super().loadImages(this.IMAGES_BOTTLE);
        this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = Math.random() * 1700 + 100;
        this.animate();
    }


    animate() {
        setInterval(() => {
                this.playAnimation(this.IMAGES_BOTTLE);
        }, 200)
    }
}