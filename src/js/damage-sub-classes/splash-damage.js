class SplashEffect extends MapEffect {
    constructor(args){
        super(args);
        this.r = args.r;
        this.lifespan = args.lifespan;
        this.maxLifespan = args.lifespan;
        this.hitEnemies = [];
    }

    update(mode, ctx, tileSize, time, render=true){
        let enemiesInRange = this.mapData.enemies.findEnemiesInRadius(this.x,this.y,this.r);
        for(let e of enemiesInRange){
            if(!this.hitEnemies.includes(e)){
                this.hitEnemies.push(e);
                super.dealDamage(this.x,this.y,e);
            }
        }
        this.lifespan -= time;
        if(this.lifespan<0){
            return false;
        }
        if(render){
            this.render(ctx, tileSize);
        }
    }

    render(ctx, tileSize){
        ctx.fillStyle = "#ff00ff88"; 
        ctx.beginPath();
        ctx.arc(this.x*tileSize, this.y*tileSize, this.r*(1-this.lifespan/this.maxLifespan)*tileSize,0,Math.PI*2);
        ctx.fill();
    }
}