class HomingTower extends Tower{
    constructor(id,x,y,mapData, unlockedUpgrades){
        super(id, x, y, mapData, "Missile Launcher", unlockedUpgrades);
        this.w = 2
        this.h = 2
        this.attackSpeed = 1
        this.cost = 100
        this.type = "land"
        this.hitTypes = ["ground", "air"]
        this.r = 5
        this.className = "Normal"

        this.addImage({
            name: "base",
            src: "./assets/images/towers/rocket_base.png",
            z: 0,
            animationTypes: [],
            maxAnimation: 1
        })

        this.addImage({
            name: "effect",
            src: "./assets/images/towers/rocket.png",
            z: 1,
            animationTypes: ["grow",  "rotate"],
            maxAnimation: 1
        })

        this.projectiles.push(new HomingProjectile({
            name: "rocket",
            img: "./assets/images/projectiles/rocket.png",
            damage: 5,
            speed: 20,
            lifespan: 5,
            homingCooldown: 0,
            height: 2,
        }))
        
        this.projectileImg = new Image()
        this.projectileImg.src = "./assets/images/projectiles/rocket.png"
    }

    upgrade(path, level) {
        
    }
}

