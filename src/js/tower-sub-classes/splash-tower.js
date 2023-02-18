class SplashTower extends Tower{
    constructor(id,x,y,damage,mapData, color){
        super(id,"Splash Tower",x,y,2,2,1,null,100,"land",damage,4,mapData, color);
    }

    upgrade(path, level) {
        
    }
}