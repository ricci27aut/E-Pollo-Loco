class Clouds extends MovableObject {
    y = 10;
    width = 500;
    height = 250;


    /**
     * 
     * @param {string} imagePath - Get the image as a string.
     * @param {number} space - The distance from the respective cloud.
     */
    constructor(imagePath, space) {
        super().loadImage(imagePath);
        this.x = Math.random() * 500 + space;
        this.animate();
    }


    animate() {
        setInterval( () => {
            this.moveLeft();
        }, 10)
    }
}