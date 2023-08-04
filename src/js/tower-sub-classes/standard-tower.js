class StandardTower extends Tower{
    constructor(id,x,y,mapData, unlockedUpgrades){
        super(id, x, y, mapData, "Cannon", unlockedUpgrades);
        this.w = 2
        this.h = 2
        this.attackSpeed = 1
        this.cost = 100
        this.type = "land"
        this.hitTypes = ["ground"]
        this.r = 5
        this.damage = new Damage(5,mapData,this.stats)
        this.className = "Normal"

        this.image = {}
        this.image.animation = new Image()
        this.image.animation.src = "./assets/images/towers/cannon.png"
        this.image.animation.types = ["rotate"]

        this.projectileImg = new Image()
        this.projectileImg.src = "./assets/images/projectiles/cannonball.png"

        this.shotCount = 1
        this.shotRange = 1
    }

    shoot(closestEnemyData) {
        let diff = this.shotRange / this.shotCount
        for(let i=0; i<this.shotCount; i++){
            let offset = diff * (i - (this.shotCount - 1) / 2)
            let angle = Math.atan2(closestEnemyData.enemy.y - this.y, closestEnemyData.enemy.x - this.x);
            let offsetX = offset * Math.cos(angle + Math.PI/2);
            let offsetY = offset * Math.sin(angle + Math.PI/2);
            let projectile = new Projectile(this, this.x + offsetX, this.y + offsetY, 1, 1, closestEnemyData.enemy, 5, this.damage, 20, null, .8, "regular",this.mapData,1,this.projectileImg);
            projectile.a = angle;
            this.mapData.projectiles.projectiles.push(projectile);
        }
        this.stats.increaseShots();
    }

    upgrade(path, level) {
        // example upgrades
        switch(path + ',' + level){
            case '0,0':
                this.damage = new Damage(7,this.mapData,this.stats)
                break;
            case '0,1':
                this.damage = new Damage(10,this.mapData,this.stats)
                break;
            case '0,2':
                this.damage = new Damage(20,this.mapData,this.stats)
                break;
            default:
                break;
            case '1,0':
                this.r = 5.5
                break;
            case '1,1':
                this.r = 6
                break;
            case '1,2':
                this.r = 8
                break;
            case '2,0':
                this.attackSpeed = 0.9
                break;
            case '2,1':
                this.attackSpeed = 0.8
                break;
            case '2,2':
                this.attackSpeed = 0.6
                break;
            case '3,0':
                this.shotCount = 2
                break;
            case '3,1':
                this.shotCount = 3
                break;
            case '3,2':
                this.shoot = (closestEnemyData) => {
                    let diff = this.shotRange / this.shotCount
                    for(let a=0; a<2; a++){
                        let angle = Math.atan2(closestEnemyData.enemy.y - this.y, closestEnemyData.enemy.x - this.x) + Math.PI * a;
                        for(let i=0; i<this.shotCount; i++){
                            let offset = diff * (i - (this.shotCount - 1) / 2)
                            let offsetX = offset * Math.cos(angle + Math.PI/2);
                            let offsetY = offset * Math.sin(angle + Math.PI/2);
                            let projectile = new Projectile(this, this.x + offsetX, this.y + offsetY, 1, 1, closestEnemyData.enemy, 5, this.damage, 20, null, .8, "regular",this.mapData,1,this.projectileImg);
                            projectile.a = angle;
                            this.mapData.projectiles.projectiles.push(projectile);
                        }
                    }
                    this.stats.increaseShots();
                }
        }
    }
}