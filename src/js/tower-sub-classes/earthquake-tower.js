class EarthquakeTower extends Tower{
    constructor(id,x,y,mapData){
        super(id,x,y,1,1,1,null,100,"land",new SplashDamage(5,game.map,4,.1,20,[]),mapData);
    }

    shoot(){
        if(this.mapData.enemies.length == 0){
            this.attackTimer = this.attackSpeed;
            return false;
        }
        let closestEnemyData = this.mapData.enemies.findClosestEnemy(this.x,this.y);
        if(closestEnemyData.enemy == null||closestEnemyData.distance>this.damage.r){
            return false;
        }
        this.damage.dealDamage(this.x,this.y);
    }
}

