class Damage{
    constructor(amount,mapData){
        this.amount = amount;
        this.mapData = mapData;
    }

    dealDamage(x,y,enemy,effects=[]){ // x and y for a damage effect later maybe
        if(enemy == null){
            console.log("enemy is null");
            return false;
        }
        enemy.health.hp -= this.amount;
        for(let e=0;e<effects.length;e++) {
            enemy.effects.push(effects[e])
        }
    }
    
    update(){
        console.log("This method should not have been called");
    }


}