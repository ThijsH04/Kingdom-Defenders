class Damages{
    constructor(id){
        this.id = id;
        this.damages = [];
    }

    update(mode, ctx, tileSize, timePassed, render=true){        
        for(let d of this.damages) {
            d.update(mode, ctx, tileSize, timePassed, render)
        }
        this.damages = this.damages.filter(d => d.lifespan>0);
    }
}