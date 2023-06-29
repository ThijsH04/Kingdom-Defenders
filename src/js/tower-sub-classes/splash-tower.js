class SplashTower extends Tower{
    constructor(id,x,y,damage,mapData, color, className){
        super(id,"Splash Tower",x,y,2,2,1,"./assets/images/towers/mage_tower.png",100,"land",damage,4,mapData, color, className);

        this.image = {}
        this.image.base = new Image()
        this.image.base.src = "./assets/images/towers/mage_tower.png"

        this.projectileImg = new Image()
        this.projectileImg.src = "./assets/images/projectiles/magic_orb.png"
    }

    upgrade(path, level) {
        
    }
}