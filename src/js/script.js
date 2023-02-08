(function() {

window.onload = () => {
    game = new Game()
    game.world = new WorldMap(game, 0, "World 1")
    game.map = new GameMap(0)
    game.tutorial = new Tutorial(game)
    game.updateCanvasSize()
    function update() {
        game.update()
        requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
    window.onresize = ()=> {game.updateCanvasSize()}

    document.getElementById("game").addEventListener("click", e =>{
        // let dummyTower = new Tower(1,Math.floor(e.clientX/tileSize)+.5,Math.floor(e.clientY/tileSize)+.5,null,1,1,0,"water");    
        // map.projectiles.addProjectile(dummyTower,map.enemies[0]);
        game.map.enemies.enemies.push(new Enemy(1, game.map.paths[0].positions))
        let x = Math.floor(e.clientX/game.tileSize);
        let y = Math.floor(e.clientY/game.tileSize);
        if(x>=game.map.width||y>=game.map.height){ // return for now, just testing the tower building
            return;
        }
        let damage = new SplashDamage(5,game.map,3,.1);
        game.map.towers.addTower(new StandardTower(1,x+.5,y+.5,damage,game.map),game.map.tiles[y][x]);
        // map.towers.addTower(new Tower(1,x+.5,y+.5,1,1,null,0,"test"),map.tiles[y][x]); // just places a tower down
    });
}
})()