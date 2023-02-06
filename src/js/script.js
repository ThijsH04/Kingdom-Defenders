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
    timePassed = (frameTime - previousFrameTime) / 1000 // time since last frame, in seconds
    previousFrameTime = frameTime

    ctx.fillStyle = "#000000"
    ctx.fillRect(0,0,canvas.width,canvas.height)
    map.update(ctx, tileset, tileSize, timePassed)    
    requestAnimationFrame(game)
}
function updateCanvasSize() {
    let canvas = document.getElementById("game")
    w = window.innerWidth
    h = window.innerHeight
    canvas.width = w
    canvas.height = h
    canvas.style.width = w+"px"
    canvas.style.height = h+"px"
    tileSize = Math.floor(canvas.height / map.height)
}

document.getElementById("game").addEventListener("click", e =>{
    let dummyTower = new Tower(1,Math.floor(e.clientX/tileSize)+.5,Math.floor(e.clientY/tileSize)+.5,null,1,1,0,"water");    
    map.projectiles.addProjectile(dummyTower,map.enemies[0]);
    let x = Math.floor(e.clientX/tileSize);
    let y = Math.floor(e.clientY/tileSize);
    console.log(map);
    if(x>=map.width||y>=map.height){ // return for now, just testing the tower building
        return;
    }
    map.towers.addTower(new Tower(1,x+.5,y+.5,1,1,null,0,"test"),map.tiles[y][x]); // just places a tower down
});

window.onresize = updateCanvasSize
window.onload = () => {
    map = new GameMap(0)
    updateCanvasSize()
    requestAnimationFrame(game)
}
})()