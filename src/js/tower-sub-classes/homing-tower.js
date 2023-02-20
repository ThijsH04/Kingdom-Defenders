class HomingTower extends Tower{
    constructor(id,x,y,damage,mapData, color){
        super(id,"Homing Tower",x,y,2,2,1,"./assets/towers/rocket_base.png",100,"land",damage,8,mapData, color);

        this.image = {}
        this.image.base = new Image()
        this.image.base.src = "./assets/towers/rocket_base.png"
        this.image.rotating = new Image()
        this.image.rotating.src = "./assets/towers/rocket.png"

        this.projectileImg = new Image()
        this.projectileImg.src = "./assets/projectiles/rocket.png"
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

