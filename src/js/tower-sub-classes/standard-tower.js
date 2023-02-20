class StandardTower extends Tower{
    constructor(id,x,y,damage,mapData, color){
        super(id,"Standard Tower",x,y,2,2,1,"./assets/towers/cannon.png",100,"land",damage,5,mapData, color);

        this.image = {}
        this.image.rotating = new Image()
        this.image.rotating.src = "./assets/towers/cannon.png"

        this.projectileImg = new Image()
        this.projectileImg.src = "./assets/projectiles/cannonball.png"
    }

    upgrade(path, level) {

    }
}