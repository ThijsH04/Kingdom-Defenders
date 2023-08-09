class Enemy {
    constructor(type,path,enemies,moveType="ground",x=null,y=null,p=0) {
        // console.log(enemies)
        if(x === null || y === null) {
            x = path[0][0]
            y = path[0][1]
        }
        this.x=x
        this.y=y
        this.w=0.8
        this.h=0.8
        this.speed = 0.5
        this.type=type
        this.path = path
        this.point = p
        this.moveType = moveType

        this.image = {}
        // this.image.base = new Image()
        // this.image.base.src =;

        this.health = new HealthBar(this,100)
        this.effects = []
        this.enemies = enemies
    }
    update(mode, ctx, tileset, tileSize, time, render=true) {
        let p=this.point
        if(p === this.path.length - 1) {
            this.endOfTrack();
            // deal damage to player
        } else {
            let diffX = this.path[p+1][0] - this.path[p][0]
            let diffY = this.path[p+1][1] - this.path[p][1]
            let a = Math.atan2(diffY,diffX)
            let dx = Math.round(Math.cos(a)*1000000)/1000000 * time * this.speed
            let dy = Math.round(Math.sin(a)*1000000)/1000000 * time * this.speed
            this.x += dx
            this.y += dy

            let pastPoint = false
            if(dx > 0 && this.x > this.path[p+1][0]) pastPoint = true
            if(dx < 0 && this.x < this.path[p+1][0]) pastPoint = true
            if(dy > 0 && this.y > this.path[p+1][1]) pastPoint = true
            if(dy < 0 && this.y < this.path[p+1][1]) pastPoint = true

            if(pastPoint) {
                this.x = this.path[p+1][0]
                this.y = this.path[p+1][1]
                this.point += 1
            }
        }
        if(render) {
            this.render(ctx, tileset, tileSize)
            if(this.health.hp < this.health.max) this.health.update(mode, this,ctx, tileset, tileSize)
        }
        for(let e=0;e<this.effects.length;e++) {
            this.effects[e].update(this)
        }
        this.effects = this.effects.filter(e => e.timeLeft > 0)
    }
    render(ctx, tileset, tileSize) {
        if(this.image.base){
            ctx.drawImage(this.image.base, (this.x-this.w/2)*tileSize,(this.y-this.h/2)*tileSize,tileSize*this.w,tileSize*this.h)
        } else { 
            ctx.fillStyle = "#ff0000"
            ctx.fillRect((this.x - 0.5*this.w)*tileSize, (this.y - 0.5*this.h)*tileSize, this.w*tileSize, this.h*tileSize)
        }
        if(this.effects.filter(e => e.type == "damage dealt").length!=0){
            ctx.alpha = .5;
            ctx.fillStyle = "red";
            ctx.fillRect((this.x - 0.5*this.w)*tileSize, (this.y - 0.5*this.h)*tileSize, this.w*tileSize, this.h*tileSize)
            ctx.alpha = 1;
        }
    }
    getProgress() {
        let p=this.point
        if(p == this.path.length-1) {
            return this.p
        } else {
            let diffX = this.path[p+1][0] - this.path[p][0]
            let diffY = this.path[p+1][1] - this.path[p][1]
            let dis = (diffX**2 + diffY**2)**0.5

            let progress = ((this.path[p][0]-this.x)**2 + (this.path[p][1]-this.y)**2)**0.5

            // console.log(p + (progress/dis))
            return p + (progress / dis)
        }
    }

    dealDamageToEnemy(amount, effects) {
        this.health.hp -= amount;
        for(let e=0;e<effects.length;e++) {
            this.effects.push(effects[e])
        }
        this.effects.push(new Effect("damage dealt", 0.25));
    }

    getGroupSize(range=1) {
        // console.log(this)
        let count = 0
        for(let e of this.enemies.enemies) {
            if(e == this) continue

            let dis = ((this.x - e.x)**2 + (this.y - e.y)**2)**0.5
            if(dis < range) count += range - dis
        }
        return count
    }
    /**
     * method to "kill" enemy and deal damage to player
     * once the enemy reaches the end of the track
     * damage dealt still has to be implemented
     */
    endOfTrack(){ 
        this.health.hp = -1;
    }
}