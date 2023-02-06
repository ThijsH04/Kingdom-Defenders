class HomingProjectile extends Projectile{
    constructor(tower,x,y,w,h,enemy,lifespan,speed,img,size,type){
        super(tower,x,y,w,h,enemy,lifespan,speed,img,size,type);
    }

    update(ctx, tileSize, time, render=true){ // this is non homing
        this.lifespan -= time;
        if(this.lifespan<0){
            return false;
        }
        let a = Math.atan2(this.enemy.y-this.y,this.enemy.x-this.x);
        let dx = Math.round(Math.cos(a)*1000000)/1000000 * time * this.speed
        let dy = Math.round(Math.sin(a)*1000000)/1000000 * time * this.speed
        this.x += dx
        this.y += dy
        if(render) this.render(ctx, tileSize);
    }
}