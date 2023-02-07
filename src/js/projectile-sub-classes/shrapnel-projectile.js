class ShrapnelProjectile extends Projectile {
    constructor(tower,x,y,w,h,enemy,lifespan,damage,speed,img,size,type,mapData,amount,shard){
        super(tower,x,y,w,h,enemy,lifespan,damage,speed,img,size,type,mapData);
        this.amount = amount;
        this.shard = shard; // just a regular projectile most likely, of which the x and y still need to be set
    }

    update(ctx, tileSize, time, render=true){ // this is non homing
        super.update(ctx, tileSize, time, render);
        if(this.lifespan<=0){
            this.createShrapnel();
        }
    }

    createShrapnel(){                
        for(let i = 0; i<this.amount; i++){
            // still gotta figure out how lodash works
            // let newShard = _.cloneDeep(this.shard);
            let newShard = Object.assign(Object.create(Object.getPrototypeOf(this.shard)), this.shard); // this is no copy yet, will work on that later.
            newShard.x = this.x;
            newShard.y = this.y;
            let angle = 2*Math.PI/this.amount*i;
            newShard.targetX = this.x + Math.round(Math.cos(angle)*1000000)/1000000 * newShard.speed * newShard.lifespan;
            newShard.targetY = this.y + Math.round(Math.sin(angle)*1000000)/1000000 * newShard.speed * newShard.lifespan;
            newShard.mapData = this.mapData;
            newShard.a = angle;
            newShard.enemy = this.mapData.enemies.findClosestEnemy(this.x,this.y).enemy;
            console.log(newShard);
            
            this.mapData.projectiles.projectiles.push(newShard);
        }
    }
}
