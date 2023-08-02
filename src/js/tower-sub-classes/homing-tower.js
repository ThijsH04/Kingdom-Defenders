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
        this.damage = new Damage(5,mapData,this.stats)
        this.className = "Normal"

        this.image = {}
        this.image.base = new Image()
        this.image.base.src = "./assets/images/towers/rocket_base.png"
        this.image.animation = new Image()
        this.image.animation.src = "./assets/images/towers/rocket.png"
        this.image.animation.maxSize = 1;
        this.image.animation.types = ["grow", "rotate"]
        
        this.projectileImg = new Image()
        this.projectileImg.src = "./assets/images/projectiles/rocket.png"
    }

    shoot(closestEnemyData){
        if(!closestEnemyData){
            return;
        }
        this.mapData.projectiles.projectiles.push(new HomingProjectile(this, this.x, this.y, 1, 2, closestEnemyData.enemy, 5, this.damage, 20, null, .8, "regular",this.mapData,0,this.projectileImg)) 
        this.stats.increaseShots();
    }

    upgrade(path, level) {
        
    }
}

