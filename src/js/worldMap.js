class WorldMap {
    constructor(id, name) {
        this.id = id
        this.levels = []
        this.name = name
        this.map = worldDataList[id].map

        for(let l=0;l<worldDataList[id].levels.length;l++) {
            this.levels.push(new Level(worldDataList[id].levels[l], l, this))
        }
        this.selectedLevel = -1
    }
    update(mode, tileSize) {
        for(let l=0;l<this.levels.length;l++) {
            this.levels[l].update(mode, tileSize)
        }
    }
}

class Level {
    constructor(levelInfo, index, map) {
        this.w = 2
        this.h = 2
        this.x = levelInfo.x
        this.y = levelInfo.y
        this.index = index
        this.id = levelInfo.id
        this.name = levelInfo.name
        this.description = levelInfo.description
        this.completed = false
        this.createButton(map, index)
    }
    createButton(map, index) {
        this.btn = document.createElement('div');
        this.btn.innerHTML = index + 1;
        this.btn.className = 'buttons-world-'+(map.id+1);
            
    	this.btn.onclick = () => { 
            console.log("hi")
        };
        document.body.appendChild(this.btn);
        console.log(this.btn)
    }
    update(mode, tileSize) {
        this.btn.style.width = this.w*tileSize + "px"
        this.btn.style.height = this.h*tileSize + "px"
        this.btn.style.top = (this.y-0.5*this.h)*tileSize + "px"
        this.btn.style.left = (this.x-0.5*this.w)*tileSize + "px"
        this.btn.style.fontSize = this.h*tileSize*0.8 + "px"

        let color = "radial-gradient(#f55f,#f00f)"
        if(this.completed) color = "radial-gradient(#5f5f,#0f0f)"
        this.btn.style.background = color

    }
}