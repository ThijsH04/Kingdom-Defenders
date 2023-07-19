class SplashTower extends Tower{
    constructor(id,x,y,mapData){
        super(id, x, y, mapData, "Mage Tower");
        this.w = 2
        this.h = 2
        this.attackSpeed = 1
        this.cost = 100
        this.type = "land"
        this.r = 5
        this.damage = new SplashDamage(5,null,3,.2,this.stats)
        this.className = "magic"

        this.image = {}
        this.image.base = new Image()
        this.image.base.src = "./assets/images/towers/mage_tower.png"

        this.image.rotating = new Image()
        this.image.rotating.src = "./assets/images/projectiles/magic_orb.png"
        this.maxRotatingSize = .35;
        

        this.projectileImg = new Image()
        this.projectileImg.src = "./assets/images/projectiles/magic_orb.png"
    }

    upgrade(path, level) {
        
    }
}