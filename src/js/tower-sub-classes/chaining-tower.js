class ChainingTower extends Tower{
    constructor(id,x,y,mapData, color, className){
        let r = 5;
        super(id,"Chaining Tower",x,y,2,2,1,"./assets/images/towers/lightning_tower.png",100,"land",new ChainDamage(1,game.map,r,.1,20,[]),r,mapData, color, className);

        this.image = {}
        this.image.base = new Image()
        this.image.base.src = "./assets/images/towers/lightning_tower.png"
    }

    shoot(){
        if(!this.checkShot()){
            return;
        }
        this.damage.dealDamage(this.x,this.y);
    }
    
    upgrade(path, level) {
        
    }
}

