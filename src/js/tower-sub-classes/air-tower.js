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
        this.className = "Normal"

        this.projectiles.push(new Projectile({
            name: "bullet",
            img: "./assets/images/projectiles/cannonball.png",
            damage: 5,
            speed: 20,
            lifespan: 5
        }))
    }

    upgrade(path, level) {

    }
}