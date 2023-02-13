class Towers{
    static allTowers = {
        "standard":{tower:new StandardTower(0, undefined, undefined, new Damage(5)),color:"red"},
        "homing":{tower:new HomingTower(0, undefined, undefined, new Damage(5)),color:"green"},
        "shrapnel":{tower:new ShrapnelTower(0, undefined, undefined, new Damage(5)),color:"yellow"},
        "earthquake":{tower:new EarthquakeTower(0, undefined, undefined),color:"orange"},
        "chaining":{tower:new ChainingTower(0, undefined, undefined),color:"purple"},
        "splash":{tower:new SplashTower(0, undefined, undefined, new SplashDamage(5,null,3,.2)),color:"brown"},
    }

    static selectedTower = null;
    static selectedPlacedTower = null;
    static sideMenu = document.createElement("div");
    static selectMenu = document.createElement("div");
    static upgradeMenu = document.createElement("div");
    constructor(id){        
        this.id = id;
        this.towers = [];
    }

    update(mode, mouseTile, ctx, tileset, tileSize, timePassed, render=true,showMenu = false){  
        Towers.sideMenu.style.visibility = showMenu? "visible":"hidden"; // probably also a better place for this, but eh
        for(let t of this.towers){
            t.update(mode, ctx, tileset, tileSize, timePassed, render);
        }
        if(Towers.selectedTower) { // this might be inefficient but should be fine? I think so
            ctx.fillStyle = "#ff0000";
            ctx.globalAlpha = 0.5;
            let towerConstructor = Towers.allTowers[Towers.selectedTower].tower;
            let tempTower = Object.assign(Object.create(Object.getPrototypeOf(towerConstructor)), towerConstructor);
            tempTower.x = mouseTile.x+tempTower.w/2;
            tempTower.y = mouseTile.y+tempTower.h/2;
            tempTower.render(ctx, tileSize)
            ctx.globalAlpha = 1
        }
        
    }
    
    showUpgradeMenu(menu, tower) {
        menu.style.height = "100%";
        menu.innerHTML = "" // clear possible old stuff

        let info = document.createElement("div")
        info.className = "upgradeMenuBox"
        info.innerHTML = `<h2>${tower.name}</h2>more interesting useful tower info`
        let upgrades = document.createElement("div")
        tower.upgrades.menu = upgrades
        upgrades.className = "upgradeMenuBox"
        tower.upgrades.createUpgradeMenu()
        
        menu.appendChild(info)
        menu.appendChild(upgrades)
    }

    addTower(x,y,mapData){
        let tile = mapData.tiles[y][x];
        if(tile.tower){
            Towers.selectedPlacedTower = tile.tower;
            
            this.showUpgradeMenu(Towers.upgradeMenu, tile.tower)

            return;
        }        
        Towers.selectedPlacedTower = null;
        Towers.upgradeMenu.style.height = "0";
        console.log(Towers.selectedTower);
        if(Towers.selectedTower == null){
            return;
        }        
        let towerConstructor = Towers.allTowers[Towers.selectedTower].tower;
        let tower = Object.assign(Object.create(Object.getPrototypeOf(towerConstructor)), towerConstructor)
        console.log(tower);
        tower.x = x+tower.w/2;
        tower.y = y+tower.h/2;
        tower.mapData = mapData;
        tower.damage.mapData = mapData;
        if(tile.layers.object){ // checks if there is no obstacle
            return
        }
        console.log(tile);
        
        
        if(tower.type === "land" &&(!tile.layers.floor || tile.layers.path || tile.layers.river)){ // land check, might change the tower type check later
            return;
        }
        if(tower.type === "water" &&(!(tile.layers.water||tile.layers.river) || tile.layers.cliff || tile.layers.floor)){ // water check, might change the tower type check later
            return;
        }
        if(tower.type === "sky" &&!tile.layers.sky){ // fly check, might change the tower type check later
            return;
        }
        tile.tower = tower;
        this.towers.push(tower);
        Towers.selectedTower = null;
    }

    static createSelectMenu(){
        for(let tower in this.allTowers){
            this.selectMenu.appendChild(this.menuItem(tower,this.allTowers[tower].color));
        }
    }

    static menuItem(name, color, img=null){
        let res = document.createElement("div");
        res.classList.add("menuItem");
        res.style.backgroundColor = color; // no img yet
        res.innerHTML = name;
        res.name = name;
        res.addEventListener("click", () =>{
            Towers.selectedTower = name
            console.log(this);
        });
        return res;
    }

    static createSideMenu(){
        this.sideMenu.classList.add("sideMenu") ;
        this.sideMenu.innerHTML = "test"
        document.body.insertBefore(this.sideMenu, document.body.children[0]);
        //document.body.appendChild(this.sideMenu)
        this.selectMenu.classList.add("selectMenu");
        this.upgradeMenu.classList.add("upgradeMenu");
        this.upgradeMenu.innerHTML="test3";
        this.createSelectMenu();
        this.sideMenu.appendChild(this.selectMenu);
        this.sideMenu.appendChild(this.upgradeMenu);
        this.sideMenu.style.visibility = "hidden";
    }
}