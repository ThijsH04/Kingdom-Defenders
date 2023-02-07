class Projectiles{
    constructor(id){
        this.id = id;
        this.projectiles = [];
    }

    update(mode, ctx, tileSize, timePassed, render=true){  
        for(let p of this.projectiles){
            p.update(mode, ctx, tileSize, timePassed, render);
        }
        this.projectiles = this.projectiles.filter(p => p.lifespan>0);
    }

}