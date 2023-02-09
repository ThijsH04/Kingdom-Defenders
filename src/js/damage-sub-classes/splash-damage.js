class SplashDamage extends Damage{
    constructor(amount,mapData,r,lifespan){
        super(amount,mapData);
        this.r = r;
        this.lifespan = lifespan;
        this.maxLifespan = lifespan;
    }

    dealDamage(x,y,enemy=null){ // there is no actual target in splash 
        let enemiesInRange = this.mapData.enemies.findEnemiesInRadius(x,y,this.r);
        this.x = x;
        this.y = y;
        for(let e of enemiesInRange){
            super.dealDamage(x,y,e);
        }
        this.mapData.damages.damages.push(Object.assign(Object.create(Object.getPrototypeOf(this)), this));
    }

    update(mode, ctx, tileSize, time, render=true){
        this.lifespan -= time;
        if(this.lifespan<0){
            return false;
        }
        if(render){
            this.render(ctx, tileSize);
        }
    }

    render(ctx, tileSize){
        ctx.fillStyle = "yellow"; 
        ctx.beginPath();
        ctx.arc(this.x*tileSize, this.y*tileSize, this.r*(1-this.lifespan/this.maxLifespan)*tileSize,0,Math.PI*2);
        ctx.fill();
    }
}