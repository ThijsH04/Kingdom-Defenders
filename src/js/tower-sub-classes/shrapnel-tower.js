class ShrapnelTower extends Tower{
    constructor(id,x,y,damage,mapData){
        super(id,"Shrapnel Tower",x,y,1,1,1,null,100,"land",damage,5,mapData);
        this.shards = new HomingProjectile(null,undefined,undefined,1,1,null,3,damage,10,null,.5,"shard",null,.3)
    }

    shoot(){
        let closestEnemyData = this.checkShot();
        if(!closestEnemyData){
            return;
        }
        this.mapData.projectiles.projectiles.push(new ShrapnelProjectile(this, this.x, this.y, 1, 1, closestEnemyData.enemy, 5, this.damage, 50, null, .8, "regular",this.mapData,6,this.shards)) 
    }
}

