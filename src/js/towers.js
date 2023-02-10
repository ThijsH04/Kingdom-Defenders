class Towers{
    constructor(id){
        console.log(id);
        
        this.id = id;
        this.towers = [];
        this.selectedTower = null;
        this.allTowers = {
            "standard":{tower:new StandardTower(0, undefined, undefined, new Damage(5)),color:"red"},
            "homing":{tower:new HomingTower(0, undefined, undefined, new Damage(5)),color:"green"},
            "shrapnel":{tower:new ShrapnelTower(0, undefined, undefined, new Damage(5)),color:"yellow"},
            "earthquake":{tower:new EarthquakeTower(0, undefined, undefined),color:"orange"},
            "chaining":{tower:new ChainingTower(0, undefined, undefined),color:"purple"},
        }
        // if(id==0){
            this.sideMenu = document.createElement("div");
            this.sideMenu.classList.add("sideMenu") ;
            this.sideMenu.id = "sideMenu"+id;
            console.log(id);
            this.sideMenu.innerHTML = "test"
            document.body.insertBefore(this.sideMenu, document.body.children[0]);
            this.selectMenu = document.createElement("div");
            this.selectMenu.classList.add("selectMenu");
            this.upgradeMenu = document.createElement("div");
            this.upgradeMenu.classList.add("upgradeMenu");
            this.upgradeMenu.innerHTML="test3";
            this.createSelectMenu();
            this.sideMenu.appendChild(this.selectMenu);
            this.sideMenu.appendChild(this.upgradeMenu);
            if(id!=0){
                this.sideMenu.style.display = "none";
            }
        // }
    }

    update(mode, mouseTile, ctx, tileset, tileSize, timePassed, render=true){   
        for(let t of this.towers){
            t.update(mode, ctx, tileset, tileSize, timePassed, render);
        }
        if(this.selectedTower) { // this might be inefficient but should be fine?
            ctx.fillStyle = "#ff0000";
            ctx.globalAlpha = 0.5;
            let towerConstructor = this.allTowers[this.selectedTower].tower;
            let tempTower = Object.assign(Object.create(Object.getPrototypeOf(towerConstructor)), towerConstructor);
            tempTower.x = mouseTile.x+tempTower.w/2;
            tempTower.y = mouseTile.y+tempTower.h/2;
            tempTower.render(ctx, tileSize)
            ctx.globalAlpha = 1
        }
        
    }

    addTower(x,y,mapData){
        if(this.selectedTower == null){
            return;
        }
        console.log("hi");
        
        let towerConstructor = this.allTowers[this.selectedTower].tower;
        let tower = Object.assign(Object.create(Object.getPrototypeOf(towerConstructor)), towerConstructor)
        tower.x = x+tower.w/2;
        tower.y = y+tower.h/2;
        tower.mapData = mapData;
        tower.damage.mapData = mapData;
        let tile = mapData.tiles[y][x];
        if(tile.tower || tile.layers.object){ // checks if there is no tower or obstacle
            return
        }
        if(tower.type === "land" &&(!tile.layers.floor || tile.layers.path || tile.layers.river)){ // land check, might change the tower type check later
            return;
        }
        if(tower.type === "water" &&(!(tile.layers.water||tile.layers.river) || tile.layers.cliff || tile.layers.floor)){ // water check, might change the tower type check later
            return;
        }
        if(tower.type === "sky" &&!tile.layers.sky){ // fly check, might change the tower type check later
            return;
        }
        tile.tower = true;
        this.towers.push(tower);
        this.selectedTower = null;
    }

    createSelectMenu(){
        for(let tower in this.allTowers){
            this.selectMenu.appendChild(this.menuItem(tower,this.allTowers[tower].color));
        }
    }

    menuItem(name, color, img=null){
        let res = document.createElement("div");
        res.classList.add("menuItem");
        res.style.backgroundColor = color; // no img yet
        res.innerHTML = name;
        res.name = name;
        res.addEventListener("click", () =>{
            this.selectedTower = name
            console.log(this);
        });
        return res;
    }
}