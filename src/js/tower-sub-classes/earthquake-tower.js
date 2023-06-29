class EarthquakeTower extends Tower{
    constructor(id,x,y,mapData, color){
        super(id, x, y, mapData, color);
        this.name = "Earthquake Tower";
        this.w = 2
        this.h = 2
        this.attackSpeed = 1
        this.cost = 100
        this.type = "land"
        this.r = 5
        this.damage = new SplashDamage(5,game.map,this.r,.1,20,[])
        this.className = "elemental"
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

