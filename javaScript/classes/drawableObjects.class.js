class DrawableObejects {
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };
    imageCache = {};
    currentImage = 0;
    x = 0;
    y = 0;
    height = 0;
    width = 0;
    img;
    characterX;


    /**
     * 
     * @param {string} imagePath - Get Image as String.
     */
    loadImage(imagePath) {
        this.img = new Image();
        this.img.src = imagePath;
    }

    
    /**
     * 
     * @param {object} ctx - Canvas in 2D
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
    * Here, from the array that was given, the Img are stored in another Árray.
    * @param {Array} arr - Array where images are stored. ['img1', 'img2'] 
    */
    loadImages(arr) {
        arr.forEach((imagePath) => {
            let img = new Image();
            img.src = imagePath;
            img.style = 'transform: scaleX(-1)';
            this.imageCache[imagePath] = img;
        });
    }


    /**
     * Here the bar is adapted.
     * @param {number} percentage - A number of how much the bar should be filled.
     * @param {Array} images - Array where all the images of the bar are stored.
     */
    setPercentage(percentage, images) {
        this.percentage = percentage;
        if (images == '') {
        } else {
            let imagePath = images[this.resolveImageIndex()];
            this.img = this.imageCache[imagePath];
        }
    }


    /**
     * 
     * @returns Returns a number so we know which image we are allowed to use.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}