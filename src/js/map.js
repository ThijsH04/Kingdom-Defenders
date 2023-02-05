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
    }
    render(ctx, tileset, tileSize, time)  {
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