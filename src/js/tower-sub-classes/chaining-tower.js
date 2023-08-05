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
        this.damage = new ChainEffect({amount:5,mapData:null,r:this.r,lifespan:.1,targetAmount:5,stats:this.stats})
        this.className = "Elemental"

        this.addImage({
            name: "base",
            src: "./assets/images/towers/lightning_tower.png",
            z: 0,
            animationTypes: [],
            maxAnimation: 1
        })

        this.addImage({
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
        this.damage.mapData = this.mapData;
        this.damage.dealDamage(this.x,this.y,this.stats);
        this.stats.increaseShots();
    }
    
    upgrade(path, level) {
        
    }
}

