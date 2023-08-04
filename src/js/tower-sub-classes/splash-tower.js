class SplashTower extends Tower{
    constructor(id,x,y,mapData, unlockedUpgrades){
        super(id, x, y, mapData, "Mage Tower", unlockedUpgrades);
        this.w = 2
        this.h = 2
        this.attackSpeed = 1
        this.cost = 100
        this.type = "land"
        this.hitTypes = ["ground", "air"]
        this.r = 5
        this.damage = new SplashDamage(5,null,3,.2,this.stats)
        this.className = "Magic"

        super.addImage({
            name: "base",
            src: "./assets/images/towers/mage_tower.png",
            z: 0,
            animationTypes: [],
            maxAnimation: 1
        })

        super.addImage({
            name: "effect",
            src: "./assets/images/projectiles/magic_orb.png",
            z: 1,
            animationTypes: ["grow", "rotate"],
            maxAnimation: 0.35
        })

        this.projectileImg = new Image()
        this.projectileImg.src = "./assets/images/projectiles/magic_orb.png"
    }

    upgrade(path, level) {
        
    }
}