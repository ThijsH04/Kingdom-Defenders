class ShrapnelProjectile extends Projectile {
    constructor(args){
        super(args);
        this.amount = args.shardCount || 1;
        this.shard = args.shards; // just a regular projectile most likely, of which the x and y still need to be set
    }

    hit(enemy) {
        this.createShrapnel();
        super.hit(enemy);
    }

    createShrapnel(){
        for(let i = 0; i<this.amount; i++){
            let newShard = this.shard.getCopy();
            newShard.x = this.x;
            newShard.y = this.y;
            newShard.damage = this.shard.damage
            let angle = 2*Math.PI/this.amount*i;
            newShard.targetX = this.x + Math.round(Math.cos(angle)*1000000)/1000000 * newShard.speed * newShard.lifespan;
            newShard.targetY = this.y + Math.round(Math.sin(angle)*1000000)/1000000 * newShard.speed * newShard.lifespan;
            newShard.mapData = this.mapData;
            newShard.hitTypes = this.hitTypes;  
            newShard.a = angle;
            newShard.enemy = this.mapData.enemies.findClosestEnemy(this.x,this.y).enemy;            
            this.mapData.projectiles.projectiles.push(newShard);
        }
    }
}
