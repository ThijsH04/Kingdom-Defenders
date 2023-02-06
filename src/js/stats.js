class HealthBar {
    constructor(parent, max) {
        this.max = max
        this.hp = max

        this.w = parent.w * 0.8
        this.h = this.w * 0.2
        
        this.x = parent.x
        this.y = parent.y - (0.8*parent.h)
    }
    update(parent, ctx, tileset, tileSize) {
        this.x = parent.x
        this.y = parent.y - (0.8*parent.h)
        this.render(ctx, tileset, tileSize)
    }
    render(ctx, tileset, tileSize) {
        ctx.fillStyle = "#ff0000"
        ctx.fillRect((this.x - 0.5*this.w)*tileSize, (this.y - 0.5*this.h)*tileSize, this.w*tileSize, this.h*tileSize)
        ctx.fillStyle = "#00ff00"
        ctx.fillRect((this.x - 0.5*this.w)*tileSize, (this.y - 0.5*this.h)*tileSize, this.w*tileSize*(this.hp/this.max), this.h*tileSize)
    }
}