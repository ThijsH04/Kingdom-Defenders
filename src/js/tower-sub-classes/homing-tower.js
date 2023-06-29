class HomingTower extends Tower{
    constructor(id,x,y,mapData, color){
        super(id, x, y, mapData, color);
        this.name = "Missile Launcher";
        this.w = 2
        this.h = 2
        this.attackSpeed = 1
        this.cost = 100
        this.type = "land"
        this.r = 5
        this.damage = new Damage(5)
        this.className = "normal"

        this.image = {}
        this.image.base = new Image()
        this.image.base.src = "./assets/images/towers/rocket_base.png"
        this.image.rotating = new Image()
        this.image.rotating.src = "./assets/images/towers/rocket.png"

        this.projectileImg = new Image()
        this.projectileImg.src = "./assets/images/projectiles/rocket.png"
    }

    shoot(){
        let closestEnemyData = this.checkShot();
        if(!closestEnemyData){
            return;
        }
        this.mapData.projectiles.projectiles.push(new HomingProjectile(this, this.x, this.y, 1, 2, closestEnemyData.enemy, 5, this.damage, 20, null, .8, "regular",this.mapData,0,this.projectileImg)) 
    }

    upgrade(path, level) {
        
    }
}

