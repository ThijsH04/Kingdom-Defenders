(function() {

window.onload = () => {
    game = new Game()
    game.world = new WorldMap(game, 0, "World 1")
    game.map = new GameMap(0)
    game.tutorial = new Tutorial(game)
    game.resources = new Resources(coins=5)
    game.upgrades = new Upgrades(game, upgrades, towerTypes, towerClasses)

    game.setMode("map", false)
    function update() {
        game.update()
        requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
    window.onresize = ()=> {game.updateCanvasSize()}

    document.getElementById("game").addEventListener("click", e =>{
        console.log(e);
        
        // let dummyTower = new Tower(1,Math.floor(e.clientX/tileSize)+.5,Math.floor(e.clientY/tileSize)+.5,null,1,1,0,"water");    
        // map.projectiles.addProjectile(dummyTower,map.enemies[0]);
        if(game.mode == "game") {
            game.map.enemies.enemies.push(new Enemy(1, game.map.paths[0].positions, game.map.enemies))
            let x = e.offsetX/game.tileSize;
            let y = e.offsetY/game.tileSize;
            if(x>=game.map.width||y>=game.map.height){ // return for now, just testing the tower building
                return;
            }
            // let damage = new SplashDamage(1,game.map,1,.1);
            game.map.towers.addTower(x,y,game.map, game.upgrades.unlocked);
            // map.towers.addTower(new Tower(1,x+.5,y+.5,1,1,null,0,"test"),map.tiles[y][x]); // just places a tower down
        }
        
        // let damage = new SplashDamage(5,game.map,3,.1);
        // game.map.towers.addTower(new StandardTower(1,x+.5,y+.5,damage,game.map),game.map.tiles[y][x]);
        // map.towers.addTower(new Tower(1,x+.5,y+.5,1,1,null,0,"test"),map.tiles[y][x]); // just places a tower down
    });
    document.getElementById("game").addEventListener("mousemove", e =>{
        let x = e.offsetX/game.tileSize;
        let y = e.offsetY/game.tileSize;
        game.mouseTile = {x,y}
    })

    document.getElementById("game").addEventListener("mouseleave", e =>{
        game.mouseTile = {x:-1,y:-1}
    })

    document.getElementById("game").addEventListener("wheel", e =>{
        if(game.mode == "game") {
            if(e.deltaY>=0){
                Towers.increaseSelectedTower(1);
            } else {
                Towers.increaseSelectedTower(-1);
            }
        }
    })
}
})()