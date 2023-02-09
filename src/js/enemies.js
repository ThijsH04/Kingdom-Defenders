class Enemies{
    constructor(id){
        this.id = id;
        this.enemies = [];
    }

    update(mode, ctx, tileset, tileSize, timePassed, render=true){     
        this.enemies = this.enemies.filter(e => e.health.hp>0);
        for(let e=0;e<this.enemies.length;e++) {
            this.enemies[e].update(mode, ctx, tileset, tileSize, timePassed, render)
        }
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

    findEnemiesInRadius(x,y,r){
        let res = [];
        for(let e of this.enemies){
            let distance = Math.sqrt((e.x-x)**2+(e.y-y)**2);
            if(distance<r){
                res.push(e);
            }
        }
        return res;
    }

    /* method for finding the enemy closed to a given point that is not yet in the passed array
    * @param x : int for x position which will be searched
    * @param y : int for y position from which will be searched
    * @param arr : arr of enemies that will be searched
    * @return an object containing enemy as null and distance as NaN when the arr is null, 
    *         there are no enemies or all enemies are already contained in the array.
    *         otherwise the closest enemy will be returned
    */
    findClosestEnemyNotInArray(x,y,arr){
        let res = {enemy:null,distance:NaN};
        if(!arr){
            return res;
        }
        for(let e of this.enemies){
            if(arr.includes(e)){
                continue;
            }
            let eDistance = Math.sqrt((e.x-x)**2+(e.y-y)**2);
            if(res.enemy == null){
                res.enemy = e;
                res.distance = eDistance
                continue;
            }
            if(eDistance<res.distance){
                res.enemy = e;
                res.distance = eDistance;
            }
        }
        return res;
    }
}