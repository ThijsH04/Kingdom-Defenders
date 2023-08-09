class MapEffects{
    constructor(id){
        this.id = id;
        this.effects = [];
    }

    update(mode, ctx, tileSize, timePassed, render=true){        
        for(let d of this.effects) {
            d.update(mode, ctx, tileSize, timePassed, render)
        }
        this.effects = this.effects.filter(d => d.lifespan>0);
    }
}