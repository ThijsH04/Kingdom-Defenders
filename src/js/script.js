(function() {
let canvas = document.getElementById("game")
canvas.width  = window.innerWidth
canvas.height = window.innerHeight
    
let ctx = canvas.getContext("2d")

previousFrameTime = Date.now()
let map = null;
let towers = null;
let tileSize = 0
// load tilesets
let tileset = new Image()
tileset.src = "./assets/tileset.png"
let enemyTileset = new Image()
enemyTileset.src = ""
let towerTileset = new Image()
towerTileset.src = ""
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

function game() {
    frameTime = Date.now()
    // time since last frame, in seconds
    // prevent too much time between frames
    timePassed = Math.min((frameTime - previousFrameTime) / 1000, 0.1)
    previousFrameTime = frameTime

    ctx.fillStyle = "#000000"
    ctx.fillRect(0,0,canvas.width,canvas.height)
    map.update(ctx, tileset, tileSize, timePassed)
    towers.update(ctx, tileSize, timePassed)
    
    requestAnimationFrame(game)
}
function updateCanvasSize() {
    let canvas = document.getElementById("game")
    w = window.innerWidth
    h = window.innerHeight
    tileSize = Math.floor(h / map.height)
    canvas.width = tileSize * map.width
    canvas.height = tileSize * map.height
    canvas.style.width = tileSize * map.width+"px"
    canvas.style.height = tileSize * map.height+"px"
}

document.getElementById("game").addEventListener("click", e =>{
    console.log(e);
    let x = Math.floor(e.clientX/tileSize);
    let y = Math.floor(e.clientY/tileSize);
    console.log("x: " +x + "y: "+y);
    console.log(map);
    if(x>=map.width||y>=map.height){ // return for now, just testing the tower building
        return;
    }
    towers.addTower(new Tower(1,x,y,null,0,"water"),map.tiles[y][x]);
});

window.onresize = updateCanvasSize
window.onload = () => {
    map = new GameMap(0)
    towers = new Towers(0);
    updateCanvasSize()
    requestAnimationFrame(game)
}
})()