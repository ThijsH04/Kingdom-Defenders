class EarthquakeTower extends Tower{
    constructor(id,x,y,mapData, unlockedUpgrades){
        super(id, x, y, mapData, "Earthquake Tower", unlockedUpgrades);
        this.w = 2
        this.h = 2
        this.attackSpeed = 1
        this.cost = 100
        this.type = "land"
        this.hitTypes = ["ground"]
        this.r = 5
        this.className = "Elemental"
    }

    shoot(){
        if(!this.checkShot()){
            return;
        }
        this.damage.dealDamage(this.x,this.y,this.stats);
        this.stats.increaseShots();
    }

    upgrade(path, level) {

    }
}

