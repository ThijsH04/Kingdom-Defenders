class ShrapnelTower extends Tower{
    constructor(id,x,y,mapData, unlockedUpgrades){
        super(id, x, y, mapData, "Shrapnel Tower", unlockedUpgrades);
        this.w = 2
        this.h = 2
        this.attackSpeed = 1
        this.cost = 100
        this.type = "land"
        this.hitTypes = ["ground", "air"]
        this.r = 5
        this.className = "Elemental"
        
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
            img: null,
            damage: 5,
            speed: 20,
            lifespan: 5,
            shards: this.shards,
            shardCount: 6
        }))
    }



    upgrade(path, level) {
        
    }
}

