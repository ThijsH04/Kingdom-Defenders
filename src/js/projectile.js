class Projectile{
    constructor(tower,x,y,w,h,enemy,lifespan,damage,speed,img,size,type,mapData){
        this.tower = tower;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.enemy = enemy;
        if(enemy!=null){
            this.targetX = enemy.x;
            this.targetY = enemy.y;
            this.a = Math.atan2(enemy.y-y,enemy.x-x);
        }
        this.lifespan = lifespan;
        this.damage = damage;
        this.speed = speed;
        this.img = img;
        this.size = size;
        this.type = type;
        this.mapData = mapData;
    }

    update(mode, ctx, tileSize, time, render=true){ // this is non homing
        this.lifespan -= time;
        if(this.lifespan<0){
            return false;
        }
        let dx = Math.round(Math.cos(this.a)*1000000)/1000000 * time * this.speed
        let dy = Math.round(Math.sin(this.a)*1000000)/1000000 * time * this.speed
        console.log(dx);
        
        this.x += dx
        this.y += dy
        if( 
            this.enemy!=null &&
            this.x < this.targetX + this.enemy.w &&
            this.x + this.w > this.targetX &&
            this.y < this.targetY + this.enemy.h &&
            this.h + this.y > this.targetY
        ) {
            this.enemy.health.hp -= this.damage;
            this.lifespan = 0;
        }
        if(render) this.render(ctx, tileSize);
    }

    render(ctx, tileSize){
        ctx.fillStyle = "red";
        ctx.fillRect((this.x+(1-this.w-this.size)/2)*tileSize,(this.y+(1-this.h-this.size)/2)*tileSize,tileSize*this.size*this.w,tileSize*this.size*this.h);
    }
}