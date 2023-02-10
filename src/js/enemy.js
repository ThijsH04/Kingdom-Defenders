class Enemy {
    constructor(type,path,x=null,y=null,p=0) {
        if(x === null || y === null) {
            x = path[0][0]
            y = path[0][1]
        }
        this.x=x
        this.y=y
        this.w=0.8
        this.h=0.8
        this.speed = 5
        this.type=type
        this.path = path
        this.point = p

        this.health = new HealthBar(this,100)
        this.effects = []
    }
    update(mode, ctx, tileset, tileSize, time, render=true) {
        let p=this.point
        if(p === this.path.length - 1) {
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
        ctx.fillStyle = "#ff0000"
        ctx.fillRect((this.x - 0.5*this.w)*tileSize, (this.y - 0.5*this.h)*tileSize, this.w*tileSize, this.h*tileSize)
    }
}