class DoubleCannon extends Tower{
    constructor(id,x,y,mapData, unlockedUpgrades){
        super(id, x, y, mapData, "Double Cannon", unlockedUpgrades);
        this.w = 2
        this.h = 2
        this.attackSpeed = 1
        this.cost = 100
        this.type = "land"
        this.hitTypes = ["ground"]
        this.r = 5
        this.damage = new Damage(5,mapData,this.stats)
        this.className = "Normal"

        // this.image = {}
        // this.image.animation = new Image()
        // this.image.animation.src = "./assets/images/towers/cannon.png"
        // this.image.animation.types = ["rotate"]

        this.projectileImg = new Image()
        this.projectileImg.src = "./assets/images/projectiles/cannonball.png" // needs a sprite
    }

    shoot(closestEnemyData){
        // calculate offset by rotation of tower
        let offset = 0.2;
        let angle = Math.atan2(closestEnemyData.enemy.y - this.y, closestEnemyData.enemy.x - this.x);
        let offsetX = offset * Math.cos(angle + Math.PI/2);
        let offsetY = offset * Math.sin(angle + Math.PI/2);

        let p1 = new Projectile(this, this.x + offsetX, this.y + offsetY, 1, 1, closestEnemyData.enemy, 5, this.damage, 20, null, .8, "regular",this.mapData,1,this.projectileImg);
        let p2 = new Projectile(this, this.x - offsetX, this.y - offsetY, 1, 1, closestEnemyData.enemy, 5, this.damage, 20, null, .8, "regular",this.mapData,1,this.projectileImg);
        p1.a = angle;
        p2.a = angle;

        this.mapData.projectiles.projectiles.push(p1);
        this.mapData.projectiles.projectiles.push(p2);

        this.stats.increaseShots();
    }
}