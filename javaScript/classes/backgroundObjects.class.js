class BackgroundObject extends MovableObject {
width = 720;
height = 480;


/**
 * 
 * @param {string} imagePath - Get the image as a string.
 * @param {number} x - The x coordinate of the image.
 */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}