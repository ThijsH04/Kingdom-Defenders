class HomingProjectile extends Projectile{
    constructor(tower,x,y,w,h,enemy,lifespan,damage,speed,img,size,type,mapData,homingCooldown, image){
        super(tower,x,y,w,h,enemy,lifespan,damage,speed,img,size,type,mapData,1,image);
        this.rotation = 0; // just in case no angle is set anywhere
        this.homingCooldown = homingCooldown;
    }

    update(mode, ctx, tileSize, time, render=true){ 
        this.homingCooldown -= time;
        if(this.homingCooldown>0){
            return super.update(mode, ctx, tileSize, time, render);
        }
        this.lifespan -= time;
        if(this.lifespan<0){
            return false;
        }
        let a = this.rotation;
        if(this.enemy != null){
            a = Math.atan2(this.enemy.y-this.y,this.enemy.x-this.x);
        }
        this.rotation = a+0.5*Math.PI
        let dx = Math.round(Math.cos(a)*1000000)/1000000 * time * this.speed
        let dy = Math.round(Math.sin(a)*1000000)/1000000 * time * this.speed
        this.x += dx
        this.y += dy

        this.checkHit();
        if(render) this.render(ctx, tileSize);
    }
}