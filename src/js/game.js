class Game {
    constructor() {
        this.map = null
        this.towers = null
        this.tutorial = null
        this.mode = "map"
        this.tileSize = 0

        this.canvas = document.getElementById("game")
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.ctx = this.canvas.getContext("2d")

        this.tileset = this.createTileset()
        this.gameSpeed = 1
        this.previousFrameTime = Date.now()
    }

    createTileset() {
        let tileset = new Image()
        tileset.src = "./assets/tileset.png"
        tileset.enemySprites = new Image()
        tileset.enemySprites.src = ""
        tileset.towerSprites = new Image()
        tileset.towerSprites.src = ""

        tileset.waterTilesets = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image()]
        tileset.waterTilesets[0].src = "./assets/water_animation_1.png"
        tileset.waterTilesets[1].src = "./assets/water_animation_2.png"
        tileset.waterTilesets[2].src = "./assets/water_animation_3.png"
        tileset.waterTilesets[3].src = "./assets/water_animation_4.png"
        tileset.waterTilesets[4].src = "./assets/water_animation_5.png"
        tileset.waterTilesets[5].src = "./assets/water_animation_6.png"

        tileset.waterRows = {157:0,158:0,159:0,160:0,161:0,162:0, // please ignore this
                            163:1,164:1,165:1,166:1,167:1,168:1,
                            169:2,170:2,171:2,172:2,173:2,174:2,
                            175:3,176:3,177:3,178:3,179:3,180:3,
                            181:4,182:4,183:4,184:4,185:4,186:4,
                            187:5,188:5,189:5,190:5,191:5,192:5}
        return tileset    
    }
    updateCanvasSize() {
        let w = window.innerWidth
        let h = window.innerHeight
        let m = (this.mode == "game" ? this.map : this.world.map)
        this.tileSize = Math.floor(h / m.height)
        this.canvas.width = this.tileSize * m.width
        this.canvas.height = this.tileSize * m.height
        this.canvas.style.width = this.tileSize * m.width+"px"
        this.canvas.style.height = this.tileSize * m.height+"px"
    }
    update() {
        let frameTime = Date.now()
        // time since last frame, in seconds
        // prevent too much time between frames
        let timePassed = Math.min((frameTime - this.previousFrameTime) / 1000, 0.1)
        this.previousFrameTime = frameTime
        for(let x=0;x<Math.floor(this.gameSpeed);x++) { // full number speed 
        if(this.mode == "game") this.map.update(this.mode, this.ctx, this.tileset, this.tileSize, timePassed, false)
        else if(this.mode == "map") this.world.update(this.mode, this.ctx, this.tileset, this.tileSize, timePassed, false)
        }
        this.tutorial.update(this)
        if(this.mode == "game") this.map.update(this.mode, this.ctx, this.tileset, this.tileSize, timePassed * (this.gameSpeed % 1)) // decimal speed + render
        else if(this.mode == "map") this.world.update(this.mode, this.ctx, this.tileset, this.tileSize, timePassed * (this.gameSpeed % 1))
    }
}