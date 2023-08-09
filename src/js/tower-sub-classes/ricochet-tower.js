class RicochetTower extends Tower{
    constructor(id,x,y,mapData, unlockedUpgrades){
        super(id, x, y, mapData, "Ricochet Tower", unlockedUpgrades);
        this.w = 2
        this.h = 2
        this.attackSpeed = 1
        this.cost = 100
        this.type = "land"
        this.hitTypes = ["ground", "air"]
        this.r = 9
        this.className = "Normal"

        this.projectiles.push(new RicochetProjectile({
            name: "Bouncy Bullet",
            img: "./assets/images/projectiles/cannonball.png",
            damage: 5,
            speed: 20,
            bounces: 5,
            pierce: 5,
            lifespan: 20,
            size: .2,
        }))
    }

    upgrade(path, level) {
        
    }
}

