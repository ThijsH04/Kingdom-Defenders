class ShrapnelTower extends Tower{
    constructor(id,x,y,mapData, unlockedUpgrades){
        super(id, x, y, mapData, "Shrapnel Tower", unlockedUpgrades);
        this.w = 2
        this.h = 2
        this.attackSpeed = 1
        this.cost = 100
        this.type = "land"
        this.hitTypes = ["ground"]
        this.r = 5
        this.className = "Normal"

        this.addImage({
            name: "base",
            src: "./assets/images/towers/catapult.png",
            z: 0,
            animationTypes: ["rotate"],
            maxAnimation: 1
        })

        this.addImage({
            name: "projectile",
            src: "./assets/images/towers/catapult_projectile.png",
            z: 1,
            animationTypes: ["move", "rotate"],
            startX: -1/32*12,
            maxAnimation: 1
        })
        
        this.shards = new HomingProjectile({
            name: "shard",
            img: null,
            damage: 5,
            speed: 20,
            lifespan: 5,
            homingCooldown: .2,
            hitCooldown: .1,
            size: .5,
        })

        this.projectiles.push(new ShrapnelProjectile({
            name: "shrapnel",
            img: "./assets/images/projectiles/cannonball.png",
            damage: 5,
            speed: 10,
            lifespan: 5,
            shards: this.shards,
            shardCount: 6,
            size: 0.7,
            offsetY: -0.8
        }))
    }



    upgrade(path, level) {
        
    }
}

