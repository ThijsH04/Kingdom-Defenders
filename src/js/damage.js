class Damage{
    constructor(amount,mapData){
        this.amount = amount;
        this.mapData = mapData;
    }

    dealDamage(x,y,enemy){ // x and y for a damage effect later maybe
        if(enemy == null){
            console.log("enemy is null");
            return false;
        }
        enemy.health.hp -= this.amount;
    }
    
    update(){
        console.log("This method should not have been called");
    }


}