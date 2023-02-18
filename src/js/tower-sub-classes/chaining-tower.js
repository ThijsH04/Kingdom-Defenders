class ChainingTower extends Tower{
    constructor(id,x,y,mapData, color){
        let r = 5;
        super(id,"Chaining Tower",x,y,2,2,1,null,100,"land",new ChainDamage(1,game.map,r,.1,20,[]),r,mapData, color);
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

