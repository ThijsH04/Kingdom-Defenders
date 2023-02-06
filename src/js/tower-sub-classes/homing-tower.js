class HomingTower extends Tower{
    constructor(id,x,y,mapData){
        super(id,x,y,1,1,1,null,100,"land",mapData);
    }

    shoot(){
        if(this.mapData.enemies.length == 0){
            this.attackTimer = this.attackSpeed;
            return false;
        }
        let closestEnemyData = this.findClosestEnemy();
        if(closestEnemyData == null){
            console.log("something went wrong");
            return false;
        }
        this.mapData.projectiles.projectiles.push(new HomingProjectile(this, this.x, this.y, 1, 1, closestEnemyData.enemy, 5, 10, 20, null, .8, "regular")) 
    }
}

