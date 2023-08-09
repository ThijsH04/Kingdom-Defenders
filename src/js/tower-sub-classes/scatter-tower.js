class ScatterTower extends Tower{ // to implement
    constructor(id,x,y,mapData, unlockedUpgrades){
        super(id, x, y, mapData, "Scattershot", unlockedUpgrades);
        this.w = 2
        this.h = 2
        this.attackSpeed = 1
        this.cost = 100
        this.type = "land"
        this.hitTypes = ["ground"]
        this.r = 7
        this.className = "Normal"
        this.bullets = 10
        this.angleSpread = Math.PI/8

        this.projectileImg = new Image()
        this.projectileImg.src = "./assets/images/projectiles/cannonball.png"

        this.projectiles.push(new Projectile({
            name: "bullet",
            img: "./assets/images/projectiles/cannonball.png",
            damage: 1,
            speed: 20,
            lifespan: 3,
            size: 0.5
        }))
    }

    upgrade(path, level) {

    }

    shoot(closestEnemyData){
        for(let p of this.projectiles) {
            for(let i = 0; i < this.bullets; i++){
                let angle = Math.atan2(closestEnemyData.enemy.y - this.y, closestEnemyData.enemy.x - this.x) + (Math.random() * this.angleSpread - this.angleSpread/2);
                let projectile = p.getCopy(this, closestEnemyData.enemy);
                projectile.a = angle;
                this.mapData.projectiles.projectiles.push(projectile);
            }
        }
        this.stats.increaseShots();
    }
}