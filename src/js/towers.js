class Towers{
    constructor(id){
        this.id = id;
        this.towers = [];
    }

    update(ctx, tileset, tileSize, timePassed, render=true){        
        for(let t of this.towers){
            t.update(ctx, tileset, tileSize, timePassed, render);
        }
    }

    addTower(tower,tile){
        if(tile.tower || tile.object){ // checks if there is no tower or obstacle
            return
        }
        if(tower.type === "land" &&(!tile.floor || tile.path || tile.river)){ // land check, might change the tower type check later
            return;
        }
        if(tower.type === "water" &&(!(tile.water||tile.river) || tile.cliff || tile.floor)){ // water check, might change the tower type check later
            return;
        }
        if(tower.type === "sky" &&!tile.sky){ // fly check, might change the tower type check later
            return;
        }
        tile.tower = true;
        this.towers.push(tower);
    }
}