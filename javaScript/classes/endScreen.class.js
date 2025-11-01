class EndScreen extends DrawableObejects {
    constructor(img) {
        super();
        setInterval(() => {
            this.check(img);
            this.loadImage(img);
        }, 1000)
    }

    
    /**
     * 
     * @param {string} img - Img of Win or Loose.
     */
    check(img) {
        if (img == 'img/9_intro_outro_screens/win/won_1.png') {
            this.x = 150;
            this.y = 180;
            this.width = 400;
            this.height = 100;
        } else {
            this.x = 0;
            this.y = 0;
            this.width = 720;
            this.height = 480;
        }
    }
}