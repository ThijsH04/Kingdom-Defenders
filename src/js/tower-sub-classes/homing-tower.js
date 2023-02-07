class HomingTower extends Tower{
    constructor(id,x,y,mapData){
        super(id,x,y,1,1,1,null,100,"land",mapData);
    }

    shoot(){
        if(this.mapData.enemies.length == 0){
            this.attackTimer = this.attackSpeed;
            return false;
        }
        let closestEnemyData = this.mapData.enemies.findClosestEnemy(this.x,this.y);
        if(closestEnemyData.enemy == null){
            return false;
        }
        this.mapData.projectiles.projectiles.push(new HomingProjectile(this, this.x, this.y, 1, 1, closestEnemyData.enemy, 5, 10, 20, null, .8, "regular",this.mapData,0)) 
    }
}

