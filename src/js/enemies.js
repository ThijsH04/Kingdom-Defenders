class Enemies{
    constructor(id){
        this.id = id;
        this.enemies = [];
    }

    update(mode, ctx, tileset, tileSize, timePassed, render=true){        
        for(let e=0;e<this.enemies.length;e++) {
            this.enemies[e].update(mode, ctx, tileset, tileSize, timePassed, render)
        }
        this.enemies = this.enemies.filter(e => e.health.hp>0);
    }

    
    findClosestEnemy(x,y){
        if(this.enemies.length == 0){
            return {enemy:null,distance:NaN};
        }
        let minEnemy = this.enemies[0];
        let minDistance = Math.sqrt((minEnemy.x-x)**2+(minEnemy.y-y)**2);
        for(let e of this.enemies){
            let distance = Math.sqrt((e.x-x)**2+(e.y-y)**2);
            if(distance<minDistance){
                minEnemy = e;
                minDistance = distance;
            }
        }
        return {enemy:minEnemy,distance:minDistance};
    }
}