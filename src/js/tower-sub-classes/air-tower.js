class AirTower extends Tower{
    constructor(id,x,y,mapData, unlockedUpgrades){
        super(id, x, y, mapData, "Air Turret", unlockedUpgrades);
        this.w = 2
        this.h = 2
        this.attackSpeed = 1
        this.cost = 100
        this.type = "land"
        this.hitTypes = ["air"]
        this.r = 5
        this.damage = new Damage(10,mapData,this.stats)
        this.className = "Normal"

        this.projectileImg = new Image()
        this.projectileImg.src = "./assets/images/projectiles/cannonball.png"
    }

    upgrade(path, level) {

    }
}