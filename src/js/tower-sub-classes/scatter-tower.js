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
        this.damage = new Damage(1,mapData,this.stats)
        this.className = "Normal"
        this.bullets = 10
        this.angleSpread = Math.PI/8

        this.image = {}
        this.image.animation = new Image()
        this.image.animation.src = "./assets/images/towers/cannon.png"
        this.image.animation.types = ["rotate"]

        this.projectileImg = new Image()
        this.projectileImg.src = "./assets/images/projectiles/cannonball.png"
    }

    upgrade(path, level) {

    }

    shoot(closestEnemyData){
        for(let i = 0; i < this.bullets; i++){
            let angle = Math.atan2(closestEnemyData.enemy.y - this.y, closestEnemyData.enemy.x - this.x) + (Math.random() * this.angleSpread - this.angleSpread/2);
            let projectile = new Projectile(this, this.x, this.y, 0.5, 0.5, closestEnemyData.enemy, 1, this.damage, 25, null, .8, "regular",this.mapData,1,this.projectileImg);
            projectile.a = angle;
            this.mapData.projectiles.projectiles.push(projectile);
        }
    }
}