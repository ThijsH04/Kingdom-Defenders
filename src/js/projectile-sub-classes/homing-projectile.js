class HomingProjectile extends Projectile{
    constructor(args){
        super(args);
        this.rotation = 0; // just in case no angle is set anywhere
        this.homingCooldown = args.homingCooldown || 0;
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
        console.log(this.enemy, this.enemy.health.hp > 0)
        if(this.enemy && this.enemy.health.hp > 0){
            a = Math.atan2(this.enemy.y-this.y,this.enemy.x-this.x);
        }
        this.rotation = a
        let dx = Math.round(Math.cos(a)*1000000)/1000000 * time * this.speed
        let dy = Math.round(Math.sin(a)*1000000)/1000000 * time * this.speed
        this.x += dx
        this.y += dy

        this.checkHit();
        if(render) this.render(ctx, tileSize);
    }
}