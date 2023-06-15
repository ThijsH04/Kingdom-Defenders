class Towers{
    static #allTowers = {
        "standard":{tower:new StandardTower(0, undefined, undefined, new Damage(5), undefined, "red"),color:"red"},
        "homing":{tower:new HomingTower(0, undefined, undefined, new Damage(5), undefined, "green"),color:"green"},
        "shrapnel":{tower:new ShrapnelTower(0, undefined, undefined, new Damage(5), undefined, "yellow"),color:"yellow"},
        "earthquake":{tower:new EarthquakeTower(0, undefined, undefined, undefined, "orange"),color:"orange"},
        "chaining":{tower:new ChainingTower(0, undefined, undefined, undefined, "purple"),color:"purple"},
        "splash":{tower:new SplashTower(0, undefined, undefined, new SplashDamage(5,null,3,.2), undefined, "brown"),color:"brown"},
    }

    static #selectedTower = null;
    static #selectedPlacedTower = null;
    static #sideMenu = document.createElement("div");
    static #selectMenu = document.createElement("div");
    static #upgradeMenu = document.createElement("div");
    constructor(id){        
        this.id = id;
        this.towers = [];
    }

    update(mode, mouseTile, ctx, tileset, tileSize, timePassed, render=true,showMenu = false,tiles){  
        Towers.#sideMenu.style.visibility = showMenu? "visible":"hidden"; // probably also a better place for this, but eh
        for(let t of this.towers){
            if(t.health.hp>0){
                t.update(mode, ctx, tileset, tileSize, timePassed, render);
            } else {
                t.mapData.tiles[t.y+t.h/2][t.x+t.w/2].tower = null;
                if(t==Towers.#selectedPlacedTower){
                    Towers.#selectedPlacedTower = null;
                    Towers.#upgradeMenu.style.height = "0%";
                }
            }
        }
        // clear dead towers
        for(let tower of this.towers) {
            if(tower.health.hp <= 0) {
                for(let tile of tower.tiles) {
                    tile.tower = false
                    console.log(tile)
                }
            }
        }
        this.towers = this.towers.filter(t => t.health.hp>0);
        if(Towers.#selectedTower) { // this might be inefficient but should be fine? I think so
            if(mouseTile.x==-1||mouseTile.y==-1){
                return;
            }
            ctx.fillStyle = "#ff0000";
            ctx.globalAlpha = 0.5;
            let towerConstructor = Towers.#allTowers[Towers.#selectedTower].tower;
            let tempTower = Object.assign(Object.create(Object.getPrototypeOf(towerConstructor)), towerConstructor);
            tempTower.x = Math.floor(mouseTile.x-(tempTower.w-1)/2)+.5*tempTower.w;
            tempTower.y = Math.floor(mouseTile.y-(tempTower.h-1)/2)+.5*tempTower.h; 
            tempTower.render(ctx, tileSize)
            ctx.globalAlpha = .25;
            let checkTiles = this.getTiles(tempTower,tiles,tempTower.x,tempTower.y)
            if(this.checkPlacement(tempTower,checkTiles)){
                ctx.fillStyle = "#000000"
            } else {
                ctx.fillStyle = "#FF0000"
            }
            ctx.beginPath();
            ctx.arc(tempTower.x*tileSize, tempTower.y*tileSize, tempTower.r*tileSize, 0, Math.PI*2);
            ctx.fill();
            ctx.globalAlpha = 1
        } else if (Towers.#selectedPlacedTower) {
            ctx.globalAlpha = .25;
            ctx.fillStyle = "#000000"
            ctx.beginPath();
            ctx.arc(Towers.#selectedPlacedTower.x*tileSize, Towers.#selectedPlacedTower.y*tileSize, Towers.#selectedPlacedTower.r*tileSize, 0, Math.PI*2);
            ctx.fill();
            ctx.globalAlpha = 1
        }
        
    }
    
    showUpgradeMenu(menu, tower) {
        menu.style.height = "100%";
        menu.innerHTML = "" // clear possible old stuff

        let info = document.createElement("div")
        info.className = "upgradeMenuBox"
        info.innerHTML = `<h2>${tower.name}</h2>more interesting useful tower info`

        let modeButton = document.createElement("button")
        modeButton.innerHTML = "Targetting: " + tower.targetFunctions[tower.targetFunction].name
        modeButton.className = "targetModeBtn"
        modeButton.onclick=()=>{
            tower.switchTarget()
            modeButton.innerHTML = "Targetting: " + tower.targetFunctions[tower.targetFunction].name
        }
        info.appendChild(modeButton)

        let upgrades = document.createElement("div")
        tower.upgrades.menu = upgrades
        upgrades.className = "upgradeMenuBox"
        tower.upgrades.createUpgradeMenu(tower)
        menu.appendChild(info)
        menu.appendChild(upgrades)

        let sellButton = document.createElement("button");
        sellButton.classList.add("sellButton");
        sellButton.innerHTML = "sell"
        sellButton.addEventListener("click", e=>{
            tower.sell();
        })
        info.appendChild(sellButton);
    }

    addTower(x,y,mapData){
        let tile = mapData.tiles[Math.floor(y)][Math.floor(x)];
        if(tile.tower){
            Towers.#selectedPlacedTower = tile.tower;
            
            this.showUpgradeMenu(Towers.#upgradeMenu, tile.tower)

            return;
        }        
        Towers.#selectedPlacedTower = null;
        Towers.#upgradeMenu.style.height = "0";
        if(Towers.#selectedTower == null){
            return;
        }        
        let towerConstructor = Towers.#allTowers[Towers.#selectedTower].tower;
        // let tower = Object.assign(Object.create(Object.getPrototypeOf(towerConstructor)), towerConstructor)
        let tower = _.cloneDeep(towerConstructor)
        tower.x = Math.floor(x-(tower.w-1)/2)+0.5*tower.w;
        tower.y = Math.floor(y-(tower.h-1)/2)+0.5*tower.h; 
        tower.mapData = mapData;
        tower.damage.mapData = mapData;
        let tiles = this.getTiles(tower,mapData.tiles,tower.x,tower.y)
        if(!this.checkPlacement(tower,tiles)){
            return;
        }
        for(let tile of tiles) {
            console.log(tile)
            tile.tower = tower;
        }
        tower.tiles = tiles;
        this.towers.push(tower);
        Towers.#selectedTower = null;
    }

    checkPlacement(tower,tiles){
        for(let tile of tiles) {
            if(tile == undefined) return false; //if the tower is off the screen

            if(tile.layers.object || tile.tower){ // checks if there is no obstacle
                return false;
            }
            if(tower.type === "land" &&(!tile.layers.floor || tile.layers.path || tile.layers.river)){ // land check, might change the tower type check later
                return false;
            }
            if(tower.type === "water" &&(!(tile.layers.water||tile.layers.river) || tile.layers.cliff || tile.layers.floor)){ // water check, might change the tower type check later
                return false;
            }
            if(tower.type === "sky" &&!tile.layers.sky){ // fly check, might change the tower type check later
                return false;
            }
        }
        return true;
    }

    getTiles(tower,tiles,x,y) {
        let checkTiles = []
        let sx = Math.floor(x-(tower.w-1)/2)
        let sy = Math.floor(y-(tower.h-1)/2)
        for(let x=sx;x<sx+tower.w;x++) {
            for(let y=sy;y<sy+tower.h;y++) {
                if(x < 0 || y < 0 || x >= tiles[0].length || y >= tiles.length) checkTiles.push(undefined)
                else checkTiles.push(tiles[y][x])
            }
        }
        return checkTiles
    }

    static createSelectMenu(){
        for(let tower in this.#allTowers){
            this.#selectMenu.appendChild(this.menuItem(tower,this.#allTowers[tower].color,this.#allTowers[tower].tower.img));
        }
    }

    static menuItem(name, color, img=null){
        let res = document.createElement("div");
        res.innerHTML = name;
        res.name = name;
        if(img){
            let image = document.createElement("img");
            image.src = img;
            res.appendChild(image);
            console.log(image);
        }
        res.classList.add("menuItem");
        res.style.backgroundColor = color; 
        res.addEventListener("click", () =>{
            Towers.#selectedTower = name
            console.log(this);
        });
        return res;
    }

    static createSideMenu(){
        this.#sideMenu.classList.add("sideMenu") ;
        this.#sideMenu.innerHTML = "test"
        document.body.insertBefore(this.#sideMenu, document.body.children[0]);
        //document.body.appendChild(this.#sideMenu)
        this.#selectMenu.classList.add("selectMenu");
        this.#upgradeMenu.classList.add("upgradeMenu");
        this.#upgradeMenu.innerHTML="test3";
        this.createSelectMenu();
        this.#sideMenu.appendChild(this.#selectMenu);
        this.#sideMenu.appendChild(this.#upgradeMenu);
        this.#sideMenu.style.visibility = "hidden";
    }
}