class Projectiles{
    constructor(id){
        this.id = id;
        this.projectiles = [];
    }

    update(ctx, tileSize, timePassed, render=true){  
        for(let p of this.projectiles){
            p.update(ctx, tileSize, timePassed, render);
        }
        this.projectiles = this.projectiles.filter(p => p.lifespan>0);
    }

    addProjectile(tower,enemy){
        //still testing some stuff
        this.projectiles.push(new Projectile(tower,tower.x,tower.y,1,1,enemy,5,20,null,.8,null));
    }
}