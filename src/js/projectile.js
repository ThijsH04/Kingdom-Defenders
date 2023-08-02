class Projectile{
    constructor(tower,x,y,w,h,enemy,lifespan,damage,speed,img,size,type,mapData,pierce=1,image=undefined){
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
        this.pierce = pierce;
        this.attacked = [];
        this.effects = [];
        this.image = image;
        this.rotation = 0
    }

    update(mode, ctx, tileSize, time, render=true){ // this is non homing
        this.lifespan -= time;
        if(this.lifespan<0){
            return false;
        }
        let dx = Math.round(Math.cos(this.a)*1000000)/1000000 * time * this.speed
        let dy = Math.round(Math.sin(this.a)*1000000)/1000000 * time * this.speed        
        this.x += dx
        this.y += dy
        this.checkHit();
        // if( 
        //     this.enemy!=null &&
        //     this.x < this.targetX + this.enemy.w &&
        //     this.x + this.w > this.targetX &&
        //     this.y < this.targetY + this.enemy.h &&
        //     this.h + this.y > this.targetY
        // ) {
        //     this.damage.dealDamage(this.x,this.y,this.enemy,this.effects);
        //     this.lifespan = 0;
        // }
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
                this.damage.dealDamage(this.x,this.y,e,this.effects);
                this.attacked.push(e);
                this.pierce-=1;
                if(this.pierce<=0){
                    this.lifespan = 0;
                    break;
                }
            }
        }
    }

    render(ctx, tileSize){
        if(this.image) {
            ctx.translate(this.x*tileSize,this.y*tileSize)
            ctx.rotate(this.rotation)
            ctx.drawImage(this.image, -(this.w/2)*tileSize,-(this.h/2)*tileSize,tileSize*this.w,tileSize*this.h)
            ctx.rotate(-this.rotation)
            ctx.translate(-this.x*tileSize,-this.y*tileSize)
            //ctx.drawImage(this.image, (this.x+(1-this.w-this.size)/2)*tileSize,(this.y+(1-this.h-this.size)/2)*tileSize,tileSize*this.size*this.w,tileSize*this.size*this.h)
        } else {
            ctx.fillStyle = "red";
            ctx.fillRect((this.x+(1-this.w-this.size)/2)*tileSize,(this.y+(1-this.h-this.size)/2)*tileSize,tileSize*this.size*this.w,tileSize*this.size*this.h);
        }
    }
}