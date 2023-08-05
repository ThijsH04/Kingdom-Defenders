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
        this.className = "Magic"

        this.addImage({
            name: "base",
            src: "./assets/images/towers/mage_tower.png",
            z: 0,
            animationTypes: [],
            maxAnimation: 1
        })

        this.addImage({
            name: "effect",
            src: "./assets/images/projectiles/magic_orb.png",
            z: 1,
            animationTypes: ["grow", "rotate"],
            maxAnimation: 0.35
        })

        this.projectiles.push(new Projectile({
            name: "magic",
            img: "./assets/images/projectiles/magic_orb.png",
            damage: 5,
            speed: 20,
            lifespan: 5,
            mapEffects: [new SplashEffect({amount: 5, mapData: null, r: 3, lifespan: .2, stats: this.stats})]
        }))
    }

    upgrade(path, level) {
        
    }
}