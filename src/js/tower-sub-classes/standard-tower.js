class StandardTower extends Tower{
    constructor(id,x,y,mapData){
        super(id, x, y, mapData, "Cannon Tower");
        this.w = 2
        this.h = 2
        this.attackSpeed = 1
        this.cost = 100
        this.type = "land"
        this.r = 5
        this.damage = new Damage(5,mapData,this.stats)
        this.className = "normal"

        this.image = {}
        this.image.animation = new Image()
        this.image.animation.src = "./assets/images/towers/cannon.png"
        this.image.animation.types = ["rotate"]

        this.projectileImg = new Image()
        this.projectileImg.src = "./assets/images/projectiles/cannonball.png"
    }

    upgrade(path, level) {

    }
}