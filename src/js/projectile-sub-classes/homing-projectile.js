class HomingProjectile extends Projectile{
    constructor(tower,x,y,w,h,enemy,lifespan,damage,speed,img,size,type,mapData){
        super(tower,x,y,w,h,enemy,lifespan,damage,speed,img,size,type,mapData);
    }

    update(ctx, tileSize, time, render=true){ 
        this.lifespan -= time;
        if(this.lifespan<0){
            return false;
        }
        let a = Math.atan2(this.enemy.y-this.y,this.enemy.x-this.x);
        let dx = Math.round(Math.cos(a)*1000000)/1000000 * time * this.speed
        let dy = Math.round(Math.sin(a)*1000000)/1000000 * time * this.speed
        this.x += dx
        this.y += dy

        if(
            this.enemy!=null &&
            this.x < this.enemy.x + this.enemy.w &&
            this.x + this.w > this.enemy.x &&
            this.y < this.enemy.y + this.enemy.h &&
            this.h + this.y > this.enemy.y
        ) {
            this.enemy.health.hp -= this.damage;
            this.lifespan = 0;
        }

        if(render) this.render(ctx, tileSize);
    }
}