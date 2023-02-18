class HomingTower extends Tower{
    constructor(id,x,y,damage,mapData, color){
        super(id,"Homing Tower",x,y,1,1,1,null,100,"land",damage,8,mapData, color);
    }

    shoot(){
        let closestEnemyData = this.checkShot();
        if(!closestEnemyData){
            return;
        }
        this.mapData.projectiles.projectiles.push(new HomingProjectile(this, this.x, this.y, 1, 1, closestEnemyData.enemy, 5, this.damage, 20, null, .8, "regular",this.mapData,0)) 
    }

    upgrade(path, level) {
        
    }
}

