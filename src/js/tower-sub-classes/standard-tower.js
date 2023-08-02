class StandardTower extends Tower{
    constructor(id,x,y,mapData, unlockedUpgrades){
        super(id, x, y, mapData, "Cannon", unlockedUpgrades);
        this.w = 2
        this.h = 2
        this.attackSpeed = 1
        this.cost = 100
        this.type = "land"
        this.hitTypes = ["ground"]
        this.r = 5
        this.damage = new Damage(5,mapData,this.stats)
        this.className = "Normal"

        this.image = {}
        this.image.animation = new Image()
        this.image.animation.src = "./assets/images/towers/cannon.png"
        this.image.animation.types = ["rotate"]

        this.projectileImg = new Image()
        this.projectileImg.src = "./assets/images/projectiles/cannonball.png"
    }

    upgrade(path, level) {
        // example upgrades
        switch(path + ',' + level){
            case '0,0':
                this.damage = new Damage(8,this.mapData,this.stats)
                break;
            case '0,1':
                this.damage = new Damage(12,this.mapData,this.stats)
                break;
            case '0,2':
                this.damage = new Damage(20,this.mapData,this.stats)
                break;
            default:
                break;
        }
    }
}