class ShrapnelTower extends Tower{
    constructor(id,x,y,mapData){
        super(id,x,y,1,1,1,null,100,"land",mapData);
        this.shards = new Projectile(null,undefined,undefined,1,1,null,3,5,5,null,.5,"shard",null)
        
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
        this.mapData.projectiles.projectiles.push(new ShrapnelProjectile(this, this.x, this.y, 1, 1, closestEnemyData.enemy, 5, 10, 20, null, .8, "regular",this.mapData,3,this.shards)) 
    }
}

