class Projectile{
    constructor(tower,x,y,w,h,enemy,lifespan,speed,img,size,type){
        this.tower = tower;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.enemy = enemy;
        this.targetX = enemy.x;
        this.targetY = enemy.y;
        this.a = Math.atan2(enemy.y-y,enemy.x-x);
        this.lifespan = lifespan;
        this.speed = speed;
        this.img = img;
        this.size = .8;
        this.type = type;
    }

    update(ctx, tileSize, time, render=true){ // this is non homing
        this.lifespan -= time;
        if(this.lifespan<0){
            return false;
        }
        let dx = Math.round(Math.cos(this.a)*1000000)/1000000 * time * this.speed
        let dy = Math.round(Math.sin(this.a)*1000000)/1000000 * time * this.speed
        this.x += dx
        this.y += dy
        if(render) this.render(ctx, tileSize);
    }

    render(ctx, tileSize){
        ctx.fillStyle = "red";
        ctx.fillRect((this.x+(1-this.w-this.size)/2)*tileSize,(this.y+(1-this.h-this.size)/2)*tileSize,tileSize*this.size*this.w,tileSize*this.size*this.h);
    }
}