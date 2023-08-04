class ChainingTower extends Tower{
    constructor(id,x,y,mapData, unlockedUpgrades){
        super(id, x, y, mapData, "Lightning Tower", unlockedUpgrades);
        this.w = 2
        this.h = 2
        this.attackSpeed = 1
        this.cost = 100
        this.type = "land"
        this.hitTypes = ["ground", "air"]
        this.r = 5
        this.damage = new ChainDamage(1,game.map,this.r,.1,20,this.stats,[])
        this.className = "Elemental"

        super.addImage({
            name: "base",
            src: "./assets/images/towers/lightning_tower.png",
            z: 0,
            animationTypes: ["rotate"],
            maxAnimation: 1
        })

        super.addImage({
            name: "effect",
            src: "./assets/images/towers/lightning_effect.png",
            z: 1,
            animationTypes: ["fade"],
            maxAnimation: 1
        })
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

