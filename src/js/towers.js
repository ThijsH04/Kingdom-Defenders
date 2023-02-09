class Towers{
    constructor(id){
        this.id = id;
        this.towers = [];
        this.selectMenu = document.createElement("div");
        this.upgradeMenu = document.createElement("div");
    }

    update(mode, ctx, tileset, tileSize, timePassed, render=true){        
        for(let t of this.towers){
            t.update(mode, ctx, tileset, tileSize, timePassed, render);
        }
    }

    addTower(tower,tile){
        if(tile.tower || tile.layers.object){ // checks if there is no tower or obstacle
            return
        }
        if(tower.type === "land" &&(!tile.layers.floor || tile.layers.path || tile.layers.river)){ // land check, might change the tower type check later
            return;
        }
        if(tower.type === "water" &&(!(tile.layers.water||tile.layers.river) || tile.layers.cliff || tile.layers.floor)){ // water check, might change the tower type check later
            return;
        }
        if(tower.type === "sky" &&!tile.layers.sky){ // fly check, might change the tower type check later
            return;
        }
        tile.tower = true;
        this.towers.push(tower);
    }
}