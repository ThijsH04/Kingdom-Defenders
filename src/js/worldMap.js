class WorldMap {
    constructor(game, id, name) {
        this.id = id
        this.levels = []
        this.name = name
        this.map = new GameMap(-1, worldDataList[id].map)

        for(let l=0;l<worldDataList[id].levels.length;l++) {
            this.levels.push(new Level(game, worldDataList[id].levels[l], l, this))
        }
        this.selectedLevel = -1
    }
    update(mode,ctx, tileset, tileSize, time, render=true) {
        this.map.update(mode, {x:0,y:0}, ctx, tileset, tileSize, time, render, false)
        for(let l=0;l<this.levels.length;l++) {
            this.levels[l].update(mode, tileSize)
        }
    }
    show(s=true) {
        for(let l=0;l<this.levels.length;l++) {
            this.levels[l].btn.style.display = (s ? "flex" : "none")
        }
    }
    
}

class Level {
    constructor(game, levelInfo, index, map) {
        this.w = 2.5
        this.h = 2.5
        this.x = levelInfo.x
        this.y = levelInfo.y
        this.index = index
        this.id = levelInfo.mapId
        this.levelId = levelInfo.levelId
        this.name = levelInfo.name
        this.description = levelInfo.description
        this.completed = false
        this.gameMap = new GameMap(this.levelId) //level id could be double, not sure what id should do
        this.createButton(game, map, index)
    }
    createButton(game, map, index) {
        this.btn = document.createElement('button');
        this.btn.innerHTML = index + 1;
        this.btn.className = 'world-buttons';
            
    	this.btn.onclick = () => { 
            if(this.index == 0 || map.levels[this.index-1].completed) {
                game.setMode("game")
                this.map = this.gameMap
                map.show(false)
            }
            
        };
        document.getElementById("map").appendChild(this.btn);
    }
    update(mode, tileSize) {
        this.btn.style.width = this.w*tileSize + "px"
        this.btn.style.height = this.h*tileSize + "px"
        this.btn.style.top = (this.y-0.5*this.h)*tileSize + "px"
        this.btn.style.left = (this.x-0.5*this.w)*tileSize + "px"
        this.btn.style.fontSize = this.h*tileSize*0.7 + "px"

        let color = "radial-gradient(#f55f,#f00f)"
        if(this.completed) color = "radial-gradient(#5f5f,#0f0f)"
        this.btn.style.background = color

    }
}