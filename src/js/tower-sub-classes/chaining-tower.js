class ChainingTower extends Tower{
    constructor(id,x,y,mapData){
        super(id, x, y, mapData, "Lightning Tower");
        this.w = 2
        this.h = 2
        this.attackSpeed = 1
        this.cost = 100
        this.type = "land"
        this.r = 5
        this.damage = new ChainDamage(1,game.map,this.r,.1,20,this.stats,[])
        this.className = "elemental"

        this.image = {}
        this.image.base = new Image()
        this.image.base.src = "./assets/images/towers/lightning_tower.png"

        this.image.animation = new Image()
        this.image.animation.src = "./assets/images/towers/lightning_effect.png"
        this.image.animation.maxSize = 1;
        this.image.animation.types = ["fade"]
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

