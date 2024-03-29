class GameMap {
    constructor(id, mapData=null) {
        if(mapData === null) {
            // mapData = mapDataList[id]
            mapData = mapDataList[0] // for testing purposes
        }
        this.tiles = []
        this.enemies = []
        this.towers = new Towers(id)
        this.projectiles = new Projectiles(id);
        this.mapEffects = new MapEffects(id);
        this.height = mapData.height
        this.width = mapData.width
        this.waterFrame = 0
        this.waterUpdateTime = 0

        for(let i=0;i<this.height;i++) {
            this.tiles.push([])
            for(let j=0;j<this.width;j++) {
                this.tiles[i].push(new Tile(mapData, j, i, this.width, this.height))
            }
        }
        this.paths = []
        this.enemies = new Enemies(0);

        if(id > -1) {
            this.paths.push(new Path(0))
        }
    }
    update(mode, mouseTile, ctx, tileset, tileSize, time, render=true, showMenu=true) {
        if(render) {
            this.render(ctx, tileset, tileSize, time)
            for(let p=0;p<this.paths.length;p++) {
                this.paths[p].render(mode, ctx, tileset, tileSize, false)
            }
        }
        if(mode == "game"){
            // this.enemies.enemies.push(new Enemy(1, game.map.paths[0].positions))
        }
        this.enemies.update(mode, ctx, tileset, tileSize, time, render);
        this.waterUpdateTime+=time
        if(this.waterUpdateTime > 0.1) {
            this.waterFrame = (this.waterFrame + 1) % 8
            this.waterUpdateTime = 0
        }
        this.projectiles.update(mode, ctx, tileSize, time, render);
        this.mapEffects.update(mode, ctx, tileSize, time, render);
        this.towers.update(mode, mouseTile, ctx, tileset, tileSize, time, render,showMenu,this.tiles);
    }
    render(ctx, tileset, tileSize, time) {
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
    constructor(id) {
        this.positions = mapDataPaths[id]
        this.startBox = new TextBox(this.positions[0][0]-3,this.positions[0][1],3,1,0,1,false,1)
        this.startBox.text.innerHTML += "start"
        this.startBox.element.style.background = "#0f05"
        this.startBox.element.style.display = "none"
        this.endBox = new TextBox(this.positions[this.positions.length-2][0]-1.5,this.positions[this.positions.length-1][1]-1,3,1,0,1,false,1)
        this.endBox.text.innerHTML += "end"
        this.endBox.element.style.background = "#f005"
        this.endBox.element.style.display = "none"
    }
    render(mode, ctx, tileset, tileSize, drawPath) {
        if(drawPath) {
            ctx.strokeStyle = "#ffffff"
            ctx.moveTo(this.positions[0][0] * tileSize,this.positions[0][1] * tileSize)
            for(let i=1;i<this.positions.length;i++) {
                ctx.lineTo(this.positions[i][0] * tileSize,this.positions[i][1] * tileSize)
            }
            ctx.stroke()
        }
        this.startBox.element.style.display = "block"
        this.endBox.element.style.display = "block"
        this.startBox.update(mode, tileSize)
        this.endBox.update(mode, tileSize)
    }
    
}