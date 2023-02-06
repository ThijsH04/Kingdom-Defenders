class GameMap {
    constructor(id) {
        let mapData = mapDataList[id]
        this.tiles = []
        this.height = mapData.height
        this.width = mapData.width
        this.waterFrame = 0
        this.waterUpdateTime = 0
        let layers = mapData.layers
        for(let i=0;i<this.height;i++) {
            this.tiles.push([])
            for(let j=0;j<this.width;j++) {
                this.tiles[i].push(new Tile(mapData, j, i, this.width, this.height))
            }
        }
        this.paths = []
        this.enemies = []

        this.paths.push(new Path(0, "ground"))
    }
    update(ctx, tileset, tileSize, time) {
        this.render(ctx, tileset, tileSize, time)
        for(let p=0;p<this.paths.length;p++) {
            this.paths[p].render(ctx, tileset, tileSize, false)
        }
    }
    render(ctx, tileset, tileSize, time) {
        this.waterUpdateTime+=time
        if(this.waterUpdateTime > 0.1) {
            this.waterFrame = (this.waterFrame + 1) % 8
            this.waterUpdateTime = 0
        }
        
        for(let y=0;y<this.height;y++) {
            for(let x=0;x<this.width;x++) {
                let layers = this.tiles[y][x].renderLayers
                for(let l=0;l<layers.length;l++) {
                    let tile = layers[l] - 1
                    if(tile < 0) continue

                    // x and y position of sprite on spritesheet
                    let spriteY = Math.floor(tile/8)
                    let spriteX = tile-spriteY*8
                    let useTileset = tileset
                    if(spriteY in tileset.waterRows) {
                        useTileset = tileset.waterTilesets[tileset.waterRows[spriteY]]
                        spriteY = (spriteY-1)%6
                        spriteX = spriteX+this.waterFrame*8
                    }

                    // draw the tile
                    ctx.drawImage(useTileset, spriteX*32,spriteY*32,32,32,x*tileSize,y*tileSize,tileSize,tileSize)   
                }
            }
        }
    }
}


class Tile {
    constructor(mapData, x, y, w, h) {
        this.tower = false
        this.renderLayers = []
        this.layers = {}
        for(let l=0;l<mapData.layers.length;l++) {
            this.renderLayers.push(mapData.layers[l].data[y*w+x])
            this.layers[mapData.layers[l].name] = mapData.layers[l].data[y*w+x] > 0
        }
    }
}


class Path {
    constructor(id, type) {
        this.positions = mapDataPaths[id]
        this.type = type
        this.startBox = new TextBox(this.positions[0][0],this.positions[0][1],3,1,0,false)
        this.startBox.element.innerHTML += "start"
        this.startBox.element.style.background = "#0f09"
        this.endBox = new TextBox(this.positions[this.positions.length-1][0],this.positions[this.positions.length-1][1],3,1,0,false)
        this.endBox.element.innerHTML += "end"
        this.endBox.element.style.background = "#f009"
    }
    render(ctx, tileset, tileSize, drawPath) {
        console.log(tileSize, drawPath)
        if(drawPath) {
            ctx.strokeStyle = "#ffffff"
            ctx.moveTo(this.positions[0][0] * tileSize,this.positions[0][1] * tileSize)
            for(let i=1;i<this.positions.length;i++) {
                ctx.lineTo(this.positions[i][0] * tileSize,this.positions[i][1] * tileSize)
            }
            ctx.stroke()
        }
        this.startBox.update(tileSize)
        this.endBox.update(tileSize)
    }
    
}