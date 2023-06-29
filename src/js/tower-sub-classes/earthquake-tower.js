class EarthquakeTower extends Tower{
    constructor(id,x,y,mapData, color, className){
        let r = 4;
        super(id,"Earthquake Tower",x,y,2,2,1,null,100,"land",new SplashDamage(5,game.map,r,.1,20,[]),r,mapData, color, className);
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

