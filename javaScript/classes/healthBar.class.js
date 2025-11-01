class HealthBar extends DrawableObejects {
    IMAGES_HEALTH_BAR = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',
    ];
    healthPercentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH_BAR);
        this.x = 10;
        this.y = - 10;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100, this.IMAGES_HEALTH_BAR);
    }
}