class ChainingTower extends Tower{
    constructor(id,x,y,damage,mapData){
        super(id,x,y,1,1,1,null,100,"land",damage,mapData);
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
        this.damage.dealDamage(this.x,this.y);
    }
}

