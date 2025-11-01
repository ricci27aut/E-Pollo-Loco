class Coins extends MovableObject {
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];
    offset = {
        top: 30,
        bottom: 30,
        left: 30,
        right: 30
    };
    width = 100;
    height = 100;
    

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = Math.random() * 1700 + 100;
        this.y = Math.random() * 220 + 120;
        this.animate();
    }

    
    animate() {
        setInterval( () => {
            this.playAnimation(this.IMAGES_COIN)
        }, 1000 / 5)
    }
}