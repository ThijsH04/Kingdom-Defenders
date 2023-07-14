class Damage{
    constructor(amount,mapData,stats){
        this.amount = amount;
        this.mapData = mapData;
        this.stats = stats;
    }

    dealDamage(x,y,enemy,effects=[]){ // x and y for a damage effect later maybe
        if(enemy == null){
            console.log("enemy is null");
            return false;
        }
        this.stats.increaseDamageDealt(Math.min(enemy.health.hp,this.amount))
        enemy.health.hp -= this.amount;
        for(let e=0;e<effects.length;e++) {
            enemy.effects.push(effects[e])
        }
    }
    
    update(){
        console.log("This method should not have been called");
    }


}