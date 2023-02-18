class StandardTower extends Tower{
    constructor(id,x,y,damage,mapData, color){
        super(id,"Standard Tower",x,y,2,2,1,null,100,"land",damage,5,mapData, color);

        this.image = {}
        this.image.rotating = new Image()
        this.image.rotating.src = "./assets/cannon.png"
    }

    upgrade(path, level) {

    }
}