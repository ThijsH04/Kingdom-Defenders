class MapEffect {
    constructor(args){
        this.args = args; // store this to make it easier to copy
        this.amount = args.amount;
        this.mapData = args.mapData;
        this.stats = args.stats;
    }

    dealDamage(x,y,enemy,effects=[]){ // x and y for a damage effect later maybe
        if(enemy == null){
            console.log("enemy is null");
            return false;
        }
        this.stats.increaseDamageDealt(Math.min(enemy.health.hp,this.amount))
        enemy.dealDamageToEnemy(this.amount,effects);
    }
    
    update(){
        console.log("This method should not have been called");
    }

    getCopy(){
        return new this.constructor(this.args);
    }
}