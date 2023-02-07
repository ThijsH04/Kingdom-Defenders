class ShrapnelTower extends Tower{
    constructor(id,x,y,damage,mapData){
        super(id,x,y,1,1,1,null,100,"land",damage,mapData);
        this.shards = new HomingProjectile(null,undefined,undefined,1,1,null,3,damage,10,null,.5,"shard",null,.3)
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
        this.mapData.projectiles.projectiles.push(new ShrapnelProjectile(this, this.x, this.y, 1, 1, closestEnemyData.enemy, 5, this.damage, 20, null, .8, "regular",this.mapData,6,this.shards)) 
    }
}

