class Projectile{
    constructor(args){
        this.args = args; // store this to make it easier to copy
        this.name = args.name;
        this.x = null;
        this.y = null;
        this.w = (args.width || 1) * (args.size || 1);
        this.h = (args.height || 1) * (args.size || 1);
        this.lifespan = args.lifespan || 5;
        this.damage = args.damage || 1;
        this.speed = args.speed || 1;
        this.image = new Image();
        if(args.img) this.image.src = args.img;
        this.pierce = args.pierce || 1;
        this.hitEffects = args.hitEffects || [];
        this.mapEffects = args.mapEffects || [];
        this.offset = args.offset || 0;
        this.hitCooldown = args.hitCooldown || 0;
        this.attacked = [];
        this.effects = [];
    }

    update(mode, ctx, tileSize, time, render=true){ // this is non homing
        this.hitCooldown -= time;
        this.lifespan -= time;
        if(this.lifespan<0){
            return false;
        }
        let dx = Math.round(Math.cos(this.a)*1000000)/1000000 * time * this.speed
        let dy = Math.round(Math.sin(this.a)*1000000)/1000000 * time * this.speed        
        this.x += dx
        this.y += dy
        if(this.hitCooldown <= 0){
            this.checkHit();
        }
        if(render) this.render(ctx, tileSize);
    }

    checkHit(){
        for(let e of this.mapData.enemies.enemies){
            if(this.pierce<=0){
                break;
            }
            if(this.attacked.includes(e)){
                continue;
            }
            if( 
                e!=null &&
                this.x < e.x + e.w &&
                this.x + this.w > e.x &&
                this.y < e.y + e.h &&
                this.h + this.y > e.y
            ) {
                this.hit(e)
                this.attacked.push(e);
                this.pierce-=1;
                if(this.pierce<=0){
                    this.lifespan = 0;
                    break;
                }
            }
        }
    }

    hit(enemy){
        enemy.health.hp -= this.damage;
        for(let effect of this.hitEffects){
            enemy.effects.push(effect)
        }
        for(let effect of this.mapEffects){
            let mapEffect = effect.getCopy();
            mapEffect.x = enemy.x;
            mapEffect.y = enemy.y;
            mapEffect.mapData = this.mapData;
            this.mapData.mapEffects.effects.push(mapEffect);
        }
    }

    render(ctx, tileSize){
        ctx.translate(this.x*tileSize,this.y*tileSize)
        ctx.rotate(this.a + Math.PI/2)
        if(this.image && this.image.src) {
            ctx.drawImage(this.image, -(this.w/2)*tileSize,-(this.h/2)*tileSize,tileSize*this.w,tileSize*this.h)
        } else {
            ctx.fillStyle = "red";
            ctx.fillRect(-(this.w/2)*tileSize,-(this.h/2)*tileSize,tileSize*this.w,tileSize*this.h);
        }
        ctx.rotate(-this.a - Math.PI/2)
        ctx.translate(-this.x*tileSize,-this.y*tileSize)
    }

    getCopy(tower=null, enemy=null) {
        let projectile = new this.constructor(this.args)
        if(tower) {
            projectile.x = tower.x + this.offset * Math.cos(tower.rotation);
            projectile.y = tower.y + this.offset * Math.sin(tower.rotation);
            projectile.a = tower.rotation - Math.PI/2
            projectile.mapData = tower.mapData
            projectile.hitTypes = tower.hitTypes
            if(enemy) {
                projectile.enemy = enemy
            }
            
        }
        return projectile
    }
}